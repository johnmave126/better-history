class BH.Views.GroupedVisitsView extends Backbone.View
  className: 'page_visit_view grouped_visits_view'
  templateId: 'groupedVisits'
  expandedClass: 'active'

  events:
    'click .expand': 'toggle'
    'click .delete_group': 'deleteClicked'

  render: ->
    @$el.append(@template(@collection.toTemplate()))
    @collection.each (model) ->
      pageVisitView = new BH.Views.PageVisitView({model: model})
      self.$('.expanded').append(pageVisitView.render().el)
    @

  toggle: (ev) ->
    ev.preventDefault()

    if $(ev.target).hasClass(@expandedClass)
      $(ev.target)
        .text(@collection.toTemplate().i18n_expand_button)
        .removeClass(@expandedClass)
        .parents('a').next().slideUp('fast')
    else
      $(ev.target)
        .text(@collection.toTemplate().i18n_collapse_button)
        .addClass(@expandedClass)
        .parents('a').next().slideDown('fast')

  deleteClicked: (ev) ->
    ev.preventDefault()
    @collection.destroyAll()
    @remove()

  remove: ->
    @$el.slideUp 'fast', ->
      $(@).remove()
