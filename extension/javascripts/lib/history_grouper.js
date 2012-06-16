(function() {

  BH.Lib.HistoryGrouper = (function() {

    function HistoryGrouper() {}

    HistoryGrouper.prototype.time = function(visits, interval) {
      var arrangedVisits,
        _this = this;
      arrangedVisits = [];
      _.each(visits, function(visit) {
        var id, ids, index, lastVisitTime;
        lastVisitTime = new Date(visit.lastVisitTime);
        id = _this._getTime(lastVisitTime, interval);
        ids = _.pluck(arrangedVisits, 'id');
        index = ids.indexOf(id);
        if (index === -1) {
          arrangedVisits.push({
            datetime: new Date(lastVisitTime.toLocaleDateString() + ' ' + id),
            id: id,
            pageVisits: []
          });
          index = arrangedVisits.length - 1;
        }
        return arrangedVisits[index].pageVisits.push(visit);
      });
      return arrangedVisits;
    };

    HistoryGrouper.prototype.domain = function(visits) {
      var groupedVisits, previous,
        _this = this;
      groupedVisits = [];
      previous = null;
      _.each(visits.models, function(visit) {
        if (groupedVisits.length === 0) {
          groupedVisits.push(visit);
          previous = visit;
        } else {
          if (_this._compareVisits(visit, previous)) {
            if (groupedVisits[groupedVisits.length - 1].length === void 0) {
              groupedVisits.pop();
              groupedVisits.push(new BH.Collections.GroupedVisits([previous, visit]));
            } else {
              groupedVisits[groupedVisits.length - 1].add(visit);
            }
          } else {
            groupedVisits.push(visit);
          }
        }
        return previous = visit;
      });
      return groupedVisits;
    };

    HistoryGrouper.prototype._minute = function(minutes, interval) {
      minutes = Math.floor(minutes / interval) * interval;
      if (minutes === 0) {
        return '00';
      } else {
        return minutes;
      }
    };

    HistoryGrouper.prototype._getTime = function(date, interval) {
      return date.getHours() + ':' + this._minute(date.getMinutes(), interval);
    };

    HistoryGrouper.prototype._compareVisits = function(visit1, visit2) {
      if ((visit1 != null) && (visit2 != null)) {
        if (visit1.domain() === visit2.domain()) {
          return true;
        }
      } else {
        return false;
      }
    };

    return HistoryGrouper;

  })();

}).call(this);
