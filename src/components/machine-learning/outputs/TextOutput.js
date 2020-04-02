import 'gifler';
import GLOBALS from './../config.js';

class TextOutput {
    constructor () {
        this.id = 'TextOutput';
        this.element = document.createElement('div');
        this.element.classList.add('output__container');
        this.classNames = GLOBALS.classNames;
        this.colors = GLOBALS.colors;
        this.defaultGifs = [];
        this.gifs = [];
        this.currentIndex = null;
        this.currentClass = null;
        this.resultOffset = 0;
        this.numResults = 10;
        this.gifCanvas = null;

        this.editViewer = document.createElement('div');
        this.editViewer.classList.add('gif__edit-viewer');
        this.resultText = document.createElement('h1');
        this.resultText.classList.add('result_display');
        this.element.appendChild(this.resultText);
    }

    trigger (index) {
        // TODO 此处实现识别后，切换图像
        // index 为下标
        this.resultText.innerText = (index + 1).toString();
    }

    stop () {
    }

    start () {
    }
}


export default TextOutput;
