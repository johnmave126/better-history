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
    var visits = this.model.get('visits').models,
        self = this;

    $('.content', this.el).fadeOut('fast', function() {
      $(this).html('');
      if(self.model.get('timeGrouping') === 0) {
        $.each(visits, function() {
          $('.content', self.el)
            .append(new PageVisitView({model: this}).render().el);
        });
      } else {
        $.each(visits, function() {
          $('.content', self.el)
            .append(new TimeVisitView({
              model: this, collection: this.get('visits')
            }).render().el);
        });
      }
      if(visits.length === 0) ich.noVisits().appendTo(this);

      $(this).fadeIn('fast', function() {
        $('.time_visit_view').stickyElements({stickyClass:'time_interval', padding:48});
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
