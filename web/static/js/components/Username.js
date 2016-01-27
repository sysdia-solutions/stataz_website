import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

export default class Username extends Component {
  render() {
    var href = "/profile/" + this.props.username
    return (
      <Link className="username profile-link" to={href}>
        {this.props.username}
      </Link>
    )
  }
}

Username.propTypes = {
  username: PropTypes.string.isRequired
}
