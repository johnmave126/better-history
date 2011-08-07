window.AppView = Backbone.View.extend({
  events: {
    'click .mainnav a': 'showHistoryFilter',
    'keydown #search_input': 'searchHistory'
  },

  initialize: function() {
    $('a[href=' + (window.location.hash || '#today') + ']').triggerHandler('click');
  },

  showHistoryFilter: function(ev) {
    element = ev.currentTarget;
    $('.mainnav .item').removeClass('selected');
    $(element).parent().addClass('selected');
    var filter = $(element).attr('href').replace('#','');
    var dates = DateRanger[filter]();
    var options = {text:'', maxResults: 10000, startTime: dates.start.getTime(), endTime: dates.end.getTime()};
    Visit.search(options, function(results) {
      var historyView = new HistoryView({collection: groupResults(results)});
      $('.views').fadeOut("fast", function() {
        $('.view').hide();
        $('.views').show();
        $('#' + filter).show();
        $('#' + filter + ' .content').append(historyView.render().el);
        stickHeaders($('#' + filter + ' .content'));
      });
    });
  },

  searchHistory: function(ev) {
    historyView.load('search', {text: $(ev.currentTarget).val(), maxResults: 1000});
  }
});
