import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import {FormattedMessage, injectIntl} from 'react-intl';
import UserAvatar from './user-avatar.jsx';

import styles from './author-info.css';

const AuthorInfo = ({
    className,
    projectTitle,
    userId,
    username
}) => (
    <div
        className={classNames(
            className
        )}
    >
        <div
            className={classNames(
                styles.authorInfo
            )}
        >
            <UserAvatar
                className={styles.avatar}
                userId={userId}
            />
            <div className={styles.titleAuthor}>
                <span className={styles.projectTitle}>
                    {projectTitle}
                </span>
                <div>
                    <span className={styles.usernameLine}>
                        <span className={styles.unimportantText}>
                            <FormattedMessage
                                defaultMessage="by"
                                description="Shows that a project was created by this user"
                                id="gui.authorInfo.by"
                            />
                            &nbsp;
                        </span>
                        <span className={styles.username}>
                            {username}
                        </span>
                    </span>
                </div>
            </div>
        </div>
    </div>
);

AuthorInfo.propTypes = {
    className: PropTypes.string,
    projectTitle: PropTypes.string,
    userId: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    username: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
};

export default injectIntl(AuthorInfo);
