GroupedVisitsView = Backbone.View.extend({
  events: {
    'click .expand': 'toggle'
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
      $(element).parents('.grouped_visit').next().slideUp('fast');
    } else {
      $(element).text('Collapse');
      $(element).parents('.grouped_visit').next().slideDown('fast');
    }
    $(element).toggleClass('active');
  }
});
