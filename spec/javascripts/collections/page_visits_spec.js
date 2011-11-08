describe("PageVisits", function() {
  var pageVisits, pageVisits1, pageVisits2;

  beforeEach(function() {
    pageVisit1 = new PageVisit({url: 'google.com', lastVisitTime:new Date()});
    pageVisit2 = new PageVisit({url: 'yahoo.com', lastVisitTime: new Date()});
    pageVisits = new PageVisits([pageVisit1, pageVisit2]);
  });

  it('represents PageVisit models', function() {
    expect(new pageVisits.model() instanceof PageVisit).toBeTruthy();
  });

  describe('#destroyAll', function() {
    it('calls destroy all on models in the collection', function() {

      spyOn(pageVisit1, 'destroy').andCallThrough();
      spyOn(pageVisit2, 'destroy').andCallThrough();

      pageVisits.destroyAll();

      expect(pageVisit1.destroy).toHaveBeenCalled();
      expect(pageVisit2.destroy).toHaveBeenCalled();
    });
  });
});
