/*
NOTE: this file only temporarily resides in scratch-gui.
Nearly identical code appears in scratch-www, and the two should
eventually be consolidated.
*/

import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import {defineMessages} from 'react-intl';

import MenuBarMenu from './menu-bar-menu.jsx';

import styles from './login-dropdown.css';

// these are here as a hack to get them translated, so that equivalent messages will be translated
// when passed in from www via gui's renderLogin() function
const LoginDropdownMessages = defineMessages({ // eslint-disable-line no-unused-vars
    username: {
        defaultMessage: 'Username',
        description: 'Label for login username input',
        id: 'general.username'
    },
    password: {
        defaultMessage: 'Password',
        description: 'Label for login password input',
        id: 'general.password'
    },
    signin: {
        defaultMessage: 'Sign in',
        description: 'Button text for user to sign in',
        id: 'general.signIn'
    },
    needhelp: {
        defaultMessage: 'Need Help?',
        description: 'Button text for user to indicate that they need help',
        id: 'login.needHelp'
    },
    validationRequired: {
        defaultMessage: 'This field is required',
        description: 'Message to tell user they must enter text in a form field',
        id: 'form.validationRequired'
    }
});


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
