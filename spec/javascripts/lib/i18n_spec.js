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
    it('calls fetch with all the required keys', function() {
      i18n.settings();
      expect(i18n.fetch).toHaveBeenCalledWith([
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
        'voice_your_thoughts_on',
        'i_will_respond',
        'spread_the_word',
        'leave_a_review'
      ]);
    });
  });

  describe('.sidebar', function() {
    it('calls fetch with all the required keys', function() {
      i18n.sidebar();
      expect(i18n.fetch).toHaveBeenCalledWith([
        'search_input_placeholder_text',
        'settings_link'
      ]);
    });
  });

  describe('.filter', function() {
    it('calls fetch with all the required keys', function() {
      i18n.filter();
      expect(i18n.fetch).toHaveBeenCalledWith([
        'collapse_button',
        'expand_button',
        'delete_all_visits_for_filter_button',
        'no_visits_found'
      ]);
    });
  });

  describe('.app', function() {
    it('calls fetch with all the required keys', function() {
      i18n.app();
      expect(i18n.fetch).toHaveBeenCalledWith([
        'history_title'
      ]);
    });
  });

  describe('.timeVisit', function() {
    it('calls fetch with all the required keys', function() {
      i18n.timeVisit();
      expect(i18n.fetch).toHaveBeenCalledWith([
        'visits_label'
      ]);
    });
  });

  describe('.groupedVisits', function() {
    it('calls fetch with all the required keys', function() {
      i18n.groupedVisits();
      expect(i18n.fetch).toHaveBeenCalledWith([
        'collapse_button',
        'expand_button'
      ]);
    });
  });

  describe('.prompt', function() {
    it('calls fetch with all the required keys', function() {
      i18n.prompt();
      expect(i18n.fetch).toHaveBeenCalledWith([
        'prompt_delete_button',
        'prompt_cancel_button',
        'prompt_title'
      ]);
    });
  });

  describe('.credits', function() {
    it('calls fetch with all the required keys', function() {
      i18n.credits();
      expect(i18n.fetch).toHaveBeenCalledWith([
        'credits_title',
        'developed_by',
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
        'translation_help_heading',
        'translation_instructions',
        'close_button'
      ]);
    });
  });

  describe('.version', function() {
    it('calls fetch with all the required keys', function() {
      i18n.version();
      expect(i18n.fetch).toHaveBeenCalledWith([
        'version_title',
        'version_description',
        'version_items',
        'close_button',
        'whats_new'
      ]);
    });
  });

  describe('.search', function() {
    it('calls fetch with all the required keys', function() {
      i18n.search();
      expect(i18n.fetch).toHaveBeenCalledWith([
        'search_time_frame'
      ]);
    });
  });
});
