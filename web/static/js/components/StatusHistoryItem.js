import React, { Component, PropTypes } from 'react'
import Status from './Status'
import * as Formatter from '../utils/Format'

export default class StatusHistoryItem extends Component {
  render() {
    return (
      <li>
        <Status status={this.props.status} since={this.props.since} />
      </li>
    )
  }
}

StatusHistoryItem.propTypes = {
  status: PropTypes.string.isRequired,
  since: PropTypes.string.isRequired
}
