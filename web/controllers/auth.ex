defmodule StatazWebsite.Auth do
  alias StatazWebsite.HTTPRequest

  def password_authenticate(username, password) do
    data = {:form,
             [
               username: username,
               password: password,
               client_id: Application.get_env(:stataz_website, :api_client_id),
               grant_type: "password"
             ]
           }

    Application.get_env(:stataz_website, :api_endpoint) <> "/auth"
    |> HTTPRequest.post(data, "")
  end
end
