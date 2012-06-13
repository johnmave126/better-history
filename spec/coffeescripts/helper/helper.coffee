window.loadChromeAPI = (config) ->
  chrome =
    i18n:
      getMessage: jasmine.createSpy("getMessage").andCallFake((key, substitutions) ->
        lookup =
          yesterday_link: "Yesterday"
          today_link: "Today"
          searching_title: "Searching"
          and: "and"
          ordinal_1: "1 ordinal"
          informal_date: "informal date"
          default_time_format: "12"
          number_of_visits: "$number_open$$number$$number_close$ visits"
          morning: "AM"
          afternoon: "afternoon PM"
          evening: "evening PM"
          search_in_history: "Search in history"
          visits_to_domain: "Visits to domain"
          twelve_hour_time_format: "$time$ $label$"
          monday: "Monday"
          saturday: "Saturday"
          wednesday: "Wednesday"
          thursday: "Thursday"
          tuesday: "Tuesday"
          october: "October"
          friday: "Friday"
          july: "July"
          september: "September"
          sunday: "Sunday"
          december: "December"
          extended_formal_date: "$weekday$, $month$ $day$, $year$"
          formal_date: "$month$ $day$, $year$"
          version_title: "version title"
          prompt_title: "prompt title"
          collapse_button: "collapse"
          expand_button: "expand"
          no_visits_found: "Sorry, no visits found."
          confirm_delete_all_visits: "Delete all visits from $formal_date$?"
          search_time_frame: "past few months"

        result = lookup[key]
        if result
          _.each substitutions, (substitution) ->
            result = result.replace(/\$\w+\$/, substitution)
        result
      )

    history:
      search: ->

    browserAction:
      onClicked:
        addListener: jasmine.createSpy("addListener")

    contextMenus:
      create: jasmine.createSpy("create").andReturn(true)
      remove: jasmine.createSpy("remove")
      update: jasmine.createSpy("update")

    tabs:
      create: jasmine.createSpy("create")
      get: jasmine.createSpy("get").andCallFake((id, callback) ->
        callback url: "http://" + config.domain + "/projects"
      )
      onSelectionChanged:
        addListener: jasmine.createSpy("addListener")

      onUpdated:
        addListener: jasmine.createSpy("addListener")
