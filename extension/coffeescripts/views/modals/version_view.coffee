class BH.Views.VersionView extends BH.Views.Modal
  className: 'version_view'

  template: BH.Templates['version']

  events:
    'click .close': 'closeClicked'

  initialize: ->
    @attachGeneralEvents()

  render: ->
    @$el.html(@renderTemplate(_.extend(@getI18nValues(), @model.toTemplate())))
    @

  closeClicked: (ev) ->
    ev.preventDefault()
    @model.setSuppress(true)
    @close()

  openClicked: (ev) ->
    ev.preventDefault()
    @open()

  getI18nValues: ->
    properties = @i18nFetcher.get([
      'version_title',
      'version_important_note',
      'close_button',
      'version_whats_new',
      'leave_a_review'
    ])
    properties[@i18nFetcher.scopeKey('version_description')] = chrome.i18n.getMessage('version_description', [
      '<a href="#settings/credits">',
      '</a>'
    ])
    properties[@i18nFetcher.scopeKey('version_note')] = chrome.i18n.getMessage('version_note', [
      '<a href="http://twitter.com/Better_History">',
      '</a>'
    ])
    properties[@i18nFetcher.scopeKey('version_items')] = chrome.i18n.getMessage('version_items', [
      '<li>',
      '</li>'
    ])
    properties
