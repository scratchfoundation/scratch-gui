import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';

import GUI from '../containers/gui.jsx';
import HashParserHOC from '../lib/hash-parser-hoc.jsx';
import AppStateHOC from '../lib/app-state-hoc.jsx';

const onClickLogo = () => {
    // close any project if loaded
    location.hash = '';
};

if (process.env.NODE_ENV === 'production' && typeof window === 'object') {
    // Warn before navigating away
    window.onbeforeunload = () => true;
}

import styles from './gui.css';

import MenuBar from '../components/menu-bar/menu-bar.jsx';
import ProjectInput from '../components/tw-project-input/project-input.jsx';
import About from '../components/tw-home/about/about.jsx';
import Title from '../components/tw-home/title/title.jsx';
import SeeInside from './tw-see-inside/see-inside.jsx';

const Player = ({isPlayerOnly, projectId, canSeeInside}) => (
    <div className={classNames(isPlayerOnly ? styles.stageOnly : styles.editor)}>
        {isPlayerOnly ? (
            <MenuBar
                onClickLogo={onClickLogo}
                canChangeLanguage
            />
        ) : null}
        <div className={styles.center}>
            {isPlayerOnly ? (
                <Title />
            ) : null}
            <GUI
                onClickLogo={onClickLogo}
                cloudHost={'cirrus.garbomuffin.com'}
                canSave={false}
                canEditTitle
                enableCommunity
                isPlayerOnly={isPlayerOnly}
                projectId={projectId}
            />
            {isPlayerOnly ? (
                <div className="about">
                    <ProjectInput />
                    {canSeeInside ? (
                        <div className={styles.seeInside}>
                            <SeeInside />
                        </div>
                    ) : null}
                    <About />
                </div>
            ) : null}
        </div>
    </div>
);

Player.propTypes = {
    isPlayerOnly: PropTypes.bool,
    canSeeInside: PropTypes.bool,
    projectId: PropTypes.string
};

const mapStateToProps = state => ({
    isPlayerOnly: state.scratchGui.mode.isPlayerOnly
});

const mapDispatchToProps = dispatch => ({

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

export default WrappedPlayer;
