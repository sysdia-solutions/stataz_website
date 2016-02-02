import * as ActionTypes from '../constants/ActionTypes'
import fetch from 'isomorphic-fetch'
import { basicPayload, jsonResultPayload, buildURL,
         handleResponse, getHeaders } from './Utility'

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

export function requestUserSetStatus() {
  return basicPayload(ActionTypes.REQUEST_USER_SET_STATUS)
}

export function receiveUserSetStatus() {
  return basicPayload(ActionTypes.RECEIVE_USER_SET_STATUS)
}

export function requestUserDeleteStatus() {
  return basicPayload(ActionTypes.REQUEST_USER_DELETE_STATUS)
}

export function receiveUserDeleteStatus() {
  return basicPayload(ActionTypes.RECEIVE_USER_DELETE_STATUS)
}

export function requestUserAddStatus() {
  return basicPayload(ActionTypes.REQUEST_USER_ADD_STATUS)
}

export function receiveUserAddStatus() {
  return basicPayload(ActionTypes.RECEIVE_USER_ADD_STATUS)
}

export function requestUserFollow() {
  return basicPayload(ActionTypes.REQUEST_USER_FOLLOW)
}

export function receiveUserFollow() {
  return basicPayload(ActionTypes.RECEIVE_USER_FOLLOW)
}

export function requestUserUnfollow() {
  return basicPayload(ActionTypes.REQUEST_USER_UNFOLLOW)
}

export function receiveUserUnfollow() {
  return basicPayload(ActionTypes.RECEIVE_USER_UNFOLLOW)
}

function apiUserSignIn(username, password) {
  return dispatch => {
    dispatch(requestUserSignIn())
    var url = buildURL("POST", local_endpoint, "auth")
    return fetch(url, {
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
    var url = buildURL("DELETE", api_endpoint, "auth")
    return fetch(url, {
      method: 'DELETE',
      headers: getHeaders(token_type, access_token)
    })
    .then(dispatch(receiveUserSignOut()))
  }
}

function apiUserSignUp(username, password, email) {
  return dispatch => {
    dispatch(requestUserSignUp())
    var url = buildURL("POST", local_endpoint, "user")
    return fetch(url, {
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
    var url = buildURL("GET", api_endpoint, "auth")
    return fetch(url, {
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
    var url = buildURL("GET", local_endpoint, "user")
    return fetch(url, {
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
    var url = buildURL("GET", api_endpoint, "status")
    return fetch(url, {
      method: 'GET',
      headers: getHeaders(token_type, access_token)
    })
    .then(response => response.json())
    .then(response => handleResponse(response))
    .then(json => dispatch(receiveUserStatus(json)))
  }
}

function apiUserSetStatus(id, token_type, access_token) {
  return dispatch => {
    dispatch(requestUserSetStatus())
    var url = buildURL("PUT", api_endpoint, "status/" + id)
    return fetch(url, {
      method: 'PUT',
      headers: getHeaders(token_type, access_token),
      body: JSON.stringify({active: true})
    })
    .then(dispatch(receiveUserSetStatus()))
  }
}

function apiUserDeleteStatus(id, token_type, access_token) {
  return dispatch => {
    dispatch(requestUserDeleteStatus())
    var url = buildURL("DELETE", api_endpoint, "status/" + id)
    return fetch(url, {
      method: 'DELETE',
      headers: getHeaders(token_type, access_token)
    })
    .then(dispatch(receiveUserDeleteStatus()))
  }
}

function apiUserAddStatus(text, token_type, access_token) {
  return dispatch => {
    dispatch(requestUserAddStatus())
    var url = buildURL("POST", api_endpoint, "status")
    return fetch(url, {
      method: 'POST',
      headers: getHeaders(token_type, access_token),
      body: JSON.stringify({description: text})
    })
    .then(dispatch(receiveUserAddStatus()))
  }
}

function apiUserFollow(username, token_type, access_token) {
  return dispatch => {
    dispatch(requestUserFollow())
    var url = buildURL("POST", api_endpoint, "follow/" + username)
    return fetch(url, {
      method: 'POST',
      headers: getHeaders(token_type, access_token)
    })
    .then(dispatch(receiveUserFollow()))
  }
}

function apiUserUnfollow(username, token_type, access_token) {
  return dispatch => {
    dispatch(requestUserUnfollow())
    var url = buildURL("DELETE", api_endpoint, "follow/" + username)
    return fetch(url, {
      method: 'DELETE',
      headers: getHeaders(token_type, access_token)
    })
    .then(dispatch(receiveUserUnfollow()))
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

export function setUserStatus(id, token_type, access_token) {
  return (dispatch, getState) => {
    return dispatch(apiUserSetStatus(id, token_type, access_token))
  }
}

export function deleteUserStatus(id, token_type, access_token) {
  return (dispatch, getState) => {
    return dispatch(apiUserDeleteStatus(id, token_type, access_token))
  }
}

export function addUserStatus(text, token_type, access_token) {
  return (dispatch, getState) => {
    return dispatch(apiUserAddStatus(text, token_type, access_token))
  }
}

export function userFollow(username, token_type, access_token) {
  return (dispatch, getState) => {
    return dispatch(apiUserFollow(username, token_type, access_token))
  }
}

export function userUnfollow(username, token_type, access_token) {
  return (dispatch, getState) => {
    return dispatch(apiUserUnfollow(username, token_type, access_token))
  }
}
