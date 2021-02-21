import PropTypes from 'prop-types';
import React from 'react';
import Box from '../box/box.jsx';
import Modal from '../../containers/modal.jsx';

import styles from './artie-help.css';
import {defineMessages, FormattedMessage, injectIntl} from 'react-intl';

import ArtieHelpRenderValuesComponent from './artie-help-render-values.jsx';

const messages = defineMessages({
    artieHelpModalTitle: {
        defaultMessage: 'ARTIE Help',
        description: 'ARTIE Help.',
        id: 'gui.menuBar.artie.help.modalTitle'
    }
});

class ArtieHelpComponent extends React.Component {

    constructor(props){
        super(props);
    }

    render(){

        if(this.props.help !== undefined && this.props.help.nextSteps !== null &&
            (this.props.help.nextSteps.addBlocks.length >0 || this.props.help.nextSteps.deleteBlocks.length > 0))
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
                                    defaultMessage="List of blocks to add:"
                                    description="List of blocks to add:"
                                    id="gui.menuBar.artie.help.addBlocks"
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
                                    defaultMessage="List of blocks to delete:"
                                    description="List of blocks to delete:"
                                    id="gui.menuBar.artie.help.delBlocks"
                                />
                        </Box>
                        <Box
                            className={styles.workspace}
                            componentRef={this.props.componentRefDel}
                        />
                    </Modal>
            );
        }
        else if(this.props.help !== undefined && this.props.help.nextSteps !== null && this.props.help.nextSteps.replacePositions !== null && this.props.help.nextSteps.replacePositions.length > 0){
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
                                    defaultMessage="List of misplaced items:"
                                    description="List of misplaced items:"
                                    id="gui.menuBar.artie.help.mispacedElements"
                                />
                        </Box>
                        <Box
                            className={styles.workspaceFull}
                            componentRef={this.props.componentRefMisplaced}
                        />
                    </Modal>
            );
        }
        else if(this.props.help !== undefined && this.props.help.nextSteps !== null && this.props.help.nextSteps.replaceInputs !== null && this.props.help.nextSteps.replaceInputs.length > 0){
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
                                defaultMessage="List of elements with incorrect input values:"
                                description="List of elements with incorrect input values:"
                                id="gui.menuBar.artie.help.elementsIncorrectInput"
                            />
                    </Box>
                    <Box
                        className={styles.workspace}
                        componentRef={this.props.componentRefReplace}
                    />
                    <Box
                        className={styles.label}
                    >
                        <FormattedMessage
                                defaultMessage="List of values to replace:"
                                description="List of values to replace:"
                                id="gui.menuBar.artie.help.incorrectInputValues"
                            />
                    </Box>
                    <Box
                        className={styles.table}
                    >
                        <ArtieHelpRenderValuesComponent
                            values={this.props.help.nextSteps.replaceInputs}
                        />
                    </Box>
                </Modal>
            );
        }
        else{
            return null;
        }
    }

};

ArtieHelpComponent.propTypes = {
    onCancel: PropTypes.func.isRequired,
};

export default injectIntl(ArtieHelpComponent);
