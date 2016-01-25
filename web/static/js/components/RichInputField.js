import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

export default class RichInputField extends Component {
  render() {
    var formGroupClass = classNames({
      "rich-input-field": true,
      "form-group": true,
      "has-feedback": this.props.hasFeedback
    })

    formGroupClass += " " + this.props.feedbackType

    var addonIconClass = "fa fa-lg fa-fw " + this.props.addonIcon

    var feedbackIcons = {
      "": "",
      "has-success": "fa-check",
      "has-warning": "fa-warning",
      "has-error": "fa-times"
    }

    var feedbackIconClass = "fa fa-lg form-control-feedback " + feedbackIcons[this.props.feedbackType]

    return (
      <div className={formGroupClass}>
        <div className="input-group">
          <span className="input-group-addon"><i className={addonIconClass}/></span>
          <input
            ref={this.props.name}
            type={this.props.inputType}
            className="form-control"
            aria-describedby={"create" + this.props.name}
            placeholder={this.props.placeholder} />
        </div>
        <span id={"create" + this.props.name} className="help-block">{this.props.helptext}</span>
        <span className={feedbackIconClass} aria-hidden="true"></span>
      </div>
    )
  }
}

RichInputField.propTypes = {
  name: PropTypes.string.isRequired,
  inputType: PropTypes.string.isRequired,
  addonIcon: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  helptext: PropTypes.string.isRequired,
  hasFeedback: PropTypes.bool,
  feedbackType: PropTypes.string
}
