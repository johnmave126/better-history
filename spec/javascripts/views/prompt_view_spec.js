describe('PromptView', function() {
  var promptView;

  beforeEach(function() {
    loadChromeAPI();
    loadFixtures('prompt.html'); 
    promptView = new PromptView({
      model: new Prompt() 
    });
  });

  it('sets a class name', function() {
    expect(promptView.className).toEqual('prompt_view');
  });

  it('sets the template id', function() {
    expect(promptView.templateId).toEqual('prompt');
  });

  describe('#render', function() {
    it('inserts the rendered html into the view', function() {
      promptView.render();
      expect(promptView.$el).not.toBeEmpty();
    });

    it('returns the instance', function() {
      expect(promptView.render()).toEqual(promptView);
    });
  });

  describe('confirming and canceling', function() {
    var ev;

    beforeEach(function() {
      ev = {preventDefault: jasmine.createSpy('preventDefault')};
      $('body').append(promptView.render().$el);
    });

    describe('#clickedNo', function() {
      beforeEach(function() {
        router = {navigate: jasmine.createSpy('router')};
      });

      it('prevents the default event', function() {
        promptView.clickedNo(ev);
        expect(ev.preventDefault).toHaveBeenCalled();
      });

      it('sets the action attribute to false', function() {
        promptView.clickedNo(ev);
        expect(promptView.model.get('action')).toBeFalsy();
      });
    });

    describe('#clickedYes', function() {
      it('prevents the default event', function() {
        promptView.clickedYes(ev);
        expect(ev.preventDefault).toHaveBeenCalled();
      });

      it('sets the action attribute to true', function() {
        promptView.clickedYes(ev);
        expect(promptView.model.get('action')).toBeTruthy();
      });
    });
  });
});
