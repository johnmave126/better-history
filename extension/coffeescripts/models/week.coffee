class BH.Models.Week extends Backbone.Model
  @include BH.Modules.I18n
  @include BH.Modules.Url

  initialize: ->
    @chromeAPI = chrome
    @set id: @get('date').format('M-D-YY')

  toHistory: ->
    startDate: @get 'date'
    endDate: moment(@get 'date').add('days', 6)

  toTemplate: ->
    days = for day in @inflateDays()
      day: day.format('dddd')
      title: day.format(@t('day_date'))
      inFuture: moment() < day
      url: @urlFor('day', day.format('M-D-YY'))

    copy =
      shortTitle: @get('date').format(@t('short_date'))
      url: @urlFor('week', @id)
      title: @t('date_week_label', [
        @get('date').format(@t('short_date_with_day'))
      ])

    _.extend copy, @toJSON(), days: days

  inflateDays: ->
    for i in [0..6]
      moment(@get('date')).add('days', i)
