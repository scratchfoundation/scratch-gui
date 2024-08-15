import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {FormattedMessage} from 'react-intl';
import styles from './monitor.css';
import ListMonitorScroller from './list-monitor-scroller.jsx';

const ListMonitor = ({draggable, label, width, height, value, onResizeMouseDown, onAdd, ...rowProps}) => (
    <div
        className={styles.listMonitor}
        style={{
            width: `${width}px`,
            height: `${height}px`
        }}
    >
        <div className={styles.listHeader}>
            {label}
        </div>
        <div className={styles.listBody}>
            <ListMonitorScroller
                draggable={draggable}
                height={height}
                values={value}
                width={width}
                {...rowProps}
            />
        </div>
        <div className={styles.listFooter}>
            <div
                className={classNames(draggable ? styles.addButton : null, 'no-drag')}
                onClick={draggable ? onAdd : null}
            >
                {'+' /* TODO waiting on asset */}
            </div>
            <div className={styles.footerLength}>
                <FormattedMessage
                    defaultMessage="length {length}"
                    description="Length label on list monitors. DO NOT translate {length} (with brackets)."
                    id="gui.monitor.listMonitor.listLength"
                    values={{
                        length: value.length
                    }}
                />
            </div>
            <div
                className={classNames(draggable ? styles.resizeHandle : null, 'no-drag')}
                onMouseDown={draggable ? onResizeMouseDown : null}
            >
                {'=' /* TODO waiting on asset */}
            </div>
        </div>
    </div>
);

ListMonitor.propTypes = {
    activeIndex: PropTypes.number,
    categoryColor: PropTypes.shape({
        background: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
    }).isRequired,
    draggable: PropTypes.bool.isRequired,
    height: PropTypes.number,
    label: PropTypes.string.isRequired,
    onActivate: PropTypes.func,
    onAdd: PropTypes.func,
    onResizeMouseDown: PropTypes.func,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.arrayOf(PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]))
    ]),
    width: PropTypes.number
};

ListMonitor.defaultProps = {
    width: 110,
    height: 200
};

export default ListMonitor;
