import React, { Component, PropTypes } from 'react'
import Username from './Username'
import StatusHistoryItem from './StatusHistoryItem'
import * as Formatter from '../utils/Format'


export default class UserStatus extends Component {
  renderHistory(statuses) {
    if(this.props.full_history && statuses.length > 0) {
     return (
      <div>
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
    var since = Formatter.formatDate(this.props.status_history[0].since, Formatter.defaultDateFormat)
    var history = this.props.status_history.slice(1)
    return (
      <div>
        <h1><Username username={this.props.username} /></h1>
        <h2>is {this.props.status_history[0].status}</h2>
        <h3>since {since}</h3>
        {this.renderHistory(history)}
      </div>
    )
  }
}

UserStatus.propTypes = {
  username: PropTypes.string.isRequired,
  status_history: PropTypes.arrayOf(PropTypes.object).isRequired,
  full_history: PropTypes.bool.isRequired
}
