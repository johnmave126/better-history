SidebarView = Backbone.View.extend({
  className: 'sidebar_view',

  selectedClass: 'selected',

  events: {
    'click .settings': 'settingsClicked',
    'click .filter a': 'filterClicked',
    'keyup .search': 'searchTyped'
  },

  initialize: function() {
    var self = this;
    router.bind('route:filter', function(type) {
      self.selectedFilter = filters.getByHash(router.checkType(type));
      self.selectFilter();
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

  settingsClicked: function(ev) {
    ev.preventDefault();
    delete(this.selectedFilter);
    this.selectFilter();
    router.navigate('settings', true);
  },

  filterClicked: function(ev) {
    this.selectedFilter = filters.getByCid($(ev.currentTarget).attr('data-cid'));
    this.selectFilter();
  },

  searchTyped: function(ev) {
    var term = $('.search').val();
    if(ev.keyCode === 13 && term !== '') {
      delete(this.selectedFilter);
      this.selectFilter();
      router.search(term);
    }
  },

  selectFilter: function() {
    $('.filter', this.el).removeClass(this.selectedClass);
    if(this.selectedFilter) {
      var element = $('a[data-cid=' + this.selectedFilter.cid + ']', this.el);
      $(element).parent().addClass(this.selectedClass);
    }
  }
});
