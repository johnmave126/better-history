i18n = {
  fetch: function(keys) {
    var lookup = {};
    $.each(keys, function() {
      lookup[i18n.scopeKey(this)] = chrome.i18n.getMessage(this.toString());
    });
    return lookup;
  },

  scopeKey: function(key) {
    return 'i18n_' + key;
  },

  settings: function() {
    var properties = i18n.fetch([
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
      'feedback_section_title',
      'spread_the_word_section_title',
      'leave_a_review',
      'twitter_template',
      'twitter_language'
    ]);
    properties[i18n.scopeKey('credits_link')] = chrome.i18n.getMessage('credits_link', [
      '<strong>',
      '</strong>'
    ]);
    properties[i18n.scopeKey('suggestions_bugs_comments')] = chrome.i18n.getMessage('suggestions_bugs_comments', [
      '<a href="http://twitter.com/Better_History">',
      '</a>'
    ]);
    return properties;
  },

  sidebar: function() {
    return i18n.fetch([
      'settings_link'
    ]);
  },

  filter: function() {
    return i18n.fetch([
      'collapse_button',
      'expand_button',
      'delete_all_visits_for_filter_button',
      'no_visits_found',
      'search_input_placeholder_text',
    ]);
  },

  app: function() {
    return i18n.fetch([
      'history_title'
    ]);
  },

  timeVisit: function() {
    return {};
  },

  groupedVisits: function() {
    return i18n.fetch([
      'collapse_button',
      'expand_button'
    ]);
  },

  prompt: function() {
    return i18n.fetch([
      'prompt_delete_button',
      'prompt_cancel_button',
      'prompt_title'
    ]);
  },

  credits: function() {
    var properties = i18n.fetch([
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
      'close_button'
    ]);
    properties[i18n.scopeKey('developed_by')] = chrome.i18n.getMessage('developed_by', [
      '<a href="http://automagical.posterous.com/">',
      '</a>',
      'Roy Kolak'
    ]);
    properties[i18n.scopeKey('translation_instructions')] = chrome.i18n.getMessage('translation_instructions', [
      'roy.kolak@gmail.com',
      '<a href="mailto:roy.kolak@gmail.com">',
      '</a>'
    ]);
    return properties;
  },

  version: function() {
    var properties = i18n.fetch([
      'version_title',
      'version_important_note',
      'close_button',
      'version_whats_new'
    ]);
    properties[i18n.scopeKey('version_description')] = chrome.i18n.getMessage('version_description', [
      '<a href="#settings/credits">',
      '</a>'
    ]);
    properties[i18n.scopeKey('version_note')] = chrome.i18n.getMessage('version_note', [
      '<a href="http://twitter.com/Better_History">',
      '</a>'
    ]);
    properties[i18n.scopeKey('version_items')] = chrome.i18n.getMessage('version_items', [
      '<li>',
      '</li>'
    ]);
    return properties;
  },

  search: function() {
    return i18n.fetch([
      'search_time_frame',
      'search_input_placeholder_text',
      'delete_all_visits_for_search_button'
    ]);
  }
};
