GroupedVisitsView = Backbone.View.extend({
  className: 'page_visit_view grouped_visits_view',

  events: {
    'click .expand': 'toggle',
    'click .delete_group': 'deleteClicked'
  },

  render: function() {
    $('#groupedVisitsTemplate').tmpl(this.collection.summary()).appendTo(this.el);
    var expandedVisits = $('#expandedVisitsTemplate').tmpl({});
    $.each(this.collection.models, function(i, visit) {
      var pageVisitView = new PageVisitView({model: visit});
      $(expandedVisits).append(pageVisitView.render().el);
    });
    $(this.el).append(expandedVisits);
    return this;
  },

  toggle: function(ev) {
    ev.preventDefault();
    var element = ev.target;
    if($(element).hasClass('active')) {
      $(element).text('Expand');
      $(element).parents('a').next().slideUp('fast');
    } else {
      $(element).text('Collapse');
      $(element).parents('a').next().slideDown('fast');
    }
    $(element).toggleClass('active');
  },

  deleteClicked: function(ev) {
    ev.preventDefault();
    this.collection.destroyAll();
    this.remove();
  },

  remove: function() {
    $(this.el).slideUp('fast', function() {
      $(this).remove();
    });
  }
});
