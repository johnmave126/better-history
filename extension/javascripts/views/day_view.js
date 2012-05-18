DayView = Backbone.Modal.extend({
  className: 'day_view',
  templateId: 'day',

  events: {
    'click .delete_all': 'clickedDeleteAll',
    'keyup .search': 'filtered'
  },

  initialize: function() {
    this.attachGeneralEvents();
    this.model.on('change', this.renderHistory, this);
    //this.applySearchBehavior();
  },

  render: function(type) {
    this.$el.html(this.template(_.extend(i18n.day(), this.model.toTemplate())));
    this.$('.content').css({opacity:0}).html('');
    this.$('button').attr('disabled', 'disabled');
    return this;
  },

  renderHistory: function() {
    this.collection = this.model.get('history');


    this.$('.search').focus();
    var contentElement = this.$('.content');
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
        .append(Mustache.render($('#noVisits').html(), i18n.day()))
        .css({opacity:1});
      this.$('button').attr('disabled', 'disabled');
      $(document).scrollTop(0);

      if(this.model.get('filter')) {
        this.$('.content').append('<a href="3">Maybe try searching full history?</a>');
      }
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
      $('.spacer').remove();
      this.$el.append('<div class="spacer" />');
      this.$('.spacer').height($(window).height() - this.$('.time_visit_view:last-child').height() - 210);

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
      this.promptView = CreatePrompt(chrome.i18n.getMessage('confirm_delete_all_visits', [this.model.get('extendedFormalDate')]));
      this.promptView.open();
      this.promptView.model.on('change', this.deleteAction, this);
    }
  },

  deleteAction: function(prompt) {
    if(prompt.get('action')) {
      if(this.collection) {
        var self = this;
        this.promptView.spin();
        this.model.clear();
        this.promptView.close();
      }
    } else {
      this.promptView.close();
    }
  },

  filtered: function(ev) {
    this.model.set({filter: $(ev.currentTarget).val()});
  }
});
