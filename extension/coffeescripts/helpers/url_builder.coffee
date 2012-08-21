class BH.Helpers.UrlBuilder
  base: 'chrome://history/'
  build: (key, params, options) ->
    if key == 'base'
      @_base()
    else if key == 'search'
      @_search(params, options)
    else if key == 'week'
      @_week(params, options)
    else if key == 'day'
      @_day(params, options)

  _base: ->
    @base

  _search: (params, options) ->
    "#{@_buildBase(options)}#search/#{params[0]}"

  _week: (params, options) ->
    "#{@_buildBase(options)}#weeks/#{params[0]}"

  _day: (params, options) ->
    "#{@_buildBase(options)}#weeks/#{params[0]}/days/#{params[1]}"

  _buildBase: (options) ->
    if options? && options.absolute then @base else ''
