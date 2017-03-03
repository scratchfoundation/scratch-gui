const bindAll = require('lodash.bindall');
const React = require('react');
const Renderer = require('scratch-render');
const AudioEngine = require('scratch-audio');
const VM = require('scratch-vm');

const StageComponent = require('../components/stage/stage.jsx');

class Stage extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'attachMouseEvents',
            'cancelMouseDownTimeout',
            'detachMouseEvents',
            'onMouseUp',
            'onMouseMove',
            'onMouseDown',
            'onStartDrag',
            'onStopDrag',
            'updateRect',
            'setCanvas'
        ]);
        this.state = {
            mouseDownTimeoutId: null,
            isDragging: false,
            dragOffset: null,
            dragId: null
        };
    }
    componentDidMount () {
        this.attachRectEvents();
        this.attachMouseEvents(this.canvas);
        this.updateRect();
        this.renderer = new Renderer(this.canvas);
        this.props.vm.attachRenderer(this.renderer);
        this.audioEngine = new AudioEngine();
        this.props.vm.attachAudioEngine(this.audioEngine);
    }
    shouldComponentUpdate () {
        return false;
    }
    componentWillUnmount () {
        this.detachMouseEvents(this.canvas);
        this.detachRectEvents();
    }
    attachMouseEvents (canvas) {
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
        canvas.addEventListener('mousedown', this.onMouseDown);
    }
    detachMouseEvents (canvas) {
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
        canvas.removeEventListener('mousedown', this.onMouseDown);
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
        return [
            x - (this.rect.width / 2),
            y - (this.rect.height / 2)
        ];
    }
    onMouseMove (e) {
        const mousePosition = [e.clientX - this.rect.left, e.clientY - this.rect.top];
        this.cancelMouseDownTimeout();
        if (this.state.mouseDown && !this.state.isDragging) {
            this.onStartDrag(mousePosition[0], mousePosition[1]);
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
        this.cancelMouseDownTimeout();
        this.setState({
            mouseDown: false
        });
        if (this.state.isDragging) {
            this.onStopDrag();
        } else {
            const data = {
                isDown: false,
                x: e.clientX - this.rect.left,
                y: e.clientY - this.rect.top,
                canvasWidth: this.rect.width,
                canvasHeight: this.rect.height
            };
            this.props.vm.postIOData('mouse', data);
        }
    }
    onMouseDown (e) {
        const mousePosition = [e.clientX - this.rect.left, e.clientY - this.rect.top];
        this.setState({
            mouseDown: true,
            mouseDownTimeoutId: setTimeout(
                this.onStartDrag.bind(this, mousePosition[0], mousePosition[1]),
                500
            )
        });
        const data = {
            isDown: true,
            x: mousePosition[0],
            y: mousePosition[1],
            canvasWidth: this.rect.width,
            canvasHeight: this.rect.height
        };
        this.props.vm.postIOData('mouse', data);
        e.preventDefault();
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
            ...props
        } = this.props;
        return (
            <StageComponent
                canvasRef={this.setCanvas}
                {...props}
            />
        );
    }
}

Stage.propTypes = {
    vm: React.PropTypes.instanceOf(VM)
};

Stage.defaultProps = {
    vm: new VM()
};

module.exports = Stage;
