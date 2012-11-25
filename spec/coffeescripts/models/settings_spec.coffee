describe 'BH.Models.Settings', ->
  beforeEach ->
    @settings = new BH.Models.Settings()

  describe '#toTemplate', ->
    it 'returns properties for the view template', ->
      expect(@settings.toTemplate()).toEqual
        startingWeekDays: [
          {text: 'Monday', value: 'monday'},
          {text: 'Tuesday', value: 'tuesday'},
          {text: 'Wednesday', value: 'wednesday'},
          {text: 'Thursday', value: 'thursday'},
          {text: 'Friday', value: 'friday'},
          {text: 'Saturday', value: 'saturday'},
          {text: 'Sunday', value: 'sunday'},
        ]
        openLocations: [
          {text: 'translated last_visit', value: 'last_visit'},
          {text: 'translated current_day', value: 'current_day'},
          {text: 'translated current_week', value: 'current_week'}
        ]
        weekDayOrders: [
          {text: 'translated descending', value: 'descending'},
          {text: 'translated ascending', value: 'ascending'}
        ]
        timeGroupings: [
          {text: 'translated 15_minutes_option', value: 15},
          {text: 'translated 30_minutes_option', value: 30},
          {text: 'translated 60_minutes_option', value: 60}

        ]
        searchBySelection: true
        searchByDomain: true
        domainGrouping: true

