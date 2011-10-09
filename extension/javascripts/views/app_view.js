AppView = Backbone.View.extend({
  render: function() {
    $('#appTemplate').tmpl().appendTo(this.el);
    this.renderSidebar();
    this.renderVersion();
    return this;
  },

  renderSidebar: function() {
    var sidebarView = new SidebarView({collection: filters});
    $('.navbar', this.el).append(sidebarView.render().el).fadeIn(200);
  },

  renderVersion: function() {
    var version = new Version({version: '1.0'});
    var versionView = new VersionView({model: version});
    $(this.el).append(versionView.render().el);
  }
});
