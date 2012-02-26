TimeVisitView = Backbone.View.extend({
  tagName: 'div',
  className: 'time_visit_view',

  collapsedClass: 'collapsed',

  events: {
    'click .time_interval': 'toggleStateClicked'
  },

  initialize: function() {
    this.model.fetch();
    this.collection.bind('destroy', this.updateCount, this);
    this.model.bind('collapse', this.collapse, this);
    this.model.bind('expand', this.expand, this);
  },

  render: function() {
    var templateOptions = $.extend(this.model.presenter(), i18n.timeVisit());
    ich.timeVisit(templateOptions).appendTo(this.el);

    var groupedVisits;
    if(settings.get('domainGrouping')) groupedVisits = GroupBy.domain(this.collection);

    var self = this;
    $.each(groupedVisits || this.collection.models, function(i, pageVisit) {
      var method = (pageVisit.length !== undefined ? 'renderGroupedVisits' : 'renderPageVisit');
      self[method](pageVisit);
    });
    return this;
  },

  renderGroupedVisits: function(groupedVisits) {
    var groupedVisitsView = new GroupedVisitsView({collection: groupedVisits});
    this.appendVisits(groupedVisitsView.render().el);
  },

  renderPageVisit: function(pageVisit) {
    var pageVisitView = new PageVisitView({model: pageVisit});
    this.appendVisits(pageVisitView.render().el);
  },

  appendVisits: function(visits) {
    $('.visits', this.el).append(visits);
  },

  updateCount: function() {
    if(this.collection.length >= 1) {
      $('.amount', this.el).html(chrome.i18n.getMessage('number_of_visits', [
        this.collection.length.toString(),
        '<span class="amount">',
        '</a>'
      ])),
      $('.summary', this.el).css({color: '#000'}).animate({color:'#999'}, 'slow');
    } else {
      this.remove();
    }
  },

  remove: function() {
    $(this.el).slideUp('fast', function() {
      $(this).remove();
    });
  },

  toggleStateClicked: function(ev) {
    if(!$(ev.currentTarget).hasClass('stuck')) {
      var self = this;
      $(this.el).find('.visits').slideToggle('fast', function() {
        self.toggleState();
      });
    }
  },

  toggleState: function() {
    $('.state', this.el).toggleClass(this.collapsedClass);
    this.model.setCollapsed($('.state', this.el).hasClass(this.collapsedClass));
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
  }
});
