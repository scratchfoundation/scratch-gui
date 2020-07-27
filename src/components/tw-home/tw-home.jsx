import React from 'react';
import {FormattedMessage} from 'react-intl';
import bindAll from 'lodash.bindall';

import styles from './tw-home.css';

import ProjectInput from '../../playground/project-input/project-input.jsx';
import About from './about/about.jsx';
import Title from './title/title.jsx';

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
                <div className={styles.inner}>
                    <Title />
                    <About />
                    <ProjectInput />
                    <button
                        className={styles.newProject}
                        onClick={this.clickClose}
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
