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

import GLOBALS from './../../config.js';
import TweenMax from 'gsap';
import WiresLeft from './WiresLeft.js';
import WiresRight from './WiresRight.js';
import LearningClass from './LearningClass.js';

import {MACHINE_VAR_NAME_PRE} from '../../../../lib/constants';

class LearningSection {
    constructor (element, count = 3) {
        this.element = element;
        this.learnclasscount = count;
        this.sectionContainer = element.querySelector('#section__container');
        this.sectionContainer.innerHTML = this.renderLearnClass(this.learnclasscount);
        const learningClassesElements = element.querySelectorAll('.learning__class');
        const wiresLeftSVG = document.querySelector('#Layer_left');
        const wiresRightSVG = document.querySelector('#Layer_right');
        wiresLeftSVG.innerHTML += this.renderWires('left', this.learnclasscount);
        wiresRightSVG.innerHTML += this.renderWires('right', this.learnclasscount);
        // this.condenseElement = element.querySelector('#learning-condensed-button');
        // this.condenseElement.addEventListener('click', this.condenseSection.bind(this));
        const learningClasses = [];
        const that = this;
        this.condensed = false;
        this.percentage = 0;

        that.learningClasses = [];
        const colors = GLOBALS.colors;
        // eslint-disable-next-line no-shadow
        learningClassesElements.forEach((element, index) => {
            const id = that.switchColor(index);
            const color = colors[id];
            const rgbaColor = GLOBALS.rgbaColors[id];

            const options = {
                index: index,
                element: element,
                section: that,
                color: color,
                rgbaColor: rgbaColor
            };

            const learningClass = new LearningClass(options);
            learningClass.index = index;
            learningClasses.push(learningClass);
            that.learningClasses[index] = learningClass;
            // learningClass.start();
        });

        this.wiresLeft = new WiresLeft(document.querySelector('#wires__left'), learningClassesElements);
        this.wiresRight = new WiresRight(document.querySelector('#wires__right'), learningClassesElements);
        this.highestIndex = null;
        this.currentIndex = null;
    }

    switchColor (index){
        return GLOBALS.classNames[index % 3];
    }
    renderWires (category, count) {
        let _path = ``;
        for (let i = 0; i < count; i++){
            const __path = `
                <path
                    class="st0 wire-${category === 'right' ? 'right-' : ''}${this.switchColor(i)} wire-${category}-${i}"
                    d="M170.2,0c0,39.8,151.3,5.1,151.3,68.8" />
            `;
            _path += __path;
        }
        return _path;
    }

    renderLearnClass (count) {
        let _html = ``;
        for (let i = 0; i < count; i++){
            const __html = `
                <div id="learn_class_${i}" class="learning__class learning__class--${this.switchColor(i)}">
                    <div class="examples">
                        <div class="machine__status examples__status">
                            <span role="examples__counter" class="examples__counter">0</span>样例</div>
                        <div class="examples__wrapper">
                            <img src="/static/machinelearning/assets/close.svg" class="examples__close-icon">
                            <a href="#" role="reset_btn" class="link link--reset">重置</a>
                            <canvas class="examples__viewer"></canvas>
                        </div>
                    </div>
                    <div class="learning__class-column">
                        <div class="confidence">
                            <div class="machine__status confidence__status">匹配度</div>
                            <div class="machine__meter">
                                <div role="machine__value"
                                    class="machine__value machine__value--color-${this.switchColor(i)}">
                                    <div role="machine__percentage--white"
                                        class="machine__percentage machine__percentage--white">0%</div>
                                </div>
                            </div>
                        </div>
                        <a href="#" class="button button--record button--color-${this.switchColor(i)}">
                            <span class="button__content button__content--small">分类${i + 1}</span></a>
                    </div>
                </div>
            `;
            _html += __html;
        }
        return _html;
        
    }

    ready () {
        this.learningClasses.forEach(learningClass => {
            learningClass.start();
        });
    }

    highlight () {}

    dehighlight () {}

    enable (highlight) {
        this.element.classList.remove('section--disabled');
        this.wiresLeft.element.classList.remove('wires--disabled');
        this.wiresRight.element.classList.remove('wires--disabled');

        if (highlight) {
            this.highlight();
        }
    }

    disable () {
        this.element.classList.add('section--disabled');
        this.wiresLeft.element.classList.add('wires--disabled');
        this.wiresRight.element.classList.add('wires--disabled');
    }

    dim () {
        this.element.classList.add('dimmed');
        this.wiresLeft.element.classList.add('dimmed');
        this.wiresRight.element.classList.add('dimmed');
    }

    undim () {
        this.element.classList.remove('dimmed');
        this.wiresLeft.element.classList.remove('dimmed');
        this.wiresRight.element.classList.remove('dimmed');
    }

    highlightClass (index) {
        this.learningClasses[index].highlight();
    }

    dehighlightClass (index) {
        this.learningClasses[index].dehighlight();
    }

    highlightClassX (index) {
        this.learningClasses[index].highlightX();
    }

    dehighlightClassX (index) {
        this.learningClasses[index].dehighlightX();
    }

    // enableClass(index, highlight) {
    //   this.learningClasses[index].element.classList.remove('learning__class--disabled');

    //   if (highlight) {
    //     this.highlightClass(index);
    //   }
    // }

    // disableClass(index) {
    //   this.learningClasses[index].element.classList.add('learning__class--disabled');
    // }

    clearExamples () {
        this.learningClasses.forEach(learningClass => {
            learningClass.clear();
            learningClass.setConfidence(0);
            learningClass.dehighlightConfidence();
        });
    }

    startRecording (id) {
        this.wiresLeft.highlight(id);
    }

    stopRecording () {
        this.wiresLeft.dehighlight();
    }

    ledOn (id) {
        this.wiresRight.dehighlight();
        this.wiresRight.highlight(id);
    }

    getMaxIndex (array) {
        let max = array[0];
        let maxIndex = 0;

        for (let index = 1; index < array.length; index += 1) {
            if (array[index] > max) {
                maxIndex = index;
                max = array[index];
            }
        }

        return maxIndex;
    }

    setConfidences (confidences) {
        const confidencesArry = Object.values(confidences);
        const maxIndex = this.getMaxIndex(confidencesArry);
        const maxValue = confidencesArry[maxIndex];
        if (maxValue > 0.5 && this.currentIndex !== maxIndex) {
            this.currentIndex = maxIndex;
            this.ledOn(this.currentIndex);
            GLOBALS.outputSection.trigger(this.currentIndex);
        }
        for (let index = 0; index < this.learnclasscount; index += 1) {
            this.learningClasses[index].setConfidence(confidencesArry[index] ? (confidencesArry[index] * 100) : 0);
            if (index === maxIndex) {
                this.setSmallConfidence(confidencesArry[index] ? (confidencesArry[index] * 100) : 0);
                this.learningClasses[index].highlightConfidence();
            } else {
                this.learningClasses[index].dehighlightConfidence();
            }
        }
    }
    
    // 修改块的变量值
    setSmallConfidence (percentage) {
        const list = this.learningClasses;
        if (!GLOBALS.clearing) {
            window.DMACHINE = {
                percentage: this.percentage,
                currentIndex: this.currentIndex,
                classes: list.length ? list.length : 0
            };
            if (typeof window.SMACHINE === 'function') {
                window.SMACHINE('result', `${MACHINE_VAR_NAME_PRE}${this.currentIndex + 1}`);
                for (let i = 0; i < list.length; i++) {
                    window.SMACHINE(list[i].index, list[i].percentage);
                }
            }
            TweenMax.to(this, 0.5, {
                percentage: percentage,
                onUpdate: () => {
                    this.updateSmallResultPercentage();
                }
            });
        }
    }

    updateSmallResultPercentage () {
        const rounded = Math.floor(this.percentage);
        const smallPercent = document.querySelector('#small_percent');
        const smallPercentText = document.querySelector('#small_percent_text');
        smallPercent.style.width = `${this.percentage}%`;
        smallPercentText.textContent = `${this.currentIndex + 1}(${rounded}%)`;
        // console.log(this.currentIndex, this.percentage)
        if (this.smallTimer) {
            clearInterval(this.smallTimer);
        }
        this.smallTimer = setInterval(() => {
            this.setSmallConfidence(0);
        }, 500);
    }

    setQuality () {}

}

export default LearningSection;
