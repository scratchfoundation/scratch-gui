import ArtieHelpPopupComponent from '../components/artie-help/artie-help-popup.jsx';
import {artieShowHelpPopup, artieAnswerHelpPopup} from '../reducers/artie-help.js';
import React from 'react';
import bindAll from 'lodash.bindall';
import {compose} from 'redux';
import {injectIntl} from 'react-intl';
import {connect} from 'react-redux';

class ArtieHelpPopup extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            currentDateTime: Date().toLocaleString()
        };
        bindAll(this, [
            'handleAnswerYes',
            'handleAnswerNo'
        ]);
    }

    handleAnswerYes () {
        // We register the user option
        this.props.onAnswerHelpPopup(true, this.state.currentDateTime);
        // We hide the popup once the user has been selected the desired option
        this.props.onHideHelpPopup();
    }

    handleAnswerNo () {
        // We register the user option
        this.props.onAnswerHelpPopup(false, this.state.currentDateTime);
        // We hide the popup once the user has been selected the desired option
        this.props.onHideHelpPopup();
    }

    render () {
        return (
            <ArtieHelpPopupComponent
                onYesClick={this.handleAnswerYes}
                onNoClick={this.handleAnswerNo}
            />
        );
    }
}

const mapDispatchToProps = dispatch => ({
    onAnswerHelpPopup: (answer, datetime) => dispatch(artieAnswerHelpPopup(answer, datetime)),
    onHideHelpPopup: () => dispatch(artieShowHelpPopup(false))
});

export default compose(
    injectIntl,
    connect(
        null,
        mapDispatchToProps
    )
)(ArtieHelpPopup);
