GroupedVisitsView = Backbone.View.extend({
  className: 'page_visit_view grouped_visits_view',

  events: {
    'click .expand': 'toggle',
    'click .delete_group': 'deleteClicked'
  },

  render: function() {
    var templateOptions = $.extend(this.collection.summary(), i18n.groupedVisits());
    ich.groupedVisits(templateOptions).appendTo(this.el);

    var expandedVisits = ich.expandedVisits();
    $.each(this.collection.models, function(i, visit) {
      var pageVisitView = new PageVisitView({model: visit});
      $(expandedVisits).append(pageVisitView.render().el);
    });
    $(this.el).append(expandedVisits);
    return this;
  },

  toggle: function(ev) {
    ev.preventDefault();
    var element = ev.target,
        translation = i18n.groupedVisits();

    if($(element).hasClass('active')) {
      $(element).text(translation.i18n_expand_button);
      $(element).parents('a').next().slideUp('fast');
    } else {
      $(element).text(translation.i18n_collapse_button);
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
