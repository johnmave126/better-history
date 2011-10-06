PageVisitView = Backbone.View.extend({
  className: 'page_visit_view',

  events: {
    'click .delete': 'deleteClicked'
  },

  render: function() {
    $('#pageVisitTemplate').tmpl(this.model.presenter()).appendTo(this.el);
    return this;
  },

  deleteClicked: function(ev) {
    ev.preventDefault();
    var self = this;
    this.model.destroy({
      success: function() { self.remove(); }
    });
  },

  remove: function() {
    $(this.el).slideUp("fast", function() {
      $(this).remove();
    });
  }
});
