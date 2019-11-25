import PropTypes from 'prop-types';
import React from 'react';
import Menu from '../../containers/menu.jsx';

const MenuBarMenu = ({
    children,
    className,
    ignoreClickEvent,
    onRequestClose,
    open,
    place = 'right'
}) => (
    <div className={className}>
        <Menu
            ignoreClickEvent={ignoreClickEvent}
            open={open}
            place={place}
            onRequestClose={onRequestClose}
        >
            {children}
        </Menu>
    </div>
);

MenuBarMenu.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    ignoreClickEvent: PropTypes.bool,
    onRequestClose: PropTypes.func,
    open: PropTypes.bool,
    place: PropTypes.oneOf(['left', 'right'])
};

export default MenuBarMenu;
