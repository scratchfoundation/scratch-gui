const React = require('react');

class Stage extends React.Component {
    render () {
        return (
            <canvas
                className="scratch-stage"
                ref={this.props.stageRef}
                width={this.props.width}
                height={this.props.height}
            />
        );
    }
}

Stage.propTypes = {
    stageRef: React.PropTypes.func,
    width: React.PropTypes.number,
    height: React.PropTypes.number
};

Stage.defaultProps = {
    stageRef: function () {},
    width: 480,
    height: 360
};

module.exports = Stage;
