BH.Modules.chromeSupport =
  chromeAPI: chrome

  t: (key, replacements = []) ->
    @chromeAPI.i18n.getMessage key, replacements
