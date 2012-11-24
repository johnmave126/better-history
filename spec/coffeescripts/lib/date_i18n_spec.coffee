describe 'BH.Lib.DateI18n', ->
  beforeEach ->
    spyOn(window.moment, 'lang')
    @dateI18n = new BH.Lib.DateI18n()

  describe '#configure', ->
    it 'assigns the i18n date pieces', ->
      @dateI18n.configure()
      expect(window.moment.lang.argsForCall[0]).toEqual [
        'translated chrome_language',
        months: [
          'translated january',
          'translated february',
          'translated march',
          'translated april',
          'translated may',
          'translated june',
          'July',
          'translated august',
          'September',
          'October',
          'translated november',
          'December'
        ],
        weekdays: [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday'
        ],
        longDateFormat:
          LT: 'translated local_time'
          L: 'MMMM Do'
          LL: 'dddd, MMMM Do'
          LLL: 'MMMM Do YYYY'
        meridiem: jasmine.any(Function)
        ordinal: jasmine.any(Function)
      ]

    it 'sets the default language', ->
      @dateI18n.configure()
      expect(window.moment.lang.argsForCall[1]).toEqual [
        'translated chrome_language'
      ]
