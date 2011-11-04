AppView = Backbone.View.extend({
  render: function() {
    ich.app().appendTo(this.el);

    var sidebarView = new SidebarView({collection: filters});
    $('.navbar', this.el).append(sidebarView.render().el).fadeIn(200);

    var versionView = new VersionView({model: this.model});
    $(this.el).append(versionView.render().el);

    return this;
  }
});
