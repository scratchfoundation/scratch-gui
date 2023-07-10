import PropTypes from 'prop-types';
import React from 'react';
import {injectIntl, intlShape} from 'react-intl';

import Box from '../box/box.jsx';
import DeviceList from './device-list.jsx';
import {STAGE_DISPLAY_SIZES} from '../../lib/layout-constants';

import styles from './device-selector.css';

const DeviceSelectorComponent = function (props) {
    const {
        editingTarget,
        hoveredTarget,
        onDrop,
        onDeleteDevice,
        onDuplicateDevice,
        onSelectDevice,
        raised,
        selectedId,
        sprites,
        ...componentProps
    } = props;
    return (
        <Box
            className={styles.spriteSelector}
            {...componentProps}
        >
            <DeviceList
                editingTarget={editingTarget}
                hoveredTarget={hoveredTarget}
                items={Object.keys(sprites).map(id => sprites[id])}
                raised={raised}
                selectedId={selectedId}
                onDeleteDevice={onDeleteDevice}
                onDrop={onDrop}
                onDuplicateDevice={onDuplicateDevice}
                onSelectDevice={onSelectDevice}
            />
        </Box>
    );
};

DeviceSelectorComponent.propTypes = {
    editingTarget: PropTypes.string,
    hoveredTarget: PropTypes.shape({
        hoveredDevice: PropTypes.string,
        receivedBlocks: PropTypes.bool
    }),
    intl: intlShape.isRequired,
    onChangeDeviceVisibility: PropTypes.func,
    onDeleteDevice: PropTypes.func,
    onDrop: PropTypes.func,
    onDuplicateDevice: PropTypes.func,
    onNewDeviceClick: PropTypes.func,
    onSelectDevice: PropTypes.func,
    raised: PropTypes.bool,
    selectedId: PropTypes.string,
    sprites: PropTypes.shape({
        id: PropTypes.shape({
            costume: PropTypes.shape({
                url: PropTypes.string,
                name: PropTypes.string.isRequired,
                bitmapResolution: PropTypes.number.isRequired,
                rotationCenterX: PropTypes.number.isRequired,
                rotationCenterY: PropTypes.number.isRequired
            }),
            name: PropTypes.string.isRequired,
            order: PropTypes.number.isRequired
        })
    }),
    stageSize: PropTypes.oneOf(Object.keys(STAGE_DISPLAY_SIZES)).isRequired
};

export default injectIntl(DeviceSelectorComponent);
