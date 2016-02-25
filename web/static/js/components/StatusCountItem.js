import React, { Component, PropTypes } from 'react'
import Status from './Status'

export default class StatusCountItem extends Component {
  render() {
    return (
      <li>
        <Status status={this.props.data.status} since={this.props.data.since} />
        <span>({this.props.data.count})</span>
      </li>
    )
  }
}

StatusCountItem.propTypes = {
  id: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired
}
