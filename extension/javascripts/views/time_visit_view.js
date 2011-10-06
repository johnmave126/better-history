TimeVisitView = Backbone.View.extend({
  tagName: 'div',
  className: 'time_visit_view',

  events: {
    'click .time_interval': 'toggleStateClicked'
  },

  initialize: function() {
    this.collection.bind('destroy', this.updateCount, this);
  },

  updateCount: function() {
    if(this.collection.length >= 1) {
      $('.summary', this.el).text(this.model.presenter().summary);
    } else {
      this.remove();
    }
  },

  remove: function() {
    $(this.el).slideUp('fast', function() {
      $(this).remove();
    });
  },

  render: function() {
    $('#timeVisitTemplate').tmpl(this.model.presenter()).appendTo(this.el);

    var self = this;
    $.each(this.collection.models, function(i, pageVisit) {
      var pageVisitView = new PageVisitView({model: pageVisit});
      $('.visits', self.el).append(pageVisitView.render().el);
    });

    return this;
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
    $(element).toggleClass('expanded').toggleClass('collapsed');

    var newState = ($(element).hasClass('expanded') ? 'expanded' : 'collapsed');
    this.model.setState(newState);
  }
});
