import classNames from 'classnames';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {defineMessages, FormattedMessage, injectIntl, intlShape} from 'react-intl';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';
import bowser from 'bowser';
import React from 'react';

import VM from 'scratch-vm';

import Box from '../box/box.jsx';
import Button from '../button/button.jsx';
import CommunityButton from './community-button.jsx';
import ShareButton from './share-button.jsx';
import {ComingSoonTooltip} from '../coming-soon/coming-soon.jsx';
import Divider from '../divider/divider.jsx';
import LanguageSelector from '../../containers/language-selector.jsx';
import SBFileUploader from '../../containers/sb-file-uploader.jsx';
import ProjectWatcher from '../../containers/project-watcher.jsx';
import MenuBarMenu from './menu-bar-menu.jsx';
import {MenuItem, MenuSection} from '../menu/menu.jsx';
import ProjectTitleInput from './project-title-input.jsx';
import AuthorInfo from './author-info.jsx';
import SB3Downloader from '../../containers/sb3-downloader.jsx';
import DeletionRestorer from '../../containers/deletion-restorer.jsx';
import TurboMode from '../../containers/turbo-mode.jsx';
import MenuBarHOC from '../../containers/menu-bar-hoc.jsx';

import SixtyFPSToggler from '../../containers/tw-sixty-fps-toggler.jsx';
import HighQualityPen from '../../containers/tw-high-quality-pen.jsx';
import ChangeUsername from '../../containers/tw-change-username.jsx';
import CloudVariablesToggler from '../../containers/tw-cloud-toggler.jsx';
import CompilerOptions from '../../containers/tw-compiler-options.jsx';
import TWSaveStatus from './tw-save-status.jsx';

import {openTipsLibrary} from '../../reducers/modals';
import {setPlayer} from '../../reducers/mode';
import {
    autoUpdateProject,
    getIsUpdating,
    getIsShowingProject,
    manualUpdateProject,
    requestNewProject,
    remixProject,
    saveProjectAsCopy
} from '../../reducers/project-state';
import {
    openAccountMenu,
    closeAccountMenu,
    accountMenuOpen,
    openFileMenu,
    closeFileMenu,
    fileMenuOpen,
    openEditMenu,
    closeEditMenu,
    editMenuOpen,
    openSettingsMenu,
    closeSettingMenu,
    settingsMenuOpen,
    openHelpMenu,
    closeHelpMenu,
    helpMenuOpen,
    openErrorsMenu,
    closeErrorsMenu,
    errorsMenuOpen,
    openLanguageMenu,
    closeLanguageMenu,
    languageMenuOpen,
    openLoginMenu,
    closeLoginMenu,
    loginMenuOpen
} from '../../reducers/menus';

import collectMetadata from '../../lib/collect-metadata';

import styles from './menu-bar.css';

import helpIcon from '../../lib/assets/icon--tutorials.svg';
import mystuffIcon from './icon--mystuff.png';
import profileIcon from './icon--profile.png';
import remixIcon from './icon--remix.svg';
import dropdownCaret from './dropdown-caret.svg';
import languageIcon from '../language-selector/language-icon.svg';
import aboutIcon from './icon--about.svg';
import errorIcon from './tw-error.svg';

import scratchLogo from './scratch-logo.svg';

import sharedMessages from '../../lib/shared-messages';

import SeeInsideButton from './tw-see-inside.jsx';

const ariaMessages = defineMessages({
    language: {
        id: 'gui.menuBar.LanguageSelector',
        defaultMessage: 'language selector',
        description: 'accessibility text for the language selection menu'
    },
    tutorials: {
        id: 'gui.menuBar.tutorialsLibrary',
        defaultMessage: 'Tutorials',
        description: 'accessibility text for the tutorials button'
    }
});

const twMessages = defineMessages({
    compileError: {
        id: 'tw.menuBar.compileError',
        defaultMessage: '{sprite}: {error}',
        description: 'Error message in errors dropdown'
    }
});

const MenuBarItemTooltip = ({
    children,
    className,
    enable,
    id,
    place = 'bottom'
}) => {
    if (enable) {
        return (
            <React.Fragment>
                {children}
            </React.Fragment>
        );
    }
    return (
        <ComingSoonTooltip
            className={classNames(styles.comingSoon, className)}
            place={place}
            tooltipClassName={styles.comingSoonTooltip}
            tooltipId={id}
        >
            {children}
        </ComingSoonTooltip>
    );
};


MenuBarItemTooltip.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    enable: PropTypes.bool,
    id: PropTypes.string,
    place: PropTypes.oneOf(['top', 'bottom', 'left', 'right'])
};

const MenuItemTooltip = ({id, isRtl, children, className}) => (
    <ComingSoonTooltip
        className={classNames(styles.comingSoon, className)}
        isRtl={isRtl}
        place={isRtl ? 'left' : 'right'}
        tooltipClassName={styles.comingSoonTooltip}
        tooltipId={id}
    >
        {children}
    </ComingSoonTooltip>
);

MenuItemTooltip.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    id: PropTypes.string,
    isRtl: PropTypes.bool
};

const AboutButton = props => (
    <Button
        className={classNames(styles.menuBarItem, styles.hoverable)}
        iconClassName={styles.aboutIcon}
        iconSrc={aboutIcon}
        onClick={props.onClick}
    />
);

AboutButton.propTypes = {
    onClick: PropTypes.func.isRequired
};

// Unlike <MenuItem href="">, this uses an actual <a>
const MenuItemLink = props => (
    <a
        href={props.href}
        // _blank is safe because of noopener
        // eslint-disable-next-line react/jsx-no-target-blank
        target="_blank"
        rel="noopener"
        className={styles.menuItemLink}
    >
        <MenuItem>{props.children}</MenuItem>
    </a>
);

MenuItemLink.propTypes = {
    children: PropTypes.node.isRequired,
    href: PropTypes.string.isRequired
};

class MenuBar extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleClickSeeInside',
            'handleClickNew',
            'handleClickRemix',
            'handleClickSave',
            'handleClickSaveAsCopy',
            'handleClickSeeCommunity',
            'handleClickShare',
            'handleKeyPress',
            'handleLanguageMouseUp',
            'handleRestoreOption',
            'getSaveToComputerHandler',
            'restoreOptionMessage'
        ]);
    }
    componentDidMount () {
        document.addEventListener('keydown', this.handleKeyPress);
    }
    componentWillUnmount () {
        document.removeEventListener('keydown', this.handleKeyPress);
    }
    handleClickNew () {
        // if the project is dirty, and user owns the project, we will autosave.
        // but if they are not logged in and can't save, user should consider
        // downloading or logging in first.
        // Note that if user is logged in and editing someone else's project,
        // they'll lose their work.
        const readyToReplaceProject = this.props.confirmReadyToReplaceProject(
            this.props.intl.formatMessage(sharedMessages.replaceProjectWarning)
        );
        this.props.onRequestCloseFile();
        if (readyToReplaceProject) {
            this.props.onClickNew(this.props.canSave && this.props.canCreateNew);
        }
        this.props.onRequestCloseFile();
    }
    handleClickRemix () {
        this.props.onClickRemix();
        this.props.onRequestCloseFile();
    }
    handleClickSave () {
        this.props.onClickSave();
        this.props.onRequestCloseFile();
    }
    handleClickSaveAsCopy () {
        this.props.onClickSaveAsCopy();
        this.props.onRequestCloseFile();
    }
    handleClickSeeCommunity (waitForUpdate) {
        if (this.props.shouldSaveBeforeTransition()) {
            this.props.autoUpdateProject(); // save before transitioning to project page
            waitForUpdate(true); // queue the transition to project page
        } else {
            waitForUpdate(false); // immediately transition to project page
        }
    }
    handleClickShare (waitForUpdate) {
        if (!this.props.isShared) {
            if (this.props.canShare) { // save before transitioning to project page
                this.props.onShare();
            }
            if (this.props.canSave) { // save before transitioning to project page
                this.props.autoUpdateProject();
                waitForUpdate(true); // queue the transition to project page
            } else {
                waitForUpdate(false); // immediately transition to project page
            }
        }
    }
    handleRestoreOption (restoreFun) {
        return () => {
            restoreFun();
            this.props.onRequestCloseEdit();
        };
    }
    handleKeyPress (event) {
        const modifier = bowser.mac ? event.metaKey : event.ctrlKey;
        if (modifier && event.key === 's') {
            this.props.onClickSave();
            event.preventDefault();
        }
    }
    getSaveToComputerHandler (downloadProjectCallback) {
        return () => {
            this.props.onRequestCloseFile();
            downloadProjectCallback();
            if (this.props.onProjectTelemetryEvent) {
                const metadata = collectMetadata(this.props.vm, this.props.projectTitle, this.props.locale);
                this.props.onProjectTelemetryEvent('projectDidSave', metadata);
            }
        };
    }
    handleLanguageMouseUp (e) {
        if (!this.props.languageMenuOpen) {
            this.props.onClickLanguage(e);
        }
    }
    restoreOptionMessage (deletedItem) {
        switch (deletedItem) {
        case 'Sprite':
            return (<FormattedMessage
                defaultMessage="Restore Sprite"
                description="Menu bar item for restoring the last deleted sprite."
                id="gui.menuBar.restoreSprite"
            />);
        case 'Sound':
            return (<FormattedMessage
                defaultMessage="Restore Sound"
                description="Menu bar item for restoring the last deleted sound."
                id="gui.menuBar.restoreSound"
            />);
        case 'Costume':
            return (<FormattedMessage
                defaultMessage="Restore Costume"
                description="Menu bar item for restoring the last deleted costume."
                id="gui.menuBar.restoreCostume"
            />);
        default: {
            return (<FormattedMessage
                defaultMessage="Restore"
                description="Menu bar item for restoring the last deleted item in its disabled state." /* eslint-disable-line max-len */
                id="gui.menuBar.restore"
            />);
        }
        }
    }
    handleClickSeeInside () {
        this.props.onClickSeeInside();
    }
    render () {
        const saveNowMessage = (
            <FormattedMessage
                defaultMessage="Save now"
                description="Menu bar item for saving now"
                id="gui.menuBar.saveNow"
            />
        );
        const createCopyMessage = (
            <FormattedMessage
                defaultMessage="Save as a copy"
                description="Menu bar item for saving as a copy"
                id="gui.menuBar.saveAsCopy"
            />
        );
        const remixMessage = (
            <FormattedMessage
                defaultMessage="Remix"
                description="Menu bar item for remixing"
                id="gui.menuBar.remix"
            />
        );
        const newProjectMessage = (
            <FormattedMessage
                defaultMessage="New"
                description="Menu bar item for creating a new project"
                id="gui.menuBar.new"
            />
        );
        const remixButton = (
            <Button
                className={classNames(
                    styles.menuBarButton,
                    styles.remixButton
                )}
                iconClassName={styles.remixButtonIcon}
                iconSrc={remixIcon}
                onClick={this.handleClickRemix}
            >
                {remixMessage}
            </Button>
        );
        // Show the About button only if we have a handler for it (like in the desktop app)
        const aboutButton = this.props.onClickAbout ? <AboutButton onClick={this.props.onClickAbout} /> : null;
        return (
            <Box
                className={classNames(
                    this.props.className,
                    styles.menuBar
                )}
            >
                <div className={styles.mainMenu}>
                    <div className={styles.fileGroup}>
                        {this.props.onClickLogo ? (
                            <div className={classNames(styles.menuBarItem)}>
                                <img
                                    alt="Scratch"
                                    className={classNames(styles.scratchLogo, {
                                        [styles.clickable]: typeof this.props.onClickLogo !== 'undefined'
                                    })}
                                    draggable={false}
                                    src={this.props.logo}
                                    onClick={this.props.onClickLogo}
                                />
                            </div>
                        ) : null}
                        {(this.props.canChangeLanguage) && (<div
                            className={classNames(styles.menuBarItem, styles.hoverable, styles.languageMenu)}
                        >
                            <div>
                                <img
                                    className={styles.languageIcon}
                                    src={languageIcon}
                                />
                                <img
                                    className={styles.languageCaret}
                                    src={dropdownCaret}
                                />
                            </div>
                            <LanguageSelector label={this.props.intl.formatMessage(ariaMessages.language)} />
                        </div>)}
                        {(this.props.canManageFiles) && (
                            <div
                                className={classNames(styles.menuBarItem, styles.hoverable, {
                                    [styles.active]: this.props.fileMenuOpen
                                })}
                                onMouseUp={this.props.onClickFile}
                            >
                                <FormattedMessage
                                    defaultMessage="File"
                                    description="Text for file dropdown menu"
                                    id="gui.menuBar.file"
                                />
                                <MenuBarMenu
                                    className={classNames(styles.menuBarMenu)}
                                    open={this.props.fileMenuOpen}
                                    place={this.props.isRtl ? 'left' : 'right'}
                                    onRequestClose={this.props.onRequestCloseFile}
                                >
                                    <MenuSection>
                                        <MenuItem
                                            isRtl={this.props.isRtl}
                                            onClick={this.handleClickNew}
                                        >
                                            {newProjectMessage}
                                        </MenuItem>
                                    </MenuSection>
                                    {(this.props.canSave || this.props.canCreateCopy || this.props.canRemix) && (
                                        <MenuSection>
                                            {this.props.canSave && (
                                                <MenuItem onClick={this.handleClickSave}>
                                                    {saveNowMessage}
                                                </MenuItem>
                                            )}
                                            {this.props.canCreateCopy && (
                                                <MenuItem onClick={this.handleClickSaveAsCopy}>
                                                    {createCopyMessage}
                                                </MenuItem>
                                            )}
                                            {this.props.canRemix && (
                                                <MenuItem onClick={this.handleClickRemix}>
                                                    {remixMessage}
                                                </MenuItem>
                                            )}
                                        </MenuSection>
                                    )}
                                    <MenuSection>
                                        <SBFileUploader
                                            canSave={this.props.canSave}
                                            userOwnsProject={this.props.userOwnsProject}
                                        >
                                            {(className, renderFileInput, handleLoadProject) => (
                                                <MenuItem
                                                    className={className}
                                                    onClick={handleLoadProject}
                                                >
                                                    {/* eslint-disable max-len */}
                                                    {this.props.intl.formatMessage(sharedMessages.loadFromComputerTitle)}
                                                    {/* eslint-enable max-len */}
                                                    {renderFileInput()}
                                                </MenuItem>
                                            )}
                                        </SBFileUploader>
                                        <SB3Downloader>{(className, downloadProjectCallback) => (
                                            <MenuItem
                                                className={className}
                                                onClick={this.getSaveToComputerHandler(downloadProjectCallback)}
                                            >
                                                <FormattedMessage
                                                    defaultMessage="Save to your computer"
                                                    description="Menu bar item for downloading a project to your computer" // eslint-disable-line max-len
                                                    id="gui.menuBar.downloadToComputer"
                                                />
                                            </MenuItem>
                                        )}</SB3Downloader>
                                    </MenuSection>
                                </MenuBarMenu>
                            </div>
                        )}
                        <div
                            className={classNames(styles.menuBarItem, styles.hoverable, {
                                [styles.active]: this.props.editMenuOpen
                            })}
                            onMouseUp={this.props.onClickEdit}
                        >
                            <div className={classNames(styles.editMenu)}>
                                <FormattedMessage
                                    defaultMessage="Edit"
                                    description="Text for edit dropdown menu"
                                    id="gui.menuBar.edit"
                                />
                            </div>
                            <MenuBarMenu
                                className={classNames(styles.menuBarMenu)}
                                open={this.props.editMenuOpen}
                                place={this.props.isRtl ? 'left' : 'right'}
                                onRequestClose={this.props.onRequestCloseEdit}
                            >
                                {this.props.isPlayerOnly ? null : (
                                    <DeletionRestorer>{(handleRestore, {restorable, deletedItem}) => (
                                        <MenuItem
                                            className={classNames({[styles.disabled]: !restorable})}
                                            onClick={this.handleRestoreOption(handleRestore)}
                                        >
                                            {this.restoreOptionMessage(deletedItem)}
                                        </MenuItem>
                                    )}</DeletionRestorer>
                                )}
                                <MenuSection>
                                    <TurboMode>{(toggleTurboMode, {turboMode}) => (
                                        <MenuItem onClick={toggleTurboMode}>
                                            {turboMode ? (
                                                <FormattedMessage
                                                    defaultMessage="Turn off Turbo Mode"
                                                    description="Menu bar item for turning off turbo mode"
                                                    id="gui.menuBar.turboModeOff"
                                                />
                                            ) : (
                                                <FormattedMessage
                                                    defaultMessage="Turn on Turbo Mode"
                                                    description="Menu bar item for turning on turbo mode"
                                                    id="gui.menuBar.turboModeOn"
                                                />
                                            )}
                                        </MenuItem>
                                    )}</TurboMode>
                                    <SixtyFPSToggler>{(toggleSixtyFPS, {isSixty}) => (
                                        <MenuItem onClick={toggleSixtyFPS}>
                                            {isSixty ? (
                                                <FormattedMessage
                                                    defaultMessage="Turn off 60 FPS mode"
                                                    description="Menu bar item for turning off 60 FPS mode"
                                                    id="tw.menuBar.60off"
                                                />
                                            ) : (
                                                <FormattedMessage
                                                    defaultMessage="Turn on 60 FPS mode"
                                                    description="Menu bar item for turning on 60 FPS mode"
                                                    id="tw.menuBar.60on"
                                                />
                                            )}
                                        </MenuItem>
                                    )}</SixtyFPSToggler>
                                    <ChangeUsername>{changeUsername => (
                                        <MenuItem onClick={changeUsername}>
                                            <FormattedMessage
                                                defaultMessage="Change Username"
                                                description="Menu bar item for changing the username"
                                                id="tw.menuBar.changeUsername"
                                            />
                                        </MenuItem>
                                    )}</ChangeUsername>
                                    <CloudVariablesToggler>{(toggleCloudVariables, {enabled, canUseCloudVariables}) => (
                                        <MenuItem
                                            className={classNames({[styles.disabled]: !canUseCloudVariables})}
                                            onClick={toggleCloudVariables}
                                        >
                                            {canUseCloudVariables ? (
                                                enabled ? (
                                                    <FormattedMessage
                                                        defaultMessage="Disable Cloud Variables"
                                                        description="Menu bar item for disabling cloud variables"
                                                        id="tw.menuBar.cloudOff"
                                                    />
                                                ) : (
                                                    <FormattedMessage
                                                        defaultMessage="Enable Cloud Variables"
                                                        description="Menu bar item for enabling cloud variables"
                                                        id="tw.menuBar.cloudOn"
                                                    />
                                                )
                                            ) : (
                                                <FormattedMessage
                                                    defaultMessage="Cloud Variables are not Available"
                                                    description="Menu bar item for when cloud variables are not available"
                                                    id="tw.menuBar.cloudUnavailable"
                                                />
                                            )}
                                        </MenuItem>
                                    )}</CloudVariablesToggler>
                                </MenuSection>
                            </MenuBarMenu>
                        </div>
                    </div>
                    <div className={styles.fileGroup}>
                        <div
                            className={classNames(styles.menuBarItem, styles.hoverable, {
                                [styles.active]: this.props.settingsMenuOpen
                            })}
                            onMouseUp={this.props.onClickSettings}
                        >
                            <div className={classNames(styles.settingsMenu)}>
                                <FormattedMessage
                                    defaultMessage="Advanced"
                                    description="Text for advanced settings dropdown menu"
                                    id="tw.menuBar.advanced"
                                />
                            </div>
                            <MenuBarMenu
                                className={classNames(styles.menuBarMenu)}
                                open={this.props.settingsMenuOpen}
                                place={this.props.isRtl ? 'left' : 'right'}
                                onRequestClose={this.props.onRequestCloseSettings}
                            >
                                <MenuSection>
                                    <MenuItemLink href="https://github.com/TurboWarp/scratch-gui/wiki/Advanced-Settings">
                                        <FormattedMessage
                                            defaultMessage="Advanced Settings Help"
                                            description="Menu bar item for advanced settings help"
                                            id="tw.menuBar.advancedHelp"
                                        />
                                    </MenuItemLink>
                                    <HighQualityPen>{(toggleHighQualityPen, {highQualityPen}) => (
                                        <MenuItem onClick={toggleHighQualityPen}>
                                            {highQualityPen ? (
                                                <FormattedMessage
                                                    defaultMessage="Turn off High Quality Pen"
                                                    description="Menu bar item for turning off high quality pen"
                                                    id="tw.menuBar.hqpOff"
                                                />
                                            ) : (
                                                <FormattedMessage
                                                    defaultMessage="Turn on High Quality Pen"
                                                    description="Menu bar item for turning on high quality pen"
                                                    id="tw.menuBar.hqpOn"
                                                />
                                            )}
                                        </MenuItem>
                                    )}</HighQualityPen>
                                    <CompilerOptions>{({toggleEnabled, toggleWarpTimer, compilerOptions}) => (
                                        <React.Fragment>
                                            <MenuItem onClick={toggleEnabled}>
                                                {compilerOptions.enabled ? (
                                                    <FormattedMessage
                                                        defaultMessage="Disable Compiler"
                                                        description="Menu bar item for disabling the compiler"
                                                        id="tw.menuBar.compilerOff"
                                                    />
                                                ) : (
                                                    <FormattedMessage
                                                        defaultMessage="Enable Compiler"
                                                        description="Menu bar item for enabling the compiler"
                                                        id="tw.menuBar.compilerOn"
                                                    />
                                                )}
                                            </MenuItem>
                                            <MenuItem onClick={toggleWarpTimer}>
                                                {compilerOptions.warpTimer ? (
                                                    <FormattedMessage
                                                        defaultMessage="Turn off Warp Timer (Stuck Checking)"
                                                        description="Menu bar item for turning off Warp Timer"
                                                        id="tw.menuBar.warpTimerOff"
                                                    />
                                                ) : (
                                                    <FormattedMessage
                                                        defaultMessage="Turn on Warp Timer (Stuck Checking)"
                                                        description="Menu bar item for turning on Warp Timer"
                                                        id="tw.menuBar.warpTimerOn"
                                                    />
                                                )}
                                            </MenuItem>
                                        </React.Fragment>
                                    )}</CompilerOptions>
                                </MenuSection>
                            </MenuBarMenu>
                        </div>
                        <div
                            className={classNames(styles.menuBarItem, styles.hoverable, {
                                [styles.active]: this.props.helpMenuOpen
                            })}
                            onMouseUp={this.props.onClickHelp}
                        >
                            <div className={classNames(styles.helpMenu)}>
                                <FormattedMessage
                                    defaultMessage="Help"
                                    description="Text for TurboWarp Help dropdown menu"
                                    id="tw.menuBar.help"
                                />
                            </div>
                            <MenuBarMenu
                                className={classNames(styles.menuBarMenu)}
                                open={this.props.helpMenuOpen}
                                place={this.props.isRtl ? 'left' : 'right'}
                                onRequestClose={this.props.onRequestCloseHelp}
                            >
                                <MenuSection>
                                    <MenuItemLink href="https://github.com/TurboWarp">
                                        <FormattedMessage
                                            defaultMessage="Source Code"
                                            description="Menu bar item for source code link"
                                            id="tw.menuBar.code"
                                        />
                                    </MenuItemLink>
                                    <MenuItemLink href="https://scratch.mit.edu/users/GarboMuffin/#comments">
                                        <FormattedMessage
                                            defaultMessage="Feedback & Bugs"
                                            description="Menu bar item for feedback link"
                                            id="tw.menuBar.feedback"
                                        />
                                    </MenuItemLink>
                                    <MenuItemLink href="/privacy.html">
                                        <FormattedMessage
                                            defaultMessage="Privacy"
                                            description="Menu bar item for privacy policy link"
                                            id="tw.menuBar.privacy"
                                        />
                                    </MenuItemLink>
                                    <MenuItemLink href="https://github.com/TurboWarp/scratch-gui/wiki/Embedding">
                                        <FormattedMessage
                                            defaultMessage="Embedding"
                                            description="Menu bar item for embedding link"
                                            id="tw.menuBar.embed"
                                        />
                                    </MenuItemLink>
                                    <MenuItemLink href="https://github.com/TurboWarp/scratch-gui/wiki/URL-Parameters">
                                        <FormattedMessage
                                            defaultMessage="URL Parameters"
                                            description="Menu bar item for URL parameters link"
                                            id="tw.menuBar.parameters"
                                        />
                                    </MenuItemLink>
                                    <MenuItemLink href="https://github.com/TurboWarp/translations/issues/1">
                                        <FormattedMessage
                                            defaultMessage="Help Translate TurboWarp"
                                            description="Menu bar item for translating TurboWarp link"
                                            id="tw.menuBar.translate"
                                        />
                                    </MenuItemLink>
                                </MenuSection>
                            </MenuBarMenu>
                        </div>
                        {/* tw: display compile errors */}
                        {this.props.compileErrors.length > 0 ? (
                            <div className={styles.fileGroup}>
                                <div
                                    className={classNames(styles.menuBarItem, styles.hoverable, {
                                        [styles.active]: this.props.errorsMenuOpen
                                    })}
                                    onMouseUp={this.props.onClickErrors}
                                >
                                    <div className={classNames(styles.errorsMenu)}>
                                        <img src={errorIcon} />
                                    </div>
                                    <MenuBarMenu
                                        className={classNames(styles.menuBarMenu)}
                                        open={this.props.errorsMenuOpen}
                                        place={this.props.isRtl ? 'left' : 'right'}
                                        onRequestClose={this.props.onRequestCloseErrors}
                                    >
                                        <MenuSection>
                                            <MenuItemLink href="https://scratch.mit.edu/users/GarboMuffin/#comments">
                                                <FormattedMessage
                                                    defaultMessage="Some scripts could not be compiled."
                                                    description="Menu bar item for advanced settings help"
                                                    id="tw.menuBar.reportError1"
                                                />
                                            </MenuItemLink>
                                            <MenuItemLink href="https://scratch.mit.edu/users/GarboMuffin/#comments">
                                                <FormattedMessage
                                                    defaultMessage="This is a bug. Please report it."
                                                    description="Menu bar item for advanced settings help"
                                                    id="tw.menuBar.reportError2"
                                                />
                                            </MenuItemLink>
                                        </MenuSection>
                                        <MenuSection>
                                            {this.props.compileErrors.map(({id, sprite, error}) => (
                                                <MenuItem key={id}>
                                                    {this.props.intl.formatMessage(twMessages.compileError, {
                                                        sprite,
                                                        error
                                                    })}
                                                </MenuItem>
                                            ))}
                                        </MenuSection>
                                    </MenuBarMenu>
                                </div>
                            </div>
                        ) : null}
                    </div>
                    <Divider className={classNames(styles.divider)} />
                    {this.props.canEditTitle ? (
                        <div className={classNames(styles.menuBarItem, styles.growable)}>
                            <MenuBarItemTooltip
                                enable
                                id="title-field"
                            >
                                <ProjectTitleInput
                                    className={classNames(styles.titleFieldGrowable)}
                                />
                            </MenuBarItemTooltip>
                        </div>
                    ) : ((this.props.authorUsername && this.props.authorUsername !== this.props.username) ? (
                        <AuthorInfo
                            className={styles.authorInfo}
                            imageUrl={this.props.authorThumbnailUrl}
                            projectId={this.props.projectId}
                            projectTitle={this.props.projectTitle}
                            userId={this.props.authorId}
                            username={this.props.authorUsername}
                        />
                    ) : null)}
                    <div className={classNames(styles.menuBarItem)}>
                        {this.props.canShare ? (
                            (this.props.isShowingProject || this.props.isUpdating) && (
                                <ProjectWatcher onDoneUpdating={this.props.onSeeCommunity}>
                                    {
                                        waitForUpdate => (
                                            <ShareButton
                                                className={styles.menuBarButton}
                                                isShared={this.props.isShared}
                                                /* eslint-disable react/jsx-no-bind */
                                                onClick={() => {
                                                    this.handleClickShare(waitForUpdate);
                                                }}
                                                /* eslint-enable react/jsx-no-bind */
                                            />
                                        )
                                    }
                                </ProjectWatcher>
                            )
                        ) : (
                            this.props.showComingSoon ? (
                                <MenuBarItemTooltip id="share-button">
                                    <ShareButton className={styles.menuBarButton} />
                                </MenuBarItemTooltip>
                            ) : []
                        )}
                        {this.props.canRemix ? remixButton : []}
                    </div>
                    <div className={classNames(styles.menuBarItem, styles.communityButtonWrapper)}>
                        {this.props.enableCommunity ? (
                            (this.props.isShowingProject || this.props.isUpdating) && (
                                <ProjectWatcher onDoneUpdating={this.props.onSeeCommunity}>
                                    {
                                        waitForUpdate => (
                                            <CommunityButton
                                                className={styles.menuBarButton}
                                                /* eslint-disable react/jsx-no-bind */
                                                onClick={() => {
                                                    this.handleClickSeeCommunity(waitForUpdate);
                                                }}
                                                /* eslint-enable react/jsx-no-bind */
                                            />
                                        )
                                    }
                                </ProjectWatcher>
                            )
                        ) : (this.props.showComingSoon ? (
                            <MenuBarItemTooltip id="community-button">
                                <CommunityButton className={styles.menuBarButton} />
                            </MenuBarItemTooltip>
                        ) : (this.props.enableSeeInside ? (
                            <SeeInsideButton
                                className={styles.menuBarButton}
                                onClick={this.handleClickSeeInside}
                            />
                        ) : []))}
                    </div>
                    {/* tw: add a feedback button */}
                    <div className={styles.menuBarItem}>
                        <a
                            className={styles.feedbackLink}
                            href="https://scratch.mit.edu/users/GarboMuffin/#comments"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            {/* todo: icon */}
                            <Button className={styles.feedbackButton}>
                                <FormattedMessage
                                    defaultMessage="TurboWarp Feedback"
                                    description="Text for the giving feedback button"
                                    id="tw.feedback"
                                />
                            </Button>
                        </a>
                    </div>
                </div>

                <div className={styles.accountInfoGroup}>
                    <div className={styles.menuBarItem}>
                        <TWSaveStatus />
                    </div>
                </div>

                {aboutButton}
            </Box>
        );
    }
}

MenuBar.propTypes = {
    enableSeeInside: PropTypes.bool,
    onClickSeeInside: PropTypes.func,
    accountMenuOpen: PropTypes.bool,
    authorId: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    authorThumbnailUrl: PropTypes.string,
    authorUsername: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    autoUpdateProject: PropTypes.func,
    canChangeLanguage: PropTypes.bool,
    canCreateCopy: PropTypes.bool,
    canCreateNew: PropTypes.bool,
    canEditTitle: PropTypes.bool,
    canManageFiles: PropTypes.bool,
    canRemix: PropTypes.bool,
    canSave: PropTypes.bool,
    canShare: PropTypes.bool,
    className: PropTypes.string,
    compileErrors: PropTypes.arrayOf(PropTypes.shape({
        sprite: PropTypes.string,
        error: PropTypes.string,
        id: PropTypes.number
    })),
    confirmReadyToReplaceProject: PropTypes.func,
    editMenuOpen: PropTypes.bool,
    enableCommunity: PropTypes.bool,
    fileMenuOpen: PropTypes.bool,
    intl: intlShape,
    isPlayerOnly: PropTypes.bool,
    isRtl: PropTypes.bool,
    isShared: PropTypes.bool,
    isShowingProject: PropTypes.bool,
    isUpdating: PropTypes.bool,
    languageMenuOpen: PropTypes.bool,
    locale: PropTypes.string.isRequired,
    loginMenuOpen: PropTypes.bool,
    logo: PropTypes.string,
    onClickAbout: PropTypes.func,
    onClickAccount: PropTypes.func,
    onClickEdit: PropTypes.func,
    onClickFile: PropTypes.func,
    onClickLanguage: PropTypes.func,
    onClickLogin: PropTypes.func,
    onClickLogo: PropTypes.func,
    onClickNew: PropTypes.func,
    onClickRemix: PropTypes.func,
    onClickSave: PropTypes.func,
    onClickSaveAsCopy: PropTypes.func,
    onClickSettings: PropTypes.func,
    onRequestCloseSettings: PropTypes.func,
    onClickHelp: PropTypes.func,
    onRequestCloseHelp: PropTypes.func,
    onClickErrors: PropTypes.func,
    onRequestCloseErrors: PropTypes.func,
    onLogOut: PropTypes.func,
    onOpenRegistration: PropTypes.func,
    onOpenTipLibrary: PropTypes.func,
    onProjectTelemetryEvent: PropTypes.func,
    onRequestCloseAccount: PropTypes.func,
    onRequestCloseEdit: PropTypes.func,
    onRequestCloseFile: PropTypes.func,
    onRequestCloseLanguage: PropTypes.func,
    onRequestCloseLogin: PropTypes.func,
    onSeeCommunity: PropTypes.func,
    onShare: PropTypes.func,
    onToggleLoginOpen: PropTypes.func,
    projectId: PropTypes.string,
    projectTitle: PropTypes.string,
    renderLogin: PropTypes.func,
    sessionExists: PropTypes.bool,
    settingsMenuOpen: PropTypes.bool,
    helpMenuOpen: PropTypes.bool,
    errorsMenuOpen: PropTypes.bool,
    shouldSaveBeforeTransition: PropTypes.func,
    showComingSoon: PropTypes.bool,
    userOwnsProject: PropTypes.bool,
    username: PropTypes.string,
    vm: PropTypes.instanceOf(VM).isRequired
};

MenuBar.defaultProps = {
    logo: scratchLogo,
    onShare: () => {}
};

const mapStateToProps = (state, ownProps) => {
    const loadingState = state.scratchGui.projectState.loadingState;
    const user = state.session && state.session.session && state.session.session.user;
    return {
        accountMenuOpen: accountMenuOpen(state),
        authorThumbnailUrl: state.scratchGui.tw.author.thumbnail,
        authorUsername: state.scratchGui.tw.author.username,
        compileErrors: state.scratchGui.tw.compileErrors,
        fileMenuOpen: fileMenuOpen(state),
        editMenuOpen: editMenuOpen(state),
        isPlayerOnly: state.scratchGui.mode.isPlayerOnly,
        isRtl: state.locales.isRtl,
        isUpdating: getIsUpdating(loadingState),
        isShowingProject: getIsShowingProject(loadingState),
        languageMenuOpen: languageMenuOpen(state),
        locale: state.locales.locale,
        loginMenuOpen: loginMenuOpen(state),
        projectId: state.scratchGui.projectState.projectId,
        projectTitle: state.scratchGui.projectTitle,
        sessionExists: state.session && typeof state.session.session !== 'undefined',
        settingsMenuOpen: settingsMenuOpen(state),
        helpMenuOpen: helpMenuOpen(state),
        errorsMenuOpen: errorsMenuOpen(state),
        username: user ? user.username : null,
        userOwnsProject: ownProps.authorUsername && user &&
            (ownProps.authorUsername === user.username),
        vm: state.scratchGui.vm
    };
};

const mapDispatchToProps = dispatch => ({
    onClickSeeInside: () => dispatch(setPlayer(false)),
    autoUpdateProject: () => dispatch(autoUpdateProject()),
    onOpenTipLibrary: () => dispatch(openTipsLibrary()),
    onClickAccount: () => dispatch(openAccountMenu()),
    onRequestCloseAccount: () => dispatch(closeAccountMenu()),
    onClickFile: () => dispatch(openFileMenu()),
    onRequestCloseFile: () => dispatch(closeFileMenu()),
    onClickEdit: () => dispatch(openEditMenu()),
    onRequestCloseEdit: () => dispatch(closeEditMenu()),
    onClickLanguage: () => dispatch(openLanguageMenu()),
    onRequestCloseLanguage: () => dispatch(closeLanguageMenu()),
    onClickLogin: () => dispatch(openLoginMenu()),
    onRequestCloseLogin: () => dispatch(closeLoginMenu()),
    onClickSettings: () => dispatch(openSettingsMenu()),
    onRequestCloseSettings: () => dispatch(closeSettingMenu()),
    onClickHelp: () => dispatch(openHelpMenu()),
    onRequestCloseHelp: () => dispatch(closeHelpMenu()),
    onClickErrors: () => dispatch(openErrorsMenu()),
    onRequestCloseErrors: () => dispatch(closeErrorsMenu()),
    onClickNew: needSave => dispatch(requestNewProject(needSave)),
    onClickRemix: () => dispatch(remixProject()),
    onClickSave: () => dispatch(manualUpdateProject()),
    onClickSaveAsCopy: () => dispatch(saveProjectAsCopy()),
    onSeeCommunity: () => dispatch(setPlayer(true))
});

export default compose(
    injectIntl,
    MenuBarHOC,
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(MenuBar);
