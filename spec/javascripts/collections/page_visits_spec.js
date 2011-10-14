describe("PageVisits", function() {
  it('exists', function() {
    expect(PageVisits).toBeDefined();
  });

  describe('#destroyAll', function() {
    it('calls destroy all on models in the collection', function() {
      var pageVisit1 = new PageVisit({url: 'google.com', lastVisitTime:new Date()});
      var pageVisit2 = new PageVisit({url: 'yahoo.com', lastVisitTime: new Date()});
      var pageVisits = new PageVisits([pageVisit1, pageVisit2]);

      spyOn(pageVisit1, 'destroy').andCallThrough();
      spyOn(pageVisit2, 'destroy').andCallThrough();

      pageVisits.destroyAll();

      expect(pageVisit1.destroy).toHaveBeenCalled();
      expect(pageVisit2.destroy).toHaveBeenCalled();
    });
  });
});
