const classNames = require('classnames');
const React = require('react');

const greenFlagIcon = require('./icon--green-flag.svg');
const styles = require('./green-flag.css');

const GreenFlagComponent = function (props) {
    const {
        active,
        onClick,
        title,
        ...componentProps
    } = props;
    return (
        <img
            className={classNames({
                [styles.greenFlag]: true,
                [styles.isActive]: active
            })}
            src={greenFlagIcon}
            title={title}
            onClick={onClick}
            {...componentProps}
        />
    );
};
GreenFlagComponent.propTypes = {
    active: React.PropTypes.bool,
    onClick: React.PropTypes.func,
    title: React.PropTypes.string
};
GreenFlagComponent.defaultProps = {
    active: false,
    title: 'Go'
};
module.exports = GreenFlagComponent;
