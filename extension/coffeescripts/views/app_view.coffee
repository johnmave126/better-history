class BH.Views.AppView extends Backbone.View
  className: 'app_view'
  templateId: 'app'
  selectedClass: 'selected'

  weekViews: {}

  events:
    'click .navbar a': 'weekClicked'

  initialize: (config, @options) ->
    @views = {
      weeks: {}
    }
    if @model.get('suppress') == false
      versionView = new VersionView({model: @model})
      $('body').append(versionView.render().el)
      versionView.open()


  render: ->
    properties = _.extend(i18n.app(), @collection.toTemplate())
    @$el.html @template(properties)
    @collection.each (model) =>
      @views.weeks[model.id] = new BH.Views.WeekView(
        model: model
      , @options)
      @$('.mainview').append(@views.weeks[model.id].render().el)

    @views.search = new BH.Views.SearchView
      model: new BH.Models.Search()
    @$('.mainview').append(@views.search.render().el)

    @views.settings = new BH.Views.SettingsView
      model: settings
    @$('.mainview').append(@views.settings.render().el)
    @

  weekClicked: (ev) ->
    @$('.navbar a').removeClass(@selectedClass)
    @$(ev.currentTarget).addClass(@selectedClass)
