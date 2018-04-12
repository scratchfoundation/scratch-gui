import classNames from 'classnames';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';

import Box from '../box/box.jsx';
import Button from '../button/button.jsx';
import {ComingSoonTooltip} from '../coming-soon/coming-soon.jsx';
import LanguageSelector from '../../containers/language-selector.jsx';
import LoadButton from '../../containers/load-button.jsx';
import Menu from '../../containers/menu.jsx';
import {MenuItem, MenuSection} from '../menu/menu.jsx';
import SaveButton from '../../containers/save-button.jsx';

import {openFeedbackForm} from '../../reducers/modals';
import {openFileMenu, closeFileMenu, MENU_FILE} from '../../reducers/menus';

import styles from './menu-bar.css';

import mystuffIcon from './icon--mystuff.png';
import profileIcon from './icon--profile.png';
import feedbackIcon from './icon--feedback.svg';
import communityIcon from './icon--see-community.svg';
import dropdownCaret from '../language-selector/dropdown-caret.svg';
import scratchLogo from './scratch-logo.svg';

const MenuBarItemTooltip = ({
    children,
    className,
    id,
    place = 'bottom'
}) => (
    <ComingSoonTooltip
        className={classNames(styles.comingSoon, className)}
        place={place}
        tooltipClassName={styles.comingSoonTooltip}
        tooltipId={id}
    >
        {children}
    </ComingSoonTooltip>
);

MenuBarItemTooltip.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    id: PropTypes.string,
    place: PropTypes.oneOf(['top', 'bottom', 'left', 'right'])
};

const MenuItemTooltip = ({id, children, className}) => (
    <ComingSoonTooltip
        className={classNames(styles.comingSoon, className)}
        place="right"
        tooltipClassName={styles.comingSoonTooltip}
        tooltipId={id}
    >
        {children}
    </ComingSoonTooltip>
);

MenuItemTooltip.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    id: PropTypes.string
};

const MenuBarMenu = ({
    children,
    onRequestClose,
    open,
    place = 'right'
}) => (
    <Menu
        className={styles.menu}
        open={open}
        place={place}
        onRequestClose={onRequestClose}
    >
        {children}
    </Menu>
);

MenuBarMenu.propTypes = {
    children: PropTypes.node,
    onRequestClose: PropTypes.func,
    open: PropTypes.bool,
    place: PropTypes.oneOf(['left', 'right'])
};

const MenuBar = props => (
    <Box className={styles.menuBar}>
        <div className={styles.mainMenu}>
            <div className={styles.fileGroup}>
                <div className={classNames(styles.logoWrapper, styles.menuBarItem)}>
                    <img
                        alt="Scratch"
                        className={styles.scratchLogo}
                        draggable={false}
                        src={scratchLogo}
                    />
                </div>
                <div className={classNames(styles.menuBarItem)}>
                    <MenuBarItemTooltip
                        id="menubar-selector"
                        place="right"
                    >
                        <LanguageSelector />
                    </MenuBarItemTooltip>
                </div>
                <div
                    className={classNames(styles.menuBarItem, {
                        [styles.active]: props.fileMenuOpen
                    })}
                    onMouseUp={props.onClickFile}
                >
                    <div className={classNames(styles.fileMenu)}>File</div>
                    <MenuBarMenu
                        open={props.fileMenuOpen}
                        onRequestClose={props.onRequestCloseFile}
                    >
                        <MenuItemTooltip id="new">
                            <MenuItem>New</MenuItem>
                        </MenuItemTooltip>
                        <MenuSection>
                            <MenuItemTooltip id="save">
                                <MenuItem>Save now</MenuItem>
                            </MenuItemTooltip>
                            <MenuItemTooltip id="copy">
                                <MenuItem>Save as a copy</MenuItem>
                            </MenuItemTooltip>
                        </MenuSection>
                        <MenuSection>
                            <LoadButton>{(renderFileInput, loadProject, loadProps) => (
                                <MenuItem
                                    onClick={loadProject}
                                    {...loadProps}
                                >
                                    Upload from your computer
                                    {renderFileInput()}
                                </MenuItem>
                            )}</LoadButton>
                            <SaveButton>{(saveProject, saveProps) => (
                                <MenuItem
                                    onClick={saveProject}
                                    {...saveProps}
                                >
                                    Download to your computer
                                </MenuItem>
                            )}</SaveButton>
                        </MenuSection>
                    </MenuBarMenu>
                </div>
                <div className={classNames(styles.menuBarItem)}>
                    <MenuBarItemTooltip id="edit-menu">
                        <div className={classNames(styles.editMenu)}>Edit</div>
                    </MenuBarItemTooltip>
                </div>
            </div>
            <div className={classNames(styles.divider)} />
            <div className={classNames(styles.menuBarItem)}>
                <MenuBarItemTooltip id="title-field">
                    <input
                        disabled
                        className={classNames(styles.titleField)}
                        placeholder="Untitled-1"
                    />
                </MenuBarItemTooltip>
            </div>
            <div className={classNames(styles.menuBarItem)}>
                <MenuBarItemTooltip id="share-button">
                    <Button className={classNames(styles.shareButton)}>
                        <FormattedMessage
                            defaultMessage="Share"
                            description="Label for project share button"
                            id="gui.menuBar.share"
                        />
                    </Button>
                </MenuBarItemTooltip>
            </div>
            <div className={classNames(styles.menuBarItem, styles.communityButtonWrapper)}>
                <MenuBarItemTooltip id="community-button">
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
                </MenuBarItemTooltip>
            </div>
        </div>
        <div className={classNames(styles.menuBarItem, styles.feedbackButtonWrapper)}>
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
            <MenuBarItemTooltip id="mystuff">
                <div className={styles.mystuffButton}>
                    <img
                        className={styles.mystuffIcon}
                        src={mystuffIcon}
                    />
                </div>
            </MenuBarItemTooltip>
            <MenuBarItemTooltip
                id="account-nav"
                place="left"
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
            </MenuBarItemTooltip>
        </div>
    </Box>
);

MenuBar.propTypes = {
    fileMenuOpen: PropTypes.bool,
    onClickFile: PropTypes.func,
    onGiveFeedback: PropTypes.func.isRequired,
    onRequestCloseFile: PropTypes.func
};

const mapStateToProps = state => ({
    fileMenuOpen: state.menus[MENU_FILE]
});

const mapDispatchToProps = dispatch => ({
    onGiveFeedback: () => {
        dispatch(openFeedbackForm());
    },
    onClickFile: () => {
        dispatch(openFileMenu());
    },
    onRequestCloseFile: () => {
        dispatch(closeFileMenu());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuBar);
