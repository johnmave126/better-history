describe('GroupedVisits', function() {
  describe('#summary', function() {
    var groupedVisits, visits;

    beforeEach(function() {
      pageVisits = [
        new PageVisit({
          url: 'http://google.com/page'
        }),
        new PageVisit({
          url: 'http://google.com/asdf/asdf'
        })
      ];
      groupedVisits = new GroupedVisits(pageVisits);
    });

    it('returns the domain', function() {
      expect(groupedVisits.summary().domain).toEqual(pageVisits[1].domain());
    });

    it('returns the url for the first page visit', function() {
      expect(groupedVisits.summary().url).toEqual(groupedVisits.at(0).get('url'));
    });
  });
});
