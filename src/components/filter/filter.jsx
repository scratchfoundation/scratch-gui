import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import filterIcon from './icon--filter.svg';
import xIcon from './icon--x.svg';
import styles from './filter.css';

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
export default FilterComponent;
