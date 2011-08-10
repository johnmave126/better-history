VisitView = Backbone.View.extend({
  render: function() {
    console.log(this.model.toJSON());
    $('#pageVisitTemplate').tmpl(this.model.toJSON()).appendTo(this.el);
    return this;
  }
});
