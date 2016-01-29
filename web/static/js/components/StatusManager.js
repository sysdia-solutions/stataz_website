import React, { Component, PropTypes} from 'react'
import StatusManagerItem from './StatusManagerItem'

export default class StatusManager extends Component {
  render() {
    return (
      <div>
        <ul>
          {
            this.props.statuses.sort((a, b) => {
                return a.id - b.id
              }).map((result) => {
              return (
                <StatusManagerItem
                  key={result.id}
                  id={result.id}
                  description={result.description}
                  active={result.active}
                  onSetStatusClick={this.props.onSetStatusClick}
                  onDeleteStatusClick={this.props.onDeleteStatusClick} />
              )
            })
          }
        </ul>
      </div>
    )
  }
}

StatusManager.propTypes = {
  statuses: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSetStatusClick: PropTypes.func.isRequired,
  onDeleteStatusClick: PropTypes.func.isRequired
}
