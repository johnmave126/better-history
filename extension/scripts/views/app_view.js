AppView = Backbone.View.extend({
  render: function() {
    var filtersView = new FiltersView({collection: this.filters()});
    $('.navbar', this.el).append(filtersView.render().el).hide().fadeIn("fast");
    return this;
  },

  filters: function() {
    return new Filters([
      new Filter({
        name: 'Today',
        hash: 'today',
        title: 'Today',
        startTime: DateRanger.today().start.getTime(),
        endTime: DateRanger.today().end.getTime()
      }),
      new Filter({
        name: 'Yesterday',
        hash: 'yesterday',
        title: 'Yesterday',
        startTime: DateRanger.yesterday().start.getTime(),
        endTime: DateRanger.yesterday().end.getTime()
      }),
      new Filter({
        name: 'Day before',
        hash: 'dayBefore',
        title: 'Day before yesterday',
        startTime: DateRanger.dayBefore().start.getTime(),
        endTime: DateRanger.dayBefore().end.getTime()
      }),
      new Filter({
        name: 'Past 7 days',
        hash: 'week',
        title: 'Past 7 days',
        startTime: DateRanger.week().start.getTime(),
        endTime: DateRanger.week().end.getTime()
      })
    ]);
  }
});
