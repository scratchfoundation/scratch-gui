import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import bindAll from 'lodash.bindall';

import styles from './editor-home.css';

import ProjectInput from '../tw-project-input/project-input.jsx';
import About from './about.jsx';
import Title from './title.jsx';
import Examples from '../tw-examples/examples.jsx';

class EditorHome extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleClickClose',
            'handleClickOverlay',
            'setOverlayRef'
        ]);
        this.overlayRef = null;
        this.state = {
            closed: false
        };
    }
    handleClickClose () {
        this.props.vm.renameSprite(this.props.editingTarget, 'Sprite');
        this.setState({
            closed: true
        });
    }
    handleClickOverlay (e) {
        if (e.target === this.overlayRef) {
            this.handleClickClose();
        }
    }
    setOverlayRef (ref) {
        this.overlayRef = ref;
    }
    render () {
        if (this.state.closed) {
            return <div />;
        }
        return (
            <div
                className={styles.overlay}
                ref={this.setOverlayRef}
                onClick={this.handleClickOverlay}
            >
                <a
                    className={styles.close}
                    onClick={this.handleClickClose}
                >
                    {/* multiplication sign */}
                    {'\u00d7'}
                </a>
                <div className={styles.inner}>
                    <Title />
                    <About />
                    <Examples responsive />
                    <ProjectInput />
                    <button
                        className={styles.newProject}
                        onClick={this.handleClickClose}
                    >
                        <FormattedMessage
                            defaultMessage="I want to make a new project"
                            description="Option to create a new project instead of load an existing one on homepage"
                            id="tw.ediorhome.new"
                        />
                    </button>
                </div>
            </div>
        );
    }
}

EditorHome.MAGIC_SPRITE_NAME = '__tw__';

EditorHome.propTypes = {
    editingTarget: PropTypes.string,
    vm: PropTypes.shape({
        renameSprite: PropTypes.func
    })
};

export default EditorHome;
