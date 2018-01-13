// credit to JGames101 for the extension. I'll make it my own after a test.
/*
    Hello!
    Thanks for checking out my extension ported to Scratch 3.
    This was my first test with extensions for Scratch 3.
*/

var Notifications = function () {
};

/**
 * @return {object} This extension's metadata.
 */
Notifications.prototype.getInfo = function () {
    return {
        id: 'someBlocks',

        name: 'notifications',

        blocks: [
            {
                opcode: 'notification-show',
                blockType: Scratch.BlockType.COMMAND,
                blockAllThreads: false,
                text: 'Notify title [TITLE] content [CONTENT] image [IMAGE]',
                func: 'showNotification',
                arguments: {
                    TITLE: {
                        type: Scratch.ArgumentType.STRING,
                        defaultValue: 'Hello World!'
                    },
                    CONTENT: {
                        type: Scratch.ArgumentType.STRING,
                        defaultValue: 'I\'m a notification.'
                    },
                    IMAGE: {
                        type: Scratch.ArgumentType.STRING,
                        defaultValue: 'https://jgames101.github.io/scratch-extensions/cat.png'
                    }
                }
            },
            {
                opcode: 'notification-permitted',
                blockType: Scratch.BlockType.BOOLEAN,
                text: 'notifications permitted?',
                func: 'notPermitted'
            }
        ],

        // translations
        translation_map: {
            fr: {
                'extensionName': 'Notifications',
                'notification-show': 'Nouveau Notification titre [TITLE] soustitre [CONTENT] image [IMAGE]',
                'notification-show.TITLE_default': 'Bonjour, Monde!',
                'notification-show.CONTENT_default': 'Je suis un notification.',
                'notification-permitted': 'Notifications Permission?'
            }
        }
    };
};

/**
 * Implement myReporter.
 * @param {object} args - the block's arguments.
 * @property {number} LETTER_NUM - the string value of the argument.
 * @property {string} TEXT - the string value of the argument.
 * @returns {string} a string which includes the block argument value.
 */
Notifications.prototype.showNotification = function (args) {
    if (Notification.permission !== "granted")
        Notification.requestPermission();
    else {
        var notification = new Notification(args.TITLE, {
        icon: args.IMAGE,
        body: args.CONTENT,
        title: args.TITLE
    })};
};

Notifications.prototype.notPermitted = function () {
    if (Notification.permission !== "granted")
		return false;
	else {
		return true;
    };
};

Scratch.extensions.register(new Notifications());
navigator.Notification.requestPermission();
