SidebarView = Backbone.View.extend({
  className: 'sidebar_view',

  selectedClass: 'selected',

  events: {
    'click .settings_link': 'settingsClicked',
    'click .filter a': 'filterClicked',
    'keyup .search': 'searchTyped'
  },

  initialize: function() {
    var self = this;
    router.bind('route:filter', function(type) {
      self.filterRouted(type);
    });

    router.bind('route:settings', function() {
      self.settingsRouted();
    });
  },

  render: function() {
    var self = this;
    ich.sidebar().appendTo(self.el);
    $.each(this.collection.models, function(i, filter) {
      var filterItemView = new FilterItemView({model: filter});
      $('.filters', self.el).append(filterItemView.render().el);
      filter.fetchCount();
    });
    setTimeout(function() { $('.search', self.el).focus(); }, 0);
    $(document).scrollTop(0);
    return this;
  },

  settingsRouted: function(ev) {
    this.selectElement($('.settings_link', this.el));
  },

  filterRouted: function(type) {
    var filter = filters.getByHash(router.checkType(type));
    this.selectElement($('a[data-cid=' + filter.cid + ']', this.el));
  },

  settingsClicked: function(ev) {
    this.selectElement($(ev.currentTarget, this.el));
  },

  filterClicked: function(ev) {
    this.selectElement($(ev.currentTarget, this.el));
  },

  searchTyped: function(ev) {
    var term = $('.search').val();
    if(ev.keyCode === 13 && term !== '') {
      this.selectElement();
      router.navigate('search/' + term, true);
    }
  },

  selectElement: function(element) {
    $('.selectable', this.el).removeClass(this.selectedClass);
    if(element) {
      $(element).parent().addClass(this.selectedClass);
    }
  }
});
