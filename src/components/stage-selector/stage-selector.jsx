import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import {FormattedMessage} from 'react-intl';

import Box from '../box/box.jsx';
import IconButton from '../icon-button/icon-button.jsx';
import CostumeCanvas from '../costume-canvas/costume-canvas.jsx';
import styles from './stage-selector.css';
import backdropIcon from './icon--backdrop.svg';

const addBackdropMessage = (
    <FormattedMessage
        defaultMessage="Add Backdrop"
        description="Button to add a backdrop in the target pane"
        id="targetPane.addBackdrop"
    />
);

const StageSelector = props => {
    const {
        backdropCount,
        selected,
        url,
        onClick,
        onNewBackdropClick,
        ...componentProps
    } = props;
    return (
        <Box
            className={styles.stageSelector}
            onClick={onClick}
            {...componentProps}
        >
            <div className={styles.header}>
                <div className={styles.headerTitle}>Stage</div>
            </div>
            <div className={styles.body}>
                <div
                    className={classNames({
                        [styles.flexWrapper]: true,
                        [styles.isSelected]: selected
                    })}
                >
                    {url ? (
                        <CostumeCanvas
                            className={styles.costumeCanvas}
                            height={42}
                            url={url}
                            width={56}
                        />
                    ) : null}
                    <div className={styles.label}>Backdrops</div>
                    <div className={styles.count}>{backdropCount}</div>
                </div>
                <IconButton
                    className={styles.addButton}
                    img={backdropIcon}
                    title={addBackdropMessage}
                    onClick={onNewBackdropClick}
                />
            </div>
        </Box>
    );
};

StageSelector.propTypes = {
    backdropCount: PropTypes.number.isRequired,
    onClick: PropTypes.func,
    onNewBackdropClick: PropTypes.func,
    selected: PropTypes.bool.isRequired,
    url: PropTypes.string
};
export default StageSelector;
