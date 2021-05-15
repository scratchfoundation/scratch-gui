import PropTypes from 'prop-types';
import React from 'react';
import {defineMessages, injectIntl, intlShape} from 'react-intl';
import bindAll from 'lodash.bindall';
import {connect} from 'react-redux';
import {closeSettingsModal} from '../reducers/modals';
import SettingsModalComponent from '../components/tw-settings-modal/settings-modal.jsx';
import twStageSize from '../lib/tw-stage-size';
import {searchParamsToString} from '../lib/tw-navigation-utils';

const messages = defineMessages({
    confirmReload: {
        defaultMessage: 'A reload is required to change stage size, are you sure you want to reload?',
        description: 'Confirmation that user wants to reload to apply settings',
        id: 'tw.settingsModal.confirmReload'
    },
    newFramerate: {
        defaultMessage: 'New framerate:',
        description: 'Prompt shown to choose a new framerate',
        id: 'tw.menuBar.newFramerate'
    }
});

const isDefaultStageSize = (width, height) => width === 480 && height === 360;

class UsernameModal extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleClose',
            'handleFramerateChange',
            'handleCustomizeFramerate',
            'handleHighQualityPenChange',
            'handleInterpolationChange',
            'handleInfiniteClonesChange',
            'handleRemoveFencingChange',
            'handleRemoveLimitsChange',
            'handleWarpTimerChange',
            'handleStageWidthChange',
            'handleStageHeightChange',
            'handleDisableCompilerChange',
            'handleStoreProjectOptions'
        ]);
        this.state = {
            stageWidth: twStageSize.width,
            stageHeight: twStageSize.height,
            reloadRequired: false
        };
    }
    handleClose () {
        if (this.state.reloadRequired) {
            // eslint-disable-next-line no-alert
            if (confirm(this.props.intl.formatMessage(messages.confirmReload))) {
                this.applyChangesThatNeedReload();
                return;
            }
        }
        this.props.onCloseSettingsModal();
    }
    handleFramerateChange (e) {
        this.props.vm.setFramerate(e.target.checked ? 60 : 30);
    }
    handleCustomizeFramerate () {
        // eslint-disable-next-line no-alert
        const newFramerate = +prompt(this.props.intl.formatMessage(messages.newFramerate), this.props.framerate);
        if (newFramerate > 0 && isFinite(newFramerate)) {
            this.props.vm.setFramerate(+newFramerate);
        }
    }
    handleHighQualityPenChange (e) {
        this.props.vm.renderer.setUseHighQualityRender(e.target.checked);
    }
    handleInterpolationChange (e) {
        this.props.vm.setInterpolation(e.target.checked);
    }
    handleInfiniteClonesChange (e) {
        this.props.vm.setRuntimeOptions({
            maxClones: e.target.checked ? Infinity : 300
        });
    }
    handleRemoveFencingChange (e) {
        this.props.vm.setRuntimeOptions({
            fencing: !e.target.checked
        });
    }
    handleRemoveLimitsChange (e) {
        this.props.vm.setRuntimeOptions({
            miscLimits: !e.target.checked
        });
    }
    handleWarpTimerChange (e) {
        this.props.vm.setCompilerOptions({
            warpTimer: e.target.checked
        });
    }
    handleDisableCompilerChange (e) {
        this.props.vm.setCompilerOptions({
            enabled: !e.target.checked
        });
    }
    handleStageWidthChange (value) {
        this.setState({
            stageWidth: value,
            reloadRequired: true
        });
    }
    handleStageHeightChange (value) {
        this.setState({
            stageHeight: value,
            reloadRequired: true
        });
    }
    applyChangesThatNeedReload () {
        const urlParams = new URLSearchParams(location.search);
        if (isDefaultStageSize(this.state.stageWidth, this.state.stageHeight)) {
            urlParams.delete('size');
        } else {
            urlParams.set('size', `${this.state.stageWidth}x${this.state.stageHeight}`);
        }
        const search = searchParamsToString(urlParams);
        location.href = `${location.pathname}${search}`;
    }
    handleStoreProjectOptions () {
        this.props.vm.storeProjectOptions();
    }
    render () {
        const {
            /* eslint-disable no-unused-vars */
            onCloseSettingsModal,
            vm,
            /* eslint-enable no-unused-vars */
            ...props
        } = this.props;
        return (
            <SettingsModalComponent
                onClose={this.handleClose}
                reloadRequired={this.state.reloadRequired}
                onFramerateChange={this.handleFramerateChange}
                onCustomizeFramerate={this.handleCustomizeFramerate}
                onHighQualityPenChange={this.handleHighQualityPenChange}
                onInterpolationChange={this.handleInterpolationChange}
                onInfiniteClonesChange={this.handleInfiniteClonesChange}
                onRemoveFencingChange={this.handleRemoveFencingChange}
                onRemoveLimitsChange={this.handleRemoveLimitsChange}
                onWarpTimerChange={this.handleWarpTimerChange}
                onStageWidthChange={this.handleStageWidthChange}
                onStageHeightChange={this.handleStageHeightChange}
                onDisableCompilerChange={this.handleDisableCompilerChange}
                stageWidth={this.state.stageWidth}
                stageHeight={this.state.stageHeight}
                customStageSizeEnabled={this.state.stageWidth !== 480 || this.state.stageHeight !== 360}
                onStoreProjectOptions={this.handleStoreProjectOptions}
                {...props}
            />
        );
    }
}

UsernameModal.propTypes = {
    intl: intlShape,
    onCloseSettingsModal: PropTypes.func,
    vm: PropTypes.shape({
        renderer: PropTypes.shape({
            setUseHighQualityRender: PropTypes.func
        }),
        setFramerate: PropTypes.func,
        setCompilerOptions: PropTypes.func,
        setInterpolation: PropTypes.func,
        setRuntimeOptions: PropTypes.func,
        storeProjectOptions: PropTypes.func
    }),
    framerate: PropTypes.number,
    highQualityPen: PropTypes.bool,
    interpolation: PropTypes.bool,
    infiniteClones: PropTypes.bool,
    removeFencing: PropTypes.bool,
    removeLimits: PropTypes.bool,
    warpTimer: PropTypes.bool,
    disableCompiler: PropTypes.bool
};

const mapStateToProps = state => ({
    vm: state.scratchGui.vm,
    framerate: state.scratchGui.tw.framerate,
    highQualityPen: state.scratchGui.tw.highQualityPen,
    interpolation: state.scratchGui.tw.interpolation,
    infiniteClones: state.scratchGui.tw.runtimeOptions.maxClones === Infinity,
    removeFencing: !state.scratchGui.tw.runtimeOptions.fencing,
    removeLimits: !state.scratchGui.tw.runtimeOptions.miscLimits,
    warpTimer: state.scratchGui.tw.compilerOptions.warpTimer,
    disableCompiler: !state.scratchGui.tw.compilerOptions.enabled
});

const mapDispatchToProps = dispatch => ({
    onCloseSettingsModal: () => dispatch(closeSettingsModal())
});

export default injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(UsernameModal));
