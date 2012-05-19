class BH.Views.AppView extends Backbone.View
  className: 'app_view'
  templateId: 'app'
  selectedClass: 'selected'

  weekViews: {}

  events:
    'click .navbar a': 'weekClicked'

  initialize: (config, @options) ->
    if @model.get('suppress') == false
      versionView = new VersionView({model: @model})
      $('body').append(versionView.render().el)
      versionView.open()


  render: ->
    properties = _.extend(i18n.app(), @collection.toTemplate())
    @$el.html @template(properties)
    @collection.each (model) =>
      @weekViews[model.id] = new BH.Views.WeekView(
        model: model
      , @options)
      @$('.mainview').append(@weekViews[model.id].render().el)

    @

  weekClicked: (ev) ->
    @$('.navbar a').removeClass(@selectedClass)
    @$(ev.currentTarget).addClass(@selectedClass)
