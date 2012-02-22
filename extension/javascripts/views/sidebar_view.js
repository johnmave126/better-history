SidebarView = Backbone.View.extend({
  className: 'sidebar_view',
  templateId: 'sidebar',
  selectedClass: 'selected',

  events: {
    'click .settings_link': 'settingsClicked',
    'click .filter a': 'filterClicked',
    'keyup .search': 'searchTyped'
  },

  initialize: function() {
    var self = this;
    BH.router.on('route:filter', function(type) {
      self.filterRouted(type);
    });

    BH.router.on('route:settings', function() {
      self.settingsRouted();
    });
  },

  render: function() {
    this.$el.html(this.template(i18n.sidebar()));

    var self = this;
    $.each(this.collection.models, function(i, filter) {
      var filterItemView = new FilterItemView({model: filter});
      $('.filters', self.el).append(filterItemView.render().el);
    });

    this.collection.fetchCounts();

    setTimeout(function() { $('.search', self.el).focus(); }, 0);
    $(document).scrollTop(0);

    return this;
  },

  settingsRouted: function(ev) {
    this._selectElement($('.settings_link', this.$el));
  },

  filterRouted: function(type) {
    var filter = filters.getByHash(type);
    this._selectElement($('a[data-cid=' + filter.cid + ']', this.el));
  },

  settingsClicked: function(ev) {
    this._selectElement($(ev.currentTarget, this.$el));
  },

  filterClicked: function(ev) {
    this._selectElement($(ev.currentTarget, this.$el));
  },

  searchTyped: function(ev) {
    var term = $('.search', this.$el).val();
    if(ev.keyCode === 13 && term !== '') {
      this._selectElement();
      BH.router.navigate('search/' + term, true);
    }
  },

  _selectElement: function(element) {
    $('.selectable', this.el).removeClass(this.selectedClass);
    if(element) {
      $(element).parent().addClass(this.selectedClass);
    }
  }
});
