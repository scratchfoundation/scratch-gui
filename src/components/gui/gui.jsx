import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import {defineMessages, FormattedMessage, injectIntl, intlShape} from 'react-intl';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import tabStyles from 'react-tabs/style/react-tabs.css';
import VM from 'scratch-vm';
import Renderer from 'scratch-render';

import Blocks from '../../containers/blocks.jsx';
import CostumeTab from '../../containers/costume-tab.jsx';
import TargetPane from '../../containers/target-pane.jsx';
import SoundTab from '../../containers/sound-tab.jsx';
import StageWrapper from '../../containers/stage-wrapper.jsx';
import Loader from '../loader/loader.jsx';
import Box from '../box/box.jsx';
import MenuBar from '../menu-bar/menu-bar.jsx';

import Backpack from '../../containers/backpack.jsx';
import PreviewModal from '../../containers/preview-modal.jsx';
import ImportModal from '../../containers/import-modal.jsx';
import WebGlModal from '../../containers/webgl-modal.jsx';
import TipsLibrary from '../../containers/tips-library.jsx';
import Cards from '../../containers/cards.jsx';
import DragLayer from '../../containers/drag-layer.jsx';

import styles from './gui.css';
import addExtensionIcon from './icon--extensions.svg';
import codeIcon from './icon--code.svg';
import costumesIcon from './icon--costumes.svg';
import soundsIcon from './icon--sounds.svg';

const messages = defineMessages({
    addExtension: {
        id: 'gui.gui.addExtension',
        description: 'Button to add an extension in the target pane',
        defaultMessage: 'Add Extension'
    }
});

// Cache this value to only retreive it once the first time.
// Assume that it doesn't change for a session.
let isRendererSupported = null;

const GUIComponent = props => {
    const {
        activeTabIndex,
        basePath,
        backpackOptions,
        blocksTabVisible,
        cardsVisible,
        children,
        costumesTabVisible,
        enableCommunity,
        importInfoVisible,
        intl,
        isPlayerOnly,
        loading,
        onExtensionButtonClick,
        onActivateCostumesTab,
        onActivateSoundsTab,
        onActivateTab,
        previewInfoVisible,
        targetIsStage,
        soundsTabVisible,
        tipsLibraryVisible,
        vm,
        ...componentProps
    } = props;
    if (children) {
        return <Box {...componentProps}>{children}</Box>;
    }

    const tabClassNames = {
        tabs: styles.tabs,
        tab: classNames(tabStyles.reactTabsTab, styles.tab),
        tabList: classNames(tabStyles.reactTabsTabList, styles.tabList),
        tabPanel: classNames(tabStyles.reactTabsTabPanel, styles.tabPanel),
        tabPanelSelected: classNames(tabStyles.reactTabsTabPanelSelected, styles.isSelected),
        tabSelected: classNames(tabStyles.reactTabsTabSelected, styles.isSelected)
    };

    if (isRendererSupported === null) {
        isRendererSupported = Renderer.isSupported();
    }

    return isPlayerOnly ? (
        <StageWrapper
            isRendererSupported={isRendererSupported}
            vm={vm}
        />
    ) : (
        <Box
            className={styles.pageWrapper}
            {...componentProps}
        >
            {previewInfoVisible ? (
                <PreviewModal />
            ) : null}
            {loading ? (
                <Loader />
            ) : null}
            {importInfoVisible ? (
                <ImportModal />
            ) : null}
            {isRendererSupported ? null : (
                <WebGlModal />
            )}
            {tipsLibraryVisible ? (
                <TipsLibrary />
            ) : null}
            {cardsVisible ? (
                <Cards />
            ) : null}
            <MenuBar enableCommunity={enableCommunity} />
            <Box className={styles.bodyWrapper}>
                <Box className={styles.flexWrapper}>
                    <Box className={styles.editorWrapper}>
                        <Tabs
                            className={tabClassNames.tabs}
                            forceRenderTabPanel={true} // eslint-disable-line react/jsx-boolean-value
                            selectedIndex={activeTabIndex}
                            selectedTabClassName={tabClassNames.tabSelected}
                            selectedTabPanelClassName={tabClassNames.tabPanelSelected}
                            onSelect={onActivateTab}
                        >
                            <TabList className={tabClassNames.tabList}>
                                <Tab className={tabClassNames.tab}>
                                    <img
                                        draggable={false}
                                        src={codeIcon}
                                    />
                                    <FormattedMessage
                                        defaultMessage="Code"
                                        description="Button to get to the code panel"
                                        id="gui.gui.codeTab"
                                    />
                                </Tab>
                                <Tab
                                    className={tabClassNames.tab}
                                    onClick={onActivateCostumesTab}
                                >
                                    <img
                                        draggable={false}
                                        src={costumesIcon}
                                    />
                                    {targetIsStage ? (
                                        <FormattedMessage
                                            defaultMessage="Backdrops"
                                            description="Button to get to the backdrops panel"
                                            id="gui.gui.backdropsTab"
                                        />
                                    ) : (
                                        <FormattedMessage
                                            defaultMessage="Costumes"
                                            description="Button to get to the costumes panel"
                                            id="gui.gui.costumesTab"
                                        />
                                    )}
                                </Tab>
                                <Tab
                                    className={tabClassNames.tab}
                                    onClick={onActivateSoundsTab}
                                >
                                    <img
                                        draggable={false}
                                        src={soundsIcon}
                                    />
                                    <FormattedMessage
                                        defaultMessage="Sounds"
                                        description="Button to get to the sounds panel"
                                        id="gui.gui.soundsTab"
                                    />
                                </Tab>
                            </TabList>
                            <TabPanel className={tabClassNames.tabPanel}>
                                <Box className={styles.blocksWrapper}>
                                    <Blocks
                                        grow={1}
                                        isVisible={blocksTabVisible}
                                        options={{
                                            media: `${basePath}static/blocks-media/`
                                        }}
                                        vm={vm}
                                    />
                                </Box>
                                <Box className={styles.extensionButtonContainer}>
                                    <button
                                        className={styles.extensionButton}
                                        title={intl.formatMessage(messages.addExtension)}
                                        onClick={onExtensionButtonClick}
                                    >
                                        <img
                                            className={styles.extensionButtonIcon}
                                            draggable={false}
                                            src={addExtensionIcon}
                                        />
                                    </button>
                                </Box>
                            </TabPanel>
                            <TabPanel className={tabClassNames.tabPanel}>
                                {costumesTabVisible ? <CostumeTab vm={vm} /> : null}
                            </TabPanel>
                            <TabPanel className={tabClassNames.tabPanel}>
                                {soundsTabVisible ? <SoundTab vm={vm} /> : null}
                            </TabPanel>
                        </Tabs>
                        {backpackOptions.visible ? (
                            <Backpack host={backpackOptions.host} />
                        ) : null}
                    </Box>

                    <Box className={styles.stageAndTargetWrapper}>
                        <StageWrapper
                            isRendererSupported={isRendererSupported}
                            vm={vm}
                        />
                        <Box className={styles.targetWrapper}>
                            <TargetPane vm={vm} />
                        </Box>
                    </Box>
                </Box>
            </Box>
            <DragLayer />
        </Box>
    );
};
GUIComponent.propTypes = {
    activeTabIndex: PropTypes.number,
    backpackOptions: PropTypes.shape({
        host: PropTypes.string,
        visible: PropTypes.bool
    }),
    basePath: PropTypes.string,
    blocksTabVisible: PropTypes.bool,
    cardsVisible: PropTypes.bool,
    children: PropTypes.node,
    costumesTabVisible: PropTypes.bool,
    enableCommunity: PropTypes.bool,
    importInfoVisible: PropTypes.bool,
    intl: intlShape.isRequired,
    isPlayerOnly: PropTypes.bool,
    loading: PropTypes.bool,
    onActivateCostumesTab: PropTypes.func,
    onActivateSoundsTab: PropTypes.func,
    onActivateTab: PropTypes.func,
    onExtensionButtonClick: PropTypes.func,
    onTabSelect: PropTypes.func,
    previewInfoVisible: PropTypes.bool,
    soundsTabVisible: PropTypes.bool,
    targetIsStage: PropTypes.bool,
    tipsLibraryVisible: PropTypes.bool,
    vm: PropTypes.instanceOf(VM).isRequired
};
GUIComponent.defaultProps = {
    backpackOptions: {
        host: null,
        visible: false
    },
    basePath: './'
};
export default injectIntl(GUIComponent);
