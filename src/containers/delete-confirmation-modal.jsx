import React from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'

import DeleteConfirmationModalComponent from '../components/delete-confirmation-modal/delete-confirmation-modal.jsx'
import { clearDeletePending } from '../reducers/delete-confirmation'

class DeleteConfirmationModal extends React.Component {
  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }

  handleDelete() {
    if (this.props.onConfirm) {
      this.props.onConfirm()
    }
    this.props.onClearDeletePending()
  }

  handleCancel() {
    this.props.onClearDeletePending()
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
  visible: state.scratchGui.deleteConfirmation.pendingId !== null,
  onConfirm: state.scratchGui.deleteConfirmation.onConfirm,
})

const mapDispatchToProps = (dispatch) => ({
  onClearDeletePending: () => dispatch(clearDeletePending()),
})

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(DeleteConfirmationModal))
