class BH.Views.AppView extends BH.Views.BaseView
  className: 'app_view'
  templateId: 'app'

  class:
    selected: 'selected'

  events:
    'click .navbar a': 'weekClicked'

  initialize: (config, @options) ->
    @views =
      weeks: @_initWeekViews()
      search: @_initSearchView()
      settings: @_initSettingsView()

  render: ->
    @_renderVersionView() if !@model.get('suppress')

    properties = _.extend(i18n.app(), @collection.toTemplate())
    @$el.html(@template(properties))

    container = @$('.mainview')

    _.each @views.weeks, (weekView) =>
      container.append(weekView.render().el)
    container.append(@views.search.render().el)
    container.append(@views.settings.render().el)

    @

  weekClicked: (ev) ->
    @$('.navbar a').removeClass(@class.selected)
    @$(ev.currentTarget).addClass(@class.selected)

  weekSelected: (id) ->
    @$("[data-id=#{id}] a").addClass(@class.selected)

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
