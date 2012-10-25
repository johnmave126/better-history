class BH.Models.Day extends BH.Models.Base
  initialize: ->
    @set id: @get('date').format('M-D-YY')

  toHistory: ->
    date: @get('date')

  toTemplate: ->
    date = @get('date')
    properties =
      title: date.format(@t('day_date'))
      formalDate: date.format(@t('formal_date'))
      weekUrl: "#weeks/#{moment(date).past('Monday', 0).format('M-D-YY')}"

    _.extend properties, @toJSON()

  hasHistory: ->
    @history.get('intervals').length > 0
