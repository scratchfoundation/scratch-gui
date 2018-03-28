import classNames from 'classnames';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';

import Box from '../box/box.jsx';
import Button from '../button/button.jsx';
import {ComingSoonTooltip} from '../coming-soon/coming-soon.jsx';
import LanguageSelector from '../../containers/language-selector.jsx';

import {openFeedbackForm} from '../../reducers/modals';

import styles from './menu-bar.css';

import mystuffIcon from './icon--mystuff.png';
import profileIcon from './icon--profile.png';
import feedbackIcon from './icon--feedback.svg';
import communityIcon from './icon--see-community.svg';
import dropdownCaret from '../language-selector/dropdown-caret.svg';
import scratchLogo from './scratch-logo.svg';

const MenuBar = props => (
    <Box
        className={classNames({
            [styles.menuBar]: true
        })}
    >
        <div className={styles.mainMenu}>
            <div className={styles.fileGroup}>
                <div className={classNames(styles.logoWrapper, styles.menuItem)}>
                    <img
                        alt="Scratch"
                        className={styles.scratchLogo}
                        draggable={false}
                        src={scratchLogo}
                    />
                </div>
                <div className={classNames(styles.menuItem)}>
                    <ComingSoonTooltip
                        className={styles.comingSoon}
                        place="bottom"
                        tooltipClassName={styles.comingSoonTooltip}
                        tooltipId="menubar-selector"
                    >
                        <LanguageSelector />
                    </ComingSoonTooltip>
                </div>
                <div className={classNames(styles.menuItem)}>
                    <ComingSoonTooltip
                        className={styles.comingSoon}
                        place="bottom"
                        tooltipClassName={styles.comingSoonTooltip}
                        tooltipId="file-menu"
                    >
                        <div className={classNames(styles.fileMenu)}>File</div>
                    </ComingSoonTooltip>
                </div>
                <div className={classNames(styles.menuItem)}>
                    <ComingSoonTooltip
                        className={styles.comingSoon}
                        place="bottom"
                        tooltipClassName={styles.comingSoonTooltip}
                        tooltipId="edit-menu"
                    >
                        <div className={classNames(styles.editMenu)}>Edit</div>
                    </ComingSoonTooltip>
                </div>
            </div>
            <div className={classNames(styles.divider)} />
            <div className={classNames(styles.menuItem)}>
                <ComingSoonTooltip
                    className={styles.comingSoon}
                    place="bottom"
                    tooltipClassName={styles.comingSoonTooltip}
                    tooltipId="title-field"
                >
                    <input
                        disabled
                        className={classNames(styles.titleField)}
                        placeholder="Untitled-1"
                    />
                </ComingSoonTooltip>
            </div>
            <div className={classNames(styles.menuItem)}>
                <ComingSoonTooltip
                    className={styles.comingSoon}
                    place="bottom"
                    tooltipClassName={styles.comingSoonTooltip}
                    tooltipId="share-button"
                >
                    <Button className={classNames(styles.shareButton)}>
                        <FormattedMessage
                            defaultMessage="Share"
                            description="Label for project share button"
                            id="gui.menuBar.share"
                        />
                    </Button>
                </ComingSoonTooltip>
            </div>
            <div className={classNames(styles.menuItem, styles.communityButtonWrapper)}>
                <ComingSoonTooltip
                    className={styles.comingSoon}
                    place="bottom"
                    tooltipClassName={styles.comingSoonTooltip}
                    tooltipId="community-button"
                >
                    <Button
                        className={classNames(styles.communityButton)}
                        iconClassName={styles.communityButtonIcon}
                        iconSrc={communityIcon}
                    >
                        <FormattedMessage
                            defaultMessage="See Community"
                            description="Label for see community button"
                            id="gui.menuBar.seeCommunity"
                        />
                    </Button>
                </ComingSoonTooltip>
            </div>
        </div>
        <div className={classNames(styles.menuItem, styles.feedbackButtonWrapper)}>
            <Button
                className={styles.feedbackButton}
                iconSrc={feedbackIcon}
                onClick={props.onGiveFeedback}
            >
                <FormattedMessage
                    defaultMessage="Give Feedback"
                    description="Label for feedback form modal button"
                    id="gui.menuBar.giveFeedback"
                />
            </Button>
        </div>
        <div className={styles.accountInfoWrapper}>
            <ComingSoonTooltip
                className={styles.comingSoon}
                place="bottom"
                tooltipId="mystuff"
            >
                <div className={styles.mystuffButton}>
                    <img
                        className={styles.mystuffIcon}
                        src={mystuffIcon}
                    />
                </div>
            </ComingSoonTooltip>
            <ComingSoonTooltip
                className={styles.comingSoon}
                place="left"
                tooltipId="account-nav"
            >
                <div className={styles.accountNavMenu}>
                    <img
                        className={styles.profileIcon}
                        src={profileIcon}
                    />
                    <span>scratch-cat</span>
                    <img
                        className={styles.dropdownCaretIcon}
                        src={dropdownCaret}
                    />
                </div>
            </ComingSoonTooltip>
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
