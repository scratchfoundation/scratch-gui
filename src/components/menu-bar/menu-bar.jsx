import classNames from 'classnames';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';

import Box from '../box/box.jsx';
import Button from '../button/button.jsx';
import LoadButton from '../../containers/load-button.jsx';
import SaveButton from '../../containers/save-button.jsx';
import LanguageSelector from '../../containers/language-selector.jsx';

import {openFeedbackForm} from '../../reducers/modals';

import styles from './menu-bar.css';

import feedbackIcon from './icon--feedback.svg';
import scratchLogo from '../../../mycode/res/img/gs-logo.svg';

import GsFirmwareButton from '../../containers/gs-firmware-button.jsx';
import GsConnectButton from '../../containers/gs-connect-button.jsx';
import GsDriverButton from '../../containers/gs-driver-button.jsx';
import GsSettingButton from '../../containers/gs-setting-button.jsx';
import GsAiButton from '../../containers/gs-ai-button.jsx';
import GsUpdateButton from '../../containers/gs-update-button.jsx';

const MenuBar = props => (
    <Box
        className={classNames({
            [styles.menuBar]: true
        })}
    >
        <div className={styles.menuBarLeft}>
            <div className={classNames(styles.logoWrapper, styles.menuItem)}>
                <img
                    alt="Scratch"
                    className={styles.scratchLogo}
                    src={scratchLogo}
                />
            </div>
            <SaveButton className={styles.menuItem} />
            <LoadButton className={styles.menuItem} />
            <GsDriverButton className={styles.menuItem} />
            <GsConnectButton className={styles.menuItem} />
            <GsAiButton className={styles.menuItem} />
        </div>
        <div className={styles.menuBarRight}>
            <GsUpdateButton className={styles.menuItem} />
            <GsFirmwareButton className={styles.menuItem} />
            <GsSettingButton className={styles.menuItem} />
        </div>
    </Box>
);

MenuBar.propTypes = {
    onGiveFeedback: PropTypes.func.isRequired
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
    onGiveFeedback: () => {
        dispatch(openFeedbackForm());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuBar);
