AppView = Backbone.View.extend({
  render: function() {
    var sidebarView = new SidebarView({collection: filters}),
        deleteView = new DeleteView();

    var content = this.prepareViews(sidebarView, deleteView);
    $('.navbar', this.el).append(content).fadeIn(200);

    return this;
  },

  prepareViews: function(sidebarView, deleteView) {
    return [sidebarView.render().el, deleteView.render().el];
  }
});
