class BH.Views.CreditsView extends BH.Views.Modal
  className: 'credits_view'
  template: BH.Templates['credits']

  events:
    'click .close': 'closeClicked'

  initialize: ->
    @attachGeneralEvents()

  render: ->
    @$el.html(@renderTemplate(@getI18nValues()))
    return this

  closeClicked: (ev) ->
    ev.preventDefault()
    @close()

  openClicked: (ev) ->
    ev.preventDefault()
    @open()

  getI18nValues: ->
    properties = @i18nFetcher.get [
      'credits_title',
      'translators_heading',
      'spanish',
      'swedish',
      'german',
      'french',
      'italian',
      'hungarian',
      'chinese_simplified',
      'arabic',
      'polish',
      'portuguese',
      'russian',
      'slovak',
      'catalonian',
      'hindi',
      'vietnamese',
      'japanese',
      'romanian',
      'czech',
      'dutch',
      'latvian',
      'turkish',
      'translation_help_heading',
      'close_button'
    ]
    properties[@i18nFetcher.scopeKey('developed_by')] = chrome.i18n.getMessage('developed_by', [
      '<a href="http://automagical.posterous.com/">',
      '</a>',
      'Roy Kolak'
    ])
    properties[@i18nFetcher.scopeKey('translation_instructions')] = chrome.i18n.getMessage('translation_instructions', [
      'roy.kolak@gmail.com',
      '<a href="mailto:roy.kolak@gmail.com">',
      '</a>'
    ])
    properties
