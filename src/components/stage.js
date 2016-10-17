const React = require('react');

class StageComponent extends React.Component {
    render () {
        return (
            <canvas
                className="scratch-stage"
                ref={this.props.canvasRef}
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

StageComponent.propTypes = {
    canvasRef: React.PropTypes.func,
    width: React.PropTypes.number,
    height: React.PropTypes.number
};

StageComponent.defaultProps = {
    canvasRef: function () {},
    width: 480,
    height: 360
};

module.exports = StageComponent;
