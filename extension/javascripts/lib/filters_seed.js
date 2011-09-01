var filters;

(function() {
  var today = DateRanger.today(),
      yesterday = DateRanger.yesterday(),
      twoDaysAgo = DateRanger.twoDaysAgo(),
      threeDaysAgo = DateRanger.threeDaysAgo(),
      fourDaysAgo = DateRanger.fourDaysAgo(),
      fiveDaysAgo = DateRanger.fiveDaysAgo(),
      sixDaysAgo = DateRanger.sixDaysAgo(),
      sevenDaysAgo = DateRanger.sevenDaysAgo();

  filters = new Filters([
    new Filter({
      name: 'Today',
      hash: 'today',
      title: 'Today',
      startTime: today.start.getTime(),
      endTime: today.end.getTime()
    }),
    new Filter({
      name: 'Yesterday',
      hash: 'yesterday',
      title: 'Yesterday',
      startTime: yesterday.start.getTime(),
      endTime: yesterday.end.getTime()
    }),
    new Filter({
      name: twoDaysAgo.day,
      hash: 'twoDaysAgo',
      title: 'Last ' + twoDaysAgo.day,
      startTime: twoDaysAgo.start.getTime(),
      endTime: twoDaysAgo.end.getTime()
    }),
    new Filter({
      name: threeDaysAgo.day,
      hash: 'threeDaysAgo',
      title: 'Last ' + threeDaysAgo.day,
      startTime: threeDaysAgo.start.getTime(),
      endTime: threeDaysAgo.end.getTime()
    }),
    new Filter({
      name: fourDaysAgo.day,
      hash: 'fourDaysAgo',
      title: 'Last' + fourDaysAgo.day,
      startTime: fourDaysAgo.start.getTime(),
      endTime: fourDaysAgo.end.getTime()
    }),
    new Filter({
      name: fiveDaysAgo.day,
      hash: 'fiveDaysAgo',
      title: 'Last ' + fiveDaysAgo.day,
      startTime: fiveDaysAgo.start.getTime(),
      endTime: fiveDaysAgo.end.getTime()
    }),
    new Filter({
      name: sixDaysAgo.day,
      hash: 'sixDaysAgo',
      title: 'Last ' + sixDaysAgo.day,
      startTime: sixDaysAgo.start.getTime(),
      endTime: sixDaysAgo.end.getTime()
    })
  ]);
})();
