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
                    {/* TODO: we have to make this translatable */}
                    <h1>TurboWarp</h1>
                    <p>TurboWarp compiles your Scratch projects to JavaScript to make them run faster. Try it out by inputting a project ID or URL below and pressing enter. Visit <a href="https://scratch.mit.edu/studios/27205657/">this studio</a> for some examples.</p>
                    <ProjectInput></ProjectInput>
                    <div
                        className={styles.newProject}
                        onClick={this.clickClose}
                    >
                        <a>or do you want to create a new project?</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
