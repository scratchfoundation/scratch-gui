// Copyright 2017 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

class CamInput {
  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('input__camera');

    this.webcamClassifier = new WebcamClassifier();
    this.element.appendChild(this.webcamClassifier.video);
    this.webcamClassifier.video.setAttribute('muted', 'true');
    this.webcamClassifier.video.classList.add('input__camera-video');
    this.webcamClassifier.video.addEventListener(
        'loadeddata', this.videoLoaded.bind(this));
    window.addEventListener('resize', this.size.bind(this));
    GLOBALS.webcamClassifier = this.webcamClassifier;
    this.stop();
  }

  videoLoaded() {
    this.videoWidth = this.webcamClassifier.video.videoWidth;
    this.videoHeight = this.webcamClassifier.video.videoHeight;
    this.videoRatio = this.videoWidth / this.videoHeight;
    this.size();
  }

  start() {
    this.show();
    if (this.started) {
      return;
    }
    this.started = true;
    this.webcamClassifier.ready();
  }

  stop() {
    this.started = false;
    this.webcamClassifier.stopTimer();
    this.hide();
  }

  hide() {
    this.element.style.display = 'none';
  }

  show() {
    this.element.style.display = 'block';
    this.size();
  }

  renderExamples(canvas) {
    // console.log('render', canvas);
  }

  resetClass(id) {
    this.webcamClassifier.deleteClassData(id);
  }

  size() {
    this.width = this.element.offsetWidth;
    this.height = this.width;
    this.webcamClassifier.video.width = 227;
		this.webcamClassifier.video.height = 227;

    /*
    if (this.videoRatio > 1) {
            this.webcamClassifier.video.width = this.height * this.videoRatio;
            this.webcamClassifier.video.height = this.height;
    }else {
            this.webcamClassifier.video.width = this.width;
            this.webcamClassifier.video.height = this.width / this.videoRatio;
    }*/
  }
}

import GLOBALS from './../../config.js';
import WebcamClassifier from './../../ai/WebcamClassifier.js';

export default CamInput;