describe('FilterView', function() {
  var filterView, filter, timeVisits;

  beforeEach(function() {
    loadChromeAPI();
    loadFixtures('filter.html', 'time_visit.html');

    BH.models.settings = new Settings();
    filter = new Filter({
      title: 'Today',
      startTime: new Date('December 1, 2010'),
      hash: 'today',
      history: new TimeVisits([
        {
          datetime: new Date(),
          pageVisits: new PageVisits()
        }
      ])
    });

    spyOn(Helpers, 'pageTitle');
    spyOn(filter, 'on');

    filterView = new FilterView({
      model: filter
    });
  });

  it('sets a class name', function() {
    expect(filterView.className).toEqual('filter_view');
  });

  it('sets the template id', function() {
    expect(filterView.templateId).toEqual('filter');
  });

  it('sets the page title', function() {
    expect(Helpers.pageTitle).toHaveBeenCalledWith(filter.get('title'));
  });

  it('binds on change to the model', function() {
    expect(filter.on).toHaveBeenCalledWith('change', filterView.renderHistory, filterView);
  });

  describe('#render', function() {
    it('inserts the rendered html into the view', function() {
      filterView.render();
      expect(filterView.$el).not.toBeEmpty();
    });

    it('returns the instance', function() {
      expect(filterView.render()).toEqual(filterView);
    });
  });

  describe('#renderHistory', function() {
    beforeEach(function() {
      filterView.render();
    });

    it('inserts html into the content container', function() {
      filterView.renderHistory();
      expect($('.content', filterView.$el)).not.toBeEmpty();
    });

    it('inserts the no visits message when there are not page visits', function() {
      filter.get('history').reset();
      filterView.renderHistory();
      expect($('.content .no_visits', filterView.$el)).toExist();
    });

    it('makes the headers sticky', function() {
      spyOn($.fn, 'stickyElements');
      filterView.renderHistory();
      expect($.fn.stickyElements).toHaveBeenCalledWith({
        stickyClass: 'time_interval',
        padding: 96
      }, jasmine.any(Function));
    });

    it('sets the opacity on the content area to 1', function() {
      filterView.renderHistory();
      expect($('.content', filterView.$el).css('opacity')).toEqual('1');
    });

    it('writes the tab indices for all links in the content area', function() {
      spyOn(Helpers, 'tabIndex');
      filterView.renderHistory();
      expect(Helpers.tabIndex).toHaveBeenCalledWith($('.content a', filterView.$el));
    });
  });

  describe('#updateRoute', function() {
    var element;

    beforeEach(function() {
      element = $('<div>').data('time', '10:30');
      BH.router = {
        navigate: jasmine.createSpy('navigate'),
        setLastRoute: jasmine.createSpy('setLastRoute')
      };
    });

    it('navigates to the time interval of the passed element', function() {
      filterView.updateRoute(element);
      expect(BH.router.navigate).toHaveBeenCalledWith('filter/today/10:30');
    });

    it('sets the last route', function() {
      filterView.updateRoute(element);
      expect(BH.router.setLastRoute).toHaveBeenCalledWith('filter/today/10:30');
    });
  });

  describe('#clickedDeleteAll', function() {
    var ev, promptView;

    beforeEach(function() {
      ev = {preventDefault: jasmine.createSpy('preventDefault')};
      promptView = {
        model: {on: jasmine.createSpy('on')},
        open: jasmine.createSpy('open')
      };
      spyOn(window, 'CreatePrompt').andReturn(promptView);
    });

    it('prevents the default action', function() {
      filterView.clickedDeleteAll(ev);
      expect(ev.preventDefault).toHaveBeenCalled();
    });

    it('creates a prompt view with content', function() {
      filterView.clickedDeleteAll(ev);
      expect(window.CreatePrompt).toHaveBeenCalledWith('Delete all visits from December 1, 2010?');
    });

    it('stores the prompt view created', function() {
      filterView.clickedDeleteAll(ev);
      expect(filterView.promptView).toEqual(promptView);
    });

    it('opens the prompt view', function() {
      filterView.clickedDeleteAll(ev);
      expect(promptView.open).toHaveBeenCalled();
    });

    it('binds to change on the prompt view model', function() {
      filterView.clickedDeleteAll(ev);
      expect(promptView.model.on).toHaveBeenCalledWith('change', filterView.deleteAction, filterView);
    });
  });

  describe('#deleteAction', function() {
    var prompt;

    beforeEach(function() {
      prompt = {get: function(){}};
      filterView.promptView = {close: jasmine.createSpy('close')};
      spyOn(filter, 'destroyHistory').andCallFake(function(callback) {
        callback();
      });
    });

    describe('when passed prompt action is false', function() {
      beforeEach(function() {
        spyOn(prompt, 'get').andReturn(false);
      });

      it('does not destroy any history', function() {
        filterView.deleteAction(prompt);
        expect(filter.destroyHistory).not.toHaveBeenCalled();
      });

      it('it closes the prompt', function() {
        filterView.deleteAction(prompt);
        expect(filterView.promptView.close).toHaveBeenCalled();
      });
    });

    describe('when passed prompt action is true', function() {
      it('does not delete the history when the collection is not set', function() {
        filterView.collection = null;
        filterView.deleteAction(prompt);
        expect(filter.destroyHistory).not.toHaveBeenCalled();
      });

      describe('when the collection is set', function() {
        beforeEach(function() {
          spyOn(prompt, 'get').andReturn(true);
          filterView.collection = 'full';
        });

        it('deletes the history', function() {
          filterView.deleteAction(prompt);
          expect(filter.destroyHistory).toHaveBeenCalledWith(jasmine.any(Function));
        });

        it('sets the history property on the model to any empty time visit collection', function() {
          filterView.deleteAction(prompt);
          expect(filter.get('history')).toEqual(new TimeVisits());
        });

        it('closes the prompt', function() {
          filterView.deleteAction(prompt);
          expect(filterView.promptView.close).toHaveBeenCalled();
        });
      });
    });
  });

  describe('#collapseGroupings', function() {
    var ev;

    beforeEach(function() {
      ev = {preventDefault: jasmine.createSpy('preventDefault')};
      filterView.render();
      filterView.renderHistory();
    });

    it('prevents the default action', function() {
      filterView.collapseGroupings(ev);
      expect(ev.preventDefault).toHaveBeenCalled();
    });

    it('triggers collapse on all the models in the collection', function() {
      _(filterView.collection.models).each(function(model) {
        spyOn(model, 'trigger');
      });
      filterView.collapseGroupings(ev);
      expect(filterView.collection.models[0].trigger).toHaveBeenCalledWith('collapse');
    });

    it('scrolls the document to the top', function() {
      filterView.collapseGroupings(ev);
      expect($(document).scrollTop()).toEqual(0);
    });
  });

  describe('#expandGroupings', function() {
    var ev;

    beforeEach(function() {
      ev = {preventDefault: jasmine.createSpy('preventDefault')};
      filterView.render();
      filterView.renderHistory();
    });

    it('prevents the default action', function() {
      filterView.expandGroupings(ev);
      expect(ev.preventDefault).toHaveBeenCalled();
    });

    it('triggers expand on all the models in the collection', function() {
      _(filterView.collection.models).each(function(model) {
        spyOn(model, 'trigger');
      });
      filterView.expandGroupings(ev);
      expect(filterView.collection.models[0].trigger).toHaveBeenCalledWith('expand');
    });

    it('scrolls the document to the top', function() {
      filterView.expandGroupings(ev);
      expect($(document).scrollTop()).toEqual(0);
    });
  });

  describe('#filterVisits', function() {
  });
});
