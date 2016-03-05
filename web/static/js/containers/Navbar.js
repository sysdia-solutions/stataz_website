import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as userActions from '../actions/UserActions'
import * as Storage from '../utils/Storage'

import NavbarSection from '../components/NavbarSection'

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.handleSignIn = this.handleSignIn.bind(this)
    this.handleSignOut = this.handleSignOut.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  getUserDetails() {
    var token = Storage.loadAccessToken()
    this.props.dispatch(userActions.getUserDetails(token.token_type, token.access_token))
    this.props.dispatch(userActions.getUserStatus(token.token_type, token.access_token))
  }

  userHasLoggedIn(oldProps, newProps) {
    return (!oldProps.authentication.isAuthenticated && newProps.authentication.isAuthenticated)
  }

  userHasLoggedOut(oldProps, newProps) {
    return (oldProps.authentication.isAuthenticated && !newProps.authentication.isAuthenticated)
  }

  componentDidMount() {
    var token = Storage.loadAccessToken()
    this.props.dispatch(userActions.authCheckUser(token.token_type, token.access_token))
  }

  componentWillUpdate(nextProps) {
    if (this.userHasLoggedIn(this.props, nextProps)) {
      Storage.saveAccessToken(nextProps.authentication.access_token)
      this.getUserDetails()
    }

    if (this.userHasLoggedOut(this.props, nextProps)) {
      Storage.deleteAccessToken()
      this.getUserDetails()
    }
  }

  handleSignIn(username, password) {
    this.props.dispatch(userActions.signInUser(username, password))
  }

  handleSignOut() {
    var token = Storage.loadAccessToken()
    this.props.dispatch(userActions.signOutUser(token.token_type, token.access_token))
  }

  handleSearch(query) {
    if (query.length > 0) {
      this.props.history.pushState(null, "/search/" + query)
    }
  }

  render() {
    return (
      <NavbarSection user={this.props.user}
                     authentication={this.props.authentication}
                     onSearchClick={this.handleSearch}
                     onSignOutClick={this.handleSignOut}
                     onSignInClick={this.handleSignIn} />
    )
  }
}

Navbar.propTypes = {
  authentication: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  history: PropTypes.object
}

function mapStateToProps(state) {
  return {
    user: state.userReducer.userDetails,
    authentication: state.userReducer.userAuth
  }
}

export default connect(mapStateToProps)(Navbar)
