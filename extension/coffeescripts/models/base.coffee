class BH.Models.Base extends Backbone.Model
  chromeAPI: chrome

  urlBuilder: BH.Helpers.UrlBuilder

  t: (key, replacements = []) ->
    @chromeAPI.i18n.getMessage key, replacements
