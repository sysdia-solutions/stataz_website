import React, { Component, PropTypes } from 'react'

import MainContent from './MainContent'
import PendingBlock from './PendingBlock'
import DataList from './DataList'
import UserStatusItem from './UserStatusItem'

export default class SearchSection extends Component {
  renderPendingBlock() {
    return (
      <div className="col-md-12">
        <PendingBlock height="363px" fontSize="32px" />
      </div>
    )
  }

  renderResultList(type, data, itemElement, height, emptyMessage) {
    var classString = "col-md-6 section-block " + type.toLowerCase() + "-search-block"
    var title = type.ucfirst() + " results"
    return (
      <div className={classString}>
        <DataList title={title}
                  data={data}
                  contentHeight={height}
                  itemElement={itemElement}
                  noDataMessage={emptyMessage} />
      </div>
    )
  }

  renderResultsRow() {
    if (this.props.isFetching) {
      return (
        <div className="row">
          { this.renderPendingBlock() }
        </div>
      )
    } else {
      return (
        <div className="row">
          { this.renderResultList("user", this.props.userResults, UserStatusItem, 200, "No users match the query") }
          { this.renderResultList("stataz", this.props.statusResults, UserStatusItem, 200, "No stataz match the query") }
        </div>
      )
    }
  }

  renderTitle(title) {
    return (
      <h1>Displaying results for '{title}'</h1>
    )
  }

  render() {
    return(
      <MainContent>
        <div className="page-section search-section">

          <div className="row">
            <div className="col-md-12 section-block search-results-block">
              { this.renderTitle(this.props.query) }
            </div>
          </div>

          { this.renderResultsRow() }
        </div>
      </MainContent>
    )
  }
}

SearchSection.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  query: PropTypes.string.isRequired,
  userResults: PropTypes.array.isRequired,
  statusResults: PropTypes.array.isRequired
}
