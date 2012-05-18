WeekView = Backbone.ViewWithSearch.extend({
  className: 'week_view',
  templateId: 'week',

  events: {
    'click .delete_all': 'clickedDeleteAll'
  },

  initialize: function() {
    this.applySearchBehavior();
    this.model.bind('change:percentages', this.updatePercentages, this);
    this.model.bind('change:count', this.updateWeekStats, this);

    var self = this;
    this.model.get('days').each(function(model) {
      model.bind('change:count', self.updateDay, self);
    });
  },

  render: function(type) {
    this.$el.html(this.template(_.extend(i18n.week(), this.model.toTemplate())));
    return this;
  },

  updateDay: function(model) {
    $('.number_of_visits', this._getDayElement(model.id)).text(model.get('count'));
  },

  updateWeekStats: function(model) {
    this.$('.number_of_visits_all_week').text(model.get('count'));
  },

  updatePercentages: function(percentages) {
    var self = this;
    this.model.get('days').each(function(model, i) {
      var percentage = self.model.get('percentages')[i] + '%';
      $('.bar', self._getDayElement(model.id)).css({width: percentage});
    });
  },

  clickedDeleteAll: function(ev) {
    if($(ev.target).parent().attr('disabled') != 'disabled') {
      ev.preventDefault();
      this.promptView = CreatePrompt(chrome.i18n.getMessage('confirm_delete_all_visits', [this.model.get('title')]));
      this.promptView.open();
      this.promptView.model.on('change', this.deleteAction, this);
    }
  },

  deleteAction: function(prompt) {
    if(prompt.get('action')) {
      if(this.model.get('days')) {
        this.promptView.spin();
        this.model.clear();
        this.promptView.close();
        this.model.fetch();
      }
    } else {
      this.promptView.close();
    }
  },

  _getDayElement: function(id) {
    return this.$('[data-id=' + id + ']');
  }
});
