import React, { Component, PropTypes} from 'react'
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
        <ul>
          {
            this.props.statuses.sort((a, b) => {
                return a.id - b.id
              }).map((result) => {
              return (
                <StatusManagerItem
                  key={result.id}
                  id={result.id}
                  description={result.description}
                  active={result.active}
                  onSetStatusClick={this.props.onSetStatusClick}
                  onDeleteStatusClick={this.props.onDeleteStatusClick} />
              )
            })
          }
        </ul>
        <form className="form-inline">
          <RichInputField ref="description" name="description" maxLength={32} inputType="text" addonIcon=""
                          placeholder="Enter new status" helptext={this.props.elementStatus.helpText}
                          hasFeedback={true} feedbackType={statusType} onTextChange={this.props.onAddStatusType}/>
          <button onClick={(e) => this.handleAddStatusClick(e)}
                  className="btn btn-info" type="submit"
                  disabled={this.props.elementStatus.inError || (this.props.elementStatus.textLength == 0)}>
            <i className="fa fa-plus fa-lg" />
          </button>
        </form>
      </div>
    )
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
  onDeleteStatusClick: PropTypes.func.isRequired,
  onAddStatusClick: PropTypes.func.isRequired,
  onAddStatusType: PropTypes.func.isRequired
}
