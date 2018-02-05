import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import tabStyles from 'react-tabs/style/react-tabs.css';
import Box from '../box/box.jsx';
import Modal from '../modal/modal.jsx';
import styles from './gs-firmware-modal.css';
import lan from '../../../mycode/language/Local'

const tabClassNames = {
    tabs: styles.tabs,
    tab: classNames(tabStyles.reactTabsTab, styles.tab),
    tabList: classNames(tabStyles.reactTabsTabList, styles.tabList),
    tabPanel: classNames(tabStyles.reactTabsTabPanel, styles.tabPanel),
    tabPanelSelected: classNames(tabStyles.reactTabsTabPanelSelected, styles.isSelected),
    tabSelected: classNames(tabStyles.reactTabsTabSelected, styles.isSelected)
};

const GsFirmwareModal = props => (
    <Modal
        className={styles.modalContent}
        contentLabel={lan.data.gui_update_title}
        onRequestClose={props.onCancel}
    >
        <Box className={styles.body}>
            <Box className={styles.flexWrapper}>
                <Box className={styles.editorWrapper}>
                    <Tabs
                        className={tabClassNames.tabs}
                        forceRenderTabPanel={true} // eslint-disable-line react/jsx-boolean-value
                        selectedTabClassName={tabClassNames.tabSelected}
                        selectedTabPanelClassName={tabClassNames.tabPanelSelected}

                    >
                        <TabList className={tabClassNames.tabList}>
                            <Tab className={tabClassNames.tab}>{lan.data.gui_update_normal}</Tab>
                            <Tab className={tabClassNames.tab}>{lan.data.gui_update_advanced}</Tab>
                        </TabList>
                        <TabPanel className={tabClassNames.tabPanel}>
                            <Box className={styles.label}>
                                {lan.data.gui_update_serialport}
                            </Box>
                            <Box>
                                <select
                                    autoFocus
                                    className={styles.select}
                                    placeholder={props.placeholder}
                                    onChange={props.onChangePort}
                                    onKeyPress={props.onKeyPress}
                                >
                                    <option value="">{lan.data.gui_update_select}</option>
                                    {props.portList.map((comName, index) => (
                                        <option key={index} value={comName}>{comName}</option>
                                    ))}
                                </select>
                            </Box>
                            <Box className={styles.label}>
                                {lan.data.gui_update_mainboard}
                            </Box>
                            <Box>
                                <select
                                    autoFocus
                                    className={styles.select}
                                    placeholder={props.placeholder}
                                    onChange={props.onChangeBoard}
                                    onKeyPress={props.onKeyPress}
                                >
                                    <option value="">{lan.data.gui_update_select}</option>
                                    {props.mainBoard.map((item) => (
                                        <option key={item.k} value={item.k}>{item.v}</option>
                                    ))}
                                </select>
                            </Box>
                            <Box className={styles.label}>
                                {lan.data.gui_update_version}
                            </Box>
                            <Box>
                                <select
                                    autoFocus
                                    className={styles.select}
                                    placeholder={props.placeholder}
                                    onChange={props.onChangeVersion}
                                    onKeyPress={props.onKeyPress}
                                >
                                    <option value="">{lan.data.gui_update_select}</option>
                                    {props.version.map((item) => (
                                        <option key={item.url} value={item.url}>{item.name}</option>
                                    ))}
                                </select>
                            </Box>
                            <Box className={styles.buttonRow}>
                                <button
                                    className={styles.cancelButton}
                                    onClick={props.onCancel}
                                >
                                    {lan.data.gui_update_button_cancel}
                                </button>
                                <button
                                    className={styles.okButton}
                                    disabled={props.Okdisabled}
                                    onClick={props.onOk}
                                >
                                    {props.Okdisabled ? lan.data.gui_update_uploading : lan.data.gui_update_button_ok}
                                </button>
                            </Box>
                        </TabPanel>
                        <TabPanel className={tabClassNames.tabPanel}>
                            <Box className={styles.label}>
                                {lan.data.gui_update_mainboard}
                            </Box>
                            <Box>
                                <select
                                    autoFocus
                                    className={styles.select}
                                    placeholder={props.placeholder}
                                    onChange={props.onChangeArduinoType}
                                    onKeyPress={props.onKeyPress}
                                >
                                    <option value="">{lan.data.gui_update_select}</option>
                                    {props.arduinoType.map((item) => (
                                        <option key={item.k} value={item.k}>{item.v}</option>
                                    ))}
                                </select>
                            </Box>
                            <Box className={styles.label}>
                                {lan.data.gui_update_serialport}
                            </Box>
                            <Box>
                                <select
                                    autoFocus
                                    className={styles.select}
                                    placeholder={props.placeholder}
                                    onChange={props.onChangePort}
                                    onKeyPress={props.onKeyPress}
                                >
                                    <option value="">{lan.data.gui_update_select}</option>
                                    {props.portList.map((comName, index) => (
                                        <option key={index} value={comName}>{comName}</option>
                                    ))}
                                </select>
                            </Box>
                            <Box className={styles.label}>
                                {lan.data.gui_update_baudRate}
                            </Box>
                            <Box>
                                <select
                                    autoFocus
                                    className={styles.select}
                                    placeholder={props.placeholder}
                                    onChange={props.onChangeBaudRate}
                                    onKeyPress={props.onKeyPress}
                                >
                                    <option value="">{lan.data.gui_update_select}</option>
                                    {props.baudRate.map((item) => (
                                        <option key={item} value={item}>{item}</option>
                                    ))}
                                </select>
                            </Box>
                            <Box className={styles.buttonRow}>
                                <button
                                    className={styles.cancelButton}
                                    onClick={props.onCancel}
                                >
                                    {lan.data.gui_update_button_cancel}
                                </button>
                                <button
                                    className={styles.okButton}
                                    disabled={props.Okdisabled}
                                    onClick={props.onOkAdvanced}
                                >
                                    {props.Okdisabled ? lan.data.gui_update_uploading : lan.data.gui_update_upload_hex_file}
                                </button>
                            </Box>
                        </TabPanel>
                    </Tabs>
                </Box>
            </Box>
        </Box>
    </Modal>
);

GsFirmwareModal.propTypes = {
    onCancel: PropTypes.func.isRequired,
};

export default GsFirmwareModal;
