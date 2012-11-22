class BH.Lib.DateI18n extends BH.Base
  @include BH.Modules.I18n

  constructor: ->
    @moment = moment
    @chromeAPI = chrome

  configure: ->
    @moment.lang @t('chrome_language'),
      months: [
        @t('january')
        @t('february')
        @t('march')
        @t('april')
        @t('may')
        @t('june')
        @t('july')
        @t('august')
        @t('september')
        @t('october')
        @t('november')
        @t('december')
      ]

      weekdays: [
        @t('sunday')
        @t('monday')
        @t('tuesday')
        @t('wednesday')
        @t('thursday')
        @t('friday')
        @t('saturday')
      ]

      longDateFormat:
        L: "DD/MM/YYYY"
        LL: "D MMMM YYYY"
        LLL: "D MMMM YYYY HH:mm"
        LLLL: "dddd, D MMMM YYYY HH:mm"

      meridiem:
        AM: @t('morning')
        am: @t('morning')
        PM: @t('evening')
        pm: @t('evening')

      ordinal: (number) =>
        @t("ordinal_" + number)

    @moment.lang(@t('chrome_language'))
