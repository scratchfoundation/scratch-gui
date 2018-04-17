import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import {defineMessages, intlShape, injectIntl, FormattedMessage} from 'react-intl';

import Box from '../box/box.jsx';
import ActionMenu from '../action-menu/action-menu.jsx';
import CostumeCanvas from '../costume-canvas/costume-canvas.jsx';
import styles from './stage-selector.css';

import backdropIcon from '../action-menu/icon--backdrop.svg';
import fileUploadIcon from '../action-menu/icon--file-upload.svg';
import paintIcon from '../action-menu/icon--paint.svg';
import surpriseIcon from '../action-menu/icon--surprise.svg';

const messages = defineMessages({
    addBackdropFromLibrary: {
        id: 'gui.spriteSelector.addBackdropFromLibrary',
        description: 'Button to add a stage in the target pane from library',
        defaultMessage: 'Choose a Backdrop'
    },
    addBackdropFromPaint: {
        id: 'gui.stageSelector.addBackdropFromPaint',
        description: 'Button to add a stage in the target pane from paint',
        defaultMessage: 'Paint'
    },
    addBackdropFromSurprise: {
        id: 'gui.stageSelector.addBackdropFromSurprise',
        description: 'Button to add a random stage in the target pane',
        defaultMessage: 'Surprise'
    },
    addBackdropFromFile: {
        id: 'gui.stageSelector.addBackdropFromFile',
        description: 'Button to add a stage in the target pane from file',
        defaultMessage: 'Coming Soon'
    }
});

const StageSelector = props => {
    const {
        backdropCount,
        intl,
        selected,
        url,
        onClick,
        onNewBackdropClick,
        onSurpriseBackdropClick,
        onEmptyBackdropClick,
        ...componentProps
    } = props;
    return (
        <Box
            className={classNames(styles.stageSelector, {
                [styles.isSelected]: selected
            })}
            onClick={onClick}
            {...componentProps}
        >
            <div className={styles.header}>
                <div className={styles.headerTitle}>Stage</div>
            </div>
            {url ? (
                <CostumeCanvas
                    className={styles.costumeCanvas}
                    height={54}
                    url={url}
                    width={72}
                />
            ) : null}
            <div className={styles.label}>
                <FormattedMessage
                    defaultMessage="Backdrops"
                    description="Label for the backdrops in the stage selector"
                    id="gui.stageSelector.backdrops"
                />
            </div>
            <div className={styles.count}>{backdropCount}</div>
            <ActionMenu
                className={styles.addButton}
                img={backdropIcon}
                moreButtons={[
                    {
                        title: intl.formatMessage(messages.addBackdropFromFile),
                        img: fileUploadIcon
                    }, {
                        title: intl.formatMessage(messages.addBackdropFromSurprise),
                        img: surpriseIcon,
                        onClick: onSurpriseBackdropClick

                    }, {
                        title: intl.formatMessage(messages.addBackdropFromPaint),
                        img: paintIcon,
                        onClick: onEmptyBackdropClick
                    }
                ]}
                title={intl.formatMessage(messages.addBackdropFromLibrary)}
                onClick={onNewBackdropClick}
            />
        </Box>
    );
};

StageSelector.propTypes = {
    backdropCount: PropTypes.number.isRequired,
    intl: intlShape.isRequired,
    onClick: PropTypes.func,
    onEmptyBackdropClick: PropTypes.func,
    onNewBackdropClick: PropTypes.func,
    onSurpriseBackdropClick: PropTypes.func,
    selected: PropTypes.bool.isRequired,
    url: PropTypes.string
};

export default injectIntl(StageSelector);
