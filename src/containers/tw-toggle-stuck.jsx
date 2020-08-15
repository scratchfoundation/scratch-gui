import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';

class ToggleStuck extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'toggleStuck'
        ]);
        this.state = {
            stuck: false
        };
    }
    toggleStuck () {
        this.props.vm.setLoopStuckChecking(!this.state.stuck);
        this.setState({
            stuck: !this.state.stuck
        });
    }
    render () {
        const {
            /* eslint-disable no-unused-vars */
            children,
            vm,
            /* eslint-enable no-unused-vars */
            ...props
        } = this.props;
        return this.props.children(this.toggleStuck, this.state.stuck);
    }
}

ToggleStuck.propTypes = {
    children: PropTypes.func,
    compatibilityMode: PropTypes.bool,
    vm: PropTypes.shape({
        setLoopStuckChecking: PropTypes.func
    })
};

const mapStateToProps = state => ({
    vm: state.scratchGui.vm,
    compatibilityMode: state.scratchGui.tw.compatibility
});

export default connect(
    mapStateToProps,
    () => ({}) // omit dispatch prop
)(ToggleStuck);
