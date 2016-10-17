const bindAll = require('lodash.bindall');
const React = require('react');
const Renderer = require('scratch-render');

const StageComponent = require('../components/stage');

class Stage extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'attachMouseEvents',
            'detachMouseEvents',
            'onMouseUp',
            'onMouseMove',
            'onMouseDown'
        ]);
    }
    componentDidMount () {
        this.renderer = new Renderer(this.canvas);
        this.props.vm.attachRenderer(this.renderer);
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
        let rect = this.canvas.getBoundingClientRect();
        let coordinates = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            canvasWidth: rect.width,
            canvasHeight: rect.height
        };
        this.props.vm.postIOData('mouse', coordinates);
    }
    onMouseUp (e) {
        let rect = this.canvas.getBoundingClientRect();
        let data = {
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
        let rect = this.canvas.getBoundingClientRect();
        let data = {
            isDown: true,
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            canvasWidth: rect.width,
            canvasHeight: rect.height
        };
        this.props.vm.postIOData('mouse', data);
        e.preventDefault();
    }
    render () {
        return (
            <StageComponent canvasRef={canvas => this.canvas = canvas} />
        );
    }
}

Stage.propTypes = {
    vm: React.PropTypes.shape({
        attachRenderer: React.PropTypes.func,
        postIOData: React.PropTypes.func
    }).isRequired
};

module.exports = Stage;
