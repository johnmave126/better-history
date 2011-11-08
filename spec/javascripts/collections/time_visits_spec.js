describe("TimeVisits", function() {
  var timeVisits;

  beforeEach(function() {
    timeVisits = new TimeVisits();
  });

  it('represents TimeVisit models', function() {
    expect(new timeVisits.model() instanceof TimeVisit).toBeTruthy();
  });
});
