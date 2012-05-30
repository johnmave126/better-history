class BH.Models.Day extends Backbone.Model
  format:
    title: 'dddd'
    subTitle: 'MMMM Do'
    formalDate: 'MMMM Do YYYY'
    extendedFormalDate: 'dddd MMMM Do YYYY'
    id: 'D'

  initialize: (properties, @options) ->
    id = @_dateFormat('id')
    this.set({
      title: @_dateFormat('title')
      subTitle: @_dateFormat('subTitle')
      inFuture: moment() < @get('date')
      formalDate: @_dateFormat('formalDate')
      extendedFormalDate: @_dateFormat('extendedFormalDate')
      id: id
      url: BH.Lib.Url.day(@get('weekId'), id)
    })

  toTemplate: ->
    @toJSON()

  toChrome: ->
    {text: @get('filter') || '', startTime: @_getSOD(), endTime: @_getEOD()}

  sync: (method, model, options) ->
    if method == 'read'
      chromeAPI.history.search @toChrome(), (history) ->
        options.success(GroupBy.time(history, settings.timeGrouping()))

  clear: ->
    chrome.history.deleteRange
      startTime: @_getSOD()
      endTime: @_getEOD()
    , =>
      @set({history: new BH.Collections.Intervals()})

  parse: (data) ->
    history = new BH.Collections.Intervals()
    count = 0

    $.each data, ->
      history.add
        id: @id
        datetime: @datetime
        pageVisits: new BH.Collections.Visits(@pageVisits)
      count += @pageVisits.length

    history: history
    count: count

  _getSOD: ->
    new Date(@get('date').sod()).getTime()

  _getEOD: ->
    new Date(@get('date').eod()).getTime()

  _dateFormat: (type) ->
    @get('date').format(@format[type])
