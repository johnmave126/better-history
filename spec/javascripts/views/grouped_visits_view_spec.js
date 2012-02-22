describe('GroupedVisitsView', function() {
  var groupedVisitsView, groupedVisits;

  beforeEach(function() {
    loadChromeAPI();
    loadFixtures('grouped_visits.html', 'page_visit.html');

    groupedVisits = new GroupedVisits({url: 'http://google.com'});
    groupedVisitsView = new GroupedVisitsView({
      collection: groupedVisits
    });
  });

  it('sets a class name', function() {
    expect(groupedVisitsView.className).toEqual('page_visit_view grouped_visits_view');
  });

  it('sets the template id', function() {
    expect(groupedVisitsView.templateId).toEqual('groupedVisits');
  });

  describe('#render', function() {
    it('inserts the rendered html into the view', function() {
      groupedVisitsView.render();
      expect(groupedVisitsView.$el).not.toBeEmpty();
    });

    it('inserts the page visits into the expandable container', function() {
      groupedVisitsView.render();
      expect($('.expanded', groupedVisitsView.$el)).not.toBeEmpty();
    });

    it('returns the instance', function() {
      expect(groupedVisitsView.render()).toEqual(groupedVisitsView);
    });
  });

  describe('#toggle', function() {
    var ev;

    beforeEach(function() {
      setFixtures(groupedVisitsView.render().$el);
      ev = {
        preventDefault: jasmine.createSpy('preventDefault'),
        target: $('.expand', groupedVisitsView.$el)
      };
    });

    it('prevents the default action', function() {
      groupedVisitsView.toggle(ev);
      expect(ev.preventDefault).toHaveBeenCalled();
    });

    describe('when the button clicked is in the expanded state', function() {
      beforeEach(function() {
        $(ev.target).addClass(groupedVisitsView.expandedClass);
      });

      it('updates the button text to expanded', function() {
        groupedVisitsView.toggle(ev);
        expect($(ev.target)).toHaveText('expand');
      });

      it('hides the grouped visits', function() {
        groupedVisitsView.toggle(ev);
        expect($('.expanded', groupedVisitsView.$el)).toBeHidden();
      });

      it('removes the active class', function() {
        groupedVisitsView.toggle(ev);
        expect($(ev.target)).not.toHaveClass(groupedVisitsView.expandedClass);
      });
    });

    describe('when the button clicked is in the collapsed state', function() {
      beforeEach(function() {
        $(ev.target).removeClass(groupedVisitsView.expandedClass);
      });

      it('updates the button text to collapsed', function() {
        groupedVisitsView.toggle(ev);
        expect($(ev.target)).toHaveText('collapse');
      });

      it('shows the grouped visits', function() {
        groupedVisitsView.toggle(ev);
        expect($('.expanded', groupedVisitsView.$el)).toBeVisible();
      });

      it('adds the active class', function() {
        groupedVisitsView.toggle(ev);
        expect($(ev.target)).toHaveClass(groupedVisitsView.expandedClass);
      });
    });
  });

  describe('#deleteClicked', function() {
    var ev;

    beforeEach(function() {
      setFixtures(groupedVisitsView.render().$el);
      ev = {preventDefault: jasmine.createSpy('preventDefault')};
      spyOn(groupedVisitsView.collection, 'destroyAll');
    });

    it('prevents the default action', function() {
      groupedVisitsView.deleteClicked(ev);
      expect(ev.preventDefault).toHaveBeenCalledWith();
    });

    it('destroys the collection', function() {
      groupedVisitsView.deleteClicked(ev);
      expect(groupedVisitsView.collection.destroyAll).toHaveBeenCalled();
    });

    it('removes the view', function() {
      expect(groupedVisitsView.$el).toBeVisible();
      groupedVisitsView.deleteClicked(ev);
      expect(groupedVisitsView.$el).toBeHidden();
    });
  });

  describe('#remove', function() {
    beforeEach(function() {
      setFixtures(groupedVisitsView.render().$el);
    });

    it('removes the view', function() {
      expect(groupedVisitsView.$el).toBeVisible();
      groupedVisitsView.remove();
      expect(groupedVisitsView.$el).toBeHidden();
    });
  });
});
