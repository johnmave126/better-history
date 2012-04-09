SearchView = Backbone.View.extend({
  className: 'search_view',
  templateId: 'search',

  initialize: function() {
    Helpers.pageTitle(this.model.get('title'));
    this.model.on('change:history', this.renderPageVisits, this);
    this.model.on('change:text', this.updateTitle, this);
  },

  render: function(type) {
    this.$el.attr('data-id', this.model.id);
    this.$el.append(this.template(this.model.toTemplate()));
    $('.spinner', this.el).spin();
    return this;
  },

  renderPageVisits: function() {
    this.collection = this.model.get('history');

    var contentElement = $(this.el).children('.content');
    $(contentElement).html('');

    if(this.collection.length === 0) {
        $(contentElement).append(Mustache.render($('#noVisits').html(), i18n.search()));
    } else {
      var self = this;
      $.each(this.collection.models, function() {
        $(contentElement)
          .append(new PageVisitView({model: this}).render().el);
      });
    }

    Helpers.tabIndex($(contentElement).find('a'));
  },

  updateTitle: function() {
    $('h2', this.$el).text(this.model.buildSearchTitle(this.model.get('text')));
    $('.content', this.$el).html('');
  }
});
