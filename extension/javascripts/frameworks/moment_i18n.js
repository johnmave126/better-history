moment.lang(chrome.i18n.getMessage('chrome_language'), {
  months: [
    chrome.i18n.getMessage('january'),
    chrome.i18n.getMessage('february'),
    chrome.i18n.getMessage('march'),
    chrome.i18n.getMessage('april'),
    chrome.i18n.getMessage('may'),
    chrome.i18n.getMessage('june'),
    chrome.i18n.getMessage('july'),
    chrome.i18n.getMessage('august'),
    chrome.i18n.getMessage('september'),
    chrome.i18n.getMessage('october'),
    chrome.i18n.getMessage('november'),
    chrome.i18n.getMessage('december')
  ],

  weekdays: [
    chrome.i18n.getMessage('sunday'),
    chrome.i18n.getMessage('monday'),
    chrome.i18n.getMessage('tuesday'),
    chrome.i18n.getMessage('wednesday'),
    chrome.i18n.getMessage('thursday'),
    chrome.i18n.getMessage('friday'),
    chrome.i18n.getMessage('saturday')
  ],

  longDateFormat: {
    L: "DD/MM/YYYY",
    LL: "D MMMM YYYY",
    LLL: "D MMMM YYYY HH:mm",
    LLLL: "dddd, D MMMM YYYY HH:mm"
  },

  meridiem: {
    AM: chrome.i18n.getMessage('morning'),
    am: chrome.i18n.getMessage('morning'),
    PM: chrome.i18n.getMessage('evening'),
    pm: chrome.i18n.getMessage('evening')
  },

  ordinal: function(number) {
    return chrome.i18n.getMessage("ordinal_" + number);
  }
});

moment.lang(chrome.i18n.getMessage('chrome_language'));
