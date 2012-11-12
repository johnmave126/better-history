BH.Modules.searchSupport =
  events:
    'keyup .search': 'onSearchTyped'
    'blur .search': 'onSearchBlurred'

  searchTyped: (ev) ->
    term = @trimedSearchTerm()
    if ev.keyCode == 13 && term != ''
      router.navigate('search/' + term, true)

  searchBlurred: ->
    @$('.search').val(@trimedSearchTerm())

  trimedSearchTerm: ->
    $.trim(@$('.search').val())
