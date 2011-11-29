FilterView = Backbone.View.extend({
  className: 'filter_view',

  events: {
    'click .collapse_groupings': 'collapseGroupings',
    'click .expand_groupings': 'expandGroupings',
    'click .delete_all': 'clickedDeleteAll',
    'change .time_grouping': 'changeTimeGrouping'
  },

  initialize: function() {
    Helpers.pageTitle(this.model.get('title'));
    this.model.bind('change', this.renderHistory, this);
  },

  render: function(type) {
    $(this.el).html(ich.filter(this.model.presenter()));
    return this;
  },

  renderHistory: function() {
    this.collection = this.model.get('history');

    var contentElement = $(this.el).children('.content');
    $(contentElement).css({opacity:0}).html('');

    var self = this;
    $.each(this.collection.models, function(i) {
      $(contentElement).append(new TimeVisitView({
        model: this,
        collection: this.get('pageVisits')
      }).render().el);
    });

    if(this.collection.length === 0) {
      $(contentElement).append(ich.noVisits()).css({opacity:1});
    } else {
      if(this.startTime) {
        var offset = $('[data-time="' + this.startTime + '"]').offset();
        $('body').scrollTop((offset ? offset.top : 0) - 48);
      }
      $(contentElement).css({opacity:1});

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

  clickedDeleteAll: function(ev) {
    ev.preventDefault();
    this.promptView = new PromptView({
      model: new Prompt({
        title: 'Confirm',
        content: 'Delete all visits from ' + this.model.presenter().date + '?'
      })
    });
    $('body').append(this.promptView.render().el);
    this.promptView.open();
    this.promptView.model.bind('change', this.deleteAction, this);
  },

  deleteAction: function(prompt) {
    if(prompt.get('action')) {
      if(this.collection) {
        var self = this;
        this.model.destroyHistory(function() {
          self.model.set({history: new TimeVisits()});
          self.promptView.close();
        });
      }
    } else {
      this.promptView.close();
    }
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
