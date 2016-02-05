import React, { Component, PropTypes } from 'react'

export default class StatusManagerItem extends Component {
  renderDescription(id, text, state) {
    var icon = (state ? "dot-circle-o" : "circle-o" )
    var classStyle = "active-status-icon fa fa-" + icon

    return (
      <div className="status-description" onClick={(e) => this.handleSetStatus(e, id, state)}>
        <i className={classStyle} />
        <span> { text }</span>
      </div>
    )
  }

  renderDeleteStatus(id, text) {
    return (
      <button className="btn" onClick={(e) => this.handleDeleteStatus(e, id, text)}>
        <i className="fa fa-trash" />
      </button>
    )
  }

  handleSetStatus(e, id, state) {
    e.preventDefault()
    if (! state) {
      this.props.onSetStatusClick(id)
    }
  }

  handleDeleteStatus(e, id, text) {
    e.preventDefault()
    this.props.onDeleteStatusClick(id, text)
  }

  render() {
    var activeClass = (this.props.active ? "active" : "")
    return (
      <li className={activeClass}>
        { this.renderDescription(this.props.id, this.props.description, this.props.active) }
        { !this.props.active ? this.renderDeleteStatus(this.props.id, this.props.description) : false }
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
