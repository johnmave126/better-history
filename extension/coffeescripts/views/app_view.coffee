class BH.Views.AppView extends BH.Views.BaseView
  className: 'app_view'
  template: BH.Templates['app']

  events:
    'click .menu > *': 'weekClicked'

  views:
    weeks: {}

  render: ->
    if !@model.get 'suppress'
      versionView = new BH.Views.VersionView model: @model
      versionView.open()

    properties = _.extend {}, @getI18nValues(), @collection.toTemplate()
    @$el.html @renderTemplate(properties)

    @

  weekClicked: (ev) ->
    @_selectWeek $(ev.currentTarget)

  loadWeek: (id) ->
    if !@views.weeks[id]
      @views.weeks[id] = new BH.Views.WeekView
        model: @collection.get id
      @_insert @views.weeks[id].render().el

    @_selectWeek @$("[data-week-id='#{id}']")

  loadSettings: ->
    if !@views.settings
      @views.settings = new BH.Views.SettingsView
        model: @options.settings
      @_insert @views.settings.render().el

  loadSearch: ->
    if !@views.search
      @views.search = new BH.Views.SearchView
        model: new BH.Models.Search()
      @_insert @views.search.render().el

  _selectWeek: (element) ->
    @$('.menu > *').removeClass @cssClass.selected
    $(element).addClass @cssClass.selected

  _insert: (html) ->
    @$('.mainview').append html

  getI18nValues: ->
    @i18nFetcher.get [
      'history_title',
      'settings_link',
      'last_week',
      'this_week'
    ]
