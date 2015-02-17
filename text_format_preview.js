(function ($) {
  Drupal.behaviors.text_format_preview = {
    attach: function (context, settings) {
      $('.text-format-preview-autopreview-checkbox', context).once('text_format_preview', function () {
        // Store this as variable.
        var checkbox = $(this);
        // Store wrapper as variable.
        var wrapper = checkbox.parents('.text-format-preview-wrapper');

        // Manage visibility of preview.
        // First way...
//        wrapper.find('.text-format-preview-preview').css('visibility', 'hidden');
//        wrapper.find('.text-format-preview-autopreview-toggle').bind('click', function() {
//          if (wrapper.find('.text-format-preview-preview').css('visibility') == 'hidden') {
//            wrapper.find('.text-format-preview-preview').css('visibility', 'visible');
//            wrapper.find('.form-textarea-wrapper').css('visibility', 'hidden');
//          }
//          else {
//            wrapper.find('.text-format-preview-preview').css('visibility', 'hidden');
//            wrapper.find('.form-textarea-wrapper').css('visibility', 'visible');
//          }
//        });

        // Second way...
        wrapper.find('.text-format-preview-preview').hide();
        wrapper.find('.text-format-preview-autopreview-toggle').bind('click', function() {
            wrapper.find('.text-format-preview-preview').toggle();
            wrapper.find('.form-textarea-wrapper').toggle();
        });

        // Set preview height.
        wrapper.find('.text-format-preview-preview').css('max-height', wrapper.find('textarea').eq(0).height());

        // Autoupdate preview.
        wrapper.find('textarea').bind('focus keyup', function() {
          if (checkbox.is(':checked')) {
            window.clearTimeout(checkbox.data('timeout'));
            checkbox.data('timeout', setTimeout(function () {
              // Do your thing here
              Drupal.ajax[checkbox.attr('id')].eventResponse(checkbox, 'click');
              console.log('Render');
            }, 2000));
          }
        })
      });
    }
  };
})(jQuery);
