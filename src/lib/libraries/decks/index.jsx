import React from 'react';
import {FormattedMessage} from 'react-intl';

// Intro
import libraryIntro from './Intro/lib-getting-started.gif';
import stepMove from './Intro/IntroSayHello.gif';
import stepMoveSayHello from './Intro/IntroSayHello-hat.gif';

// Spin around
import librarySpin from './spin/library-spin.gif';
import stepDragTurn from './spin/drag-turn.gif';
import stepClickTurn from './spin/click-turn.gif';
import stepClickControl from './spin/click-control.gif';
import stepDragForever from './spin/drag-forever.gif';
import stepClickForever from './spin/click-forever.gif';
import stepChangeColor from './spin/change-color.gif';

// Say hello
import librarySay from './say/cover-say-hello.gif';
import stepSayHello from './say/intro-say-hello.gif';

// Add sprite
import libraryAddSprite from './sprite/cover-add-sprite.jpg';
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
import libraryAnimate from './animate/cover-color-click.gif';
import stepAnimateChangeColor from './animate/animate-name-change-color.gif';
import stepAnimateGrow from './animate/animate-name-grow.gif';
import stepAnimateSpin from './animate/animate-name-spin.gif';

// Make-Music
import libraryMakeMusic from './Make-Music/cover-mic.jpg';
import stepMakeSong from './Make-Music/make-music-make-song.gif';
import stepMakeBeat from './Make-Music/make-music-make-beat.gif';
import stepMakeBeatbox from './Make-Music/make-music-beatbox.gif';

// Make-A-Game
import libraryMakeAGame from './Game/popping-library.gif';
import stepRandom from './Game/game-random-position.gif';
import stepGameChangeColor from './Game/game-change-color.gif';
import stepResetScore from './Game/game-reset-score.gif';

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

  'intro-move-sayhello': {
      name: (
          <FormattedMessage
              defaultMessage="Getting Started"
              description="Name for the 'Getting Started' how-to"
              id="gui.howtos.intro-move-sayhello-hat.name"
          />
      ),
      img: libraryIntro,
      steps: [
          {
              title: (
                  <FormattedMessage
                      defaultMessage="Add a Move Block and a Say Block"
                      description="Step name for 'Add a Move Block' step"
                      id="gui.howtos.intro-move.step_stepMove"
                  />
              ),
              image: stepMove
          },  {
              title: (
                  <FormattedMessage
                      defaultMessage="Add Green Flag Block, then click the flag"
                      description="Step name for 'Add A Say Block' step"
                      id="gui.howtos.add-a-move-block.step_stepMoveSayHello"
                  />
              ),
              image: stepMoveSayHello
          }, {




              deckIds: [
                  'add-sprite',
                  'animate-a-name',
                  'Make-A-Game'
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

    'Make-A-Game': {
        name: (
            <FormattedMessage
                defaultMessage="Make A Game"
                description="Name for the 'Make A Game' how-to"
                id="gui.howtos.make-a-game.name"
            />
        ),
        img: libraryMakeAGame,
        steps: [{
            video: 'https://www.youtube.com/embed/IPCaZ5kmFTA'
        },
            {
                title: (
                    <FormattedMessage
                        defaultMessage="Go to a random position"
                        description="Step name for 'Go to a random position' step"
                        id="gui.howtos.Make-A-Game.step_RandomPosition"
                    />
                ),
                image: stepRandom
            }, {
                title: (
                    <FormattedMessage
                        defaultMessage="Change Color"
                        description="Step name for 'Change Color' step"
                        id="gui.howtos.make-a-game.step_ChangeColor"
                    />
                ),
                image: stepGameChangeColor
            }, {
                title: (
                    <FormattedMessage
                        defaultMessage="Reset Score"
                        description="Step name for 'Reset Score' step"
                        id="gui.howtos.make-music.step_ResetScore"
                    />
                ),
                image: stepResetScore
            },  {
                deckIds: [
                    'add-a-backdrop',
                    'add-effects',
                    'move-around-with-arrow-keys'
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
        name: 'Move With Arrow Keys',
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
