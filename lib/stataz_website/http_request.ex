defmodule StatazWebsite.HTTPRequest do
  defp headers(auth_key) do
    %{"Content-Type" => "application/json",
      "Accept" => "application/json",
      "Authorization" => auth_key}
  end

  defp hackney_options() do
    [{:ssl_options, [{:cacertfile, Application.get_env(:stataz_website, :cafile)}]}]
  end

  def get(url, auth_key) do
    HTTPoison.get(url, headers(auth_key), hackney: hackney_options())
  end

  def post(url, data, auth_key) do
    HTTPoison.post(url, data, headers(auth_key), hackney: hackney_options())
  end
end
