PageVisitView = Backbone.View.extend({
  className: 'page_visit_view',
  templateId: 'pageVisit',

  events: {
    'click .delete_visit': 'deleteClicked'
  },

  render: function() {
    this.$el.html(this.template(this.model.toTemplate()));
    return this;
  },

  deleteClicked: function(ev) {
    ev.preventDefault();
    var self = this;
    this.model.destroy({
      success: function() {
        var method = (self._isGroupedAndEmpty() ? '_removeGroup' : '_remove');
        self[method]();
      }
    });
  },

  _remove: function() {
    this.$el.slideUp('fast', function() {
      $(this).remove();
    });
  },

  _removeGroup: function() {
    $(this._getGroup()).slideUp('fast', function() {
      $(this).remove();
    });
  },

  _isGroupedAndEmpty: function() {
    return (this.$el.parents('.expanded').children().length === 1 ? true : false);
  },

  _getGroup: function() {
    return this.$el.parents('.grouped_visits_view');
  }
});
