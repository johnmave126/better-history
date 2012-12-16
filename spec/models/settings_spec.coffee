describe 'BH.Models.Settings', ->
  beforeEach ->
    @settings = new BH.Models.Settings()

  describe '#toTemplate', ->
    it 'returns properties for the view template', ->
      expect(@settings.toTemplate()).toEqual
        startingWeekDays: [
          {text: '[translated monday]', value: 'monday'},
          {text: '[translated tuesday]', value: 'tuesday'},
          {text: '[translated wednesday]', value: 'wednesday'},
          {text: '[translated thursday]', value: 'thursday'},
          {text: '[translated friday]', value: 'friday'},
          {text: '[translated saturday]', value: 'saturday'},
          {text: '[translated sunday]', value: 'sunday'},
        ]
        openLocations: [
          {text: '[translated last_visit]', value: 'last_visit'},
          {text: '[translated current_day]', value: 'current_day'},
          {text: '[translated current_week]', value: 'current_week'}
        ]
        weekDayOrders: [
          {text: '[translated descending]', value: 'descending'},
          {text: '[translated ascending]', value: 'ascending'}
        ]
        timeGroupings: [
          {text: '[translated 15_minutes_option]', value: 15},
          {text: '[translated 30_minutes_option]', value: 30},
          {text: '[translated 60_minutes_option]', value: 60}

        ]
        searchBySelection: true
        searchByDomain: true
        domainGrouping: true

