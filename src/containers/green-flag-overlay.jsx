import bindAll from 'lodash.bindall';
import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import VM from 'scratch-vm';
import greenFlag from '../components/green-flag/icon--green-flag.svg';

class GreenFlagOverlay extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleClick'
        ]);
    }

    handleClick () {
        this.props.vm.start();
        this.props.vm.greenFlag();
    }

    render () {
        if (this.props.isStarted) return null;

        return (
            <div
                className={this.props.className}
                onClick={this.handleClick}
            >
                <img
                    draggable={false}
                    src={greenFlag}
                />
            </div>
        );
    }
}

GreenFlagOverlay.propTypes = {
    className: PropTypes.string,
    isStarted: PropTypes.bool,
    vm: PropTypes.instanceOf(VM)
};

const mapStateToProps = state => ({
    isStarted: state.scratchGui.vmStatus.started,
    vm: state.scratchGui.vm
});

const mapDispatchToProps = () => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GreenFlagOverlay);
