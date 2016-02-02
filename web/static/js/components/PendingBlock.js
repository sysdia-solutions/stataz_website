import React, { Component, PropTypes } from 'react'

export default class PendingBlock extends Component {
  render() {
    var divStyle = {
      height: this.props.height,
      fontSize: this.props.fontSize
    }
    return (
      <div className="pending-block" style={divStyle}>
        <div className="spinner">
          <i className="fa fa-spinner fa-pulse" />
        </div>
      </div>
    )
  }
}

PendingBlock.propTypes = {
  height: PropTypes.string.isRequired,
  fontSize: PropTypes.string.isRequired
}
