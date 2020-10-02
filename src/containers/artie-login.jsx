import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import ArtieLoginComponent from '../components/artie-login/artie-login.jsx';

class ArtieLogin extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleCancel',
            'handleUserChange',
            'handlePasswordChange'
        ]);
    }

    handleCancel () {
        this.props.onCancel();
    }
    handleUserChange () {
        this.props.onUserChange();
    }
    handlePasswordChange(){
        this.props.onPasswordChange();
    }
    render () {
        return(
            <ArtieLoginComponent
                onCancel={this.handleCancel}
                onUserChange={this.handleUserChange}
                onPasswordChange={this.handlePasswordChange}
                title={this.props.title}
                students={this.props.students}
            />
        );
    }
}

ArtieLogin.propTypes = {
    onUserChange: PropTypes.func,
    onPasswordChange: PropTypes.func,
    onCancel: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    students: PropTypes.array.isRequired
}

export default ArtieLogin;
