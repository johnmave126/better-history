class BH.Models.Interval extends Backbone.Model
  @include BH.Modules.I18n

  initialize: (attrs, options) ->
    @settings = options.settings

  toTemplate: ->
    _.extend
      amount: @t('number_of_visits', [
        @get('visits').length.toString(),
        '<span class="amount">',
        '</span>'
      ])
      time: @formatTime(@get('datetime'), @settings.get('timeFormat'))
      id: @id

    , @get('visits').toTemplate()


  formatTime: (date, format) ->
    convertTo12Hour = (militaryHours) ->
      if militaryHours == 0
        12
      else
        if militaryHours > 12 then militaryHours - 12 else militaryHours

    minute = (minutes) ->
      if minutes == 0 then '00' else minutes

    period = (hours) =>
      key = 'morning'
      if hours > 11
        key = if hours < 18 then 'afternoon' else 'evening'
      @t(key)

    hours = date.getHours()
    hours = convertTo12Hour(hours) if format == 12
    time = hours + ':' + minute(date.getMinutes())
    if format == 12
      time = @t('twelve_hour_time_format', [time, period(date.getHours())])
    time

  findVisitById: (id) ->
    foundVisit = @get('visits').get(id)
    return foundVisit if foundVisit?

    @get('visits').find (visit) =>
      if visit.get('visits')?
        foundVisit = visit.get('visits').get(id)
        return true if foundVisit?
    return foundVisit
