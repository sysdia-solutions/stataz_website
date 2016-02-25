import { combineReducers } from 'redux'
import * as ActionTypes from '../constants/ActionTypes'

var defaultSearchState = {
  isFetching: false,
  userResults: [],
  statusResults: []
}

function searchResults(state = defaultSearchState, action) {
  switch(action.type) {
    case ActionTypes.REQUEST_SEARCH_USER:
    case ActionTypes.REQUEST_SEARCH_STATUS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case ActionTypes.RECEIVE_SEARCH_USER:
      return Object.assign({}, state, {
        isFetching: false,
        userResults: action.result,
      })
    case ActionTypes.RECEIVE_SEARCH_STATUS:
      return Object.assign({}, state, {
        isFetching: false,
        statusResults: action.result,
      })
    default:
      return state
  }
}

const searchReducer = combineReducers({
  searchResults
})

export default searchReducer
