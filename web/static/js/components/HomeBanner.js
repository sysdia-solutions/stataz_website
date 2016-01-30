import React, { Component, PropTypes } from 'react'
import UserCreate from './UserCreate'
import UserStatus from './UserStatus'

export default class HomeBanner extends Component {
  renderUserBlock() {
    if (this.props.user.details && this.props.user.details.username) {
      return (
        <UserStatus
          username={this.props.user.details.username}
          statusHistory={this.props.user.details.status_history} 
          fullHistory={false} />
      )
    } else {
      return (
        <UserCreate
          authenticated={this.props.authentication.isAuthenticated}
          processed={this.props.authentication.hasProcessed}
          usernameErrors={this.props.authentication.errors.username}
          passwordErrors={this.props.authentication.errors.password}
          emailErrors={this.props.authentication.errors.email}
          onSignUpClick={this.props.onSignUpClick} />
      )
    }
  }

  render() {
    return (
      <div className="jumbotron home-block">
        <div className="row">
          <div className="col-md-8">
            <h1>Hello</h1>
          </div>
          <div className="col-md-4 data-block">
            {this.renderUserBlock()}
          </div>
        </div>
      </div>
    )
  }
}

HomeBanner.propTypes = {
  user: PropTypes.object.isRequired,
  authentication: PropTypes.object.isRequired,
  onSignUpClick: PropTypes.func.isRequired
}
