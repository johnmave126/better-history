describe('Filters', function() {
  var filters;

  beforeEach(function() {
    loadChromeAPI();
    filters = new Filters();
    _(_.range(14)).each(function(index) {
      filters.add({
        daysSinceToday: index,
        hash: index + '_days_ago',
        startTime: DateRanger.borders(index).start.getTime(),
        endTime: DateRanger.borders(index).end.getTime()
      });
    });
  });

  it('represents Filter models', function() {
    expect(new filters.model() instanceof Filter).toBeTruthy();
  });

  describe('#getByHash', function() {
    it('returns the model with the passed hash when found', function() {
      expect(filters.getByHash('0_days_ago')).toEqual(filters.at(0));
    });

    it('returns undefined when no model has the passed hash', function() {
      expect(filters.getByHash('asdf')).toBeUndefined();
    });
  });

  describe('#fetchCounts', function() {
    it('fetchs the counts on all the models', function() {
      spyOn(filters.at(0), 'fetchCount');
      spyOn(filters.at(1), 'fetchCount');
      filters.fetchCounts();
      expect(filters.at(0).fetchCount).toHaveBeenCalled();
      expect(filters.at(1).fetchCount).toHaveBeenCalled();
    });
  });

  describe('#toTemplate', function() {
    it('returns the view templates for each filter scoped by week', function() {

      expect(filters.toTemplate()).toEqual({
        this_week_filters: [
          filters.at(0).toTemplate(),
          filters.at(1).toTemplate(),
          filters.at(2).toTemplate(),
          filters.at(3).toTemplate(),
          filters.at(4).toTemplate(),
          filters.at(5).toTemplate(),
          filters.at(6).toTemplate()
        ],
        last_week_filters: [
          filters.at(7).toTemplate(),
          filters.at(8).toTemplate(),
          filters.at(9).toTemplate(),
          filters.at(10).toTemplate(),
          filters.at(11).toTemplate(),
          filters.at(12).toTemplate(),
          filters.at(13).toTemplate()
        ]
      });
    });
  });
});
