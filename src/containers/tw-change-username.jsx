import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {defineMessages, injectIntl, intlShape} from 'react-intl';
import {setUsername} from '../reducers/tw';

const messages = defineMessages({
    usernamePrompt: {
        defaultMessage: 'New username:',
        description: 'Prompt asking user to select new username',
        id: 'tw.usernamePrompt'
    }
});

class ChangeUsername extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'changeUsername'
        ]);
    }
    changeUsername () {
        // eslint-disable-next-line no-alert
        const newUsername = prompt(this.props.intl.formatMessage(messages.usernamePrompt), this.props.username);
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
    onUsernameChange: PropTypes.func,
    intl: intlShape.isRequired
};

const mapStateToProps = state => ({
    username: state.scratchGui.tw.username
});

const mapDispatchToProps = dispatch => ({
    onUsernameChange: username => {
        dispatch(setUsername(username));
    }
});

export default injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(ChangeUsername));
