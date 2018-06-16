import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import {ComingSoonTooltip} from '../coming-soon/coming-soon.jsx';

import styles from './backpack.css';

const Backpack = ({expanded, onToggle}) => (
    <div className={styles.backpackContainer}>
        <div
            className={styles.backpackHeader}
            onClick={onToggle}
        >
            {onToggle ? (
                <FormattedMessage
                    defaultMessage="Backpack"
                    description="Button to open the backpack"
                    id="gui.backpack.header"
                />
            ) : (
                <ComingSoonTooltip
                    place="top"
                    tooltipId="backpack-tooltip"
                >
                    <FormattedMessage
                        defaultMessage="Backpack"
                        description="Button to open the backpack"
                        id="gui.backpack.header"
                    />
                </ComingSoonTooltip>
            )}
        </div>
        {expanded ? (
            <div className={styles.backpackList}>
                <div className={styles.emptyMessage}>
                    <FormattedMessage
                        defaultMessage="Backpack is empty"
                        description="Empty backpack message"
                        id="gui.backpack.emptyBackpack"
                    />
                </div>
            </div>
        ) : null}
    </div>
);

Backpack.propTypes = {
    expanded: PropTypes.bool,
    onToggle: PropTypes.func
};

Backpack.defaultProps = {
    expanded: false,
    onToggle: null
};

export default Backpack;
