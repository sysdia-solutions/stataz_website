import * as ActionTypes from '../constants/ActionTypes'
import fetch from 'isomorphic-fetch'

function basicPayload(actionType) {
  return {
    type: actionType
  }
}

function jsonResultPayload(actionType, payload) {
  return {
    type: actionType,
    status: payload.status,
    result: payload.data
  }
}

export function requestUserSignOut() {
  return basicPayload(ActionTypes.REQUEST_USER_SIGN_OUT)
}

export function receiveUserSignOut() {
  return basicPayload(ActionTypes.RECEIVE_USER_SIGN_OUT)
}

export function requestUserSignIn() {
  return basicPayload(ActionTypes.REQUEST_USER_SIGN_IN)
}

export function receiveUserSignIn(payload) {
  return jsonResultPayload(ActionTypes.RECEIVE_USER_SIGN_IN, payload)
}

export function requestUserSignUp() {
  return basicPayload(ActionTypes.REQUEST_USER_SIGN_UP)
}

export function receiveUserSignUp(payload) {
  return jsonResultPayload(ActionTypes.RECEIVE_USER_SIGN_UP, payload)
}

export function requestUserAuthCheck() {
  return basicPayload(ActionTypes.REQUEST_USER_AUTH_CHECK)
}

export function receiveUserAuthCheck(payload) {
  return jsonResultPayload(ActionTypes.RECEIVE_USER_AUTH_CHECK, payload)
}

export function requestUserDetails() {
  return basicPayload(ActionTypes.REQUEST_USER_DETAILS)
}

export function receiveUserDetails(payload) {
  return jsonResultPayload(ActionTypes.RECEIVE_USER_DETAILS, payload)
}

export function requestUserStatus() {
  return basicPayload(ActionTypes.REQUEST_USER_STATUS)
}

export function receiveUserStatus(payload) {
  return jsonResultPayload(ActionTypes.RECEIVE_USER_STATUS, payload)
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

function apiUserSignUp(username, password, email) {
  return dispatch => {
    dispatch(requestUserSignUp())
    return fetch(local_endpoint + '/user', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        username: username,
        password: password,
        email: email
      })
    })
    .then(response => response.json())
    .then(response => handleResponse(response))
    .then(json => dispatch(receiveUserSignUp(json)))
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

function apiGetUserDetails(token_type, access_token) {
  return dispatch => {
    dispatch(requestUserDetails())
    return fetch(local_endpoint + "/user", {
      method: 'GET',
      headers: getHeaders(token_type, access_token)
    })
    .then(response => response.json())
    .then(response => handleResponse(response))
    .then(json => dispatch(receiveUserDetails(json)))
  }
}

function apiGetUserStatus(token_type, access_token) {
  return dispatch => {
    dispatch(requestUserStatus())
    return fetch(api_endpoint + "/status", {
      method: 'GET',
      headers: getHeaders(token_type, access_token)
    })
    .then(response => response.json())
    .then(response => handleResponse(response))
    .then(json => dispatch(receiveUserStatus(json)))
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

export function signUpUser(username, password, email) {
  return (dispatch, getState) => {
    return dispatch(apiUserSignUp(username, password, email))
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

export function getUserStatus(token_type, access_token) {
  return (dispatch, getState) => {
    return dispatch(apiGetUserStatus(token_type, access_token))
  }
}
