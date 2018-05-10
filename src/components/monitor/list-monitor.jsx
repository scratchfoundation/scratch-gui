import React from 'react';
import PropTypes from 'prop-types';
import styles from './monitor.css';

const ListMonitor = ({categoryColor, label, width, height, value}) => (
    <div
        className={styles.listMonitor}
        style={{
            width: `${width || 80}px`,
            height: `${height || 200}px`
        }}
    >
        <div className={styles.listHeader}>
            {label}
        </div>
        <div className={styles.listBody}>
            {!value || value.length === 0 ? (
                <div className={styles.listEmpty}>
                    {'(empty)' /* @todo not translating, awaiting design */}
                </div>
            ) : value.map((v, i) => (
                <div
                    className={styles.listRow}
                    key={`label-${i}`}
                >
                    <div className={styles.listIndex}>{i + 1 /* one indexed */}</div>
                    <div
                        className={styles.listValue}
                        style={{background: categoryColor}}
                    >
                        <div className={styles.valueInner}>{v}</div>
                    </div>
                </div>
            ))}
        </div>
        <div className={styles.listFooter}>
            <div className={styles.footerButton}>
                {/* @todo add button here */}
            </div>
            <div className={styles.footerLength}>
                <span className={styles.lengthNumber}>
                    {value.length}
                </span>
            </div>
            <div className={styles.resizeHandle}>
                {/* @todo resize handle */}
            </div>
        </div>
    </div>
);

ListMonitor.propTypes = {
    categoryColor: PropTypes.string.isRequired,
    height: PropTypes.number,
    label: PropTypes.string.isRequired,
    value: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])),
    width: PropTypes.number
};

ListMonitor.defaultProps = {
    width: 80,
    height: 200
};

export default ListMonitor;
