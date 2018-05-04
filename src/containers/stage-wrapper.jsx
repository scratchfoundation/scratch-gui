import PropTypes from 'prop-types';
import React from 'react';
import VM from 'scratch-vm';
import StageWrapperComponent from '../components/stage-wrapper/stage-wrapper.jsx';

const StageWrapper = props => <StageWrapperComponent {...props} />;

StageWrapper.propTypes = {
    isRendererSupported: PropTypes.bool.isRequired,
    vm: PropTypes.instanceOf(VM).isRequired
};

export default StageWrapper;
