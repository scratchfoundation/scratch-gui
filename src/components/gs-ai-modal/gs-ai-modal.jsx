import PropTypes from 'prop-types';
import React from 'react';
import Box from '../box/box.jsx';
import Modal from '../modal/modal.jsx';
import styles from './gs-ai-modal.css';
import lan from '../../../mycode/language/Local'
import myai from '../../../mycode/services/MyAi'

const GsSetting = props => (
    <Modal
        className={styles.modalContent}
        contentLabel={lan.data.gui_ai_title}
        onRequestClose={props.onCancel}
    >
        <Box className={styles.body}>
            <Box className={styles.label}>
                {lan.data.gui_set_language}:

            </Box>
            <Box>
                <select
                    autoFocus
                    className={styles.select}
                    placeholder={props.placeholder}
                    onChange={props.onChangeLanguage}
                    onKeyPress={props.onKeyPress}
                >
                    <option value="">{lan.data.gui_language_select}</option>
                    <option value="zh">中文</option>
                </select>
            </Box>
            <Box className={styles.lingUrl}>
               {lan.data.gui_ai_control_description}
            </Box>
            <Box className={styles.msgAlert} >
                {props.data.msg ? props.data.msg :''}
            </Box>
            <Box className={styles.buttonRow}>
                <button
                    className={styles.cancelButton}
                    onClick={props.onClick1}
                >
                   {lan.data.gui_start_recording}
                </button>

                <button
                    className={styles.okButton}
                    onClick={props.onClick2}
                >
                    {lan.data.gui_stop_recording}
                </button>

            </Box>
        </Box>
    </Modal>
);



GsSetting.propTypes = {
    onCancel: PropTypes.func.isRequired,
};

export default GsSetting;
