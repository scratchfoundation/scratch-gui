import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {compose} from 'redux';

import Box from '../components/box/box.jsx';
import GUI from '../containers/gui.jsx';
import HashParserHOC from '../lib/hash-parser-hoc.jsx';
import AppStateHOC from '../lib/app-state-hoc.jsx';

import {setPlayer} from '../reducers/mode';

if (process.env.NODE_ENV === 'production' && typeof window === 'object') {
    // Warn before navigating away
    window.onbeforeunload = () => true;
}

import styles from './player.css';

import ProjectInput from './project-input/project-input.jsx';

const Player = ({isPlayerOnly, onSeeInside, projectId}) => (
    <Box className={classNames(isPlayerOnly ? styles.stageOnly : styles.editor)}>
        {isPlayerOnly ? (
            <React.Fragment>
                <h1>TurboWarp</h1>
                <p>TurboWarp compiles Scratch projects to JavaScript to make them run faster. Try it out by entering a project ID or URL below.</p>
                <button onClick={onSeeInside}>{'See inside'}</button>
            </React.Fragment>
        ) : null}
        <GUI
            canEditTitle
            enableCommunity
            isPlayerOnly={isPlayerOnly}
            projectId={projectId}
        />
        {isPlayerOnly ? (
            <ProjectInput></ProjectInput>
        ) : null}
    </Box>
);

Player.propTypes = {
    isPlayerOnly: PropTypes.bool,
    onSeeInside: PropTypes.func,
    projectId: PropTypes.string
};

const mapStateToProps = state => ({
    isPlayerOnly: state.scratchGui.mode.isPlayerOnly
});

const mapDispatchToProps = dispatch => ({
    onSeeInside: () => dispatch(setPlayer(false))
});

const ConnectedPlayer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Player);

// note that redux's 'compose' function is just being used as a general utility to make
// the hierarchy of HOC constructor calls clearer here; it has nothing to do with redux's
// ability to compose reducers.
const WrappedPlayer = compose(
    AppStateHOC,
    HashParserHOC
)(ConnectedPlayer);

const appTarget = document.createElement('div');
document.body.appendChild(appTarget);

ReactDOM.render(<WrappedPlayer isPlayerOnly />, appTarget);
