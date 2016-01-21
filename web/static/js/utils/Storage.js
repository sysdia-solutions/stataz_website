export function saveAccessToken(token) {
  token = {
    access_token: token.access_token,
    token_type: token.token_type,
    expires_at: token.expires_in
  }
  sessionStorage.setItem("access_token", JSON.stringify(token))
}

export function loadAccessToken() {
  var token = JSON.parse(sessionStorage.getItem("access_token"))
  if (!token) {
    return {
      access_token: "",
      token_type: "",
      expires_at: ""
    }
  }
  return token
}

export function deleteAccessToken() {
  sessionStorage.removeItem("access_token")
}
