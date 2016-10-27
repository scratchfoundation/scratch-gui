const React = require('react');
const stopAllIcon = require('./stop-all.svg');

class StopAllComponent extends React.Component {
    render () {
        const {
            onClick,
            title,
            ...props
        } = this.props;
        return (
            <img
                className="scratch-stop-all"
                src={stopAllIcon}
                style={{
                    position: 'absolute',
                    top: 380,
                    right: 380,
                    width: 50
                }}
                title={title}
                onClick={onClick}
                {...props}
            />
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
