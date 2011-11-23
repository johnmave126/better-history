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

  describe('.formatDate', function() {
    it('returns a formatted date', function() {
      var date = new Date('december 5, 2010 10:15 pm');
      expect(Helpers.formatDate(date)).toEqual('December 05, 2010');
    });
  });

  describe('.formatTime', function() {
    it('returns a formatted 12 hour time when format is 12', function() {
      var date = new Date('december 5, 2010 10:15 pm');
      expect(Helpers.formatTime(date, 12)).toEqual('10:15 PM');
    });

    it('returns a formatted 24 hour time when format is 24', function() {
      var date = new Date('december 5, 2010 10:15 pm');
      expect(Helpers.formatTime(date, 24)).toEqual('22:15');
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
