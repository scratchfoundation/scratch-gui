// https://github.com/LLK/scratch-vm/blob/bb352913b57991713a5ccf0b611fda91056e14ec/src/engine/thread.js#L198
const STATUS_RUNNING = 0;
const STATUS_PROMISE_WAIT = 1;
const STATUS_YIELD = 2;
const STATUS_YIELD_TICK = 3;
const STATUS_DONE = 4;

let vm;

let paused = false;
let pausedThreadState = new WeakMap();
let pauseNewThreads = false;

let steppingThread = null;

const eventTarget = new EventTarget();

let audioContextStateChange = Promise.resolve();

export const isPaused = () => paused;

const pauseThread = thread => {
    if (thread.updateMonitor || pausedThreadState.has(thread)) {
    // Thread is already paused or shouldn't be paused.
        return;
    }

    const pauseState = {
        time: vm.runtime.currentMSecs,
        status: thread.status
    };
    pausedThreadState.set(thread, pauseState);

    // Pausing a thread now works by just setting its status to STATUS_PROMISE_WAIT.
    // At the start of each frame, we make sure each paused thread is still paused.
    // This is really the best way to implement this.
    // Converting thread.status into a getter/setter causes Scratch's sequencer to permanently
    //    perform significantly slower in some projects. I think this is because it causes some
    //    very hot functions to be deoptimized.
    // Trapping sequencer.stepThread to no-op for a paused thread causes Scratch's sequencer
    //    to waste 24ms of CPU time every frame because it thinks a thread is running.
    thread.status = STATUS_PROMISE_WAIT;
};

const ensurePausedThreadIsStillPaused = thread => {
    if (thread.status === STATUS_DONE) {
    // If a paused thread is finished by single stepping, let it keep being done.
        return;
    }
    const pauseState = pausedThreadState.get(thread);
    if (pauseState) {
        if (thread.status !== STATUS_PROMISE_WAIT) {
            // eslint-disable-next-line max-len
            // We'll record the change so we can properly resume the thread, but the thread must still be paused for now.
            pauseState.status = thread.status;
            thread.status = STATUS_PROMISE_WAIT;
        }
    }
};

const setSteppingThread = thread => {
    steppingThread = thread;
};

const compensateForTimePassedWhilePaused = (thread, pauseState) => {
    const stackFrame = thread.peekStackFrame();
    if (stackFrame && stackFrame.executionContext && stackFrame.executionContext.timer) {
        stackFrame.executionContext.timer.startTime += vm.runtime.currentMSecs - pauseState.time;
    }
};

const stepUnsteppedThreads = lastSteppedThread => {
    // If we paused in the middle of a tick, we need to make sure to step the scripts that didn't get
    // stepped in that tick to avoid affecting project behavior.
    const threads = vm.runtime.threads;
    // eslint-disable-next-line no-use-before-define
    const startingIndex = getThreadIndex(lastSteppedThread);
    if (startingIndex !== -1) {
        for (let i = startingIndex; i < threads.length; i++) {
            const thread = threads[i];
            const status = thread.status;
            if (status === STATUS_RUNNING || status === STATUS_YIELD || status === STATUS_YIELD_TICK) {
                vm.runtime.sequencer.activeThread = thread;
                vm.runtime.sequencer.stepThread(thread);
            }
        }
    }
};

export const setPaused = _paused => {
    const didChange = paused !== _paused;
    if (didChange) {
        paused = _paused;
        eventTarget.dispatchEvent(new CustomEvent('change'));
    }

    // Don't check didChange as new threads could've started that we need to pause.
    if (paused) {
        audioContextStateChange = audioContextStateChange.then(() => vm.runtime.audioEngine.audioContext.suspend());
        if (!vm.runtime.ioDevices.clock._paused) {
            vm.runtime.ioDevices.clock.pause();
        }
        vm.runtime.threads.forEach(pauseThread);

        const activeThread = vm.runtime.sequencer.activeThread;
        if (activeThread) {
            setSteppingThread(activeThread);
            eventTarget.dispatchEvent(new CustomEvent('step'));
        }
    }

    // Only run unpausing logic when pause state changed to avoid unnecessary work
    if (!paused && didChange) {
        audioContextStateChange = audioContextStateChange.then(() => vm.runtime.audioEngine.audioContext.resume());
        vm.runtime.ioDevices.clock.resume();
        for (const thread of vm.runtime.threads) {
            const pauseState = pausedThreadState.get(thread);
            if (pauseState) {
                compensateForTimePassedWhilePaused(thread, pauseState);
                thread.status = pauseState.status;
            }
        }
        pausedThreadState = new WeakMap();

        const lastSteppedThread = steppingThread;
        // This must happen after the "change" event is fired to fix https://github.com/ScratchAddons/ScratchAddons/issues/4281
        stepUnsteppedThreads(lastSteppedThread);
        steppingThread = null;
    }
};

export const onPauseChanged = listener => {
    eventTarget.addEventListener('change', () => listener(paused));
};

export const onSingleStep = listener => {
    eventTarget.addEventListener('step', listener);
};

export const getRunningThread = () => steppingThread;

// A modified version of this function
// https://github.com/LLK/scratch-vm/blob/0e86a78a00db41af114df64255e2cd7dd881329f/src/engine/sequencer.js#L179
// Returns if we should continue executing this thread.
const singleStepThread = thread => {
    if (thread.status === STATUS_DONE) {
        return false;
    }

    const currentBlockId = thread.peekStack();
    if (!currentBlockId) {
        thread.popStack();

        if (thread.stack.length === 0) {
            thread.status = STATUS_DONE;
            return false;
        }
    }

    pauseNewThreads = true;
    vm.runtime.sequencer.activeThread = thread;

    /*
    We need to call execute(this, thread) like the original sequencer. We don't
    have access to that method, so we need to force the original stepThread to run
    execute for us then exit before it tries to run more blocks.
    So, we make `thread.blockGlowInFrame = ...` throw an exception, so this line:
    https://github.com/LLK/scratch-vm/blob/bb352913b57991713a5ccf0b611fda91056e14ec/src/engine/sequencer.js#L214
    will end the function early. We then have to set it back to normal afterward.

    Why are we here just to suffer?
  */
    const specialError = ['special error used by Scratch Addons for implementing single-stepping'];
    Object.defineProperty(thread, 'blockGlowInFrame', {
        // eslint-disable-next-line no-unused-vars
        set (_block) {
            throw specialError;
        }
    });

    try {
        thread.status = STATUS_RUNNING;

        // Restart the warp timer on each step.
        // If we don't do this, Scratch will think a lot of time has passed and may yield this thread.
        if (thread.warpTimer) {
            thread.warpTimer.start();
        }

        try {
            vm.runtime.sequencer.stepThread(thread);
        } catch (err) {
            if (err !== specialError) throw err;
        }

        if (thread.status !== STATUS_RUNNING) {
            return false;
        }

        if (thread.peekStack() === currentBlockId) {
            thread.goToNextBlock();
        }

        while (!thread.peekStack()) {
            thread.popStack();

            if (thread.stack.length === 0) {
                thread.status = STATUS_DONE;
                return false;
            }

            const stackFrame = thread.peekStackFrame();

            if (stackFrame.isLoop) {
                if (thread.peekStackFrame().warpMode) {
                    continue;
                } else {
                    return false;
                }
            } else if (stackFrame.waitingReporter) {
                return false;
            }

            thread.goToNextBlock();
        }

        return true;
    } finally {
        pauseNewThreads = false;
        vm.runtime.sequencer.activeThread = null;
        Object.defineProperty(thread, 'blockGlowInFrame', {
            value: currentBlockId,
            configurable: true,
            enumerable: true,
            writable: true
        });

        // Strictly this doesn't seem to be necessary, but let's make sure the thread is still paused after we step it.
        if (thread.status !== STATUS_DONE) {
            thread.status = STATUS_PROMISE_WAIT;
        }
    }
};

const getRealStatus = thread => {
    const pauseState = pausedThreadState.get(thread);
    if (pauseState) {
        return pauseState.status;
    }
    return thread.status;
};

const getThreadIndex = thread => {
    // We can't use vm.runtime.threads.indexOf(thread) because threads can be restarted.
    // This can happens when, for example, a "when I receive message1" script broadcasts message1.
    // The object in runtime.threads is replaced when this happens.
    if (!thread) return -1;
    return vm.runtime.threads.findIndex(
        otherThread =>
            otherThread.target === thread.target &&
      otherThread.topBlock === thread.topBlock &&
      otherThread.stackClick === thread.stackClick &&
      otherThread.updateMonitor === thread.updateMonitor
    );
};

const findNewSteppingThread = startingIndex => {
    const threads = vm.runtime.threads;
    for (let i = startingIndex; i < threads.length; i++) {
        const possibleNewThread = threads[i];
        if (possibleNewThread.updateMonitor) {
            // Never single-step monitor update threads.
            continue;
        }
        const status = getRealStatus(possibleNewThread);
        if (status === STATUS_RUNNING || status === STATUS_YIELD || status === STATUS_YIELD_TICK) {
            // Thread must not be running for single stepping to work.
            pauseThread(possibleNewThread);
            return possibleNewThread;
        }
    }
    return null;
};

export const singleStep = () => {
    if (steppingThread) {
        const pauseState = pausedThreadState.get(steppingThread);
        // We can assume pauseState is defined as any single stepping threads must already be paused.

        // Make it look like no time has passed
        compensateForTimePassedWhilePaused(steppingThread, pauseState);
        pauseState.time = vm.runtime.currentMSecs;

        // Execute the block
        const continueExecuting = singleStepThread(steppingThread);

        if (!continueExecuting) {
            // Try to move onto the next thread
            steppingThread = findNewSteppingThread(getThreadIndex(steppingThread) + 1);
        }
    }

    // If we don't have a thread, than we are between VM steps and should search for a new thread
    if (!steppingThread) {
        setSteppingThread(findNewSteppingThread(0));

        // End of VM step, emulate one frame of time passing.
        vm.runtime.ioDevices.clock._pausedTime += vm.runtime.currentStepTime;
        // Skip all sounds forward by vm.runtime.currentStepTime milliseconds so it's as
        //  if they where playing for one frame.
        const audioContext = vm.runtime.audioEngine.audioContext;
        for (const target of vm.runtime.targets) {
            for (const soundId of Object.keys(target.sprite.soundBank.soundPlayers)) {
                const soundPlayer = target.sprite.soundBank.soundPlayers[soundId];
                if (soundPlayer.outputNode) {
                    soundPlayer.outputNode.stop(audioContext.currentTime);
                    soundPlayer._createSource();
                    soundPlayer.outputNode.start(
                        audioContext.currentTime,
                        // eslint-disable-next-line no-mixed-operators
                        audioContext.currentTime - soundPlayer.startingUntil + vm.runtime.currentStepTime / 1000
                    );
                    soundPlayer.startingUntil -= vm.runtime.currentStepTime / 1000;
                }
            }
        }
        // Move all threads forward one frame in time. For blocks like `wait () seconds`
        for (const thread of vm.runtime.threads) {
            if (pausedThreadState.has(thread)) {
                pausedThreadState.get(thread).time += vm.runtime.currentStepTime;
            }
        }

        // Try to run edge activated hats
        pauseNewThreads = true;

        const hats = vm.runtime._hats;
        for (const hatType in hats) {
            if (!Object.prototype.hasOwnProperty.call(hats, hatType)) continue;
            const hat = hats[hatType];
            if (hat.edgeActivated) {
                vm.runtime.startHats(hatType);
            }
        }

        pauseNewThreads = false;
    }

    eventTarget.dispatchEvent(new CustomEvent('step'));
};

export const setup = _vm => {
    if (vm) {
        return;
    }

    vm = _vm;

    const originalStepThreads = vm.runtime.sequencer.stepThreads;
    vm.runtime.sequencer.stepThreads = function () {
        if (isPaused()) {
            for (const thread of this.runtime.threads) {
                ensurePausedThreadIsStillPaused(thread);
            }
        }
        return originalStepThreads.call(this);
    };

    // Unpause when green flag
    const originalGreenFlag = vm.runtime.greenFlag;
    vm.runtime.greenFlag = function () {
        setPaused(false);
        return originalGreenFlag.call(this);
    };

    // Disable edge-activated hats and hats like "when key pressed" while paused.
    const originalStartHats = vm.runtime.startHats;
    vm.runtime.startHats = function (...args) {
        const hat = args[0];
        // These hats can be manually started by the user when paused or while single stepping.
        const isUserInitiated = hat === 'event_whenbroadcastreceived' || hat === 'control_start_as_clone';
        if (pauseNewThreads) {
            if (!isUserInitiated && !this.getIsEdgeActivatedHat(hat)) {
                return [];
            }
            const newThreads = originalStartHats.apply(this, args);
            for (const thread of newThreads) {
                pauseThread(thread);
            }
            return newThreads;
        } else if (paused && !isUserInitiated) {
            return [];
        }
        return originalStartHats.apply(this, args);
    };

    // Paused threads should not be counted as running when updating GUI state.
    const originalGetMonitorThreadCount = vm.runtime._getMonitorThreadCount;
    vm.runtime._getMonitorThreadCount = function (threads) {
        let count = originalGetMonitorThreadCount.call(this, threads);
        if (paused) {
            for (const thread of threads) {
                if (pausedThreadState.has(thread)) {
                    count++;
                }
            }
        }
        return count;
    };
};
