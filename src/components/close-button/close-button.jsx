const React = require('react');
const classNames = require('classnames');

const styles = require('./close-button.css');
const closeIcon = require('./icon--close.svg');

const CloseButton = props => (
    <div
        className={classNames(
            styles.closeButton,
            props.className,
            {
                [styles.large]: props.size === CloseButton.SIZE_LARGE,
                [styles.small]: props.size === CloseButton.SIZE_SMALL
            }
        )}
        onClick={props.onClick}
    >
        <img
            className={styles.closeIcon}
            src={closeIcon}
        />
    </div>
);

CloseButton.SIZE_LARGE = 'large';
CloseButton.SIZE_SMALL = 'small';

CloseButton.propTypes = {
    className: React.PropTypes.string,
    onClick: React.PropTypes.func,
    size: React.PropTypes.oneOf([CloseButton.SIZE_LARGE, CloseButton.SIZE_SMALL])
};

CloseButton.defaultProps = {
    size: CloseButton.SIZE_LARGE
};

module.exports = CloseButton;
