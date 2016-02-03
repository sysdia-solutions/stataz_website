import React, { Component, PropTypes } from 'react'
import Username from './Username'
import Status from './Status'

export default class FollowItem extends Component {
  render() {
    return (
      <li>
        <Username username={this.props.user.username} />
        <span> is </span>
        <Status status={this.props.user.status} since={this.props.user.since} />
      </li>
    )
  }
}

FollowItem.propTypes = {
  user: PropTypes.object.isRequired
}
