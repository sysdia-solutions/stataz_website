import React, { Component, PropTypes } from 'react'
import Username from './Username'
import Status from './Status'
import StatusHistoryItem from './StatusHistoryItem'
import * as Formatter from '../utils/Format'


export default class UserStatus extends Component {
  renderHistory(statuses) {
    if(this.props.fullHistory && statuses.length > 0) {
     return (
      <div className="status-history">
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

  renderFollowButton() {
    if (!this.props.isAuthenticated || this.props.isUser) {
      return
    }

    if (this.props.isFollowing) {
      return (
        <button onClick={(e) => this.handleUnfollowClick(e)} className="btn btn-warning">Unfollow</button>
      )
    } else {
      return (
        <button onClick={(e) => this.handleFollowClick(e)} className="btn btn-primary">Follow</button>
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
          <span className="prefix">is </span>
          <Status status={this.props.statusHistory[0].status} since={this.props.statusHistory[0].since} />
        </h2>
        {this.renderFollowButton()}
        <h3><span className="prefix">since</span> {since}</h3>
        {this.renderHistory(history)}
      </div>
    )
  }

  handleFollowClick(e) {
    e.preventDefault()
    this.props.onFollowClick(this.props.username)
  }

  handleUnfollowClick(e) {
    e.preventDefault()
    this.props.onUnfollowClick(this.props.username)
  }
}

UserStatus.propTypes = {
  username: PropTypes.string.isRequired,
  statusHistory: PropTypes.arrayOf(PropTypes.object).isRequired,
  fullHistory: PropTypes.bool.isRequired,
  isFollowing: PropTypes.bool,
  isUser: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  onFollowClick: PropTypes.func,
  onUnfollowClick: PropTypes.func
}
