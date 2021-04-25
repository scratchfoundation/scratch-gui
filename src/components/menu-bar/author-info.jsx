import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import {FormattedMessage} from 'react-intl';
import UserAvatar from './user-avatar.jsx';

import styles from './author-info.css';

const ActualAuthorInfo = ({
    className,
    imageUrl,
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
        <UserAvatar
            className={styles.avatar}
            imageUrl={imageUrl}
        />
        <div className={styles.titleAuthor}>
            <h1 className={styles.projectTitle}>
                {projectTitle}
            </h1>
            <div>
                <span className={styles.usernameLine}>
                    <FormattedMessage
                        defaultMessage="by {username}"
                        description="Shows that a project was created by this user"
                        id="gui.authorInfo.byUser"
                        values={{
                            username: <span className={styles.username}>{username}</span>
                        }}
                    />
                </span>
            </div>
        </div>
    </div>
);

ActualAuthorInfo.propTypes = {
    className: PropTypes.string,
    imageUrl: PropTypes.string,
    projectTitle: PropTypes.string,
    userId: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    username: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
};

const AuthorInfo = ({projectId, ...props}) => (
    projectId ? (
        <a
            className={styles.link}
            href={`https://scratch.mit.edu/projects/${projectId}`}
            target="_blank"
            rel="noreferrer"
        >
            <ActualAuthorInfo {...props} />
        </a>
    ) : <ActualAuthorInfo {...props} />
);
AuthorInfo.propTypes = {
    projectId: PropTypes.string
};

export default AuthorInfo;
