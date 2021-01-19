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
    const recordElem = Object.assign(document.createElement("div"), {
      className: "sa-record " + elem.className,
      textContent: msg("record"),
    });
    let isRecording = false;
    let recordBuffer = [];
    let recorder;
    let timeout;
    const disposeRecorder = () => {
      isRecording = false;
      recordElem.textContent = msg("record");
      recorder = null;
      recordBuffer = [];
      clearTimeout(timeout);
      timeout = 0;
    };
    const stopRecording = (force) => {
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
    const startRecording = async () => {
      // Timer
      let secs = Number(await prompt(msg("seconds")));
      if (!secs) return;
      secs = Math.max(5, Math.min(30, secs));

      // Initialize MediaRecorder
      recordBuffer = [];
      isRecording = true;
      recordElem.textContent = msg("stop");
      const vm = addon.tab.traps.vm;
      const stream = vm.runtime.renderer.canvas.captureStream();
      const mediaStreamDestination = vm.runtime.audioEngine.audioContext.createMediaStreamDestination();
      vm.runtime.audioEngine.inputNode.connect(mediaStreamDestination);
      for (const track of mediaStreamDestination.stream.getAudioTracks()) {
        stream.addTrack(track);
      }
      recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
      recorder.ondataavailable = (e) => recordBuffer.push(e.data);
      recorder.onerror = (e) => {
        console.warn("Recorder error:", e.error);
        stopRecording(true);
      };
      timeout = setTimeout(() => stopRecording(false), secs * 1000);
      recorder.start(1000);
    };
    recordElem.addEventListener("click", () => {
      if (isRecording) {
        stopRecording();
      } else {
        startRecording();
      }
    });
    elem.parentElement.appendChild(recordElem);
  }
};
