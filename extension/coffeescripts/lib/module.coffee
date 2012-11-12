# From http://arcturo.github.com/library/coffeescript/03_classes.html

moduleKeywords = ['extended', 'included']

class BH.Lib.Module
  @extend: (obj) ->
    for key, value of obj when key not in moduleKeywords
      @[key] = value

    obj.extended?.apply(@)
    this

  @include: (obj) ->
    for key, value of obj when key not in moduleKeywords
      # Assign properties to the prototype
      @::[key] = value

    obj.included?.apply(@)
    this

Backbone.Model.include = Backbone.View.include = Backbone.Collection.include = BH.Lib.Module.include
