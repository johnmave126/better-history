AppView = Backbone.View.extend({
  render: function() {
    var filtersView = new FiltersView({collection: filters}),
        deleteView = new DeleteView();

    var content = this.prepareViews(filtersView, deleteView);
    $('.navbar', this.el).append(content).fadeIn(200);

    return this;
  },

  prepareViews: function(filtersView, deleteView) {
    return [filtersView.render().el, deleteView.render().el];
  }
});
