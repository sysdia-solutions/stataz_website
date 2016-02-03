import React, { Component, PropTypes } from 'react'

export default class Status extends Component {
  render() {
    var since = this.props.status + " since " + this.props.since
    return (
      <span title={since} >{this.props.status}</span>
    )
  }
}

Status.propTypes = {
  status: PropTypes.string.isRequired,
  since: PropTypes.string.isRequired
}
