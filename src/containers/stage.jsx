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
            'updateRect',
            'setCanvas'
        ]);
        this.state = {
            mouseDownTimeoutId: null,
            isDragging: false,
            dragOffset: null
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
    onMouseMove (e) {
        const mousePosition = [e.clientX - this.rect.left, e.clientY - this.rect.top];
        this.cancelMouseDownTimeout();
        if (this.state.mouseDown && !this.state.isDragging) {
            this.onStartDrag(mousePosition[0], mousePosition[1]);
        }
        if (this.state.mouseDown && this.state.isDragging && this.dragCanvas) {
            this.dragCanvas.style.left = `${e.clientX - this.state.dragOffset[0]}px`;
            this.dragCanvas.style.top = `${e.clientY - this.state.dragOffset[1]}px`;
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
            this.setState({
                isDragging: false,
                dragOffset: null
            });
            document.body.removeChild(this.dragCanvas);
            delete this.dragCanvas;
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
        const drawableID = this.renderer.pick(x, y);
        const imageData = this.renderer.extractDrawable(drawableID, x, y);
        this.dragCanvas = document.createElement('canvas');
        this.dragCanvas.style.position = 'absolute';
        document.body.appendChild(this.dragCanvas);
        const ctx = this.dragCanvas.getContext('2d');
        const canvasImageData = ctx.createImageData(imageData.width, imageData.height);
        canvasImageData.data.set(imageData.data);
        ctx.putImageData(canvasImageData, 0, 0);
        this.dragCanvas.style.left = `${this.rect.left + x - imageData.x}px`;
        this.dragCanvas.style.top = `${this.rect.top + y - imageData.y}px`;
        this.dragCanvas.width = imageData.width;
        this.dragCanvas.height = imageData.height;
        ctx.putImageData(canvasImageData, 0, 0);
        this.setState({
            isDragging: true,
            dragOffset: [imageData.x, imageData.y]
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
