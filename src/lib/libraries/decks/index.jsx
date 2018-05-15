import React from 'react';
import {FormattedMessage} from 'react-intl';

// Intro
import libraryIntro from './Intro/intro-move-change-color.gif';
import stepMoveChangeColor from './Intro/intro-move-change-color.gif';


// Spin around
import librarySpin from './spin/library-spin.gif';
import stepDragTurn from './spin/drag-turn.gif';
import stepClickTurn from './spin/click-turn.gif';
import stepClickControl from './spin/click-control.gif';
import stepDragForever from './spin/drag-forever.gif';
import stepClickForever from './spin/click-forever.gif';
import stepChangeColor from './spin/change-color.gif';

// Say hello
import librarySay from './say/intro-say-hello.gif';
import stepSayHello from './say/intro-say-hello.gif';

// Add sprite
import libraryAddSprite from './sprite/intro-choose-sprite.gif';
import stepAddSprite from './sprite/intro-choose-sprite.gif';

// Clicker
import libraryClicker from './clicker/library-clicker.gif';
import stepDragGoTo from './clicker/drag-goto.gif';
import stepClickGoTo from './clicker/click-goto.gif';
import stepClickEvents from './clicker/click-events.gif';
import stepAddWhenClicked from './clicker/add-whenclicked.gif';
import stepClickSprite from './clicker/click-sprite.gif';
import stepAddSound from './clicker/add-sound.gif';

// Animate a name
import libraryAnimate from './animate/animate-name-change-color.gif';
import stepAnimateChangeColor from './animate/animate-name-change-color.gif';
import stepAnimateGrow from './animate/animate-name-grow.gif';
import stepAnimateSpin from './animate/animate-name-spin.gif';

// Make-Music
import libraryMakeMusic from './Make-Music/make-music-beatbox.gif';
import stepMakeSong from './Make-Music/make-music-make-song.gif';
import stepMakeBeat from './Make-Music/make-music-make-beat.gif';
import stepMakeBeatbox from './Make-Music/make-music-beatbox.gif';

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

  'intro-move-changecolor': {
      name: (
          <FormattedMessage
              defaultMessage="Getting Started"
              description="Name for the 'Getting Started' how-to"
              id="gui.howtos.intro-move-changecolor.name"
          />
      ),
      img: libraryIntro,
      steps: [
          {
              title: (
                  <FormattedMessage
                      defaultMessage="Getting Started"
                      description="Step name for 'Getting Started' step"
                      id="gui.howtos.intro-move-changecolor.step_movechangecolor"
                  />
              ),
              image: stepMoveChangeColor
          },  {
              deckIds: [
                  'say-hello',
                  'animate-a-name',
                  'add-sprite'
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
                      defaultMessage="Say Hello"
                      description="Step name for 'Add a new sprite' step"
                      id="gui.howtos.say-hello.step_addSprite"
                  />
              ),
              image: stepSayHello
          },
          {
                       deckIds: [
                           'add-a-backdrop',
                           'switch-costume',
                           'change-size'
                       ]
                   }
               ]
           },

     'add-sprite': {
         name: (
             <FormattedMessage
                 defaultMessage="Add a Sprite"
                 description="Name for the 'Add a Sprite' how-to"
                 id="gui.howtos.add-sprite.name"
             />
         ),
         img: libraryAddSprite,
         steps: [
             {
                 title: (
                     <FormattedMessage
                         defaultMessage="Add a Sprite"
                         description="Step name for 'Add a new sprite' step"
                         id="gui.howtos.add-sprite.step_addSprite"
                     />
                 ),
                 image: stepAddSprite
             },
             {
                          deckIds: [
                              'add-a-backdrop',
                              'switch-costume',
                              'change-size'
                          ]
                      }
                  ]
              },


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
    'animate-a-name': {
        name: (
            <FormattedMessage
                defaultMessage="Animate a Name"
                description="Name for the 'Animate a Name' how-to"
                id="gui.howtos.animate-a-name.name"
            />
        ),
        img: libraryAnimate,
        steps: [ {
            video: 'https://www.youtube.com/embed/q3nnXj6wr5k'
        },
            {
                title: (
                    <FormattedMessage
                        defaultMessage="Change color"
                        description="Step name for 'Change color' step"
                        id="gui.howtos.animate-a-name.step_AnimateChangeColor"
                    />
                ),
                image: stepAnimateChangeColor
            }, {
                title: (
                    <FormattedMessage
                        defaultMessage="Choose A Letter & Make It Spin"
                        description="Step name for 'Choose A Letter & Make It Spin' step"
                        id="gui.howtos.animate-a-name.step_AnimateSpin"
                    />
                ),
                image: stepAnimateSpin
            }, {
                title: (
                    <FormattedMessage
                        defaultMessage="Choose A Letter & Make It Grow"
                        description="Step name for 'Choose A Letter & Make It Grow' step"
                        id="gui.howtos.animate-a-name.step_AnimateGrow"
                    />
                ),
                image: stepAnimateGrow
            },   {
                deckIds: [
                    'add-a-backdrop',
                    'switch-costume',
                    'change-size'
                ]
            }
        ]
    },
    'Make-Music': {
        name: (
            <FormattedMessage
                defaultMessage="Make Music"
                description="Name for the 'Make Music' how-to"
                id="gui.howtos.make-music.name"
            />
        ),
        img: libraryMakeMusic,
        steps: [{
            video: 'https://www.youtube.com/embed/o3ih7d_4uv0'
        },
            {
                title: (
                    <FormattedMessage
                        defaultMessage="Create a Song"
                        description="Step name for 'Create a Song' step"
                        id="gui.howtos.Make-Music.step_CreateASong"
                    />
                ),
                image: stepMakeSong
            }, {
                title: (
                    <FormattedMessage
                        defaultMessage="Choose a Drum & Make a Beat"
                        description="Step name for 'Choose a Drum & Make a Beat' step"
                        id="gui.howtos.make-music.step_MakeBeat"
                    />
                ),
                image: stepMakeBeat
            }, {
                title: (
                    <FormattedMessage
                        defaultMessage="Choose the Microphone Sprite & Surprise Beatbox"
                        description="Step name for 'Choose the Microphone Sprite & Surprise Beatbox' step"
                        id="gui.howtos.make-music.step_MakeBeatBox"
                    />
                ),
                image: stepMakeBeatbox
            },  {
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
