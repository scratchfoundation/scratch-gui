/*
NOTE: this file only temporarily resides in scratch-gui.
Nearly identical code appears in scratch-www, and the two should be consolidated.
*/

import bindAll from 'lodash.bindall';
import classNames from 'classnames';
import {FormattedMessage, injectIntl} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';

import Dropdown from '../dropdown/dropdown.jsx';
import dropdownStyles from '../dropdown/dropdown.css';

import styles from './account-nav.css';

class AccountNav extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleClose',
            'handleClick'
        ]);
        this.state = {
            isOpen: false
        };
    }
    handleClose () {
        if (this.state.isOpen) {
            this.setState({isOpen: false});
        }
    }
    handleClick (e) {
        e.preventDefault();
        this.setState({isOpen: true});
    }
    render () {
        const {
            classroomId,
            isEducator,
            isStudent,
            profileUrl,
            // thumbnailUrl, // not currently needed
            username,
            onClickLogout
        } = this.props;
        return (
            <div className="account-nav">
                <a
                    className={classNames(
                        styles.userInfo,
                        {[styles.open]: this.state.isOpen}
                    )}
                    href="#"
                    onClick={this.handleClick}
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
                    isOpen={this.state.isOpen}
                    onRequestClose={this.handleClose}
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
                            onClick={onClickLogout}
                        >
                            <FormattedMessage id="navigation.signOut" />
                        </a>
                    </li>
                </Dropdown>
            </div>
        );
    }
}

AccountNav.propTypes = {
    classroomId: PropTypes.string,
    isEducator: PropTypes.bool,
    isStudent: PropTypes.bool,
    onClickLogout: PropTypes.func,
    profileUrl: PropTypes.string,
    // thumbnailUrl: PropTypes.string, // not currently needed
    username: PropTypes.string
};

export default injectIntl(AccountNav);
