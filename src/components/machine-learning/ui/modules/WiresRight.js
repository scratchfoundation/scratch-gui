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

class WiresRight {
    constructor(element, learningClasses) {
        this.element = element;
        this.learningClasses = learningClasses;
        this.offsetY = 0;
        this.canvas = document.createElement('canvas');
        this.offsetvalue = 60;
        this.size();
        this.element.appendChild(this.canvas);
        // this.wireGeneral = this.element.querySelector('.st0');
        this.context = this.canvas.getContext('2d');
        this.vertical = true;
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 900) {
                this.canvas.style.display = 'none';
            }else {
                this.canvas.style.display = 'block';
            }
        });
        this.currentAnimator = null;
        this.renderOnce = true;
        this.render();
    }
    setOffsetValue(offsetvalue){
        this.offsetvalue = (offsetvalue || 0)+60;
    }
    render(once) {
        this.context.clearRect(0, 0, this.width, this.height);
        this.context.lineWidth = 3;
        this.renderOnce = true;

        for (let index = 0; index < this.learningClasses.length; index += 1) {

            let startY = this.startY + (this.startSpace * index);
            let endY = this.endY + (this.endSpace * index);

            let start = {
                x: 0,
                y: this.endY + (this.endSpace * index)
            };

            let end = {
                x: this.endX,
                y: 220 + this.offsetvalue
            };

            let cp1 = {
                x: 35,
                y: start.y
            };

            let cp2 = {
                x: 10,
                y: end.y
            };
            
            this.context.strokeStyle = '#cfd1d2';
            if (this.animator[index].highlight) {
                this.context.strokeStyle = this.animator[index].color;
            }

            this.context.beginPath();
            this.context.moveTo(start.x, start.y);
            this.context.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
            this.context.lineTo(start.x + 100, start.y);
            this.context.stroke();
        }

        if (this.renderOnce) {
            this.renderOnce = false;
        }else {
            this.timer = requestAnimationFrame(this.render.bind(this));
        }

    }

    highlight(index) {
        this.currentAnimator = this.animator[index];
        this.currentAnimator.highlight = true;
        this.start();
        let currentClass = this.element.querySelector(`.wire-right-${index}`);
        currentClass.classList.add('animate');
    }

    dehighlight(index) {
        if (this.currentAnimator) {
            this.currentAnimator.highlight = false;
            this.currentAnimator = null;
            this.stop();
            this.renderOnce = true;
            this.render();
        }
        for(let i=0;i<this.learningClasses.length;i++){
            let currentClass = this.element.querySelector(`.wire-right-${i}`);
            currentClass.classList.remove('animate');
        }
    }

    start() {
        this.stop();
        this.timer = requestAnimationFrame(this.render.bind(this));
    }

    stop() {
        if (this.timer) {
            cancelAnimationFrame(this.timer);
        }
    }

    size() {
        const BREAKPOINT_DESKTOP = 900;
        if (window.innerWidth <= BREAKPOINT_DESKTOP) {
            this.canvas.style.display = 'none';
        }

        this.width = this.element.offsetWidth;

        let firstLearningClass = this.learningClasses[0];
        let lastLearningClass = this.learningClasses[this.learningClasses.length-1];

        let classesHeight = lastLearningClass.offsetTop - firstLearningClass.offsetTop;

        this.height = this.learningClasses.length*(firstLearningClass.offsetHeight+20)+this.offsetvalue;
        // this.height = this.element.offsetHeight;
        // remove offset on desktop
        this.element.setAttribute('style', '');
        this.endSpace = classesHeight / (this.learningClasses.length-1);

        this.canvas.width = this.width;
        this.canvas.height = this.height;

        this.startSpace = this.learningClasses.length;

        this.startX = 0;
        // this.startY = (this.height / 2);
        this.startY = (this.height / (this.learningClasses.length-1)) + this.offsetY;
        this.endX = this.width;
        this.endY = 80;

        this.animator = {};
        for (let index = 0; index < this.learningClasses.length; index += 1) {
            let id = GLOBALS.classNames[index%3];
            this.animator[index] = {
                highlight: false,
                percentage: 0,
                color: GLOBALS.colors[id],
                numParticles: 15
            };
        }

        this.renderOnce = true;
    }
}

import GLOBALS from './../../config.js';

export default WiresRight;