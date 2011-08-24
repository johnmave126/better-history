describe('DeleteView', function() {
  var deleteView;

  beforeEach(function() {
    loadFixtures('delete_view.html');
    deleteView = new DeleteView();
  });

  describe('#initialize', function() {
    it('defines a tag name', function() {
      expect(deleteView.tagName).toEqual('div');
    });

    it('defines a class name', function() {
      expect(deleteView.className).toEqual('delete_view');
    });
  });

  describe('#render', function() {
    it('clones the template into the container', function() {
      deleteView.render();
      expect($(deleteView.el).html()).not.toBeEmpty();
    });

    it('attaches droppable behavior', function() {
      spyOn($.fn, 'droppable');
      deleteView.render();
      expect($.fn.droppable).toHaveBeenCalledWith({
        tolerance: 'pointer',
        over: jasmine.any(Function),
        out: jasmine.any(Function),
        drop: jasmine.any(Function)
      });
    });
  });

  describe('#over', function() {
    it('adds the over class to the container', function() {
      deleteView.over();
      expect($(deleteView.el)).toHaveClass(deleteView.overClass);
    });
  });

  describe('#out', function() {
    it('removes the over class from the container', function() {
      $(deleteView.el).addClass(deleteView.overClass);
      deleteView.out();
      expect($(deleteView.el)).not.toHaveClass(this.overClass);
    });
  });

  describe('#drop', function() {
    beforeEach(function() {
      pageVisits = new PageVisits();
    });

    it('removes the over class from the container', function() {
      $(deleteView.el).addClass(deleteView.overClass);
      deleteView.drop($('<div></div>'));
      expect($(deleteView.el)).not.toHaveClass(this.overClass);
    });

    it('slides up the droppable element', function() {
      spyOn($.fn, 'slideUp');
      deleteView.drop($('<div></div>'));
      expect($.fn.slideUp).toHaveBeenCalledWith("fast");
    });

    it('removes a pageVisit when that was what was dropped', function() {
      spyOn(deleteView, 'removePageVisit');
      var element = $('<div class="page_visit"></div>');
      deleteView.drop(element);
      expect(deleteView.removePageVisit).toHaveBeenCalledWith(element);
    });
  });

  describe('#removeGroupedVisit', function() {
    it('removes all the page visits', function() {
      spyOn(deleteView, 'removePageVisit');
      deleteView.removeGroupedVisit($('<div></div><div><div class="page_visit"></div><div class="page_visit"></div><div class="page_visit"></div></div>'));
      expect(deleteView.removePageVisit.argsForCall.length).toEqual(3);
    });

    it('slides up grouped visits', function() {
      spyOn($.fn, 'slideUp');
      deleteView.removeGroupedVisit($('<div></div><div></div>'));
      expect($.fn.slideUp);
    });
  });

  describe("#removePageVisit", function() {
    var pageVisit;

    beforeEach(function() {
      pageVisit = {destroy: jasmine.createSpy('destroy')};
      spyOn(deleteView, 'getPageVisitByElement').andReturn(pageVisit);
    });

    it('it destroys the pageVisit', function() {
      deleteView.removePageVisit($('<div data-cid="c31"></div>'));
      expect(pageVisit.destroy).toHaveBeenCalled();
    });
  });

  describe('#getPageVisitByElement', function() {
    beforeEach(function() {
      pageVisits = new PageVisits([
        new PageVisit({url: 'yahoo.com'}),
        new PageVisit({url: 'google.com'})
      ]);
    });

    it('returns the pageVisit for the passed element\'s data-cid attribute', function() {
      var pageVisit = deleteView.getPageVisitByElement($('<div data-cid="c92"></div>'));
      expect(pageVisit).toEqual(pageVisits.at(1));
    });
  });

  describe('#isGroupedVisit', function() {
    it('returns true when the dropped element has the grouped visit class', function() {
      var groupedVisit = deleteView.isGroupedVisit($('<div class="grouped_visit"></div>'));
      expect(groupedVisit).toBeTruthy();
    });

    it('returns false when the dropped element does not have the grouped visit class', function() {
      var groupedVisit = deleteView.isGroupedVisit($('<div></div>'));
      expect(groupedVisit).toBeFalsy();
    });
  });
});
