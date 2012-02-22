describe('TimeVisitView', function() {
  var timeVisitView, timeVisit;

  beforeEach(function() {
    loadChromeAPI();
    loadFixtures('time_visit.html', 'page_visit.html'); 

    BH.models.settings = new Settings();
    timeVisit = new TimeVisit({
      datetime: new Date(),
      pageVisits: new PageVisits([{
        title: 'page',
        url: 'http://google.com'
      }]) 
    });

    spyOn(timeVisit, 'on');
    spyOn(timeVisit, 'fetch');
    spyOn(timeVisit.get('pageVisits'), 'on');

    timeVisitView = new TimeVisitView({
      model: timeVisit,
      collection: timeVisit.get('pageVisits')
    });
  });

  it('sets a class name', function() {
    expect(timeVisitView.className).toEqual('time_visit_view');
  });

  it('sets the template id', function() {
    expect(timeVisitView.templateId).toEqual('timeVisit');
  });

  it('sets the collapsed class', function() {
    expect(timeVisitView.collapsedClass).toEqual('collapsed');
  });

  describe('#initialize', function() {
    it('fetches the model', function() {
      expect(timeVisitView.model.fetch).toHaveBeenCalled();
    });

    it('binds to destroy on the collection', function() {
      expect(timeVisitView.collection.on).toHaveBeenCalledWith('destroy', timeVisitView.updateCount, timeVisitView);
    });

    it('binds to collapse on the model', function() {
      expect(timeVisit.on).toHaveBeenCalledWith('collapse', timeVisitView.collapse, timeVisitView);

    });

    it('binds to expand on the model', function() {
      expect(timeVisit.on).toHaveBeenCalledWith('expand', timeVisitView.expand, timeVisitView);

    });
  });

  describe('#render', function() {
    beforeEach(function() {
      spyOn(GroupBy, 'domain');
    });

    it('inserts the rendered html into the view', function() {
      timeVisitView.render();
      expect(timeVisitView.$el).not.toBeEmpty();
    });

    it('groups the visits when domain grouping is true in settings', function() {
      BH.models.settings.set({domainGrouping: true});
      timeVisitView.render();
      expect(GroupBy.domain).toHaveBeenCalledWith(timeVisit.get('pageVisits'));
    });

    it('does not group the visits when domain grouping is false in settings', function() {
      BH.models.settings.set({domainGrouping: false});
      timeVisitView.render();
      expect(GroupBy.domain).not.toHaveBeenCalled();
    });

    it('inserts the rendered html for the visits into the visits container', function() {
      BH.models.settings.set({domainGrouping: false});
      timeVisitView.render();
      expect($('.visits', timeVisitView.$el)).not.toBeEmpty();
    });

    it('returns the instance', function() {
      expect(timeVisitView.render()).toEqual(timeVisitView);
    });
  });

  describe('#updateCount', function() {
    beforeEach(function() {
      setFixtures(timeVisitView.render().$el);
    });

    it('removes the view when there are no visits', function() {
      timeVisitView.collection = [];
      timeVisitView.updateCount();
      expect($('.time_visit_view')).not.toExist();
    });

    it('updates the amount language when there are visits', function() {
      timeVisitView.collection = [1, 2, 3];
      timeVisitView.updateCount();
      expect($('.summary')).toHaveText('3 visits');
    });
  });

  describe('#collapse', function() {
    beforeEach(function() {
      setFixtures(timeVisitView.render().$el);
    });

    it('hides the visits', function() {
      timeVisitView.collapse();
      expect($('.visits', timeVisitView.$el)).toBeHidden();
    });

    it('removes the stuck class from the time_interval container', function() {
      $('.time_interval', timeVisitView.$el).addClass('stuck');
      timeVisitView.collapse();
      expect($('.time_interval', timeVisitView.$el)).not.toHaveClass('stuck');
    });

    it('removes the style attribute from the time_interval container', function() {
      $('.time_interval', timeVisitView.$el).attr('style', 'color:blue');
      timeVisitView.collapse();
      expect($('.time_interval', timeVisitView.$el)).toHaveAttr('style', '');
    });

    it('it removes the placeholder element', function() {
      timeVisitView.$el.append($('<div>').addClass('placeholder'));
      timeVisitView.collapse();
      expect($('.placeholder', timeVisitView.$el)).not.toExist();
    });

    it('adds the collapsed class to the state element', function() {
      timeVisitView.collapse();
      expect($('.state', timeVisitView.$el)).toHaveClass(timeVisitView.collapsedClass);
    });

    it('sets collapsed to true on the model', function() {
      timeVisitView.collapse();
      expect(timeVisit.get('collapsed')).toBeTruthy();
    });
  });

  describe('#expand', function() {
    beforeEach(function() {
      setFixtures(timeVisitView.render().$el);
    });

    it('shows the visits', function() {
      timeVisitView.expand();
      expect($('.visits', timeVisitView.$el)).toBeVisible();
    });

    it('removes the collapsed state from the state container', function() {
      $('.state', timeVisitView.$el).addClass(timeVisitView.collapsedClass);
      timeVisitView.expand();
      expect($('.state', timeVisitView.$el)).not.toHaveClass(timeVisitView.collapsedClass);
    });

    it('sets collapsed to false on the model', function() {
      timeVisit.setCollapsed(true);
      timeVisitView.expand();
      expect(timeVisit.get('collapsed')).toBeFalsy();
    });
  });

  describe('#toggleStateClicked', function() {
    var ev;

    beforeEach(function() {
      setFixtures(timeVisitView.render().$el);
      ev = {currentTarget: $('.time_interval', timeVisitView.$el)}; 
    });

    describe('when the target has the stuck class', function() {
      it('does not expand visits when collapsed', function() {
        timeVisitView.collapse();
        $(ev.currentTarget).addClass('stuck');
        timeVisitView.toggleStateClicked(ev);
        expect($('.visits', timeVisitView.$el)).toBeHidden();
      });

      it('does not collapse visits when expanded', function() {
        timeVisitView.expand();
        $(ev.currentTarget).addClass('stuck');
        timeVisitView.toggleStateClicked(ev);
        expect($('.visits', timeVisitView.$el)).toBeVisible();
      });
    });

    describe('when the target does not have the stuck class', function() {
      beforeEach(function() {
        $(ev.currentTarget).removeClass('stuck');
      });

      describe('when collapsed', function() {
        beforeEach(function() {
          timeVisitView.collapse();
        });

        it('expands visits', function() {
          timeVisitView.toggleStateClicked(ev);
          expect($('.visits', timeVisitView.$el)).toBeVisible();
        });

        it('removes the collapsed class on the state element', function() {
          timeVisitView.toggleStateClicked(ev);
          expect($('.state', timeVisitView.$el)).not.toHaveClass(timeVisitView.collapsedClass);
        });

        it('sets collapsed to false on the model', function() {
          timeVisitView.toggleStateClicked(ev);
          expect(timeVisitView.model.get('collapsed')).toBeFalsy();
        });
      });

      describe('when expanded', function() {
        beforeEach(function() {
          timeVisitView.expand();
        });

        it('collapses visits', function() {
          timeVisitView.toggleStateClicked(ev);
          expect($('.visits', timeVisitView.$el)).toBeHidden();
        });

        it('adds the collapsed class on the state element', function() {
          timeVisitView.toggleStateClicked(ev);
          expect($('.state', timeVisitView.$el)).toHaveClass(timeVisitView.collapsedClass);
        });

        it('sets collapsed to true on the model', function() {
          timeVisitView.toggleStateClicked(ev);
          expect(timeVisitView.model.get('collapsed')).toBeTruthy();
        });
      });
    });
  });
});
