const React = require('react');
const stopAllIcon = require('./stop-all.svg');

const StopAllComponent = function (props) {
    const {
        active,
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
                top: 8,
                right: 480 - 16 - 12 - 16,
                width: 16,
                height: 16,
                // @todo Get real design here
                filter: active ? 'saturate(200%) brightness(150%)' : 'none'
            }}
            title={title}
            onClick={onClick}
            {...componentProps}
        />
    );
};

StopAllComponent.propTypes = {
    active: React.PropTypes.bool,
    onClick: React.PropTypes.func,
    title: React.PropTypes.string
};

StopAllComponent.defaultProps = {
    active: false,
    title: 'Stop'
};

module.exports = StopAllComponent;
