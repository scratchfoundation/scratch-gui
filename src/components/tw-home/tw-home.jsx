import React from 'react';
import {FormattedMessage} from 'react-intl';
import bindAll from 'lodash.bindall';

import styles from './tw-home.css';

import ProjectInput from '../tw-project-input/project-input.jsx';
import About from './about.jsx';
import Title from './title.jsx';
import Examples from '../tw-examples/examples.jsx';

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
                    <Examples
                        responsive
                    />
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
