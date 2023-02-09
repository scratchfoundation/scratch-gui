import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import {FormattedMessage} from 'react-intl';

import {ContextMenuTrigger} from 'react-contextmenu';
import {ContextMenu, MenuItem} from '../context-menu/context-menu.jsx';

import styles from './chart-selector-item.css';

// react-contextmenu requires unique id to match trigger and context menu
let contextMenuId = 0;

const ChartSelectorItemComponent = props => {
    const handleVisibleCheckboxClick = () => {
        props.onVisibleCheckboxClick(props.id);
    };
    const handleExportButtonClick = () => {
        props.onExportButtonClick(props.id);
    };
    return (
        <ContextMenuTrigger
            attributes={{
                className: classNames(props.className, styles.itemWrapper),
                onClick: e => {
                    e.stopPropagation();
                    props.onClick(props.id);
                }
            }}
            id={`${props.id}-${contextMenuId}`}
        >
            <div
                className={styles.checkboxWrapper}
                // eslint-disable-next-line react/jsx-no-bind
                onClick={handleVisibleCheckboxClick}
            >
                <svg
                    className={classNames(styles.checkbox, {
                        [styles.isChecked]: props.visible
                    })}
                >
                    <rect
                        height="25"
                        width="25"
                        rx="5"
                        ry="5"
                    />
                    <path
                        d="M6.25 12.5L10.416666666666666 16.666666666666668L18.75 8.333333333333334"
                    />
                </svg>
            </div>
            <div
                className={classNames(styles.chartSelectorItem, {
                    [styles.isSelected]: props.selected
                })}
                style={props.selected ? {} : {
                    borderColor: props.color
                }}
            >
                <div className={styles.chartInfo}>
                    <div
                        className={styles.chartColor}
                        style={{
                            backgroundColor: props.color,
                            borderColor: props.color
                        }}
                    />
                    <div className={classNames(styles.chartLabel, styles.chartName)}>{props.label}</div>
                </div>
                <div className={styles.chartInfo}>
                    <div className={styles.chartLabel}>{`${props.data.at(-1)}`}</div>
                </div>
                {props.onExportButtonClick ? (
                    <ContextMenu id={`${props.id}-${contextMenuId++}`}>
                        <MenuItem
                            // eslint-disable-next-line react/jsx-no-bind
                            onClick={handleExportButtonClick}
                        >
                            <FormattedMessage
                                defaultMessage="export"
                                description="Menu item to export the selected item"
                                id="gui.spriteSelectorItem.contextMenuExport"
                            />
                        </MenuItem>
                    </ContextMenu>
                ) : null}
            </div>
        </ContextMenuTrigger>
    )
};

ChartSelectorItemComponent.propTypes = {
    className: PropTypes.string,
    color: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.number).isRequired,
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    onExportButtonClick: PropTypes.func,
    onVisibleCheckboxClick: PropTypes.func,
    selected: PropTypes.bool,
    visible: PropTypes.bool
};

export default ChartSelectorItemComponent;
