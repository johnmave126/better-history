SidebarView = Backbone.View.extend({
  className: 'sidebar_view',
  templateId: 'sidebar',
  selectedClass: 'selected',

  events: {
    'click a': 'linkClicked'
  },

  initialize: function() {
    var self = this;
    BH.router
      .on('route:filter', function(type) {
        self.filterRouted(type);
      })
      .on('route:settings', function() {
        self.settingsRouted();
      })
      .on('route:search', function() {
        self.searchRouted();
      });
  },

  render: function() {
    this.$el.html(this.template(_.extend(i18n.sidebar(), this.collection.toTemplate())));

    var self = this;
    this.collection.each(function(model) {
      model
        .on('count', self.updateFilterLinkCount, self)
        .on('change', function(model) {
          self.updateFilterLinkCount({
            model: model,
            count: model.get('history').length
          });
        });
    });
    this.collection.fetchCounts();


    return this;
  },

  updateFilterLinkCount: function(options) {
    if(options.count === 0) {
      this._getFilterLink(options.model.id).addClass('empty');
    }
  },

  searchRouted: function() {
    this._selectElement(null);
  },

  settingsRouted: function() {
    this._selectElement(this.$('.setting'));
  },

  filterRouted: function(id) {
    var filter = BH.collections.filters.get(id);
    this._selectElement(this._getFilterLink(filter.id));
  },

  linkClicked: function(ev) {
    this._selectElement($(ev.currentTarget, this.$el));
  },

  _selectElement: function(element) {
    this.$('a').removeClass(this.selectedClass);
    $(element).addClass(this.selectedClass);
  },

  _getFilterLink: function(id) {
    return this.$('a[data-id=' + id + ']');
  }
});
