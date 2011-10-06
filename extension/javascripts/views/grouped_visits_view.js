GroupedVisitsView = Backbone.View.extend({
  events: {
    'click .expand': 'toggle',
    'click .delete': 'deleteClicked'
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
  },

  deleteClicked: function(ev) {
    ev.preventDefault();
    $.each(this.collection.models, function(i, pageVisit) {
      pageVisit.destroy();
    });
    this.removeVisitFromDom();
  },

  removeVisitFromDom: function() {
    if(this.updateTimeVisitCount() === 0) {
      $(this.el).parents('.time_visit_view').slideUp('fast');
    } else {
      $(this.el).slideUp("fast", function() {
        $(this).remove();
      });
    }
  },

  updateTimeVisitCount: function() {
    var timeSummary = $(this.el).parents('.time_visit_view').find('.summary'),
        visits = parseInt($(timeSummary).text(), 10) - 1;

    $(timeSummary).text(visits + ' visits');

    return visits;
  }
});
