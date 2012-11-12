class BH.Models.Search extends Backbone.Model
  @include BH.Modules.chromeSupport

  defaults: ->
    query: ''

  initialize: (attrs, options) ->
    super(attrs, options)

  toHistory: ->
    query: @get 'query'

  toTemplate: ->
    @terms = @get('query').split(' ')
    joined = @t('searching_title') + ' '

    # yuck
    for term, i in @terms
      joined += "\"#{term}\""
      if i != @terms.length - 1
        joined += " #{@t('and')} "

     _.extend @toJSON(), title: joined
