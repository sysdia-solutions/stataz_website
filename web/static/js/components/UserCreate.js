import React, { Component, PropTypes } from 'react'
import RichInputField from './RichInputField'

export default class UserCreate extends Component {
  getError(data) {
    if (data instanceof Array && data.length > 0) {
      return data[0]
    }
    return "."
  }

  inError(data) {
    if (this.getError(data) != ".") {
      return "has-error"
    }
    return ""
  }

  render() {
    if (!this.props.processed || this.props.authenticated) {
      return(<div/>)
    }

    return (
      <form>
        <RichInputField ref="username" name="username" inputType="text" addonIcon="fa-user"
                        placeholder="Enter a username" helptext={this.getError(this.props.usernameErrors)}
                        hasFeedback={true} feedbackType={this.inError(this.props.usernameErrors)} />
        <RichInputField ref="password" name="password" inputType="password" addonIcon="fa-asterisk"
                        placeholder="Enter a password" helptext={this.getError(this.props.passwordErrors)}
                        hasFeedback={true} feedbackType={this.inError(this.props.passwordErrors)} />
        <RichInputField ref="email" name="email" inputType="email" addonIcon="fa-envelope"
                        placeholder="Enter your email address" helptext={this.getError(this.props.emailErrors)}
                        hasFeedback={true} feedbackType={this.inError(this.props.emailErrors)} />
        <button onClick={(e) => this.handleClick(e)} className="btn btn-lg btn-primary pull-right" type="submit">
          Sign up for stataz
        </button>
      </form>
    )
  }

  handleClick(e) {
    e.preventDefault()
    const username = this.refs.username.refs.username.value.trim()
    const password = this.refs.password.refs.password.value.trim()
    const email = this.refs.email.refs.email.value.trim()
    this.props.onSignUpClick(username, password, email)
  }
}

UserCreate.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  processed: PropTypes.bool.isRequired,
  usernameErrors: PropTypes.array,
  passwordErrors: PropTypes.array,
  emailErrors: PropTypes.array,
  onSignUpClick: PropTypes.func.isRequired
}
