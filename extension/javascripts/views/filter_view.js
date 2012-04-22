FilterView = Backbone.ViewWithSearch.extend({
  className: 'filter_view',
  templateId: 'filter',

  events: {
    'click .collapse_groupings': 'collapseGroupings',
    'click .expand_groupings': 'expandGroupings',
    'click .delete_all': 'clickedDeleteAll'
  },

  initialize: function() {
    Helpers.pageTitle(this.model.get('title'));
    this.model.on('change', this.renderHistory, this);
    this.applySearchBehavior();
  },

  render: function(type) {
    this.$el.attr('data-id', this.model.id);
    this.$el.html(this.template(this.model.toTemplate()));
    var contentElement = $(this.el).children('.content');
    $(contentElement).css({opacity:0}).html('');
    this.$('button').attr('disabled', 'disabled');
    return this;
  },

  renderHistory: function() {
    this.collection = this.model.get('history');

    this.$('.search').focus();
    var contentElement = $(this.el).children('.content');
    $(contentElement).css({opacity:0}).html('');

    var self = this;
    this.collection.each(function(model) {
      $(contentElement).append(new TimeVisitView({
        model: model,
        collection: model.get('pageVisits')
      }).render().el);
    });

    if(this.collection.length === 0) {
      $(contentElement)
        .append(Mustache.render($('#noVisits').html(), i18n.filter()))
        .css({opacity:1});
      this.$('button').attr('disabled', 'disabled');
      $(document).scrollTop(0);
    } else {
      if(this.startTime) {
        var offset = $('[data-time="' + this.startTime + '"]').offset();
        $('body').scrollTop((offset ? offset.top : 0) - 104);
      }
      $(contentElement).css({opacity:1});

      $('.time_visit_view').stickyElements({
        stickyClass:'time_interval',
        padding:104
      }, function(element) { self.updateRoute(element); });

      Helpers.tabIndex($('.content a', this.el));
      this.$('button').attr('disabled', null);
    }
  },

  updateRoute: function(element) {
    var time = $(element).data('time'),
        url = 'filter/' + this.model.id + '/' + time;
    BH.router.navigate(url);
    BH.models.state.set({route: url});
  },

  clickedDeleteAll: function(ev) {
    if($(ev.target).parent().attr('disabled') != 'disabled') {
      ev.preventDefault();
      this.promptView = CreatePrompt(chrome.i18n.getMessage('confirm_delete_all_visits', [this.model.get('formal_date')]));
      this.promptView.open();
      this.promptView.model.on('change', this.deleteAction, this);
    }
  },

  deleteAction: function(prompt) {
    if(prompt.get('action')) {
      if(this.collection) {
        var self = this;
        this.promptView.spin();
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
    this.collection.each(function(model) {
      model.trigger('collapse');
    });
    $(document).scrollTop(0);
  },

  expandGroupings: function(ev) {
    ev.preventDefault();
    this.collection.each(function(model) {
      model.trigger('expand');
    });
    $(document).scrollTop(0);
  }
});
