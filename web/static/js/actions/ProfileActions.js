import * as ActionTypes from '../constants/ActionTypes'
import fetch from 'isomorphic-fetch'
import { basicPayload, jsonResultPayload, buildURL,
         handleResponse, getHeaders } from './Utility'

export function requestProfile() {
  return basicPayload(ActionTypes.REQUEST_PROFILE)
}

export function receiveProfile(payload) {
  return jsonResultPayload(ActionTypes.RECEIVE_PROFILE, payload)
}

export function requestProfileGetFollow() {
  return basicPayload(ActionTypes.REQUEST_PROFILE_GET_FOLLOW)
}

export function receiveProfileGetFollow(payload) {
  return jsonResultPayload(ActionTypes.RECEIVE_PROFILE_GET_FOLLOW, payload)
}

export function addStatusFieldOnChange(text) {
  return {
    type: ActionTypes.ADD_STATUS_FIELD_ON_CHANGE,
    description: text
  }
}

export function confirmDeleteStatus(id, text) {
  return {
    type: ActionTypes.CONFIRM_STATUS_DELETE,
    id: id,
    text: text
  }
}

export function hideConfirmDeleteStatus() {
  return {
    type: ActionTypes.HIDE_CONFIRM_STATUS_DELETE
  }
}

function apiFetchProfile(username) {
  return dispatch => {
    dispatch(requestProfile())
    var url = buildURL("GET", api_endpoint, "status/" + username)
    return fetch(url, {
      method: 'GET',
      headers: getHeaders()
    })
    .then(response => response.json())
    .then(response => handleResponse(response))
    .then(json => dispatch(receiveProfile(json)))
  }
}

function apiFetchProfileFollow(username) {
  return dispatch => {
    dispatch(requestProfileGetFollow())
    var url = buildURL("GET", api_endpoint, "follow/" + username)
    return fetch(url, {
      method: 'GET',
      headers: getHeaders()
    })
    .then(response => response.json())
    .then(response => handleResponse(response))
    .then(json => dispatch(receiveProfileGetFollow(json)))
  }
}

function apiFetchUserFollow(token_type, access_token) {
  return dispatch => {
    dispatch(requestProfileGetFollow())
    var url = buildURL("GET", api_endpoint, "follow")
    return fetch(url, {
      method: 'GET',
      headers: getHeaders(token_type, access_token)
    })
    .then(response => response.json())
    .then(response => handleResponse(response))
    .then(json => dispatch(receiveProfileGetFollow(json)))
  }
}

export function fetchProfile(username) {
  return (dispatch, getState) => {
    return dispatch(apiFetchProfile(username))
  }
}

export function fetchProfileFollow(username) {
  return (dispatch, getState) => {
    return dispatch(apiFetchProfileFollow(username))
  }
}

export function fetchUserFollow(token_type, access_token) {
  return (dispatch, getState) => {
    return dispatch(apiFetchUserFollow(token_type, access_token))
  }
}
