import bindAll from 'lodash.bindall';
import React from 'react';
import PropTypes from 'prop-types';

import monitorAdapter from '../lib/monitor-adapter.js';
import MonitorComponent from '../components/monitor/monitor.jsx';
import {addMonitorRect, getInitialPosition, resizeMonitorRect, removeMonitorRect} from '../reducers/monitor-layout';

import {connect} from 'react-redux';

class Monitor extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleDragEnd',
            'setElement'
        ]);
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
    setElement (monitorElt) {
        this.element = monitorElt;
    }
    render () {
        const monitorProps = monitorAdapter(this.props);
        return (
            <MonitorComponent
                componentRef={this.setElement}
                {...monitorProps}
                onDragEnd={this.handleDragEnd}
            />
        );
    }
}

Monitor.propTypes = {
    addMonitorRect: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
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
    value: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
    x: PropTypes.number,
    y: PropTypes.number
};
const mapStateToProps = state => ({
    monitorLayout: state.monitorLayout
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
