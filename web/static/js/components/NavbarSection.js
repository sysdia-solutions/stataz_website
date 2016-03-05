import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import UserSignIn from './UserSignIn'
import UserSnippet from './UserSnippet'
import SearchBox from './SearchBox'

export default class NavbarSection extends Component {
  isUsernameSet() {
    return (this.props.user.details && this.props.user.details.username)
  }

  renderUserArea() {
    if (this.isUsernameSet()) {
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
    return(
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
            <SearchBox onSearchClick={this.props.onSearchClick}/>
          </div>
        </div>
      </nav>
    )
  }
}

NavbarSection.propTypes = {
  user: PropTypes.object.isRequired,
  authentication: PropTypes.object.isRequired,
  onSearchClick: PropTypes.func.isRequired,
  onSignOutClick: PropTypes.func.isRequired,
  onSignInClick: PropTypes.func.isRequired
}
