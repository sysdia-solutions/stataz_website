import React, { Component, PropTypes } from 'react'

import MainContent from './MainContent'
import HomeBanner from './HomeBanner'
import DataList from './DataList'
import UserStatusItem from './UserStatusItem'
import StatusCountItem from './StatusCountItem'

export default class HomeSection extends Component {
  renderListItem(type, data, itemElement, height, emptyMessage) {
    var classString = "col-md-4 section-block top-list-block " + type
    var title = type.replace(/-/g, " ").ucfirst()
    return (
      <div className={classString}>
        <DataList title={title}
                  data={data}
                  contentHeight={height}
                  itemElement={itemElement}
                  noDataMessage={emptyMessage} />
      </div>
    )
  }

  render() {
    return(
      <MainContent>
        <HomeBanner
          user = { this.props.user }
          authentication = { this.props.authentication }
          onSignUpClick = { this.props.onSignUpClick } />
        <div className="page-section list-section">
          <div className="row">
            { this.renderListItem("newest-users", this.props.lists.newUsers, UserStatusItem, 200, "No users found") }
            { this.renderListItem("recent-activity", this.props.lists.newStatus, UserStatusItem, 200, "No users found") }
            { this.renderListItem("popular-stataz", this.props.lists.popularStatus, StatusCountItem, 200, "No users found") }
          </div>
        </div>
      </MainContent>
    )
  }
}

HomeSection.propTypes = {
  user: PropTypes.object.isRequired,
  authentication: PropTypes.object.isRequired,
  onSignUpClick: PropTypes.func.isRequired,
  lists: PropTypes.object.isRequired
}
