class BH.Collections.Days extends Backbone.Collection
  model: BH.Models.Day

  initialize: (models, options) ->
    _.each _.range(7), (i) =>
      @add
        date: moment(options.week.get('date')).add('days', i)
        weekId: options.week.id

  toTemplate: ->
    days = @map (model) ->
      model.toTemplate()

    if settings.get('weekDayOrder') == 'descending'
      days.reverse()
    days: days

  destroyHistory: ->
    @each (model) ->
      model.destroyHistory()

  visits: ->
    @map (model) ->
      model.get 'count'
