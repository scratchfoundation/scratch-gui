const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');

const filterIcon = require('./icon--filter.svg');
const xIcon = require('./icon--x.svg');
const styles = require('./filter.css');

const FilterComponent = props => {
    const {
        active,
        onChange,
        placeholderText,
        filterQuery
    } = props;
    return (
        <div
            className={classNames({
                [styles.filter]: true,
                [styles.isActive]: active
            })}
        >
            <img
                className={styles.filterIcon}
                src={filterIcon}
            />
            <input
                autoFocus
                className={styles.filterInput}
                placeholder={placeholderText}
                type="text"
                value={filterQuery}
                onChange={onChange}
            />
            <div className={styles.xIconWrapper}>
                <img
                    className={styles.xIcon}
                    src={xIcon}
                />
            </div>
        </div>
    );
};

FilterComponent.propTypes = {
    active: PropTypes.bool,
    filterQuery: PropTypes.string,
    onChange: PropTypes.func,
    placeholderText: PropTypes.string
};
FilterComponent.defaultProps = {
    active: false,
    placeholderText: 'what are you looking for?'
};
module.exports = FilterComponent;
