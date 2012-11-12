describe 'BH.Models.Search', ->
  beforeEach ->
    @search = new BH.Models.Search null,
      chromeAPI: loadChromeAPI()

  describe '#initialize', ->
    it 'defaults the query to an empty string', ->
      expect(@search.get('query')).toEqual ''

  describe '#toHistory', ->
    beforeEach ->
      @search.set query: 'search term'

    it 'returns the needed properties for the history API', ->
      expect(@search.toHistory()).toEqual
        query: 'search term'

  describe '#toTemplate', ->
    beforeEach ->
      @search.set query: 'search term'

    it 'returns the properties needed for a view template', ->
      expect(@search.toTemplate()).toEqual
        title: 'Searching "search" and "term"'
        query: 'search term'
