import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import Renderer from 'scratch-render';
import VM from 'scratch-vm';
import {connect} from 'react-redux';

import {STAGE_DISPLAY_SIZES} from '../lib/layout-constants';
import {getEventXY} from '../lib/touch-utils';
import VideoProvider from '../lib/video/video-provider';
import {SVGRenderer as V2SVGAdapter} from 'scratch-svg-renderer';
import {BitmapAdapter as V2BitmapAdapter} from 'scratch-svg-renderer';

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
            'setDragCanvas',
            'clearDragCanvas',
            'drawDragCanvas',
            'positionDragCanvas'
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
        if (this.props.vm.runtime.renderer) {
            this.renderer = this.props.vm.runtime.renderer;
            this.canvas = this.props.vm.runtime.renderer._gl.canvas;
        } else {
            this.canvas = document.createElement('canvas');
            this.renderer = new Renderer(this.canvas);
            this.props.vm.attachRenderer(this.renderer);
        }
        this.props.vm.attachV2SVGAdapter(new V2SVGAdapter());
        this.props.vm.attachV2BitmapAdapter(new V2BitmapAdapter());
        this.props.vm.setVideoProvider(new VideoProvider());
    }
    componentDidMount () {
        this.attachRectEvents();
        this.attachMouseEvents(this.canvas);
        this.updateRect();
        this.props.vm.runtime.addListener('QUESTION', this.questionListener);
    }
    shouldComponentUpdate (nextProps, nextState) {
        return this.props.stageSize !== nextProps.stageSize ||
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
        this.props.vm.runtime.removeListener('QUESTION', this.questionListener);
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
            // Editor drag style only updates the drag canvas, does full update at the end of drag
            // Non-editor drag style just updates the sprite continuously.
            if (this.props.useEditorDragStyle) {
                this.positionDragCanvas(mousePosition[0], mousePosition[1]);
            } else {
                const spritePosition = this.getScratchCoords(mousePosition[0], mousePosition[1]);
                this.props.vm.postSpriteInfo({
                    x: spritePosition[0] + this.state.dragOffset[0],
                    y: -(spritePosition[1] + this.state.dragOffset[1]),
                    force: true
                });
            }
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
        const mousePosition = [x - this.rect.left, y - this.rect.top];
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
            this.onStopDrag(mousePosition[0], mousePosition[1]);
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
    drawDragCanvas (drawableData) {
        const {
            data,
            width,
            height,
            x,
            y
        } = drawableData;
        this.dragCanvas.width = width;
        this.dragCanvas.height = height;
        // Need to convert uint8array from WebGL readPixels into Uint8ClampedArray
        // for ImageData constructor. Shares underlying buffer, so it is fast.
        const imageData = new ImageData(
            new Uint8ClampedArray(data.buffer), width, height);
        this.dragCanvas.getContext('2d').putImageData(imageData, 0, 0);
        // Position so that pick location is at (0, 0) so that  positionDragCanvas()
        // can use translation to move to mouse position smoothly.
        this.dragCanvas.style.left = `${-x}px`;
        this.dragCanvas.style.top = `${-y}px`;
        this.dragCanvas.style.display = 'block';
    }
    clearDragCanvas () {
        this.dragCanvas.width = this.dragCanvas.height = 0;
        this.dragCanvas.style.display = 'none';
    }
    positionDragCanvas (mouseX, mouseY) {
        // mouseX/Y are relative to stage top/left, and dragCanvas is already
        // positioned so that the pick location is at (0,0).
        this.dragCanvas.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    }
    onStartDrag (x, y) {
        if (this.state.dragId) return;
        const drawableId = this.renderer.pick(x, y);
        if (drawableId === null) return;
        const drawableData = this.renderer.extractDrawable(drawableId, x, y);
        const targetId = this.props.vm.getTargetIdForDrawableId(drawableId);
        if (targetId === null) return;

        // Only start drags on non-draggable targets in editor drag mode
        if (!this.props.useEditorDragStyle) {
            const target = this.props.vm.runtime.getTargetById(targetId);
            if (!target.draggable) return;
        }

        this.props.vm.startDrag(targetId);
        this.setState({
            isDragging: true,
            dragId: targetId,
            dragOffset: drawableData.scratchOffset
        });
        if (this.props.useEditorDragStyle) {
            this.drawDragCanvas(drawableData);
            this.positionDragCanvas(x, y);
            this.props.vm.postSpriteInfo({visible: false});
        }
    }
    onStopDrag (mouseX, mouseY) {
        const dragId = this.state.dragId;
        const commonStopDragActions = () => {
            this.props.vm.stopDrag(dragId);
            this.setState({
                isDragging: false,
                dragOffset: null,
                dragId: null
            });
        };
        if (this.props.useEditorDragStyle) {
            // Need to sequence these actions to prevent flickering.
            const spriteInfo = {visible: true};
            // First update the sprite position if dropped in the stage.
            if (mouseX > 0 && mouseX < this.rect.width &&
                mouseY > 0 && mouseY < this.rect.height) {
                const spritePosition = this.getScratchCoords(mouseX, mouseY);
                spriteInfo.x = spritePosition[0] + this.state.dragOffset[0];
                spriteInfo.y = -(spritePosition[1] + this.state.dragOffset[1]);
                spriteInfo.force = true;
            }
            this.props.vm.postSpriteInfo(spriteInfo);
            // Then clear the dragging canvas and stop drag (potentially slow if selecting sprite)
            setTimeout(() => {
                this.clearDragCanvas();
                setTimeout(() => {
                    commonStopDragActions();
                }, 30);
            }, 30);
        } else {
            commonStopDragActions();
        }
    }
    setDragCanvas (canvas) {
        this.dragCanvas = canvas;
    }
    render () {
        const {
            vm, // eslint-disable-line no-unused-vars
            onActivateColorPicker, // eslint-disable-line no-unused-vars
            ...props
        } = this.props;
        return (
            <StageComponent
                canvas={this.canvas}
                colorInfo={this.state.colorInfo}
                dragRef={this.setDragCanvas}
                question={this.state.question}
                onDoubleClick={this.handleDoubleClick}
                onQuestionAnswered={this.handleQuestionAnswered}
                {...props}
            />
        );
    }
}

Stage.propTypes = {
    isColorPicking: PropTypes.bool,
    isFullScreen: PropTypes.bool.isRequired,
    onActivateColorPicker: PropTypes.func,
    onDeactivateColorPicker: PropTypes.func,
    stageSize: PropTypes.oneOf(Object.keys(STAGE_DISPLAY_SIZES)).isRequired,
    useEditorDragStyle: PropTypes.bool,
    vm: PropTypes.instanceOf(VM).isRequired
};

Stage.defaultProps = {
    useEditorDragStyle: true
};

const mapStateToProps = state => ({
    isColorPicking: state.scratchGui.colorPicker.active,
    isFullScreen: state.scratchGui.mode.isFullScreen,
    // Do not use editor drag style in fullscreen or player mode.
    useEditorDragStyle: !(state.scratchGui.mode.isFullScreen || state.scratchGui.mode.isPlayerOnly)
});

const mapDispatchToProps = dispatch => ({
    onActivateColorPicker: () => dispatch(activateColorPicker()),
    onDeactivateColorPicker: color => dispatch(deactivateColorPicker(color))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Stage);
