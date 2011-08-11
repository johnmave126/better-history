VisitView = Backbone.View.extend({
  render: function() {
    $('#pageVisitTemplate').tmpl(this.model.toJSON()).appendTo(this.el);
    return this;
  }
});
