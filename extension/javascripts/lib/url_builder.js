(function() {

  BH.Lib.UrlBuilder = (function() {

    function UrlBuilder() {}

    UrlBuilder.prototype.base = 'chrome://history/';

    UrlBuilder.prototype.build = function(key, params, options) {
      if (key === 'base') {
        return this._base();
      } else if (key === 'search') {
        return this._search(params, options);
      } else if (key === 'week') {
        return this._week(params, options);
      } else if (key === 'day') {
        return this._day(params, options);
      }
    };

    UrlBuilder.prototype._base = function() {
      return this.base;
    };

    UrlBuilder.prototype._search = function(params, options) {
      return "" + (this._buildBase(options)) + "#search/" + params[0];
    };

    UrlBuilder.prototype._week = function(params, options) {
      return "" + (this._buildBase(options)) + "#weeks/" + params[0];
    };

    UrlBuilder.prototype._day = function(params, options) {
      return "" + (this._buildBase(options)) + "#weeks/" + params[0] + "/days/" + params[1];
    };

    UrlBuilder.prototype._buildBase = function(options) {
      if ((options != null) && options.absolute) {
        return this.base;
      } else {
        return '';
      }
    };

    return UrlBuilder;

  })();

}).call(this);
