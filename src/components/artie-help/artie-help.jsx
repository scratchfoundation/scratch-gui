import PropTypes from 'prop-types';
import React from 'react';
import Box from '../box/box.jsx';
import Modal from '../../containers/modal.jsx';

import styles from './artie-help.css';
import {defineMessages, FormattedMessage, injectIntl} from 'react-intl';

const messages = defineMessages({
    artieHelpModalTitle: {
        defaultMessage: 'ARTIE Help',
        description: 'TARTIE Help.',
        id: 'gui.menuBar.artie.help.modalTitle'
    }
});

class ArtieHelpComponent extends React.Component {

    constructor(props){
        super(props);
    }

    render(){

        if(this.props.help.nextSteps !== null && 
            (this.props.help.nextSteps.addElements.length >0 || this.props.help.nextSteps.deleteElements.length > 0))
        {

            return(
                <Modal
                        className={styles.modalContent}
                        onRequestClose={this.props.onCancel}
                        id="ArtieHelp"
                        contentLabel={this.props.intl.formatMessage(messages.artieHelpModalTitle)}
                    >
                        <Box
                            className={styles.label}
                        >
                            <FormattedMessage
                                    defaultMessage="List of elements to add:"
                                    description="List of elements to add:"
                                    id="gui.menuBar.artie.help.addElements"
                                />
                        </Box>
                        <Box
                            className={styles.workspace}
                            componentRef={this.props.componentRefAdd}
                        />
                        <Box
                            className={styles.label}
                        >
                            <FormattedMessage
                                    defaultMessage="List of elements to delete:"
                                    description="List of elements to delete:"
                                    id="gui.menuBar.artie.help.delElements"
                                />
                        </Box>
                        <Box
                            className={styles.workspace}
                            componentRef={this.props.componentRefDel}
                        />
                    </Modal>
            );
        }
        else{
            return(
                <Modal
                        className={styles.modalContentCongrats}
                        onRequestClose={this.props.onCancel}
                        id="ArtieHelp"
                        contentLabel={this.props.intl.formatMessage(messages.artieHelpModalTitle)}
                    >
                        <Box
                            className={styles.labelCongrats}
                        >
                            <FormattedMessage
                                    defaultMessage="Congratulations! You have completed the exercise!"
                                    description="Congratulations! you have completed the exercise!"
                                    id="gui.menuBar.artie.help.congrats"
                                />
                        </Box>
                    </Modal>
            );
        }
    }

};

ArtieHelpComponent.propTypes = {
    onCancel: PropTypes.func.isRequired,
};

export default injectIntl(ArtieHelpComponent);
