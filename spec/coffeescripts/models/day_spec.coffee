describe 'BH.Models.Day', ->
  beforeEach ->
    @date = moment(new Date('October 11, 2012'))

    @day = new BH.Models.Day {date: @date},
      settings: new BH.Models.Settings()

  describe '#initialize', ->
    it 'sets the id', ->
      expect(@day.id).toEqual('10-11-12')

  describe '#toHistory', ->
    it 'returns the needed properties for the history API', ->
      expect(@day.toHistory()).toEqual
        date: @date

  describe '#toTemplate', ->
    it 'returns the properties needed for a view template', ->
      expect(@day.toTemplate()).toEqual
        title: '[translated thursday]'
        formalDate: 'translated formal_date'
        weekUrl: '#weeks/10-8-12'
        id: '10-11-12'
        date: @date

  describe '#startingWeekDay', ->
    it 'returns the starting week date for the day based on the starting week day from the settings', ->
      expect(@day.startingWeekDate().id()).toEqual '10-8-12'
