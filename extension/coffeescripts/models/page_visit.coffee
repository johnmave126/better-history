class BH.Models.PageVisit extends Backbone.Model
  defaults:
    title: '(No Title)'

  initialize: ->
    @set({title: @defaults.title}) if @get('title') == ''

  sync: (method, model, options) ->
    if method == 'delete'
      chrome.history.deleteUrl({url: @get('url')})
      options.success(@)

  toTemplate: ->
    properties = @toJSON()
    properties.cid = @cid

    _.extend properties, i18n.pageVisit()

  domain: ->
    match = Helpers.getDomain @get('url')
    if match == null then null else match[0]
