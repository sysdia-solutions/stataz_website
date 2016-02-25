import React, { Component, PropTypes } from 'react'
import UserStatusBlock from './UserStatusBlock'

export default class UserStatusItem extends Component {
  render() {
    return (
      <li>
        <UserStatusBlock username={this.props.data.username}
                         status={this.props.data.status}
                         since={this.props.data.since} />
      </li>
    )
  }
}

UserStatusItem.propTypes = {
  id: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired
}
