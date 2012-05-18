Week = Backbone.Model.extend({
  format: {
    shortTitle: 'MMMM Do',
    title: 'Week of dddd, Do',
    id: 'D-M-YY'
  },

  initialize: function() {
    var id = this._getId();
    this.set({
      shortTitle: this._getShortTitle(),
      title: this._getTitle(),
      id: id,
      url: '#weeks/' + id,
      days: new Days([
        {date: this._generateDate(0), weekId: id},
        {date: this._generateDate(1), weekId: id},
        {date: this._generateDate(2), weekId: id},
        {date: this._generateDate(3), weekId: id},
        {date: this._generateDate(4), weekId: id},
        {date: this._generateDate(5), weekId: id},
        {date: this._generateDate(6), weekId: id}
      ], {weekId: id})
    });
  },

  toTemplate: function() {
    return _.extend(this.toJSON(), this.get('days').toTemplate());
  },

  clear: function() {
    this.get('days').clear();
  },

  sync: function(method, model, options) {
    if(method === 'read') {
      var callCount = 0;
      var success = function() {
        if(callCount === 6) {
          options.success();
        } else {
          callCount++;
        }
      };
      this.get('days').each(function(model) {
        model.fetch({success: success});
      });
    }
  },

  parse: function() {
    var percentages = [],
        count = 0;

    var visits = this.get('days').map(function(model) {
      count += model.get('count');
      return model.get('count');
    });

    var largest = Math.max.apply(Math, visits);
    this.get('days').each(function(model) {
      percentages.push(model.get('count')/largest*100);
    });

    return {
      percentages: percentages,
      count: count
    };
  },

  _generateDate: function(by) {
    return moment(this.get('date')).add('days', by);
  },

  _getShortTitle: function() {
    return this.get('date').format(this.format.shortTitle);
  },

  _getId: function() {
    return this.get('date').format(this.format.id);
  },

  _getTitle: function() {
    return this.get('date').format(this.format.title);
  }
});
