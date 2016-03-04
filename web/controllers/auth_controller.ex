defmodule StatazWebsite.AuthController do
  use StatazWebsite.Web, :controller

  def create(conn, params) do
    StatazWebsite.Auth.password_authenticate(params["username"], params["password"])
    |> create_response(conn)
  end

  defp create_response({:ok, response}, conn) do
    if response.status_code == 201 do
      {:ok, body} = response.body
                    |> Poison.decode()
      conn
      |> put_status(:created)
      |> render(StatazWebsite.AuthView, "show.json", access_token: body["data"])
    else
      create_response({:error, ""}, conn)
    end
  end

  defp create_response({:error, reason}, conn) do
    conn
    |> put_status(:unauthorized)
    |> render(StatazWebsite.AuthView, "error.json", error: reason)
  end
end
