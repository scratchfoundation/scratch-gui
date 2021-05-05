/* inserted by pull.js */
import _twAsset0 from "./pause.svg";
import _twAsset1 from "./play.svg";
const _twGetAsset = (path) => {
  if (path === "/pause.svg") return _twAsset0;
  if (path === "/play.svg") return _twAsset1;
  throw new Error(`Unknown asset: ${path}`);
};

export default async function ({ addon, global, console, msg }) {
  const vm = addon.tab.traps.vm;

  const img = document.createElement("img");
  img.className = "pause-btn";
  img.src = _twGetAsset("/pause.svg");
  img.draggable = false;
  img.title = msg("pause");
  img.addEventListener("click", () => setPaused(!paused));
  addon.tab.displayNoneWhileDisabled(img);
  addon.self.addEventListener("disabled", () => setPaused(false));

  let paused = false;
  let pausedThreadState = new WeakMap();

  const setPaused = (_paused) => {
    paused = _paused;

    if (paused) {
      vm.runtime.audioEngine.audioContext.suspend();
      if (!vm.runtime.ioDevices.clock._paused) {
        vm.runtime.ioDevices.clock.pause();
      }
      img.src = _twGetAsset("/play.svg");

      for (const thread of vm.runtime.threads) {
        if (!thread.updateMonitor && !pausedThreadState.has(thread)) {
          const pauseState = {
            pauseTime: vm.runtime.currentMSecs,
            status: thread.status,
          };
          pausedThreadState.set(thread, pauseState);
          // Make sure that paused threads will always be paused.
          // Setting thread.status is not enough for blocks like "ask and wait"
          Object.defineProperty(thread, "status", {
            get() {
              return /* STATUS_PROMISE_WAIT */ 1;
            },
            set(status) {
              // Status will be set when the thread is unpaused.
              pauseState.status = status;
            },
            configurable: true,
            enumerable: true,
          });
        }
      }

      // Immediately emit project stop
      // Scratch will do this automatically, but there may be a slight delay.
      vm.runtime.emit("PROJECT_RUN_STOP");
    } else {
      vm.runtime.audioEngine.audioContext.resume();
      vm.runtime.ioDevices.clock.resume();
      img.src = _twGetAsset("/pause.svg");

      const now = Date.now();
      for (const thread of vm.runtime.threads) {
        const pauseState = pausedThreadState.get(thread);
        if (pauseState) {
          const stackFrame = thread.peekStackFrame();
          if (stackFrame && stackFrame.executionContext && stackFrame.executionContext.timer) {
            const dt = now - pauseState.pauseTime;
            stackFrame.executionContext.timer.startTime += dt;
          }
          // Compiler state is stored differently
          if (thread.timer) {
            const dt = now - pauseState.pauseTime;
            thread.timer.startTime += dt;
          }
          Object.defineProperty(thread, "status", {
            value: pauseState.status,
            configurable: true,
            enumerable: true,
            writable: true,
          });
        }
      }
      pausedThreadState = new WeakMap();
    }
  };

  /*
  const originalStepToProcedure = vm.runtime.sequencer.stepToProcedure;
  vm.runtime.sequencer.stepToProcedure = function (thread, proccode) {
    if (proccode.startsWith("sa-pause")) {
      setPaused(true);
      return;
    }
    return originalStepToProcedure.call(this, thread, proccode);
  };
  */

  const originalGreenFlag = vm.runtime.greenFlag;
  vm.runtime.greenFlag = function () {
    setPaused(false);
    return originalGreenFlag.call(this);
  };

  // Disable edge-activated hats and hats like "when key pressed" while paused.
  const originalStartHats = vm.runtime.startHats;
  vm.runtime.startHats = function (...args) {
    if (paused) {
      const hat = args[0];
      // The project can still be edited and the user might manually trigger some events. Let these run.
      if (hat !== "event_whenbroadcastreceived" && hat !== "control_start_as_clone") {
        return [];
      }
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

  while (true) {
    const flag = await addon.tab.waitForElement("[class^='green-flag']", {
      markAsSeen: true,
      reduxEvents: ["scratch-gui/mode/SET_PLAYER", "fontsLoaded/SET_FONTS_LOADED", "scratch-gui/locales/SELECT_LOCALE"],
    });
    flag.insertAdjacentElement("afterend", img);
  }
}
