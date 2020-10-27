import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import GUI from '../containers/gui.jsx';

const searchParams = new URLSearchParams(location.search);
const cloudHost = searchParams.get('cloud_host') || 'wss://clouddata.turbowarp.org';

const RenderGUI = props => (
    <GUI
        cloudHost={cloudHost}
        canSave={false}
        basePath={process.env.ROOT}
        canEditTitle
        enableCommunity
        {...props}
    />
);

export default RenderGUI;
