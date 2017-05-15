const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');

const filterIcon = require('./icon--filter.svg');
const xIcon = require('./icon--x.svg');
const styles = require('./filter.css');

const FilterComponent = props => {
    const {
        active,
        onClick,
        onBlur,
        placeholderText
    } = props;
    return (
        <div
            className={classNames({
                [styles.filter]: true,
                [styles.isActive]: active,
                // styles.headerItemTitle

            })}
            onClick={onClick}
            onBlur={onBlur}
        >
            <img
                className={styles.filterIcon}
                src={filterIcon}
            ></img>
            <input
                className={styles.filterInput}
                type='text'
                placeholder={placeholderText}
            >
            </input>
            <div className={styles.xIconWrapper}>
                <img
                    className={styles.xIcon}
                    src={xIcon}
                ></img>
            </div>
        </div>
    );
};

FilterComponent.propTypes = {
    active: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    placeholderText: PropTypes.string
};
FilterComponent.defaultProps = {
    active: false,
    placeholderText: 'what are you looking for?'
};
module.exports = FilterComponent;
