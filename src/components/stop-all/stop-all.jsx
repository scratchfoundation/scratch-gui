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
                top: 380,
                right: 380,
                width: 50,
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
