import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

export default class UserSignIn extends Component {
  renderSignInForm() {
    if (!this.props.processed || this.props.authenticated) {
      return
    }
    var groupClass = classNames({
      "form-group": true,
      "has-error": this.props.failed,
      "has-feedback": this.props.failed
    })
    return (
      <form className="navbar-form navbar-right">
        <div className={groupClass}>
          <input type="text" ref="username" className="form-control" placeholder="Enter your username" />
          <span className="fa fa-times fa-lg form-control-feedback" aria-hidden="true"></span>
        </div>
        <div className={groupClass}>
          <input type="password" ref="password" className="form-control" placeholder="Enter your password" />
          <span className="fa fa-times fa-lg form-control-feedback" aria-hidden="true"></span>
        </div>
        <button onClick={(e) => this.handleClick(e)} className="btn btn-primary">Sign in</button>
      </form>
    )
  }

  render() {
    return (
      <div>
        {this.renderSignInForm()}
      </div>
    )
  }

  handleClick(e) {
    e.preventDefault()
    const username = this.refs.username.value.trim()
    const password = this.refs.password.value.trim()
    this.props.onSignInClick(username, password)
  }
}

UserSignIn.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  processing: PropTypes.bool.isRequired,
  processed: PropTypes.bool.isRequired,
  failed: PropTypes.bool.isRequired,
  onSignInClick: PropTypes.func.isRequired
}
