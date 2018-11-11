import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import ReactModal from 'react-modal';
import {FormattedMessage} from 'react-intl';

import Box from '../box/box.jsx';
import Button from '../button/button.jsx';
import CloseButton from '../close-button/close-button.jsx';

import backIcon from '../../lib/assets/icon--back.svg';
import helpIcon from '../../lib/assets/icon--help.svg';

import styles from './modal.css';

const ModalComponent = props => (
    <ReactModal
        isOpen
        className={classNames(styles.modalContent, props.className, {
            [styles.fullScreen]: props.fullScreen
        })}
        contentLabel={props.contentLabel}
        overlayClassName={styles.modalOverlay}
        onRequestClose={props.onRequestClose}
    >
        <Box
            dir={props.isRtl ? 'rtl' : 'ltr'}
            direction="column"
            grow={1}
        >
            <div className={classNames(styles.header, props.headerClassName)}>
                {props.onHelp ? (
                    <div
                        className={classNames(
                            styles.headerItem,
                            styles.headerItemHelp
                        )}
                    >
                        <Button
                            className={styles.helpButton}
                            iconSrc={helpIcon}
                            onClick={props.onHelp}
                        >
                            <FormattedMessage
                                defaultMessage="Help"
                                description="Help button in modal"
                                id="gui.modal.help"
                            />
                        </Button>
                    </div>
                ) : null}
                <div
                    className={classNames(
                        styles.headerItem,
                        styles.headerItemTitle
                    )}
                >
                    {props.headerImage ? (
                        <img
                            className={styles.headerImage}
                            src={props.headerImage}
                        />
                    ) : null}
                    {props.contentLabel}
                </div>
                <div
                    className={classNames(
                        styles.headerItem,
                        styles.headerItemClose
                    )}
                >
                    {props.fullScreen ? (
                        <Button
                            className={styles.backButton}
                            iconSrc={backIcon}
                            onClick={props.onRequestClose}
                        >
                            <FormattedMessage
                                defaultMessage="Back"
                                description="Back button in modal"
                                id="gui.modal.back"
                            />
                        </Button>
                    ) : (
                        <CloseButton
                            size={CloseButton.SIZE_LARGE}
                            onClick={props.onRequestClose}
                        />
                    )}
                </div>
            </div>
            {props.children}
        </Box>
    </ReactModal>
);

ModalComponent.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    contentLabel: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]).isRequired,
    fullScreen: PropTypes.bool,
    headerClassName: PropTypes.string,
    headerImage: PropTypes.string,
    isRtl: PropTypes.bool,
    onHelp: PropTypes.func,
    onRequestClose: PropTypes.func
};

export default ModalComponent;
