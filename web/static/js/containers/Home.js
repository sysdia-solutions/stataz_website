import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as userActions from '../actions/UserActions'

import MainContent from '../components/MainContent'
import HomeBanner from '../components/HomeBanner'

class Home extends Component {
  constructor(props) {
    super(props)
    this.handleSignUp = this.handleSignUp.bind(this)
  }

  handleSignUp(username, password, email) {
    this.props.dispatch(userActions.signUpUser(username, password, email))
  }

  render() {
    return (
      <MainContent>
        <HomeBanner
          user = { this.props.user }
          authentication = { this.props.authentication }
          onSignUpClick = { this.handleSignUp } />
      </MainContent>
    )
  }
}

Home.propTypes = {
  authentication: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    user: state.userReducer.userDetails,
    authentication: state.userReducer.userAuth
  }
}

export default connect(mapStateToProps)(Home)
