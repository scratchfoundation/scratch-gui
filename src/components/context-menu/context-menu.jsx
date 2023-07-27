import React, {useCallback, useEffect, useRef, useState} from 'react';
import classNames from 'classnames';

import styles from './context-menu.css';

/**
 * An item in a context menu.
 * @param {*} props Any properties to add to the menu item element.
 * @property {React.MouseEventHandler} props.onClick The function to call when the menu item is clicked.
 * Do not stop event propagation.
 * @returns {JSX.Element} The menu item element.
 */
const MenuItem = props => (
    <li
        role="menuitem"
        className={styles.menuItem}
        {...props}
    />
);

const BorderedMenuItem = props => (
    <MenuItem
        className={classNames(styles.menuItem, styles.menuItemBordered)}
        {...props}
    />
);

const DangerousMenuItem = props => (
    <MenuItem
        className={classNames(styles.menuItem, styles.menuItemBordered, styles.menuItemDanger)}
        {...props}
    />
);

/**
 * Set up a context menu.
 * @note This uses React's useState and useEffect internally, so its use must follow their rules.
 * In particular, this should not be called conditionally.
 * To disable the context menu, pass empty content instead.
 * @note If your menu items have onClick handlers, they should NOT stop event propagation.
 * The context menu closes itself after your onClick by catching that event as it bubbles out.
 * @param {React.ReactNode} contextMenuContent The content to render in the context menu.
 * @returns {[React.MouseEventHandler, React.ReactNode]}
 * A tuple containing the onContextMenu event handler and a child node to host the context menu.
 * @example
 * const [handleContextMenu, contextMenu] = useContextMenu(<>
 *     <MenuItem onClick={...}>Item 1</MenuItem>
 *     <MenuItem onClick={...}>Item 2</MenuItem>
 * </>);
 * return (<div onContextMenu={handleContextMenu}>
 *     {"Right-click on this to open a menu"}
 *     {contextMenu}
 * </div>);
 */
const useContextMenu = contextMenuContent => {
    const [contextMenuPosition, setContextMenuPosition] = useState(null);
    const closeContextMenu = useCallback(() => setContextMenuPosition(null), [setContextMenuPosition]);

    const menuRef = useRef(null);

    // Close the context menu when the user clicks outside of it.
    // If the menu isn't currently open, this just reserves the hook slot.
    useEffect(() => {
        // If the menu is already closed, don't hook any events.
        // This reduces the total number of listeners in case many elements use this hook.
        if (!contextMenuPosition) {
            return;
        }

        // If the click is outside the menu, close the menu.
        // If the click is inside the menu, the menu will close itself in its onClick handler.
        const handleMouseDown = e => {
            if (!menuRef?.current?.contains(e.target)) {
                closeContextMenu();
            }
        };

        window.addEventListener('mousedown', handleMouseDown);
        return () => {
            window.removeEventListener('mousedown', handleMouseDown);
        };
    });

    // Call hooks only above this test!
    // If the menu is empty, don't build any elements and don't return an onContextMenu event handler.
    if (!contextMenuContent) {
        return [null, null];
    }

    /**
     * Handle a context menu event.
     * @param {React.MouseEvent} e The mouse event that triggered the context menu.
     * If the menu is opened using a keyboard, the coordinates will likely be the center of the selected element.
     */
    const handleContextMenu = e => {
        e.preventDefault();
        setContextMenuPosition({
            x: e.clientX,
            y: e.clientY
        });
    };

    const contextMenu = contextMenuPosition ?
        (<nav
            onClick={closeContextMenu} // close the menu as the click bubbles out from the menu item

            className={styles.contextMenu}
            ref={menuRef}
            role="menu"
            style={{
                left: contextMenuPosition.x,
                top: contextMenuPosition.y
            }}
        >{contextMenuContent}</nav>) : null;

    return [handleContextMenu, contextMenu];
};

export {
    BorderedMenuItem,
    DangerousMenuItem,
    MenuItem,
    useContextMenu
};
