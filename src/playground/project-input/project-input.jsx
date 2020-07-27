import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import bindAll from 'lodash.bindall';

import styles from './project-input.css';

class ProjectInput extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'onKeyDown',
        ]);
    }
    componentDidMount () {
        this.input.focus();
        this.input.selectionStart = this.input.value.length;
    }
    loadProject (projectId) {
        location.hash = projectId;
        this.input.blur();
    }
    onKeyDown (e) {
        const value = e.target.value;
        const numberMatch = value.match(/\d+/);
        const projectId = numberMatch ? numberMatch[0] : '';
        if (e.key === 'Enter') {
            this.loadProject(projectId);
        } else {
            this.input.value = `https://scratch.mit.edu/projects/${projectId}`;
        }
    }
    render () {
        return <input
            ref={elem => this.input = elem}
            type="text"
            defaultValue={"https://scratch.mit.edu/projects/"}
            autoFocus
            className={classNames(styles.input)}
            onKeyDown={this.onKeyDown}
        ></input>
    }
}

ProjectInput.propTypes = {
    projectId: PropTypes.string,
    onChangeProject: PropTypes.func,
};

export default connect(
    () => ({}),
    () => ({})
)(ProjectInput);
