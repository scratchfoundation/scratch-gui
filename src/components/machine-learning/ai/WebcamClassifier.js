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


/* eslint-disable keyword-spacing */
import GLOBALS from './../config.js';
import * as tf from '@tensorflow/tfjs';
import * as knnClassifier from '@tensorflow-models/knn-classifier';
import * as mobilenet from '@tensorflow-models/mobilenet';
import regeneratorRuntime from './runtime.js'; // !!! 已经使用，勿删除
// import gtag from 'gtag';

/* eslint-disable camelcase, max-lines,  */
const IMAGE_SIZE = 227;
const INPUT_SIZE = 1000;
const TOPK = 10;
const CLASS_COUNT = 3;
const MEASURE_TIMING_EVERY_NUM_FRAMES = 20;

// function passThrough () {
//     return 0;
// }

export default class WebcamClassifier {
    constructor () {
        window.dataLayer = window.dataLayer || [];
        this.gtag = function (){
            dataLayer.push(arguments);
        };
        this.gtag('js', new Date());
        this.gtag('config', 'UA-107306747-1');
        this.loaded = false;
        this.video = document.createElement('video');
        this.video.setAttribute('autoplay', '');
        this.video.setAttribute('playsinline', '');
        this.blankCanvas = document.createElement('canvas');
        this.blankCanvas.width = 227;
        this.blankCanvas.height = 227;
        this.timer = null;
        this.active = false;
        this.wasActive = false;
        this.latestCanvas = document.createElement('canvas');
        this.latestCanvas.width = 98;
        this.latestCanvas.height = 98;
        this.latestContext = this.latestCanvas.getContext('2d');
        this.thumbCanvas = document.createElement('canvas');
        this.thumbCanvas.width = Math.floor(this.latestCanvas.width / 3) + 1;
        this.thumbCanvas.height = Math.floor(this.latestCanvas.height / 3) + 1;
        this.thumbContext = this.thumbCanvas.getContext('2d');
        this.thumbVideoX = 0;
        this.classNames = GLOBALS.classNames;
        this.learningSection = GLOBALS.learningSection;
        this.images = {};
        for (let index = 0; index < this.learningSection.learnclasscount; index += 1) {
            this.images[this.learningSection.learningClasses[index].id] = {
                index: index,
                down: false,
                imagesCount: 0,
                images: [],
                hasimages: false,
                latestImages: [],
                latestThumbs: []
            };
        }
        this.isDown = false;
        this.current = null;
        this.currentClass = null;
        this.measureTimingCounter = 0;
        this.lastFrameTimeMs = 1000;
        this.classIndices = {};
        this.currentSavedClassIndex = 0;

        this.mappedButtonIndexes = [];

        this.init();
    }

    startWebcam () {
        let video = true;
        if (GLOBALS.browserUtils.isMobile) {
            video = {facingMode: (GLOBALS.isBackFacingCam) ? 'environment' : 'user'};
        }

        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia(
                {
                    video: video,
                    audio: (GLOBALS.browserUtils.isChrome && !GLOBALS.browserUtils.isMobile)
                })
                .then(stream => {
                    GLOBALS.isCamGranted = true;
                    if ((GLOBALS.browserUtils.isChrome && !GLOBALS.browserUtils.isMobile)) {
                        GLOBALS.audioContext.createMediaStreamSource(stream);
                        GLOBALS.stream = stream;
                    }
                    this.active = true;
                    this.stream = stream;
                    this.video.addEventListener('loadedmetadata', this.videoLoaded.bind(this));
                    this.video.muted = true;
                    this.video.srcObject = stream;
                    this.video.width = 227;
                    this.video.height = 227;

                    const event = new CustomEvent('webcam-status', {detail: {granted: true}});
                    window.dispatchEvent(event);
                    this.gtag('event', 'webcam_granted');
                    setTimeout(() => {
                        document.querySelector('#machinemask').style.display = 'none';
                    }, 200);
                    this.startTimer();
                })
                .catch(error => {
                    const event = new CustomEvent('webcam-status', {
                        detail: {
                            granted: false,
                            error: error
                        }
                    });
                    window.dispatchEvent(event);
                    this.gtag('event', 'webcam_denied');
                });
        }
    }

    async init () {
        this.useFloatTextures = !GLOBALS.browserUtils.isMobile && !GLOBALS.browserUtils.isSafari;
        tf.ENV.set('WEBGL_DOWNLOAD_FLOAT_ENABLED', false);
        this.classifier = knnClassifier.create();

        // Load mobilenet.
        this.mobilenetModule = await mobilenet.load();
    }

    /**
     *  There is an issue with mobilenetModule/knnClassifier where
     *  it returns -1 if you don't start with an index of zero
     *
     *  In these train/predict methods, we remap the index of 0-2.
     *  This way you can train the third model and have it retain
     *  the index of 2.
     *
     *  We have these super verbosely named functions
     *  so it's clear what's happening
     */


    async predict (image) {
        const imgFromPixels = tf.fromPixels(image);
        const logits = this.mobilenetModule.infer(imgFromPixels, 'conv_preds');
        const response = await this.classifier.predictClass(logits);
        const confidences = {};
        for (let i = 0; i < GLOBALS.learningSection.learnclasscount; i++) {
            confidences[i] = 0;
        }
        const newOutput = {
            classIndex: this.mappedButtonIndexes[response.classIndex],
            confidences
        };

        this.mappedButtonIndexes.forEach((index, count) => {
            newOutput.confidences[index] = response.confidences[count];
        });

        return newOutput;
    }

    train (image, index) {
        if (this.mappedButtonIndexes.indexOf(index) === -1) {
            this.mappedButtonIndexes.push(index);
        }
        const newMappedIndex = this.mappedButtonIndexes.indexOf(index);
        const img = tf.fromPixels(image);
        const logits = this.mobilenetModule.infer(img, 'conv_preds');
        this.classifier.addExample(logits, newMappedIndex);
    }

    clear (index) {
        const newMappedIndex = this.mappedButtonIndexes.indexOf(index);
        this.classifier.clearClass(newMappedIndex);
    }

    deleteClassData (index) {
        GLOBALS.clearing = true;
        const _image = this.images[this.learningSection.learningClasses[index].id];
        if (_image.hasimages) {
            this.clear(index);
            this.images[this.learningSection.learningClasses[index].id].hasimages = false;
            this.images[this.learningSection.learningClasses[index].id].imagesCount = 0;
            this.images[this.learningSection.learningClasses[index].id].latestThumbs = [];
            this.images[this.learningSection.learningClasses[index].id].latestImages = [];
        }
        setTimeout(() => {
            GLOBALS.clearing = false;
        }, 300);
    }

    ready () {
        this.startWebcam();
    }

    videoLoaded () {
        const flip = (GLOBALS.isBackFacingCam) ? 1 : -1;
        const videoRatio = this.video.videoWidth / this.video.videoHeight;
        const parent = this.video.parentNode;
        const parentWidth = parent.offsetWidth;
        const parentHeight = parent.offsetHeight;
        const videoWidth = parentHeight * videoRatio;
        this.video.style.width = `${videoWidth}px`;
        this.video.style.height = `${parentHeight}px`;
        this.video.style.transform = `scaleX(${flip}) translate(${50 * flip * -1}%, -50%)`;

        // If video is taller:
        if (videoRatio < 1) {
            this.video.style.transform = `scale(${flip * 2}, 2) translate(${flip * 20 * -1}%, -30%)`;
        }
    }

    blur () {
        if (this.timer) {
            this.stopTimer();
        }
    }

    focus () {
        if (this.wasActive) {
            this.startTimer();
        }
    }

    buttonDown (id, canvas, learningClass) {
        this.current = this.images[id];
        this.current.down = true;
        this.isDown = true;
        this.training = this.current.index;

        this.videoRatio = this.video.videoWidth / this.video.videoHeight;
        this.currentClass = learningClass;
        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;
        this.videoWidth = this.canvasHeight * this.videoRatio;

        this.thumbVideoHeight = this.canvasHeight / 3;
        this.thumbVideoWidth = this.canvasWidth / 3;
        this.thumbVideoWidthReal = this.thumbVideoHeight * this.videoRatio;
        this.thumbVideoX = -(this.thumbVideoWidthReal - this.thumbVideoWidth) / 2;
        this.currentContext = this.currentClass.canvas.getContext('2d');
    }

    buttonUp (id) {
        this.images[id].down = false;
        this.images[id].hasimages = true;
        this.isDown = false;
        this.training = -1;
        this.current = null;
        this.currentContext = null;
        this.currentClass = null;
    }

    startTimer () {
        if (this.timer) {
            this.stopTimer();
        }

        this.video.play();
        this.wasActive = true;
        this.timer = requestAnimationFrame(this.animate.bind(this));
    }

    stopTimer () {
        this.active = false;
        this.wasActive = true;
        this.video.pause();
        cancelAnimationFrame(this.timer);
    }

    async animate () {
        // Get image data from video element
        const image = this.video;
        const exampleCount = Object.keys(this.classifier.getClassExampleCount()).length;

        if (this.isDown) {
            this.current.imagesCount += 1;
            this.currentClass.setSamples(this.current.imagesCount);
            if (this.current.latestThumbs.length > 8) {
                this.current.latestThumbs.shift();
            }
            if (this.current.latestImages.length > 8) {
                this.current.latestImages.shift();
            }
            this.thumbContext.drawImage(
                this.video, this.thumbVideoX, 0, this.thumbVideoWidthReal,
                this.thumbVideoHeight);
            const data = this.thumbContext.getImageData(
                0, 0, this.canvasWidth, this.canvasHeight);
            this.current.latestThumbs.push(data);
            let cols = 0;
            let rows = 0;
            for (let index = 0; index < this.current.latestThumbs.length; index += 1) {
                this.currentContext.putImageData(
                    this.current.latestThumbs[index], (2 - cols) * this.thumbCanvas.width,
                    rows * this.thumbVideoHeight, 0, 0, this.thumbCanvas.width,
                    this.thumbCanvas.height);
                if (cols === 2) {
                    rows += 1;
                    cols = 0;
                } else {
                    cols += 1;
                }
            }

            // Train class if one of the buttons is held down
            // Add current image to classifier
            if (this.training !== -1) {
                this.train(image, this.training);
            }

        } else if (exampleCount > 0) {
            // If any examples have been added, run predict
            let measureTimer = false;
            const start = performance.now();
            measureTimer = this.measureTimingCounter === 0;
            if (exampleCount > 0) {
                const res = await this.predict(image);
                const computeConfidences = () => {
                    GLOBALS.learningSection.setConfidences(res.confidences);
                    this.measureTimingCounter = (this.measureTimingCounter + 1) % MEASURE_TIMING_EVERY_NUM_FRAMES;
                };

                if (!GLOBALS.browserUtils.isSafari || measureTimer || !GLOBALS.browserUtils.isMobile) {
                    this.lastFrameTimeMs = performance.now() - start;
                    computeConfidences();
                } else {
                    setTimeout(computeConfidences, this.lastFrameTimeMs);
                }

            } else if (image.dispose) {
                image.dispose();
            }
        }

        this.timer = requestAnimationFrame(this.animate.bind(this));
    }
}
