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

import TweenMax from 'gsap';
import GLOBALS from './../../config.js';

class Button {

	constructor(element) {
		this.initialElement = element.innerHTML;

		this.element = element;

		element.addEventListener('mousedown', this.mousedown.bind(this));
		element.addEventListener('mouseup', this.mouseup.bind(this));
		element.addEventListener('touchstart', this.mousedown.bind(this));
		element.addEventListener('touchend', this.mouseup.bind(this));
		element.addEventListener('click', this.click.bind(this));

		window.addEventListener('resize', () => {
            clearTimeout(this.sizeTimeout);
            this.sizeTimeout = setTimeout(() => {
				this.size();
            }, 300);
        });
        this.size();
		this.selected = false;
	}

	click(event) {
		event.preventDefault();
	}

	select() {
		this.element.classList.add('button__toggle--selected');
		this.selected = true;
		this.down();
	}

	deselect() {
		this.element.classList.remove('button__toggle--selected');
		this.selected = false;
		this.up();
	}

	mousedown(event) {
		event.preventDefault();
		this.down();
	}

	mouseup(event) {
		if (this.selected) {
			return;
		}
		event.preventDefault();
		this.up();
	}

	down() {
		TweenMax.to(this.content, 0.12, {
			x: -(this.depthX - this.depthXPressed),
			y: (this.depthY - this.depthYPressed)
		});
	}

	up() {
		TweenMax.to(this.content, 0.12, {
			x: 0,
			y: 0
		});
	}

	html() {
		return this.el;
	}

	setText(text) {
		this.label.children[0].innerHTML = text;
	}

	size() {
        let element = this.element;
        element.innerHTML = this.initialElement;
        element.style.height = 'auto';
        element.style.width = 'auto';
        let textWidth = element.offsetWidth;
        let textHeight = element.offsetHeight;
        let depthX = GLOBALS.button.states.normal.x;
        let depthY = GLOBALS.button.states.normal.y;

        let depthXPressed = GLOBALS.button.states.pressed.x;
        let depthYPressed = GLOBALS.button.states.pressed.y;


        if (element.classList.contains('button__toggle')) {
            textWidth += 3.5;
            this.isToggle = true;
        }

        if (element.classList.contains('button--large')) {
            textHeight += 20;
            textWidth += 20;
        }

        let frontWidth = textWidth + GLOBALS.button.padding;
        let frontHeight = textHeight < GLOBALS.button.frontHeight ? GLOBALS.button.frontHeight : textHeight;

        if (element.classList.contains('button--small')) {
            textWidth = 36;
            textHeight = 30;

            frontWidth = textWidth;
            frontHeight = textHeight;
        }

        frontWidth = textWidth - GLOBALS.button.states.normal.x;

        let buttonWidth = frontWidth + GLOBALS.button.states.normal.x;
        let buttonHeight = frontHeight + GLOBALS.button.states.normal.y;

        var colorClass = 'grey';
        element.classList.forEach(function(className) {
            if (className.indexOf('button--color-') > -1) {
                let index = className.indexOf('button--color-') + 'button--color-'.length;
                colorClass = className.slice(index);
            }
        });

        let buttonContent = element.children[0];
        buttonContent.classList.remove('button__content');
        let htmlContent = element.innerHTML;
        element.innerHTML = '';

        element.style.width = buttonWidth + 'px';
        element.style.height = buttonHeight + 'px';


        let mask = document.createElement('div');
        mask.classList.add('button__mask');

        let content = document.createElement('div');
        content.classList.add('button__inner');


        let label = document.createElement('div');
        label.classList.add('button__label');
        label.innerHTML = htmlContent;
        label.style.width = frontWidth + 'px';
        label.style.height = frontHeight + 'px';
        // label.style.lineHeight = frontHeight + 'px';
        label.style.left = depthX + 'px';
        content.appendChild(label);
        label.style.top = '10px';

        this.label = label;

        let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', buttonWidth);
        svg.setAttribute('height', buttonHeight);
        this.svg = svg;

        let frontFace = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        frontFace.classList.add('front-face');
        frontFace.classList.add('front-face--' + colorClass);
        frontFace.setAttribute('d', `M${depthX} 0 ${frontWidth + depthX} 0 ${frontWidth + depthX} ${frontHeight} ${depthX} ${frontHeight}z`);
        svg.appendChild(frontFace);
        this.frontFace = frontFace;

        let bottomFace = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        bottomFace.classList.add('bottom-face');
        bottomFace.classList.add('bottom-face--' + colorClass);
        bottomFace.setAttribute('d', `M${depthX} ${frontHeight} ${frontWidth + depthX} ${frontHeight} ${frontWidth} ${frontHeight + depthY} 0 ${frontHeight + depthY}z`);
        svg.appendChild(bottomFace);
        this.bottomFace = bottomFace;

        let leftFace = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        leftFace.classList.add('left-face');
        leftFace.classList.add('left-face--' + colorClass);
        leftFace.setAttribute('d', `M0 ${depthY} ${depthX} 0 ${depthX} ${frontHeight} 0 ${frontHeight + depthY}z`);
        svg.appendChild(leftFace);
        this.leftFace = leftFace;

        content.appendChild(svg);
        mask.appendChild(content);
        element.appendChild(mask);


        // Editable for reszing
        this.label = label;
        this.svg = svg;
        this.frontFace = frontFace;
        this.bottomFace = bottomFace;
        this.leftFace = leftFace;

        this.parentWidth = element.parentNode.offsetWidth;
        this.buttonWidth = buttonWidth;
        this.buttonHeight = buttonHeight;
        this.textWidth = textWidth;
        this.textHeight = textHeight;
        this.frontWidth = frontWidth;
        this.frontHeight = frontHeight;
        this.depthX = depthX;
        this.depthY = depthY;
        this.depthXPressed = depthXPressed;
        this.depthYPressed = depthYPressed;

        this.buttonWidth = buttonWidth;
        this.buttonHeight = buttonHeight;

        this.content = content;
        this.depthX = depthX;
        this.depthY = depthY;
        this.depthXPressed = depthXPressed;
        this.depthYPressed = depthYPressed;

        this.element = element;


        this.selected = false;

    }
}


export default Button;