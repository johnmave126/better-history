PageVisitView = Backbone.View.extend({
  render: function() {
    var properties = this.model.toJSON();
    properties.cid = this.model.cid;
    $('#pageVisitTemplate').tmpl(properties).appendTo(this.el);
    return this;
  }
});
