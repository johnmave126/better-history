class BH.Views.SettingsView extends BH.Views.BaseView
  className: 'settings_view'
  templateId: 'settings'

  events:
    'click .clear_history': 'clickedClearHistory'
    'change .time_grouping': 'changedTimeGrouping'
    'change .time_format': 'changedTimeFormat'
    'click .domain_grouping': 'clickedDomainGrouping'
    'click .search_by_domain': 'clickedSearchByDomain'
    'click .search_by_selection': 'clickedSearchBySelection'
    'click .credits': 'clickedCredits'
    'click .release_announcement': 'clickedReleaseAnnouncement'

  initialize: ->
    @model.off('change')
    @model.on('change', @saveSettings, @)

  saveSettings: ->
    @model.save()

  render: ->
    @$el.append(@template(@model.toTemplate()))
    window.___gcfg = {lang: chrome.i18n.getMessage('google_plus_language')}
    (->
      po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
      po.src = 'https://apis.google.com/js/plusone.js';
      s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
    )()
    @

  changedTimeGrouping: (ev) ->
    @model.set({timeGrouping: $(ev.currentTarget).val()})

  changedTimeFormat: (ev) ->
    @model.set({timeFormat: $(ev.currentTarget).val()})

  clickedDomainGrouping: (ev) ->
    @model.set({domainGrouping: $(ev.currentTarget).is(':checked')})

  clickedSearchByDomain: (ev) ->
    @model.set({searchByDomain: $(ev.currentTarget).is(':checked')})

    backgroundPage = chrome.extension.getBackgroundPage()
    method = if @model.get('searchByDomain') then 'create' else 'remove'

    backgroundPage.pageContextMenu[method]()

  clickedSearchBySelection: (ev) ->
    @model.set({searchBySelection: $(ev.currentTarget).is(':checked')})

    backgroundPage = chrome.extension.getBackgroundPage()
    method = if @model.get('searchBySelection') then 'create' else 'remove'

    backgroundPage.selectionContextMenu[method]()

  clickedClearHistory: (ev) ->
    ev.preventDefault()
    chrome.tabs.create({url:'chrome://settings/clearBrowserData'})

  clickedCredits: (ev) ->
    ev.preventDefault()
    creditsView = new BH.Views.CreditsView()
    $('body').append(creditsView.render().el)
    creditsView.open()

  clickedReleaseAnnouncement: (ev) ->
    ev.preventDefault()
    versionView = new VersionView({model: app.model})
    $('body').append(versionView.render().el)
    versionView.open()
