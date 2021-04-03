import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import bindAll from 'lodash.bindall';
import {defaultProjectId, getIsLoading, getIsFetchingWithId} from '../../reducers/project-state';
import styles from './project-input.css';
import { setProjectId } from '../../lib/tw-navigation-utils';

const PROJECT_BASE = 'https://scratch.mit.edu/projects/';

class ProjectInput extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleKeyDown',
            'handleChange',
            'handlePaste',
            'handleBlur',
            'handleFocus',
            'inputRef'
        ]);
        this.state = {
            projectId: this.props.projectId
        };
    }
    componentDidUpdate (prevProps) {
        if (this.props.projectId !== prevProps.projectId || this.props.loading !== prevProps.loading) {
            if (this.props.projectId === defaultProjectId) {
                this.input.focus();
                this.input.selectionStart = this.input.value.length;
            } else {
                this.input.blur();
            }
            this.setState({
                projectId: this.props.projectId
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
            this.input.blur();
        }
    }
    handleChange (e) {
        this.setState({
            projectId: this.readProjectId(e) || defaultProjectId
        });
    }
    handlePaste () {
        // const data = e.clipboardData.getData('Text');
        // const id = this.extractProjectId(data);
        // if (id) {
        //     this.setState({
        //         projectId: id
        //     });
        // }
    }
    handleBlur () {
        if (this.state.projectId && this.state.projectId !== this.props.projectId) {
            this.props.setProjectId(this.state.projectId);
        }
    }
    handleFocus (e) {
        if (this.extractProjectId(e.target.value)) {
            e.target.select();
        }
    }
    inputRef (el) {
        this.input = el;
    }
    render () {
        const projectId = this.state.projectId === defaultProjectId ? '' : this.state.projectId || '';
        return (
            <input
                ref={this.inputRef}
                spellCheck="false"
                type="text"
                value={`${PROJECT_BASE}${projectId}`}
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
    setProjectId: PropTypes.func,
    loading: PropTypes.bool
};

const mapStateToProps = state => ({
    projectId: state.scratchGui.projectState.projectId,
    loading: getIsLoading(state.scratchGui.projectState.loadingState) ||
        getIsFetchingWithId(state.scratchGui.projectState.loadingState)
});

const mapDispatchToProps = dispatch => ({
    setProjectId: projectId => setProjectId(dispatch, projectId)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectInput);
