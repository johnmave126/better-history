GroupedVisitsView = Backbone.View.extend({
  className: 'visit grouped_visits',

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
    $.each(this.collection.models, function(i, pageVisit) {
      pageVisit.destroy();
    });
    this.remove();
  },

  remove: function() {
    $(this.el).slideUp('fast', function() {
      $(this).remove();
    });
  }
});
