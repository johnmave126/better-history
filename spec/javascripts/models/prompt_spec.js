describe('Prompt', function() {
  var prompt;

  beforeEach(function() {
    loadChromeAPI();
    prompt = new Prompt({test: 'value'});
  });

  it('exists', function() {
    expect(prompt).toBeDefined();
  });

  describe('#toTemplate', function() {
    it('returns a merged object with model and i18n properties', function() {
      expect(prompt.toTemplate()).toEqual({
        test: 'value',
        i18n_prompt_title: 'prompt title'
      });
    });
  });
});
