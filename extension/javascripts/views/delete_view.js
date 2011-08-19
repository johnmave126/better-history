DeleteView = Backbone.View.extend({
  tagName: 'div',
  className: 'delete_view',

  overClass: 'over',

  render: function() {
    var self = this;
    $('#deleteZoneTemplate').tmpl().appendTo(this.el);
    $(this.el).droppable({
      tolerance: 'pointer',
      over: function() { self.over(); },
      out: function() { self.out(); },
      drop: function(ev, ui) { self.drop(ui.draggable); }
    });
    return this;
  },

  over: function() {
    $(this.el).addClass(this.overClass);
  },

  out: function() {
    $(this.el).removeClass(this.overClass);
  },

  drop: function(element) {
    var method = (this.isGroupedVisit(element) ? 'removeGroupedVisit' : 'removePageVisit');
    this[method](element);
    $(element).slideUp("fast");
    $(this.el).removeClass(this.overClass);
  },

  isGroupedVisit: function(element) {
    return element.hasClass('grouped_visit');
  },

  getPageVisitByElement: function(element) {
    return pageVisits.getByCid($(element).attr('data-cid'));
  },

  removeGroupedVisit: function(element) {
    var self = this;
    $(element).next().find('.page_visit').each(function() {
      self.removePageVisit(this);
    });
    $(element).next().slideUp();
  },

  removePageVisit: function(element) {
    pageVisit = this.getPageVisitByElement(element);
    if(pageVisit) {
      pageVisit.destroy();
    }
  }
});
