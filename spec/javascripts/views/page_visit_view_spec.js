describe('PageVisitView', function() {
  var pageVisitView, pageVisit;

  beforeEach(function() {
    loadChromeAPI();
    loadFixtures('page_visit.html');

    pageVisit = new PageVisit();
    pageVisitView = new PageVisitView({
      model: pageVisit 
    });
  });

  it('sets a class name', function() {
    expect(pageVisitView.className).toEqual('page_visit_view');
  });

  it('sets the template id', function() {
    expect(pageVisitView.templateId).toEqual('pageVisit');
  });

  describe('#render', function() {
    it('inserts the rendered html into the view', function() {
      pageVisitView.render();
      expect(PageVisitView.$el).not.toBeEmpty();
    });

    it('returns the instance', function() {
      expect(pageVisitView.render()).toEqual(pageVisitView);
    });
  });

  describe('#deleteClicked', function() {
    var ev;

    beforeEach(function() {
      ev = {preventDefault: jasmine.createSpy('preventDefault')};
      spyOn(pageVisit, 'destroy').andCallFake(function(options) {
        options.success();
      });
    });

    it('prevents the default action', function() {
      pageVisitView.deleteClicked(ev);
      expect(ev.preventDefault).toHaveBeenCalledWith();
    });

    it('destroys the model', function() {
      pageVisitView.deleteClicked(ev);
      expect(pageVisit.destroy).toHaveBeenCalled();
    });

    describe('when the page visit is grouped', function() {
      beforeEach(function() {
        var expandedDiv = $('<div>')
          .addClass('expanded')
          .append(pageVisitView.render().$el);
        var div = $('<div>')
          .addClass('grouped_visits_view')
          .append(expandedDiv);
        setFixtures(div);
      });

      it('removes the grouped visits view', function() {
        expect($('.grouped_visits_view')).toExist(); 
        pageVisitView.deleteClicked(ev);
        expect($('.grouped_visits_view')).not.toExist(); 
      });
    });

    describe('when the page visit is not grouped', function() {
      beforeEach(function() {
        setFixtures(pageVisitView.render().$el);
      });

      it('removes the view', function() {
        expect($('.page_visit_view')).toExist(); 
        pageVisitView.deleteClicked(ev);
        expect($('.page_visit_view')).not.toExist(); 
      });
    });
  });
});
