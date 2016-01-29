import React, { Component, PropTypes } from 'react'

export default class StatusManagerItem extends Component {
  renderActiveState(id, state) {
    var icon = (state ? "dot-circle-o" : "circle-o" )
    var classStyle = "fa fa-" + icon

    return (
      <i className={classStyle} onClick={(e) => this.handleSetStatus(e, id, state)}/>
    )
  }

  renderDeleteStatus(id) {
    return (
      <i className="fa fa-trash" onClick={(e) => this.handleDeleteStatus(e, id)}/>
    )
  }

  handleSetStatus(e, id, state) {
    e.preventDefault()
    if (! state) {
      this.props.onSetStatusClick(id)
    }
  }

  handleDeleteStatus(e, id) {
    e.preventDefault()
    this.props.onDeleteStatusClick(id)
  }

  render() {
    return (
      <li>
        { this.props.description }
        { this.renderActiveState(this.props.id, this.props.active) }
        { !this.props.active ? this.renderDeleteStatus(this.props.id) : false }
      </li>
    )
  }
}

StatusManagerItem.propTypes = {
  id: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onSetStatusClick: PropTypes.func.isRequired,
  onDeleteStatusClick: PropTypes.func.isRequired
}
