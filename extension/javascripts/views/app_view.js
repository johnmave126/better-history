AppView = Backbone.View.extend({
  render: function() {
    ich.appTemplate().appendTo(this.el);
    this.renderSidebar();
    this.renderVersion();
    return this;
  },

  renderSidebar: function() {
    var sidebarView = new SidebarView({collection: filters});
    $('.navbar', this.el).append(sidebarView.render().el).fadeIn(200);
  },

  renderVersion: function() {
    var versionView = new VersionView({model: this.model});
    $(this.el).append(versionView.render().el);
  }
});
