import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './monitor.css';


class ListMonitorRow extends React.Component {
    constructor (props) {
        super(props);
        this.handleActivate = props.onActivate.bind(this, props.index);
    }
    render () {
        return (
            <div
                className={styles.listRow}
                key={`label-${this.props.index}`}
            >
                <div className={styles.listIndex}>{this.props.index + 1 /* one indexed */}</div>
                <div
                    className={styles.listValue}
                    style={{background: this.props.categoryColor}}
                    onClick={this.handleActivate}
                >
                    {this.props.activeIndex === this.props.index ? (
                        <div className={styles.inputWrapper}>
                            <input
                                autoFocus
                                autoComplete={false}
                                className={classNames(styles.listInput, 'no-drag')}
                                onBlur={this.props.onDeactivate}
                                onChange={this.props.onInput}
                                onFocus={this.props.onFocus}
                                onKeyDown={this.props.onKeyPress} // key down to get ahead of blur
                                spellCheck={false}
                                type="text"
                                value={this.props.activeValue} /* eslint-disable-line */
                            />
                            <div
                                className={styles.removeButton}
                                onMouseDown={this.props.onRemove} // mousedown to get ahead of blur
                            >
                                {'✖︎'}
                            </div>
                        </div>

                    ) : (
                        <div className={styles.valueInner}>{this.props.value}</div>
                    )}
                </div>
            </div>
        );
    }
}

ListMonitorRow.propTypes = {
    index: PropTypes.number,
    activeIndex: PropTypes.number,
    activeValue: PropTypes.string,
    value: PropTypes.string,
    onRemove: PropTypes.func,
    onKeyPress: PropTypes.func,
    onFocus: PropTypes.func,
    onInput: PropTypes.func,
    onDeactivate: PropTypes.func,
    categoryColor: PropTypes.string,
    onActivate: PropTypes.func,
    onKeyPress: PropTypes.func
};

const ListMonitor = ({label, width, height, value, onResizeMouseDown, onAdd, ...rowProps}) => (
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
            {value.length === 0 ? (
                <div className={styles.listEmpty}>
                    {'(empty)'}
                </div>
            ) : value.map((v, i) => (
                <ListMonitorRow
                    {...rowProps}
                    index={i}
                    key={`${label}-row-${i}`}
                    value={v}
                />
            ))}
        </div>
        <div className={styles.listFooter}>
            <div
                className={styles.addButton}
                onClick={onAdd}
            >
                {'+' /* TODO waiting on asset */}
            </div>
            <div className={styles.footerLength}>
                {`length ${value.length}`}
            </div>
            <div
                className={classNames(styles.resizeHandle, 'no-drag')}
                onMouseDown={onResizeMouseDown}
            >
                {'=' /* TODO waiting on asset */}
            </div>
        </div>
    </div>
);

ListMonitor.propTypes = {
    activeIndex: PropTypes.number,
    categoryColor: PropTypes.string.isRequired,
    height: PropTypes.number,
    label: PropTypes.string.isRequired,
    onActivate: PropTypes.func,
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
