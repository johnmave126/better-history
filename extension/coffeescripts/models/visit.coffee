class BH.Models.Visit extends Backbone.Model
  defaults:
    title: '(No Title)'

  initialize: ->
    @set
      title: @defaults.title if @get('title') == ''
      id: @cid

  sync: (method, model, options) ->
    if method == 'delete'
      chrome.history.deleteUrl({url: @get('url')})
      options.success(@)

  toTemplate: ->
    _.extend(@toJSON(), i18n.pageVisit())

  domain: ->
    match = Helpers.getDomain @get('url')
    if match == null then null else match[0]
