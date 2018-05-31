import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import DragConstants from '../../lib/drag-constants';

import Box from '../box/box.jsx';
import SpriteSelectorItem from '../../containers/sprite-selector-item.jsx';
import SortableHOC from '../../lib/sortable-hoc.jsx';
import SortableAsset from '../asset-panel/sortable-asset.jsx';

import styles from './sprite-selector.css';

const SpriteList = function (props) {
    const {
        editingTarget,
        draggingIndex,
        draggingType,
        hoveredTarget,
        onDeleteSprite,
        onDuplicateSprite,
        onSelectSprite,
        onAddSortable,
        onRemoveSortable,
        ordering,
        raised,
        selectedId,
        items
    } = props;

    const isSpriteDrag = draggingType === DragConstants.SPRITE;

    return (
        <Box className={styles.itemsWrapper}>
            {items.map((sprite, index) => (
                <SortableAsset
                    className={classNames(styles.itemWrapper, {
                        [styles.placeholder]: isSpriteDrag && index === draggingIndex})}
                    index={isSpriteDrag ? ordering.indexOf(index) : index}
                    key={sprite.name}
                    onAddSortable={onAddSortable}
                    onRemoveSortable={onRemoveSortable}
                >
                    <SpriteSelectorItem
                        assetId={sprite.costume && sprite.costume.assetId}
                        className={hoveredTarget.sprite === sprite.id &&
                                sprite.id !== editingTarget &&
                                hoveredTarget.receivedBlocks ?
                            classNames(styles.sprite, styles.receivedBlocks) :
                            raised && sprite.id !== editingTarget ?
                                classNames(styles.sprite, styles.raised) : styles.sprite}
                        dragType={DragConstants.SPRITE}
                        id={sprite.id}
                        index={index}
                        key={sprite.id}
                        name={sprite.name}
                        selected={sprite.id === selectedId}
                        onClick={onSelectSprite}
                        onDeleteButtonClick={onDeleteSprite}
                        onDuplicateButtonClick={onDuplicateSprite}
                    />
                </SortableAsset>
            ))}
        </Box>
    );
};

SpriteList.propTypes = {
    draggingIndex: PropTypes.number,
    draggingType: PropTypes.string,
    editingTarget: PropTypes.string,
    hoveredTarget: PropTypes.shape({
        hoveredSprite: PropTypes.string,
        receivedBlocks: PropTypes.bool
    }),
    items: PropTypes.arrayOf(PropTypes.shape({
        costume: PropTypes.shape({
            url: PropTypes.string,
            name: PropTypes.string.isRequired,
            bitmapResolution: PropTypes.number.isRequired,
            rotationCenterX: PropTypes.number.isRequired,
            rotationCenterY: PropTypes.number.isRequired
        }),
        name: PropTypes.string.isRequired,
        order: PropTypes.number.isRequired
    })),
    onAddSortable: PropTypes.func,
    onDeleteSprite: PropTypes.func,
    onDuplicateSprite: PropTypes.func,
    onRemoveSortable: PropTypes.func,
    onSelectSprite: PropTypes.func,
    ordering: PropTypes.arrayOf(PropTypes.number),
    raised: PropTypes.bool,
    selectedId: PropTypes.string
};

export default SortableHOC(SpriteList);
