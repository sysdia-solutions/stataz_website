import { combineReducers } from 'redux'
import * as ActionTypes from '../constants/ActionTypes'

var defaultListState = {
  isFetching: false,
  newUsers: [],
  newStatus: [],
  popularStatus: []
}

function listDetails(state = defaultListState, action) {
  switch(action.type) {
    case ActionTypes.REQUEST_LIST_NEW_USERS:
    case ActionTypes.REQUEST_LIST_NEW_STATUS:
    case ActionTypes.REQUEST_LIST_POPULAR_STATUS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case ActionTypes.RECEIVE_LIST_NEW_USERS:
      return Object.assign({}, state, {
        isFetching: false,
        newUsers: action.result,
        newStatus: state.newStatus,
        popularStatus: state.popularStatus
      })
    case ActionTypes.RECEIVE_LIST_NEW_STATUS:
      return Object.assign({}, state, {
        isFetching: false,
        newUsers: state.newUsers,
        newStatus: action.result,
        popularStatus: state.popularStatus
      })
    case ActionTypes.RECEIVE_LIST_POPULAR_STATUS:
      return Object.assign({}, state, {
        isFetching: false,
        newUsers: state.newUsers,
        newStatus: state.newStatus,
        popularStatus: action.result
      })
    default:
      return state
  }
}

const listReducer = combineReducers({
  listDetails
})

export default listReducer
