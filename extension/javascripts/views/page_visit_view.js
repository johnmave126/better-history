PageVisitView = Backbone.View.extend({
  className: 'page_visit_view',

  render: function() {
    $('#pageVisitTemplate').tmpl(this.model.presenter()).appendTo(this.el);
    return this;
  }
});
