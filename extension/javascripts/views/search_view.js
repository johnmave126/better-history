SearchView = Backbone.View.extend({
  initialize: function() {
    $(this.el).html('').hide();
  },

  render: function(type) {
    $('#searchTemplate').tmpl(this.model.presenter()).appendTo(this.el);
    $('.view', this.el).addClass(this.model.get('hash'));

    var self = this;
    $(this.el).fadeIn('fast', function() {
      $('.spinner').spin();
      PageVisit.search(self.model.options(), function(results) {
        $('.spinner').hide();
        if(results.length === 0) {
          self.renderNoResults();
        } else {
          self.renderPageVisits(results);
        }
      });
    });

    return this;
  },

  renderNoResults: function () {
    $('#noVisitsTemplate').tmpl().appendTo($('.content', this.el));
  },

  renderPageVisits: function(pageVisits) {
    var pageVisitView;
    this.collection = pageVisits;

    $.each(this.collection.models, function(i) {
      pageVisitView = new PageVisitView({model: this});
      $('.content').append(pageVisitView.render().el);
    });
  }
});
