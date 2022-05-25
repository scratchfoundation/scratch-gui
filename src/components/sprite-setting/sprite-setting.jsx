import React from 'react'
import classNames from 'classnames';
import omit from 'lodash.omit';
import PropTypes from 'prop-types';
import {FormattedMessage } from 'react-intl';

import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import TargetPane from '../../containers/target-pane.jsx';
import CostumeTab from '../../containers/costume-tab.jsx';
import SoundTab from '../../containers/sound-tab.jsx';
import Box from '../box/box.jsx';

import { STAGE_SIZE_MODES } from '../../lib/layout-constants';
import VM from 'scratch-vm';

import tabStyles from 'react-tabs/style/react-tabs.css';
import styles from './sprite-setting.css';



const SpriteSetting = props => {

    const {
        vm,
        stageSize,
        activeTabIndex,
        onActivateTab,
        onActivateCostumesTab,
        onActivateSoundsTab,
        costumesTabVisible,
        soundsTabVisible,
        parametersTabVisible
    } = omit(props, 'dispatch');

    const tabClassNames = {
        tabs: styles.tabs,
        tab: classNames(tabStyles.reactTabsTab, styles.tab),
        tabList: classNames(tabStyles.reactTabsTabList, styles.tabList),
        tabPanel: classNames(tabStyles.reactTabsTabPanel, styles.tabPanel),
        tabPanelSelected: classNames(tabStyles.reactTabsTabPanelSelected, styles.isSelected),
        tabSelected: classNames(tabStyles.reactTabsTabSelected, styles.isSelected)
    };


    return (
        <div>
            <Box >
                <TargetPane
                    stageSize={stageSize}
                    vm={vm}
                />
            </Box>
        </div>
    );
}

SpriteSetting.propTypes = {
    activeTabIndex: PropTypes.number,
    costumesTabVisible: PropTypes.bool,
    onActivateCostumesTab: PropTypes.func,
    onActivateSoundsTab: PropTypes.func,
    onActivateTab: PropTypes.func,
    soundsTabVisible: PropTypes.bool,
    stageSize: PropTypes.oneOf(Object.keys(STAGE_SIZE_MODES)),
    vm: PropTypes.instanceOf(VM).isRequired
};

// const mapStateToProps = state => ({
//     // This is the button's mode, as opposed to the actual current state
//     stageSize: state.scratchGui.stageSize.stageSize
// });

export default SpriteSetting



// <Box className={styles.editorWrapper}>
//                 <Tabs
//                     forceRenderTabPanel
//                     className={tabClassNames.tabs}
//                     selectedIndex={activeTabIndex}
//                     selectedTabClassName={tabClassNames.tabSelected}
//                     selectedTabPanelClassName={tabClassNames.tabPanelSelected}
//                     onSelect={onActivateTab}
//                 >
//                     <TabList className={tabClassNames.tabList}>
//                         <Tab className={tabClassNames.tab}>
//                             <FormattedMessage
//                                 defaultMessage="Parameters"
//                                 description="Button to get to the code panel"
//                                 id="gui.gui.codeTab"
//                             />
//                         </Tab>
//                         <Tab className={tabClassNames.tab} onClick={onActivateCostumesTab}>
//                             <FormattedMessage
//                                 defaultMessage="Costumes"
//                                 description="Button to get to the costumes panel"
//                                 id="gui.gui.costumesTab"
//                             />
//                         </Tab>
//                         <Tab className={tabClassNames.tab} onClick={onActivateSoundsTab}>
//                             <FormattedMessage
//                                 defaultMessage="Sounds"
//                                 description="Button to get to the sounds panel"
//                                 id="gui.gui.soundsTab"
//                             />
//                         </Tab>
//                     </TabList>
//                     <TabPanel className={tabClassNames.tabPanel}>
//                         {/**  Parameters, Sprite Info */}
//                     </TabPanel>
//                     <TabPanel className={tabClassNames.tabPanel}>
//                         {costumesTabVisible ? <CostumeTab vm={vm} /> : null}
//                     </TabPanel>
//                     <TabPanel className={tabClassNames.tabPanel}>
//                         {soundsTabVisible ? <SoundTab vm={vm} /> : null}
//                     </TabPanel>
//                 </Tabs>
//             </Box>