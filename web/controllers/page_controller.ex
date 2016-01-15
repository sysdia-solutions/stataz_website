defmodule StatazWebsite.PageController do
  use StatazWebsite.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
