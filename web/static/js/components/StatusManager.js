import React, { Component, PropTypes} from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { Modal } from 'react-bootstrap'
import StatusManagerItem from './StatusManagerItem'
import RichInputField from './RichInputField'

export default class StatusManager extends Component {
  render() {
    var statusType = ""
    if (this.props.elementStatus.inError) {
      statusType = "has-error"
    } else if (this.props.elementStatus.textLength > 0) {
      statusType = "has-success"
    }

    return (
      <div className="status-manager">
        <Scrollbars style={{ height: 225 }} className="items-scroll">
          <ul>
            {
              this.props.statuses.sort((a, b) => {
                  return b.id - a.id
                }).map((result) => {
                return (
                  <StatusManagerItem
                    key={result.id}
                    id={result.id}
                    description={result.description}
                    active={result.active}
                    onSetStatusClick={this.props.onSetStatusClick}
                    onDeleteStatusClick={this.props.onConfirmDeleteStatusClick} />
                )
              })
            }
          </ul>
        </Scrollbars>
        <form className="form-inline">
          <RichInputField ref="description" name="description" maxLength={32} inputType="text" addonIcon=""
                          placeholder="Enter new status" helptext={this.props.elementStatus.helpText}
                          hasFeedback={true} feedbackType={statusType} onTextChange={this.props.onAddStatusType}/>
          <button onClick={(e) => this.handleAddStatusClick(e)}
                  className="btn btn-primary" type="submit"
                  disabled={this.props.elementStatus.inError || (this.props.elementStatus.textLength == 0)}>
            <span>Add</span> <i className="fa fa-plus" />
          </button>
        </form>
        <Modal show={this.props.deleteModalData.open} onHide={this.props.closeDeleteConfirmModal}>
          <Modal.Header>
            <Modal.Title>Delete '{this.props.deleteModalData.text}' Status</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to delete status '{this.props.deleteModalData.text}'?
            <br />The status cannot be restored when it has been deleted.</p>
          </Modal.Body>
          <Modal.Footer>
            <button onClick={this.props.closeDeleteConfirmModal} className="btn btn-link">Cancel</button>
            <button onClick={(e) => this.handleConfirmDeleteClick(e)} className="btn btn-danger">Delete</button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }

  handleConfirmDeleteClick(e) {
    e.preventDefault()
    this.props.onDeleteStatusClick(this.props.deleteModalData.id)
  }

  handleAddStatusClick(e) {
    e.preventDefault()
    const description = this.refs.description.refs.description.value.trim()
    this.props.onAddStatusClick(description)
  }
}

StatusManager.propTypes = {
  statuses: PropTypes.arrayOf(PropTypes.object).isRequired,
  elementStatus: PropTypes.object.isRequired,
  onSetStatusClick: PropTypes.func.isRequired,
  onConfirmDeleteStatusClick: PropTypes.func.isRequired,
  onDeleteStatusClick: PropTypes.func.isRequired,
  onAddStatusClick: PropTypes.func.isRequired,
  onAddStatusType: PropTypes.func.isRequired,
  deleteModalData: PropTypes.object.isRequired,
  closeDeleteConfirmModal: PropTypes.func.isRequired
}
