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
    changeUsername() {
        this.props.onUsernameChange(prompt('New username:', this.props.username) || '');
    }
    render () {
        const {
            /* eslint-disable no-unused-vars */
            children,
            vm,
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
