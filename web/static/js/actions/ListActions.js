import * as ActionTypes from '../constants/ActionTypes'
import fetch from 'isomorphic-fetch'
import { basicPayload, jsonResultPayload, buildURL,
         handleResponse, getHeaders } from './Utility'

export function requestListNewUsers() {
  return basicPayload(ActionTypes.REQUEST_LIST_NEW_USERS)
}

export function receiveListNewUsers(payload) {
  return jsonResultPayload(ActionTypes.RECEIVE_LIST_NEW_USERS, payload)
}

export function requestListNewStatus() {
  return basicPayload(ActionTypes.REQUEST_LIST_NEW_STATUS)
}

export function receiveListNewStatus(payload) {
  return jsonResultPayload(ActionTypes.RECEIVE_LIST_NEW_STATUS, payload)
}

export function requestListPopularStatus() {
  return basicPayload(ActionTypes.REQUEST_LIST_POPULAR_STATUS)
}

export function receiveListPopularStatus(payload) {
  return jsonResultPayload(ActionTypes.RECEIVE_LIST_POPULAR_STATUS, payload)
}

function apiListNewUsers(limit) {
  return dispatch => {
    dispatch(requestListNewUsers())
    var url = buildURL("GET", api_endpoint, "list/new/users?limit=" + limit)
    return fetch(url, {
      method: 'GET',
      headers: getHeaders()
    })
    .then(response => response.json())
    .then(response => handleResponse(response))
    .then(json => dispatch(receiveListNewUsers(json)))
  }
}

function apiListNewStatus(limit) {
  return dispatch => {
    dispatch(requestListNewStatus())
    var url = buildURL("GET", api_endpoint, "list/new/statuses?limit=" + limit)
    return fetch(url, {
      method: 'GET',
      headers: getHeaders()
    })
    .then(response => response.json())
    .then(response => handleResponse(response))
    .then(json => dispatch(receiveListNewStatus(json)))
  }
}

function apiListPopularStatus(limit) {
  return dispatch => {
    dispatch(requestListPopularStatus())
    var url = buildURL("GET", api_endpoint, "list/popular/statuses?limit=" + limit)
    return fetch(url, {
      method: 'GET',
      headers: getHeaders()
    })
    .then(response => response.json())
    .then(response => handleResponse(response))
    .then(json => dispatch(receiveListPopularStatus(json)))
  }
}

export function listNewUsers(limit) {
  return (dispatch, getState) => {
    return dispatch(apiListNewUsers(limit))
  }
}

export function listNewStatus(limit) {
  return (dispatch, getState) => {
    return dispatch(apiListNewStatus(limit))
  }
}

export function listPopularStatus(limit) {
  return (dispatch, getState) => {
    return dispatch(apiListPopularStatus(limit))
  }
}
