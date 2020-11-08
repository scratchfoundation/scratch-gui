import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import {FormattedMessage, injectIntl} from 'react-intl';
import UserAvatar from './user-avatar.jsx';

import styles from './author-info.css';

// tw: make author username and avatar clickable, as well as make the project title link link to the project itself
const AuthorInfo = ({
    className,
    imageUrl,
    projectId,
    projectTitle,
    // TODO: use userId to link to user's profile
    userId, // eslint-disable-line no-unused-vars
    username
}) => (
    <div
        className={classNames(
            className,
            styles.authorInfo
        )}
    >
        <a
            className={styles.usernameLink}
            href={`https://scratch.mit.edu/users/${username}/`}
            target="_blank"
            rel="noreferrer"
        >
            <UserAvatar
                className={styles.avatar}
                imageUrl={imageUrl}
            />
        </a>
        <div className={styles.titleAuthor}>
            {projectId ? (
                <a
                    className={styles.projectLink}
                    href={`https://scratch.mit.edu/projects/${projectId}/`}
                    target="_blank"
                    rel="noreferrer"
                >
                    {/* tw: full project title as hover text */}
                    <span
                        className={styles.projectTitle}
                        title={projectTitle}
                    >
                        {projectTitle}
                    </span>
                </a>
            ) : (
                <span className={styles.projectTitle}>
                    {projectTitle}
                </span>
            )}
            <div>
                <span className={styles.usernameLine}>
                    <FormattedMessage
                        defaultMessage="by {username}"
                        description="Shows that a project was created by this user"
                        id="gui.authorInfo.byUser"
                        values={{
                            username: <span className={styles.username}>
                                <a
                                    className={styles.usernameLink}
                                    href={`https://scratch.mit.edu/users/${username}/`}
                                    target="_blank"
                                    rel="noreferrer"
                                >{username}</a>
                            </span>
                        }}
                    />
                </span>
            </div>
        </div>
    </div>
);

AuthorInfo.propTypes = {
    className: PropTypes.string,
    imageUrl: PropTypes.string,
    projectId: PropTypes.string,
    projectTitle: PropTypes.string,
    userId: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    username: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
};

export default injectIntl(AuthorInfo);
