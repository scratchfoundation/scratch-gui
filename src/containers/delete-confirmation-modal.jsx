import React from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'

import DeleteConfirmationModalComponent from '../components/delete-confirmation-modal/delete-confirmation-modal.jsx'
import { closeDeleteConfirmation } from '../reducers/modals'

// Global reference to store the current delete handler
let currentDeleteHandler = null

export const setDeleteHandler = (handler) => {
  currentDeleteHandler = handler
}

class DeleteConfirmationModal extends React.Component {
  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }

  handleDelete() {
    if (currentDeleteHandler) {
      currentDeleteHandler()
    }
    this.props.onCancel()
  }

  handleCancel() {
    currentDeleteHandler = null
    this.props.onCancel()
  }

  render() {
    if (!this.props.visible) {
      return null
    }
    
    return (
      <DeleteConfirmationModalComponent
        intl={this.props.intl}
        onCancel={this.handleCancel}
        onDelete={this.handleDelete}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  visible: state.scratchGui.modals.deleteConfirmation,
})

const mapDispatchToProps = (dispatch) => ({
  onCancel: () => dispatch(closeDeleteConfirmation()),
})

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(DeleteConfirmationModal))
