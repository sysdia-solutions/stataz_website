import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

export default class Status extends Component {
  render() {
    var since = (this.props.since ? this.props.status + " since " + this.props.since : "")
    var href = "/search/" + this.props.status
    return (
      <Link className="status profile-link" title={since} to={href}>
        {this.props.status}
      </Link>
    )
  }
}

Status.propTypes = {
  status: PropTypes.string.isRequired,
  since: PropTypes.string
}
