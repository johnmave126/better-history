describe 'BH.Workers.DomainGrouper', ->
  beforeEach ->
    @domainGrouper = new BH.Workers.DomainGrouper()

  describe '#run', ->
    beforeEach ->
      @interval1 =
        id: '12:00'
        visits: [
          {url: 'http://yahoo.com'},
          {url: 'http://google.com/gmail'},
          {url: 'http://google.com/search'}
        ]
      @interval2 =
        id: '1:00'
        visits: [
          {url: 'http://google.com/gmail'}
        ]
      @interval3 =
        id: '2:00'
        visits: [
          {url: 'http://google.com/gmail'},
          {url: 'https://google.com/search'}
          {url: 'malformatted/yahoo.oops'}
        ]

      @intervals = [@interval1, @interval2, @interval3]

    it 'returns the visit intervals w/ visits grouped by domains', ->
      expect(@domainGrouper.run(@intervals)).toEqual [
        {
          id: '12:00',
          visits: [
            {url: 'http://yahoo.com'},
            [
              {url: 'http://google.com/gmail'},
              {url: 'http://google.com/search'}
            ]
          ]
        },
        {
          id: '1:00',
          visits: [
            {url: 'http://google.com/gmail'}
          ]
        },
        {
          id: '2:00',
          visits: [
            [
              {url: 'http://google.com/gmail'}
              {url: 'https://google.com/search'}
            ],
            {url: 'malformatted/yahoo.oops'}
          ]
        }
      ]

