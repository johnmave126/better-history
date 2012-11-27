Timecop.install();
importScripts = function() { };

beforeEach(function() {
  window.chrome = mockChromeAPI();
  new BH.Lib.DateI18n().configure();
});
