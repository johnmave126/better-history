class BH.Models.Base extends Backbone.Model
  chromeAPI: chrome

  t: (key, replacements = []) ->
    @chromeAPI.i18n.getMessage key, replacements
