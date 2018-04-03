import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import Renderer from 'scratch-render';
import VM from 'scratch-vm';
import {connect} from 'react-redux';

import {getEventXY} from '../lib/touch-utils';

import StageComponent from '../components/stage/stage.jsx';

import {
    activateColorPicker,
    deactivateColorPicker
} from '../reducers/color-picker';

const colorPickerRadius = 20;
const dragThreshold = 3; // Same as the block drag threshold

class Stage extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'attachMouseEvents',
            'cancelMouseDownTimeout',
            'detachMouseEvents',
            'handleDoubleClick',
            'handleQuestionAnswered',
            'onMouseUp',
            'onMouseMove',
            'onMouseDown',
            'onStartDrag',
            'onStopDrag',
            'onWheel',
            'updateRect',
            'questionListener',
            'setCanvas'
        ]);
        this.state = {
            mouseDownTimeoutId: null,
            mouseDownPosition: null,
            isDragging: false,
            dragOffset: null,
            dragId: null,
            colorInfo: null,
            question: null
        };
    }
    componentDidMount () {
        this.attachRectEvents();
        this.attachMouseEvents(this.canvas);
        this.updateRect();
        this.renderer = new Renderer(this.canvas);
        this.props.vm.attachRenderer(this.renderer);
        this.props.vm.runtime.addListener('QUESTION', this.questionListener);
    }
    shouldComponentUpdate (nextProps, nextState) {
        return this.props.width !== nextProps.width ||
            this.props.height !== nextProps.height ||
            this.props.isColorPicking !== nextProps.isColorPicking ||
            this.state.colorInfo !== nextState.colorInfo ||
            this.props.isFullScreen !== nextProps.isFullScreen ||
            this.state.question !== nextState.question;
    }
    componentDidUpdate (prevProps) {
        if (this.props.isColorPicking && !prevProps.isColorPicking) {
            this.startColorPickingLoop();
        } else if (!this.props.isColorPicking && prevProps.isColorPicking) {
            this.stopColorPickingLoop();
        }
        this.updateRect();
        this.renderer.resize(this.rect.width, this.rect.height);
    }
    componentWillUnmount () {
        this.detachMouseEvents(this.canvas);
        this.detachRectEvents();
        this.stopColorPickingLoop();
    }
    questionListener (question) {
        this.setState({question: question});
    }
    handleQuestionAnswered (answer) {
        this.setState({question: null}, () => {
            this.props.vm.runtime.emit('ANSWER', answer);
        });
    }
    startColorPickingLoop () {
        this.intervalId = setInterval(() => {
            this.setState({colorInfo: this.getColorInfo(this.pickX, this.pickY)});
        }, 30);
    }
    stopColorPickingLoop () {
        clearInterval(this.intervalId);
    }
    attachMouseEvents (canvas) {
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
        document.addEventListener('touchmove', this.onMouseMove);
        document.addEventListener('touchend', this.onMouseUp);
        canvas.addEventListener('mousedown', this.onMouseDown);
        canvas.addEventListener('touchstart', this.onMouseDown);
        canvas.addEventListener('wheel', this.onWheel);
    }
    detachMouseEvents (canvas) {
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
        document.removeEventListener('touchmove', this.onMouseMove);
        document.removeEventListener('touchend', this.onMouseUp);
        canvas.removeEventListener('mousedown', this.onMouseDown);
        canvas.removeEventListener('touchstart', this.onMouseDown);
        canvas.removeEventListener('wheel', this.onWheel);
    }
    attachRectEvents () {
        window.addEventListener('resize', this.updateRect);
        window.addEventListener('scroll', this.updateRect);
    }
    detachRectEvents () {
        window.removeEventListener('resize', this.updateRect);
        window.removeEventListener('scroll', this.updateRect);
    }
    updateRect () {
        this.rect = this.canvas.getBoundingClientRect();
    }
    getScratchCoords (x, y) {
        const nativeSize = this.renderer.getNativeSize();
        return [
            (nativeSize[0] / this.rect.width) * (x - (this.rect.width / 2)),
            (nativeSize[1] / this.rect.height) * (y - (this.rect.height / 2))
        ];
    }
    getColorInfo (x, y) {
        return {
            x: x,
            y: y,
            ...this.renderer.extractColor(x, y, colorPickerRadius)
        };
    }
    handleDoubleClick (e) {
        const {x, y} = getEventXY(e);
        // Set editing target from cursor position, if clicking on a sprite.
        const mousePosition = [x - this.rect.left, y - this.rect.top];
        const drawableId = this.renderer.pick(mousePosition[0], mousePosition[1]);
        if (drawableId === null) return;
        const targetId = this.props.vm.getTargetIdForDrawableId(drawableId);
        if (targetId === null) return;
        this.props.vm.setEditingTarget(targetId);
    }
    onMouseMove (e) {
        const {x, y} = getEventXY(e);
        const mousePosition = [x - this.rect.left, y - this.rect.top];

        // Set the pickX/Y for the color picker loop to pick up
        this.pickX = mousePosition[0];
        this.pickY = mousePosition[1];

        if (this.state.mouseDown && !this.state.isDragging) {
            const distanceFromMouseDown = Math.sqrt(
                Math.pow(mousePosition[0] - this.state.mouseDownPosition[0], 2) +
                Math.pow(mousePosition[1] - this.state.mouseDownPosition[1], 2)
            );
            if (distanceFromMouseDown > dragThreshold) {
                this.cancelMouseDownTimeout();
                this.onStartDrag(...this.state.mouseDownPosition);
            }
        }
        if (this.state.mouseDown && this.state.isDragging) {
            const spritePosition = this.getScratchCoords(mousePosition[0], mousePosition[1]);
            this.props.vm.postSpriteInfo({
                x: spritePosition[0] + this.state.dragOffset[0],
                y: -(spritePosition[1] + this.state.dragOffset[1]),
                force: true
            });
        }
        const coordinates = {
            x: mousePosition[0],
            y: mousePosition[1],
            canvasWidth: this.rect.width,
            canvasHeight: this.rect.height
        };
        this.props.vm.postIOData('mouse', coordinates);
    }
    onMouseUp (e) {
        const {x, y} = getEventXY(e);
        this.cancelMouseDownTimeout();
        this.setState({
            mouseDown: false,
            mouseDownPosition: null
        });
        const data = {
            isDown: false,
            x: x - this.rect.left,
            y: y - this.rect.top,
            canvasWidth: this.rect.width,
            canvasHeight: this.rect.height,
            wasDragged: this.state.isDragging
        };
        if (this.state.isDragging) {
            this.onStopDrag();
        }
        this.props.vm.postIOData('mouse', data);
    }
    onMouseDown (e) {
        this.updateRect();
        const {x, y} = getEventXY(e);
        const mousePosition = [x - this.rect.left, y - this.rect.top];
        if (e.button === 0 || e instanceof TouchEvent) {
            this.setState({
                mouseDown: true,
                mouseDownPosition: mousePosition,
                mouseDownTimeoutId: setTimeout(
                    this.onStartDrag.bind(this, mousePosition[0], mousePosition[1]),
                    400
                )
            });
        }
        const data = {
            isDown: true,
            x: mousePosition[0],
            y: mousePosition[1],
            canvasWidth: this.rect.width,
            canvasHeight: this.rect.height
        };
        this.props.vm.postIOData('mouse', data);
        if (e.preventDefault) {
            e.preventDefault();
        }
        if (this.props.isColorPicking) {
            const {r, g, b} = this.state.colorInfo.color;
            const componentToString = c => {
                const hex = c.toString(16);
                return hex.length === 1 ? `0${hex}` : hex;
            };
            const colorString = `#${componentToString(r)}${componentToString(g)}${componentToString(b)}`;
            this.props.onDeactivateColorPicker(colorString);
            this.setState({colorInfo: null});
        }
    }
    onWheel (e) {
        const data = {
            deltaX: e.deltaX,
            deltaY: e.deltaY
        };
        this.props.vm.postIOData('mouseWheel', data);
    }
    cancelMouseDownTimeout () {
        if (this.state.mouseDownTimeoutId !== null) {
            clearTimeout(this.state.mouseDownTimeoutId);
        }
        this.setState({mouseDownTimeoutId: null});
    }
    onStartDrag (x, y) {
        const drawableId = this.renderer.pick(x, y);
        if (drawableId === null) return;
        const drawableData = this.renderer.extractDrawable(drawableId, x, y);
        const targetId = this.props.vm.getTargetIdForDrawableId(drawableId);
        if (targetId === null) return;
        this.props.vm.startDrag(targetId);
        this.setState({
            isDragging: true,
            dragId: targetId,
            dragOffset: drawableData.scratchOffset
        });
    }
    onStopDrag () {
        this.props.vm.stopDrag(this.state.dragId);
        this.setState({
            isDragging: false,
            dragOffset: null,
            dragId: null
        });
    }
    setCanvas (canvas) {
        this.canvas = canvas;
    }
    render () {
        const {
            vm, // eslint-disable-line no-unused-vars
            onActivateColorPicker, // eslint-disable-line no-unused-vars
            ...props
        } = this.props;
        return (
            <StageComponent
                canvasRef={this.setCanvas}
                colorInfo={this.state.colorInfo}
                question={this.state.question}
                onDoubleClick={this.handleDoubleClick}
                onQuestionAnswered={this.handleQuestionAnswered}
                {...props}
            />
        );
    }
}

Stage.propTypes = {
    height: PropTypes.number,
    isColorPicking: PropTypes.bool,
    isFullScreen: PropTypes.bool.isRequired,
    onActivateColorPicker: PropTypes.func,
    onDeactivateColorPicker: PropTypes.func,
    vm: PropTypes.instanceOf(VM).isRequired,
    width: PropTypes.number
};

const mapStateToProps = state => ({
    isColorPicking: state.colorPicker.active,
    isFullScreen: state.stageSize.isFullScreen
});

const mapDispatchToProps = dispatch => ({
    onActivateColorPicker: () => dispatch(activateColorPicker()),
    onDeactivateColorPicker: color => dispatch(deactivateColorPicker(color))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Stage);
