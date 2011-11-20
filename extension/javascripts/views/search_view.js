SearchView = Backbone.View.extend({
  className: 'search_view',

  initialize: function() {
    Helpers.pageTitle(this.model.get('title'));
    this.model.bind('change', this.renderPageVisits, this);
  },

  render: function(type) {
    ich.search(this.model.presenter()).appendTo(this.el);
    $('.spinner', this.el).spin();
    return this;
  },

  renderPageVisits: function() {
    this.collection = this.model.get('history');
    $('.content', this.el).html('');

    var self = this;
    $.each(this.collection.models, function() {
      $('.content', self.el).append(new PageVisitView({model: this}).render().el);
    });

    if(this.collection.length === 0) ich.noVisits().appendTo($('.content', this.el));
    Helpers.tabIndex($('.content a', this.el));
  }
});
