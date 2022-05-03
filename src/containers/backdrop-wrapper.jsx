import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';
import errorBoundaryHOC from '../lib/error-boundary-hoc.jsx';
import { connect } from 'react-redux';
import VM from 'scratch-vm';

import React from 'react'
import { injectIntl, defineMessages, intlShape } from 'react-intl';
import layout from '../lib/layout-constants';
import BackdropComponent from '../components/backdrop/backdrop.jsx';
import Modal from './modal.jsx';
import { spriteShape } from '../components/target-pane/target-pane.jsx';
import Box from '../components/box/box.jsx';


// eslint-disable-next-line react/prefer-stateless-function

const messages = defineMessages({
    backdropSetting: {
        defaultMessage: 'Backdrop Settings',
        description: 'Heading for the Backdrop Settings Section',
        id: 'gui.backdropSetting.settingBackdrop'
    }
});

const STAGE_TAB_INDEX = 0
const SOUNDS_TAB_INDEX = 1


class BackdropSettingWrapper extends React.Component {

    constructor(props) {
        super(props)
        bindAll(this, [
            'handleActiveTab',
            'handleSetStageTabActive',
            'handleSetSoundsTabActive',
            'handleSelectStage'
        ])
        this.state = {
            activeTabIndex: 0,
            stageActive: true,
            soundActive: false
        }

    }

    handleActiveTab(index) {
        this.setState({ activeTabIndex: index })
    }

    handleSetStageTabActive(){
        this.setState({ activeTabIndex: STAGE_TAB_INDEX, stageActive: true, soundActive: false })
    }

    handleSetSoundsTabActive() {
        this.setState({ activeTabIndex: SOUNDS_TAB_INDEX, stageActive: false, soundActive: true })
    }

    handleSelectStage (id) {
        this.props.vm.setEditingTarget(id);
        if (this.props.stage && id !== this.props.stage.id) {
            this.props.onHighlightTarget(id);
        }
    }

    render() {

        return (

            <Modal
                fullScreen
                id="backdropSettings"
                contentLabel={this.props.intl.formatMessage(messages.backdropSetting)}
                onRequestClose={this.props.onRequestClose}
            >
                <div style={{ height: '80%', width: '100%', display: 'flex' }}>
                    <div style={{ width: `calc(100vw - ${layout.standardStageWidthWithRightMargin}px)`, margin: '0.5%' }}>

                        <Box >
                            <BackdropComponent
                                vm={this.props.vm}
                                stage={this.props.stage}
                                editingTarget={this.props.editingTarget}
                                activeTabIndex={this.state.activeTabIndex}
                                stageTabVisible={this.state.stageActive}
                                soundsTabVisible={this.state.soundActive}
                                onActivateTab={this.handleActiveTab}
                                onActivateStageTab={this.handleSetStageTabActive}
                                onActivateSoundsTab={this.handleSetSoundsTabActive}
                                onSelectStage={this.handleSelectStage}
                            />
                        </Box>
                    </div></div>
            </Modal>

        )
    }
}

BackdropSettingWrapper.propTypes = {
    intl: intlShape,
    stage: spriteShape.isRequired,    
    vm: PropTypes.instanceOf(VM).isRequired,
    onRequestClose: PropTypes.func,
}

const mapStateToProps = state => {
    return {
        vm: state.scratchGui.vm,
        stage: state.scratchGui.targets.stage,
        editingTarget: state.scratchGui.targets.editingTarget
    };
};


export default errorBoundaryHOC('Edit Backdrop Tab')(
    injectIntl(connect(
        mapStateToProps,
        // mapDispatchToProps
    )(BackdropSettingWrapper))
)