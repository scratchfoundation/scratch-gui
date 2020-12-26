import PropTypes from 'prop-types';
import React from 'react';
import Box from '../box/box.jsx';
import Modal from '../../containers/modal.jsx';
import {getBlocksFromHelp} from '../../lib/artie-api';
import cloneDeep from 'lodash/cloneDeep';

import styles from '../custom-procedures/custom-procedures.css';
import textInputIcon from '../custom-procedures/icon--text-input.svg';
import booleanInputIcon from '../custom-procedures/icon--boolean-input.svg';
import labelIcon from '../custom-procedures/icon--label.svg';
import VMScratchBlocks from '../../lib/blocks';
import {defineMessages, injectIntl, intlShape, FormattedMessage} from 'react-intl';

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

    componentDidMount(){
        //var objBlocks = getBlocksFromHelp(this.props.vm.runtime.flyoutBlocks._blocks, this.props.help);

        //We clone the VM for the blocks we have to add
        //let localAddVm = cloneDeep(this.props.vm);

        //We clone the VM for the blocks we have to delete
        //let localDeleteVm = cloneDeep(this.props.vm);
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
                        componentRef={this.props.componentRef}
                    />
                </Modal>
        );
    }

};

ArtieHelpComponent.propTypes = {
    onCancel: PropTypes.func.isRequired,
};

export default ArtieHelpComponent;
