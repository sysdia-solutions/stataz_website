defmodule StatazWebsite.Auth do

  def password_authenticate(conn, username, password) do
    data = {:form,
             [
               username: username,
               password: password,
               client_id: Application.get_env(:stataz_website, :api_client_id),
               grant_type: "password"
             ]
           }

    headers = %{"Content-Type" => "application/json",
                "Accept" => "application/json"}

    Application.get_env(:stataz_website, :api_endpoint) <> "/auth"
    |> HTTPoison.post(data, headers)
  end
end
