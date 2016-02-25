import React, { Component, PropTypes } from 'react'
import Username from './Username'
import Status from './Status'

export default class UserStatusBlock extends Component {
  render() {
    return (
      <span>
        <Username username={this.props.username} />
        <span> is </span>
        <Status status={this.props.status} since={this.props.since} />
      </span>
    )
  }
}

UserStatusBlock.propTypes = {
  username: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  since: PropTypes.string.isRequired
}
