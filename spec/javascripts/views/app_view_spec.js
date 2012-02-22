describe('AppView', function() {
  var appView;

  beforeEach(function() {
    loadChromeAPI();
    loadFixtures('app.html', 'sidebar.html', 'filter_item.html'); 
    BH = {
      router: {on: jasmine.createSpy('on')},
      views: {
        versionView: {
          render: function() {
            return {el: '<div class="version_view"></div>'}
          }
        },  
        creditsView: {
          render: function() {
            return {el: '<div class="credits_view"></div>'}
          }
        }  
      }
    };
    appView = new AppView({
      collection: DefaultFilters.fetch() 
    });
  });

  it('sets the template id', function() {
    expect(appView.templateId).toEqual('app');
  });

  describe('#render', function() {
    it('inserts the rendered html into the element', function() {
      appView.render();
      expect(appView.$el).not.toBeEmpty();
    });

    it('inserts the sidebar html', function() {
      appView.render();
      expect($('.navbar', appView.$el)).not.toBeEmpty();
    });

    it('inserts the version html', function() {
      appView.render();
      expect($('.version_view', appView.$el)).toExist();
    });

    it('inserts the credits html', function() {
      appView.render();
      expect($('.credits_view', appView.$el)).toExist();
    });

    it('returns the instance', function() {
      expect(appView.render()).toEqual(appView);
    });
  });
});
