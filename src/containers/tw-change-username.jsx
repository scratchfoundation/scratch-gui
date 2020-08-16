import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {setUsername} from '../reducers/tw';

class ChangeUsername extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'changeUsername'
        ]);
    }
    changeUsername () {
        // todo: translate
        if (this.props.isProjectRunning) {
            alert('Cannot change username when project is running.');
        } else {
            const newUsername = prompt('New username:', this.props.username);
            if (newUsername === null) {
                return;
            }
            this.props.onUsernameChange(newUsername);
        }
    }
    render () {
        const {
            /* eslint-disable no-unused-vars */
            children,
            onUsernameChange,
            /* eslint-enable no-unused-vars */
            ...props
        } = this.props;
        return this.props.children(this.changeUsername, props);
    }
}

ChangeUsername.propTypes = {
    children: PropTypes.func,
    username: PropTypes.string,
    isProjectRunning: PropTypes.bool,
    onUsernameChange: PropTypes.func
};

const mapStateToProps = state => ({
    username: state.scratchGui.tw.username,
    isProjectRunning: state.scratchGui.vmStatus.running
});

const mapDispatchToProps = dispatch => ({
    onUsernameChange: username => {
        dispatch(setUsername(username));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChangeUsername);
