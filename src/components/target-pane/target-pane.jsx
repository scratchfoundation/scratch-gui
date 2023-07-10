import PropTypes from 'prop-types';
import React from 'react';

import VM from 'oeg-stem-vm';

import SpriteLibrary from '../../containers/sprite-library.jsx';
import SpriteSelectorComponent from '../sprite-selector/sprite-selector.jsx';
import DeviceSelectorComponent from '../device-selector/device-selector.jsx';
import StageSelector from '../../containers/stage-selector.jsx';
import {STAGE_DISPLAY_SIZES} from '../../lib/layout-constants';

import styles from './target-pane.css';
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import tabStyles from 'react-tabs/style/react-tabs.css';
import classNames from 'classnames';

/*
 * Pane that contains the sprite selector, sprite info, stage selector,
 * and the new sprite, costume and backdrop buttons
 * @param {object} props Props for the component
 * @returns {React.Component} rendered component
 */
const TargetPane = ({
    editingTarget,
    fileInputRef,
    hoveredTarget,
    spriteLibraryVisible,
    onActivateBlocksTab,
    onChangeSpriteDirection,
    onChangeSpriteName,
    onChangeSpriteRotationStyle,
    onChangeSpriteSize,
    onChangeSpriteVisibility,
    onChangeSpriteX,
    onChangeSpriteY,
    onDeleteSprite,
    onDrop,
    onDuplicateSprite,
    onExportSprite,
    onFileUploadClick,
    onNewSpriteClick,
    onPaintSpriteClick,
    onRequestCloseSpriteLibrary,
    onSelectSprite,
    onSpriteUpload,
    onSurpriseSpriteClick,
    raiseSprites,
    stage,
    stageSize,
    sprites,
    vm,
    ...componentProps
}) => {
    const tabClassNames = {
        tabs: styles.tabs,
        tab: classNames(tabStyles.reactTabsTab, styles.tab),
        tabList: classNames(tabStyles.reactTabsTabList, styles.tabList),
        tabPanel: classNames(tabStyles.reactTabsTabPanel, styles.tabPanel),
        tabPanelSelected: classNames(tabStyles.reactTabsTabPanelSelected, styles.isSelected),
        tabSelected: classNames(tabStyles.reactTabsTabSelected, styles.isSelected)
    };
    return (
        <div
            className={styles.targetPane}
            {...componentProps}
        >
            <Tabs
                forceRenderTabPanel
                className={tabClassNames.tabs}
                // selectedIndex={activeTabIndex}
                selectedTabClassName={tabClassNames.tabSelected}
                selectedTabPanelClassName={tabClassNames.tabPanelSelected}
                // onSelect={onActivateTab}
            >
                <TabList className={tabClassNames.tabList}>
                    <Tab className={tabClassNames.tab}>Sprites</Tab>
                    <Tab className={tabClassNames.tab}>Devices</Tab>
                </TabList>

                <TabPanel className={tabClassNames.tabPanel}>
                    <SpriteSelectorComponent
                        editingTarget={editingTarget}
                        hoveredTarget={hoveredTarget}
                        raised={raiseSprites}
                        selectedId={editingTarget}
                        spriteFileInput={fileInputRef}
                        sprites={sprites}
                        stageSize={stageSize}
                        onChangeSpriteDirection={onChangeSpriteDirection}
                        onChangeSpriteName={onChangeSpriteName}
                        onChangeSpriteRotationStyle={onChangeSpriteRotationStyle}
                        onChangeSpriteSize={onChangeSpriteSize}
                        onChangeSpriteVisibility={onChangeSpriteVisibility}
                        onChangeSpriteX={onChangeSpriteX}
                        onChangeSpriteY={onChangeSpriteY}
                        onDeleteSprite={onDeleteSprite}
                        onDrop={onDrop}
                        onDuplicateSprite={onDuplicateSprite}
                        onExportSprite={onExportSprite}
                        onFileUploadClick={onFileUploadClick}
                        onNewSpriteClick={onNewSpriteClick}
                        onPaintSpriteClick={onPaintSpriteClick}
                        onSelectSprite={onSelectSprite}
                        onSpriteUpload={onSpriteUpload}
                        onSurpriseSpriteClick={onSurpriseSpriteClick}
                    />
                </TabPanel>
                <TabPanel className={tabClassNames.tabPanel}>
                    <DeviceSelectorComponent
                        editingTarget={editingTarget}
                        hoveredTarget={hoveredTarget}
                        raised={raiseSprites}
                        selectedId={editingTarget}
                        sprites={sprites}
                        stageSize={stageSize}
                        onChangeSpriteName={onChangeSpriteName}
                        onDeleteSprite={onDeleteSprite}
                        onDrop={onDrop}
                        onDuplicateSprite={onDuplicateSprite}
                        onNewSpriteClick={onNewSpriteClick}
                        onSelectSprite={onSelectSprite}
                    />
                </TabPanel>
            </Tabs>

            <div className={styles.stageSelectorWrapper}>
                {stage.id && <StageSelector
                    asset={
                        stage.costume &&
                        stage.costume.asset
                    }
                    backdropCount={stage.costumeCount}
                    id={stage.id}
                    selected={stage.id === editingTarget}
                    onSelect={onSelectSprite}
                />}
                <div>
                    {spriteLibraryVisible ? (
                        <SpriteLibrary
                            vm={vm}
                            onActivateBlocksTab={onActivateBlocksTab}
                            onRequestClose={onRequestCloseSpriteLibrary}
                        />
                    ) : null}
                </div>
            </div>
        </div>
    );
};

const spriteShape = PropTypes.shape({
    costume: PropTypes.shape({
        // asset is defined in scratch-storage's Asset.js
        asset: PropTypes.object, // eslint-disable-line react/forbid-prop-types
        url: PropTypes.string,
        name: PropTypes.string.isRequired,
        // The following are optional because costumes uploaded from disk
        // will not have these properties available
        bitmapResolution: PropTypes.number,
        rotationCenterX: PropTypes.number,
        rotationCenterY: PropTypes.number
    }),
    costumeCount: PropTypes.number,
    direction: PropTypes.number,
    id: PropTypes.string,
    name: PropTypes.string,
    order: PropTypes.number,
    size: PropTypes.number,
    visibility: PropTypes.bool,
    x: PropTypes.number,
    y: PropTypes.number
});

TargetPane.propTypes = {
    editingTarget: PropTypes.string,
    extensionLibraryVisible: PropTypes.bool,
    fileInputRef: PropTypes.func,
    hoveredTarget: PropTypes.shape({
        hoveredSprite: PropTypes.string,
        receivedBlocks: PropTypes.bool
    }),
    onActivateBlocksTab: PropTypes.func.isRequired,
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
    onPaintSpriteClick: PropTypes.func,
    onRequestCloseExtensionLibrary: PropTypes.func,
    onRequestCloseSpriteLibrary: PropTypes.func,
    onSelectSprite: PropTypes.func,
    onSpriteUpload: PropTypes.func,
    onSurpriseSpriteClick: PropTypes.func,
    raiseSprites: PropTypes.bool,
    spriteLibraryVisible: PropTypes.bool,
    sprites: PropTypes.objectOf(spriteShape),
    stage: spriteShape,
    stageSize: PropTypes.oneOf(Object.keys(STAGE_DISPLAY_SIZES)).isRequired,
    vm: PropTypes.instanceOf(VM)
};

export default TargetPane;
