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

  def create(conn, params) do
    data = {:form,
             [
               username: params["username"],
               password: params["password"],
               email: params["email"]
             ]
           }

    headers = %{"Content-Type" => "application/json",
                "Accept" => "application/json"}

    Application.get_env(:stataz_website, :api_endpoint) <> "/user"
    |> HTTPoison.post(data, headers)
    |> create_response(conn, params)
  end

  defp create_response({:ok, response}, conn, params) do
    if response.status_code == 201 do
      StatazWebsite.Auth.password_authenticate(conn, params["username"], params["password"])
      |> auth_response(conn)
    else
      conn
      |> send_resp(response.status_code, response.body)
    end
  end

  defp create_response({:error, reason}, conn, _params) do
    conn
    |> put_status(:bad_request)
    |> render("error.json", error: reason)
  end

  defp auth_response({:ok, response}, conn) do
    if response.status_code == 201 do
      {:ok, body} = response.body
                    |> Poison.decode()
      conn
      |> put_status(:created)
      |> render(StatazWebsite.AuthView, "show.json", access_token: body["data"])
    else
      auth_response({:error, ""}, conn)
    end
  end

  defp auth_response({:error, reason}, conn) do
    conn
    |> put_status(:unauthorized)
    |> render(StatazWebsite.AuthView, "error.json", error: reason)
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
