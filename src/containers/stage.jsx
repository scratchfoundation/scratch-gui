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
            'detachMouseEvents',
            'onMouseUp',
            'onMouseMove',
            'onMouseDown',
            'setCanvas'
        ]);
    }
    componentDidMount () {
        this.renderer = new Renderer(this.canvas);
        this.props.vm.attachRenderer(this.renderer);
        this.audioEngine = new AudioEngine();
        this.props.vm.attachAudioEngine(this.audioEngine);
        this.attachMouseEvents(this.canvas);
    }
    componentWillUnmount () {
        this.detachMouseEvents(this.canvas);
    }
    attachMouseEvents (canvas) {
        document.addEventListener('mousemove', this.onMouseMove);
        canvas.addEventListener('mouseup', this.onMouseUp);
        canvas.addEventListener('mousedown', this.onMouseDown);
    }
    detachMouseEvents (canvas) {
        document.removeEventListener('mousemove', this.onMouseMove);
        canvas.removeEventListener('mouseup', this.onMouseUp);
        canvas.removeEventListener('mousedown', this.onMouseDown);
    }
    onMouseMove (e) {
        const rect = this.canvas.getBoundingClientRect();
        const coordinates = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            canvasWidth: rect.width,
            canvasHeight: rect.height
        };
        this.props.vm.postIOData('mouse', coordinates);
    }
    onMouseUp (e) {
        const rect = this.canvas.getBoundingClientRect();
        const data = {
            isDown: false,
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            canvasWidth: rect.width,
            canvasHeight: rect.height
        };
        this.props.vm.postIOData('mouse', data);
        e.preventDefault();
    }
    onMouseDown (e) {
        const rect = this.canvas.getBoundingClientRect();
        const data = {
            isDown: true,
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            canvasWidth: rect.width,
            canvasHeight: rect.height
        };
        this.props.vm.postIOData('mouse', data);
        e.preventDefault();
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
