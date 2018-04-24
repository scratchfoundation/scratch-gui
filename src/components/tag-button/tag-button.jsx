import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import Button from '../button/button.jsx';

import styles from './tag-button.css';

const TagButtonComponent = ({
    active,
    iconClassName,
    className,
    title,
    ...props
}) => (
    <Button
        className={classNames(
            styles.tagButton,
            className, {
                [styles.active]: active
            }
        )}
        iconClassName={classNames(
            styles.tagButtonIcon,
            iconClassName
        )}
        {...props}
    >
        {title}
    </Button>
);

TagButtonComponent.propTypes = {
    ...Button.propTypes,
    active: PropTypes.bool,
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object // FormattedMessage
    ]).isRequired
};

TagButtonComponent.defaultProps = {
    active: false
};

export default TagButtonComponent;
