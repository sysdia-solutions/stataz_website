import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as searchActions from '../actions/SearchActions'

import SearchSection from '../components/SearchSection'

class Search extends Component {
  constructor(props) {
    super(props)
  }

  refreshResults(query) {
    this.props.dispatch(searchActions.searchUser(query))
    this.props.dispatch(searchActions.searchStatus(query))
  }

  componentWillMount() {
    this.refreshResults(this.props.params.query)
  }

  componentWillUpdate(nextProps) {
    if (this.props.params.query != nextProps.params.query) {
      this.refreshResults(nextProps.params.query)
    }
  }

  render() {
    return (
      <SearchSection isFetching={this.props.results.isFetching}
                     query={this.props.params.query}
                     userResults={this.props.results.userResults}
                     statusResults={this.props.results.statusResults} />
    )
  }
}

Search.propTypes = {
  results: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    results: state.searchReducer.searchResults
  }
}

export default connect(mapStateToProps)(Search)
