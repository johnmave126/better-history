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

    $('.content', this.el).css({opacity:0});

    var self = this;
    $.each(self.collection.models, function() {
      $('.content', self.el).append(new TimeVisitView({
          model: this,
          collection: this.get('pageVisits')
        }).render().el);
    });

    if(self.collection.length === 0) {
      $(this).append(ich.noVisits());
    } else {
      if(this.startTime) {
        $('body').scrollTop($('[data-time="' + this.startTime + '"]').offset().top - 48);
      }
      $('.content', this.el).css({opacity:1});
      $('.time_visit_view').stickyElements({
        stickyClass:'time_interval',
        padding:48
      }, function(element) { self.updateRoute(element); });

      Helpers.tabIndex($('.content a', this.el));
    }
  },

  updateRoute: function(element) {
    var time = $(element).attr('data-time'),
        url = 'filter/' + this.model.get('hash') + '/' + time;
    router.navigate(url);
    router.setLastRoute(url);
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
