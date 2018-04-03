import dragSay from './intro/drag-say.gif';
import addGlide from './intro/add-glide.gif';
import hatStack from './intro/hat-stack.gif';
import whenClicked from './intro/when-clicked.gif';

import addSay from './intro/add-say.gif';
import dragGlide from './intro/drag-glide.gif';

import clickSay from './story/click-say.gif';
import greenFlag from './story/green-flag.gif';
import addSprite from './story/add-sprite.gif';
import anotherSay from './story/another-say.gif';
import bothSay from './story/both-say.gif';
import addWait from './story/add-wait.gif';

import step_dragTurn from './zoom/drag-turn.gif';
import step_dragTurnZoomed from './zoom/drag-turn--zoomed.gif';

import step_clickTurn from './zoom/click-turn.gif';
import step_clickTurnZoomed from './zoom/click-turn--zoomed.gif';

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
import step_zoom from './zoom/zoom.gif';

import deck1 from './intro/when-clicked.gif';
import deck2 from './story/both-say.gif';
import deck3 from './zoom/zoom.gif';

export default [
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

    /*
        {
            name: 'Clicker game',
            img: deck2,
            steps: [
                {
                    title: "Move randomly",
                    description: (
                        <span>Try the <span className={styles.motionBlock} onClick={this.onMotionClick}>go to random position</span> block</span>
                    ),
                    image: addWait,
                }, {
                    title: "Move when clicked",
                    description: (
                        <span>Add a <span className={styles.eventsBlock} onClick={this.onEventsClick}>when this sprite clicked</span> block</span>
                    ),
                    image: addWait,
                }, {
                    title: "Add a sound",
                    description: (
                        <span>Add a <span className={styles.soundBlock} onClick={this.onSoundsClick}>play sound</span> block</span>
                    ),
                    image: addWait,
                }
            ]
        },
        */

    {
        name: 'Zoom around',
        img: deck3,
        steps: [
            {
                title: 'Add a turn block',
                image: step_dragTurn,
                zoomedImage: step_dragTurnZoomed
            }, {
                title: 'Click the block to run it',
                image: step_clickTurn,
                zoomedImage: step_clickTurnZoomed
            }, {
                title: 'Use a forever block to keep it going',
                image: step_forever,
                zoomedImage: step_foreverZoomed
            }, {
                title: 'Add a move block',
                image: step_move,
                zoomedImage: step_moveZoomed
            }, {
                title: 'Experiment with the color effect block',
                image: step_color,
                zoomedImage: step_colorZoomed
            }, {
                title: '🗣 Use the loudness block and make some noise!',
                image: step_loudness
            }, {
                title: 'Bounce when you reach the edge',
                image: step_edge
            }, {
                title: 'Add a green flag block to the top',
                image: step_greenflag
            }, {
                title: 'Try the green flag and stop buttons',
                image: step_stop
            }, {
                title: 'Tinker!',
                image: step_zoom
            }
        ]
    },
    {
        name: 'Tell a story',
        img: deck2,
        steps: [
            {
                title: 'Add a say block',
                image: clickSay
            }, {
                title: 'Use the green flag block to start',
                image: greenFlag
            }, {
                title: 'Add another character',
                image: addSprite
            }, {
                title: 'What will they say?',
                image: anotherSay
            }, {
                title: 'Start the conversation',
                image: bothSay
            }, {
                title: 'Use a wait block to take turns',
                image: addWait
            }
        ]
    }
];
