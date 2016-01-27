export function basicPayload(actionType) {
  return {
    type: actionType
  }
}

export function jsonResultPayload(actionType, payload) {
  return {
    type: actionType,
    status: payload.status,
    result: payload.data
  }
}

export function handleResponse(json) {
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

export function getHeaders(token_type = null, access_token = null) {
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
