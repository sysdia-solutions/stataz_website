import React, { Component } from 'react'

export default class MainContent extends Component {
  render() {
    return (
      <div>
        { this.props.children }
      </div>
    )
  }
}
