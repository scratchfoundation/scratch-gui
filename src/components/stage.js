const bindAll = require('lodash.bindall');
const React = require('react');
const Renderer = require('scratch-render');

class Stage extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, ['initRenderer']);
    }
    initRenderer (stage) {
        this.stage = stage;
        this.renderer = new Renderer(stage);
        this.props.onReceiveRenderer(this.renderer, this.stage);
    }
    render () {
        return (
            <canvas
                className="scratch-stage"
                ref={this.initRenderer}
                style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    width: this.props.width,
                    height: this.props.height,
                }}
            />
        );
    }
}

Stage.propTypes = {
    onReceiveRenderer: React.PropTypes.func,
    width: React.PropTypes.number,
    height: React.PropTypes.number
};

Stage.defaultProps = {
    onReceiveRenderer: function () {},
    width: 480,
    height: 360
};

module.exports = Stage;
