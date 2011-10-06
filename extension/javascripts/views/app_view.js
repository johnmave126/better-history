AppView = Backbone.View.extend({
  render: function() {
    $('#appTemplate').tmpl().appendTo(this.el);

    var sidebarView = new SidebarView({collection: filters});

    $('.navbar', this.el).append(sidebarView.render().el).fadeIn(200);

    return this;
  }
});
