const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');
const {Tab, Tabs, TabList, TabPanel} = require('react-tabs');
const tabStyles = require('react-tabs/style/react-tabs.css');
const VM = require('scratch-vm');

const Blocks = require('../../containers/blocks.jsx');
const CostumeTab = require('../../containers/costume-tab.jsx');
const GreenFlag = require('../../containers/green-flag.jsx');
const TargetPane = require('../../containers/target-pane.jsx');
const SoundTab = require('../../containers/sound-tab.jsx');
const Stage = require('../../containers/stage.jsx');
const StopAll = require('../../containers/stop-all.jsx');

const Box = require('../box/box.jsx');
const MenuBar = require('../menu-bar/menu-bar.jsx');

const styles = require('./gui.css');


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
                                <Tab className={tabClassNames.tab}>Scripts</Tab>
                                <Tab className={tabClassNames.tab}>Costumes</Tab>
                                <Tab className={tabClassNames.tab}>Sounds</Tab>
                            </TabList>
                            <TabPanel className={tabClassNames.tabPanel}>
                                <Box className={styles.blocksWrapper}>
                                    <Blocks
                                        grow={1}
                                        isVisible={tabIndex === 0} // Scripts tab
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

                    <Box className={styles.stageAndTargetWrapper} >
                        <Box className={styles.stageMenuWrapper} >
                            <GreenFlag vm={vm} />
                            <StopAll vm={vm} />
                        </Box>

                        <Box className={styles.stageWrapper} >
                            <Stage
                                shrink={0}
                                vm={vm}
                            />
                        </Box>

                        <Box className={styles.targetWrapper} >
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
    onTabSelect: PropTypes.func,
    tabIndex: PropTypes.number,
    vm: PropTypes.instanceOf(VM).isRequired
};
GUIComponent.defaultProps = {
    basePath: './'
};
module.exports = GUIComponent;
