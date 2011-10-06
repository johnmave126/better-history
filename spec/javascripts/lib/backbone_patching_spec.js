describe('Backbone', function() {
  describe('.sync', function() {
    describe('when deleteing', function() {
      var url, model, options;

      beforeEach(function() {
        chrome = {
          history: {
            deleteUrl: jasmine.createSpy('deleteUrl')
          }
        };
        url = 'google.com';
        model = {get: function() { return url; }};
        options = {success: jasmine.createSpy('success')};
      });

      it('deletes the visit from chrome', function() {
        Backbone.sync('delete', model, options);
        expect(chrome.history.deleteUrl).toHaveBeenCalledWith({url: url});
      });

      it('calls the success options with the model', function() {
        Backbone.sync('delete', model, options);
        expect(options.success).toHaveBeenCalledWith(model);
      });
    });
  });
});
