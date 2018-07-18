import React from 'react';
import {FormattedMessage} from 'react-intl';

// Intro
import libraryIntro from './intro/lib-getting-started.jpg';
import stepMove from './intro/intro1.gif';
import stepMoveSayHello from './intro/intro2.gif';

// Add sprite
import libraryAddSprite from './sprite/cover-add-sprite.jpg';
import stepAddSprite from './sprite/intro-choose-sprite.gif';

// Animate a name
import libraryAnimate from './animate/lib_animate-a-name.jpg';
import stepAnimatePickLetter from './animate/animate-name-pick-a-letter.gif';
import stepAnimatePlaySound from './animate/animate-name-play-sound.gif';
import stepAnimatePickLetter2 from './animate/animate-name-pick-a-letter2.gif';
import stepAnimateChangeColor from './animate/animate-name-change-color.gif';
import stepAnimateSpin from './animate/animate-name-spin.gif';
import stepAnimateGrow from './animate/animate-name-grow.gif';


// Make-Music
import libraryMakeMusic from './make-music/lib-make-music.jpg';
import stepPickInstrument from './make-music/make-music-pick-instrument.gif';
import stepPlaySoundClick from './make-music/make-music-play-sound.gif';
import stepMakeSong from './make-music/make-music-make-song.gif';
import stepMakeBeat from './make-music/make-music-make-beat.gif';
import stepMakeBeatbox from './make-music/make-music-beatbox.gif';

// Chase-Game
import libraryChaseGame from './chase-game/lib-chasegame.jpg';
import stepBG from './chase-game/chase-game-add-backdrop.gif';
import stepAddOcto from './chase-game/chase-game-add-sprite1.gif';
import stepLeftRight from './chase-game/chase-game-move-rightleft.gif';
import stepUpDown from './chase-game/chase-game-move-updown.gif';
import stepAddStar from './chase-game/chase-game-add-sprite2.gif';
import stepMoveRandom from './chase-game/chase-game-move-randomly.gif';
import stepWhenTouch from './chase-game/chase-game-touching.gif';
import stepScoreVariable from './chase-game/chase-game-add-variable.gif';
import stepScoreWhenTouch from './chase-game/chase-game-change-score.gif';

// Make-A-Game
import libraryMakeAGame from './game/lib-pop.jpg';
import stepGamePickSprite from './game/game-pick-sprite.gif';
import stepGamePlaySound from './game/game-play-sound.gif';
import stepGameAddScore from './game/game-add-score.gif';
import stepGameChangeScore from './game/game-change-score.gif';
import stepRandom from './game/game-random-position.gif';
import stepGameChangeColor from './game/game-change-color.gif';
import stepResetScore from './game/game-reset-score.gif';

// Videos
import recordASound from './videos/record-a-sound.jpg';
import glideAroundThumb from './videos/glide-around.jpg';
import changeSizeThumb from './videos/change-size.jpg';
import switchCostumeThumb from './videos/animate-sprite.jpg';
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
        steps: [{
            video: 'https://www.youtube.com/embed/h9x8IPGN3SI'
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Add a move block"
                    description="Step name for 'Add a move block' step"
                    id="gui.howtos.intro-move.step_stepMove"
                />
            ),
            image: stepMove
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Click the green flag to start"
                    description="Step name for 'Add A Say Block' step"
                    id="gui.howtos.add-a-move-block.step_stepMoveSayHello"
                />
            ),
            image: stepMoveSayHello
        }, {
            deckIds: [
                'add-a-backdrop',
                'add-sprite',
                'glide-around'
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
        steps: [{
            video: 'https://www.youtube.com/embed/RUih6RnEdPg'
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Pick a Letter Sprite"
                    description="Step name for 'Pick a Letter Sprite' step"
                    id="gui.howtos.animate-a-name.step_AnimatePickLetter"
                />
            ),
            image: stepAnimatePickLetter
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Play a Sound When Clicked"
                    description="Step name for 'Play a Sound When Clicked' step"
                    id="gui.howtos.animate-a-name.step_AnimatePlaySound"
                />
            ),
            image: stepAnimatePlaySound
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Pick Another Letter Sprite"
                    description="Step name for 'Pick Another Letter Sprite"
                    id="gui.howtos.animate-a-name.step_AnimatePickLetter2"
                />
            ),
            image: stepAnimatePickLetter2
        }, {
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
                    defaultMessage="Pick Another Letter Sprite & Make It Spin"
                    description="Step name for 'Pick Another Letter Sprite & Make It Spin' step"
                    id="gui.howtos.animate-a-name.step_AnimateSpin"
                />
            ),
            image: stepAnimateSpin
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Pick Another Letter Sprite & Make It Grow"
                    description="Step name for 'Pick Another Letter Sprite & Make It Grow!' step"
                    id="gui.howtos.animate-a-name.step_AnimateGrow"
                />
            ),
            image: stepAnimateGrow
        }, {
            deckIds: [
                'add-a-backdrop',
                'glide-around',
                'hide-and-show'
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
            video: 'https://www.youtube.com/embed/UQHHAQGuhl8'
        },
        {
            title: (
                <FormattedMessage
                    defaultMessage="Pick an Instrument Sprite "
                    description="Step name for 'Pick an Instrument Sprite' step"
                    id="gui.howtos.Make-Music.step_PickInstrument"
                />
            ),
            image: stepPickInstrument
        },
        {
            title: (
                <FormattedMessage
                    defaultMessage="Play Sound When Clicked"
                    description="Step name for 'Play Sound When Clicked' step"
                    id="gui.howtos.Make-Music.step_PlaySoundClick"
                />
            ),
            image: stepPlaySoundClick
        },
        {
            title: (
                <FormattedMessage
                    defaultMessage="Create a Song"
                    description="Step name for 'Create a Song' step"
                    id="gui.howtos.Make-Music.step_MakeSong"
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
        }, {
            deckIds: [
                'add-a-backdrop',
                'add-sprite',
                'switch-costume'
            ]
        }
        ]
    },
    'Make-A-Game': {
        name: (
            <FormattedMessage
                defaultMessage="Make a Clicker Game"
                description="Name for the 'Make a Clicker Game' how-to"
                id="gui.howtos.make-a-game.name"
            />
        ),
        img: libraryMakeAGame,
        steps: [{
            video: 'https://www.youtube.com/embed/3G2miGV4TbQ'
        },
        {
            title: (
                <FormattedMessage
                    defaultMessage="Pick A Sprite"
                    description="Step name for 'Pick A Sprite' step"
                    id="gui.howtos.Make-A-Game.step_GamePickSprite"
                />
            ),
            image: stepGamePickSprite
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Play Sound When Clicked"
                    description="Play Sound When Clicked' step"
                    id="gui.howtos.make-a-game.step_GamePlaySound"
                />
            ),
            image: stepGamePlaySound
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Create Score Variable"
                    description="Step name for 'Create Score Variable' step"
                    id="gui.howtos.make-a-game.step_GameAddScore"
                />
            ),
            image: stepGameAddScore
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="When Clicked Increase Score"
                    description="Step name for 'When Clicked Increase Score' step"
                    id="gui.howtos.make-a-game.step_GameChangeScore"
                />
            ),

            image: stepGameChangeScore
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Go to a random position"
                    description="Step name for 'Go to a random position' step"
                    id="gui.howtos.make-a-game.step_Random"
                />
            ),
            image: stepRandom
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Change Color"
                    description="Step name for 'Change Color' step"
                    id="gui.howtos.make-music.step_GameChangeColor"
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
        }, {
            deckIds: [
                'add-a-backdrop',
                'move-around-with-arrow-keys',
                'add-effects'
            ]
        }
        ]
    },

    'Chase-Game': {
        name: (
            <FormattedMessage
                defaultMessage="Make a Chase Game"
                description="Name for the 'Make a Chase Game' how-to"
                id="gui.howtos.make-a-chase-game.name"
            />
        ),
        img: libraryChaseGame,
        steps: [{
            video: 'https://www.youtube.com/embed/IRf9-P8PiZo'
        },
        {
            title: (
                <FormattedMessage
                    defaultMessage="Add a Backdrop"
                    description="Step name for 'Add a Backdrop' step"
                    id="gui.howtos.Chase-Game.step_BG"
                />
            ),
            image: stepBG
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Add a Sprite"
                    description="Step name for 'Add a Sprite' step"
                    id="gui.howtos.chase-game.step_AddOcto"
                />
            ),
            image: stepAddOcto
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Move Right & Left With Arrow Keys"
                    description="Step name for 'Move Right & Left With Arrow Keys' step"
                    id="gui.howtos.make-music.step_LeftRight"
                />
            ),
            image: stepLeftRight
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Move Up & Down With Arrow Keys"
                    description="Step name for 'Move Up & Down With Arrow Keys' step"
                    id="gui.howtos.Chase-Game.step_UpDown"
                />
            ),
            image: stepUpDown
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Add Another Sprite"
                    description="Step name for 'Add Another Sprite' step"
                    id="gui.howtos.Chase-Game.step_AddStar"
                />
            ),
            image: stepAddStar
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Move Randomly"
                    description="Step name for 'Move Randomly' step"
                    id="gui.howtos.Chase-Game.step_MoveRandom"
                />
            ),
            image: stepMoveRandom
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="In Octopus Sprite, When Touching Play Sound"
                    description="Step name for 'In Octopus Sprite, When Touching Play Sound' step"
                    id="gui.howtos.Chase-Game.step_WhenTouch"
                />
            ),
            image: stepWhenTouch
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Create Score Variable"
                    description="Step name for 'Create Score Variable"
                    id="gui.howtos.Chase-Game.step_ScoreVariable"
                />
            ),
            image: stepScoreVariable
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="In Octopus Sprite, When Touching Add Score"
                    description="Step name for 'In Octopus Sprite, When Touching Add Score step"
                    id="gui.howtos.Chase-Game.ScoreWhenTouch"
                />
            ),
            image: stepScoreWhenTouch
        }, {
            deckIds: [
                'add-a-backdrop',
                'add-effects',
                'move-around-with-arrow-keys'
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
    'add-a-backdrop': {
        name: (
            <FormattedMessage
                defaultMessage="Add a Backdrop"
                description="Name for the 'Add a Backdrop' how-to"
                id="gui.howtos.add-a-backdrop.name"
            />
        ),
        img: addBackdropThumb,
        steps: [{
            video: 'https://www.youtube.com/embed/Xv3Z80yy2l0'
        }, {
            deckIds: [
                'change-size',
                'switch-costume',
                'spin-video'
            ]
        }]
    },
    'change-size': {
        name: (
            <FormattedMessage
                defaultMessage="Change Size"
                description="Name for the 'Change Size' how-to"
                id="gui.howtos.change-size.name"
            />
        ),
        img: changeSizeThumb,
        steps: [{
            video: 'https://www.youtube.com/embed/PJijGbhcT3E'
        }, {
            deckIds: [
                'glide-around',
                'spin-video',
                'switch-costume'
            ]
        }]
    },
    'glide-around': {
        name: (
            <FormattedMessage
                defaultMessage="Glide Around"
                description="Name for the 'Glide Around' how-to"
                id="gui.howtos.glide-around.name"
            />
        ),
        img: glideAroundThumb,
        steps: [{
            video: 'https://www.youtube.com/embed/KYmbgLX1xDs'
        }, {
            deckIds: [
                'add-a-backdrop',
                'switch-costume',
                'change-size'
            ]
        }]
    },

    'record-a-sound': {
        name: (
            <FormattedMessage
                defaultMessage="Record a Sound"
                description="Record A Sound' how-to"
                id="gui.howtos.record-a-sound.name"
            />
        ),
        img: recordASound,
        steps: [{
            video: 'https://www.youtube.com/embed/1WaU6e70Zig'
        }, {
            deckIds: [
                'Make-Music',
                'switch-costume',
                'change-size'
            ]
        }]

    },
    'spin-video': {
        name: 'Make It Spin',
        img: spinThumb,
        steps: [{
            video: 'https://www.youtube.com/embed/C76V5cuI9XM'
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
                defaultMessage="Hide and Show"
                description="Name for the 'Hide and Show' how-to"
                id="gui.howtos.hide-and-show.name"
            />
        ),
        img: hideAndShowThumb,
        steps: [{
            video: 'https://www.youtube.com/embed/6yWUvRU19ms'
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
                defaultMessage="Animate a Sprite"
                description="Name for the 'Animate a Sprite' how-to"
                id="gui.howtos.switch-costume.name"
            />
        ),
        img: switchCostumeThumb,
        steps: [{
            video: 'https://www.youtube.com/embed/vppgw1Xiegw'
        }, {
            deckIds: [
                'add-a-backdrop',
                'add-effects',
                'change-size'
            ]
        }]
    },

    'move-around-with-arrow-keys': {
        name: 'Use Arrow Keys',
        img: moveArrowKeysThumb,
        steps: [{
            video: 'https://www.youtube.com/embed/uf6agkKnXJw'
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
                defaultMessage="Add Effects"
                description="Name for the 'Add Effects' how-to"
                id="gui.howtos.add-effects.name"
            />
        ),
        img: addEffectsThumb,
        steps: [{
            video: 'https://www.youtube.com/embed/w3kGWEzRtxY'
        }, {
            deckIds: [
                'add-a-backdrop',
                'switch-costume',
                'change-size'
            ]
        }]
    }
};
