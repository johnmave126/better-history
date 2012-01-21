describe('i18n', function() {
  beforeEach(function() {
    spyOn(i18n, 'fetch').andCallThrough();
  });

  describe('.fetch', function() {
    var key1 = 'yesterday_link',
        key2 = 'today_link';

    it('calls to i18n Chrome API with each passed key', function() {
      i18n.fetch([key1, key2]);
      expect(chrome.i18n.getMessage).toHaveBeenCalledWith(key1);
      expect(chrome.i18n.getMessage).toHaveBeenCalledWith(key2);
    });

    it('returns the key with "i18n_" appended with the value', function() {
      var result = i18n.fetch([key1, key2]);
      expect(result).toEqual({
        i18n_yesterday_link: 'Yesterday',
        i18n_today_link: 'Today'
      });
    });
  });

  describe('.settings', function() {
    it('returns the required keys with the i18n namespace', function() {
      var returnedTranslations = i18n.settings();
      var expectedKeys = [
        'settings_title',
        'clearing_history_section_title',
        'clear_history_button',
        'visit_grouping_section_title',
        'group_visits_by_label',
        '60_minutes_option',
        '30_minutes_option',
        '15_minutes_option',
        'time_format_label',
        '24_hours_option',
        '12_hours_option',
        'group_visits_by_domain_label',
        'right_click_options_section_title',
        'search_by_text_selection_label',
        'search_by_domain_label',
        'whats_new_section_title',
        'view_release_announcement_link',
        'current_version_label',
        'credits',
        'feedback_section_title',
        'spread_the_word_section_title',
        'leave_a_review',
        'suggestions_bugs_comments'
      ];
      
      $(expectedKeys).each(function() {
        expect(_.keys(returnedTranslations)).toContain(i18n.scopeKey(this));
      });
    });
  });

  describe('.sidebar', function() {
    it('returns the required keys namespaced to i18n', function() {
      var returnedTranslations = i18n.sidebar();
      var expectedKeys = [
        'search_input_placeholder_text',
        'settings_link'
      ];

      $(expectedKeys).each(function() {
        expect(_.keys(returnedTranslations)).toContain(i18n.scopeKey(this));
      });
    });
  });

  describe('.filter', function() {
    it('returns the required keys namespaced to i18n', function() {
      var returnedTranslations = i18n.filter();
      var expectedKeys = [
        'collapse_button',
        'expand_button',
        'delete_all_visits_for_filter_button',
        'no_visits_found'
      ];

      $(expectedKeys).each(function() {
        expect(_.keys(returnedTranslations)).toContain(i18n.scopeKey(this));
      });
    });
  });

  describe('.app', function() {
    it('returns the required keys namespaced to i18n', function() {
      var returnedTranslations = i18n.app();
      var expectedKeys = [
        'history_title'
      ];

      $(expectedKeys).each(function() {
        expect(_.keys(returnedTranslations)).toContain(i18n.scopeKey(this));
      });
    });
  });

  describe('.timeVisit', function() {
    it('an empty hash', function() {
      expect(i18n.timeVisit()).toEqual({});
    });
  });

  describe('.groupedVisits', function() {
    it('returns the required keys scoped to i18n', function() {
      var returnedTranslations = i18n.groupedVisits();
      var expectedKeys = [
        'collapse_button',
        'expand_button'
      ];

      $(expectedKeys).each(function() {
        expect(_.keys(returnedTranslations)).toContain(i18n.scopeKey(this));
      });
    });
  });

  describe('.prompt', function() {
    it('returns the required keys scoped to i18n', function() {
      var returnedTranslations = i18n.prompt();
      var expectedKeys = [
        'prompt_delete_button',
        'prompt_cancel_button',
        'prompt_title'
      ];

      $(expectedKeys).each(function() {
        expect(_.keys(returnedTranslations)).toContain(i18n.scopeKey(this));
      });
    });
  });

  describe('.credits', function() {
    it('returns the required keys scoped to i18n', function() {
      var returnedTranslations = i18n.credits();
      var expectedKeys = [
        'credits_title',
        'translators_heading',
        'spanish',
        'swedish',
        'german',
        'french',
        'italian',
        'hungarian',
        'chinese_simplified',
        'arabic',
        'polish',
        'portuguese',
        'russian',
        'slovak',
        'catalonian',
        'hindi',
        'vietnamese',
        'japanese',
        'romanian',
        'czech',
        'dutch',
        'latvian',
        'turkish',
        'translation_help_heading',
        'close_button',
        'developed_by',
        'translation_instructions'
      ];

      $(expectedKeys).each(function() {
        expect(_.keys(returnedTranslations)).toContain(i18n.scopeKey(this));
      });
    });
  });

  describe('.version', function() {
    it('returns the required keys scoped to i18n', function() {
      var returnedTranslations = i18n.version();
      var expectedKeys = [
        'version_title',
        'version_description',
        'version_important_note',
        'version_note',
        'version_items',
        'close_button',
        'version_whats_new'
      ];

      $(expectedKeys).each(function() {
        expect(_.keys(returnedTranslations)).toContain(i18n.scopeKey(this));
      });
    });
  });

  describe('.search', function() {
    it('returns the required keys scoped to i18n', function() {
      var returnedTranslations = i18n.search();
      var expectedKeys = [
        'search_time_frame'
      ];
      
      $(expectedKeys).each(function() {
        expect(_.keys(returnedTranslations)).toContain(i18n.scopeKey(this));
      });
    });
  });
});
