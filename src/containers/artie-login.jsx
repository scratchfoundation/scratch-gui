import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import ArtieLoginComponent from '../components/artie-login/artie-login.jsx';

class ArtieLogin extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleCancel',
            'handleOk',
            'handleUserChange',
            'handlePasswordChange'
        ]);
    }

    handleCancel () {
        this.props.onCancel();
    }
    handleOk(){
        this.props.onOk();
    }
    handleUserChange (e) {
        this.props.onUserChange(e);
    }
    handlePasswordChange(e){
        this.props.onPasswordChange(e);
    }
    render () {
        return(
            <ArtieLoginComponent
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                onUserChange={this.handleUserChange}
                onPasswordChange={this.handlePasswordChange}
                title={this.props.title}
                students={this.props.artieLogin.students}
                user={this.props.artieLogin.user}
            />
        );
    }
}

ArtieLogin.propTypes = {
    onUserChange: PropTypes.func,
    onPasswordChange: PropTypes.func,
    onCancel: PropTypes.func.isRequired,
    onOk: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    artieLogin: PropTypes.object
}

export default ArtieLogin;
