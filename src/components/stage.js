const React = require('react');

class Stage extends React.Component {
    render () {
        return (
            <canvas
                className="scratch-stage"
                ref={this.props.stageRef}
            />
        );
    }
}

Stage.propTypes = {
    stageRef: React.PropTypes.func
};

Stage.defaultProps = {
    stageRef: function () {}
};

module.exports = Stage;
