class BH.Models.Interval extends BH.Models.Base
  toTemplate: ->
    _.extend
      amount: @chromeAPI.i18n.getMessage('number_of_visits', [
        @get('visits').length.toString(),
        '<span class="amount">',
        '</span>'
      ])
      time: @formatTime(@get('datetime'), settings.timeFormat())
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
      @chromeAPI.i18n.getMessage(key)

    hours = date.getHours()
    hours = convertTo12Hour(hours) if format == 12
    time = hours + ':' + minute(date.getMinutes())
    if format == 12
      @chromeAPI.i18n.getMessage('twelve_hour_time_format', [time, period(date.getHours())])
    time
