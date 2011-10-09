describe('Filters', function() {
  var filters, todayFilter, yesterdayFilter;

  beforeEach(function() {
    todayFilter = new Filter({
      daysSinceToday: 0,
      startTime: DateRanger.borders(0).start.getTime(),
      endTime: DateRanger.borders(0).end.getTime()
    });
    yesterday = new Filter({
      daysSinceToday: 1,
      startTime: DateRanger.borders(1).start.getTime(),
      endTime: DateRanger.borders(1).end.getTime()
    });
    filters = new Filters([todayFilter, yesterdayFilter]);
  });

  describe('#getByHash', function() {
    it('returns the model with the passed hash when found', function() {
      expect(filters.getByHash('0_days_ago')).toEqual(todayFilter);
    });

    it('returns undefined when no model has the passed hash', function() {
      expect(filters.getByHash('asdf')).toBeUndefined();
    });
  });
});
