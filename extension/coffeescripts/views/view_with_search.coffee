class BH.Views.ViewWithSearch extends BH.Views.BaseView
  initialize: ->
    @events = _.extend @events,
      'keyup .search': 'searchTyped',
      'blur .search': 'searchBlurred'

  searchTyped: (ev) ->
    term = @._trimedSearchTerm()
    if ev.keyCode == 13 && term != ''
      router.navigate('search/' + term, true)

  searchBlurred: ->
    @$('.search').val(@_trimedSearchTerm())

  _trimedSearchTerm: ->
    $.trim(@$('.search').val())
