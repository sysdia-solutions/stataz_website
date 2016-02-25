import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as searchActions from '../actions/SearchActions'

import MainContent from '../components/MainContent'
import PendingBlock from '../components/PendingBlock'
import DataList from '../components/DataList'
import UserStatusItem from '../components/UserStatusItem'

class Search extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.dispatch(searchActions.searchUser(this.props.params.query))
    this.props.dispatch(searchActions.searchStatus(this.props.params.query))
  }

  renderResults() {
    if (this.props.results.isFetching) {
      return (
        <div className="row">
          <div className="col-md-12">
            <PendingBlock height="363px" fontSize="32px" />
          </div>
        </div>
      )
    } else {
      return (
        <div className="row">
          <div className="col-md-6 section-block user-search-block">
            <DataList title="User results"
                      data={this.props.results.userResults}
                      contentHeight={200}
                      itemElement={UserStatusItem}
                      noDataMessage="No users match the query" />
          </div>
          <div className="col-md-6 section-block status-search-block">
            <DataList title="Stataz results"
                      data={this.props.results.statusResults}
                      contentHeight={200}
                      itemElement={UserStatusItem}
                      noDataMessage="No stataz match the query" />
          </div>
        </div>
      )
    }
  }

  render() {
    return (
      <MainContent>
        <div className="page-section search-section">
          <div className="row">
            <div className="col-md-12 section-block search-results-block">
              <h1>Displaying results for '{this.props.params.query}'</h1>
            </div>
          </div>
          { this.renderResults() }
        </div>
      </MainContent>
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
