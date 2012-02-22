describe('CreditsView', function() {
  var creditsView;

  beforeEach(function() {
    loadChromeAPI();
    loadFixtures('credits.html'); 
    creditsView = new CreditsView();
  });

  it('sets a class name', function() {
    expect(creditsView.className).toEqual('credits_view');
  });

  it('sets the template id', function() {
    expect(creditsView.templateId).toEqual('credits');
  });

  describe('#render', function() {
    it('inserts the rendered html into the view', function() {
      creditsView.render();
      expect(creditsView.$el).not.toBeEmpty();
    });

    it('returns the instance', function() {
      expect(creditsView.render()).toEqual(creditsView);
    });
  });

  describe('opening and closing', function() {
    var ev;

    beforeEach(function() {
      ev = {preventDefault: jasmine.createSpy('preventDefault')};
      setFixtures(creditsView.render().$el);
    });

    describe('#closeClicked', function() {
      beforeEach(function() {
        BH.router = {navigate: jasmine.createSpy('router')};
      });

      it('prevents the default event', function() {
        creditsView.closeClicked(ev);
        expect(ev.preventDefault).toHaveBeenCalled();
      });

      it('navigates to #settings', function() {
        creditsView.closeClicked(ev);
        expect(BH.router.navigate).toHaveBeenCalledWith('#settings');
      });

      it('hides the view', function() {
        creditsView.closeClicked(ev);
        expect($('.overlay', creditsView.$el)).toBeHidden(); 
        expect($('.modal', creditsView.$el)).toBeHidden(); 
      });
    });

    describe('#openClicked', function() {
      it('prevents the default event', function() {
        creditsView.openClicked(ev);
        expect(ev.preventDefault).toHaveBeenCalled();
      });

      it('opens the view', function() {
        creditsView.openClicked(ev);
        expect($('.overlay', creditsView.$el)).toBeVisible();
        expect($('.modal', creditsView.$el)).toBeVisible();
      });
    });
  });
});
