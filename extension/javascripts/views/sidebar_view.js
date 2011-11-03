SidebarView = Backbone.View.extend({
  className: 'sidebar_view',

  selectedClass: 'selected',

  events: {
    'click .clear_history': 'clearHistoryClicked',
    'click .filter a': 'filterClicked',
    'keyup .search': 'searchTyped'
  },

  initialize: function() {
    var self = this;
    router.bind('route:filter', function(type) {
      self.selectedFilter = filters.getByHash(this.checkType(type));
    });
  },

  render: function() {
    var self = this;
    ich.sidebarTemplate().appendTo(self.el);
    $.each(this.collection.models, function(i, filter) {
      PageVisit.search(filter.options(), function(pageVisits) {
        var properties = filter.presenter();

        if(pageVisits.length === 0) properties.quantity = 'empty';
        ich.filterItemTemplate(properties).appendTo($('.filters', self.el));
        self.selectFilter();
      });
    });
    return this;
  },

  clearHistoryClicked: function(ev) {
    ev.preventDefault();
    chrome.tabs.create({url:'chrome://settings/clearBrowserData'});
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
