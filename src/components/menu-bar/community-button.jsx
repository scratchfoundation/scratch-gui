import classNames from 'classnames';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';
import Button from '../button/button.jsx';

import communityIcon from './icon--see-community.svg';
import styles from './community-button.css';

const CommunityButton = ({
    className,
    onClick
}) => (
    <Button
        className={classNames(
            className,
            styles.communityButton
        )}
        iconClassName={styles.communityButtonIcon}
        iconSrc={communityIcon}
        onClick={onClick}
    >
        <FormattedMessage
            defaultMessage="See Project Page"
            description="Label for see project page button"
            id="gui.menuBar.seeProjectPage"
        />
    </Button>
);

CommunityButton.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func
};

CommunityButton.defaultProps = {
    onClick: () => {}
};

export default CommunityButton;
