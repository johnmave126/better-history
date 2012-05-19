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
