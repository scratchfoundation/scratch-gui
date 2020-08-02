import React from 'react';
import {ContextMenu, MenuItem} from 'react-contextmenu';
import classNames from 'classnames';

import styles from './context-menu.css';

const StyledContextMenu = props => (
    <ContextMenu
        {...props}
        className={styles.contextMenu}
    />
);

const StyledMenuItem = props => (
    <MenuItem
        {...props}
        attributes={{className: styles.menuItem}}
    />
);

const BorderedMenuItem = props => (
    <MenuItem
        {...props}
        attributes={{className: classNames(styles.menuItem, styles.menuItemBordered)}}
    />
);

const DangerousMenuItem = props => (
    <MenuItem
        {...props}
        attributes={{className: classNames(styles.menuItem, styles.menuItemBordered, styles.menuItemDanger)}}
    />
);


export {
    BorderedMenuItem,
    DangerousMenuItem,
    StyledContextMenu as ContextMenu,
    StyledMenuItem as MenuItem
};
