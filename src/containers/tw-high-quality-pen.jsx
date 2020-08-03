import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

class HighQualityPen extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'toggleHighQualityPen'
        ]);
    }
    toggleHighQualityPen () {
        if (!this.props.highQualityPen) {
            // todo: temporary until the mentioned bugs are fixed
            if (!confirm("This is an experimental option that automatically resizes the pen layer to make it look smoother. Keep in mind:\n- the pen layer is CLEARED any time it is resized\n- please start the project at least once before enabling this, otherwise it may scale wrong\n- this may reduce performance\nI'll try to get most of these fixed eventually.")) {
                return;
            }
        }
        this.props.vm.renderer.setUseHighQualityPen(!this.props.highQualityPen);
    }
    render () {
        const {
            /* eslint-disable no-unused-vars */
            children,
            vm,
            /* eslint-enable no-unused-vars */
            ...props
        } = this.props;
        return this.props.children(this.toggleHighQualityPen, props);
    }
}

HighQualityPen.propTypes = {
    children: PropTypes.func,
    highQualityPen: PropTypes.bool,
    vm: PropTypes.shape({
        renderer: PropTypes.shape({
            setUseHighQualityPen: PropTypes.func
        })
    })
};

const mapStateToProps = state => ({
    vm: state.scratchGui.vm,
    highQualityPen: state.scratchGui.tw.highQualityPen
});

export default connect(
    mapStateToProps,
    () => ({}) // omit dispatch prop
)(HighQualityPen);
