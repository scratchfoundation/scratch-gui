const React = require('react');
const VM = require('scratch-vm');
const Blocks = require('../../containers/blocks.jsx');
const CostumeTab = require('../../containers/costume-tab.jsx');
const GreenFlag = require('../../containers/green-flag.jsx');
const TargetPane = require('../../containers/target-pane.jsx');
const SoundTab = require('../../containers/sound-tab.jsx');
const Stage = require('../../containers/stage.jsx');
const StopAll = require('../../containers/stop-all.jsx');
const MenuBar = require('../menu-bar/menu-bar.jsx');
const {Tab, Tabs, TabList, TabPanel} = require('react-tabs');

const Box = require('../box/box.jsx');
const styles = require('./gui.css');

const GUIComponent = props => {
    const {
        basePath,
        children,
        vm,
        ...componentProps
    } = props;
    if (children) {
        return (
            <Box {...componentProps}>
                {children}
            </Box>
        );
    }

    // @todo hack to resize blockly manually in case resize happened while hidden
    const handleTabSelect = tabIndex => {
        if (tabIndex === 0) {
            setTimeout(() => window.dispatchEvent(new Event('resize')));
        }
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
                            className={styles.tabs}
                            forceRenderTabPanel={true} // eslint-disable-line react/jsx-boolean-value
                            onSelect={handleTabSelect}
                        >
                            <TabList className={styles.tabList}>
                                <Tab>Scripts</Tab>
                                <Tab>Costumes</Tab>
                                <Tab>Sounds</Tab>
                            </TabList>
                            <TabPanel className={styles.tabPanel}>
                                <Box className={styles.blocksWrapper}>
                                    <Blocks
                                        grow={1}
                                        options={{
                                            media: `${basePath}static/blocks-media/`
                                        }}
                                        vm={vm}
                                    />
                                </Box>
                            </TabPanel>
                            <TabPanel className={styles.tabPanel}>
                                <CostumeTab vm={vm} />
                            </TabPanel>
                            <TabPanel className={styles.tabPanel}>
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
    basePath: React.PropTypes.string,
    children: React.PropTypes.node,
    vm: React.PropTypes.instanceOf(VM)
};
GUIComponent.defaultProps = {
    basePath: '/',
    vm: new VM()
};
module.exports = GUIComponent;
