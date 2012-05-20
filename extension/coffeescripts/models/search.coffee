class BH.Models.Search extends Backbone.Model
  initialize: ->
    @bind('change:query', @updateTitle, @)

  toTemplate: ->
    @toJSON()

  updateTitle: ->
    terms = @get('query').split(' ')
    joined = chrome.i18n.getMessage('searching_title') + ' '

    $.each terms, (i) ->
      joined += '"' + @ + '"'
      if i != terms.length - 1
        joined += ' ' + chrome.i18n.getMessage('and') + ' '

    @set({title: joined})

  toChrome: ->
    text: @get('query')

  sync: (method, model, options) ->
    if method == 'read'
      chromeAPI.history.search @toChrome(), (history) ->
        options.success(history)

  parse: (data) ->
    history: new BH.Collections.Visits(data)
