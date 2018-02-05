import PropTypes from 'prop-types';
import React from 'react';
import Box from '../box/box.jsx';
import Modal from '../modal/modal.jsx';
import styles from './gs-connect.css';
import lan from '../../../mycode/language/Local'

const GsConnect = props => (
    <Modal
        className={styles.modalContent}
        contentLabel={lan.data.gui_connect_title}
        onRequestClose={props.onCancel}
    >
        <Box className={styles.body}>
            <Box className={styles.label}>
                {lan.data.gui_connect_serialport}
                <Box className={styles.freshButton} onClick={props.onRefresh}>{lan.data.gui_connect_refresh}</Box>
                {/* <Box className={styles.freshButton} onClick={props.onTest}>Test</Box>*/}
            </Box>
            <Box>
                <select
                    autoFocus
                    className={styles.select}
                    placeholder={props.placeholder}
                    onChange={props.onChangePort}
                    onKeyPress={props.onKeyPress}
                >
                    <option value="">{lan.data.gui_connect_select}</option>
                    {props.data.portlist.map(function (value, index, array) {
                        return <option key={index}>{value}</option>
                    })}
                </select>
            </Box>

            <Box className={styles.label}>
                {lan.data.gui_connect_state}
            </Box>
            <Box >
                {props.data.portstate === true ? LOCAL.gui_menu_connect1 : LOCAL.gui_menu_connect0 }
            </Box>
            <Box className={styles.msgAlert} >
                {props.data.msg ? props.data.msg :''}
            </Box>
            <Box className={styles.buttonRow}>

                 <button
                    className={styles.cancelButton}
                    onClick={props.onClear}
                >
                     {lan.data.gui_connect_button_disconnect}
                </button>

                    <button
                        className={styles.okButton}
                        onClick={props.onOk}
                    >
                        {lan.data.gui_connect_button_connect}
                    </button>




            </Box>
        </Box>
    </Modal>
);



GsConnect.propTypes = {
    onCancel: PropTypes.func.isRequired,
};

export default GsConnect;
