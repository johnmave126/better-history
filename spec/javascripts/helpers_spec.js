describe('Helpers', function() {
  describe('.getDomain', function() {
    var domain = 'code.google.com';

    it('returns an array with two domain formats', function() {
      var result = Helpers.getDomain('http://' + domain + '/projects');

      expect(result[0]).toEqual('http://' + domain + '/');
      expect(result[1]).toEqual(domain);
    });
  });

  describe('.pageTitle', function() {
    it('sets the page title to the passed string and appends name', function() {
      var title = 'testing 123';
      Helpers.pageTitle(title);
      expect(document.title).toEqual(title + ' - Better History');
    });
  });

  describe('.tabIndex', function() {
    beforeEach(function() {
      setFixtures('<ul class="tab"><li></li><li></li></ul>');
    });

    it('sets the tab index starting from 2 on the match of a selector', function() {
      var selector = $('ul.tab li');
      Helpers.tabIndex(selector);
      expect($(selector[0]).attr('tabindex')).toEqual(2);
      expect($(selector[1]).attr('tabindex')).toEqual(3);
    });
  });
});
