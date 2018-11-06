import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import {thumbnailUrl} from '../../lib/user-thumbnail';

import styles from './user-avatar.css';

const UserAvatar = ({
    className,
    size,
    src,
    userId
}) => (
    <React.Fragment>
        <img
            className={classNames(
                className,
                styles.userThumbnail
            )}
            src={src ? src : thumbnailUrl(userId, size)}
        />
    </React.Fragment>
);

UserAvatar.propTypes = {
    className: PropTypes.string,
    size: PropTypes.number,
    src: PropTypes.string,
    userId: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
};

export default UserAvatar;
