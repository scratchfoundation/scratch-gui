/**
 * @license
 * Copyright (c) 2021 Thomas Weber
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {FormattedMessage, defineMessages, injectIntl, intlShape} from 'react-intl';
import DOMElementRenderer from '../containers/dom-element-renderer.jsx';
import AppStateHOC from '../lib/app-state-hoc.jsx';
import ErrorBoundaryHOC from '../lib/error-boundary-hoc.jsx';
import TWProjectMetaFetcherHOC from '../lib/tw-project-meta-fetcher-hoc.jsx';
import TWEditorWarningHOC from '../lib/tw-editor-warning-hoc.jsx';
import TWStateManagerHOC from '../lib/tw-state-manager-hoc.jsx';
import TWThemeHOC from '../lib/tw-theme-hoc.jsx';
import SBFileUploaderHOC from '../lib/sb-file-uploader-hoc.jsx';
import SettingsStore from '../addons/settings-store';
import twStageSize from '../lib/tw-stage-size';

import GUI from './render-gui.jsx';
import MenuBar from '../components/menu-bar/menu-bar.jsx';
import ProjectInput from '../components/tw-project-input/project-input.jsx';
import FeaturedProjects from '../components/tw-featured-projects/featured-projects.jsx';
import Description from '../components/tw-description/description.jsx';
import WebGlModal from '../containers/webgl-modal.jsx';
import TWEvalModal from '../components/webgl-modal/tw-eval-modal.jsx';
import {isRendererSupported, isEvalSupported} from '../lib/tw-environment-support-prober';

import styles from './interface.css';

if (window.parent !== window) {
    alert('This page is embedding TurboWarp in a way that is unsupported and will cease to function in the near future. Please read https://github.com/TurboWarp/scratch-gui/wiki/Embedding');
}

let announcement = null;
if (process.env.ANNOUNCEMENT) {
    announcement = document.createElement('p');
    // This is safe because process.env.ANNOUNCEMENT is set at build time.
    announcement.innerHTML = process.env.ANNOUNCEMENT;
}

window.addEventListener('message', e => {
    if (e.origin !== location.origin) {
        return;
    }
    const data = e.data;
    if (data.type === 'reload') {
        location.reload();
    }
    if (data.type === 'settings-changed') {
        SettingsStore.setStore(data.store);
    }
});

const handleClickAddonSettings = () => {
    const path = process.env.ROUTING_STYLE === 'wildcard' ? 'addons' : 'addons.html';
    window.open(`${process.env.ROOT}${path}`);
};

const messages = defineMessages({
    defaultTitle: {
        defaultMessage: 'Run Scratch projects faster',
        description: 'Title of homepage',
        id: 'tw.guiDefaultTitle'
    }
});

const WrappedMenuBar = compose(
    SBFileUploaderHOC
)(MenuBar);

import(/* webpackChunkName: "addons" */ '../addons/entry');

class Interface extends React.Component {
    constructor (props) {
        super(props);
        this.handleUpdateProjectTitle = this.handleUpdateProjectTitle.bind(this);
    }
    handleUpdateProjectTitle (title, isDefault) {
        if (isDefault || !title) {
            document.title = `TurboWarp - ${this.props.intl.formatMessage(messages.defaultTitle)}`;
        } else {
            document.title = `${title} - TurboWarp`;
        }
    }
    render () {
        const {
            description,
            isFullScreen,
            isPlayerOnly,
            isRtl,
            onClickTheme
        } = this.props;
        const isHomepage = isPlayerOnly && !isFullScreen;
        return (
            <div className={classNames(styles.container, isHomepage ? styles.playerOnly : styles.editor)}>
                {isHomepage ? (
                    <div className={styles.menu}>
                        <WrappedMenuBar
                            canChangeLanguage
                            canManageFiles
                            enableSeeInside
                            onClickAddonSettings={handleClickAddonSettings}
                            onClickTheme={onClickTheme}
                        />
                    </div>
                ) : null}
                <div
                    className={styles.center}
                    style={isPlayerOnly ? ({
                        // add a couple pixels to account for border (TODO: remove weird hack)
                        width: `${twStageSize.width + 2}px`
                    }) : null}
                >
                    {isHomepage && announcement ? <DOMElementRenderer domElement={announcement} /> : null}
                    <GUI
                        onClickAddonSettings={handleClickAddonSettings}
                        onClickTheme={onClickTheme}
                        onUpdateProjectTitle={this.handleUpdateProjectTitle}
                        backpackVisible
                        backpackHost="_local_"
                    />
                    {isHomepage ? (
                        <React.Fragment>
                            {isRendererSupported() ? null : (
                                <WebGlModal isRtl={isRtl} />
                            )}
                            {isEvalSupported() ? null : (
                                <TWEvalModal isRtl={isRtl} />
                            )}
                            <div className={styles.section}>
                                <ProjectInput />
                            </div>
                            {description.instructions || description.credits ? (
                                <div className={styles.section}>
                                    <Description
                                        instructions={description.instructions}
                                        credits={description.credits}
                                    />
                                </div>
                            ) : null}
                            <div className={styles.section}>
                                <p>
                                    <FormattedMessage
                                        defaultMessage="TurboWarp is a Scratch mod that compiles projects to JavaScript to make them run really fast. Try it out by inputting a project ID or URL above or choosing a featured project below."
                                        description="Description of TurboWarp"
                                        id="tw.home.description"
                                    />
                                </p>
                            </div>
                            <div className={styles.section}>
                                <FeaturedProjects studio="27205657" />
                            </div>
                        </React.Fragment>
                    ) : null}
                </div>
                {isHomepage && <footer className={styles.footer}>
                    <div className={styles.footerContent}>
                        <div className={styles.footerText}>
                            <FormattedMessage
                                defaultMessage="TurboWarp is not affiliated with Scratch, the Scratch Team, or the Scratch Foundation."
                                description="Disclaimer that TurboWarp is not connected to Scratch"
                                id="tw.footer.disclaimer"
                            />
                        </div>
                        <div className={styles.footerColumns}>
                            <div>
                                <div className={styles.footerHeader}>
                                    <FormattedMessage
                                        defaultMessage="Credits"
                                        description="Credits link in footer"
                                        id="tw.footer.credits"
                                    />
                                </div>
                                <div>
                                    <a href="https://fosshost.org/">
                                        <FormattedMessage
                                            defaultMessage="Hosted by Fosshost"
                                            description="Fosshost link in footer"
                                            id="tw.footer.fosshost"
                                        />
                                    </a>
                                </div>
                                <div>
                                    <a href="credits.html">
                                        <FormattedMessage
                                            defaultMessage="Credits"
                                            description="Credits link in footer"
                                            id="tw.footer.credits"
                                        />
                                    </a>
                                </div>
                            </div>
                            <div>
                                <div className={styles.footerHeader}>
                                    <FormattedMessage
                                        defaultMessage="Links"
                                        description="Title of links section of footer"
                                        id="tw.footer.links"
                                    />
                                </div>
                                <div>
                                    <a href="https://desktop.turbowarp.org/">
                                        {/* Do not translate */}
                                        {'TurboWarp Desktop'}
                                    </a>
                                </div>
                                <div>
                                    <a href="https://packager.turbowarp.org/">
                                        {/* Do not translate */}
                                        {'TurboWarp Packager'}
                                    </a>
                                </div>
                                <div>
                                    <a href="https://github.com/TurboWarp/scratch-gui/wiki/Embedding">
                                        <FormattedMessage
                                            defaultMessage="Embedding"
                                            description="Menu bar item for embedding link"
                                            id="tw.menuBar.embed"
                                        />
                                    </a>
                                </div>
                            </div>
                            <div>
                                <div className={styles.footerHeader}>
                                    <FormattedMessage
                                        defaultMessage="About"
                                        description="Title of about section of footer"
                                        id="tw.footer.about"
                                    />
                                </div>
                                <div>
                                    <a href="https://scratch.mit.edu/users/GarboMuffin/#comments">
                                        <FormattedMessage
                                            defaultMessage="Feedback & Bugs"
                                            description="Link to feedback/bugs page"
                                            id="tw.feedback"
                                        />
                                    </a>
                                </div>
                                <div>
                                    <a href="https://github.com/TurboWarp/">
                                        <FormattedMessage
                                            defaultMessage="Source Code"
                                            description="Link to source code"
                                            id="tw.code"
                                        />
                                    </a>
                                </div>
                                <div>
                                    <a href="privacy.html">
                                        <FormattedMessage
                                            defaultMessage="Privacy Policy"
                                            description="Link to privacy policy"
                                            id="tw.privacy"
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>}
            </div>
        );
    }
}

Interface.propTypes = {
    intl: intlShape,
    description: PropTypes.shape({
        credits: PropTypes.string,
        instructions: PropTypes.string
    }),
    isFullScreen: PropTypes.bool,
    isRtl: PropTypes.bool,
    isPlayerOnly: PropTypes.bool,
    onClickTheme: PropTypes.func
};

const mapStateToProps = state => ({
    description: state.scratchGui.tw.description,
    isFullScreen: state.scratchGui.mode.isFullScreen,
    isPlayerOnly: state.scratchGui.mode.isPlayerOnly,
    isRtl: state.locales.isRtl
});

const mapDispatchToProps = () => ({});

const ConnectedInterface = injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(Interface));

const WrappedInterface = compose(
    AppStateHOC,
    ErrorBoundaryHOC('TW Interface'),
    TWProjectMetaFetcherHOC,
    TWEditorWarningHOC,
    TWStateManagerHOC,
    TWThemeHOC
)(ConnectedInterface);

export default WrappedInterface;
