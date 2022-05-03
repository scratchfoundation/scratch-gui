import React from 'react'
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';
import { injectIntl, defineMessages } from 'react-intl';
import { STAGE_SIZE_MODES } from '../lib/layout-constants';
import errorBoundaryHOC from '../lib/error-boundary-hoc.jsx';
import { connect } from 'react-redux';
import VM from 'scratch-vm';
import Stage from './stage.jsx';
import SpriteSetting from '../components/sprite-setting/sprite-setting.jsx';
import layout from '../lib/layout-constants';

import {
    activateTab,
    COSTUMES_TAB_INDEX,
    SETTINGS,
    SOUNDS_TAB_INDEX
} from '../reducers/editor-tab';


// eslint-disable-next-line react/prefer-stateless-function

const messages = defineMessages({
    spriteSetting: {
        defaultMessage: 'Sprite Settings',
        description: 'Heading for the Sprite Settings Section',
        id: 'gui.spriteSetting.settingSprite'
    }
});



class SpriteSettingWrapper extends React.Component {

    constructor(props) {
        super(props)
        bindAll(this, [])
        this.state = {}

    }

    render() {

        return (
                    <SpriteSetting
                        id="spriteSettings"
                        vm={this.props.vm}
                        stageSize={this.props.stageSize}
                        activeTabIndex={this.props.activeTabIndex}
                        onActivateCostumesTab={this.props.onActivateCostumesTab}
                        onActivateSoundsTab={this.props.onActivateSoundsTab}
                        onActivateTab={this.props.onActivateTab}
                        costumesTabVisible={this.props.costumesTabVisible}
                        soundsTabVisible={this.props.soundsTabVisible}
                        onRequestClose={this.props.onRequestClose}
                        title={this.props.intl.formatMessage(messages.spriteSetting)}

                    />
        )
    }
}

SpriteSettingWrapper.propTypes = {
    stageSize: PropTypes.oneOf(Object.keys(STAGE_SIZE_MODES)),
    vm: PropTypes.instanceOf(VM).isRequired,
    isFullScreen: PropTypes.bool,
    isRtl: PropTypes.bool,
    isRendererSupported: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func,
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