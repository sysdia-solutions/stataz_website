defmodule StatazWebsite.UserController do
  use StatazWebsite.Web, :controller

  def show(conn, _params) do

    headers = %{"Content-Type" => "application/json",
                "Accept" => "application/json",
                "Authorization" => get_req_header(conn, "authorization")}
    Application.get_env(:stataz_website, :api_endpoint) <> "/user"
    |> HTTPoison.get(headers)
    |> user_response(conn)
  end

  defp respond_error(error, conn) do
    conn
    |> put_status(:unauthorized)
    |> render("error.json", error: error)
  end

  defp user_response({:error, reason}, conn) do
    respond_error(reason, conn)
  end

  defp user_response({:ok, response}, conn) do
    if response.status_code == 200 do
      {:ok, body} = response.body
                    |> Poison.decode()
      get_status(body["data"], conn)
    else
      respond_error("", conn)
    end
  end

  defp get_status(user_data, conn) do
    headers = %{"Content-Type" => "application/json",
                "Accept" => "application/json"}

    Application.get_env(:stataz_website, :api_endpoint) <> "/status/" <> user_data["username"]
    |> HTTPoison.get(headers)
    |> show_response(conn, user_data)
  end

  defp show_response({:error, reason}, conn, _user_data) do
    respond_error(reason, conn)
  end

  defp show_response({:ok, response}, conn, user_data) do
    if response.status_code == 200 do
      {:ok, body} = response.body
                    |> Poison.decode()
      data = Map.put(user_data, "status_history", body["data"])
      conn
      |> put_status(:ok)
      |> render("show.json", user_details: data)
    else
      respond_error("", conn)
    end
  end
end
