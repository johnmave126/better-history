AppView = Backbone.View.extend({
  render: function() {
    ich.app(i18n.app()).appendTo(this.el);

    var sidebarView = new SidebarView({collection: filters});
    $('.navbar', this.el).append(sidebarView.render().el).fadeIn(200);

    $(this.el).append(versionView.render().el);
    $(this.el).append(creditsView.render().el);

    return this;
  }
});
