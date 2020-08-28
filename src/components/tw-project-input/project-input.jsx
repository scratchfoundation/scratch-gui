import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import bindAll from 'lodash.bindall';

import {defaultProjectId, setProjectId} from '../../reducers/project-state';
import styles from './project-input.css';

class ProjectInput extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleKeyDown',
            'handleChange',
            'handlePaste',
            'handleBlur',
            'handleFocus'
        ]);
        this.state = {
            projectId: ''
        };
    }
    componentDidMount () {
        this.input.focus();
        this.input.selectionStart = this.input.value.length;
    }
    componentDidUpdate (prevProps) {
        if (this.props.projectId !== prevProps.projectId) {
            this.setState({
                projectId: this.props.projectId || ''
            });
        }
    }
    extractProjectId (text) {
        const numberMatch = text.match(/\d+/);
        return numberMatch ? numberMatch[0] : null;
    }
    readProjectId (e) {
        const id = this.extractProjectId(e.target.value);
        return id || defaultProjectId;
    }
    handleKeyDown (e) {
        if (e.key === 'Enter' && this.state.projectId) {
            this.props.setProjectId(this.state.projectId);
            this.input.blur();
        }
    }
    handleChange (e) {
        this.setState({
            projectId: this.readProjectId(e)
        });
    }
    handlePaste (e) {
        // const data = e.clipboardData.getData('Text');
        // const id = this.extractProjectId(data);
        // if (id) {
        //     this.setState({
        //         projectId: id
        //     });
        // }
    }
    handleBlur () {
        if (this.state.projectId) {
            this.props.setProjectId(this.state.projectId);
        }
    }
    handleFocus (e) {
        if (this.readProjectId(e)) {
            e.target.select();
        }
    }
    render () {
        const projectId = this.state.projectId === defaultProjectId ? '' : this.state.projectId;
        return (
            <input
                ref={elem => this.input = elem}
                spellCheck="false"
                type="text"
                value={`https://scratch.mit.edu/projects/${projectId}`}
                autoFocus
                className={styles.input}
                onKeyDown={this.handleKeyDown}
                onChange={this.handleChange}
                onPaste={this.handlePaste}
                onBlur={this.handleBlur}
                onFocus={this.handleFocus}
            />
        );
    }
}

ProjectInput.propTypes = {
    projectId: PropTypes.string,
    setProjectId: PropTypes.func
};

const mapStateToProps = state => ({
    projectId: state.scratchGui.projectState.projectId
});

const mapDispatchToProps = dispatch => ({
    setProjectId: projectId => dispatch(setProjectId(projectId))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectInput);
