import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {FormattedMessage} from 'react-intl';
import DOMElementRenderer from '../containers/dom-element-renderer.jsx';
import AppStateHOC from '../lib/app-state-hoc.jsx';
import TWProjectMetaFetcherHOC from '../lib/tw-project-meta-fetcher-hoc.jsx';
import TWEditorWarningHOC from '../lib/tw-editor-warning-hoc.jsx';
import TWStateManagerHOC from '../lib/tw-state-manager-hoc.jsx';
import TWDarkModeHOC from '../lib/tw-dark-mode-hoc.jsx';
import SBFileUploaderHOC from '../lib/sb-file-uploader-hoc.jsx';
import SettingsStore from '../addons/settings-store';

import GUI from './render-gui.jsx';
import MenuBar from '../components/menu-bar/menu-bar.jsx';
import ProjectInput from '../components/tw-project-input/project-input.jsx';
import FeaturedProjects from '../components/tw-featured-projects/featured-projects.jsx';
import Description from '../components/tw-description/description.jsx';

import styles from './interface.css';

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
        SettingsStore.store = data.store;
        SettingsStore.dispatchEvent(new CustomEvent('reread'));
    }
});

const handleClickAddonSettings = () => {
    window.open(`${process.env.ROOT}addons.html`);
};

const handleLoadAddons = () => {
    import(/* webpackChunkName: "addons" */ '../addons/entry-web');
};

const WrappedMenuBar = compose(
    SBFileUploaderHOC
)(MenuBar);

const Interface = ({
    description,
    isFullScreen,
    isPlayerOnly
}) => {
    const isHomepage = isPlayerOnly && !isFullScreen;
    return (
        <div className={classNames(styles.container, isHomepage ? styles.playerOnly : styles.editor)}>
            {isHomepage ? (
                <div className={styles.menu}>
                    <WrappedMenuBar
                        canManageFiles
                        canChangeLanguage
                        enableSeeInside
                    />
                </div>
            ) : null}
            <div className={styles.center}>
                {isHomepage && announcement ? <DOMElementRenderer domElement={announcement} /> : null}
                <GUI
                    onClickAddonSettings={handleClickAddonSettings}
                    onLoadAddons={handleLoadAddons}
                />
                {isHomepage ? (
                    <React.Fragment>
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
                        <footer className={classNames(styles.section, styles.footer)}>
                            <p>
                                <FormattedMessage
                                    defaultMessage="Projects from the Scratch website are licensed under the {ccbysa2}. TurboWarp is not affiliated with Scratch, the Scratch Team, or the Scratch Foundation."
                                    description="Disclaimer that TurboWarp is not connected to Scratch and licensing information"
                                    id="tw.footer.disclaimer"
                                    values={{
                                        ccbysa2: (
                                            <a
                                                href="https://creativecommons.org/licenses/by-sa/2.0/"
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                <FormattedMessage
                                                    defaultMessage="Creative Commons Attribution-ShareAlike 2.0 license"
                                                    description="Name of the license used by Scratch projects, CC BY-SA 2.0."
                                                    id="tw.footer.disclaimer.ccbysa2"
                                                />
                                            </a>
                                        )
                                    }}
                                />
                            </p>
                            <p>
                                <FormattedMessage
                                    defaultMessage="Hosting for TurboWarp is provided by {fosshost}."
                                    description="Host credit"
                                    id="tw.footer.host"
                                    values={{
                                        fosshost: (
                                            <a
                                                href="https://fosshost.org"
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                <FormattedMessage
                                                    defaultMessage="fosshost.org"
                                                    description="Link to fosshost.org"
                                                    id="tw.footer.host.fosshost"
                                                />
                                            </a>
                                        )
                                    }}
                                />
                            </p>
                            <p className={styles.links}>
                                <a
                                    href="https://github.com/TurboWarp"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <FormattedMessage
                                        defaultMessage="Source Code"
                                        description="Link to source code"
                                        id="tw.code"
                                    />
                                </a>
                                {' - '}
                                <a
                                    href="https://scratch.mit.edu/users/GarboMuffin/#comments"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <FormattedMessage
                                        defaultMessage="Feedback & Bugs"
                                        description="Link to feedback/bugs page"
                                        id="tw.feedback"
                                    />
                                </a>
                                {' - '}
                                <a
                                    href="privacy.html"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <FormattedMessage
                                        defaultMessage="Privacy"
                                        description="Link to privacy policy"
                                        id="tw.privacy"
                                    />
                                </a>
                            </p>
                        </footer>
                    </React.Fragment>
                ) : null}
            </div>
        </div>
    );
};

Interface.propTypes = {
    description: PropTypes.shape({
        credits: PropTypes.string,
        instructions: PropTypes.string
    }),
    isFullScreen: PropTypes.bool,
    isPlayerOnly: PropTypes.bool
};

const mapStateToProps = state => ({
    description: state.scratchGui.tw.description,
    isFullScreen: state.scratchGui.mode.isFullScreen,
    isPlayerOnly: state.scratchGui.mode.isPlayerOnly
});

const mapDispatchToProps = () => ({});

const ConnectedInterface = connect(
    mapStateToProps,
    mapDispatchToProps
)(Interface);

const WrappedInterface = compose(
    AppStateHOC,
    TWProjectMetaFetcherHOC,
    TWEditorWarningHOC,
    TWStateManagerHOC,
    TWDarkModeHOC
)(ConnectedInterface);

export default WrappedInterface;
