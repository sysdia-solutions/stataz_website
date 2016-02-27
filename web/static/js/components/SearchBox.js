import React, { Component, PropTypes } from 'react'

export default class SearchBox extends Component {
  render() {
    return (
      <form className="search-box navbar-form navbar-left">
        <div className="input-group">
          <input type="text" ref="query" className="form-control" placeholder="Search for..." />
          <span className="input-group-btn">
            <button className="btn btn-info" onClick={(e) => this.handleClick(e)}>
              <i className="fa fa-search" />
            </button>
          </span>
        </div>
      </form>
    )
  }

  handleClick(e) {
    e.preventDefault()
      const query = this.refs.query.value.trim()
      this.refs.query.value = ""
      this.props.onSearchClick(query)
  }
}

SearchBox.propTypes = {
  onSearchClick: PropTypes.func.isRequired
}
