BH.Modules.searchSupport =
  onSearchTyped: (ev) ->
    term = @trimedSearchTerm()
    if ev.keyCode == 13 && term != ''
      router.navigate('search/' + term, true)

  onSearchBlurred: ->
    @$('.search').val(@trimedSearchTerm())

  trimedSearchTerm: ->
    $.trim(@$('.search').val())
