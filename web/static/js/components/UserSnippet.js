import React, { Component, PropTypes } from 'react'
import Username from './Username'

export default class UserSnippet extends Component {
  render() {
    var gravitar = "https://www.gravatar.com/avatar/" + CryptoJS.MD5(this.props.email) + "?d=https://www.stataz.com/images/avatardefault.png&s=32"
    return (
      <div className="user-snippet navbar-right">
        <div className="user-details img-rounded">
          <img className="img-rounded" src={gravitar} />
          <Username username={this.props.username} />
          <a href="#" onClick={e=> {
            e.preventDefault()
            this.props.onSignOutClick()
          }} className="sign-out-btn btn btn-info" alt="Sign out" title="Sign out">
            <i className="fa fa-power-off fa-lg" />
          </a>
        </div>
      </div>
    )
  }
}

UserSnippet.propTypes = {
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  onSignOutClick: PropTypes.func.isRequired
}
