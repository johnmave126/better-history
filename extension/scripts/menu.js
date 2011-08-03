function Menu(selector) {
  function dateRange(filter) {
    return DateRanger[filter]();
  }

  function dateOptions(filter) {
    var dates = dateRange(filter);
    return {text:'', maxResults: 100, startTime: dates.start.getTime(), endTime: dates.end.getTime()};
  }

  function searchFilter(element) {
    return $(element).attr('href').replace('#','');
  }

  return {
    select: function(element, callback) {
      $('.' + selector + ' .item').removeClass('selected');
      $(element).parent().addClass('selected');
      var filter = searchFilter(element);
      historyView.load(filter, dateOptions(filter));
    }
  };
}
