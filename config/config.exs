# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General Configuration
config :stataz_website,
  local_endpoint: System.get_env("ENV_STATAZWEBSITE_LOCAL_ENDPOINT") || "",
  api_endpoint: System.get_env("ENV_STATAZWEBSITE_API_ENDPOINT") || "",
  api_client_id: System.get_env("ENV_STATAZWEBSITE_API_CLIENT_ID") || "defaultclientid",
  debug_mode: System.get_env("ENV_STATAZWEBSITE_DEBUG_MODE") || true

# Configures the endpoint
config :stataz_website, StatazWebsite.Endpoint,
  url: [host: "localhost"],
  root: Path.dirname(__DIR__),
  secret_key_base: "elbUxtED4mqThCh9k8WfdTxRkQo2cMivV3YUH8ClLlz9hvTlf2MiBH8ju25LwQD+",
  render_errors: [accepts: ~w(html json)],
  pubsub: [name: StatazWebsite.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"

if File.exists? "config/#{Mix.env}.secret.exs" do
  import_config "#{Mix.env}.secret.exs"
end
