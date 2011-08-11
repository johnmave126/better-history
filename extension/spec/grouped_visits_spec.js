describe('GroupedVisits', function() {
  describe('#summary', function() {
    var groupedVisits, visits;

    beforeEach(function() {
      visits = [
        new Visit({
          url: 'http://google.com/page'
        }),
        new Visit({
          url: 'http://google.com/asdf/asdf'
        })
      ];
      groupedVisits = new GroupedVisits(visits);
    });

    it('returns the domain', function() {
      expect(groupedVisits.summary().domain).toEqual(visits[1].domain());
    });

    it('returns the number of page visits', function() {
      expect(groupedVisits.summary().amount).toEqual(visits.length);
    });

    it('returns the url for the first page visit', function() {
      expect(groupedVisits.summary().url).toEqual(groupedVisits.at(0).get('url'));
    });
  });
});
