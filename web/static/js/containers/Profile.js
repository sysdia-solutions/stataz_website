import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as profileActions from '../actions/ProfileActions'

import MainContent from '../components/MainContent'
import UserStatus from '../components/UserStatus'

class Profile extends Component {
  constructor(props) {
    super(props)
  }

  fetchProfile(username) {
    this.props.dispatch(profileActions.fetchProfile(username))
  }

  hasUserChanged(oldProps, newProps) {
    return (oldProps.params.username != newProps.params.username)
  }

  componentDidMount() {
    this.fetchProfile(this.props.params.username)
  }

  componentWillUpdate(nextProps) {
    if (this.hasUserChanged(this.props, nextProps)) {
      this.fetchProfile(nextProps.params.username)
    }
  }

  isProfileValid() {
    return (this.props.profile.details &&
            this.props.profile.details.statuses instanceof Array)
  }

  renderProfile() {
    if (this.isProfileValid()) {
      return (
        <UserStatus
          username={this.props.params.username}
          status_history={this.props.profile.details.statuses} 
          full_history={true}/>
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
    profile: state.profileReducer.profileDetails
  }
}

export default connect(mapStateToProps)(Profile)
