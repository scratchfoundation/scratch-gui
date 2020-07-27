import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import debounce from 'lodash.debounce';

import styles from './project-input.css';

const loadProject = debounce((id) => {
    location.hash = id;
}, 500);

const onInputChange = (e) => {
    const value = e.target.value;
    const numberMatch = value.match(/\d+/);
    const projectId = numberMatch ? numberMatch[0] : '';
    e.target.value = `https://scratch.mit.edu/projects/${projectId}`;
    loadProject(numberMatch);
};

class ProjectInput extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.input.focus();
        this.input.selectionStart = this.input.value.length;
    }
    render () {
        const {
            projectId,
            ...props
        } = this.props;
        return <input
            ref={elem => this.input = elem}
            type="text"
            defaultValue="https://scratch.mit.edu/projects/"
            autoFocus
            className={classNames(styles.input)}
            onChange={onInputChange}
        ></input>
    }
}

ProjectInput.propTypes = {
    projectId: PropTypes.string,
};

const mapStateToProps = state => ({
    projectId: state.scratchGui.projectState.projectId
});

const mapDispatchToProps = dispatch => ({
    
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectInput);
