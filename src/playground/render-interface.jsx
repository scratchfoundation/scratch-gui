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
import TWFullscreenResizerHOC from '../lib/tw-fullscreen-resizer-hoc.jsx';

import GUI from './render-gui.jsx';
import MenuBar from '../components/menu-bar/menu-bar.jsx';
import ProjectInput from '../components/tw-project-input/project-input.jsx';
import Examples from '../components/tw-examples/examples.jsx';
import Description from '../components/tw-description/description.jsx';

import styles from './interface.css';

if (window !== window.parent) {
    // Show a warning when trying to embed this page. Users shouldn't do that.
    // eslint-disable-next-line no-alert
    alert('You are embedding TurboWarp incorrectly.\n\nGo here for instructions: https://github.com/TurboWarp/scratch-gui/wiki/Embedding');
}

let announcement = null;
if (process.env.ANNOUNCEMENT) {
    announcement = document.createElement('p');
    // This is safe because process.env.ANNOUNCEMENT is set at build time.
    announcement.innerHTML = process.env.ANNOUNCEMENT;
}

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
                    <MenuBar
                        canManageFiles
                        canChangeLanguage
                        enableSeeInside
                    />
                </div>
            ) : null}
            <div className={styles.center}>
                {announcement ? <DOMElementRenderer domElement={announcement} /> : null}
                <GUI />
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
                                    defaultMessage="TurboWarp is a Scratch mod that compiles projects to JavaScript to make them run really fast. Try it out by inputting a project ID or URL above or choosing an example project below."
                                    description="Description of TurboWarp"
                                    id="tw.home.description"
                                />
                            </p>
                        </div>
                        <div className={styles.section}>
                            <Examples />
                        </div>
                        <footer className={classNames(styles.section, styles.footer)}>
                            <p>
                                <FormattedMessage
                                    defaultMessage="Projects from the Scratch website are licensed under the Creative Commons Attribution-ShareAlike 2.0 license. TurboWarp is not affiliated with Scratch, the Scratch Team, or the Scratch Foundation."
                                    description="Disclaimer that TurboWarp is not connected to Scratch and licensing information"
                                    id="tw.footer.disclaimer"
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
                                        description="Link to footer to source code"
                                        id="tw.footer.source"
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
                                        description="Link in footer to give feedback"
                                        id="tw.footer.feedback"
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
                                        description="Link in footer to privacy policy"
                                        id="tw.footer.privacy"
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
    TWFullscreenResizerHOC
)(ConnectedInterface);

export default WrappedInterface;
