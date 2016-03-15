import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as userActions from '../actions/UserActions'
import * as profileActions from '../actions/ProfileActions'
import * as Storage from '../utils/Storage'

import ProfileSection from '../components/ProfileSection'

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

  refreshState(refreshFollows) {
    this.fetchProfile(this.props.params.username.toLowerCase())

    var token = Storage.loadAccessToken()
    this.getUserDetails(token)
    this.getUserStatuses(token)
    if (!this.isUserProfile() || refreshFollows) {
      this.fetchProfileFollow(this.props.params.username.toLowerCase(), token)
    }
  }

  componentDidMount() {
    this.refreshState(true)
  }

  componentDidUpdate(prevProps) {
    var userChanged = this.hasUserChanged(prevProps, this.props)
    var statusChanged = this.hasStatusChanged(prevProps, this.props)
    if (userChanged || statusChanged) {
      this.refreshState(!statusChanged)
    }
  }

  render() {
    return (
      <ProfileSection username={this.props.params.username}
                      user={this.props.user}
                      profile={this.props.profile}
                      userStatus={this.props.userStatus}
                      follows={this.props.follows}
                      addStatusField={this.props.addStatusField}
                      handleSetStatus={this.handleSetStatus}
                      handleConfirmDeleteStatusModal={this.handleConfirmDeleteStatusModal}
                      handleDeleteStatus={this.handleDeleteStatus}
                      handleAddStatus={this.handleAddStatus}
                      handleAddStatusType={this.handleAddStatusType}
                      statusDeleteModal={this.props.statusDeleteModal}
                      handleHideDeleteStatusModal={this.handleHideDeleteStatusModal}
                      handleFollowClick={this.handleFollowClick}
                      handleUnfollowClick={this.handleUnfollowClick} />

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
