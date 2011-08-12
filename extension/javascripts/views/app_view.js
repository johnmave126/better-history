AppView = Backbone.View.extend({
  render: function() {
    var filtersView = new FiltersView({collection: filters});

    $('.navbar', this.el).append(filtersView.render().el).hide().fadeIn(200);

    return this;
  }
});
