import PropTypes from 'prop-types';
import React from 'react';
import ArtiePopupComponent from '../components/artie-exercises/artie-exercises-popup.jsx';

class ArtieExercisePopup extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        return(
            <ArtiePopupComponent
                onCancel={this.props.onCancel}
                type = {this.props.type}
            />
        );
    }
}

ArtieExercisePopup.propTypes = {
    onCancel: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired
}

export default ArtieExercisePopup;
