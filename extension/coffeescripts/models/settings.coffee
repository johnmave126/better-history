class BH.Models.Settings extends Backbone.Model
  @include BH.Modules.I18n

  storeName: 'settings'

  defaults: ->
    timeGrouping: 15
    domainGrouping: true
    searchByDomain: true
    searchBySelection: true
    openLocation: 'last_visit'
    startingWeekDay: 'Monday'
    weekDayOrder: 'ascending'

  initialize: ->
    @chromeAPI = chrome
    @set timeFormat: parseInt @t('default_time_format'), 10

  toTemplate: ->
    properties =
      startingWeekDays: []
      openLocations: []
      timeGroupings: []
      timeFormats: []
      weekDayOrders: []
      searchBySelection: @get 'searchBySelection'
      searchByDomain: @get 'searchByDomain'
      domainGrouping: @get 'domainGrouping'

    _(['monday', 'tuesday', 'wednesday',
      'thursday', 'friday', 'saturday', 'sunday']).each (day) =>
      properties.startingWeekDays.push
        text: @t day
        value: day

    _(['last_visit', 'current_day', 'current_week']).each (location) =>
      properties.openLocations.push
        text: @t location
        value: location

    _(['descending', 'ascending']).each (order) =>
      properties.weekDayOrders.push
        text: @t order
        value: order

    _([15, 30, 60]).each (timeGrouping) =>
      properties.timeGroupings.push
        text: @t "#{timeGrouping}_minutes_option"
        value: timeGrouping

    _([12, 24]).each (timeFormat) =>
      properties.timeFormats.push
        text: @t "#{timeFormat}_hours_option"
        value: timeFormat

    properties

  parse: (data) ->
    attributes = JSON.parse data
    _.each ['timeFormat', 'timeGrouping'], (attribute) ->
      attributes[attribute] = parseInt attributes[attribute], 10
    attributes
