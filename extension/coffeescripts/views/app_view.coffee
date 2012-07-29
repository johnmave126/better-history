class BH.Views.AppView extends BH.Views.BaseView
  className: 'app_view'
  template: BH.Templates['app']

  events:
    'click .menu > *': 'weekClicked'

  initialize: (config, @options) ->
    @views =
      weeks: @_initWeekViews()
      search: @_initSearchView()
      settings: @_initSettingsView()

  render: ->
    @_renderVersionView() if !@model.get('suppress')

    properties = _.extend(@getI18nValues(), @collection.toTemplate())
    @$el.html(@renderTemplate(properties))

    container = @$('.mainview')

    _.each @views.weeks, (weekView) =>
      container.append(weekView.render().el)
    container.append(@views.search.render().el)
    container.append(@views.settings.render().el)

    @

  weekClicked: (ev) ->
    @$('.menu > *').removeClass(@cssClass.selected)
    $(ev.currentTarget).addClass(@cssClass.selected)

  weekSelected: (id) ->
    @$('.menu > *').removeClass(@cssClass.selected)
    @$("[data-week-id='#{id}']").addClass(@cssClass.selected)

  _initWeekViews: ->
    views = {}
    @collection.map (model) =>
      views[model.id] = new BH.Views.WeekView(
        model: model
      , @options)
    views

  _initSearchView: ->
    new BH.Views.SearchView
      model: new BH.Models.Search()

  _initSettingsView: ->
    new BH.Views.SettingsView
      model: settings

  _renderVersionView: ->
    versionView = new BH.Views.VersionView({model: @model})
    $('body').append(versionView.render().el)
    versionView.open()

  getI18nValues: ->
    @i18nFetcher.get([
      'history_title',
      'settings_link',
      'last_week',
      'this_week'
    ])
