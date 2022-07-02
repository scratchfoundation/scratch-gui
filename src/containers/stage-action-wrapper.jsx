import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import VM from 'scratch-vm';
import {STAGE_SIZE_MODES} from '../lib/layout-constants';
import {BLOCK, SETTINGS_TAB_INDEX} from '../reducers/editor-tab';
// import {setStageSize} from '../reducers/stage-size';
import {toggleStage} from '../reducers/stage';
import {setFullScreen} from '../reducers/mode';

import {connect} from 'react-redux';

import StageActionComponent from '../components/stage-action/stage-action.jsx';

// eslint-disable-next-line react/prefer-stateless-function
class StageActionWrapper extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleKeyPress'
        ]);
    }
    componentDidMount () {
        document.addEventListener('keydown', this.handleKeyPress);
    }
    componentWillUnmount () {
        document.removeEventListener('keydown', this.handleKeyPress);
    }
    handleKeyPress (event) {
        if (event.key === 'Escape' && this.props.isFullScreen) {
            this.props.onSetStageUnFull(false);
        }
    }
    render () {
        const {
            ...props
        } = this.props;
        return (
            <StageActionComponent
                {...props}
                onKeyPress={this.handleKeyPress}
            />
        );
    }
}

StageActionWrapper.propTypes = {
    isFullScreen: PropTypes.bool,
    isPlayerOnly: PropTypes.bool,
    onSetStageUnFull: PropTypes.func.isRequired,
    showBranding: PropTypes.bool,
    stageVisible: PropTypes.bool,
    settingsTabVisible: PropTypes.bool,
    stageSizeMode: PropTypes.oneOf(Object.keys(STAGE_SIZE_MODES)),
    vm: PropTypes.instanceOf(VM).isRequired
};

const mapStateToProps = state => ({
    stageVisible: state.scratchGui.stage.stageVisible,
    stageSizeMode: state.scratchGui.stageSize.stageSize,
    showBranding: state.scratchGui.mode.showBranding,
    isFullScreen: state.scratchGui.mode.isFullScreen,
    isPlayerOnly: state.scratchGui.mode.isPlayerOnly,
    settingsTabVisible: state.scratchGui.editorTab?.[BLOCK].activeTabIndex === SETTINGS_TAB_INDEX,

});

const mapDispatchToProps = dispatch => ({
    // onSetStageLarge: () => dispatch(setStageSize(STAGE_SIZE_MODES.large)),
    // onSetStageSmall: () => dispatch(setStageSize(STAGE_SIZE_MODES.small)),
    onSetStageFull: () => dispatch(setFullScreen(true)),
    onSetStageUnFull: () => dispatch(setFullScreen(false)),
    onStageToggle: () => dispatch(toggleStage())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StageActionWrapper);
