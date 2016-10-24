const React = require('react');

class StopAllComponent extends React.Component {
    render () {
        const {
            onClick,
            title,
            ...props
        } = this.props;
        return (
            <div
                className="scratch-stop-all"
                style={{
                    position: 'absolute',
                    top: 380,
                    right: 400,
                    width: 50
                }}
                {...props}
            >
                <button onClick={onClick}>{title}</button>
            </div>
        );
    }
}

StopAllComponent.propTypes = {
    onClick: React.PropTypes.func,
    title: React.PropTypes.string
};

StopAllComponent.defaultProps = {
    title: 'Stop'
};

module.exports = StopAllComponent;
