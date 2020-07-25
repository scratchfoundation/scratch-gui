import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

class CompatibilityMode extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'toggleCompatibilityMode'
        ]);
    }
    toggleCompatibilityMode () {
        this.props.vm.setCompatibilityMode(!this.props.compatibilityMode);
    }
    render () {
        const {
            /* eslint-disable no-unused-vars */
            children,
            vm,
            /* eslint-enable no-unused-vars */
            ...props
        } = this.props;
        return this.props.children(this.toggleCompatibilityMode, props);
    }
}

CompatibilityMode.propTypes = {
    children: PropTypes.func,
    compatibilityMode: PropTypes.bool,
    vm: PropTypes.shape({
        setCompatibilityMode: PropTypes.func
    })
};

const mapStateToProps = state => ({
    vm: state.scratchGui.vm,
    compatibilityMode: state.scratchGui.vmStatus.compatibility
});

export default connect(
    mapStateToProps,
    () => ({}) // omit dispatch prop
)(CompatibilityMode);
