const React = require('react');

class StageComponent extends React.Component {
    render () {
        const {
            canvasRef,
            width,
            height,
            ...props
        } = this.props;
        return (
            <canvas
                className="scratch-stage"
                ref={canvasRef}
                style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    width: width,
                    height: height
                }}
                {...props}
            />
        );
    }
}

StageComponent.propTypes = {
    canvasRef: React.PropTypes.func,
    height: React.PropTypes.number,
    width: React.PropTypes.number
};

StageComponent.defaultProps = {
    canvasRef: () => {},
    width: 480,
    height: 360
};

module.exports = StageComponent;
