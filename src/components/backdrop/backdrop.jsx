import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl } from 'react-intl';

import Box from '../box/box.jsx';
import VM from 'scratch-vm';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import styles from './backdrop.css';
import tabStyles from 'react-tabs/style/react-tabs.css';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import SoundTab from '../../containers/sound-tab.jsx';
import StageSelector from '../../containers/stage-selector.jsx';
import { spriteShape } from '../target-pane/target-pane.jsx';

const tabClassNames = {
    tabs: styles.tabs,
    tab: classNames(tabStyles.reactTabsTab, styles.tab),
    tabList: classNames(tabStyles.reactTabsTabList, styles.tabList),
    tabPanel: classNames(tabStyles.reactTabsTabPanel, styles.tabPanel),
    tabPanelSelected: classNames(tabStyles.reactTabsTabPanelSelected, styles.isSelected),
    tabSelected: classNames(tabStyles.reactTabsTabSelected, styles.isSelected)
};

const BackdropComponent = function (props) {
    const {
        vm,
        stage,
        activeTabIndex,
        stageTabVisible,
        soundsTabVisible,
        onActivateTab,
        onActivateSoundsTab,
        onActivateStageTab,
        onSelectStage,
        editingTarget,
        ...componentProps
    } = props;

    return (
        <Box
            className={styles.spriteSelector}
            {...componentProps}
        >
            <Box className={styles.editorWrapper}>
                <Tabs
                    forceRenderTabPanel
                    className={tabClassNames.tabs}
                    selectedIndex={activeTabIndex}
                    selectedTabClassName={tabClassNames.tabSelected}
                    selectedTabPanelClassName={tabClassNames.tabPanelSelected}
                    onSelect={onActivateTab}
                >
                    <TabList className={tabClassNames.tabList}>
                        <Tab className={tabClassNames.tab} onClick={onActivateStageTab}>
                            <FormattedMessage
                                defaultMessage="Backdrop"
                                description="Button to get to the available backdrops"
                                id="gui.gui.backdropTab"
                            />
                        </Tab>
                        <Tab className={tabClassNames.tab} onClick={onActivateSoundsTab}>
                            <FormattedMessage
                                defaultMessage="Sounds"
                                description="Button to get to the sounds panel"
                                id="gui.gui.soundsTab"
                            />
                        </Tab>
                    </TabList>
                    <TabPanel className={tabClassNames.tabPanel}>
                        {stageTabVisible
                            ? (<StageSelector
                                asset={
                                    stage.costume &&
                                    stage.costume.asset
                                }
                                backdropCount={stage.costumeCount}
                                id={stage.id}
                                selected={stage.id === editingTarget}
                                onSelect={onSelectStage}
                            />) : null}
                    </TabPanel>
                    <TabPanel className={tabClassNames.tabPanel}>
                        {soundsTabVisible ? <SoundTab vm={vm} /> : null}
                    </TabPanel>
                </Tabs>
            </Box>
        </Box>
    );
};

BackdropComponent.propTypes = {
    vm: PropTypes.instanceOf(VM).isRequired,
    stage: spriteShape,
    activeTabIndex: PropTypes.number,
    stageTabVisible: PropTypes.bool,
    soundsTabVisible: PropTypes.bool,
    onActivateTab: PropTypes.func,
    onActivateSoundsTab: PropTypes.func,
    onActivateStageTab: PropTypes.func,
    onActivateStageTab: PropTypes.func,
    onSelectStage: PropTypes.func
};

export default injectIntl(BackdropComponent);
