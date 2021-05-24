import downloadBlob from "../../libraries/common/cs/download-blob.js";

export default async ({ addon, console, msg }) => {
  // Safari supports mp4 but not webm
  const CHECK_TYPES = ["video/webm", "video/mp4"];
  const supportedVideoType = CHECK_TYPES.find((i) => MediaRecorder.isTypeSupported(i));
  if (!supportedVideoType) throw new Error("no video types supported");

  let recordElem;
  let isRecording = false;
  let isWaitingForFlag = false;
  let waitingForFlagFunc = null;
  let abortController = null;
  let stopSignFunc = null;
  let recordBuffer = [];
  let recorder;
  let timeout;
  while (true) {
    const elem = await addon.tab.waitForElement('div[class*="menu-bar_file-group"] > div:last-child:not(.sa-record)', {
      markAsSeen: true,
      reduxEvents: ["scratch-gui/mode/SET_PLAYER", "fontsLoaded/SET_FONTS_LOADED", "scratch-gui/locales/SELECT_LOCALE"],
    });
    const getOptions = () => {
      const recordOption = Object.assign(document.createElement("div"), {
        className: addon.tab.scratchClass("modal_modal-overlay"),
      });
      const recordOptionPopup = Object.assign(document.createElement("div"), {
        className: addon.tab.scratchClass("modal_modal-content", { others: "mediaRecorderPopup" }),
        dir: addon.tab.direction,
      });
      const recordOptionHeader = Object.assign(document.createElement("div"), {
        className: addon.tab.scratchClass("modal_header"),
      });
      recordOptionHeader.appendChild(
        Object.assign(document.createElement("div"), {
          className: addon.tab.scratchClass("modal_header-item", "modal_header-item-title"),
          textContent: msg("option-title"),
        })
      );
      recordOptionPopup.appendChild(recordOptionHeader);
      const recordOptionInner = Object.assign(document.createElement("div"), {
        className: "mediaRecorderPopupContent",
      });

      recordOptionInner.appendChild(
        Object.assign(document.createElement("p"), {
          textContent:
            supportedVideoType === "video/webm"
              ? msg("record-description")
              : msg("record-description").replace("WebM", "MP4"),
          className: "recordOptionDescription",
        })
      );

      // Seconds
      const recordOptionSeconds = document.createElement("p");
      const recordOptionSecondsInput = Object.assign(document.createElement("input"), {
        type: "number",
        min: 1,
        max: 300,
        defaultValue: 30,
        id: "recordOptionSecondsInput",
        className: addon.tab.scratchClass("prompt_variable-name-text-input"),
      });
      const recordOptionSecondsLabel = Object.assign(document.createElement("label"), {
        htmlFor: "recordOptionSecondsInput",
        textContent: msg("record-duration"),
      });
      recordOptionSeconds.appendChild(recordOptionSecondsLabel);
      recordOptionSeconds.appendChild(recordOptionSecondsInput);
      recordOptionInner.appendChild(recordOptionSeconds);

      // Audio
      const recordOptionAudio = document.createElement("p");
      const recordOptionAudioInput = Object.assign(document.createElement("input"), {
        type: "checkbox",
        defaultChecked: true,
        id: "recordOptionAudioInput",
      });
      const recordOptionAudioLabel = Object.assign(document.createElement("label"), {
        htmlFor: "recordOptionAudioInput",
        textContent: msg("record-audio"),
        title: msg("record-audio-description"),
      });
      recordOptionAudio.appendChild(recordOptionAudioInput);
      recordOptionAudio.appendChild(recordOptionAudioLabel);
      recordOptionInner.appendChild(recordOptionAudio);

      // Mic
      const recordOptionMic = document.createElement("p");
      const recordOptionMicInput = Object.assign(document.createElement("input"), {
        type: "checkbox",
        defaultChecked: false,
        id: "recordOptionMicInput",
      });
      const recordOptionMicLabel = Object.assign(document.createElement("label"), {
        htmlFor: "recordOptionMicInput",
        textContent: msg("record-mic"),
      });
      recordOptionMic.appendChild(recordOptionMicInput);
      recordOptionMic.appendChild(recordOptionMicLabel);
      recordOptionInner.appendChild(recordOptionMic);

      // Green flag
      const recordOptionFlag = document.createElement("p");
      const recordOptionFlagInput = Object.assign(document.createElement("input"), {
        type: "checkbox",
        defaultChecked: true,
        id: "recordOptionFlagInput",
      });
      const recordOptionFlagLabel = Object.assign(document.createElement("label"), {
        htmlFor: "recordOptionFlagInput",
        textContent: msg("record-after-flag"),
      });
      recordOptionFlag.appendChild(recordOptionFlagInput);
      recordOptionFlag.appendChild(recordOptionFlagLabel);
      recordOptionInner.appendChild(recordOptionFlag);

      // Stop sign
      const recordOptionStop = document.createElement("p");
      const recordOptionStopInput = Object.assign(document.createElement("input"), {
        type: "checkbox",
        defaultChecked: true,
        id: "recordOptionStopInput",
      });
      const recordOptionStopLabel = Object.assign(document.createElement("label"), {
        htmlFor: "recordOptionStopInput",
        textContent: msg("record-until-stop"),
      });
      recordOptionFlagInput.addEventListener("change", () => {
        const disabled = (recordOptionStopInput.disabled = !recordOptionFlagInput.checked);
        if (disabled) {
          recordOptionStopLabel.title = msg("record-until-stop-disabled", {
            afterFlagOption: msg("record-after-flag"),
          });
        }
      });
      recordOptionStop.appendChild(recordOptionStopInput);
      recordOptionStop.appendChild(recordOptionStopLabel);
      recordOptionInner.appendChild(recordOptionStop);

      let resolvePromise = null;
      const optionPromise = new Promise((resolve) => {
        resolvePromise = resolve;
      });
      let handleOptionClose = null;

      const handleClickOutside = (e) => {
        if (recordOptionPopup.contains(e.target)) return;
        handleOptionClose(null);
      };

      document.body.addEventListener("click", handleClickOutside, {
        capture: true,
      });

      handleOptionClose = (value) => {
        resolvePromise(value);
        document.body.removeEventListener("click", handleClickOutside, {
          capture: true,
        });
        recordOption.remove();
      };

      const buttonRow = Object.assign(document.createElement("div"), {
        className: addon.tab.scratchClass("prompt_button-row", { others: "mediaRecorderPopupButtons" }),
      });
      const cancelButton = Object.assign(document.createElement("button"), {
        textContent: msg("cancel"),
      });
      cancelButton.addEventListener("click", () => handleOptionClose(null), { once: true });
      buttonRow.appendChild(cancelButton);
      const startButton = Object.assign(document.createElement("button"), {
        textContent: msg("start"),
        className: addon.tab.scratchClass("prompt_ok-button"),
      });
      startButton.addEventListener(
        "click",
        () =>
          handleOptionClose({
            secs: Number(recordOptionSecondsInput.value),
            audioEnabled: recordOptionAudioInput.checked,
            micEnabled: recordOptionMicInput.checked,
            waitUntilFlag: recordOptionFlagInput.checked,
            useStopSign: !recordOptionStopInput.disabled && recordOptionStopInput.checked,
          }),
        { once: true }
      );
      buttonRow.appendChild(startButton);
      recordOptionInner.appendChild(buttonRow);

      recordOptionPopup.appendChild(recordOptionInner);
      recordOption.appendChild(recordOptionPopup);
      document.body.appendChild(recordOption);

      return optionPromise;
    };
    const disposeRecorder = () => {
      isRecording = false;
      recordElem.textContent = msg("record");
      recordElem.title = "";
      recorder = null;
      recordBuffer = [];
      clearTimeout(timeout);
      timeout = 0;
      if (stopSignFunc) {
        addon.tab.traps.vm.runtime.off("PROJECT_STOP_ALL", stopSignFunc);
        stopSignFunc = null;
      }
    };
    const stopRecording = (force) => {
      if (isWaitingForFlag) {
        addon.tab.traps.vm.runtime.off("PROJECT_START", waitingForFlagFunc);
        isWaitingForFlag = false;
        waitingForFlagFunc = null;
        abortController.abort();
        abortController = null;
        disposeRecorder();
        return;
      }
      if (!isRecording || !recorder || recorder.state === "inactive") return;
      if (force) {
        disposeRecorder();
      } else {
        recorder.onstop = () => {
          const blob = new Blob(recordBuffer, { type: supportedVideoType });
          downloadBlob("video." + supportedVideoType.split("/")[1], blob);
          disposeRecorder();
        };
        recorder.stop();
      }
    };
    const startRecording = async (opts) => {
      // Timer
      const secs = Math.min(300, Math.max(1, opts.secs));

      // Initialize MediaRecorder
      recordBuffer = [];
      isRecording = true;
      const vm = addon.tab.traps.vm;
      let micStream;
      if (opts.micEnabled) {
        // Show permission dialog before green flag is clicked
        try {
          micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        } catch (e) {
          if (e.name !== "NotAllowedError" && e.name !== "NotFoundError") throw e;
          opts.micEnabled = false;
        }
      }
      if (opts.waitUntilFlag) {
        isWaitingForFlag = true;
        Object.assign(recordElem, {
          textContent: msg("click-flag"),
          title: msg("click-flag-description"),
        });
        abortController = new AbortController();
        try {
          await Promise.race([
            new Promise((resolve) => {
              waitingForFlagFunc = () => resolve();
              vm.runtime.once("PROJECT_START", waitingForFlagFunc);
            }),
            new Promise((_, reject) => {
              abortController.signal.addEventListener("abort", () => reject("aborted"), { once: true });
            }),
          ]);
        } catch (e) {
          if (e.message === "aborted") return;
          throw e;
        }
      }
      recordElem.textContent = msg("stop");
      isWaitingForFlag = false;
      waitingForFlagFunc = abortController = null;
      const stream = new MediaStream();
      const videoStream = vm.runtime.renderer.canvas.captureStream();
      stream.addTrack(videoStream.getVideoTracks()[0]);

      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const dest = ctx.createMediaStreamDestination();
      if (opts.audioEnabled) {
        const mediaStreamDestination = vm.runtime.audioEngine.audioContext.createMediaStreamDestination();
        vm.runtime.audioEngine.inputNode.connect(mediaStreamDestination);
        const audioSource = ctx.createMediaStreamSource(mediaStreamDestination.stream);
        audioSource.connect(dest);
      }
      if (opts.micEnabled) {
        const micSource = ctx.createMediaStreamSource(micStream);
        micSource.connect(dest);
      }
      if (opts.audioEnabled || opts.micEnabled) {
        stream.addTrack(dest.stream.getAudioTracks()[0]);
      }
      recorder = new MediaRecorder(stream, { mimeType: supportedVideoType });
      recorder.ondataavailable = (e) => {
        recordBuffer.push(e.data);
      };
      recorder.onerror = (e) => {
        console.warn("Recorder error:", e.error);
        stopRecording(true);
      };
      timeout = setTimeout(() => stopRecording(false), secs * 1000);
      if (opts.useStopSign) {
        stopSignFunc = () => stopRecording();
        vm.runtime.once("PROJECT_STOP_ALL", stopSignFunc);
      }
      recorder.start(1000);
    };
    if (!recordElem) {
      recordElem = Object.assign(document.createElement("div"), {
        className: "sa-record " + elem.className,
        textContent: msg("record"),
      });
      recordElem.addEventListener("click", async () => {
        if (isRecording) {
          stopRecording();
        } else {
          const opts = await getOptions();
          if (!opts) {
            console.log("Canceled");
            return;
          }
          startRecording(opts);
        }
      });
    }
    elem.parentElement.appendChild(recordElem);
  }
};
