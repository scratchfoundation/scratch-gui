import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Spinner from '../spinner/spinner.jsx';
import {AlertLevels} from '../../lib/alerts/index.jsx';

import styles from './inline-message.css';

const InlineMessageComponent = ({
    content,
    iconSpinner,
    level
}) => (
    <div
        className={classNames(styles.inlineMessage, styles[level])}
    >
        {/* TODO: implement Rtl handling */}
        {iconSpinner && (
            <Spinner
                small
                className={styles.spinner}
                level={'info'}
            />
        )}
        {content}
    </div>
);

InlineMessageComponent.propTypes = {
    content: PropTypes.element,
    iconSpinner: PropTypes.bool,
    level: PropTypes.string
};

InlineMessageComponent.defaultProps = {
    level: AlertLevels.INFO
};

export default InlineMessageComponent;
