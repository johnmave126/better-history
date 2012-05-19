class BH.Models.TimeVisit extends Backbone.Model
  toTemplate: ->
    _.extend
      amount: chrome.i18n.getMessage('number_of_visits', [
        @get('pageVisits').length.toString(),
        '<span class="amount">',
        '</span>'
      ])
      time: Helpers.formatTime(@get('datetime'), BH.models.settings.timeFormat())
      id: this.id
    , i18n.timeVisit()
