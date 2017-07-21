import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import Box from '../box/box.jsx';
import CostumeCanvas from '../costume-canvas/costume-canvas.jsx';
import styles from './stage-selector.css';

const StageSelector = props => {
    const {
        backdropCount,
        selected,
        url,
        onClick,
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

            </div>
        </Box>
    );
};

StageSelector.propTypes = {
    backdropCount: PropTypes.number.isRequired,
    onClick: PropTypes.func,
    selected: PropTypes.bool.isRequired,
    url: PropTypes.string
};
export default StageSelector;
