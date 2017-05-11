const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');

const styles = require('./button.css');

const ButtonComponent = ({
    className,
    onClick,
    children,
    ...props
}) => (
    <span
        className={classNames(
            styles.button,
            className
        )}
        role="button"
        onClick={onClick}
        {...props}
    >
        {children}
    </span>
);

ButtonComponent.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired
};
module.exports = ButtonComponent;
