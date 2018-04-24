import React from 'react';
import {FormattedMessage} from 'react-intl';

// Spin around
import thumb_spin from './spin/thumb-spin.gif';
import library_spin from './spin/library-spin.gif';
import step_dragTurn from './spin/drag-turn.gif';
import step_clickTurn from './spin/click-turn.gif';
import step_clickControl from './spin/click-control.gif';
import step_dragForever from './spin/drag-forever.gif';
import step_clickForever from './spin/click-forever.gif';
import step_changeColor from './spin/change-color.gif';

// Say hello
import thumb_say from './say/thumb-say.gif';
import library_say from './say/library-say.gif';
import step_addSprite from './say/add-sprite.gif';
import step_clickLooks from './say/click-looks.gif';
import step_dragSay from './say/drag-say.gif';
import step_clickSay from './say/click-say.gif';
import step_anotherSay from './say/another-say.gif';
import step_editSay from './say/edit-say.gif';
import step_clickStack from './say/click-stack.gif';

// Clicker
import thumb_clicker from './clicker/thumb-clicker.gif';
import library_clicker from './clicker/library-clicker.gif';
import step_dragGoTo from './clicker/drag-goto.gif';
import step_clickGoTo from './clicker/click-goto.gif';
import step_clickEvents from './clicker/click-events.gif';
import step_addWhenClicked from './clicker/add-whenclicked.gif';
import step_clickSprite from './clicker/click-sprite.gif';
import step_addSound from './clicker/add-sound.gif';

import step_forever from './zoom/forever.gif';
import step_foreverZoomed from './zoom/forever--zoomed.gif';

import step_move from './zoom/move.gif';
import step_moveZoomed from './zoom/move--zoomed.gif';

import step_color from './zoom/color.gif';
import step_colorZoomed from './zoom/color--zoomed.gif';

import step_loudness from './zoom/loudness.gif';
import step_edge from './zoom/edge.gif';
import step_greenflag from './zoom/green-flag.gif';
import step_stop from './zoom/stop.gif';

// Videos
import glide_around_thumb from './videos/glide-around.jpg';
import change_size_thumb from './videos/change-size.jpg';
import switch_costume_thumb from './videos/switch-costume.jpg';
import hide_and_show_thumb from './videos/hide-and-show.jpg';
import add_backdrop_thumb from './videos/add-backdrop.jpg';
import add_effects_thumb from './videos/add-effects.jpg';
import move_arrow_keys_thumb from './videos/move-arrow-keys.jpg';
import spin_thumb from './videos/spin.jpg';

export default {
    'spin-around': {
        name: (
            <FormattedMessage
                defaultMessage="Spin around"
                description="Name for the 'Spin around' how-to"
                id="gui.howtos.spin-around.name"
            />
        ),
        img: library_spin,
        steps: [
            {
                title: (
                    <FormattedMessage
                        defaultMessage="Drag out a “turn” block"
                        description="Step name for 'Drag out a “turn” block' step"
                        id="gui.howtos.spin.step_dragTurn"
                    />
                ),
                image: step_dragTurn
            }, {
                title: (
                    <FormattedMessage
                        defaultMessage="Click the block to run it"
                        description="Step name for 'Click the block to run it' step"
                        id="gui.howtos.spin.step_clickTurn"
                    />
                ),
                image: step_clickTurn
            }, {
                title: (
                    <FormattedMessage
                        defaultMessage="Click the “Control” category"
                        description="Step name for 'Click the “Control” category' step"
                        id="gui.howtos.spin.step_clickControl"
                    />
                ),
                image: step_clickControl
            }, {
                title: (
                    <FormattedMessage
                        defaultMessage="Drag out a “forever” block"
                        description="Step name for 'Drag out a “forever” block' step"
                        id="gui.howtos.spin.step_dragForever"
                    />
                ),
                image: step_dragForever
            }, {
                title: (
                    <FormattedMessage
                        defaultMessage="Click the stack to run it"
                        description="Step name for 'Click the stack to run it' step"
                        id="gui.howtos.spin.step_clickForever"
                    />
                ),
                image: step_clickForever
            }, {
                title: (
                    <FormattedMessage
                        defaultMessage="Add a “change color effect” block"
                        description="Step name for 'Add a “change color effect” block' step"
                        id="gui.howtos.spin.step_changeColor"
                    />
                ),
                image: step_changeColor
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
        img: library_say,
        steps: [
            {
                title: (
                    <FormattedMessage
                        defaultMessage="Add a new sprite"
                        description="Step name for 'Add a new sprite' step"
                        id="gui.howtos.say-hello.step_addSprite"
                    />
                ),
                image: step_addSprite
            }, {
                title: (
                    <FormattedMessage
                        defaultMessage="Click the “Looks” category"
                        description="Step name for 'Click the “Looks” category' step"
                        id="gui.howtos.say-hello.step_clickLooks"
                    />
                ),
                image: step_clickLooks
            }, {
                title: (
                    <FormattedMessage
                        defaultMessage="Drag out a “say” block"
                        description="Step name for 'Drag out a “say” block' step"
                        id="gui.howtos.say-hello.step_dragSay"
                    />
                ),
                image: step_dragSay
            }, {
                title: (
                    <FormattedMessage
                        defaultMessage="Click the block to run it"
                        description="Step name for 'Click the block to run it' step"
                        id="gui.howtos.say-hello.step_clickSay"
                    />
                ),
                image: step_clickSay
            }, {
                title: (
                    <FormattedMessage
                        defaultMessage="Drag out another “say” block"
                        description="Step name for 'Drag out another “say” block' step"
                        id="gui.howtos.say-hello.step_anotherSay"
                    />
                ),
                image: step_anotherSay
            }, {
                title: (
                    <FormattedMessage
                        defaultMessage="Say something else"
                        description="Step name for 'Say something else' step"
                        id="gui.howtos.say-hello.step_editSay"
                    />
                ),
                image: step_editSay
            }, {
                title: (
                    <FormattedMessage
                        defaultMessage="Click the stack to run it"
                        description="Step name for 'Click the stack to run it' step"
                        id="gui.howtos.say-hello.step_clickStack"
                    />
                ),
                image: step_clickStack
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
        img: library_clicker,
        steps: [
            {
                title: (
                    <FormattedMessage
                        defaultMessage="Drag out a “go to random position” block"
                        description="Step name for 'Drag out a “go to random position” block' step"
                        id="gui.howtos.run-away.step_dragGoTo"
                    />
                ),
                image: step_dragGoTo
            }, {
                title: (
                    <FormattedMessage
                        defaultMessage="Click the block to run it"
                        description="Step name for 'Click the block to run it' step"
                        id="gui.howtos.run-away.step_clickGoTo"
                    />
                ),
                image: step_clickGoTo
            }, {
                title: (
                    <FormattedMessage
                        defaultMessage="Click the “Events” category"
                        description="Step 3 title"
                        id="gui.howtos.run-away.step3"
                    />
                ),
                image: step_clickEvents
            }, {
                title: (
                    <FormattedMessage
                        defaultMessage="Add a “when this sprite clicked” block"
                        description="Step name for 'Add a “when this sprite clicked” block' step"
                        id="gui.howtos.run-away.step_addWhenClicked"
                    />
                ),
                image: step_addWhenClicked
            }, {
                title: (
                    <FormattedMessage
                        defaultMessage="Click the sprite to run it"
                        description="Step name for 'Click the sprite to run it' step"
                        id="gui.howtos.run-away.step_clickSprite"
                    />
                ),
                image: step_clickSprite
            }, {
                title: (
                    <FormattedMessage
                        defaultMessage="Add a “start sound” block"
                        description="Step name for 'Add a “start sound” block' step"
                        id="gui.howtos.run-away.step_addSound"
                    />
                ),
                image: step_addSound
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
        img: glide_around_thumb,
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
        img: change_size_thumb,
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
        img: switch_costume_thumb,
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
        img: hide_and_show_thumb,
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
        img: add_backdrop_thumb,
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
        img: add_effects_thumb,
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
        img: move_arrow_keys_thumb,
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
        img: spin_thumb,
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
