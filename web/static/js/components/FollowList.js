import React, { Component, PropTypes } from 'react'
import FollowItem from './FollowItem'
import { Scrollbars } from 'react-custom-scrollbars'

export default class FollowList extends Component {
  renderNoUsers(count) {
    if (count === 0) {
      return (
        <li className="no-users">No users found</li>
      )
    }
  }
  render() {
    return (
      <div className="follow-list">
        <h1>{this.props.title}</h1>
        <Scrollbars style={{ height: 300 }} className="items-scroll">
          <ul>
            {
              this.props.data.sort((a, b) => {
                return a.since - b.since
              }).map((result, index) => {
                return (
                  <FollowItem key={index} user={result} />
                )
              })
            }
            {this.renderNoUsers(this.props.data.length)}
          </ul>
        </Scrollbars>
      </div>
    )
  }
}

FollowList.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired
}
