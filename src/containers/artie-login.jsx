import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import ArtieLoginComponent from '../components/artie-login/artie-login.jsx';

class ArtieLogin extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleCancel'
        ]);
    }

    handleCancel () {
        this.props.onCancel();
    }
    render () {
        return(
            <ArtieLoginComponent
                onCancel={this.handleCancel}
                title={this.props.title}
            />
        );
    }
}

ArtieLogin.propTypes = {
    onCancel: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
}

export default ArtieLogin;
