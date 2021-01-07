import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import VM from 'scratch-vm';

class FramerateChanger extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'changeFramerate'
        ]);
    }
    changeFramerate (e) {
        if (e && (e.ctrlKey || e.shiftKey)) {
            // eslint-disable-next-line no-alert
            const newFPS = prompt('Framerate: ', this.props.framerate);
            if (newFPS === null) {
                return;
            }
            const fps = +newFPS;
            if (isFinite(fps) && fps > 0) {
                this.props.vm.setFramerate(fps);
            }
        } else if (this.props.framerate === 60) {
            this.props.vm.setFramerate(30);
        } else {
            this.props.vm.setFramerate(60);
        }
    }
    render () {
        const {
            /* eslint-disable no-unused-vars */
            children,
            vm,
            /* eslint-enable no-unused-vars */
            ...props
        } = this.props;
        return this.props.children(this.changeFramerate, props);
    }
}

FramerateChanger.propTypes = {
    children: PropTypes.func,
    framerate: PropTypes.number,
    vm: PropTypes.instanceOf(VM)
};

const mapStateToProps = state => ({
    framerate: state.scratchGui.tw.framerate,
    vm: state.scratchGui.vm
});

export default connect(
    mapStateToProps,
    () => ({}) // omit dispatch prop
)(FramerateChanger);
