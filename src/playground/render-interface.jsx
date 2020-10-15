import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {FormattedMessage} from 'react-intl';
import AppStateHOC from '../lib/app-state-hoc.jsx';
import TWParserHOC from '../lib/tw-parser-hoc.jsx';
import TWProjectMetaFetcherHOC from '../lib/tw-project-meta-fetcher-hoc.jsx';
import TWEditorWarningHOC from '../lib/tw-editor-warning-hoc.jsx';
import TWStateManagerHOC from '../lib/tw-state-manager-hoc.jsx';

import GUI from './render-gui.jsx';
import MenuBar from '../components/menu-bar/menu-bar.jsx';
import ProjectInput from '../components/tw-project-input/project-input.jsx';
import About from '../components/tw-home/about.jsx';
import Title from '../components/tw-home/title.jsx';
import Examples from '../components/tw-examples/examples.jsx';

import styles from './interface.css';

if (window !== window.parent) {
    // Show a warning when trying to embed this page. Users shouldn't do that.
    // eslint-disable-next-line no-alert
    alert('You are embedding TurboWarp incorrectly.\n\nGo here for instructions: https://github.com/TurboWarp/scratch-gui/wiki/Embedding');
}

const Interface = ({isPlayerOnly}) => (
    <div className={classNames(isPlayerOnly ? styles.stageOnly : styles.editor)}>
        {isPlayerOnly ? (
            <MenuBar
                canManageFiles
                canChangeLanguage
                enableSeeInside
            />
        ) : null}
        <div className={styles.center}>
            {isPlayerOnly ? (
                <Title />
            ) : null}
            <GUI
                isPlayerOnly={isPlayerOnly}
            />
            {isPlayerOnly ? (
                <div className="about">
                    <ProjectInput />
                    <About />
                    <Examples />
                    <footer className={styles.footer}>
                        <p>
                            <FormattedMessage
                                defaultMessage="Projects from the Scratch website are licensed under the Creative Commons Attribution-ShareAlike 2.0 license. TurboWarp is not affiliated with Scratch, the Scratch Team, or the Scratch Foundation."
                                description="Disclaimer that TurboWarp is not connected to Scratch and licensing information"
                                id="tw.footer.disclaimer"
                            />
                        </p>
                        <p>
                            <FormattedMessage
                                defaultMessage="TurboWarp is hosted by {fosshost}."
                                description="Host credit"
                                id="tw.footer.host"
                                values={{
                                    fosshost: (
                                        <a
                                            href="https://fosshost.org"
                                            // _blank is safe here because of noopener
                                            // eslint-disable-next-line react/jsx-no-target-blank
                                            target="_blank"
                                            rel="noopener"
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
                    </footer>
                </div>
            ) : null}
        </div>
    </div>
);

Interface.propTypes = {
    isPlayerOnly: PropTypes.bool
};

const mapStateToProps = state => ({
    isPlayerOnly: state.scratchGui.mode.isPlayerOnly
});

const mapDispatchToProps = dispatch => ({

});

const ConnectedInterface = connect(
    mapStateToProps,
    mapDispatchToProps
)(Interface);

const WrappedInterface = compose(
    AppStateHOC,
    TWParserHOC,
    TWProjectMetaFetcherHOC,
    TWEditorWarningHOC,
    TWStateManagerHOC
)(ConnectedInterface);

export default WrappedInterface;
