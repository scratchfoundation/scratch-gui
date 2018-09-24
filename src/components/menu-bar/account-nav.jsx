/*
NOTE: this file only temporarily resides in scratch-gui.
Nearly identical code appears in scratch-www, and the two should
eventually be consolidated.
*/

import classNames from 'classnames';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';

import MenuBarMenu from './menu-bar-menu.jsx';
import {MenuSection} from '../menu/menu.jsx';
import MenuItemContainer from '../../containers/menu-item.jsx';
import dropdownCaret from './dropdown-caret.svg';

import styles from './account-nav.css';

const AccountNavComponent = ({
    className,
    classroomId,
    isEducator,
    isOpen,
    isRtl,
    isStudent,
    menuBarMenuClassName,
    onClick,
    onClose,
    onLogOut,
    profileUrl,
    thumbnailUrl,
    username
}) => (
    <React.Fragment>
        <div
            className={classNames(
                styles.userInfo,
                className
            )}
            onMouseUp={onClick}
        >
            {thumbnailUrl ? (
                <img
                    className={styles.avatar}
                    src={thumbnailUrl}
                />
            ) : null}
            <span className={styles.profileName}>
                {username}
            </span>
            <div className={styles.dropdownCaretPosition}>
                <img
                    className={styles.dropdownCaretIcon}
                    src={dropdownCaret}
                />
            </div>
        </div>
        <MenuBarMenu
            className={menuBarMenuClassName}
            open={isOpen}
            // note: the Rtl styles are switched here, because this menu is justified
            // opposite all the others
            place={isRtl ? 'right' : 'left'}
            onRequestClose={onClose}
        >
            <MenuItemContainer href={profileUrl}>
                <FormattedMessage id="general.profile" />
            </MenuItemContainer>
            <MenuItemContainer href="/mystuff/">
                <FormattedMessage id="general.myStuff" />
            </MenuItemContainer>
            {isEducator ? (
                <MenuItemContainer href="/educators/classes/">
                    <FormattedMessage id="general.myClasses" />
                </MenuItemContainer>
            ) : null}
            {isStudent ? (
                <MenuItemContainer href={`/classes/${classroomId}/`}>
                    <FormattedMessage id="general.myClass" />
                </MenuItemContainer>
            ) : null}
            <MenuItemContainer href="/accounts/settings/">
                <FormattedMessage id="general.accountSettings" />
            </MenuItemContainer>
            <MenuSection>
                <MenuItemContainer onClick={onLogOut}>
                    <FormattedMessage id="navigation.signOut" />
                </MenuItemContainer>
            </MenuSection>
        </MenuBarMenu>
    </React.Fragment>
);

AccountNavComponent.propTypes = {
    className: PropTypes.string,
    classroomId: PropTypes.string,
    isEducator: PropTypes.bool,
    isOpen: PropTypes.bool,
    isRtl: PropTypes.bool,
    isStudent: PropTypes.bool,
    menuBarMenuClassName: PropTypes.string,
    onClick: PropTypes.func,
    onClose: PropTypes.func,
    onLogOut: PropTypes.func,
    profileUrl: PropTypes.string,
    thumbnailUrl: PropTypes.string,
    username: PropTypes.string
};

export default AccountNavComponent;
