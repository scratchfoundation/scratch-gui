import PropTypes from 'prop-types';
import React from 'react';
import Box from '../box/box.jsx';
import Modal from '../modal/modal.jsx';
import styles from './gs-setting.css';
import lan from '../../../mycode/language/Local'

const GsSetting = props => (
    <Modal
        className={styles.modalContent}
        contentLabel={lan.data.gui_set_title}
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
                    <option value="1">English</option>
                    <option value="2">中文</option>
                </select>
            </Box>
            <Box className={styles.lingUrl}>
                {lan.data.gui_set_info} <a target="_blank" href="http://www.robobloq.com/"> www.robobloq.com</a>
            </Box>
        </Box>
    </Modal>
);



GsSetting.propTypes = {
    onCancel: PropTypes.func.isRequired,
};

export default GsSetting;
