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
        // eslint-disable-next-line no-alert
        const newUsername = prompt('New username:', this.props.username);
        if (newUsername === null) {
            return;
        }
        this.props.onUsernameChange(newUsername);
    }
    render () {
        return this.props.children(this.changeUsername);
    }
}

ChangeUsername.propTypes = {
    children: PropTypes.func,
    username: PropTypes.string,
    onUsernameChange: PropTypes.func
};

const mapStateToProps = state => ({
    username: state.scratchGui.tw.username
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
