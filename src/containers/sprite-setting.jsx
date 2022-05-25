import React from 'react'
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';
import { injectIntl } from 'react-intl';
import { STAGE_SIZE_MODES } from '../lib/layout-constants';
import errorBoundaryHOC from '../lib/error-boundary-hoc.jsx';
import { connect } from 'react-redux';
import VM from 'scratch-vm';
import Stage from './stage.jsx';
import SpriteSetting from '../components/sprite-setting/sprite-setting.jsx';


import {
    activateTab,
    COSTUMES_TAB_INDEX,
    SETTINGS,
    SOUNDS_TAB_INDEX
} from '../reducers/editor-tab';


// eslint-disable-next-line react/prefer-stateless-function


class SpriteSettingWrapper extends React.Component {

    constructor(props) {
        super(props)
        bindAll(this, [])
        this.state = {}

    }

    render() {

        return (
            <div style={{ height: '80%', width: '100%', display: 'flex' }}>
                <div style={{ width: '50%',  margin: '0.5%' }}>
                    <SpriteSetting
                        vm={this.props.vm}
                        stageSize={this.props.stageSize}
                        activeTabIndex={this.props.activeTabIndex}
                        onActivateCostumesTab={this.props.onActivateCostumesTab}
                        onActivateSoundsTab={this.props.onActivateSoundsTab}
                        onActivateTab={this.props.onActivateTab}
                        costumesTabVisible={this.props.costumesTabVisible}
                        soundsTabVisible={this.props.soundsTabVisible}
                    />
                </div>
                <div style={{  width: '50%', margin: '0.5%' }}>

                    <Stage
                        isFullScreen={true}
                        stageSize={STAGE_SIZE_MODES.large}
                        vm={this.props.vm}
                    />
                </div>
            </div>
        )
    }
}

SpriteSettingWrapper.propTypes = {
    stageSize: PropTypes.oneOf(Object.keys(STAGE_SIZE_MODES)),
    vm: PropTypes.instanceOf(VM).isRequired,
    isFullScreen: PropTypes.bool,
    isRtl: PropTypes.bool,

}

const mapStateToProps = state => {
    return {
        activeTabIndex: state.scratchGui.editorTab?.[SETTINGS].activeTabIndex || 0,
        costumesTabVisible: state.scratchGui.editorTab?.[SETTINGS]?.activeTabIndex === COSTUMES_TAB_INDEX,
        soundsTabVisible: state.scratchGui.editorTab?.[SETTINGS]?.activeTabIndex === SOUNDS_TAB_INDEX,
        vm: state.scratchGui.vm
    };
};

const mapDispatchToProps = dispatch => ({
    onActivateTab: tab => dispatch(activateTab(tab, SETTINGS)),
    onActivateCostumesTab: () => dispatch(activateTab(COSTUMES_TAB_INDEX, SETTINGS)),
    onActivateSoundsTab: () => dispatch(activateTab(SOUNDS_TAB_INDEX, SETTINGS)),
});


export default errorBoundaryHOC('Edit Sprite Tab')(
    injectIntl(connect(
        mapStateToProps,
        mapDispatchToProps
    )(SpriteSettingWrapper))
)