import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as userActions from '../actions/UserActions'
import * as listActions from '../actions/ListActions'

import HomeSection from '../components/HomeSection'

class Home extends Component {
  constructor(props) {
    super(props)
    this.handleSignUp = this.handleSignUp.bind(this)
  }

  handleSignUp(username, password, email) {
    this.props.dispatch(userActions.signUpUser(username, password, email))
  }

  componentWillMount() {
    this.props.dispatch(listActions.listNewUsers(10))
    this.props.dispatch(listActions.listNewStatus(10))
    this.props.dispatch(listActions.listPopularStatus(10))
  }

  render() {
    return (
      <HomeSection user={this.props.user}
                   authentication={this.props.authentication}
                   onSignUpClick={this.handleSignUp}
                   lists={this.props.lists} />
    )
  }
}

Home.propTypes = {
  authentication: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  lists: PropTypes.object
}

function mapStateToProps(state) {
  return {
    user: state.userReducer.userDetails,
    authentication: state.userReducer.userAuth,
    lists: state.listReducer.listDetails
  }
}

export default connect(mapStateToProps)(Home)
