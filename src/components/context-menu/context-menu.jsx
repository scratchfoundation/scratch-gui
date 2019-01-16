import React from 'react';
import {ContextMenu, MenuItem} from 'react-contextmenu';

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
        attributes={{className: styles.menuItemBordered}}
    />
);


export {
    BorderedMenuItem,
    StyledContextMenu as ContextMenu,
    StyledMenuItem as MenuItem
};
