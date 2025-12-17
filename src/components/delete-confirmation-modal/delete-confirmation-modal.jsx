import PropTypes from 'prop-types'
import React from 'react'
import { FormattedMessage } from 'react-intl'

import Modal from '../../containers/modal.jsx'
import Box from '../box/box.jsx'
import Button from '../button/button.jsx'

import styles from './delete-confirmation-modal.css'

const DeleteConfirmationModal = (props) => (
  <Modal
    className={styles.modalContent}
    contentLabel={props.intl.formatMessage({
      defaultMessage: 'Delete Confirmation',
      description: 'Title for delete confirmation modal',
      id: 'gui.deleteConfirmation.title',
    })}
    onRequestClose={props.onCancel}
  >
    <Box className={styles.body} direction="column">
      <div className={styles.message}>
        <FormattedMessage
          defaultMessage="Are you sure you want to delete this sprite?"
          description="Confirmation message for deleting a sprite"
          id="gui.deleteConfirmation.message"
        />
      </div>
      <Box className={styles.buttonRow}>
        <Button className={styles.cancelButton} onClick={props.onCancel}>
          <FormattedMessage
            defaultMessage="Cancel"
            description="Button to cancel deletion"
            id="gui.deleteConfirmation.cancel"
          />
        </Button>
        <Button className={styles.deleteButton} onClick={props.onDelete}>
          <FormattedMessage
            defaultMessage="Delete"
            description="Button to confirm deletion"
            id="gui.deleteConfirmation.delete"
          />
        </Button>
      </Box>
    </Box>
  </Modal>
)

DeleteConfirmationModal.propTypes = {
  intl: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default DeleteConfirmationModal
