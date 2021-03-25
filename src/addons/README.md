# Addons

Addons and translations are from the [Scratch Addons browser extension](https://scratchaddons.com/). Any bugs or feature requests in these addons should be sent [upstream](https://github.com/ScratchAddons/ScratchAddons/issues).

We apply some patches on top of the original source files. These patches are maintained in https://github.com/GarboMuffin/ScratchAddons/tree/tw.

entry.js is the script that will actually run the addons.

pull.js is a magical script that automatically pulls code from GitHub, parses it with regex, applies some more patches, and copies everything to the proper folders.

Directory structure:

 - addons - the addons (managed by pull.js)
 - addons-l10n - addon translations (managed by pull.js)
 - libraries - libraries used by addons (managed by pull.js)
 - api-libraries - libraries used by addon API
 - settings - the settings page and its translations
