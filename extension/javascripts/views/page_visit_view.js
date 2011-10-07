PageVisitView = Backbone.View.extend({
  className: 'visit page_visit',

  events: {
    'click .delete_visit': 'deleteClicked'
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
