import React, { Component, PropTypes } from 'react'
import * as Formatter from '../utils/Format'

export default class UserStatus extends Component {
  render() {
    var since = Formatter.formatDate(this.props.status_history[0].since, Formatter.defaultDateFormat)
    return (
      <div>
        <h1>{this.props.username}</h1>
        <h2>is {this.props.status_history[0].status}</h2>
        <h3>since {since}</h3>
      </div>
    )
  }
}

UserStatus.propTypes = {
  username: PropTypes.string.isRequired,
  status_history: PropTypes.arrayOf(PropTypes.object).isRequired
}
