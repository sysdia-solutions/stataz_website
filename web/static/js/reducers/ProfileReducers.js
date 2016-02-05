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

function receiveProfileFollowDetails(state, status, payload) {
  var data = {}
  if (status === "success") {
    data = payload
  }
  return Object.assign({}, state, {
    isFetching: false,
    data: data
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

const maxChars = 32;
const defaultMsg = " characters left"

var defaultStatusFieldState = {
  textLength: 0,
  charsRemaining: maxChars,
  helpText: maxChars + defaultMsg,
  inError: false
}

function addStatusField(state = defaultStatusFieldState, action) {
  switch(action.type) {
    case ActionTypes.ADD_STATUS_FIELD_ON_CHANGE:
      var inError, status, text
      if (action.description.length < 2 && action.description.length > 0) {
        text = "Too short"
        inError = true
      } else if(action.description.length > maxChars) {
        text = "Too long"
        inError = true
      } else {
        text = (maxChars - action.description.length) + defaultMsg
        inError = false
      }
    return {
      textLength: action.description.length,
      charsRemaining: (maxChars - action.description.length),
      helpText: text,
      inError: inError
    }
    default:
      return state
  }
}

var defaultDeleteModalState = {
  open: false,
  id: null,
  text: ""
}

function confirmDeleteModal(state = defaultDeleteModalState, action) {
  switch(action.type) {
    case ActionTypes.CONFIRM_STATUS_DELETE:
      return {
        open: true,
        id: action.id,
        text: action.text
      }
    case ActionTypes.HIDE_CONFIRM_STATUS_DELETE:
      return defaultDeleteModalState
    default:
      return state
  }
}

var defaultFollowState = {
  isFetching: false,
  data: {}
}

function profileFollowDetails(state = defaultFollowState, action) {
  switch(action.type) {
    case ActionTypes.REQUEST_PROFILE_GET_FOLLOW:
      return Object.assign({}, state, {
        isFetching: true
      })
    case ActionTypes.RECEIVE_PROFILE_GET_FOLLOW:
      return receiveProfileFollowDetails(state, action.status, action.result)
    default:
      return state
  }
}

const profileReducer = combineReducers({
  profileDetails,
  addStatusField,
  profileFollowDetails,
  confirmDeleteModal
})

export default profileReducer
