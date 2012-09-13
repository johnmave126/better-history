class BH.Views.BaseView extends Backbone.View
  cssClass:
    selected: 'selected'

  i18nFetcher: new BH.Helpers.I18nFetcher(chrome)
  urlBuilder: new BH.Helpers.UrlBuilder()

  renderTemplate: (json) ->
    Mustache.to_html(@template, json)

  select: ->
    $('.mainview > *').removeClass(@cssClass.selected)
    $('.mainview > *').css(display: 'block')
    setTimeout =>
      @$el.addClass(@cssClass.selected)
      $('.mainview > *:not(.selected)').css(display: 'none')
    , 0
    @setPageTitle(@pageTitle()) if @pageTitle
    @

  isSelected: ->
    @$el.hasClass(@cssClass.selected)

  setPageTitle: (title) ->
    element = $('<div/>')
    document.title = $(element).html(title).text() + ' - Better History'

  assignTabIndices: (selector) ->
    $('*').removeAttr 'tabindex'
    @$('input.search').attr 'tabindex', 1
    @$(selector).each (i) ->
      $(@).attr 'tabindex', i + 2
    @$('.search').focus()

