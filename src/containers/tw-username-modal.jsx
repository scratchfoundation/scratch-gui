import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import {connect} from 'react-redux';
import {setUsername} from '../reducers/tw';
import UsernameModalComponent from '../components/tw-username-modal/username-modal.jsx';
import {closeUsernameModal} from '../reducers/modals';

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
            valid: true
        };
    }
    handleKeyPress (event) {
        if (event.key === 'Enter' && this.state.valid) {
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
            valid: e.target.checkValidity()
        });
    }
    handleReset () {
        // TODO
        const randomUsername = '';
        this.setState({
            value: randomUsername
        });
        this.props.onSetUsername(randomUsername);
    }
    render () {
        return (
            <UsernameModalComponent
                valid={this.state.valid}
                value={this.state.value}
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
    username: PropTypes.string,
    onCloseUsernameModal: PropTypes.func,
    onSetUsername: PropTypes.func
};

const mapStateToProps = state => ({
    username: state.scratchGui.tw.username
});

const mapDispatchToProps = dispatch => ({
    onCloseUsernameModal: () => dispatch(closeUsernameModal()),
    onSetUsername: username => dispatch(setUsername(username))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UsernameModal);
