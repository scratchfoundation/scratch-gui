import PropTypes from 'prop-types';
import React from 'react';
import Box from '../box/box.jsx';
import Modal from '../../containers/modal.jsx';

import styles from '../custom-procedures/custom-procedures.css';
import {defineMessages} from 'react-intl';

const messages = defineMessages({
    myblockModalTitle: {
        defaultMessage: 'Make a Block',
        description: 'Title for the modal where you create a custom block.',
        id: 'gui.customProcedures.myblockModalTitle'
    }
});

class ArtieHelpComponent extends React.Component {

    constructor(props){
        super(props);
    }

    render(){

        return(
            <Modal
                    className={styles.modalContent}
                    onRequestClose={this.props.onCancel}
                    id="ArtieHelp"
                    contentLabel="ARTIE HELP"
                >
                    <Box
                        className={styles.workspace}
                        componentRef={this.props.componentRefAdd}
                    />
                    <Box
                        className={styles.workspace}
                        componentRef={this.props.componentRefDel}
                    />
                </Modal>
        );
    }

};

ArtieHelpComponent.propTypes = {
    onCancel: PropTypes.func.isRequired,
};

export default ArtieHelpComponent;
