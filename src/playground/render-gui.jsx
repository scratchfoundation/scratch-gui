import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import GUI from '../containers/gui.jsx';
import TWParserHOC from '../lib/tw-parser-hoc.jsx';
import AppStateHOC from '../lib/app-state-hoc.jsx';

const onClickLogo = () => {
    // remove the hash to load the default project
    location.hash = '';
};

if (process.env.NODE_ENV === 'production' && typeof window === 'object') {
    // Warn before navigating away
    window.onbeforeunload = () => true;
}

const searchParams = new URLSearchParams(location.search);
const cloudHost = searchParams.get('cloud_host') || 'wss://clouddata.turbowarp.org';

const RenderGUI = ({isPlayerOnly, projectId}) => (
    <GUI
        onClickLogo={onClickLogo}
        cloudHost={cloudHost}
        canSave={false}
        canEditTitle
        enableCommunity
        isPlayerOnly={isPlayerOnly}
        projectId={projectId}
    />
);

RenderGUI.propTypes = {
    isPlayerOnly: PropTypes.bool,
    projectId: PropTypes.string
};

const mapStateToProps = state => ({
    isPlayerOnly: state.scratchGui.mode.isPlayerOnly
});

const mapDispatchToProps = dispatch => ({

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RenderGUI);
