BH.Lib.UrlBuilder =
  BASE: 'chrome://history/'
  build: (key, id, options) ->
    return @BASE unless key?
    route =
      switch key
        when 'search'
          "#search/#{id}"
        when 'week'
          "#weeks/#{id}"
        when 'day'
          "#days/#{id}"

    "#{@buildBase(options)}#{route}"

  buildBase: (options) ->
    if options?.absolute then @BASE else ''
