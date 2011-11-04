FilterView = Backbone.View.extend({
  className: 'filter_view',

  events: {
    'click .collapse_groupings': 'collapseGroupings',
    'click .expand_groupings': 'expandGroupings',
    'change .time_grouping': 'changeTimeGrouping'
  },

  initialize: function() {
    pageTitle(this.model.get('title'));
    this.model.bind('change', this.renderTimeVisits, this);
  },

  render: function(type) {
    $(this.el).append(ich.filter(this.model.presenter())).fadeIn('fast');
    return this;
  },

  renderTimeVisits: function() {
    var timeVisits = this.model.get('timeVisits').models,
        self = this;

    $.each(timeVisits, function() {
      var timeVisitView = new TimeVisitView({model: this, collection: this.get('visits')});
      $('.content', self.el).append(timeVisitView.render().el);
    });
    $('.content', this.el).fadeIn('fast', function() {
      $('.time_visit_view').stickyElements({stickyClass:'time_interval', padding:48});
    });

    if(timeVisits.length === 0) {
      ich.noVisits().appendTo($('.content', this.el));
    }
  },

  changeTimeGrouping: function(ev) {
    ev.preventDefault();
    timeGrouping = $(ev.currentTarget).val();
    this.model.fetch({searchOptions: this.model.options()});
  },

  collapseGroupings: function(ev) {
    ev.preventDefault();
    $.each(this.model.get('timeVisits').models, function() {
      this.trigger('collapse');
    });
    $(document).scrollTop(0);
  },

  expandGroupings: function(ev) {
    ev.preventDefault();
    $.each(this.model.get('timeVisits').models, function() {
      this.trigger('expand');
    });
    $(document).scrollTop(0);
  }
});
