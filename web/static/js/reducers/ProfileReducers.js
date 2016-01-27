import { combineReducers } from 'redux'
import * as ActionTypes from '../constants/ActionTypes'

function receiveProfileDetails(state, status, payload) {
  var details = {}
  if (status === "success") {
    details = {
      statuses: payload
    }
  }
  return Object.assign({}, state, {
    isFetching: false,
    details: details
  })
}

var defaultProfileState = {
  isFetching: false,
  details: {}
}

function profileDetails(state = defaultProfileState, action) {
  switch(action.type) {
    case ActionTypes.REQUEST_PROFILE:
      return Object.assign({}, state, {
        isFetching: true
      })
    case ActionTypes.RECEIVE_PROFILE:
      return receiveProfileDetails(state, action.status, action.result)
    default:
      return state
  }
}

const profileReducer = combineReducers({
  profileDetails
})

export default profileReducer
