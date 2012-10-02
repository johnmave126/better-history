class BH.Collections.Days extends Backbone.Collection
  model: BH.Models.Day

  toTemplate: ->
    days = []
    @each (model) ->
      days.push(model.toTemplate())
    days.reverse() if settings.get('weekDayOrder') == 'descending'
    days: days

  destroyHistory: ->
    @each (model) ->
      model.destroyHistory()
