FilterView = Backbone.View.extend({
  className: 'filter_view',

  events: {
    'click .collapse_groupings': 'collapseGroupings',
    'click .expand_groupings': 'expandGroupings',
    'change .time_grouping': 'changeTimeGrouping'
  },

  initialize: function() {
    Helpers.pageTitle(this.model.get('title'));
    this.model.bind('change', this.renderHistory, this);
  },

  render: function(type) {
    $(this.el).append(ich.filter(this.model.presenter())).fadeIn('fast');
    return this;
  },

  renderHistory: function() {
    this.collection = this.model.get('history');

    var self = this;
    $('.content', this.el).fadeOut('fast', function() {
      $.each(self.collection.models, function() {
        $('.content', self.el).append(new TimeVisitView({
            model: this,
            collection: this.get('pageVisits')
          }).render().el);
      });

      if(self.collection.length === 0) $(this).append(ich.noVisits());

      $(this).fadeIn('fast', function() {
        $('.time_visit_view').stickyElements({
          stickyClass:'time_interval',
          padding:48
        });
        Helpers.tabIndex($('.content a', this.el));
      });
    });
  },

  changeTimeGrouping: function(ev) {
    ev.preventDefault();
    this.model.set({timeGrouping: parseInt($(ev.currentTarget).val(), 10)}, {silent: true});
    this.model.fetch();
  },

  collapseGroupings: function(ev) {
    ev.preventDefault();
    $.each(this.collection.models, function() {
      this.trigger('collapse');
    });
    $(document).scrollTop(0);
  },

  expandGroupings: function(ev) {
    ev.preventDefault();
    $.each(this.collection.models, function() {
      this.trigger('expand');
    });
    $(document).scrollTop(0);
  }
});
