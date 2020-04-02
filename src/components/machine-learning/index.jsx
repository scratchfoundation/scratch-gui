/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import InputSectionComponent from '../machine-learning/inputsection/index.jsx';
import LearningContainerComponent from '../machine-learning/learningcontainer/index.jsx';
import OutputSectionComponent from '../machine-learning/outputsection/index.jsx';
import FooterComponent from '../machine-learning/footer/index.jsx';
import SelectModelComponent from '../machine-learning/selectmodel/index.jsx';
import styleSTR from './style.js';

import GLOBALS from './config.js';
import InputSection from './ui/modules/InputSection.js';
import LearningSection from './ui/modules/LearningSection.js';
import LearningButton from './ui/modules/LearningButton.js';
import LearningContainer from './ui/modules/LearningContainer.js';
import OutputSection from './ui/modules/OutputSection.js';
import BrowserUtils from './ui/components/BrowserUtils';

export const init = () => {
    if (typeof NodeList.prototype.forEach !== 'function') {
        NodeList.prototype.forEach = Array.prototype.forEach;
    }
    GLOBALS.browserUtils = new BrowserUtils();
    GLOBALS.learningSection = new LearningSection(document.querySelector('#learning-section'), GLOBALS.learnClassCount);
    GLOBALS.LearningContainer = new LearningContainer(document.querySelector('#learning-container'));
    GLOBALS.inputSection = new InputSection(document.querySelector('#input-section'));
    GLOBALS.outputSection = new OutputSection(document.querySelector('#output-section'));

    GLOBALS.inputSection.ready();
    GLOBALS.learningSection.ready();
    if (localStorage.getItem('isBackFacingCam') && localStorage.getItem('isBackFacingCam') === 'true') {
        GLOBALS.isBackFacingCam = true;
    }
    GLOBALS.init = new LearningButton();
};

export default class MachineLearning extends React.Component {
    constructor (props) {
        super(props);
        this.state = {};
    }

    componentDidMount () {
        init();
    }

    render () {
        return (
            <div
                id="machine_learning_panel"
                className={styles.MachineLearning}
            >
                <div dangerouslySetInnerHTML={{__html: styleSTR()}} />
                <SelectModelComponent />
                <div className={styles.wrapper}>
                    <div
                        className={styles.machine}
                        id="machine"
                    >
                        <div className={styles.machine__sections}>
                            <InputSectionComponent isMini={this.props.isMini} />
                            <div
                                id="right_section_container"
                                style={{display: this.props.isMini ? 'none' : 'flex'}}
                                className={styles.right_section_container}
                            >
                                <LearningContainerComponent />
                                <OutputSectionComponent />
                            </div>
                        </div>
                    </div>
                    {
                        this.props.isMini ? null : (
                            <FooterComponent onAddBlock={this.props.onAddBlock} />
                        )
                    }
                </div>
                <script
                    async
                    src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
                />
            </div>
        );
    }
}

MachineLearning.propTypes = {
    isMini: PropTypes.bool,
    onAddBlock: PropTypes.func
};
