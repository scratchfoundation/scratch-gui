import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import AppStateHOC from '../lib/app-state-hoc.jsx';
import TWParserHOC from '../lib/tw-parser-hoc.jsx';
import TWTitleHOC from '../lib/tw-title-hoc.jsx';

import GUI from './render-gui.jsx';
import MenuBar from '../components/menu-bar/menu-bar.jsx';
import ProjectInput from '../components/tw-project-input/project-input.jsx';
import About from '../components/tw-home/about.jsx';
import Title from '../components/tw-home/title.jsx';
import Examples from '../components/tw-examples/examples.jsx';

import styles from './gui.css';

if (window !== window.parent) {
    // Show a warning when trying to embed this page. Users shouldn't do that.
    // eslint-disable-next-line no-alert
    alert('You are embedding TurboWarp incorrectly.\n\nGo here for instructions: https://github.com/TurboWarp/scratch-gui/wiki/Embedding');
}

const onClickLogo = () => {
    location.hash = '';
};

const Interface = ({isPlayerOnly}) => (
    <div className={classNames(isPlayerOnly ? styles.stageOnly : styles.editor)}>
        {isPlayerOnly ? (
            <MenuBar
                onClickLogo={onClickLogo}
                canManageFiles
                canChangeLanguage
                enableSeeInside
            />
        ) : null}
        <div className={styles.center}>
            {isPlayerOnly ? (
                <Title />
            ) : null}
            <GUI
                isPlayerOnly={isPlayerOnly}
            />
            {isPlayerOnly ? (
                <div className="about">
                    <ProjectInput />
                    <About />
                    <Examples />
                </div>
            ) : null}
        </div>
    </div>
);

Interface.propTypes = {
    isPlayerOnly: PropTypes.bool
};

const mapStateToProps = state => ({
    isPlayerOnly: state.scratchGui.mode.isPlayerOnly
});

const mapDispatchToProps = dispatch => ({

});

const ConnectedInterface = connect(
    mapStateToProps,
    mapDispatchToProps
)(Interface);

const WrappedInterface = compose(
    AppStateHOC,
    TWParserHOC,
    TWTitleHOC
)(ConnectedInterface);

export default WrappedInterface;
