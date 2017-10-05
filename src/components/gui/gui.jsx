import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import MediaQuery from 'react-responsive';
import tabStyles from 'react-tabs/style/react-tabs.css';
import VM from 'scratch-vm';

import Blocks from '../../containers/blocks.jsx';
import CostumeTab from '../../containers/costume-tab.jsx';
import Controls from '../../containers/controls.jsx';
import TargetPane from '../../containers/target-pane.jsx';
import SoundTab from '../../containers/sound-tab.jsx';
import Stage from '../../containers/stage.jsx';
import {FormattedMessage} from 'react-intl';

import Box from '../box/box.jsx';
import IconButton from '../icon-button/icon-button.jsx';
import MenuBar from '../menu-bar/menu-bar.jsx';

import layout from '../../lib/layout-constants.js';
import styles from './gui.css';
import addExtensionIcon from './icon--extensions.svg';

const addExtensionMessage = (
    <FormattedMessage
        defaultMessage="Extensions"
        description="Button to add an extension in the target pane"
        id="gui.gui.addExtension"
    />
);

const GUIComponent = props => {
    const {
        basePath,
        children,
        enableExtensions,
        vm,
        onExtensionButtonClick,
        onTabSelect,
        tabIndex,
        ...componentProps
    } = props;
    if (children) {
        return (
            <Box {...componentProps}>
                {children}
            </Box>
        );
    }

    const tabClassNames = {
        tabs: styles.tabs,
        tab: classNames(tabStyles.reactTabsTab, styles.tab),
        tabList: classNames(tabStyles.reactTabsTabList, styles.tabList),
        tabPanel: classNames(tabStyles.reactTabsTabPanel, styles.tabPanel),
        tabPanelSelected: classNames(tabStyles.reactTabsTabPanelSelected, styles.isSelected),
        tabSelected: classNames(tabStyles.reactTabsTabSelected, styles.isSelected)
    };

    return (
        <Box
            className={styles.pageWrapper}
            {...componentProps}
        >
            <MenuBar />
            <Box className={styles.bodyWrapper}>
                <Box className={styles.flexWrapper}>
                    <Box className={styles.editorWrapper}>
                        <Tabs
                            className={tabClassNames.tabs}
                            forceRenderTabPanel={true} // eslint-disable-line react/jsx-boolean-value
                            selectedTabClassName={tabClassNames.tabSelected}
                            selectedTabPanelClassName={tabClassNames.tabPanelSelected}
                            onSelect={onTabSelect}
                        >
                            <TabList className={tabClassNames.tabList}>
                                <Tab className={tabClassNames.tab}>Blocks</Tab>
                                <Tab className={tabClassNames.tab}>Costumes</Tab>
                                <Tab className={tabClassNames.tab}>Sounds</Tab>
                            </TabList>
                            <TabPanel className={tabClassNames.tabPanel}>
                                <Box className={styles.blocksWrapper}>
                                    <Blocks
                                        grow={1}
                                        isVisible={tabIndex === 0} // Blocks tab
                                        options={{
                                            media: `${basePath}static/blocks-media/`
                                        }}
                                        vm={vm}
                                    />
                                </Box>
                                <Box className={styles.extensionButtonContainer}>
                                    <IconButton
                                        className={classNames(styles.extensionButton, {
                                            [styles.hidden]: !enableExtensions
                                        })}
                                        img={addExtensionIcon}
                                        title={addExtensionMessage}
                                        onClick={onExtensionButtonClick}
                                    />
                                </Box>
                            </TabPanel>
                            <TabPanel className={tabClassNames.tabPanel}>
                                {tabIndex === 1 ? <CostumeTab vm={vm} /> : null}
                            </TabPanel>
                            <TabPanel className={tabClassNames.tabPanel}>
                                {tabIndex === 2 ? <SoundTab vm={vm} /> : null}
                            </TabPanel>
                        </Tabs>
                    </Box>

                    <Box className={styles.stageAndTargetWrapper}>
                        <Box className={styles.stageMenuWrapper}>
                            <Controls vm={vm} />
                        </Box>
                        <Box className={styles.stageWrapper}>
                            <MediaQuery minWidth={layout.fullSizeMinWidth}>{isFullSize => (
                                <Stage
                                    height={isFullSize ? layout.fullStageHeight : layout.smallerStageHeight}
                                    shrink={0}
                                    vm={vm}
                                    width={isFullSize ? layout.fullStageWidth : layout.smallerStageWidth}
                                />
                            )}</MediaQuery>
                        </Box>
                        <Box className={styles.targetWrapper}>
                            <TargetPane
                                vm={vm}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
GUIComponent.propTypes = {
    basePath: PropTypes.string,
    children: PropTypes.node,
    enableExtensions: PropTypes.bool,
    onExtensionButtonClick: PropTypes.func,
    onTabSelect: PropTypes.func,
    tabIndex: PropTypes.number,
    vm: PropTypes.instanceOf(VM).isRequired
};
GUIComponent.defaultProps = {
    basePath: './'
};
export default GUIComponent;
