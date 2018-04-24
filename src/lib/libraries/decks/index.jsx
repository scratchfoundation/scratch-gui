import React from 'react';
import {FormattedMessage} from 'react-intl';

// Spin around
import librarySpin from './spin/library-spin.gif';
import stepDragTurn from './spin/drag-turn.gif';
import stepClickTurn from './spin/click-turn.gif';
import stepClickControl from './spin/click-control.gif';
import stepDragForever from './spin/drag-forever.gif';
import stepClickForever from './spin/click-forever.gif';
import stepChangeColor from './spin/change-color.gif';

// Say hello
import librarySay from './say/library-say.gif';
import stepAddSprite from './say/add-sprite.gif';
import stepClickLooks from './say/click-looks.gif';
import stepDragSay from './say/drag-say.gif';
import stepClickSay from './say/click-say.gif';
import stepAnotherSay from './say/another-say.gif';
import stepEditSay from './say/edit-say.gif';
import stepClickStack from './say/click-stack.gif';

// Clicker
import libraryClicker from './clicker/library-clicker.gif';
import stepDragGoTo from './clicker/drag-goto.gif';
import stepClickGoTo from './clicker/click-goto.gif';
import stepClickEvents from './clicker/click-events.gif';
import stepAddWhenClicked from './clicker/add-whenclicked.gif';
import stepClickSprite from './clicker/click-sprite.gif';
import stepAddSound from './clicker/add-sound.gif';

// Videos
import glideAroundThumb from './videos/glide-around.jpg';
import changeSizeThumb from './videos/change-size.jpg';
import switchCostumeThumb from './videos/switch-costume.jpg';
import hideAndShowThumb from './videos/hide-and-show.jpg';
import addBackdropThumb from './videos/add-backdrop.jpg';
import addEffectsThumb from './videos/add-effects.jpg';
import moveArrowKeysThumb from './videos/move-arrow-keys.jpg';
import spinThumb from './videos/spin.jpg';

export default {
    'spin-around': {
        name: (
            <FormattedMessage
                defaultMessage="Spin around"
                description="Name for the 'Spin around' how-to"
                id="gui.howtos.spin-around.name"
            />
        ),
        img: librarySpin,
        steps: [
            {
                title: (
                    <FormattedMessage
                        defaultMessage="Drag out a “turn” block"
                        description="Step name for 'Drag out a “turn” block' step"
                        id="gui.howtos.spin.step_dragTurn"
                    />
                ),
                image: stepDragTurn
            }, {
                title: (
                    <FormattedMessage
                        defaultMessage="Click the block to run it"
                        description="Step name for 'Click the block to run it' step"
                        id="gui.howtos.spin.step_clickTurn"
                    />
                ),
                image: stepClickTurn
            }, {
                title: (
                    <FormattedMessage
                        defaultMessage="Click the “Control” category"
                        description="Step name for 'Click the “Control” category' step"
                        id="gui.howtos.spin.step_clickControl"
                    />
                ),
                image: stepClickControl
            }, {
                title: (
                    <FormattedMessage
                        defaultMessage="Drag out a “forever” block"
                        description="Step name for 'Drag out a “forever” block' step"
                        id="gui.howtos.spin.step_dragForever"
                    />
                ),
                image: stepDragForever
            }, {
                title: (
                    <FormattedMessage
                        defaultMessage="Click the stack to run it"
                        description="Step name for 'Click the stack to run it' step"
                        id="gui.howtos.spin.step_clickForever"
                    />
                ),
                image: stepClickForever
            }, {
                title: (
                    <FormattedMessage
                        defaultMessage="Add a “change color effect” block"
                        description="Step name for 'Add a “change color effect” block' step"
                        id="gui.howtos.spin.step_changeColor"
                    />
                ),
                image: stepChangeColor
            }, {
                deckIds: [
                    'add-a-backdrop',
                    'switch-costume',
                    'change-size'
                ]
            }
        ]
    },
    'say-hello': {
        name: (
            <FormattedMessage
                defaultMessage="Say hello"
                description="Name for the 'Say hello' how-to"
                id="gui.howtos.say-hello.name"
            />
        ),
        img: librarySay,
        steps: [
            {
                title: (
                    <FormattedMessage
                        defaultMessage="Add a new sprite"
                        description="Step name for 'Add a new sprite' step"
                        id="gui.howtos.say-hello.step_addSprite"
                    />
                ),
                image: stepAddSprite
            }, {
                title: (
                    <FormattedMessage
                        defaultMessage="Click the “Looks” category"
                        description="Step name for 'Click the “Looks” category' step"
                        id="gui.howtos.say-hello.step_clickLooks"
                    />
                ),
                image: stepClickLooks
            }, {
                title: (
                    <FormattedMessage
                        defaultMessage="Drag out a “say” block"
                        description="Step name for 'Drag out a “say” block' step"
                        id="gui.howtos.say-hello.step_dragSay"
                    />
                ),
                image: stepDragSay
            }, {
                title: (
                    <FormattedMessage
                        defaultMessage="Click the block to run it"
                        description="Step name for 'Click the block to run it' step"
                        id="gui.howtos.say-hello.step_clickSay"
                    />
                ),
                image: stepClickSay
            }, {
                title: (
                    <FormattedMessage
                        defaultMessage="Drag out another “say” block"
                        description="Step name for 'Drag out another “say” block' step"
                        id="gui.howtos.say-hello.step_anotherSay"
                    />
                ),
                image: stepAnotherSay
            }, {
                title: (
                    <FormattedMessage
                        defaultMessage="Say something else"
                        description="Step name for 'Say something else' step"
                        id="gui.howtos.say-hello.step_editSay"
                    />
                ),
                image: stepEditSay
            }, {
                title: (
                    <FormattedMessage
                        defaultMessage="Click the stack to run it"
                        description="Step name for 'Click the stack to run it' step"
                        id="gui.howtos.say-hello.step_clickStack"
                    />
                ),
                image: stepClickStack
            }, {
                deckIds: [
                    'add-a-backdrop',
                    'switch-costume',
                    'change-size'
                ]
            }
        ]
    },
    'run-away': {
        name: (
            <FormattedMessage
                defaultMessage="Run away"
                description="Name for the 'Run away' how-to"
                id="gui.howtos.run-away.name"
            />
        ),
        img: libraryClicker,
        steps: [
            {
                title: (
                    <FormattedMessage
                        defaultMessage="Drag out a “go to random position” block"
                        description="Step name for 'Drag out a “go to random position” block' step"
                        id="gui.howtos.run-away.step_dragGoTo"
                    />
                ),
                image: stepDragGoTo
            }, {
                title: (
                    <FormattedMessage
                        defaultMessage="Click the block to run it"
                        description="Step name for 'Click the block to run it' step"
                        id="gui.howtos.run-away.step_clickGoTo"
                    />
                ),
                image: stepClickGoTo
            }, {
                title: (
                    <FormattedMessage
                        defaultMessage="Click the “Events” category"
                        description="Step 3 title"
                        id="gui.howtos.run-away.step3"
                    />
                ),
                image: stepClickEvents
            }, {
                title: (
                    <FormattedMessage
                        defaultMessage="Add a “when this sprite clicked” block"
                        description="Step name for 'Add a “when this sprite clicked” block' step"
                        id="gui.howtos.run-away.step_addWhenClicked"
                    />
                ),
                image: stepAddWhenClicked
            }, {
                title: (
                    <FormattedMessage
                        defaultMessage="Click the sprite to run it"
                        description="Step name for 'Click the sprite to run it' step"
                        id="gui.howtos.run-away.step_clickSprite"
                    />
                ),
                image: stepClickSprite
            }, {
                title: (
                    <FormattedMessage
                        defaultMessage="Add a “start sound” block"
                        description="Step name for 'Add a “start sound” block' step"
                        id="gui.howtos.run-away.step_addSound"
                    />
                ),
                image: stepAddSound
            }, {
                deckIds: [
                    'add-a-backdrop',
                    'switch-costume',
                    'change-size'
                ]
            }
        ]
    },
    'glide-around': {
        name: (
            <FormattedMessage
                defaultMessage="Glide around"
                description="Name for the 'Glide around' how-to"
                id="gui.howtos.glide-around.name"
            />
        ),
        img: glideAroundThumb,
        steps: [{
            video: 'https://www.youtube.com/embed/WUcmsMEIbGg'
        }, {
            deckIds: [
                'add-a-backdrop',
                'switch-costume',
                'change-size'
            ]
        }]
    },
    'change-size': {
        name: (
            <FormattedMessage
                defaultMessage="Change size"
                description="Name for the 'Change size' how-to"
                id="gui.howtos.change-size.name"
            />
        ),
        img: changeSizeThumb,
        steps: [{
            video: 'https://www.youtube.com/embed/NiK9KcghZ9s'
        }, {
            deckIds: [
                'add-a-backdrop',
                'switch-costume',
                'change-size'
            ]
        }]
    },
    'switch-costume': {
        name: (
            <FormattedMessage
                defaultMessage="Switch costume"
                description="Name for the 'Switch costume' how-to"
                id="gui.howtos.switch-costume.name"
            />
        ),
        img: switchCostumeThumb,
        steps: [{
            video: 'https://www.youtube.com/embed/AUBoFxQDPWA'
        }, {
            deckIds: [
                'add-a-backdrop',
                'switch-costume',
                'change-size'
            ]
        }]
    },
    'hide-and-show': {
        name: (
            <FormattedMessage
                defaultMessage="Hide & Show"
                description="Name for the 'Hide & Show' how-to"
                id="gui.howtos.hide-and-show.name"
            />
        ),
        img: hideAndShowThumb,
        steps: [{
            video: 'https://www.youtube.com/embed/jpvqnlfsDTU'
        }, {
            deckIds: [
                'add-a-backdrop',
                'switch-costume',
                'change-size'
            ]
        }]
    },
    'add-a-backdrop': {
        name: (
            <FormattedMessage
                defaultMessage="Add a backdrop"
                description="Name for the 'Add a backdrop' how-to"
                id="gui.howtos.add-a-backdrop.name"
            />
        ),
        img: addBackdropThumb,
        steps: [{
            video: 'https://www.youtube.com/embed/WpV05Q7AbPU'
        }, {
            deckIds: [
                'add-a-backdrop',
                'switch-costume',
                'change-size'
            ]
        }]
    },
    'add-effects': {
        name: (
            <FormattedMessage
                defaultMessage="Add effects"
                description="Name for the 'Add effects' how-to"
                id="gui.howtos.add-effects.name"
            />
        ),
        img: addEffectsThumb,
        steps: [{
            video: 'https://www.youtube.com/embed/ORuohhkx15g'
        }, {
            deckIds: [
                'add-a-backdrop',
                'switch-costume',
                'change-size'
            ]
        }]
    },
    'move-around-with-arrow-keys': {
        name: 'Move Using Arrow Keys',
        img: moveArrowKeysThumb,
        steps: [{
            video: 'https://www.youtube.com/embed/7DUA_Yl0B_M'
        }, {
            deckIds: [
                'add-a-backdrop',
                'switch-costume',
                'change-size'
            ]
        }]
    },
    'spin-video': {
        name: 'Spin!',
        img: spinThumb,
        steps: [{
            video: 'https://www.youtube.com/embed/rHP3aojB_6w'
        }, {
            deckIds: [
                'add-a-backdrop',
                'switch-costume',
                'change-size'
            ]
        }]
    }
};
