class BH.Models.Base extends Backbone.Model
  initialize: (attrs, options) ->
    # Runtime injection override
    @settings = options?.settings
    @chromeAPI = options?.chromeAPI

  chromeAPI: chrome

  urlBuilder: BH.Lib.UrlBuilder

  t: (key, replacements = []) ->
    @chromeAPI.i18n.getMessage key, replacements
