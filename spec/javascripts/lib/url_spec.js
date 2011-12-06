describe('Url', function() {
  describe('.base', function() {
    it('returns the base url', function() {
      expect(Url.base()).toEqual('chrome://history/');
    });
  });

  describe('.search', function() {
    it('returns a search url for the text passed', function() {
      var text = 'search this';
      expect(Url.search(text)).toEqual('chrome://history/#search/' + text);
    });
  });
});
