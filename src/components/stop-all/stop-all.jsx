const React = require('react');
const stopAllIcon = require('./stop-all.svg');

const StopAllComponent = function (props) {
    const {
        onClick,
        title,
        ...componentProps
    } = props;
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
            {...componentProps}
        />
    );
};

StopAllComponent.propTypes = {
    onClick: React.PropTypes.func,
    title: React.PropTypes.string
};

StopAllComponent.defaultProps = {
    title: 'Stop'
};

module.exports = StopAllComponent;
