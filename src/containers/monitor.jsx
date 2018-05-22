import bindAll from 'lodash.bindall';
import React from 'react';
import PropTypes from 'prop-types';

import monitorAdapter from '../lib/monitor-adapter.js';
import MonitorComponent, {monitorModes} from '../components/monitor/monitor.jsx';
import {addMonitorRect, getInitialPosition, resizeMonitorRect, removeMonitorRect} from '../reducers/monitor-layout';

import {connect} from 'react-redux';

const availableModes = opcode => (
    monitorModes.filter(t => {
        if (opcode === 'data_variable') {
            return t !== 'list';
        } else if (opcode === 'data_listcontents') {
            return t === 'list';
        }
        return t !== 'slider' && t !== 'list';
    })
);

class Monitor extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleDragEnd',
            'handleNextMode',
            'handleSetModeToDefault',
            'handleSetModeToLarge',
            'handleSetModeToSlider',
            'setElement'
        ]);

        // @todo consume from VM, but need to store until there are APIs to update vm
        this.state = {
            mode: props.mode || 'default'
        };
    }
    componentDidMount () {
        let rect;
        // Load the VM provided position if not loaded already
        if (this.props.x && this.props.y && !this.props.monitorLayout.savedMonitorPositions[this.props.id]) {
            rect = {
                upperStart: {x: this.props.x, y: this.props.y},
                lowerEnd: {x: this.props.x + this.element.offsetWidth, y: this.props.y + this.element.offsetHeight}
            };
            this.props.addMonitorRect(this.props.id, rect, true /* savePosition */);
        } else { // Newly created user monitor
            rect = getInitialPosition(
                this.props.monitorLayout, this.props.id, this.element.offsetWidth, this.element.offsetHeight);
            this.props.addMonitorRect(this.props.id, rect);
        }
        this.element.style.top = `${rect.upperStart.y}px`;
        this.element.style.left = `${rect.upperStart.x}px`;
    }
    shouldComponentUpdate (nextProps, nextState) {
        if (nextState !== this.state) {
            return true;
        }
        for (const key of Object.getOwnPropertyNames(nextProps)) {
            // Don't need to rerender when other monitors are moved.
            // monitorLayout is only used during initial layout.
            if (key !== 'monitorLayout' && nextProps[key] !== this.props[key]) {
                return true;
            }
        }
        return false;
    }
    componentDidUpdate () {
        this.props.resizeMonitorRect(this.props.id, this.element.offsetWidth, this.element.offsetHeight);
    }
    componentWillUnmount () {
        this.props.removeMonitorRect(this.props.id);
    }
    handleDragEnd (e, {x, y}) {
        this.props.onDragEnd(
            this.props.id,
            parseInt(this.element.style.left, 10) + x,
            parseInt(this.element.style.top, 10) + y
        );
    }
    handleNextMode () {
        const modes = availableModes(this.props.opcode);
        const modeIndex = modes.indexOf(this.state.mode);
        this.setState({mode: modes[(modeIndex + 1) % modes.length]});
    }
    handleSetModeToDefault () {
        this.setState({mode: 'default'});
    }
    handleSetModeToLarge () {
        this.setState({mode: 'large'});
    }
    handleSetModeToSlider () {
        this.setState({mode: 'slider'});
    }
    setElement (monitorElt) {
        this.element = monitorElt;
    }
    render () {
        const monitorProps = monitorAdapter(this.props);
        const showSliderOption = availableModes(this.props.opcode).indexOf('slider') !== -1;
        return (
            <MonitorComponent
                componentRef={this.setElement}
                {...monitorProps}
                draggable={this.props.draggable}
                height={this.props.height}
                max={this.props.max}
                min={this.props.min}
                mode={this.state.mode}
                targetId={this.props.targetId}
                width={this.props.width}
                onDragEnd={this.handleDragEnd}
                onNextMode={this.handleNextMode}
                onSetModeToDefault={this.handleSetModeToDefault}
                onSetModeToLarge={this.handleSetModeToLarge}
                onSetModeToSlider={showSliderOption ? this.handleSetModeToSlider : null}
            />
        );
    }
}

Monitor.propTypes = {
    addMonitorRect: PropTypes.func.isRequired,
    draggable: PropTypes.bool,
    height: PropTypes.number,
    id: PropTypes.string.isRequired,
    max: PropTypes.number,
    min: PropTypes.number,
    mode: PropTypes.oneOf(['default', 'slider', 'large', 'list']),
    monitorLayout: PropTypes.shape({
        monitors: PropTypes.object,
        savedMonitorPositions: PropTypes.object
    }).isRequired,
    onDragEnd: PropTypes.func.isRequired,
    opcode: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
    params: PropTypes.object, // eslint-disable-line react/no-unused-prop-types, react/forbid-prop-types
    removeMonitorRect: PropTypes.func.isRequired,
    resizeMonitorRect: PropTypes.func.isRequired,
    spriteName: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
    targetId: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.arrayOf(PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]))
    ]), // eslint-disable-line react/no-unused-prop-types
    width: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number
};
const mapStateToProps = state => ({
    monitorLayout: state.scratchGui.monitorLayout
});
const mapDispatchToProps = dispatch => ({
    addMonitorRect: (id, rect, savePosition) =>
        dispatch(addMonitorRect(id, rect.upperStart, rect.lowerEnd, savePosition)),
    resizeMonitorRect: (id, newWidth, newHeight) => dispatch(resizeMonitorRect(id, newWidth, newHeight)),
    removeMonitorRect: id => dispatch(removeMonitorRect(id))
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Monitor);
