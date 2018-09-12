/*
NOTE: this file only temporarily resides in scratch-gui.
Nearly identical code appears in scratch-www, and the two should be consolidated.
*/

import classNames from 'classnames';
import {FormattedMessage, injectIntl} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import Dropdown from '../dropdown/dropdown.jsx';
import dropdownStyles from '../dropdown/dropdown.css';

import styles from './account-nav.css';

const AccountNav = ({
    accountNavOpen,
    classroomId,
    isEducator,
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
            href="#"
            onClick={onOpenAccountNav}
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
        <Dropdown
            as="ul"
            className={process.env.SCRATCH_ENV}
            isOpen={accountNavOpen}
            onRequestClose={onCloseAccountNav}
        >
            <li>
                <a href={profileUrl}>
                    <FormattedMessage id="general.profile" />
                </a>
            </li>
            <li>
                <a href="/mystuff/">
                    <FormattedMessage id="general.myStuff" />
                </a>
            </li>
            {isEducator ? [
                <li key="my-classes-li">
                    <a href="/educators/classes/">
                        <FormattedMessage id="general.myClasses" />
                    </a>
                </li>
            ] : []}
            {isStudent ? [
                <li key="my-class-li">
                    <a href={`/classes/${classroomId}/`}>
                        <FormattedMessage id="general.myClass" />
                    </a>
                </li>
            ] : []}
            <li>
                <a href="/accounts/settings/">
                    <FormattedMessage id="general.accountSettings" />
                </a>
            </li>
            <li className={dropdownStyles.divider}>
                <a
                    href="#"
                    onClick={onLogOut}
                >
                    <FormattedMessage id="navigation.signOut" />
                </a>
            </li>
        </Dropdown>
    </div>
);

AccountNav.propTypes = {
    accountNavOpen: PropTypes.bool,
    classroomId: PropTypes.string,
    isEducator: PropTypes.bool,
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
        `/users/${state.session.session.user.classroomId}` : '',
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
