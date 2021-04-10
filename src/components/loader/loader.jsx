import React from 'react';
import {defineMessages, FormattedMessage, intlShape, injectIntl} from 'react-intl';
import classNames from 'classnames';
import styles from './loader.css';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';

import topBlock from './top-block.svg';
import middleBlock from './middle-block.svg';
import bottomBlock from './bottom-block.svg';

import * as progressMonitor from './tw-progress-monitor';

// tw:
// we make some rather large changes here:
//  - remove random message, replaced with message dependent on what is actually being loaded
//  - add a progress bar
//  - bring in intl so that we can translate everything
// The way of doing this is extremely unusual and weird compared to how things are typically done for performance.
// This is because react updates are too performance crippling to handle the progress bar rapidly updating.

const mainMessages = {
    'gui.loader.headline': (
        <FormattedMessage
            defaultMessage="Loading Project"
            description="Main loading message"
            id="gui.loader.headline"
        />
    ),
    'gui.loader.creating': (
        <FormattedMessage
            defaultMessage="Creating Project"
            description="Main creating message"
            id="gui.loader.creating"
        />
    )
};

const messages = defineMessages({
    generic: {
        defaultMessage: 'Loading project …',
        description: 'Initial generic loading message',
        id: 'tw.loader.generic'
    },
    projectData: {
        defaultMessage: 'Downloading project data …',
        description: 'Appears when loading project data',
        id: 'tw.loader.data'
    },
    assetsKnown: {
        defaultMessage: 'Downloading assets ({complete}/{total}) …',
        description: 'Appears when loading project assets and amount of assets is known',
        id: 'tw.loader.assets.known'
    },
    assetsUnknown: {
        defaultMessage: 'Downloading assets …',
        description: 'Appears when loading project assets but amount of assets is unknown',
        id: 'tw.loader.assets.unknown'
    }
});

class LoaderComponent extends React.Component {
    constructor (props) {
        super(props);
        this._state = 0;
        this.progress = 0;
        this.complete = 0;
        this.total = 0;
        bindAll(this, [
            'barInnerRef',
            'handleProgressChange',
            'messageRef'
        ]);
    }
    componentDidMount () {
        progressMonitor.setProgressHandler(this.handleProgressChange);
        this.updateMessage();
    }
    componentDidUpdate () {
        this.update();
    }
    componentWillUnmount () {
        progressMonitor.setProgressHandler(() => {});
    }
    handleProgressChange (state, progress, complete, total) {
        if (state !== this._state) {
            this._state = state;
            this.updateMessage();
        }
        this.progress = progress;
        this.complete = complete;
        this.total = total;
        this.update();
    }
    update () {
        this.barInner.style.width = `${this.progress * 100}%`;
        if (this._state === 2) {
            this.updateMessage();
        }
    }
    updateMessage () {
        if (this._state === 0) {
            this.message.textContent = this.props.intl.formatMessage(messages.generic);
        } else if (this._state === 1) {
            this.message.textContent = this.props.intl.formatMessage(messages.projectData);
        } else if (this.total > 0) {
            this.message.textContent = this.props.intl.formatMessage(messages.assetsKnown, {
                complete: this.complete,
                total: this.total
            });
        } else {
            this.message.textContent = this.props.intl.formatMessage(messages.assetsUnknown);
        }
    }
    barInnerRef (element) {
        this.barInner = element;
    }
    messageRef (element) {
        this.message = element;
    }
    render () {
        return (
            <div
                className={classNames(styles.background, {
                    [styles.fullscreen]: this.props.isFullScreen
                })}
            >
                <div className={styles.container}>
                    <div className={styles.blockAnimation}>
                        <img
                            className={styles.topBlock}
                            src={topBlock}
                        />
                        <img
                            className={styles.middleBlock}
                            src={middleBlock}
                        />
                        <img
                            className={styles.bottomBlock}
                            src={bottomBlock}
                        />
                    </div>
                    <div className={styles.title}>
                        {mainMessages[this.props.messageId]}
                    </div>
                    <div className={styles.messageContainerOuter}>
                        <div
                            className={styles.messageContainerInner}
                            ref={this.messageRef}
                        />
                    </div>
                    <div className={styles.twProgressOuter}>
                        <div
                            className={styles.twProgressInner}
                            ref={this.barInnerRef}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

LoaderComponent.propTypes = {
    isFullScreen: PropTypes.bool,
    intl: intlShape.isRequired,
    messageId: PropTypes.string
};
LoaderComponent.defaultProps = {
    isFullScreen: false,
    messageId: 'gui.loader.headline'
};

export default injectIntl(LoaderComponent);
