import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as userActions from '../actions/UserActions'
import Navbar from '../components/Navbar'
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
  }

  componentDidMount() {
    var token = Storage.loadAccessToken()
    this.props.dispatch(userActions.authCheckUser(token.token_type, token.access_token))
  }

  componentWillUpdate(nextProps) {
    if (!this.props.authentication.isAuthenticated && nextProps.authentication.isAuthenticated) {
      Storage.saveAccessToken(nextProps.authentication.access_token)
      this.getUserDetails()
    }

    if (this.props.authentication.isAuthenticated && !nextProps.authentication.isAuthenticated) {
      Storage.deleteAccessToken()
      this.getUserDetails()
    }
  }

  render() {
    const { dispatch, user, authentication } = this.props
    return (
      <div>
        <Navbar
          user = { user }
          authentication = { authentication }
          onSignInClick = { this.handleSignIn }
          onSignOutClick = { this.handleSignOut } />
      </div>
    )
  }
}

App.propTypes = {
  user: PropTypes.object.isRequired,
  authentication: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    user: state.userDetails,
    authentication: state.userAuth
  }
}

export default connect(mapStateToProps)(App)
