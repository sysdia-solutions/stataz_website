defmodule StatazWebsite.AuthController do
  use StatazWebsite.Web, :controller

  def create(conn, params) do
    data = {:form,
             [
               username: params["username"],
               password: params["password"],
               client_id: Application.get_env(:stataz_website, :api_client_id),
               grant_type: "password"
             ]
           }

    headers = %{"Content-Type" => "application/json",
                "Accept" => "application/json"}

    Application.get_env(:stataz_website, :api_endpoint) <> "/auth"
    |> HTTPoison.post(data, headers)
    |> create_response(conn)
  end

  defp create_response({:ok, response}, conn) do
    if response.status_code == 201 do
      {:ok, body} = response.body
                    |> Poison.decode()
      conn
      |> put_status(:created)
      |> render("show.json", access_token: body["data"])
    else
      create_response({:error, ""}, conn)
    end
  end

  defp create_response({:error, reason}, conn) do
    conn
    |> put_status(:unauthorized)
    |> render("error.json", error: reason)
  end
end
