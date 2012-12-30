describe 'BH.Models.Search', ->
  beforeEach ->
    @search = new BH.Models.Search()

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
        title: '[translated searching_title] "search" [translated and] "term"'
        query: 'search term'

  describe '#validQuery', ->
    it 'returns true when the query property is a non empty string', ->
      @search.set 'query', 'value'
      expect(@search.validQuery()).toBeTruthy()

    it 'returns false when the query property is a empty string', ->
      @search.set 'query', ''
      expect(@search.validQuery()).toBeFalsy()
