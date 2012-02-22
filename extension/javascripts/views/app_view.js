AppView = Backbone.View.extend({
  templateId: 'app',

  render: function() {
    this.$el.append(this.template(i18n.app()));

    var sidebarView = new SidebarView({collection: this.collection});
    $('.navbar', this.$el).append(sidebarView.render().el).fadeIn(200);

    this.$el.append(BH.views.versionView.render().el);
    this.$el.append(BH.views.creditsView.render().el);

    return this;
  }
});
