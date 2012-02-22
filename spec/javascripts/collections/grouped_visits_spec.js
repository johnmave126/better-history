describe('GroupedVisits', function() {
  var groupedVisits, visits;

  beforeEach(function() {
    loadChromeAPI();
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

  it('represents PageVisit models', function() {
    expect(new groupedVisits.model() instanceof PageVisit).toBeTruthy();
  });

  describe('#toTemplate', function() {
    it('returns the domain', function() {
      var properties = groupedVisits.toTemplate();
      expect(properties.domain).toEqual(pageVisits[1].domain());
    });

    it('returns the url for the first page visit', function() {
      var properties = groupedVisits.toTemplate();
      expect(properties.url).toEqual(groupedVisits.at(0).get('url'));
    });

    it('returns translated values', function() {
      var properties = groupedVisits.toTemplate();
      expect(properties.i18n_collapse_button).toBeDefined();
    });
  });

  describe('#destroyAll', function() {
    it('calls destroy all on models in the collection', function() {
      var pageVisit1 = new PageVisit({url: 'google.com', lastVisitTime:new Date()});
      var pageVisit2 = new PageVisit({url: 'yahoo.com', lastVisitTime: new Date()});
      var groupedVisits = new GroupedVisits([pageVisit1, pageVisit2]);

      spyOn(pageVisit1, 'destroy').andCallThrough();
      spyOn(pageVisit2, 'destroy').andCallThrough();

      groupedVisits.destroyAll();

      expect(pageVisit1.destroy).toHaveBeenCalled();
      expect(pageVisit2.destroy).toHaveBeenCalled();
    });
  });
});
