GroupedVisitsView = Backbone.View.extend({
  className: 'page_visit_view grouped_visits_view',
  templateId: 'groupedVisits',
  expandedClass: 'active',

  events: {
    'click .expand': 'toggle',
    'click .delete_group': 'deleteClicked'
  },

  render: function() {
    this.$el.append(this.template(this.collection.toTemplate()));

    var self = this;
    this.collection.each(function(model) {
      var pageVisitView = new PageVisitView({model: model});
      self.$('.expanded').append(pageVisitView.render().el);
    });

    return this;
  },

  toggle: function(ev) {
    ev.preventDefault();

    if($(ev.target).hasClass(this.expandedClass)) {
      $(ev.target)
        .text(this.collection.toTemplate().i18n_expand_button)
        .removeClass(this.expandedClass)
        .parents('a').next().slideUp('fast');
    } else {
      $(ev.target)
        .text(this.collection.toTemplate().i18n_collapse_button)
        .addClass(this.expandedClass)
        .parents('a').next().slideDown('fast');
    }
  },

  deleteClicked: function(ev) {
    ev.preventDefault();
    this.collection.destroyAll();
    this.remove();
  },

  remove: function() {
    this.$el.slideUp('fast', function() {
      $(this).remove();
    });
  }
});
