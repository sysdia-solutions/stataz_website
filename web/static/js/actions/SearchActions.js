import * as ActionTypes from '../constants/ActionTypes'
import fetch from 'isomorphic-fetch'
import { basicPayload, jsonResultPayload, buildURL,
         handleResponse, getHeaders } from './Utility'

export function requestSearchUser() {
  return basicPayload(ActionTypes.REQUEST_SEARCH_USER)
}

export function receiveSearchUser(payload) {
  return jsonResultPayload(ActionTypes.RECEIVE_SEARCH_USER, payload)
}

export function requestSearchStatus() {
  return basicPayload(ActionTypes.REQUEST_SEARCH_STATUS)
}

export function receiveSearchStatus(payload) {
  return jsonResultPayload(ActionTypes.RECEIVE_SEARCH_STATUS, payload)
}

function apiSearchUser(query) {
  return dispatch => {
    dispatch(requestSearchUser())
    var url = buildURL("GET", api_endpoint, "search/user/" + query)
    return fetch(url, {
      method: 'GET',
      headers: getHeaders()
    })
    .then(response => response.json())
    .then(response => handleResponse(response))
    .then(json => dispatch(receiveSearchUser(json)))
  }
}

function apiSearchStatus(query) {
  return dispatch => {
    dispatch(requestSearchStatus())
    var url = buildURL("GET", api_endpoint, "search/status/" + query)
    return fetch(url, {
      method: 'GET',
      headers: getHeaders()
    })
    .then(response => response.json())
    .then(response => handleResponse(response))
    .then(json => dispatch(receiveSearchStatus(json)))
  }
}

export function searchUser(query) {
  return (dispatch, getState) => {
    return dispatch(apiSearchUser(query))
  }
}

export function searchStatus(query) {
  return (dispatch, getState) => {
    return dispatch(apiSearchStatus(query))
  }
}
