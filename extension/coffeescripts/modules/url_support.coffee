BH.Modules.urlSupport =
  urlFor: (key, id, opts) ->
    base = 'chrome://history/'
    return base unless key?

    buildBase = (opts) ->
      if opts?.absolute then @BASE else ''

    route =
      switch key
        when 'search'
          "#search/#{id}"
        when 'week'
          "#weeks/#{id}"
        when 'day'
          "#days/#{id}"

    "#{buildBase(opts)}#{route}"
