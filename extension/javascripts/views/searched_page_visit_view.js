SearchedPageVisitView = Backbone.View.extend({
  className: 'page_visit_view searched_page_visit_view',

  render: function() {
    $('#searchedPageVisitTemplate').tmpl(this.model.presenter()).appendTo(this.el);
    return this;
  }
});
