FilterView = Backbone.View.extend({
  className: 'filter_view',

  events: {
    'click .collapse_groupings': 'collapseGroupings',
    'click .expand_groupings': 'expandGroupings'
  },

  collapseGroupings: function(ev) {
    ev.preventDefault();
    if(this.collection) {
      $.each(this.collection.models, function(i, timeVisit) {
        timeVisit.trigger('collapse');
      });
    }
  },

  expandGroupings: function(ev) {
    ev.preventDefault();
    if(this.collection) {
      $.each(this.collection.models, function(i, timeVisit) {
        timeVisit.trigger('expand');
      });
    }
    $(document).scrollTop(0);
  },

  render: function(type) {
    $(this.el).hide();
    $('#filterTemplate').tmpl(this.model.presenter()).appendTo(this.el);

    var self = this;
    $(this.el).fadeIn('fast', function() {
      //$('.spinner').spin();
      PageVisit.search(self.model.options(), function(results) {
        $('.content', self.el).html('').hide();
        if(results.length === 0) {
          self.renderNoResults();
        } else {
          self.renderTimeVisits(results);
        }
        self.update();
      });
    });

    return this;
  },

  renderNoResults: function () {
    $('#noVisitsTemplate').tmpl().appendTo($('.content', this.el));
  },

  renderTimeVisits: function(pageVisits) {
    var timeVisitView, total = 0;
    this.collection = GroupBy.time(pageVisits);

    var self = this;
    $.each(this.collection.models, function(i, timeVisit) {
      timeVisitView = new TimeVisitView({
        model: timeVisit,
        collection: timeVisit.get('pageVisits')
      });
      total += timeVisit.get('pageVisits').length;
      $('.content', self.el).append(timeVisitView.render().el);
    });
  },


  update: function() {
    $('.content', this.el).fadeIn('fast', function() {
      $('.time_visit_view').stickySectionHeaders({
        stickyClass:'time_interval',
        padding:48
      });
    });
  }
});
