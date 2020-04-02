import React from 'react';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';
import styles from '../index.css';

import GLOBAL from '../config';

export default class FooterComponent extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleDone'
        ]);
    }

    handleDone () {
        if (GLOBAL.webcamClassifier && GLOBAL.webcamClassifier.images) {
            const res = Object.keys(GLOBAL.webcamClassifier.images).find(item =>
                !GLOBAL.webcamClassifier.images[item].hasimages);
            if (res) {
                // eslint-disable-next-line no-alert
                alert('请完成所有模型的训练！');
            } else {
                this.props.onAddBlock(window.DMACHINE);
            }
        }
    }

    render () {
        return (
            <div className={styles.footer_btn}>
                <button id="newmodel">新建模型</button>
                <button onClick={this.handleDone}>使用模型</button>
            </div>
        );
    }
}

FooterComponent.propTypes = {
    onAddBlock: PropTypes.func
};
