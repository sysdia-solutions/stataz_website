import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import * as userActions from '../actions/UserActions'
import * as Storage from '../utils/Storage'

import UserSignIn from '../components/UserSignIn'
import UserSnippet from '../components/UserSnippet'

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.handleSignIn = this.handleSignIn.bind(this)
    this.handleSignOut = this.handleSignOut.bind(this)
  }

  getUserDetails() {
    var token = Storage.loadAccessToken()
    this.props.dispatch(userActions.getUserDetails(token.token_type, token.access_token))
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

  renderUserArea() {
    if (this.props.user.details && this.props.user.details.username) {
      return (
        <UserSnippet
          username={this.props.user.details.username}
          email={this.props.user.details.email}
          onSignOutClick={this.handleSignOut} />
      )
    }
    else {
      return (
        <UserSignIn
          authenticated={this.props.authentication.isAuthenticated}
          processing={this.props.authentication.isProcessing}
          processed={this.props.authentication.hasProcessed}
          failed={this.props.authentication.hasFailed}
          onSignInClick={this.handleSignIn} />
      )
    }
  }

  render() {
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to="/">
              <img src="/images/stataz_logo.png" alt="Stataz" title="Stataz"/>
            </Link>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            {this.renderUserArea()}
          </div>
        </div>
      </nav>
    )
  }
}

Navbar.propTypes = {
  authentication: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    user: state.userReducer.userDetails,
    authentication: state.userReducer.userAuth
  }
}

export default connect(mapStateToProps)(Navbar)
