describe('Backbone.View', function() {
  var view, templateId = 'template', templateValue = 'value';

  beforeEach(function() {
    setFixtures('<div id="' + templateId + '">' + templateValue + '</div>');

    var View = Backbone.View.extend({
      templateId: templateId
    })
    view = new View();
  });

  describe('#template', function() {
    var json = {test: 'test'}

    beforeEach(function() {
      spyOn(Mustache, 'render').andCallThrough();      
    });

    it('called to mustache with the template id and passed params', function() {
      view.template(json);
      expect(Mustache.render).toHaveBeenCalledWith(templateValue, json);
    });

    it('returns the rendered template', function() {
      expect(view.template(json)).toBeDefined();
    });
  });
});
