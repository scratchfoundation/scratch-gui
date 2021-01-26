import PropTypes from 'prop-types';
import React from 'react';
import Box from '../box/box.jsx';
import Modal from '../../containers/modal.jsx';
import Spinner from '../spinner/spinner.jsx';

import styles from './artie-loading.css';
import {defineMessages, FormattedMessage, injectIntl} from 'react-intl';


const messages = defineMessages({
    artieLoadingModalTitle: {
        defaultMessage: 'Loading',
        description: 'Loading',
        id: 'gui.menuBar.artie.loading.message'
    }
});

class ArtieLoadingComponent extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
            <Modal
                    className={styles.modalContentCongrats}
                    onRequestClose={null}
                    id="ArtieLoading"
                    contentLabel={this.props.intl.formatMessage(messages.artieLoadingModalTitle)}
                >
                    <Box
                        className={styles.labelCongrats}
                    >
                        <Spinner
                            large
                            className={styles.spinner}
                            level={'info'}
                        />
                        <FormattedMessage
                                defaultMessage="Loading"
                                description="Loading"
                                id="gui.menuBar.artie.loading.message"
                            />
                    </Box>
                </Modal>
        );
    }

};

export default injectIntl(ArtieLoadingComponent);
