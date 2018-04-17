// import dragSay from './intro/drag-say.gif';
// import addGlide from './intro/add-glide.gif';
// import hatStack from './intro/hat-stack.gif';
// import whenClicked from './intro/when-clicked.gif';

// import addSay from './intro/add-say.gif';
// import dragGlide from './intro/drag-glide.gif';

// import step_addSay from './story/add-say.gif';
// import step_addSayZoomed from './story/add-say--zoomed.gif';

// import step_greenFlag from './story/green-flag.gif';
// import step_greenFlagZoomed from './story/green-flag--zoomed.gif';

// import step_addSprite from './story/add-sprite.gif';
// import step_addSpriteZoomed from './story/add-sprite--zoomed.gif';

// import step_anotherSay from './story/another-say.gif';
// import step_anotherSayZoomed from './story/another-say--zoomed.gif';

// import bothSay from './story/both-say.gif';

// import step_addWait from './story/add-wait.gif';
// import step_addWaitZoomed from './story/add-wait--zoomed.gif';

// import step_dragTurn from './zoom/drag-turn.gif';
// import step_dragTurnZoomed from './zoom/drag-turn--zoomed.gif';

// import step_clickTurn from './zoom/click-turn.gif';
// import step_clickTurnZoomed from './zoom/click-turn--zoomed.gif';


// Spin around
import thumb_spin from './spin/thumb-spin.gif';
import library_spin from './spin/library-spin.gif';
import step_dragTurn from './spin/drag-turn.gif';
import step_clickTurn from './spin/click-turn.gif';
import step_dragForever from './spin/drag-forever.gif';
import step_clickForever from './spin/click-forever.gif';

// Say hello
import thumb_say from './say/thumb-say.gif';
import library_say from './say/library-say.gif';
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

// import step_randomPosition from './clicker/random-position.gif';
// import step_randomPositionZoomed from './clicker/random-position--zoomed.gif';
// import step_whenSpriteClicked from './clicker/when-sprite-clicked.gif';
// import step_whenSpriteClickedZoomed from './clicker/when-sprite-clicked--zoomed.gif';
// import step_tryClickingZoomed from './clicker/try-clicking--zoomed.gif';
// import step_tryClicking from './clicker/try-clicking.gif';
// import step_addSound from './clicker/add-sound.gif';
// import step_addSoundZoomed from './clicker/add-sound--zoomed.gif';
// import step_keepScore from './clicker/keep-score.gif';
// import step_keepScoreZoomed from './clicker/keep-score--zoomed.gif';
// import step_resetScore from './clicker/reset-score.gif';
// import step_resetScoreZoomed from './clicker/reset-score--zoomed.gif';

// import clicker_thumb from './clicker/clicker-game.gif';
// import story_thumb from './story/dialog.gif';
// import zoom_thumb from './zoom/zoom-thumb.gif';

// import library_zoom from './zoom/zoom-around--library.gif';
// import library_story from './story/story--library.gif';
// import library_game from './clicker/game--library.gif';

// Videos
import glide_around_thumb from './videos/glide-around.jpg';
import change_size_thumb from './videos/change-size.jpg';
import switch_costume_thumb from './videos/switch-costume.jpg';
import hide_and_show_thumb from './videos/hide-and-show.jpg';
import add_backdrop_thumb from './videos/add-backdrop.jpg';
import add_effects_thumb from './videos/add-effects.jpg';
import move_arrow_keys_thumb from './videos/move-arrow-keys.jpg';
import spin_thumb from './videos/spin.jpg';

export default [
    {
        name: 'Spin around',
        img: library_spin,
        libraryImg: library_spin,
        steps: [
            {
                title: 'Drag out a “turn” block',
                image: step_dragTurn
            }, {
                title: 'Click the block to run it',
                image: step_clickTurn
            }, {
                title: 'Drag out a “forever” block',
                image: step_dragForever
            }, {
                title: 'Click the stack to run it',
                image: step_clickForever
            }
        ]
    },
    {
        name: 'Say hello',
        img: library_say,
        libraryImg: library_say,
        steps: [
            {
                title: 'Click the “Looks” category',
                image: step_clickLooks
            }, {
                title: 'Drag out a “say” block',
                image: step_dragSay
            }, {
                title: 'Click the block to run it',
                image: step_clickSay
            }, {
                title: 'Drag out another “say” block',
                image: step_anotherSay
            }, {
                title: 'Say something else',
                image: step_editSay
            }, {
                title: 'Click the stack to run it',
                image: step_clickStack
            }
        ]
    },
    {
        name: 'Clicker game',
        img: library_clicker,
        libraryImg: library_clicker,
        steps: [
            {
                title: 'Drag out a “go to random position” block',
                image: step_dragGoTo
            }, {
                title: 'Click the block to run it',
                image: step_clickGoTo
            }, {
                title: 'Click the “Events” category',
                image: step_clickEvents
            }, {
                title: 'Add a “when this sprite clicked” block',
                image: step_addWhenClicked
            }, {
                title: 'Click the sprite to run it',
                image: step_clickSprite
            }
        ]
    },
    /*
        {
            name: 'Getting started',
            img: deck1,
            steps: [
                {
                    title: "Move randomly",
                    description: (
                        <span>Drag out and click the <span className={styles.motionBlock} onClick={this.onMotionClick}>glide to random position</span> block</span>
                    ),
                    image: dragGlide,
                },
                {
                    title: "Say something",
                    description: (
                        <span>Add a <span className={styles.looksBlock} onClick={this.onLooksClick}>say</span> block</span>
                    ),
                    image: addSay,
                },
                {
                    title: "Start when you click the sprite",
                    description: (
                        <span>Add the <span className={styles.eventsBlock} onClick={this.onEventsClick}>when this sprite clicked</span> block</span>
                    ),
                    image: hatStack,
                },
                {
                    title: "Click the sprite to try it",
                    description: (''
                    ),
                    image: whenClicked,
                },

            ]
        },
        */
    /*
        'Getting started' : {
            name: 'Getting started',
            img: deck1,
            steps: [
                {
                    title: "Say something",
                    description: (
                        <span>Drag out and click the <span className={styles.looksBlock} onClick={this.onLooksClick}>say</span> block</span>
                    ),
                    image: dragSay,
                },
                {
                    title: "Move randomly",
                    description: (
                        <span>Add the <span className={styles.motionBlock} onClick={this.onMotionClick}>glide to random position</span> block</span>
                    ),
                    image: addGlide,
                },
                {
                    title: "Start when you click the sprite",
                    description: (
                        <span>Add the <span className={styles.eventsBlock} onClick={this.onEventsClick}>when this sprite clicked</span> block</span>
                    ),
                    image: hatStack,
                },
                {
                    title: "Click the sprite to try it",
                    description: (''
                    ),
                    image: whenClicked,
                },

            ]
        },
        */
    // {
    //     name: 'Zoom around',
    //     img: zoom_thumb,
    //     libraryImg: library_zoom,
    //     steps: [
    //         {
    //             title: 'Get a turn block',
    //             image: step_dragTurn,
    //             zoomedImage: step_dragTurnZoomed
    //         }, {
    //             title: 'Click the block to run it',
    //             image: step_clickTurn,
    //             zoomedImage: step_clickTurnZoomed
    //         }, {
    //             title: 'Use a forever block to keep it going',
    //             image: step_forever,
    //             zoomedImage: step_foreverZoomed
    //         }, {
    //             title: 'Add a move block',
    //             image: step_move,
    //             zoomedImage: step_moveZoomed
    //         }, {
    //             title: 'Try the color effect block',
    //             image: step_color,
    //             zoomedImage: step_colorZoomed
    //         }
    //     ]
    // },
    // {
    //     name: 'Tell a story',
    //     img: story_thumb,
    //     libraryImg: library_story,
    //     steps: [
    //         {
    //             title: 'Add a say block',
    //             image: step_addSay,
    //             zoomedImage: step_addSayZoomed
    //         }, {
    //             title: 'Use the green flag block to start',
    //             image: step_greenFlag,
    //             zoomedImage: step_greenFlagZoomed
    //         }, {
    //             title: 'Add another sprite',
    //             image: step_addSprite,
    //             zoomedImage: step_addSpriteZoomed
    //         }, {
    //             title: 'What will your new sprite say?',
    //             image: step_anotherSay,
    //             zoomedImage: step_anotherSayZoomed
    //         }, {
    //             title: 'Start the conversation',
    //             image: bothSay
    //         }, {
    //             title: 'Use a wait block to take turns',
    //             image: step_addWait,
    //             zoomedImage: step_addWaitZoomed
    //         }
    //     ]
    // },
    {
        name: "Glide Around",
        img: glide_around_thumb,
        steps: [{
            title: "Glide Around",
            video: "https://www.youtube.com/embed/WUcmsMEIbGg"
        }]
    },
    {
        name: "Change Size",
        img: change_size_thumb,
        steps: [{
            title: "Change Size",
            video: "https://www.youtube.com/embed/NiK9KcghZ9s"
        }]
    },
    {
        name: "Switch Costume",
        img: switch_costume_thumb,
        steps: [{
            title: "Switch Costume",
            video: "https://www.youtube.com/embed/AUBoFxQDPWA"
        }]
    },
    {
        name: "Hide & Show ",
        img: hide_and_show_thumb,
        steps: [{
            title: "Hide & Show ",
            video: "https://www.youtube.com/embed/jpvqnlfsDTU"
        }]
    },
    {
        name: "Add A Backdrop",
        img: add_backdrop_thumb,
        steps: [{
            title: "Add A Backdrop",
            video: "https://www.youtube.com/embed/WpV05Q7AbPU"
        }]
    },
    {
        name: "Add Effects",
        img: add_effects_thumb,
        steps: [{
            title: "Add Effects",
            video: "https://www.youtube.com/embed/ORuohhkx15g"
        }]
    },
    {
        name: "Move Using Arrow Keys",
        img: move_arrow_keys_thumb,
        steps: [{
            title: "Move Using Arrow Keys",
            video: "https://www.youtube.com/embed/7DUA_Yl0B_M"
        }]
    },
    {
        name: "Spin!",
        img: spin_thumb,
        steps: [{
            title: "Spin!",
            video: "https://www.youtube.com/embed/rHP3aojB_6w"
        }]
    }
];
