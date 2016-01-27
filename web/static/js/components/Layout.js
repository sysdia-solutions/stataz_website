import React, { Component } from 'react'
import Navbar from '../containers/Navbar'

export default class Layout extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="container content">
          { this.props.children }
        </div>
      </div>
    )
  }
}
