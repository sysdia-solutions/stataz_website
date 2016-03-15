import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import * as Formatter from '../utils/Format'

export default class Status extends Component {
  formatSince(since) {
    return Formatter.formatDate(since, Formatter.defaultDateFormat)
  }

  render() {
    var since = (this.props.since ? this.props.status + " since " + this.formatSince(this.props.since) : "")
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
