import * as ActionTypes from '../constants/ActionTypes'
import fetch from 'isomorphic-fetch'
import { basicPayload, jsonResultPayload,
         handleResponse, getHeaders } from './Utility'

export function requestProfile() {
  return basicPayload(ActionTypes.REQUEST_PROFILE)
}

export function receiveProfile(payload) {
  return jsonResultPayload(ActionTypes.RECEIVE_PROFILE, payload)
}

function apiFetchProfile(username) {
  return dispatch => {
    dispatch(requestProfile())
    return fetch(api_endpoint + "/status/" + username, {
      method: 'GET',
      headers: getHeaders()
    })
    .then(response => response.json())
    .then(response => handleResponse(response))
    .then(json => dispatch(receiveProfile(json)))
  }
}

export function fetchProfile(username) {
  return (dispatch, getState) => {
    return dispatch(apiFetchProfile(username))
  }
}

