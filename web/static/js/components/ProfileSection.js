import React, { Component, PropTypes } from 'react'

import MainContent from './MainContent'
import UserStatus from './UserStatus'
import StatusManager from './StatusManager'
import DataList from './DataList'
import UserStatusItem from './UserStatusItem'
import PendingBlock from './PendingBlock'

export default class ProfileSection extends Component {
  isUserProfile() {
    return (this.props.user.details && this.props.user.details.username &&
            this.props.user.details.username.toLowerCase() === this.props.username.toLowerCase())
  }

  isProfileValid() {
    return (this.props.profile.details &&
            this.props.profile.details.statuses instanceof Array)
  }

  isUserFollowing() {
    if (! this.props.user.details ||
        ! this.props.follows.data ||
        ! this.props.follows.data.followers) {
      return false
    }

    var currentUser = (this.props.user.details.username ? this.props.user.details.username.toLowerCase() : "")
    return (this.props.follows.data.followers.some((follower) => {
              return (follower.username.toLowerCase() === currentUser)
            }))
  }

  isUserSignedIn() {
    return (this.props.user.details && this.props.user.details.username !== undefined)
  }

  renderUserStatus(withUpdate) {
    var className = "profile-block section-block " + (withUpdate ? "col-md-8" : "col-md-12")

    if (this.props.profile.isFetching) {
      return (
        <div className={className}>
          <PendingBlock height="302px" fontSize="32px" />
        </div>
      )
    } else {
      var profileUsername = (this.props.profile.details.statuses.length > 0 ? this.props.profile.details.statuses[0].username : "")
      return (
        <div className={className}>
          <UserStatus
            username={profileUsername}
            statusHistory={this.props.profile.details.statuses}
            fullHistory={true}
            isFollowing={this.isUserFollowing()}
            isUser={this.isUserProfile()}
            isAuthenticated={this.isUserSignedIn()}
            onFollowClick={this.props.handleFollowClick}
            onUnfollowClick={this.props.handleUnfollowClick} />
        </div>
      )
    }
  }

  renderUpdateStatus(allowed) {
    if (allowed && this.props.userStatus.details.statuses) {
      return (
        <div className="status-manager-block section-block col-md-4">
          <StatusManager
            statuses={this.props.userStatus.details.statuses}
            elementStatus={this.props.addStatusField}
            onSetStatusClick={this.props.handleSetStatus}
            onConfirmDeleteStatusClick={this.props.handleConfirmDeleteStatusModal}
            onDeleteStatusClick={this.props.handleDeleteStatus}
            onAddStatusClick={this.props.handleAddStatus}
            onAddStatusType={this.props.handleAddStatusType}
            deleteModalData={this.props.statusDeleteModal}
            closeDeleteConfirmModal={this.props.handleHideDeleteStatusModal}
            isProfileFetching={this.props.profile.isFetching}
            />
        </div>
      )
    }
    return
  }

  renderFollowBlock(type) {
    if (!this.props.follows.data || this.props.follows.isFetching) {
      return (
        <PendingBlock height="260px" fontSize="32px" />
      )
    } else {
      var sortedData = (this.props.follows.data ? this.props.follows.data[type] : [])

      if (sortedData.length > 0) {
        sortedData = this.props.follows.data[type].sort((a, b) => {
          return a.since - b.since
        })
      }
      return (
        <DataList title={type}
                  data={sortedData}
                  contentHeight={200}
                  itemElement={UserStatusItem}
                  noDataMessage="No users found" />
      )
    }
  }

  renderTopRow() {
    return (
      <div className="row">
        {this.renderUserStatus(this.isUserProfile())}
        {this.renderUpdateStatus(this.isUserProfile())}
      </div>
    )
  }

  renderBottomRow() {
    return (
      <div className="row">
        <div className="section-block follow-block following-block col-md-6">
          {this.renderFollowBlock("following")}
        </div>
        <div className="section-block follow-block followers-block col-md-6">
          {this.renderFollowBlock("followers")}
        </div>
      </div>
    )
  }

  renderProfile() {
    if (this.props.profile.isFetching || this.isProfileValid()) {
      return (
        <div>
          {this.renderTopRow()}
          {this.renderBottomRow()}
        </div>
      )
    } else {
      return (
        this.renderUserNotFound()
      )
    }
  }

  renderUserNotFound() {
    return (
      <div className="section-block invalid-user-block">
        <h1>Sorry, we can't find that user</h1>
      </div>
    )
  }

  render() {
    return(
      <MainContent>
        <div className="page-section profile-section">
          {this.renderProfile()}
        </div>
      </MainContent>
    )
  }
}

ProfileSection.propTypes = {
  username: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  userStatus: PropTypes.object.isRequired,
  follows: PropTypes.object.isRequired,
  addStatusField: PropTypes.object.isRequired,
  handleSetStatus: PropTypes.func.isRequired,
  handleConfirmDeleteStatusModal: PropTypes.func.isRequired,
  handleDeleteStatus: PropTypes.func.isRequired,
  handleAddStatus: PropTypes.func.isRequired,
  handleAddStatusType: PropTypes.func.isRequired,
  statusDeleteModal: PropTypes.object.isRequired,
  handleHideDeleteStatusModal: PropTypes.func.isRequired,
  handleFollowClick: PropTypes.func.isRequired,
  handleUnfollowClick: PropTypes.func.isRequired
}
