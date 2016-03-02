import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as userActions from '../actions/UserActions'
import * as profileActions from '../actions/ProfileActions'
import * as Storage from '../utils/Storage'

import MainContent from '../components/MainContent'
import UserStatus from '../components/UserStatus'
import StatusManager from '../components/StatusManager'
import DataList from '../components/DataList'
import UserStatusItem from '../components/UserStatusItem'
import PendingBlock from '../components/PendingBlock'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.handleSetStatus = this.handleSetStatus.bind(this)
    this.handleDeleteStatus = this.handleDeleteStatus.bind(this)
    this.handleAddStatus = this.handleAddStatus.bind(this)
    this.handleAddStatusType = this.handleAddStatusType.bind(this)
    this.handleFollowClick = this.handleFollowClick.bind(this)
    this.handleUnfollowClick = this.handleUnfollowClick.bind(this)
    this.handleConfirmDeleteStatusModal = this.handleConfirmDeleteStatusModal.bind(this)
    this.handleHideDeleteStatusModal = this.handleHideDeleteStatusModal.bind(this)
  }

  handleSetStatus(id) {
    var token = Storage.loadAccessToken()
    this.props.dispatch(userActions.setUserStatus(id, token.token_type, token.access_token))
  }

  handleConfirmDeleteStatusModal(id, text) {
    this.props.dispatch(profileActions.confirmDeleteStatus(id, text))
  }

  handleHideDeleteStatusModal() {
    this.props.dispatch(profileActions.hideConfirmDeleteStatus())
  }

  handleDeleteStatus(id) {
    this.handleHideDeleteStatusModal()
    var token = Storage.loadAccessToken()
    this.props.dispatch(userActions.deleteUserStatus(id, token.token_type, token.access_token))
  }

  handleAddStatus(text) {
    var token = Storage.loadAccessToken()
    this.props.dispatch(userActions.addUserStatus(text, token.token_type, token.access_token))
  }

  handleFollowClick(username) {
    var token = Storage.loadAccessToken()
    this.props.dispatch(userActions.userFollow(username, token.token_type, token.access_token))
  }

  handleUnfollowClick(username) {
    var token = Storage.loadAccessToken()
    this.props.dispatch(userActions.userUnfollow(username, token.token_type, token.access_token))
  }

  handleAddStatusType(text) {
    this.props.dispatch(profileActions.addStatusFieldOnChange(text))
  }

  hasUserChanged(oldProps, newProps) {
    return (oldProps.params.username.toLowerCase() != newProps.params.username.toLowerCase())
  }

  hasStatusChanged(oldProps, newProps) {
    return (newProps.userStatus.isStale && !oldProps.userStatus.isStale)
  }

  isUserProfile() {
    return (this.props.user.details && this.props.user.details.username &&
            this.props.user.details.username.toLowerCase() === this.props.params.username.toLowerCase())
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

  fetchProfile(username) {
    this.props.dispatch(profileActions.fetchProfile(username))
  }

  fetchProfileFollow(username, token) {
    if (this.isUserProfile()) {
      this.props.dispatch(profileActions.fetchUserFollow(token.token_type, token.access_token))
    } else {
      this.props.dispatch(profileActions.fetchProfileFollow(username))
    }
  }

  getUserDetails(token) {
    this.props.dispatch(userActions.getUserDetails(token.token_type, token.access_token))
    this.props.dispatch(userActions.authCheckUser(token.token_type, token.access_token))
  }

  getUserStatuses(token) {
    this.props.dispatch(userActions.getUserStatus(token.token_type, token.access_token))
    this.props.dispatch(profileActions.addStatusFieldOnChange(""))
  }

  refreshState() {
    this.fetchProfile(this.props.params.username.toLowerCase())

    var token = Storage.loadAccessToken()
    this.getUserDetails(token)
    this.getUserStatuses(token)
    this.fetchProfileFollow(this.props.params.username.toLowerCase(), token)
  }

  componentDidMount() {
    this.refreshState()
  }

  componentDidUpdate(prevProps) {
    if (this.hasUserChanged(prevProps, this.props) ||
        this.hasStatusChanged(prevProps, this.props)) {
      this.refreshState()
    }
  }

  renderUserStatus(withUpdate) {
    var className = "profile-block section-block " + (withUpdate ? "col-md-8" : "col-md-12")
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
          onFollowClick={this.handleFollowClick}
          onUnfollowClick={this.handleUnfollowClick} />
      </div>
    )
  }

  renderUpdateStatus(allowed) {
    if (allowed && this.props.userStatus.details.statuses) {
      return (
        <div className="status-manager-block section-block col-md-4">
          <StatusManager
            statuses={this.props.userStatus.details.statuses}
            elementStatus={this.props.addStatusField}
            onSetStatusClick={this.handleSetStatus}
            onConfirmDeleteStatusClick={this.handleConfirmDeleteStatusModal}
            onDeleteStatusClick={this.handleDeleteStatus}
            onAddStatusClick={this.handleAddStatus}
            onAddStatusType={this.handleAddStatusType}
            deleteModalData={this.props.statusDeleteModal}
            closeDeleteConfirmModal={this.handleHideDeleteStatusModal}
            />
        </div>
      )
    }
    return
  }

  renderFollowBlock(type) {
    if (!this.props.follows.data || this.props.follows.isFetching) {
      return (
        <PendingBlock height="360px" fontSize="32px" />
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

  renderProfile() {
    if (this.isProfileValid()) {
      return (
        <div className="page-section profile-section">
          <div className="row">
            {this.renderUserStatus(this.isUserProfile())}
            {this.renderUpdateStatus(this.isUserProfile())}
          </div>
          <div className="row">
            <div className="section-block follow-block following-block col-md-6">
              {this.renderFollowBlock("following")}
            </div>
            <div className="section-block follow-block followers-block col-md-6">
              {this.renderFollowBlock("followers")}
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div>Cannot find user</div>
      )
    }
  }

  renderPage() {
    if (this.props.profile.isFetching) {
      return (
        <PendingBlock height="363px" fontSize="32px" />
      )
    } else {
      return (
        this.renderProfile()
      )
    }
  }

  render() {
    return (
      <MainContent>
        {this.renderPage()}
      </MainContent>
    )
  }
}

Profile.propTypes = {
  user: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    user: state.userReducer.userDetails,
    profile: state.profileReducer.profileDetails,
    userStatus: state.userReducer.userStatus,
    addStatusField: state.profileReducer.addStatusField,
    follows: state.profileReducer.profileFollowDetails,
    statusDeleteModal: state.profileReducer.confirmDeleteModal
  }
}

export default connect(mapStateToProps)(Profile)
