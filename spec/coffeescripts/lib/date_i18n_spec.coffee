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
          'translated july',
          'translated august',
          'translated september',
          'translated october',
          'translated november',
          'translated december'
        ],
        weekdays: [
          'translated sunday',
          'translated monday',
          'translated tuesday',
          'translated wednesday',
          'translated thursday',
          'translated friday',
          'translated saturday'
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
