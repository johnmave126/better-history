BH.Lib.Url =
  base: ->
    'chrome://history/'

  search: (text) ->
    "#search/#{text}"

  week: (id) ->
    "#weeks/#{id}"

  day: (weekId, id) ->
    "#weeks/#{weekId}/days/#{id}"
