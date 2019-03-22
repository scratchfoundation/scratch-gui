import React from 'react';
import {FormattedMessage} from 'react-intl';

// Tutorial thumbnails: Avoid using any text that would need to be
// translated in thumbnails.
// Intro
import libraryIntro from './thumbnails/getting-started.jpg';

// Text to Speech
import libraryTXTSpeech from './thumbnails/text-to-speech.jpg';

// Cartoon Network
import libraryCartoonNetwork from './thumbnails/cartoon-network.jpg';

// Add sprite
import libraryAddSprite from './thumbnails/add-sprite.jpg';

// Animate a name
import libraryAnimate from './thumbnails/animate-a-name.jpg';

// Make-Music
import libraryMakeMusic from './thumbnails/make-music.jpg';

// Chase-Game
import libraryChaseGame from './thumbnails/chase-game.jpg';

// Make-A-Game
import libraryMakeAGame from './thumbnails/pop-game.jpg';

// Animate A Character
import libraryAnimateChar from './thumbnails/animate-a-character.jpg';

// Tell A Story
import libraryStory from './thumbnails/tell-a-story.jpg';

// Video Sensing
import libraryVideoSens from './thumbnails/video-sensing.jpg';

// Videos
import recordASound from './thumbnails/record-a-sound.jpg';
import glideAroundThumb from './thumbnails/glide-around.jpg';
import changeSizeThumb from './thumbnails/change-size.jpg';
import switchCostumeThumb from './thumbnails/animate-sprite.jpg';
import hideAndShowThumb from './thumbnails/hide-and-show.jpg';
import addBackdropThumb from './thumbnails/add-backdrop.jpg';
import addEffectsThumb from './thumbnails/add-effects.jpg';
import moveArrowKeysThumb from './thumbnails/move-arrow-keys.jpg';
import spinThumb from './thumbnails/spin.jpg';

export default {

    'intro-move-sayhello': {
        name: (
            <FormattedMessage
                defaultMessage="Getting Started"
                description="Name for the 'Getting Started' how-to"
                id="gui.howtos.intro-move-sayhello-hat.name"
            />
        ),
        tags: ['help', 'stuck', 'how', 'can', 'say'],
        img: libraryIntro,
        steps: [{
            video: 'intro-move-sayhello'
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Add a move block"
                    description="Step name for 'Add a move block' step"
                    id="gui.howtos.intro-move.step_stepMove"
                />
            ),
            image: 'introMove'
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Click the green flag to start"
                    description="Step name for 'Add A Say Block' step"
                    id="gui.howtos.add-a-move-block.step_stepMoveSayHello"
                />
            ),
            image: 'introSayHello'
        }, {
            deckIds: [
                'add-a-backdrop',
                'add-sprite'
            ]
        }
        ],
        urlId: 'getStarted'
    },

    'say-it-out-loud': {
        name: (
            <FormattedMessage
                defaultMessage="Create Animations That Talk"
                description="Name for the 'Create Animations That Talk' how-to"
                id="gui.howtos.say-it-out-loud"
            />
        ),
        img: libraryTXTSpeech,
        steps: [{
            video: 'k54n8uwcty',
            trackingPixel: (
                <img src="https://code.org/api/hour/begin_scratch_talk.png" />
            )
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Add the Text to Speech blocks"
                    description="Step name for 'Add the Text to Speech blocks' step"
                    id="gui.howtos.say-it-out-loud.step_AddTXTextension"
                />
            ),
            image: 'speechAddExtension'
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Say Something"
                    description="Step name for 'Say Something' step"
                    id="gui.howtos.say-it-out-loud.step_TXTSpeech"
                />
            ),
            image: 'speechSaySomething'
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Set a Voice"
                    description="Step name for 'Set a Voice"
                    id="gui.howtos.say-it-out-loud_TXTSetVoice"
                />
            ),
            image: 'speechSetVoice'
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Move Around"
                    description="Step name for 'Move Around' step"
                    id="gui.howtos.say-it-out-loud.step_TXTMove"
                />
            ),
            image: 'speechMoveAround'
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Add a Backdrop "
                    description="Step name for 'Add a Backdrop' step"
                    id="gui.howtos.say-it-out-loud.step_TXTBackdrop"
                />
            ),
            image: 'speechAddBackdrop'
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Add Another Character"
                    description="Step name for 'Add Another Character' step"
                    id="gui.howtos.say-it-out-loud.step_TXTAddSprite"
                />
            ),
            image: 'speechAddSprite'
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Perform a Song"
                    description="Step name for 'Perform a Song' step"
                    id="gui.howtos.say-it-out-loud.step_TXTSong"
                />
            ),
            image: 'speechSong'
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Change Color"
                    description="Step name for 'Change Color' step"
                    id="gui.howtos.say-it-out-loud.step_TXTColor"
                />
            ),
            image: 'speechChangeColor'
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Spin Around"
                    description="Step name for 'Spin Around"
                    id="gui.howtos.say-it-out-loud.step_TXTSpin"
                />
            ),
            image: 'speechSpin'
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Grow and Shrink"
                    description="Step name for 'Grow and Shrink' step"
                    id="gui.howtos.say-it-out-loud.step_TXTGrow"
                />
            ),
            image: 'speechGrowShrink'
        }, {
            deckIds: [
                'animate-a-name',
                'Make-Music'
            ]
        }
        ],
        urlId: 'animations-that-talk'
    },

    'cartoon-network': {
        name: (
            <FormattedMessage
                defaultMessage="Animate an Adventure Game"
                description="Animate an Adventure Game' how-to"
                id="gui.howtos.cartoon-network"
            />
        ),
        requiredProjectId: '249143200',
        img: libraryCartoonNetwork,
        steps: [{
            video: 'uz5oz5h9yg',
            trackingPixel: (
                <img src="https://code.org/api/hour/begin_scratch_adventure.png" />
            )
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Choose a Character to Show"
                    description="Step name for 'Choose a Character to Show' step"
                    id="gui.howtos.cartoon-network.step_CNcharacter"
                />
            ),
            image: 'cnShowCharacter'
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Say Something"
                    description="Step name for 'Say Something' step"
                    id="gui.howtos.cartoon-network.step_CNsay"
                />
            ),
            image: 'cnSay'
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Glide Around"
                    description="Step name for 'Glide Around' step"
                    id="gui.howtos.cartoon-network.step_CNglide"
                />
            ),
            image: 'cnGlide'
        }, {
            title: (
                <FormattedMessage
                    defaultMessage=" Choose an Object to Chase "
                    description="Step name for 'Choose an Object to Chase' step"
                    id="gui.howtos.cartoon-network.step_CNpicksprite"
                />
            ),
            image: 'cnPickSprite'
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Collect Objects"
                    description="Step name for 'Collect Objects' step"
                    id="gui.howtos.cartoon-network.step_CNcollect"
                />
            ),
            image: 'cnCollect'
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Make a Score Variable"
                    description="Step name for 'Make a Score Variable' step"
                    id="gui.howtos.cartoon-network.step_CNvariable"
                />
            ),
            image: 'cnVariable'
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Keep Score"
                    description="Step name for 'Keep Score' step"
                    id="gui.howtos.cartoon-network.step_CNscore"
                />
            ),
            image: 'cnScore'
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Level Up: Change Backdrop"
                    description="Step name for 'Level Up: Change Backdrop' step"
                    id="gui.howtos.cartoon-network.step_CNbackdrop"
                />
            ),
            image: 'cnBackdrop'
        },
        {
            video: '6o76f5ivo1'
        },
        {
            deckIds: [
                'switch-costume',
                'add-effects'
            ]
        }
        ],
        urlId: 'animate-an-adventure-game'
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
        tags: ['animation', 'art', 'spin', 'grow'],
        steps: [{
            video: 'animate-a-name'
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Pick a Letter Sprite"
                    description="Step name for 'Pick a Letter Sprite' step"
                    id="gui.howtos.animate-a-name.step_AnimatePickLetter"
                />
            ),
            image: 'namePickLetter'
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Play a Sound When Clicked"
                    description="Step name for 'Play a Sound When Clicked' step"
                    id="gui.howtos.animate-a-name.step_AnimatePlaySound"
                />
            ),
            image: 'namePlaySound'
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Pick Another Letter Sprite"
                    description="Step name for 'Pick Another Letter Sprite"
                    id="gui.howtos.animate-a-name.step_AnimatePickLetter2"
                />
            ),
            image: 'namePickLetter2'
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Change color"
                    description="Step name for 'Change color' step"
                    id="gui.howtos.animate-a-name.step_AnimateChangeColor"
                />
            ),
            image: 'nameChangeColor'
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Pick Another Letter Sprite & Make It Spin"
                    description="Step name for 'Pick Another Letter Sprite & Make It Spin' step"
                    id="gui.howtos.animate-a-name.step_AnimateSpin"
                />
            ),
            image: 'nameSpin'
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Pick Another Letter Sprite & Make It Grow"
                    description="Step name for 'Pick Another Letter Sprite & Make It Grow!' step"
                    id="gui.howtos.animate-a-name.step_AnimateGrow"
                />
            ),
            image: 'nameGrow'
        }, {
            deckIds: [
                'add-a-backdrop',
                'glide-around'
            ]
        }
        ],
        urlId: 'name'
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
        tags: ['music', 'sound', 'instrument', 'play', 'song', 'band'],
        steps: [{
            video: 'Make-Music'
        },
        {
            title: (
                <FormattedMessage
                    defaultMessage="Pick an Instrument Sprite "
                    description="Step name for 'Pick an Instrument Sprite' step"
                    id="gui.howtos.Make-Music.step_PickInstrument"
                />
            ),
            image: 'musicPickInstrument'
        },
        {
            title: (
                <FormattedMessage
                    defaultMessage="Play Sound When Clicked"
                    description="Step name for 'Play Sound When Clicked' step"
                    id="gui.howtos.Make-Music.step_PlaySoundClick"
                />
            ),
            image: 'musicPlaySound'
        },
        {
            title: (
                <FormattedMessage
                    defaultMessage="Create a Song"
                    description="Step name for 'Create a Song' step"
                    id="gui.howtos.Make-Music.step_MakeSong"
                />
            ),
            image: 'musicMakeSong'
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Choose a Drum & Make a Beat"
                    description="Step name for 'Choose a Drum & Make a Beat' step"
                    id="gui.howtos.make-music.step_MakeBeat"
                />
            ),
            image: 'musicMakeBeat'
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Choose the Microphone Sprite & Surprise Beatbox"
                    description="Step name for 'Choose the Microphone Sprite & Surprise Beatbox' step"
                    id="gui.howtos.make-music.step_MakeBeatBox"
                />
            ),
            image: 'musicMakeBeatbox'
        }, {
            deckIds: [
                'add-a-backdrop',
                'add-sprite'
            ]
        }
        ],
        urlId: 'music'
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
        tags: ['games', 'click', 'clicked', 'score'],
        steps: [{
            video: 'Make-A-Game'
        },
        {
            title: (
                <FormattedMessage
                    defaultMessage="Pick A Sprite"
                    description="Step name for 'Pick A Sprite' step"
                    id="gui.howtos.Make-A-Game.step_GamePickSprite"
                />
            ),
            image: 'popGamePickSprite'
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Play Sound When Clicked"
                    description="Play Sound When Clicked' step"
                    id="gui.howtos.make-a-game.step_GamePlaySound"
                />
            ),
            image: 'popGamePlaySound'
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Create Score Variable"
                    description="Step name for 'Create Score Variable' step"
                    id="gui.howtos.make-a-game.step_GameAddScore"
                />
            ),
            image: 'popGameAddScore'
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="When Clicked Increase Score"
                    description="Step name for 'When Clicked Increase Score' step"
                    id="gui.howtos.make-a-game.step_GameChangeScore"
                />
            ),

            image: 'popGameChangeScore'
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Go to a random position"
                    description="Step name for 'Go to a random position' step"
                    id="gui.howtos.make-a-game.step_Random"
                />
            ),
            image: 'popGameRandomPosition'
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Change Color"
                    description="Step name for 'Change Color' step"
                    id="gui.howtos.make-music.step_GameChangeColor"
                />
            ),
            image: 'popGameChangeColor'
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Reset Score"
                    description="Step name for 'Reset Score' step"
                    id="gui.howtos.make-music.step_ResetScore"
                />
            ),
            image: 'popGameResetScore'
        }, {
            deckIds: [
                'add-a-backdrop',
                'move-around-with-arrow-keys'
            ]
        }
        ],
        urlId: 'clicker-game'
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
        tags: ['games', 'arrow', 'keyboard', 'score'],
        steps: [{
            video: 'Chase-Game'
        },
        {
            title: (
                <FormattedMessage
                    defaultMessage="Add a Backdrop"
                    description="Step name for 'Add a Backdrop' step"
                    id="gui.howtos.Chase-Game.step_BG"
                />
            ),
            image: 'chaseGameAddBackdrop'
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Add a Sprite"
                    description="Step name for 'Add a Sprite' step"
                    id="gui.howtos.chase-game.step_AddOcto"
                />
            ),
            image: 'chaseGameAddSprite1'
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Move Right & Left With Arrow Keys"
                    description="Step name for 'Move Right & Left With Arrow Keys' step"
                    id="gui.howtos.make-music.step_LeftRight"
                />
            ),
            image: 'chaseGameRightLeft'
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Move Up & Down With Arrow Keys"
                    description="Step name for 'Move Up & Down With Arrow Keys' step"
                    id="gui.howtos.Chase-Game.step_UpDown"
                />
            ),
            image: 'chaseGameUpDown'
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Add Another Sprite"
                    description="Step name for 'Add Another Sprite' step"
                    id="gui.howtos.Chase-Game.step_AddStar"
                />
            ),
            image: 'chaseGameAddSprite2'
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Move Randomly"
                    description="Step name for 'Move Randomly' step"
                    id="gui.howtos.Chase-Game.step_MoveRandom"
                />
            ),
            image: 'chaseGameMoveRandomly'
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="In Octopus Sprite, When Touching Play Sound"
                    description="Step name for 'In Octopus Sprite, When Touching Play Sound' step"
                    id="gui.howtos.Chase-Game.step_WhenTouch"
                />
            ),
            image: 'chaseGamePlaySound'
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Create Score Variable"
                    description="Step name for 'Create Score Variable"
                    id="gui.howtos.Chase-Game.step_ScoreVariable"
                />
            ),
            image: 'chaseGameAddVariable'
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="In Octopus Sprite, When Touching Add Score"
                    description="Step name for 'In Octopus Sprite, When Touching Add Score step"
                    id="gui.howtos.Chase-Game.ScoreWhenTouch"
                />
            ),
            image: 'chaseGameChangeScore'
        }, {
            deckIds: [
                'add-effects',
                'move-around-with-arrow-keys'
            ]
        }
        ],
        urlId: 'chase-game'
    },
    'Animate-A-Character': {
        name: (
            <FormattedMessage
                defaultMessage="Animate A Character"
                description="Name for the 'Animate A Character' how-to"
                id="gui.howtos.animate-char.name"
            />
        ),
        img: libraryAnimateChar,
        steps: [{
            video: 's228u3g5u9'
        },
        {
            title: (
                <FormattedMessage
                    defaultMessage="Add a Backdrop"
                    description="Step name for 'Add a Backdrop' step"
                    id="gui.howtos.animate-char.step_addbg"
                />
            ),
            image: 'animateCharPickBackdrop'
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Add a Sprite"
                    description="Step name for 'Add a Sprite' step"
                    id="gui.howtos.animate-char.step_addsprite"
                />
            ),
            image: 'animateCharPickSprite'
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Say Something"
                    description="Step name for 'Say Something' step"
                    id="gui.howtos.animate-char.step_saysomething"
                />
            ),
            image: 'animateCharSaySomething'
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Add Sound"
                    description="Step name for 'Add Sound' step"
                    id="gui.howtos.animate-char.step_addsound"
                />
            ),
            image: 'animateCharAddSound'
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Animate Talking"
                    description="Step name for 'Animate Talking' step"
                    id="gui.howtos.animate-char.step_animatetalking"
                />
            ),
            image: 'animateCharTalk'
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Move Using Arrow Keys"
                    description="Step name for 'Move Using Arrow Keys' step"
                    id="gui.howtos.animate-char.step_arrowkeys"
                />
            ),
            image: 'animateCharMove'
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Jump"
                    description="Step name for 'Jump' step"
                    id="gui.howtos.animate-char.step_jump"
                />
            ),
            image: 'animateCharJump'
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Change Color"
                    description="Step name for 'Change Color' step"
                    id="gui.howtos.animate-char.step_changecolor"
                />
            ),
            image: 'animateCharChangeColor'
        }, {
            deckIds: [
                'Chase-Game',
                'Tell-A-Story'
            ]
        }
        ],
        urlId: 'animate-a-character'
    },
    'Tell-A-Story': {
        name: (
            <FormattedMessage
                defaultMessage="Create A Story"
                description="Name for the 'Create A Story' how-to"
                id="gui.howtos.story.name"
            />
        ),
        img: libraryStory,
        steps: [{
            video: 'stah7jjorp'
        },
        {
            title: (
                <FormattedMessage
                    defaultMessage="Add a Backdrop"
                    description="Step name for 'Add a Backdrop' step"
                    id="gui.howtos.story.step_addbg"
                />
            ),
            image: 'storyPickBackdrop'
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Add a Character"
                    description="Step name for 'Add a Character' step"
                    id="gui.howtos.story.step_addsprite"
                />
            ),
            image: 'storyPickSprite'
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Say Something"
                    description="Step name for 'Say Something' step"
                    id="gui.howtos.story.step_saysomething"
                />
            ),
            image: 'storySaySomething'
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Add Another Character"
                    description="Step name for 'Add Another Character' step"
                    id="gui.howtos.story.step_addanothersprite"
                />
            ),
            image: 'storyPickSprite2'
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Flip Direction"
                    description="Flip Direction' step"
                    id="gui.howtos.story.step_flip"
                />
            ),
            image: 'storyFlip'
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Have A Conversation"
                    description="Step name for 'Have A Conversation' step"
                    id="gui.howtos.story.step_conversation"
                />
            ),
            image: 'storyConversation'
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Add Another Backdrop"
                    description="Step name for 'Add Another Backdrop' step"
                    id="gui.howtos.story.addanotherbg"
                />
            ),
            image: 'storyPickBackdrop2'
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Switch Backdrops"
                    description="Step name for 'Switch Backdrops' step"
                    id="gui.howtos.story.step_swithbg"
                />
            ),
            image: 'storySwitchBackdrop'
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Hide a Character"
                    description="Step name for 'Hide the Wizard' step"
                    id="gui.howtos.story.step_hidewizard"
                />
            ),
            image: 'storyHideCharacter'
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Show a Character"
                    description="Step name for 'Show the Wizard' step"
                    id="gui.howtos.story.step_showwizard"
                />
            ),
            image: 'storyShowCharacter'
        },
        {
            deckIds: [
                'say-it-out-loud',
                'record-a-sound'
            ]
        }
        ],
        urlId: 'tell-a-story'
    },
    'Video-Sensing': {
        name: (
            <FormattedMessage
                defaultMessage="Video Sensing"
                description="Name for the 'Video Sensing' how-to"
                id="gui.howtos.videosens.name"
            />
        ),
        img: libraryVideoSens,
        steps: [{
            video: '3pd1z110d6'
        },
        {
            title: (
                <FormattedMessage
                    defaultMessage="Add Extension"
                    description="Step name for 'Add Extension' step"
                    id="gui.howtos.videosens.step_addextension"
                />
            ),
            image: 'videoAddExtension'
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Pet the Cat"
                    description="Step name for 'Pet the Cat' step"
                    id="gui.howtos.videosens.step_pet"
                />
            ),
            image: 'videoPet'
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Animate"
                    description="Step name for 'Animate' step"
                    id="gui.howtos.videosens.step_animate"
                />
            ),
            image: 'videoAnimate'
        }, {
            title: (
                <FormattedMessage
                    defaultMessage="Pop a Balloon"
                    description="Step name for 'Pop a Balloon' step"
                    id="gui.howtos.videosens.step_pop"
                />
            ),
            image: 'videoPop'
        }, {
            deckIds: [
                'Make-Music',
                'add-effects'
            ]
        }
        ],
        urlId: 'video-sensing'
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
        tags: ['art', 'games', 'stories', 'character'],
        steps: [
            {
                title: (
                    <FormattedMessage
                        defaultMessage="Add a Sprite"
                        description="Step name for 'Add a new sprite' step"
                        id="gui.howtos.add-sprite.step_addSprite"
                    />
                ),
                image: 'addSprite'
            },
            {
                deckIds: [
                    'add-a-backdrop',
                    'switch-costume'
                ]
            }
        ],
        urlId: 'add-a-sprite'
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
        tags: ['art', 'games', 'stories', 'background'],
        steps: [{
            video: 'add-a-backdrop'
        }, {
            deckIds: [
                'change-size',
                'switch-costume'
            ]
        }],
        urlId: 'add-a-backdrop'
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
        scale: ['art', 'animation', 'scale'],
        steps: [{
            video: 'change-size'
        }, {
            deckIds: [
                'glide-around',
                'spin-video'
            ]
        }],
        urlId: 'change-size'
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
        tags: ['animation', 'stories', 'music', 'instrument', 'play', 'song', 'band'],
        steps: [{
            video: 'glide-around'
        }, {
            deckIds: [
                'add-a-backdrop',
                'switch-costume'
            ]
        }],
        urlId: 'glide-around'
    },

    'record-a-sound': {
        name: (
            <FormattedMessage
                defaultMessage="Record a Sound"
                description="Record A Sound' how-to"
                id="gui.howtos.record-a-sound.name"
            />
        ),
        tags: ['music', 'games', 'stories'],
        img: recordASound,
        steps: [{
            video: 'record-a-sound'
        }, {
            deckIds: [
                'Make-Music',
                'switch-costume'
            ]
        }],
        urlId: 'record-a-sound'
    },
    'spin-video': {
        name: (
            <FormattedMessage
                defaultMessage="Make It Spin"
                description="Name for the 'Make It Spin' how-to"
                id="gui.howtos.spin-video.name"
            />
        ),
        img: spinThumb,
        tags: ['animation', 'rotate', 'rotation'],
        steps: [{
            video: 'spin-video'
        }, {
            deckIds: [
                'add-a-backdrop',
                'switch-costume'
            ]
        }],
        urlId: 'make-it-spin'
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
        tags: ['stories', 'appear', 'disappear'],
        steps: [{
            video: 'hide-and-show'
        }, {
            deckIds: [
                'add-a-backdrop',
                'switch-costume'
            ]
        }],
        urlId: 'hide'
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
        tags: ['animation', 'art', 'games', 'stories', 'paint', 'edit', 'change', 'character', 'sprite'],
        steps: [{
            video: 'switch-costume'
        }, {
            deckIds: [
                'add-a-backdrop',
                'add-effects'
            ]
        }],
        urlId: 'animate-a-sprite'
    },

    'move-around-with-arrow-keys': {
        name: (
            <FormattedMessage
                defaultMessage="Use Arrow Keys"
                description="Name for the 'Use Arrow Keys' how-to"
                id="gui.howtos.move-around-with-arrow-keys.name"
            />
        ),
        img: moveArrowKeysThumb,
        tags: ['games', 'keyboard'],
        steps: [{
            video: 'move-around-with-arrow-keys'
        }, {
            deckIds: [
                'add-a-backdrop',
                'switch-costume'
            ]
        }],
        urlId: 'arrow-keys'
    },
    'add-effects': {
        name: (
            <FormattedMessage
                defaultMessage="Add Effects"
                description="Name for the 'Add Effects' how-to"
                id="gui.howtos.add-effects.name"
            />
        ),
        tags: ['animation', 'art', 'games', 'stories', '8-bit', 'brightness', 'ghost', 'transparency', 'opacity',
            'fx', 'color', 'fisheye', 'whirl', 'twist', 'pixelate', 'mosaic', '8bit'],
        img: addEffectsThumb,
        steps: [{
            video: 'add-effects'
        }, {
            deckIds: [
                'add-a-backdrop',
                'switch-costume'
            ]
        }],
        urlId: 'add-effects'
    },
    'wedo2-getting-started': {
        steps: [{
            video: '4im7iizv47'
        }],
        urlId: 'wedo',
        hidden: true
    },
    'ev3-getting-started': {
        steps: [{
            video: 'qgu78c5y7d'
        }],
        urlId: 'ev3',
        hidden: true
    },
    'whats-new': {
        steps: [{
            video: 'mtqymxg0qq'
        }],
        urlId: 'whatsnew',
        hidden: true
    }
};
