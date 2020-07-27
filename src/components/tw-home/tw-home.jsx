import React from 'react';
import {FormattedMessage} from 'react-intl';
import bindAll from 'lodash.bindall';

import styles from './tw-home.css';

import ProjectInput from '../../playground/project-input/project-input.jsx';

class Home extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'clickClose'
        ]);
        this.state = { closed: false };
    }
    clickClose () {
        this.setState({ closed: true });
    }
    render () {
        if (this.state.closed) {
            return <div></div>
        }
        return (
            <div className={styles.overlay}>
                <a
                    className={styles.close}
                    onClick={this.clickClose}
                >&times;</a>
                <div className={styles.body}>
                    <div className={styles.title}>
                        <h1>TurboWarp</h1>
                        <span className={styles.subtitles}>
                            <div>
                                <FormattedMessage
                                    defaultMessage="Unofficial Scratch Mod"
                                    description="Text for explaining this is an unofficial mod of scratch on the home page"
                                    id="tw.home.mod"
                                />
                            </div>
                            <div>
                                <a href="https://github.com/TurboWarp/">
                                    <FormattedMessage
                                        defaultMessage="Source Code"
                                        description="Text for source code link on the home page"
                                        id="tw.home.code"
                                    />
                                </a>
                            </div>
                        </span>
                    </div>
                    <p>
                        <FormattedMessage
                            defaultMessage="TurboWarp compiles your Scratch projects to JavaScript to make them run faster. Try it out by inputting a project ID or URL below and pressing enter. Visit {studioLink} for some examples"
                            description="Description of TurboWarp"
                            id="tw.home.description"
                            values={{
                                studioLink: (
                                    <a href="https://scratch.mit.edu/studios/27205657/">
                                        <FormattedMessage
                                            defaultMessage="this studio"
                                            description="link to turbowarp examples studio"
                                            id="tw.home.description.studioLink"
                                        />
                                    </a>
                                )
                            }}
                        />
                    </p>
                    <ProjectInput></ProjectInput>
                    <div
                        className={styles.newProject}
                        onClick={this.clickClose}
                    >
                        <a>
                            <FormattedMessage
                                defaultMessage="or do you want to create a new project?"
                                description="Option to create a new project instead of load an existing one on homepage"
                                id="tw.home.new"
                            />
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
