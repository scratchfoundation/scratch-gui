import React from 'react';
import {FormattedMessage} from 'react-intl';
import bindAll from 'lodash.bindall';

import styles from './tw-home.css';

import ProjectInput from '../tw-project-input/project-input.jsx';
import About from './about.jsx';
import Title from './title.jsx';

class Home extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleClickClose'
        ]);
        this.state = {
            closed: false
        };
    }
    handleClickClose () {
        this.setState({
            closed: true
        });
    }
    render () {
        if (this.state.closed) {
            return <div />;
        }
        return (
            <div className={styles.overlay}>
                <a
                    className={styles.close}
                    onClick={this.handleClickClose}
                >
                    &times;
                </a>
                <div className={styles.inner}>
                    <Title />
                    <About />
                    <p>
                        <b>
                            <FormattedMessage
                                defaultMessage="Note: In contrast to Scratch, scripts may not update in realtime as they are changed. You may have to restart scripts for changes to be applied."
                                description="Warning about script restarting in the editor"
                                id="tw.home.editorNote"
                            />
                        </b>
                    </p>
                    <ProjectInput />
                    <button
                        className={styles.newProject}
                        onClick={this.handleClickClose}
                    >
                        <FormattedMessage
                            defaultMessage="I want to make a new project"
                            description="Option to create a new project instead of load an existing one on homepage"
                            id="tw.home.new"
                        />
                    </button>
                </div>
            </div>
        );
    }
}

export default Home;
