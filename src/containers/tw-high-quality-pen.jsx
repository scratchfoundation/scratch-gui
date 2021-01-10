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
        this.props.vm.renderer.setUseHighQualityRender(!this.props.highQualityPen);
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
            setUseHighQualityRender: PropTypes.func
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
