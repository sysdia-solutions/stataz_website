defmodule StatazWebsite.UserView do
  use StatazWebsite.Web, :view

  def render("show.json", %{user_details: data}) do
    %{data: %{
      username: data["username"],
      email: data["email"],
      status_history: data["status_history"]
      }
    }
  end

  def render("error.json", %{error: error}) do
    %{errors: error}
  end
end
