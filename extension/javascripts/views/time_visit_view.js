TimeVisitView = Backbone.View.extend({
  tagName: 'div',
  className: 'time_visit_view',

  expanded: 'expanded',
  collapsed: 'collapsed',

  events: {
    'click .time_interval': 'toggleStateClicked'
  },

  initialize: function() {
    this.collection.bind('destroy', this.updateCount, this);
    this.model.bind('collapse', this.collapse, this);
    this.model.bind('expand', this.expand, this);
  },

  render: function() {
    $('#timeVisitTemplate').tmpl(this.model.presenter()).appendTo(this.el);
    var self = this;
    $.each(GroupBy.domain(this.collection), function(i, pageVisit) {
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
      $('.amount', this.el).text(this.collection.length);
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
    var element = $(this.el).children('.state');
    $(element).toggleClass(this.expanded).toggleClass(this.collapsed);

    var newState = ($(element).hasClass(this.expanded) ? this.expanded : this.collapsed);
    this.model.setState(newState);
  },

  collapse: function() {
    var self = this;
    $(this.el).find('.visits').slideUp('fast', function() {
      var element = $(self.el).children('.state');
      $(element).removeClass(self.expanded).addClass(self.collapsed);
      self.model.setState(self.collapsed);
    });
  },

  expand: function() {
    var self = this;
    $(this.el).find('.visits').slideDown('fast', function() {
      var element = $(self.el).children('.state');
      $(element).addClass(self.expanded).removeClass(self.collapsed);
      self.model.setState(self.expanded);
    });
  }
});
