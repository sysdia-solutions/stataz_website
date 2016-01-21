import React, { Component, PropTypes } from 'react'
import UserSignIn from './UserSignIn'
import UserSnippet from './UserSnippet'

export default class Navbar extends Component {
  renderUserArea() {
    if (this.props.user.details && this.props.user.details.username) {
      return (
        <UserSnippet
          username={this.props.user.details.username}
          email={this.props.user.details.email}
          onSignOutClick={this.props.onSignOutClick} />
      )
    }
    else {
      return (
        <UserSignIn
          authenticated={this.props.authentication.isAuthenticated}
          processing={this.props.authentication.isProcessing}
          processed={this.props.authentication.hasProcessed}
          failed={this.props.authentication.hasFailed}
          onSignInClick={this.props.onSignInClick} />
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
            <a className="navbar-brand" href="#">
              <img src="images/stataz_logo.png" alt="Stataz" title="Stataz"/>
            </a>
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
  user: PropTypes.object.isRequired,
  onSignInClick: PropTypes.func.isRequired,
  onSignOutClick: PropTypes.func.isRequired
}
