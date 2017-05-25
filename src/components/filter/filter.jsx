const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');

const filterIcon = require('./icon--filter.svg');
const xIcon = require('./icon--x.svg');
const styles = require('./filter.css');

const FilterComponent = props => {
    const {
        onChange,
        onClear,
        placeholderText,
        filterQuery
    } = props;
    return (
        <div
            className={classNames({
                [styles.filter]: true,
                [styles.isActive]: filterQuery.length > 0
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
            <div
                className={styles.xIconWrapper}
                onClick={onClear}
            >
                <img
                    className={styles.xIcon}
                    src={xIcon}
                />
            </div>
        </div>
    );
};

FilterComponent.propTypes = {
    filterQuery: PropTypes.string,
    onChange: PropTypes.func,
    onClear: PropTypes.func,
    placeholderText: PropTypes.string
};
FilterComponent.defaultProps = {
    placeholderText: 'what are you looking for?'
};
module.exports = FilterComponent;
