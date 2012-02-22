FilterView = Backbone.View.extend({
  className: 'filter_view',
  templateId: 'filter',

  events: {
    'click .collapse_groupings': 'collapseGroupings',
    'click .expand_groupings': 'expandGroupings',
    'click .delete_all': 'clickedDeleteAll',
  },

  initialize: function() {
    Helpers.pageTitle(this.model.get('title'));
    this.model.on('change', this.renderHistory, this);
  },

  render: function(type) {
    this.$el.html(this.template(this.model.toTemplate()));
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
      $(contentElement)
        .append(Mustache.render($('#noVisits').html(), i18n.filter()))
        .css({opacity:1});
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
    var time = $(element).data('time'),
        url = 'filter/' + this.model.get('hash') + '/' + time;
    BH.router.navigate(url);
    BH.router.setLastRoute(url);
  },

  clickedDeleteAll: function(ev) {
    ev.preventDefault();
    this.promptView = CreatePrompt(chrome.i18n.getMessage('confirm_delete_all_visits', [this.model.get('formal_date')]));
    this.promptView.open();
    this.promptView.model.on('change', this.deleteAction, this);
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
