class BH.Models.Week extends BH.Models.Base
  initialize: ->
    @set id: @get('date').format('D-M-YY')
    @history = new BH.Models.WeekHistory @toHistory()

  toHistory: ->
    startDate: @get 'date'
    endDate: moment(@get 'date').add('days', 6)

  toTemplate: ->
    days = for day in @inflateDays()
      day: day.format('dddd')
      title: day.format(@t('day_date'))
      inFuture: moment() < day
      url: "#weeks/#{@get('id')}/days/#{day.format('D')}"

    copy =
      shortTitle: @get('date').format(@t('short_date'))
      title: @t('date_week_label', [
        @get('date').format(@t('short_date_with_day'))
      ])

    _.extend copy, @toJSON(), days: days

  inflateDays: ->
    for i in [0..6]
      moment(@get('date')).add('days', i)
