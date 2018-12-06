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
import UserAvatar from './user-avatar.jsx';
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
                <UserAvatar
                    className={styles.avatar}
                    imageUrl={thumbnailUrl}
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
                <FormattedMessage
                    defaultMessage="Profile"
                    description="Text to link to my user profile, in the account navigation menu"
                    id="gui.accountMenu.profile"
                />
            </MenuItemContainer>
            <MenuItemContainer href="/mystuff/">
                <FormattedMessage
                    defaultMessage="My Stuff"
                    description="Text to link to list of my projects, in the account navigation menu"
                    id="gui.accountMenu.myStuff"
                />
            </MenuItemContainer>
            {isEducator ? (
                <MenuItemContainer href="/educators/classes/">
                    <FormattedMessage
                        defaultMessage="My Classes"
                        description="Text to link to my classes (if I am a teacher), in the account navigation menu"
                        id="gui.accountMenu.myClasses"
                    />
                </MenuItemContainer>
            ) : null}
            {isStudent ? (
                <MenuItemContainer href={`/classes/${classroomId}/`}>
                    <FormattedMessage
                        defaultMessage="My Class"
                        description="Text to link to my class (if I am a student), in the account navigation menu"
                        id="gui.accountMenu.myClass"
                    />
                </MenuItemContainer>
            ) : null}
            <MenuItemContainer href="/accounts/settings/">
                <FormattedMessage
                    defaultMessage="Account settings"
                    description="Text to link to my account settings, in the account navigation menu"
                    id="gui.accountMenu.accountSettings"
                />
            </MenuItemContainer>
            <MenuSection>
                <MenuItemContainer onClick={onLogOut}>
                    <FormattedMessage
                        defaultMessage="Sign out"
                        description="Text to link to sign out, in the account navigation menu"
                        id="gui.accountMenu.signOut"
                    />
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
