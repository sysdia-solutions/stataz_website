defmodule StatazWebsite.AuthView do
  use StatazWebsite.Web, :view

  def render("show.json", %{access_token: access_token}) do
    %{data: %{
      token_type: access_token["token_type"],
      access_token: access_token["access_token"],
      expires_in: access_token["expires_in"]
      }
    }
  end

  def render("error.json", %{error: error}) do
    %{errors: error}
  end
end
