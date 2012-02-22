describe('VersionView', function() {
  var versionView;

  beforeEach(function() {
    loadChromeAPI();
    loadFixtures('version.html'); 
    versionView = new VersionView({
      model: new Version() 
    });
  });

  it('sets a class name', function() {
    expect(versionView.className).toEqual('version_view');
  });

  it('sets the template id', function() {
    expect(versionView.templateId).toEqual('version');
  });

  describe('#render', function() {
    it('inserts the rendered html into the view', function() {
      versionView.render();
      expect(versionView.$el).not.toBeEmpty();
    });

    it('returns the instance', function() {
      expect(versionView.render()).toEqual(versionView);
    });
  });

  describe('opening and closing', function() {
    var ev;

    beforeEach(function() {
      ev = {preventDefault: jasmine.createSpy('preventDefault')};
      $('body').append(versionView.render().$el);
    });

    describe('#closeClicked', function() {
      beforeEach(function() {
        BH.router = {navigate: jasmine.createSpy('router')};
      });

      it('prevents the default event', function() {
        versionView.closeClicked(ev);
        expect(ev.preventDefault).toHaveBeenCalled();
      });

      it('navigates to #settings', function() {
        versionView.closeClicked(ev);
        expect(BH.router.navigate).toHaveBeenCalledWith('#settings');
      });

      it('sets suppress on the model to true', function() {
        versionView.closeClicked(ev);
        expect(versionView.model.get('suppress')).toBeTruthy(); 
      });

      it('hides the view', function() {
        versionView.closeClicked(ev);
        expect($('.overlay', versionView.$el)).toBeHidden(); 
        expect($('.modal', versionView.$el)).toBeHidden(); 
      });
    });

    describe('#openClicked', function() {
      it('prevents the default event', function() {
        versionView.openClicked(ev);
        expect(ev.preventDefault).toHaveBeenCalled();
      });

      it('opens the view', function() {
        versionView.openClicked(ev);
        expect($('.overlay', versionView.$el)).toBeVisible();
        expect($('.modal', versionView.$el)).toBeVisible();
      });
    });
  });
});
