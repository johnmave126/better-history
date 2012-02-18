describe('Helpers', function() {
  beforeEach(function() {
    loadChromeAPI();
  });

  describe('.formatTime', function() {
    it('returns the time in 24 hour format when specified in params', function() {
      var date = new Date('12/2/10 23:00');
      expect(Helpers.formatTime(date, 24)).toEqual('23:00');
    });

    it('returns the time in 12 hour format with a morning abbreviation when specified in params', function() {
      var date = new Date('12/2/10 3:00');
      expect(Helpers.formatTime(date, 12)).toEqual('3:00 AM');
    });

    it('returns the time in 12 hour format with an afternoon abbreviation when specified in params', function() {
      var date = new Date('12/2/10 12:00');
      expect(Helpers.formatTime(date, 12)).toEqual('12:00 afternoon PM');
    });

    it('returns the time in 12 hour format with an evening abbreviation when specified in params', function() {
      var date = new Date('12/2/10 18:00');
      expect(Helpers.formatTime(date, 12)).toEqual('6:00 evening PM');
    });
  });

  describe('.formatExtendedFormalDate', function() { 
    it('returns the formally formated extended date', function() {
      var date = new Date('12/2/10 18:00');
      expect(Helpers.formatExtendedFormalDate(date)).toEqual('Thursday, December 2, 2010');
    });
  });

  describe('.formatFormalDate', function() { 
    it('returns the formal date', function() {
      var date = new Date('12/2/10 18:00');
      expect(Helpers.formatFormalDate(date)).toEqual('December 2, 2010');
    });
  });

  describe('.formatExtendedFormalDate', function() { 
    it('returns the formally formated extended date', function() {
      var date = new Date('12/2/10 18:00');
      expect(Helpers.formatExtendedFormalDate(date)).toEqual('Thursday, December 2, 2010');
    });
  });

  describe('.getDomain', function() {
    it('gets the domain from a url', function() {
      expect(Helpers.getDomain('http://www.google.com/page')[0]).toEqual('http://www.google.com/');
    });
  });

  describe('.pageTitle', function() {
    it('sets the page title and appends Better History', function() {
      Helpers.pageTitle('title');
      expect(document.title).toEqual('title - Better History'); 
    });
  });
});
