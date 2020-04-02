class LearningClass {
	constructor(options) {
        window.dataLayer = window.dataLayer || [];
        this.gtag = function(){
            dataLayer.push(arguments)
        };
        this.gtag('js', new Date());
        this.gtag('config', 'UA-107306747-1');
        this.element = options.element;
		this.section = options.section;
		this.canvas = this.element.querySelector('canvas.examples__viewer');
		this.canvas.width = 98;
		this.canvas.height = 98;
		this.context = this.canvas.getContext('2d');

        this.id = this.element.getAttribute('id');
		this.index = options.index;
		this.button = new Button(this.element.querySelector('a.button--record'));
		this.button.element.addEventListener('mousedown', this.buttonDown.bind(this));

		this.button.element.addEventListener('touchstart', this.buttonDown.bind(this));
		this.button.element.addEventListener('touchend', this.buttonUp.bind(this));

		this.resetLink = this.element.querySelector('[role=reset_btn]');
		this.exampleCounterElement = this.element.querySelector('[role=examples__counter]');
		this.exampleCounter = 0;

		this.percentage = 0;
		this.percentageElement = this.element.querySelector('[role=machine__value]');
		// this.percentageGrey = this.element.querySelector('.machine__percentage--grey');
		this.percentageWhite = this.element.querySelector('[role=machine__percentage--white]');
        this.color = options.color;
		this.rgbaColor = options.rgbaColor;

		this.resetLink.addEventListener('click', this.resetClass.bind(this));
		this.size();
		window.addEventListener('resize', this.size.bind(this));
	}

	hide() {
		this.element.style.display = 'none';
	}

	show() {
		this.element.style.display = 'flex';
	}

	highlight() {}

	dehighlight() {}

	highlightX() {}

	dehighlightX() {}

	clear() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.setSamples(0);
	}

	resetClass(event) {
        event.preventDefault();
		GLOBALS.inputSection.resetClass(this.index);
		this.clear();
	}

	setSamples(length) {
		this.exampleCounter = length;
		let text = this.exampleCounter;
		let recommendedNumSamples = (GLOBALS.inputType === 'cam') ? 30 : 10;

		this.exampleCounterElement.textContent = text;

		if (this.exampleCounter >= recommendedNumSamples && GLOBALS.classesTrained[this.id] === false) {
			GLOBALS.classesTrained[this.id] = true;
		}
	}

	setConfidence(percentage) {
		if (!GLOBALS.clearing) {
            let that = this;
            TweenMax.to(this, 0.5, {
                percentage: percentage,
                onUpdate: () => {
                    that.updatePercentage();
                }
            });
        }
	}

	highlightConfidence() {
		this.percentageElement.style.background = this.color;
	}

	dehighlightConfidence() {
		this.percentageElement.style.background = '#cfd1d2';
	}

	buttonDown() {
		let that = this;
        this.button.setText('正在训练');
		this.section.startRecording(this.index);

		this.buttonUpEvent = this.buttonUp.bind(this);
		window.addEventListener('mouseup', this.buttonUpEvent);

		GLOBALS.recording = true;
		GLOBALS.classId = this.id;

        clearTimeout(this.buttonClickTimeout);
		this.buttonClickTimeout = setTimeout(() => {
			GLOBALS.webcamClassifier.buttonDown(this.id, this.canvas, this);
		}, 100);

		this.gtag('event', 'training', {'id': this.index});
	}

	buttonUp() {
        this.button.setText('分类'+(this.index+1));
		this.section.stopRecording();
        clearTimeout(this.buttonClickTimeout);
		this.button.up();

		GLOBALS.classId = null;
		GLOBALS.recording = false;

		GLOBALS.webcamClassifier.buttonUp(this.id, this.canvas);

		if (this.exampleCounter > 0) {
			let event = new CustomEvent('class-trained', {
				detail: {
					id: this.id,
					numSamples: this.exampleCounter
				}
			});
			window.dispatchEvent(event);
		}

		window.removeEventListener('mouseup', this.buttonUpEvent);
	}

	updatePercentage() {
        let rounded = Math.floor(this.percentage);
		this.percentageElement.style.width = this.percentage + '%';
		this.percentageWhite.textContent = rounded + '%';

		if (this.timer) {
			clearInterval(this.timer);
		}
		this.timer = setInterval(() => {
			this.setConfidence(0);
        }, 500);
    }
    
	size() {
		this.percentageElement.style.width = 100 + '%';
		let width = this.percentageElement.offsetWidth;
		this.percentageWhite.style.width = width + 'px';
		this.percentageElement.style.width = 0 + '%';
	}

	start() {
		this.size();
	}
}

import GLOBALS from './../../config.js';
import TweenMax from 'gsap';
import Button from './../components/Button.js';

export default LearningClass;