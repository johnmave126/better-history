class BH.Helpers.I18nFetcher
  constructor: (@chromeAPI) ->

  get: (keys) ->
    lookup = {}
    _.each keys, (key) =>
      lookup[@scopeKey(key)] = @chromeAPI.i18n.getMessage(key.toString())
    lookup

  scopeKey: (key) ->
    "i18n_#{key}"
