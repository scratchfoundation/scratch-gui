/*
NOTE: this file only temporarily resides in scratch-gui.
Nearly identical code appears in scratch-www, and the two should
eventually be consolidated.
*/

import classNames from 'classnames';
import {FormattedMessage, injectIntl} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import MenuBarMenu from './menu-bar-menu.jsx';
import {MenuItem, MenuSection} from '../menu/menu.jsx';

import styles from './account-nav.css';

const AccountNav = ({
    accountNavOpen,
    classroomId,
    isEducator,
    isRtl,
    isStudent,
    onOpenAccountNav,
    onCloseAccountNav,
    onLogOut,
    profileUrl,
    // thumbnailUrl, // not currently needed
    username
}) => (
    <div className="account-nav">
        <a
            className={classNames(
                styles.userInfo,
                {[styles.open]: accountNavOpen}
            )}
            onClick={accountNavOpen ? onCloseAccountNav : onOpenAccountNav}
        >
            {/* thumbnail image currently disabled
                <img
                    className={styles.avatar}
                    src={thumbnailUrl}
                />
            */}
            <span className="profile-name">
                {username}
            </span>
        </a>
        <MenuBarMenu
            open={accountNavOpen}
            // note: the Rtl styles are switched here, because this menu is justified
            // opposite all the others
            place={isRtl ? 'right' : 'left'}
            onRequestClose={onCloseAccountNav}
        >
            <MenuItem href={profileUrl}>
                <FormattedMessage id="general.profile" />
            </MenuItem>
            <MenuItem href="/mystuff/">
                <FormattedMessage id="general.myStuff" />
            </MenuItem>
            {isEducator ? (
                <MenuItem href="/educators/classes/">
                    <FormattedMessage id="general.myClasses" />
                </MenuItem>
            ) : []}
            {isStudent ? (
                <MenuItem href={`/classes/${classroomId}/`}>
                    <FormattedMessage id="general.myClass" />
                </MenuItem>
            ) : []}
            <MenuItem href="/accounts/settings/">
                <FormattedMessage id="general.accountSettings" />
            </MenuItem>
            <MenuSection>
                <MenuItem onClick={onLogOut}>
                    <FormattedMessage id="navigation.signOut" />
                </MenuItem>
            </MenuSection>
        </MenuBarMenu>
    </div>
);

AccountNav.propTypes = {
    accountNavOpen: PropTypes.bool,
    classroomId: PropTypes.string,
    isEducator: PropTypes.bool,
    isRtl: PropTypes.bool,
    isStudent: PropTypes.bool,
    onCloseAccountNav: PropTypes.func,
    onLogOut: PropTypes.func,
    onOpenAccountNav: PropTypes.func,
    profileUrl: PropTypes.string,
    // thumbnailUrl: PropTypes.string, // not currently needed
    username: PropTypes.string
};

const mapStateToProps = state => ({
    accountNavOpen: state.session && state.session.accountNavOpen,
    classroomId: state.session && state.session.session && state.session.session.user ?
        state.session.session.user.classroomId : '',
    isEducator: state.session && state.session.permissions && state.session.permissions.educator,
    isStudent: state.session && state.session.permissions && state.session.permissions.student,
    profileUrl: state.session && state.session.session && state.session.session.user ?
        `/users/${state.session.session.user.username}` : '',
    username: state.session && state.session.session && state.session.session.user ?
        state.session.session.user.username : ''
});

const mapDispatchToProps = () => ({});

export default injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountNav));
