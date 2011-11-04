SearchView = Backbone.View.extend({
  className: 'search_view',

  initialize: function() {
    pageTitle(this.model.get('title'));
    this.model.bind('change', this.renderPageVisits, this);
  },

  render: function(type) {
    ich.search(this.model.presenter()).appendTo(this.el);
    return this;
  },

  renderPageVisits: function() {
    var visits = this.model.get('visits').models,
        self = this;

    $.each(visits, function() {
      $('.content', self.el).append(new PageVisitView({model: this}).render().el);
    });

    if(visits.length === 0) ich.noVisits().appendTo($('.content', this.el));
  }
});
