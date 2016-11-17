const React = require('react');
const greenFlagIcon = require('./green-flag.svg');

const GreenFlagComponent = function (props) {
    const {
        onClick,
        title,
        ...componentProps
    } = props;
    return (
        <img
            className="scratch-green-flag"
            src={greenFlagIcon}
            style={{
                position: 'absolute',
                top: 380,
                right: 440,
                width: 50
            }}
            title={title}
            onClick={onClick}
            {...componentProps}
        />
    );
};

GreenFlagComponent.propTypes = {
    onClick: React.PropTypes.func,
    title: React.PropTypes.string
};

GreenFlagComponent.defaultProps = {
    title: 'Go'
};

module.exports = GreenFlagComponent;
