import React, { Component } from 'react'
import Navbar from '../containers/Navbar'

export default class Layout extends Component {
  render() {
    return (
      <div>
        <Navbar history={this.props.history}/>
        <div className="container content">
          { this.props.children }
        </div>
      </div>
    )
  }
}
