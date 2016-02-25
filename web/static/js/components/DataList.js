import React, { Component, PropTypes, createElement } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

export default class DataList extends Component {
  renderItem(data, index) {
    return createElement(this.props.itemElement, {key: index, id: index, data: data})
  }

  renderNoData(count) {
    if (count === 0) {
      return (
        <li className="no-data">{this.props.noDataMessage}</li>
      )
    }
  }

  render() {
    return (
      <div className="data-list">
        <h1>{this.props.title}</h1>
        <Scrollbars style={{ height: this.props.contentHeight }} className="items-scroll">
          <ul>
            {
              this.props.data.map((result, index) => {
                return (
                  this.renderItem(result, index)
                )
              })
            }
            { this.renderNoData(this.props.data.length) }
          </ul>
        </Scrollbars>
      </div>
    )
  }
}

DataList.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  contentHeight: PropTypes.number.isRequired,
  itemElement: PropTypes.func.isRequired,
  noDataMessage: PropTypes.string.isRequired
}
