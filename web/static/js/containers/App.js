import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as userActions from '../actions/UserActions'
import Navbar from '../components/Navbar'
import HomeBanner from '../components/HomeBanner'
import * as Storage from '../utils/Storage'

class App extends Component {
  constructor(props) {
    super(props)
    this.handleSignIn = this.handleSignIn.bind(this)
    this.handleSignOut = this.handleSignOut.bind(this)
  }

  handleSignIn(username, password) {
    this.props.dispatch(userActions.signInUser(username, password))
  }

  handleSignOut() {
    var token = Storage.loadAccessToken()
    this.props.dispatch(userActions.signOutUser(token.token_type, token.access_token))
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

  render() {
    const { dispatch, user, authentication, userStatuses } = this.props
    return (
      <div>
        <Navbar
          user = { user }
          authentication = { authentication }
          onSignInClick = { this.handleSignIn }
          onSignOutClick = { this.handleSignOut } />
        <div className="container content">
          <HomeBanner user = { user } />
        </div>
      </div>
    )
  }
}

App.propTypes = {
  user: PropTypes.object.isRequired,
  statusList: PropTypes.arrayOf(PropTypes.object),
  authentication: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    user: state.userDetails,
    authentication: state.userAuth,
    userStatuses: state.userStatus
  }
}

export default connect(mapStateToProps)(App)
