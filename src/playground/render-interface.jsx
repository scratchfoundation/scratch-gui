import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import TWParserHOC from '../lib/tw-parser-hoc.jsx';
import AppStateHOC from '../lib/app-state-hoc.jsx';

import GUI from './render-gui.jsx';
import MenuBar from '../components/menu-bar/menu-bar.jsx';
import ProjectInput from '../components/tw-project-input/project-input.jsx';
import About from '../components/tw-home/about.jsx';
import Title from '../components/tw-home/title.jsx';
import Examples from '../components/tw-examples/examples.jsx';

import styles from './gui.css';

const onClickLogo = () => {
    // remove the hash to load the default project
    location.hash = '';
};

if (process.env.NODE_ENV === 'production' && typeof window === 'object') {
    // Warn before navigating away
    window.onbeforeunload = () => true;
}

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

// note that redux's 'compose' function is just being used as a general utility to make
// the hierarchy of HOC constructor calls clearer here; it has nothing to do with redux's
// ability to compose reducers.
const WrappedInterface = compose(
    AppStateHOC,
    TWParserHOC
)(ConnectedInterface);

export default WrappedInterface;
