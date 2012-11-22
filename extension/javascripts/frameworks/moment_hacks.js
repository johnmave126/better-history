moment.fn.past = function (input, val) {
  input = input.charAt(0).toUpperCase() + input.slice(1);
  var back = function (date, occurrences) {
    if(date.format('dddd') != input) {
      return back(date.subtract('days', 1), occurrences);
    } else {
      if(occurrences === 0) {
        return date;
      } else {
        return back(date.subtract('days', 1), occurrences - 1);
      }
    }
  };

  return back(this.lang('en'), val);
};
