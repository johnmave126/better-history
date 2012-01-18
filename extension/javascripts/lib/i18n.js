i18n = {
  fetch: function(keys) {
    var lookup = {};
    $.each(keys, function() {
      lookup['i18n_' + this] = chrome.i18n.getMessage(this.toString());
    });
    return lookup;
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
      'credits',
      'feedback_section_title',
      'spread_the_word_section_title',
      'leave_a_review'
    ]);
    properties.i18n_suggestions_bugs_comments = chrome.i18n.getMessage('suggestions_bugs_comments', [
      '<a href="http://twitter.com/Better_History">',
      '</a>'
    ]);
    return properties;
  },

  sidebar: function() {
    return i18n.fetch([
      'search_input_placeholder_text',
      'settings_link'
    ]);
  },

  filter: function() {
    return i18n.fetch([
      'collapse_button',
      'expand_button',
      'delete_all_visits_for_filter_button',
      'no_visits_found'
    ]);
  },

  app: function() {
    return i18n.fetch([
      'history_title'
    ]);
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
    properties.i18n_developed_by = chrome.i18n.getMessage('developed_by', [
      '<a href="http://automagical.posterous.com/">',
      '</a>',
      'Roy Kolak'
    ]);
    properties.i18n_translation_instructions = chrome.i18n.getMessage('translation_instructions', [
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
      'version_whats_new',
    ])
    properties.i18n_version_description = chrome.i18n.getMessage('version_description', [
      '<a href="#settings/credits">',
      '</a>'
    ]);
    properties.i18n_version_note = chrome.i18n.getMessage('version_note', [
      '<a href="http://twitter.com/Better_History">',
      '</a>'
    ]);
    properties.i18n_version_items = chrome.i18n.getMessage('version_items', [
      '<li>',
      '</li>'
    ]);
    return properties;
  },

  search: function() {
    return i18n.fetch([
      'search_time_frame'
    ]);
  }
};
