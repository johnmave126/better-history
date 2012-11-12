BH.Modules.tabIndexSupport =
  assignTabIndices: (selector) ->
    $('*').removeAttr 'tabindex'
    @$('input.search').attr 'tabindex', 1
    @$(selector).each (i) ->
      $(@).attr 'tabindex', i + 2
    @$('.search').focus()
