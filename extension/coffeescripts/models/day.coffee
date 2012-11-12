class BH.Models.Day extends BH.Models.Base
  initialize: (attrs, options) ->
    super(attrs, options)
    @set id: @get('date').format('M-D-YY')

  toHistory: ->
    date: @get('date')

  toTemplate: ->
    date = @get('date')
    weekId = @startingWeekDate().format('M-D-YY')

    properties =
      title: date.format(@t('day_date'))
      formalDate: date.format(@t('formal_date'))
      weekUrl: @urlBuilder.build('week', weekId)

    _.extend properties, @toJSON()

  startingWeekDate: ->
    moment(@get('date')).past(@settings.get('startingWeekDay'), 0)
