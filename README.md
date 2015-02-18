Text Format Preview
=======================

This module will generate pre-rendered preview for each text_format field
directly below it. Rendering is based in two factors - text value and 
text format. Request to check_markup function will be send on every `change` or 
`keyup` event, but no more than once per 300ms. Also if one ajax request is in 
progress next one will be aborted.

## How to use it?
Just enable this module. Autopreview checkbox will be shown under each instance
of text_format field (ex. body field).

## Settings
Autopreview will be disabled by default. You can turn it on every time or enable
by default. To enable go to 
`admin/config/content/formats/text_format_preview` and check `autopreview 
default` checkbox, then save settings with submit button.

## Dependencies
None

## Maintainer
Jakub Piasecki (zaporylie) jakub@piaseccy.pl
