import * as ActionTypes from '../constants/ActionTypes'
import fetch from 'isomorphic-fetch'

export function requestUserSignOut() {
  return {
    type: ActionTypes.REQUEST_USER_SIGN_OUT
  }
}

export function receiveUserSignOut() {
  return {
    type: ActionTypes.RECEIVE_USER_SIGN_OUT
  }
}

export function requestUserSignIn() {
  return {
    type: ActionTypes.REQUEST_USER_SIGN_IN
  }
}

export function receiveUserSignIn(payload) {
  return {
    type: ActionTypes.RECEIVE_USER_SIGN_IN,
    status: payload.status,
    result: payload.data
  }
}

export function requestUserAuthCheck() {
  return {
    type: ActionTypes.REQUEST_USER_AUTH_CHECK
  }
}

export function receiveUserAuthCheck(payload) {
  return {
    type: ActionTypes.RECEIVE_USER_AUTH_CHECK,
    status: payload.status,
    result: payload.data
  }
}

export function requestUserDetails() {
  return {
    type: ActionTypes.REQUEST_USER_DETAILS
  }
}

export function receiveUserDetails(payload) {
  return {
    type: ActionTypes.RECEIVE_USER_DETAILS,
    status: payload.status,
    result: payload.data
  }
}

function handleResponse(json) {
  if (json.data) {
    return {
      status: "success",
      data: json.data
    }
  } else {
    return {
      status: "error",
      data: json.errors
    }
  }
}

function getHeaders(token_type = null, access_token = null) {
  var default_headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
  var auth_headers = {}
  if (token_type && access_token) {
    auth_headers = {
      'Authorization': token_type.ucfirst() + ' ' + access_token
    }
  }
  return Object.assign(default_headers, auth_headers)
}

function apiUserSignIn(username, password) {
  return dispatch => {
    dispatch(requestUserSignIn())
    return fetch(local_endpoint + '/auth', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    .then(response => response.json())
    .then(response => handleResponse(response))
    .then(json => dispatch(receiveUserSignIn(json)))
  }
}

function apiGetUserDetails(token_type, access_token) {
  return dispatch => {
    dispatch(requestUserDetails())
    return fetch(api_endpoint + "/user", {
      method: 'GET',
      headers: getHeaders(token_type, access_token)
    })
    .then(response => response.json())
    .then(response => handleResponse(response))
    .then(json => dispatch(receiveUserDetails(json)))
  }
}

function apiUserSignOut(token_type, access_token) {
  return dispatch => {
    dispatch(requestUserSignOut())
    return fetch(api_endpoint + "/auth", {
      method: 'DELETE',
      headers: getHeaders(token_type, access_token)
    })
    .then(dispatch(receiveUserSignOut()))
  }
}

function apiAuthCheckUser(token_type, access_token) {
  return dispatch => {
    dispatch(requestUserAuthCheck())
    return fetch(api_endpoint + "/auth", {
      method: 'GET',
      headers: getHeaders(token_type, access_token)
    })
    .then(response => response.json())
    .then(response => handleResponse(response))
    .then(json => dispatch(receiveUserAuthCheck(json)))
  }
}

export function signInUser(username, password) {
  return (dispatch, getState) => {
    return dispatch(apiUserSignIn(username, password))
  }
}

export function signOutUser(token_type, access_token) {
  return (dispatch, getState) => {
    return dispatch(apiUserSignOut(token_type, access_token))
  }
}

export function authCheckUser(token_type, access_token) {
  return (dispatch, getState) => {
    return dispatch(apiAuthCheckUser(token_type, access_token))
  }
}

export function getUserDetails(token_type, access_token) {
  return (dispatch, getState) => {
    return dispatch(apiGetUserDetails(token_type, access_token))
  }
}
