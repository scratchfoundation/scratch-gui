import bindAll from 'lodash.bindall';
import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import VM from 'scratch-vm';

class TargetHighlight extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'getPageCoords'
        ]);
    }

    // Transform scratch coordinates into page coordinates
    getPageCoords (x, y) {
        const nativeSize = this.props.vm.renderer.getNativeSize();
        const rect = this.props.vm.renderer.canvas.getBoundingClientRect();
        return [
            ((rect.width / nativeSize[0]) * x) + (rect.width / 2),
            -((rect.height / nativeSize[1]) * y) + (rect.height / 2)
        ];
    }

    render () {
        const {
            className,
            highlightedTargetId,
            highlightedTargetTime,
            vm
        } = this.props;

        if (!(highlightedTargetId && vm && vm.renderer)) return null;

        const target = vm.runtime.getTargetById(highlightedTargetId);
        const bounds = vm.renderer.getBounds(target.drawableID);
        const [left, top] = this.getPageCoords(bounds.left, bounds.top);
        const [right, bottom] = this.getPageCoords(bounds.right, bounds.bottom);

        const pad = 2; // px

        return (
            <div
                className={className}
                // Ensure new DOM element each update to restart animation
                key={highlightedTargetTime}
                style={{
                    position: 'absolute',
                    top: `${top - pad}px`,
                    left: `${left - pad}px`,
                    width: `${(right - left) + (2 * pad)}px`,
                    height: `${(bottom - top) + (2 * pad)}px`
                }}
            />
        );
    }
}

TargetHighlight.propTypes = {
    className: PropTypes.string,
    highlightedTargetId: PropTypes.string,
    highlightedTargetTime: PropTypes.number,
    vm: PropTypes.instanceOf(VM)
};

const mapStateToProps = state => ({
    highlightedTargetTime: state.scratchGui.targets.highlightedTargetTime,
    highlightedTargetId: state.scratchGui.targets.highlightedTargetId,
    vm: state.scratchGui.vm
});

const mapDispatchToProps = () => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TargetHighlight);
