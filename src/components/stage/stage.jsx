const React = require('react');

const styles = require('./stage.css');

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
                className={styles.stage}
                ref={canvasRef}
                style={{
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
