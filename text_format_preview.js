(function ($) {
  Drupal.behaviors.text_format_preview = {
    attach: function (context, settings) {
      $('.text-format-preview-autopreview-checkbox', context).once('text_format_preview', function () {

        // Store this as variable.
        var checkbox = $(this);

        // Store wrapper as variable.
        var wrapper = checkbox.parents('.text-format-preview-wrapper');

        // Manage preview visibility.
        if (checkbox.is(':checked')) {
          wrapper.find('.text-format-preview-preview').show();
        }
        else {
          wrapper.find('.text-format-preview-preview').hide();
        }

        // Show or hide element on checkbox state change.
        checkbox.change(function() {
          // Show only if autopreview checkbox is checked.
          if (checkbox.is(':checked')) {
            wrapper.find('.text-format-preview-preview').show();
          }
          else {
            wrapper.find('.text-format-preview-preview').hide();
          }
        });

        // Preview autoupdate.
        wrapper.find('textarea').bind('change keyup', function() {
          if (checkbox.is(':checked')) {
            // Clear execution delay.
            window.clearTimeout(checkbox.data('timeout'));

            // Execute after 300ms.
            checkbox.data('timeout', setTimeout(function () {
              // Only if last request is not in progress.
              if (Drupal.ajax[checkbox.attr('id')].ajaxing == false || Drupal.ajax[checkbox.attr('id')].ajaxing == undefined) {
                Drupal.ajax[checkbox.attr('id')].eventResponse(checkbox, 'click');
              }
            }, 300));
          }
        })
      });
    }
  };

  Drupal.ajax.prototype.commands.text_format_preview = function(ajax, response, status) {

    // Get default selector for triggering element.
    if (response.selector == null || response.selector == undefined) {
      response.selector = ajax.selector;
    }

    var trigger = $(response.selector);
    var wrapper = trigger.parents('.text-format-preview-wrapper');

    // Put output to preview container.
    wrapper.find('.text-format-preview-preview').html(response.preview);
  };

})(jQuery);
