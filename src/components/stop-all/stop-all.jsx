const classNames = require('classnames');
const React = require('react');

const stopAllIcon = require('./stop-all.svg');
const styles = require('./stop-all.css');

const StopAllComponent = function (props) {
    const {
        active,
        onClick,
        title,
        ...componentProps
    } = props;
    return (
        <img
            className={classNames({
                [styles.stopAll]: true,
                [styles.isActive]: active
            })}
            src={stopAllIcon}
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
