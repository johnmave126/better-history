class BH.Models.Search extends BH.Models.Base
  defaults: ->
    query: ''

  initialize: ->
    @bind 'change:query', @onQueryChanged, @
    @history = new BH.Models.SearchHistory @toHistory()

  onQueryChanged: ->
    @history.set {query: @get('query')}, silent: true

  toHistory: ->
    query: @get 'query'

  hasHistory: ->
    @history.get('history').length > 0

  toTemplate: ->
    @terms = @get('query').split(' ')
    joined = @t('searching_title') + ' '

    # yuck
    for term, i in @terms
      joined += "\"#{term}\""
      if i != @terms.length - 1
        joined += " #{@t('and')} "

     _.extend @toJSON(), title: joined
