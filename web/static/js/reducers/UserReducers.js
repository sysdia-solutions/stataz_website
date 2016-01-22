import { combineReducers } from 'redux'
import * as ActionTypes from '../constants/ActionTypes'

function authenticateUser(state, type, status, payload) {
  var access_token = {}
  var authenticated = false
  var failed = false
  if (status === "success") {
    authenticated = true
    access_token = {access_token: payload.access_token,
                    expires_in: payload.expires_in,
                    token_type: payload.token_type}
  }
  if (type === ActionTypes.RECEIVE_USER_SIGN_IN && status === "error") {
    failed = true
  }
  return Object.assign({}, state, {
    isProcessing: false,
    hasProcessed: true,
    hasFailed: failed,
    isAuthenticated: authenticated,
    access_token: access_token
  })
}

var defaultAuthState = {
  isProcessing: false,
  isAuthenticated: false,
  hasProcessed: false,
  hasFailed: false,
  access_token: {}
}

function userAuth(state = defaultAuthState, action) {
  switch(action.type) {
    case ActionTypes.REQUEST_USER_SIGN_IN:
      return Object.assign({}, state, {
        isProcessing: true,
        hasFailed: false,
      })
    case ActionTypes.RECEIVE_USER_SIGN_IN:
      return authenticateUser(state, action.type, action.status, action.result)
    case ActionTypes.REQUEST_USER_SIGN_OUT:
      return Object.assign({}, state, {
        isProcessing: true
      })
    case ActionTypes.RECEIVE_USER_SIGN_OUT:
      return Object.assign({}, state, {
        isProcessing: false,
        isAuthenticated: false,
        access_token: {}
      })
    case ActionTypes.REQUEST_USER_AUTH_CHECK:
      return Object.assign({}, state, {
        isProcessing: true
      })
    case ActionTypes.RECEIVE_USER_AUTH_CHECK:
      return authenticateUser(state, action.type, action.status, action.result)
    default:
      return state
  }
}

function receiveUserDetails(state, status, payload) {
  var details = {}
  if (status === "success") {
    details = {
      username: payload.username,
      email: payload.email
    }
  }
  return Object.assign({}, state, {
    isFetching: false,
    details: details
  })
}

var defaultUserState = {
  isFetching: false,
  user: {}
}

function userDetails(state = defaultUserState, action) {
  switch(action.type) {
    case ActionTypes.REQUEST_USER_DETAILS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case ActionTypes.RECEIVE_USER_DETAILS:
      return receiveUserDetails(state, action.status, action.result)
    default:
      return state
  }
}

function receiveUserStatus(state, status, payload) {
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

var defaultUserStatusState = {
  isFetching: false,
  status: {}
}

function userStatus(state = defaultUserStatusState, action) {
  switch(action.type) {
    case ActionTypes.REQUEST_USER_STATUS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case ActionTypes.RECEIVE_USER_STATUS:
      return receiveUserStatus(state, action.status, action.result)
    default:
      return state
  }
}

const userReducer = combineReducers({
  userAuth,
  userDetails,
  userStatus
})

export default userReducer
