describe "BH.Lib.I18nFetcher", ->
  beforeEach ->
    chromeAPI = loadChromeAPI()
    @i18nFetcher = new BH.Lib.I18nFetcher(chromeAPI)

  describe '#scopeKey', ->
    it 'returns the key pass w/ i18n_ appended', ->
      expect(@i18nFetcher.scopeKey('key')).toEqual('i18n_key')

  describe '#get', ->
    it 'returns a object containing the translated values of the passed keys', ->
      translations = @i18nFetcher.get(['title', 'delete'])
      expect(translations).toEqual
        i18n_title: 'translated title'
        i18n_delete: 'translated delete'

    it 'returns an empty object when passed no keys', ->
      translations = @i18nFetcher.get()
      expect(translations).toEqual({})

