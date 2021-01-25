/**!
 * Imported from SA
 * @license GPLv3.0 (see LICENSE_GPL or https://www.gnu.org/licenses/ for more information)
 */

import downloadBlob from "../../libraries/download-blob.js";

export default async ({ addon, console, msg }) => {
  while (true) {
    const elem = await addon.tab.waitForElement('div[class*="menu-bar_file-group"] > div:last-child:not(.sa-record)', {
      markAsSeen: true,
    });
    const getOptions = () => {
      const recordOption = Object.assign(document.createElement("div"), {
        // FIXCLASS:modal_modal-overlay_1Lcbx
        className: "modal_modal-overlay_1Lcbx",
      });
      const recordOptionPopup = Object.assign(document.createElement("div"), {
        // FIXCLASS:modal_modal-content_1h3ll
        className: "mediaRecorderPopup modal_modal-content_1h3ll",
      });
      const recordOptionHeader = Object.assign(document.createElement("div"), {
        // FIXCLASS:modal_header_1h7ps
        className: "modal_header_1h7ps",
      });
      recordOptionHeader.appendChild(
        Object.assign(document.createElement("div"), {
          // FIXCLASS:modal_header-item_2zQTd
          // FIXCLASS:modal_header-item-title_tLOU5
          className: "modal_header-item_2zQTd modal_header-item-title_tLOU5",
          textContent: msg("option-title"),
          title: msg("added-by"),
        })
      );
      recordOptionPopup.appendChild(recordOptionHeader);
      const recordOptionInner = Object.assign(document.createElement("div"), {
        className: "mediaRecorderPopupContent",
      });

      recordOptionInner.appendChild(
        Object.assign(document.createElement("p"), {
          textContent: msg("record-description"),
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
        // FIXCLASS:prompt_variable-name-text-input_1iu8-
        className: "prompt_variable-name-text-input_1iu8-",
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
        // FIXCLASS:prompt_button-row_3Wc5Z
        className: "mediaRecorderPopupButtons prompt_button-row_3Wc5Z",
      });
      const cancelButton = Object.assign(document.createElement("button"), {
        textContent: msg("cancel"),
      });
      cancelButton.addEventListener("click", () => handleOptionClose(null), { once: true });
      buttonRow.appendChild(cancelButton);
      const startButton = Object.assign(document.createElement("button"), {
        textContent: msg("start"),
        // FIXCLASS:prompt_ok-button_3QFdD
        className: "prompt_ok-button_3QFdD",
      });
      startButton.addEventListener(
        "click",
        () =>
          handleOptionClose({
            secs: Number(recordOptionSecondsInput.value),
            audioEnabled: recordOptionAudioInput.checked,
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
    const recordElem = Object.assign(document.createElement("div"), {
      className: "sa-record " + elem.className,
      textContent: msg("record"),
    });
    let isRecording = false;
    let isWaitingForFlag = false;
    let waitingForFlagFunc = null;
    let abortController = null;
    let stopSignFunc = null;
    let recordBuffer = [];
    let recorder;
    let timeout;
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
          const blob = new Blob(recordBuffer, { type: "video/webm" });
          downloadBlob("video.webm", blob);
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
      const stream = vm.runtime.renderer.canvas.captureStream();
      if (opts.audioEnabled) {
        const mediaStreamDestination = vm.runtime.audioEngine.audioContext.createMediaStreamDestination();
        vm.runtime.audioEngine.inputNode.connect(mediaStreamDestination);
        for (const track of mediaStreamDestination.stream.getAudioTracks()) {
          stream.addTrack(track);
        }
      }
      recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
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
    elem.parentElement.appendChild(recordElem);
  }
};
