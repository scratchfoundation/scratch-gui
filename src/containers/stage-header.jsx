import PropTypes from 'prop-types';
import React from 'react';
import VM from 'scratch-vm';
import {setStageSize, setFullScreen, STAGE_SIZES} from '../reducers/stage-size';

import {connect} from 'react-redux';

import StageHeaderComponent from '../components/stage-header/stage-header.jsx';

// eslint-disable-next-line react/prefer-stateless-function
class StageHeader extends React.Component {
    render () {
        const {
            ...props
        } = this.props;
        return (
            <StageHeaderComponent
                {...props}
            />
        );
    }
}

StageHeader.propTypes = {
    stageSize: PropTypes.oneOf(Object.keys(STAGE_SIZES)),
    vm: PropTypes.instanceOf(VM).isRequired
};

const mapStateToProps = state => ({
    stageSize: state.stageSize.stageSize,
    isFullScreen: state.stageSize.isFullScreen
});

const mapDispatchToProps = dispatch => ({
    onSetStageLarge: () => dispatch(setStageSize(STAGE_SIZES.large)),
    onSetStageSmall: () => dispatch(setStageSize(STAGE_SIZES.small)),
    onSetStageFull: () => dispatch(setFullScreen(true)),
    onSetStageUnFull: () => dispatch(setFullScreen(false))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StageHeader);
