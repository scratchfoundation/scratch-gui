/*
NOTE: this file only temporarily resides in scratch-gui.
Nearly identical code appears in scratch-www, and the two should
eventually be consolidated.
*/

import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import MenuBarMenu from './menu-bar-menu.jsx';

import styles from './login-dropdown.css';

const LoginDropdown = ({
    className,
    isOpen,
    isRtl,
    onClose,
    renderLogin
}) => (
    <MenuBarMenu
        className={className}
        open={isOpen}
        // note: the Rtl styles are switched here, because this menu is justified
        // opposite all the others
        place={isRtl ? 'right' : 'left'}
        onRequestClose={onClose}
    >
        <div
            className={classNames(
                styles.login
            )}
        >
            {renderLogin({
                onClose: onClose
            })}
        </div>
    </MenuBarMenu>
);

LoginDropdown.propTypes = {
    className: PropTypes.string,
    isOpen: PropTypes.bool,
    isRtl: PropTypes.bool,
    onClose: PropTypes.func,
    renderLogin: PropTypes.func
};

export default LoginDropdown;
