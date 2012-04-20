SearchView = Backbone.View.extend({
  className: 'search_view',
  templateId: 'search',

  events: {
    'click .delete_all': 'clickedDeleteAll',
    'keyup .search': 'searchTyped'
  },

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
    this.$('.number_of_results').text(chrome.i18n.getMessage('number_of_search_results', [this.collection.length]));

    if(this.collection.length === 0) {
        $(contentElement).append(Mustache.render($('#noVisits').html(), i18n.search()));
    } else {
      var self = this;
      this.collection.each(function(model) {
        $(contentElement).append(new PageVisitView({model: model}).render().el);
      });
    }

    Helpers.tabIndex($(contentElement).find('a'));
  },

  updateTitle: function() {
    $('h2', this.$el).text(this.model.buildSearchTitle(this.model.get('text')));
    $('.content', this.$el).html('');
  },

  searchTyped: function(ev) {
    var term = $('.search', this.$el).val();
    if(ev.keyCode === 13 && term !== '') {
      BH.router.navigate('search/' + term, true);
    }
  },

  clickedDeleteAll: function(ev) {
    ev.preventDefault();
    this.promptView = CreatePrompt(chrome.i18n.getMessage('confirm_delete_all_search_results'));
    this.promptView.open();
    this.promptView.model.on('change', this.deleteAction, this);
  },

  deleteAction: function(prompt) {
    if(prompt.get('action')) {
      this.collection.destroyAll();
      this.promptView.close();
      this.collection.trigger('change:history');
    } else {
      this.promptView.close();
    }
  }
});
