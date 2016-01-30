import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as userActions from '../actions/UserActions'
import * as profileActions from '../actions/ProfileActions'
import * as Storage from '../utils/Storage'

import MainContent from '../components/MainContent'
import UserStatus from '../components/UserStatus'
import StatusManager from '../components/StatusManager'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.handleSetStatus = this.handleSetStatus.bind(this)
    this.handleDeleteStatus = this.handleDeleteStatus.bind(this)
    this.handleAddStatus = this.handleAddStatus.bind(this)
    this.handleAddStatusType = this.handleAddStatusType.bind(this)
  }

  handleSetStatus(id) {
    var token = Storage.loadAccessToken()
    this.props.dispatch(userActions.setUserStatus(id, token.token_type, token.access_token))
  }

  handleDeleteStatus(id) {
    var token = Storage.loadAccessToken()
    this.props.dispatch(userActions.deleteUserStatus(id, token.token_type, token.access_token))
  }

  handleAddStatus(text) {
    var token = Storage.loadAccessToken()
    this.props.dispatch(userActions.addUserStatus(text, token.token_type, token.access_token))
  }

  handleAddStatusType(text) {
    this.props.dispatch(profileActions.addStatusFieldOnChange(text))
  }

  hasUserChanged(oldProps, newProps) {
    return (oldProps.params.username != newProps.params.username)
  }

  hasStatusChanged(oldProps, newProps) {
    return (newProps.userStatus.isStale && !oldProps.userStatus.isStale)
  }

  isUserProfile() {
    return (this.props.user.details &&
            this.props.user.details.username === this.props.params.username)
  }

  isProfileValid() {
    return (this.props.profile.details &&
            this.props.profile.details.statuses instanceof Array)
  }

  fetchProfile(username) {
    this.props.dispatch(profileActions.fetchProfile(username))
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
    this.fetchProfile(this.props.params.username)

    var token = Storage.loadAccessToken()
    this.getUserDetails(token)
    this.getUserStatuses(token)
  }

  componentDidMount() {
    this.refreshState()
  }

  componentWillUpdate(nextProps) {
    if (this.hasUserChanged(this.props, nextProps)) {
      this.refreshState()
    }
  }

  componentDidUpdate(prevProps) {
    if (this.hasStatusChanged(prevProps, this.props)) {
      this.refreshState()
    }
  }

  renderUserStatus(withUpdate) {
    var colSize = (withUpdate ? "col-md-8" : "col-md-12")
    return (
      <div className={colSize}>
        <UserStatus
          username={this.props.params.username}
          statusHistory={this.props.profile.details.statuses}
          fullHistory={true}/>
      </div>
    )
  }

  renderUpdateStatus(allowed) {
    if (allowed && this.props.userStatus.details.statuses) {
      return (
        <div className="col-md-4">
          <StatusManager
            statuses={this.props.userStatus.details.statuses}
            elementStatus={this.props.addStatusField}
            onSetStatusClick={this.handleSetStatus}
            onDeleteStatusClick={this.handleDeleteStatus}
            onAddStatusClick={this.handleAddStatus}
            onAddStatusType={this.handleAddStatusType} />
        </div>
      )
    }
    return
  }

  renderProfile() {
    if (this.isProfileValid()) {
      return (
        <div className="row">
          {this.renderUserStatus(this.isUserProfile())}
          {this.renderUpdateStatus(this.isUserProfile())}
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
        <div>fetching</div>
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
    addStatusField: state.profileReducer.addStatusField
  }
}

export default connect(mapStateToProps)(Profile)
