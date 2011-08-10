describe('Filters', function() {
  var filters, todayFilter, yesterdayFilter;

  beforeEach(function() {
    todayFilter = new Filter({
      name: 'Today',
      hash: 'today',
      title: 'Today',
      startTime: DateRanger.today().start.getTime(),
      endTime: DateRanger.today().end.getTime()
    });
    yesterday = new Filter({
      name: 'Yesterday',
      hash: 'yesterday',
      title: 'Yesterday',
      startTime: DateRanger.yesterday().start.getTime(),
      endTime: DateRanger.yesterday().end.getTime()
    });
    filters = new Filters([todayFilter, yesterdayFilter]);
  });

  describe('#getByHash', function() {
    it('returns the model with the passed hash when found', function() {
      expect(filters.getByHash('today')).toEqual(todayFilter);
    });

    it('returns undefined when no model has the passed hash', function() {
      expect(filters.getByHash('asdf')).toBeUndefined();
    });
  });
});
