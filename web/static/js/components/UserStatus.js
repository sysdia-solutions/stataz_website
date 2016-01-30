import React, { Component, PropTypes } from 'react'
import Username from './Username'
import StatusHistoryItem from './StatusHistoryItem'
import * as Formatter from '../utils/Format'


export default class UserStatus extends Component {
  renderHistory(statuses) {
    if(this.props.fullHistory && statuses.length > 0) {
     return (
      <div class="status-history">
        <h4>has previously been...</h4>
        <ul>
          {
            statuses.map((result, index) => {
              return (
                <StatusHistoryItem
                  key={index}
                  status={result.status}
                  since={result.since} />
              )
            })
          }
        </ul>
      </div>
     )
    }
  }

  render() {
    var since = Formatter.formatDate(this.props.statusHistory[0].since, Formatter.defaultDateFormat)
    var history = this.props.statusHistory.slice(1)
    return (
      <div className="user-status">
        <h1 title={this.props.username}>
          <Username username={this.props.username} />
        </h1>
        <h2 title={this.props.statusHistory[0].status}>
          <span className="prefix">is</span> {this.props.statusHistory[0].status}
        </h2>
        <h3><span className="prefix">since</span> {since}</h3>
        {this.renderHistory(history)}
      </div>
    )
  }
}

UserStatus.propTypes = {
  username: PropTypes.string.isRequired,
  statusHistory: PropTypes.arrayOf(PropTypes.object).isRequired,
  fullHistory: PropTypes.bool.isRequired
}
