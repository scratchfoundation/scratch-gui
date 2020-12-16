import PropTypes from 'prop-types';
import React from 'react';
import Box from '../box/box.jsx';
import Modal from '../../containers/modal.jsx';
import styles from './artie-help.css';
import {FormattedMessage} from 'react-intl';


class ArtieHelpComponent extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
            <Modal
                onRequestClose={this.props.onCancel}
                className={styles.modalContent}
                contentLabel={this.props.title}
                id="ArtieHelp"
            >
                <Box className={styles.body}>
                    <label>
                        <FormattedMessage
                            defaultMessage="Username"
                            description="Username"
                            id="gui.menuBar.artie.login.username"
                        />
                    </label>
                </Box>
            </Modal>
        );
    }

}

ArtieHelpComponent.propTypes = {
    onCancel: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
};

export default ArtieHelpComponent;
