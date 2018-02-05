import PropTypes from 'prop-types';
import React from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import Box from '../box/box.jsx';
import Modal from '../modal/modal.jsx';
import styles from './gs-update-modal.css';
import lan from '../../../mycode/language/Local'

const GsUpdateModal = props => (
    <Modal
        className={styles.modalContent}
        contentLabel={lan.data.gui_online_update_title}
        onRequestClose={props.onCancel}
    >
        <Box className={styles.body}>
            <Box className={styles.flexWrapper}>
                <Box className={styles.editorWrapper}>
                    {(() => {
                        if (props.updateNotAvailable) {
                            return (
                                <Box className={styles.row}>Robobloq{lan.data.gui_online_update_latest_version_tip}</Box>
                            );
                        }
                    })()}
                    {(() => {
                      if(props.latestVersion) {
                          return (
                              <Box className={styles.row}>{lan.data.gui_online_update_find_the_latest_version}Robobloq({props.latestVersion}) <button disabled={props.updateButtonDisable} className={styles.primary} type="button" onClick={props.onUpdate}>{lan.data.gui_online_update_update_now}</button></Box>
                          );
                      }
                    })()}
                    {(() => {
                        if(props.percent) {
                            return (
                                <Box className={styles.row}>
                                    <div className={styles.progress}>
                                        <span className={styles.progressVal}>{props.percent}%</span>
                                        <span className={styles.progressBar}>
                                            <span className={styles.progressIn} style={{width: props.percent + '%'}}></span>
                                        </span>
                                    </div>
                                </Box>
                            );
                        }
                    })()}
                    <Box className={styles.row}><button className={styles.primary} type="button" onClick={props.onCheckLatestVersion}>{lan.data.gui_online_update_detect_version}</button></Box>
                    <Box className={styles.row}>{lan.data.gui_online_update_version}{props.currentVersion}</Box>
                </Box>
            </Box>
        </Box>
    </Modal>
);

GsUpdateModal.propTypes = {
    onCancel: PropTypes.func.isRequired,
};

export default GsUpdateModal;
