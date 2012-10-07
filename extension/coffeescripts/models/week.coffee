class BH.Models.Week extends BH.Models.Base
  initialize: ->
    @set id: @get('date').format('D-M-YY')
    @days = new BH.Collections.Days(null, week: @)

  toTemplate: ->
    title = @chromeAPI.i18n.getMessage('date_week_label', [
      @get('date').format(@chromeAPI.i18n.getMessage('short_date_with_day'))
    ])
    shortTitle = @get('date').format(@chromeAPI.i18n.getMessage('short_date'))

    _.extend
      shortTitle: shortTitle
      title: title
    , @toJSON(), @days.toTemplate()

  sync: (method, model, options) ->
    if method == 'read'
      callCount = 0
      success = =>
        if callCount == 6
          options.success()
        else
          callCount++

      @days.each (model) ->
        model.fetch {success: success}

  destroyHistory: ->
    @days.destroyHistory()

  parse: ->
    percentages: @days.totalPercentages()
    count: @days.totalVisits()
