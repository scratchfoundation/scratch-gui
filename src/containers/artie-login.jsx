import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import ArtieLoginComponent from '../components/artie-login/artie-login.jsx';

class ArtieLogin extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, []);
        this.state = {
            user: null
        };
    }
    componentWillReceiveProps (newProps) {
        if (this.state.user !== newProps.artieLogin.user) {
            this.setState({
                user: newProps.artieLogin.user
            });
        }

        if(this.state.students !== newProps.artieLogin.students){
            this.setState({
                students: newProps.artieLogin.students
            });
        }
    }

    render () {
        return(
            <ArtieLoginComponent
                onOk={this.props.onOk}
                onCancel={this.props.onUserChange}
                onUserChange={this.props.onUserChange}
                onPasswordChange={this.props.onPasswordChange}
                onStudentChange={this.props.onStudentChange}
                title={this.props.title}
                students={this.state.students}
                user={this.state.user}
            />
        );
    }
}

ArtieLogin.propTypes = {
    onUserChange: PropTypes.func,
    onPasswordChange: PropTypes.func,
    onStudentChange: PropTypes.func,
    onCancel: PropTypes.func.isRequired,
    onOk: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    artieLogin: PropTypes.object
}

export default ArtieLogin;
