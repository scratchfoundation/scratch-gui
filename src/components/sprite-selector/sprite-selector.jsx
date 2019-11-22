import PropTypes from 'prop-types';
import React from 'react';
import {defineMessages, injectIntl, intlShape} from 'react-intl';
import {connect} from 'react-redux';

import Box from '../box/box.jsx';
import SpriteInfo from '../../containers/sprite-info.jsx';
import SpriteList from './sprite-list.jsx';
import ActionMenu from '../action-menu/action-menu.jsx';
import {STAGE_DISPLAY_SIZES} from '../../lib/layout-constants';
import {isRtl} from 'scratch-l10n';

import styles from './sprite-selector.css';

import fileUploadIcon from '../action-menu/icon--file-upload.svg';
import paintIcon from '../action-menu/icon--paint.svg';
import spriteIcon from '../action-menu/icon--sprite.svg';
import surpriseIcon from '../action-menu/icon--surprise.svg';
import searchIcon from '../action-menu/icon--search.svg';

import removeIcon from '../action-menu/icon--remove.svg';
import internetIcon from '../action-menu/icon--internet.svg';

const messages = defineMessages({
    addSpriteFromLibrary: {
        id: 'gui.spriteSelector.addSpriteFromLibrary',
        description: 'Button to add a sprite in the target pane from library',
        defaultMessage: 'Choose a Sprite'
    },
    addSpriteFromPaint: {
        id: 'gui.spriteSelector.addSpriteFromPaint',
        description: 'Button to add a sprite in the target pane from paint',
        defaultMessage: 'Paint'
    },
    addSpriteFromSurprise: {
        id: 'gui.spriteSelector.addSpriteFromSurprise',
        description: 'Button to add a random sprite in the target pane',
        defaultMessage: 'Surprise'
    },
    addSpriteFromFile: {
        id: 'gui.spriteSelector.addSpriteFromFile',
        description: 'Button to add a sprite in the target pane from file',
        defaultMessage: 'Upload Sprite'
    },

    uploadLocalFile: {
        id: 'gui.spriteSelector.uploadLocalFile',
        description: 'Button to upload a local file',
        defaultMessage: 'Upload Local File'
    },
    uploadWebFile: {
        id: 'gui.spriteSelector.uploadWebFile',
        description: 'Button to upload a web file',
        defaultMessage: 'Upload Web File'
    },
    removeFile: {
        id: 'gui.spriteSelector.removeFile',
        description: 'Button to remove an uploaded file',
        defaultMessage: 'Remove File'
    },
    viewFiles: {
        id: 'gui.spriteSelector.viewFiles',
        description: 'Button to show the file viewer',
        defaultMessage: 'View Files'
    }
});

const SpriteSelectorComponent = function (props) {
    const {
        editingTarget,
        hoveredTarget,
        intl,
        onChangeSpriteDirection,
        onChangeSpriteName,
        onChangeSpriteRotationStyle,
        onChangeSpriteSize,
        onChangeSpriteVisibility,
        onChangeSpriteX,
        onChangeSpriteY,
        onDrop,
        onDeleteSprite,
        onDuplicateSprite,
        onExportSprite,
        onFileUploadClick,
        onNewSpriteClick,
        onViewFilesClick,
        onPaintSpriteClick,
        onSelectSprite,
        onSpriteUpload,
        onDataFileUpload,
        onDataFileRemove,
        onWebFileUpload,
        onDataFileUploadClick,
        onSurpriseSpriteClick,
        raised,
        selectedId,
        spriteFileInput,
        dataFileInput,
        sprites,
        stageSize,
        showDataFileMenu,
        ...componentProps
    } = props;
    let selectedSprite = sprites[selectedId];
    let spriteInfoDisabled = false;
    if (typeof selectedSprite === 'undefined') {
        selectedSprite = {};
        spriteInfoDisabled = true;
    }

    //Detect if data tools extensions is loaded
    let hasDataTools = document.getElementsByClassName("scratchCategoryId-datatools").length > 0;

    return (
        <Box
            className={styles.spriteSelector}
            {...componentProps}
        >

            <SpriteInfo
                direction={selectedSprite.direction}
                disabled={spriteInfoDisabled}
                name={selectedSprite.name}
                rotationStyle={selectedSprite.rotationStyle}
                size={selectedSprite.size}
                stageSize={stageSize}
                visible={selectedSprite.visible}
                x={selectedSprite.x}
                y={selectedSprite.y}
                onChangeDirection={onChangeSpriteDirection}
                onChangeName={onChangeSpriteName}
                onChangeRotationStyle={onChangeSpriteRotationStyle}
                onChangeSize={onChangeSpriteSize}
                onChangeVisibility={onChangeSpriteVisibility}
                onChangeX={onChangeSpriteX}
                onChangeY={onChangeSpriteY}
            />

            <SpriteList
                editingTarget={editingTarget}
                hoveredTarget={hoveredTarget}
                items={Object.keys(sprites).map(id => sprites[id])}
                raised={raised}
                selectedId={selectedId}
                onDeleteSprite={onDeleteSprite}
                onDrop={onDrop}
                onDuplicateSprite={onDuplicateSprite}
                onExportSprite={onExportSprite}
                onSelectSprite={onSelectSprite}
            />

            {showDataFileMenu && <ActionMenu
                className={styles.fileButton}
                img={fileUploadIcon}
                moreButtons={[
                    {
                        title: intl.formatMessage(messages.removeFile),
                        img: removeIcon,
                        onClick: onDataFileRemove,
                        largeImg: true
                    },
                    {
                        title: intl.formatMessage(messages.uploadWebFile),
                        img: internetIcon,
                        onClick: onWebFileUpload,
                        fileAccept: '.csv, .xml, .json, application/json',
                        fileChange: onDataFileUpload,
                        fileInput: dataFileInput,
                        fileMultiple: true,
                        largeImg: true
                    },
                    {
                        title: intl.formatMessage(messages.viewFiles),
                        img: searchIcon,
                        onClick: onViewFilesClick
                    },
                    {
                        title: intl.formatMessage(messages.uploadLocalFile),
                        img: fileUploadIcon,
                        onClick: onDataFileUploadClick,
                        fileAccept: '.csv, .xml, .json, application/json',
                        fileChange: onDataFileUpload,
                        fileInput: dataFileInput,
                        fileMultiple: true
                    }
                ]}
                title={intl.formatMessage(messages.uploadLocalFile)}
                tooltipPlace={isRtl(intl.locale) ? 'right' : 'left'}
                onClick={onDataFileUploadClick}
            />}

            <ActionMenu
                className={styles.addButton}
                img={spriteIcon}
                moreButtons={[
                    {
                        title: intl.formatMessage(messages.addSpriteFromFile),
                        img: fileUploadIcon,
                        onClick: onFileUploadClick,
                        fileAccept: '.svg, .png, .jpg, .jpeg, .sprite2, .sprite3, .gif',
                        fileChange: onSpriteUpload,
                        fileInput: spriteFileInput,
                        fileMultiple: true
                    }, {
                        title: intl.formatMessage(messages.addSpriteFromSurprise),
                        img: surpriseIcon,
                        onClick: onSurpriseSpriteClick // TODO need real function for this
                    }, {
                        title: intl.formatMessage(messages.addSpriteFromPaint),
                        img: paintIcon,
                        onClick: onPaintSpriteClick // TODO need real function for this
                    }, {
                        title: intl.formatMessage(messages.addSpriteFromLibrary),
                        img: searchIcon,
                        onClick: onNewSpriteClick
                    }
                ]}
                title={intl.formatMessage(messages.addSpriteFromLibrary)}
                tooltipPlace={isRtl(intl.locale) ? 'right' : 'left'}
                onClick={onNewSpriteClick}
            />
        </Box>
    );
};

SpriteSelectorComponent.propTypes = {
    editingTarget: PropTypes.string,
    hoveredTarget: PropTypes.shape({
        hoveredSprite: PropTypes.string,
        receivedBlocks: PropTypes.bool
    }),
    intl: intlShape.isRequired,
    onChangeSpriteDirection: PropTypes.func,
    onChangeSpriteName: PropTypes.func,
    onChangeSpriteRotationStyle: PropTypes.func,
    onChangeSpriteSize: PropTypes.func,
    onChangeSpriteVisibility: PropTypes.func,
    onChangeSpriteX: PropTypes.func,
    onChangeSpriteY: PropTypes.func,
    onDeleteSprite: PropTypes.func,
    onDrop: PropTypes.func,
    onDuplicateSprite: PropTypes.func,
    onExportSprite: PropTypes.func,
    onFileUploadClick: PropTypes.func,
    onNewSpriteClick: PropTypes.func,
    onViewFilesClick: PropTypes.func,
    onPaintSpriteClick: PropTypes.func,
    onSelectSprite: PropTypes.func,
    onSpriteUpload: PropTypes.func,
    onDataFileUpload: PropTypes.func,
    onDataFileRemove: PropTypes.func,
    onWebFileUpload: PropTypes.func,
    onSurpriseSpriteClick: PropTypes.func,
    raised: PropTypes.bool,
    selectedId: PropTypes.string,
    spriteFileInput: PropTypes.func,
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

const mapStateToProps = state => ({
    // This is the button's mode, as opposed to the actual current state
    showDataFileMenu: state.scratchGui.modals.dataFileMenu
});
const mapDispatchToProps = dispatch => ({

});

export default injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(SpriteSelectorComponent));
