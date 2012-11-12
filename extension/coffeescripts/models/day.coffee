class BH.Models.Day extends Backbone.Model
  @include BH.Modules.chromeSupport
  @include BH.Modules.urlSupport

  initialize: (attrs, options) ->
    @settings = options.settings
    @set id: @get('date').format('M-D-YY')

  toHistory: ->
    date: @get('date')

  toTemplate: ->
    date = @get('date')
    weekId = @startingWeekDate().format('M-D-YY')

    properties =
      title: date.format(@t('day_date'))
      formalDate: date.format(@t('formal_date'))
      weekUrl: @urlFor('week', weekId)

    _.extend properties, @toJSON()

  startingWeekDate: ->
    moment(@get('date')).past(@settings.get('startingWeekDay'), 0)
