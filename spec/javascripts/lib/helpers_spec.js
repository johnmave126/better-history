describe('Helpers', function() {
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
});
