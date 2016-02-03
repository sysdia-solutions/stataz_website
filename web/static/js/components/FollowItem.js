import React, { Component, PropTypes } from 'react'
import Username from './Username'

export default class FollowItem extends Component {
  render() {
    return (
      <li>
        <Username username={this.props.user.username} />
        <span> is </span>
        {this.props.user.status}
      </li>
    )
  }
}

FollowItem.propTypes = {
  user: PropTypes.object.isRequired
}
