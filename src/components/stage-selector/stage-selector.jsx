import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import {defineMessages, intlShape, injectIntl, FormattedMessage} from 'react-intl';

import Box from '../box/box.jsx';
import AssetButton from '../asset-button/asset-button.jsx';
import CostumeCanvas from '../costume-canvas/costume-canvas.jsx';
import styles from './stage-selector.css';
import backdropIcon from './icon--backdrop.svg';

const messages = defineMessages({
    addBackdrop: {
        id: 'gui.stageSelector.targetPaneAddBackdrop',
        description: 'Button to add a backdrop in the target pane',
        defaultMessage: 'Add Backdrop'
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
                    height={42}
                    url={url}
                    width={56}
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
            <AssetButton
                className={styles.addButton}
                img={backdropIcon}
                title={intl.formatMessage(messages.addBackdrop)}
                onClick={onNewBackdropClick}
            />
        </Box>
    );
};

StageSelector.propTypes = {
    backdropCount: PropTypes.number.isRequired,
    intl: intlShape.isRequired,
    onClick: PropTypes.func,
    onNewBackdropClick: PropTypes.func,
    selected: PropTypes.bool.isRequired,
    url: PropTypes.string
};
export default injectIntl(StageSelector);
