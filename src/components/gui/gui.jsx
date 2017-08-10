import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import MediaQuery from 'react-responsive';
import tabStyles from 'react-tabs/style/react-tabs.css';
import VM from 'scratch-vm';

import Blocks from '../../containers/blocks.jsx';
import CostumeTab from '../../containers/costume-tab.jsx';
import GreenFlag from '../../containers/green-flag.jsx';
import TargetPane from '../../containers/target-pane.jsx';
import SoundTab from '../../containers/sound-tab.jsx';
import Stage from '../../containers/stage.jsx';
import StopAll from '../../containers/stop-all.jsx';

import Box from '../box/box.jsx';
import MenuBar from '../menu-bar/menu-bar.jsx';

import styles from './gui.css';

const layout = {
    fullStageWidth: 480,
    fullStageHeight: 360,
    smallerStageWidth: 480 * 0.85,
    smallerStageHeight: 360 * 0.85,
    fullSizeMinWidth: 1096
};

const GUIComponent = props => {
    const {
        basePath,
        children,
        vm,
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
                            </TabPanel>
                            <TabPanel className={tabClassNames.tabPanel}>
                                <CostumeTab vm={vm} />
                            </TabPanel>
                            <TabPanel className={tabClassNames.tabPanel}>
                                <SoundTab vm={vm} />
                            </TabPanel>
                        </Tabs>
                    </Box>

                    <MediaQuery minWidth={layout.fullSizeMinWidth}>
                        {isFullSize => (
                            <Box className={styles.stageAndTargetWrapper}>
                                <Box className={styles.stageMenuWrapper}>
                                    <GreenFlag vm={vm} />
                                    <StopAll vm={vm} />
                                </Box>

                                <Box className={styles.stageWrapper}>
                                    <Stage
                                        height={isFullSize ? layout.fullStageHeight : layout.smallerStageHeight}
                                        shrink={0}
                                        vm={vm}
                                        width={isFullSize ? layout.fullStageWidth : layout.smallerStageWidth}
                                    />
                                </Box>

                                <Box className={styles.targetWrapper}>
                                    <TargetPane
                                        vm={vm}
                                    />
                                </Box>
                            </Box>
                        )}
                    </MediaQuery>
                </Box>
            </Box>
        </Box>
    );
};
GUIComponent.propTypes = {
    basePath: PropTypes.string,
    children: PropTypes.node,
    onTabSelect: PropTypes.func,
    tabIndex: PropTypes.number,
    vm: PropTypes.instanceOf(VM).isRequired
};
GUIComponent.defaultProps = {
    basePath: './'
};
export default GUIComponent;
