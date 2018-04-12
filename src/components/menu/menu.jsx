import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './menu.css';

const MenuComponent = ({
    className = '',
    children,
    componentRef,
    open = false,
    place = 'right'
}) => {
    if (open) {
        return (
            <ul
                className={classNames(
                    styles.menu,
                    className,
                    {
                        [styles.open]: open,
                        [styles.left]: place === 'left',
                        [styles.right]: place === 'right'
                    }
                )}
                ref={componentRef}
            >
                {children}
            </ul>
        );
    }
    return null;
};

MenuComponent.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    componentRef: PropTypes.func,
    open: PropTypes.bool,
    place: PropTypes.oneOf(['left', 'right'])
};

const MenuItem = ({
    children,
    className,
    onClick
}) => (
    <li
        className={classNames(styles.menuItem, className)}
        onClick={onClick}
    >
        {children}
    </li>
);

MenuItem.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    onClick: PropTypes.func
};

export {
    MenuComponent as default,
    MenuItem
};
