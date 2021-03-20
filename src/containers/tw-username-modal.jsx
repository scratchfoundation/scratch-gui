import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import {connect} from 'react-redux';
import {setUsername, setUsernameInvalid} from '../reducers/tw';
import UsernameModalComponent from '../components/tw-username-modal/username-modal.jsx';
import {closeUsernameModal} from '../reducers/modals';
import {generateRandomUsername} from '../lib/tw-username';

class UsernameModal extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleKeyPress',
            'handleFocus',
            'handleOk',
            'handleCancel',
            'handleChange',
            'handleReset'
        ]);
        this.state = {
            value: this.props.username,
            valueValid: !this.props.usernameInvalid
        };
    }
    handleKeyPress (event) {
        if (event.key === 'Enter' && this.state.valueValid) {
            this.handleOk();
        }
    }
    handleFocus (event) {
        event.target.select();
    }
    handleOk () {
        this.props.onSetUsername(this.state.value);
        this.props.onCloseUsernameModal();
    }
    handleCancel () {
        this.props.onCloseUsernameModal();
    }
    handleChange (e) {
        this.setState({
            value: e.target.value,
            valueValid: e.target.checkValidity()
        });
    }
    handleReset () {
        const randomUsername = generateRandomUsername();
        this.props.onCloseUsernameModal();
        this.props.onSetUsername(randomUsername);
    }
    render () {
        return (
            <UsernameModalComponent
                mustChangeUsername={this.props.usernameInvalid}
                value={this.state.value}
                valueValid={this.state.valueValid}
                onKeyPress={this.handleKeyPress}
                onFocus={this.handleFocus}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                onChange={this.handleChange}
                onReset={this.handleReset}
            />
        );
    }
}

UsernameModal.propTypes = {
    onCloseUsernameModal: PropTypes.func,
    onSetUsername: PropTypes.func,
    username: PropTypes.string,
    usernameInvalid: PropTypes.bool
};

const mapStateToProps = state => ({
    username: state.scratchGui.tw.username,
    usernameInvalid: state.scratchGui.tw.usernameInvalid
});

const mapDispatchToProps = dispatch => ({
    onCloseUsernameModal: () => dispatch(closeUsernameModal()),
    onSetUsername: username => {
        dispatch(setUsername(username));
        dispatch(setUsernameInvalid(false));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UsernameModal);
