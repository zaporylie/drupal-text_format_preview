(function ($) {
  Drupal.behaviors.text_format_preview = {
    attach: function (context, settings) {
      $('.text-format-preview-autopreview-checkbox', context).once('text_format_preview', function () {
        // Store this as variable.
        var checkbox = $(this);
        // Store wrapper as variable.
        var wrapper = checkbox.parents('.text-format-preview-wrapper');

        // Manage preview visibility.
        wrapper.find('.text-format-preview-preview').hide();
        checkbox.parent().bind('click', function() {
          // Show only if autopreview checkbox is checked.
          if (checkbox.is(':checked')) {
            wrapper.find('.text-format-preview-preview').show();
          }
          else {
            wrapper.find('.text-format-preview-preview').hide();
          }
        });

        // Preview autoupdate.
        wrapper.find('textarea').bind('change keyup keydown', function() {
          if (checkbox.is(':checked')) {
            window.clearTimeout(checkbox.data('timeout'));
            checkbox.data('timeout', setTimeout(function () {
              if (Drupal.ajax[checkbox.attr('id')].ajaxing == false) {
                // Send new request after 300ms and if Drupal is not processing
                // last one.
                Drupal.ajax[checkbox.attr('id')].eventResponse(checkbox, 'click');
              }
            }, 300));
          }
        })
      });
    }
  };
})(jQuery);
