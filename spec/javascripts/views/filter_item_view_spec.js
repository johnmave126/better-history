describe('FilterItemView', function() {
  var filterItemView, filter;

  beforeEach(function() {
    loadChromeAPI();
    loadFixtures('filter_item.html'); 

    filter = new Filter({history: [3,4,5]});
    spyOn(filter, 'on');

    filterItemView = new FilterItemView({
      model: filter 
    });
  });

  it('sets a class name', function() {
    expect(filterItemView.className).toEqual('filter_item_view selectable');
  });

  it('sets the template id', function() {
    expect(filterItemView.templateId).toEqual('filterItem');
  });

  describe('#render', function() {
    it('inserts the rendered html into the view', function() {
      filterItemView.render();
      expect(filterItemView.$el).not.toBeEmpty();
    });

    it('returns the instance', function() {
      expect(filterItemView.render()).toEqual(filterItemView);
    });
  });

  describe('initialize', function() {
    it('binds to count on the model', function() {
      expect(filter.on).toHaveBeenCalledWith('count', filterItemView.count, filterItemView);  
    });

    it('binds to chance on the model', function() {
      expect(filter.on).toHaveBeenCalledWith('change', filterItemView.update, filterItemView);  
    });
  });

  describe('#update', function() {
    beforeEach(function() {
      filterItemView.render();
    });

    it('adds an empty class when the history attribute contains zero items', function() {
      filterItemView.model.set({history: []});
      filterItemView.update();
      expect($('a', filterItemView.$el)).toHaveClass('empty');
    });

    it('does not add an empty class when the history attribute contains at least an item', function() {
      filterItemView.model.set({history: [1]});
      filterItemView.update();
      expect($('a', filterItemView.$el)).not.toHaveClass('empty');
    });
  });

  describe('#count', function() {
    beforeEach(function() {
      filterItemView.render();
    });

    it('adds an empty class when the passed count is zero', function() {
      filterItemView.count({count:0});
      expect($('a', filterItemView.$el)).toHaveClass('empty');
    });

    it('does not add an empty class when the passed count is not zero', function() {
      filterItemView.count({count:1});
      expect($('a', filterItemView.$el)).not.toHaveClass('empty');
    });
  });
});
