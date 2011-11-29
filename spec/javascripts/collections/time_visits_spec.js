describe("TimeVisits", function() {
  var timeVisits;

  beforeEach(function() {
    timeVisits = new TimeVisits();
  });

  it('represents TimeVisit models', function() {
    expect(timeVisits.model).toEqual(TimeVisit);
  });

  describe('#destroyAll', function() {
    it('calls destroy on models in the collection', function() {
      var timeVisit1 = new TimeVisit(),
          timeVisit2 = new TimeVisit();

      spyOn(timeVisit1, 'destroy').andCallThrough();
      spyOn(timeVisit2, 'destroy').andCallThrough();

      timeVisits.add([timeVisit1, timeVisit2]);
      timeVisits.destroyAll();

      expect(timeVisit1.destroy).toHaveBeenCalled();
      expect(timeVisit2.destroy).toHaveBeenCalled();
    });
  });
});
