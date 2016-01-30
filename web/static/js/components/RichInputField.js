import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

export default class RichInputField extends Component {
  renderAddonIcon(type) {
    if (type && type !== "") {
    var addonIconClass = "fa fa-lg fa-fw " + type
      return (
        <span className="input-group-addon"><i className={addonIconClass}/></span>
      )
    }
    return
  }

  render() {
    var formGroupClass = classNames({
      "rich-input-field": true,
      "form-group": true,
      "has-feedback": this.props.hasFeedback
    })

    formGroupClass += " " + this.props.feedbackType

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
          {this.renderAddonIcon(this.props.addonIcon)}
          <input
            ref={this.props.name}
            type={this.props.inputType}
            className="form-control"
            aria-describedby={"field_" + this.props.name}
            placeholder={this.props.placeholder}
            maxLength={this.props.maxLength}
            onChange={() => this.handleOnChange()}/>
        </div>
        <span id={"field_" + this.props.name} className="help-block">{this.props.helptext}</span>
        <span className={feedbackIconClass} aria-hidden="true"></span>
      </div>
    )
  }

  handleOnChange() {
    if (this.props.onTextChange) {
      const text = this.refs[this.props.name].value.trim()
      this.props.onTextChange(text)
    }
  }
}

RichInputField.propTypes = {
  name: PropTypes.string.isRequired,
  inputType: PropTypes.string.isRequired,
  addonIcon: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  helptext: PropTypes.string.isRequired,
  hasFeedback: PropTypes.bool,
  feedbackType: PropTypes.string,
  maxLength: PropTypes.number,
  onTextChange: PropTypes.func
}
