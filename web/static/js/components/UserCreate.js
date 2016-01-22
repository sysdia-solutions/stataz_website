import React, { Component, PropTypes } from 'react'
import RichInputField from './RichInputField'

export default class UserCreate extends Component {
  render() {
    return (
      <form>
        <RichInputField name="username" inputType="text" addonIcon="fa-user" placeholder="Enter a username"
                        helptext="" hasFeedback={true} feedbackType="" />
        <RichInputField name="password" inputType="password" addonIcon="fa-asterisk" placeholder="Enter a password"
                        helptext="" hasFeedback={true} feedbackType="" />
        <RichInputField name="email" inputType="email" addonIcon="fa-envelope" placeholder="Enter your email address"
                        helptext="" hasFeedback={true} feedbackType="" />
        <button className="btn btn-lg btn-primary pull-right" type="submit">Sign up for stataz</button>
      </form>
    )
  }
}

UserCreate.propTypes = {
}
