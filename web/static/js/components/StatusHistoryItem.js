import React, { Component, PropTypes } from 'react'
import * as Formatter from '../utils/Format'

export default class StatusHistoryItem extends Component {
  render() {
    var since = Formatter.formatDate(this.props.since, Formatter.defaultDateFormat)
    var title = this.props.status + " since " + since
    return (
      <li title={title}>{this.props.status}</li>
    )
  }
}

StatusHistoryItem.propTypes = {
  status: PropTypes.string.isRequired,
  since: PropTypes.string.isRequired
}
