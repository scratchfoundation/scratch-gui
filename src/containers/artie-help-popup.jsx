import ArtieHelpPopupComponent from '../components/artie-help/artie-help-popup.jsx';
import {artieShowHelpPopup, artieAnswerHelpPopup} from '../reducers/artie-help.js';
import {artieHelpReceived} from '../reducers/artie-exercises.js';
import React from 'react';
import bindAll from 'lodash.bindall';
import {compose} from 'redux';
import {injectIntl} from 'react-intl';
import {connect} from 'react-redux';
import {updateAnsweredNeedHelp} from '../lib/artie-api.js';

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
        // We update the information in database just in case when the answer in 'Yes'
        updateAnsweredNeedHelp(this.props.artieHelp.id, true).then(psd => {

            // We hide the popup once the user has been selected the desired option
            this.props.onHideHelpPopup(this.props.artieHelp.id);

            if (psd.solutionDistance !== null) {
                // We show the help popup
                this.props.onArtieHelpReceived(psd.solutionDistance, new Date());
            }
        });
    }

    handleAnswerNo () {
        // We register the user option
        this.props.onAnswerHelpPopup(false, this.state.currentDateTime);
        // We hide the popup once the user has been selected the desired option
        this.props.onHideHelpPopup(this.props.artieHelp.id);
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

const mapStateToProps = state => ({
    artieHelp: state.scratchGui.artieHelp
});

const mapDispatchToProps = dispatch => ({
    onAnswerHelpPopup: (answer, datetime) => dispatch(artieAnswerHelpPopup(answer, datetime)),
    onHideHelpPopup: id => dispatch(artieShowHelpPopup(id, false)),
    onArtieHelpReceived: (help, date) => dispatch(artieHelpReceived(help, date))
});

export default compose(
    injectIntl,
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(ArtieHelpPopup);
