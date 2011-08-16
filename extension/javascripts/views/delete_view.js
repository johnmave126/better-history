DeleteView = Backbone.View.extend({
  tagName: 'div',
  className: 'delete_zone',

  render: function() {
    $('#deleteZoneTemplate').tmpl().appendTo(this.el);

    var self = this;
    $(this.el).droppable({
      tolerance: 'pointer',
      over: function() {
        $(self.el).addClass('over');
      },
      out: function() {
        self.deactivateArea();
      },
      drop: function(ev, ui) {
        if($(ui.draggable).hasClass('grouped_visit')) {
          $(ui.draggable).next().find('.page_visit').each(function() {
            self.getPageVisit(this).destroy();
          });
        } else {
          self.getPageVisit(ui.draggable).destroy();
        }

        $(ui.draggable).slideUp("fast");
        self.deactivateArea();
      }
    });
    return this;
  },

  getPageVisit: function(element) {
    return pageVisits.getByCid($(element).attr('data-cid'));
  },

  deactivateArea: function() {
    $(this.el).removeClass('over');
  }
});
