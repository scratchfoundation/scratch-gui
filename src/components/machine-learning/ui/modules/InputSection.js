class InputSection {
    constructor(element) {
        this.element = element;
        this.mediaFlipButton = element.querySelector('#input__media__flip');
        this.mediaFlipButton.addEventListener('click', this.flipCamera.bind(this));
        this.inputContainer = element.querySelector('#input__media');
        this.currentInput = null;
        this.gifs = [];
    }

    showGif(index) {}

    hideGif(index) {}

    ready() {
        if (!GLOBALS.browserUtils.isMobile) {
            this.createCamInput();
            this.selectCamInput();
        }
    }

    highlight() {}

    dehighlight() {}

    enable(highlight) {
        this.element.classList.remove('section--disabled');
    }

    disable() {
        this.element.classList.add('section--disabled');
    }

    dim() {
        this.element.classList.add('dimmed');
    }

    undim() {
        this.element.classList.remove('dimmed');
    }

    createCamInput() {
        if (!this.camInput) {
            this.camInput = new CamInput();
            this.inputContainer.appendChild(this.camInput.element);
            GLOBALS.camInput = this.camInput;
            GLOBALS.camInput.start();
        }
    }

    selectCamInput() {
        this.createCamInput();
        this.currentInput = this.camInput;
    }


    resetClass(id) {
        this.camInput.resetClass(id);
    }

    flipCamera(event) {
        event.preventDefault();
        if (!GLOBALS.browserUtils.isAndroid) {
            GLOBALS.isBackFacingCam = !GLOBALS.isBackFacingCam;
            GLOBALS.webcamClassifier.loaded = false;
            GLOBALS.webcamClassifier.ready();
        }
        if (GLOBALS.browserUtils.isAndroid) {
            /*eslint-disable */
            if (confirm('Switching camera will clear your trained classes and reload the page.')) {
                /* eslint-enable */
                GLOBALS.isBackFacingCam = !GLOBALS.isBackFacingCam;
                localStorage.setItem('isBackFacingCam', GLOBALS.isBackFacingCam.toString());
                location.reload();
            }
        }
    }
}

import GLOBALS from './../../config.js';
import CamInput from './../components/CamInput.js';

export default InputSection;