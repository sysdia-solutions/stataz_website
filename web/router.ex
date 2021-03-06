defmodule StatazWebsite.Router do
  use StatazWebsite.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", StatazWebsite do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    get "/profile/:username", PageController, :index
    get "/search/:query", PageController, :index
  end

  # Other scopes may use custom stacks.
  scope "/auth", StatazWebsite do
    pipe_through :api

    post "/", AuthController, :create
  end

  scope "/user", StatazWebsite do
    pipe_through :api

    get "/", UserController, :show
    post "/", UserController, :create
  end
end
