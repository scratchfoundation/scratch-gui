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
            'onChange',
            'onFocus'
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
            this.setState({ projectId: this.props.projectId || '' });
        }
    }
    readProjectId (e) {
        const value = e.target.value;
        const numberMatch = value.match(/\d+/);
        return numberMatch ? numberMatch[0] : '';
    }
    onChange (e) {
        this.setState({ projectId: this.readProjectId(e) });
    }
    onKeyDown (e) {
        if (e.key === 'Enter') {
            location.hash = this.state.projectId;
            this.input.blur();
        }
    }
    onFocus (e) {
        if (this.readProjectId(e)) {
            e.target.select();
        }
    }
    render () {
        return <input
            ref={elem => this.input = elem}
            spellCheck="false"
            type="text"
            value={"https://scratch.mit.edu/projects/" + this.state.projectId}
            autoFocus
            className={classNames(styles.input)}
            onKeyDown={this.onKeyDown}
            onChange={this.onChange}
            onFocus={this.onFocus}
        ></input>
    }
}

ProjectInput.propTypes = {
    projectId: PropTypes.string,
    lastProjectId: PropTypes.string,
    onChangeProject: PropTypes.func,
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
