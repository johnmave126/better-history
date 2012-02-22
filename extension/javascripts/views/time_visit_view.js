TimeVisitView = Backbone.View.extend({
  className: 'time_visit_view',
  templateId: 'timeVisit',
  collapsedClass: 'collapsed',

  events: {
    'click .time_interval': 'toggleStateClicked'
  },

  initialize: function() {
    this.model.fetch();
    this.collection.on('destroy', this.updateCount, this);
    this.model.on('collapse', this.collapse, this);
    this.model.on('expand', this.expand, this);
  },

  render: function() {
    this.$el.html(this.template(this.model.toTemplate()));
    var groupedVisits;
    if(BH.models.settings.get('domainGrouping')) {
      groupedVisits = GroupBy.domain(this.collection);
    }

    var self = this, view;
    $.each(groupedVisits || this.collection.models, function(i, pageVisit) {
      if(pageVisit.length !== undefined) {
        view = new GroupedVisitsView({collection: pageVisit});
      } else {
         view = new PageVisitView({model: pageVisit});
      }
      $('.visits', self.$el).append(view.render().$el);
    });

    return this;
  },

  updateCount: function() {
    if(this.collection.length >= 1) {
      $('.summary', this.el).html(chrome.i18n.getMessage('number_of_visits', [
        this.collection.length.toString(),
        '<span class="amount">',
        '</a>'
      ])),
      $('.summary', this.el).css({color: '#000'}).animate({color:'#999'}, 'slow');
    } else {
      this._remove();
    }
  },

  collapse: function() {
    var self = this;
    $(this.el).find('.visits').slideUp('fast', function() {
      $('.time_interval', self.el).attr('style', '').removeClass('stuck');
      $('.placeholder', self.el).remove();
      $('.state', self.el).addClass(self.collapsedClass);
      self.model.setCollapsed(true);
    });
  },

  expand: function() {
    var self = this;
    $(this.el).find('.visits').slideDown('fast', function() {
      $('.state', self.el).removeClass(self.collapsedClass);
      self.model.setCollapsed(false);
    });
  },

  toggleStateClicked: function(ev) {
    if(!$(ev.currentTarget).hasClass('stuck')) {
      var self = this;
      $(this.el).find('.visits').slideToggle('fast', function() {
        self._toggleState();
      });
    }
  },

  _remove: function() {
    $(this.el).slideUp('fast', function() {
      $(this).remove();
    });
  },

  _toggleState: function() {
    $('.state', this.el).toggleClass(this.collapsedClass);
    this.model.setCollapsed($('.state', this.el).hasClass(this.collapsedClass));
  }
});
