import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import VM from 'scratch-vm';
import {injectIntl, intlShape} from 'react-intl';
import {connect} from 'react-redux';

import ControlsComponent from '../components/controls/controls.jsx';

import RubyToBlocksConverterHOC from '../lib/ruby-to-blocks-converter-hoc.jsx';

class Controls extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleGreenFlagClick',
            'handleStopAllClick'
        ]);
    }
    handleGreenFlagClick (e) {
        e.preventDefault();

        const converter = this.props.targetCodeToBlocks(this.props.intl.formatMessage);
        if (!converter.result) {
            return;
        }
        const shiftKey = e.shiftKey;
        converter.apply()
            .then(() => {
                if (shiftKey) {
                    this.props.vm.setTurboMode(!this.props.turbo);
                } else {
                    if (!this.props.isStarted) {
                        this.props.vm.start();
                    }
                    this.props.vm.greenFlag();
                }
            });
    }
    handleStopAllClick (e) {
        e.preventDefault();
        this.props.vm.stopAll();
    }
    render () {
        const {
            vm, // eslint-disable-line no-unused-vars
            targetCodeToBlocks, // eslint-disable-line no-unused-vars
            isStarted, // eslint-disable-line no-unused-vars
            projectRunning,
            turbo,
            ...props
        } = this.props;
        return (
            <ControlsComponent
                {...props}
                active={projectRunning}
                turbo={turbo}
                onGreenFlagClick={this.handleGreenFlagClick}
                onStopAllClick={this.handleStopAllClick}
            />
        );
    }
}

Controls.propTypes = {
    intl: intlShape.isRequired,
    isStarted: PropTypes.bool.isRequired,
    projectRunning: PropTypes.bool.isRequired,
    targetCodeToBlocks: PropTypes.func,
    turbo: PropTypes.bool.isRequired,
    vm: PropTypes.instanceOf(VM)
};

const mapStateToProps = state => ({
    isStarted: state.scratchGui.vmStatus.running,
    projectRunning: state.scratchGui.vmStatus.running,
    turbo: state.scratchGui.vmStatus.turbo
});
// no-op function to prevent dispatch prop being passed to component
const mapDispatchToProps = () => ({});

export default RubyToBlocksConverterHOC(injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(Controls)));
