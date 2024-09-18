"use strict";
(self["webpackChunkGUI"] = self["webpackChunkGUI"] || []).push([["fr-steps"],{

/***/ "./src/lib/libraries/decks/fr-steps.js":
/*!*********************************************!*\
  !*** ./src/lib/libraries/decks/fr-steps.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   frImages: () => (/* binding */ frImages)
/* harmony export */ });
/* harmony import */ var _steps_intro_1_move_fr_gif__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./steps/intro-1-move.fr.gif */ "./src/lib/libraries/decks/steps/intro-1-move.fr.gif");
/* harmony import */ var _steps_intro_2_say_fr_gif__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./steps/intro-2-say.fr.gif */ "./src/lib/libraries/decks/steps/intro-2-say.fr.gif");
/* harmony import */ var _steps_intro_3_green_flag_fr_gif__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./steps/intro-3-green-flag.fr.gif */ "./src/lib/libraries/decks/steps/intro-3-green-flag.fr.gif");
/* harmony import */ var _steps_speech_add_extension_fr_gif__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./steps/speech-add-extension.fr.gif */ "./src/lib/libraries/decks/steps/speech-add-extension.fr.gif");
/* harmony import */ var _steps_speech_say_something_fr_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./steps/speech-say-something.fr.png */ "./src/lib/libraries/decks/steps/speech-say-something.fr.png");
/* harmony import */ var _steps_speech_set_voice_fr_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./steps/speech-set-voice.fr.png */ "./src/lib/libraries/decks/steps/speech-set-voice.fr.png");
/* harmony import */ var _steps_speech_move_around_fr_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./steps/speech-move-around.fr.png */ "./src/lib/libraries/decks/steps/speech-move-around.fr.png");
/* harmony import */ var _steps_pick_backdrop_LTR_gif__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./steps/pick-backdrop.LTR.gif */ "./src/lib/libraries/decks/steps/pick-backdrop.LTR.gif");
/* harmony import */ var _steps_speech_add_sprite_LTR_gif__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./steps/speech-add-sprite.LTR.gif */ "./src/lib/libraries/decks/steps/speech-add-sprite.LTR.gif");
/* harmony import */ var _steps_speech_song_fr_png__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./steps/speech-song.fr.png */ "./src/lib/libraries/decks/steps/speech-song.fr.png");
/* harmony import */ var _steps_speech_change_color_fr_png__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./steps/speech-change-color.fr.png */ "./src/lib/libraries/decks/steps/speech-change-color.fr.png");
/* harmony import */ var _steps_speech_spin_fr_png__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./steps/speech-spin.fr.png */ "./src/lib/libraries/decks/steps/speech-spin.fr.png");
/* harmony import */ var _steps_speech_grow_shrink_fr_png__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./steps/speech-grow-shrink.fr.png */ "./src/lib/libraries/decks/steps/speech-grow-shrink.fr.png");
/* harmony import */ var _steps_cn_show_character_LTR_gif__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./steps/cn-show-character.LTR.gif */ "./src/lib/libraries/decks/steps/cn-show-character.LTR.gif");
/* harmony import */ var _steps_cn_say_fr_png__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./steps/cn-say.fr.png */ "./src/lib/libraries/decks/steps/cn-say.fr.png");
/* harmony import */ var _steps_cn_glide_fr_png__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./steps/cn-glide.fr.png */ "./src/lib/libraries/decks/steps/cn-glide.fr.png");
/* harmony import */ var _steps_cn_pick_sprite_LTR_gif__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./steps/cn-pick-sprite.LTR.gif */ "./src/lib/libraries/decks/steps/cn-pick-sprite.LTR.gif");
/* harmony import */ var _steps_cn_collect_fr_png__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./steps/cn-collect.fr.png */ "./src/lib/libraries/decks/steps/cn-collect.fr.png");
/* harmony import */ var _steps_add_variable_fr_gif__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./steps/add-variable.fr.gif */ "./src/lib/libraries/decks/steps/add-variable.fr.gif");
/* harmony import */ var _steps_cn_score_fr_png__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./steps/cn-score.fr.png */ "./src/lib/libraries/decks/steps/cn-score.fr.png");
/* harmony import */ var _steps_cn_backdrop_fr_png__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./steps/cn-backdrop.fr.png */ "./src/lib/libraries/decks/steps/cn-backdrop.fr.png");
/* harmony import */ var _steps_add_sprite_LTR_gif__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./steps/add-sprite.LTR.gif */ "./src/lib/libraries/decks/steps/add-sprite.LTR.gif");
/* harmony import */ var _steps_name_pick_letter_LTR_gif__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./steps/name-pick-letter.LTR.gif */ "./src/lib/libraries/decks/steps/name-pick-letter.LTR.gif");
/* harmony import */ var _steps_name_play_sound_fr_png__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./steps/name-play-sound.fr.png */ "./src/lib/libraries/decks/steps/name-play-sound.fr.png");
/* harmony import */ var _steps_name_pick_letter2_LTR_gif__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./steps/name-pick-letter2.LTR.gif */ "./src/lib/libraries/decks/steps/name-pick-letter2.LTR.gif");
/* harmony import */ var _steps_name_change_color_fr_png__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./steps/name-change-color.fr.png */ "./src/lib/libraries/decks/steps/name-change-color.fr.png");
/* harmony import */ var _steps_name_spin_fr_png__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./steps/name-spin.fr.png */ "./src/lib/libraries/decks/steps/name-spin.fr.png");
/* harmony import */ var _steps_name_grow_fr_png__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./steps/name-grow.fr.png */ "./src/lib/libraries/decks/steps/name-grow.fr.png");
/* harmony import */ var _steps_music_pick_instrument_LTR_gif__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./steps/music-pick-instrument.LTR.gif */ "./src/lib/libraries/decks/steps/music-pick-instrument.LTR.gif");
/* harmony import */ var _steps_music_play_sound_fr_png__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./steps/music-play-sound.fr.png */ "./src/lib/libraries/decks/steps/music-play-sound.fr.png");
/* harmony import */ var _steps_music_make_song_fr_png__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./steps/music-make-song.fr.png */ "./src/lib/libraries/decks/steps/music-make-song.fr.png");
/* harmony import */ var _steps_music_make_beat_fr_png__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./steps/music-make-beat.fr.png */ "./src/lib/libraries/decks/steps/music-make-beat.fr.png");
/* harmony import */ var _steps_music_make_beatbox_fr_png__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./steps/music-make-beatbox.fr.png */ "./src/lib/libraries/decks/steps/music-make-beatbox.fr.png");
/* harmony import */ var _steps_chase_game_add_backdrop_LTR_gif__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./steps/chase-game-add-backdrop.LTR.gif */ "./src/lib/libraries/decks/steps/chase-game-add-backdrop.LTR.gif");
/* harmony import */ var _steps_chase_game_add_sprite1_LTR_gif__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./steps/chase-game-add-sprite1.LTR.gif */ "./src/lib/libraries/decks/steps/chase-game-add-sprite1.LTR.gif");
/* harmony import */ var _steps_chase_game_right_left_fr_png__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./steps/chase-game-right-left.fr.png */ "./src/lib/libraries/decks/steps/chase-game-right-left.fr.png");
/* harmony import */ var _steps_chase_game_up_down_fr_png__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./steps/chase-game-up-down.fr.png */ "./src/lib/libraries/decks/steps/chase-game-up-down.fr.png");
/* harmony import */ var _steps_chase_game_add_sprite2_LTR_gif__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./steps/chase-game-add-sprite2.LTR.gif */ "./src/lib/libraries/decks/steps/chase-game-add-sprite2.LTR.gif");
/* harmony import */ var _steps_chase_game_move_randomly_fr_png__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./steps/chase-game-move-randomly.fr.png */ "./src/lib/libraries/decks/steps/chase-game-move-randomly.fr.png");
/* harmony import */ var _steps_chase_game_play_sound_fr_png__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./steps/chase-game-play-sound.fr.png */ "./src/lib/libraries/decks/steps/chase-game-play-sound.fr.png");
/* harmony import */ var _steps_chase_game_change_score_fr_png__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./steps/chase-game-change-score.fr.png */ "./src/lib/libraries/decks/steps/chase-game-change-score.fr.png");
/* harmony import */ var _steps_pop_game_pick_sprite_LTR_gif__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./steps/pop-game-pick-sprite.LTR.gif */ "./src/lib/libraries/decks/steps/pop-game-pick-sprite.LTR.gif");
/* harmony import */ var _steps_pop_game_play_sound_fr_png__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./steps/pop-game-play-sound.fr.png */ "./src/lib/libraries/decks/steps/pop-game-play-sound.fr.png");
/* harmony import */ var _steps_pop_game_change_score_fr_png__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./steps/pop-game-change-score.fr.png */ "./src/lib/libraries/decks/steps/pop-game-change-score.fr.png");
/* harmony import */ var _steps_pop_game_random_position_fr_png__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./steps/pop-game-random-position.fr.png */ "./src/lib/libraries/decks/steps/pop-game-random-position.fr.png");
/* harmony import */ var _steps_pop_game_change_color_fr_png__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./steps/pop-game-change-color.fr.png */ "./src/lib/libraries/decks/steps/pop-game-change-color.fr.png");
/* harmony import */ var _steps_pop_game_reset_score_fr_png__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./steps/pop-game-reset-score.fr.png */ "./src/lib/libraries/decks/steps/pop-game-reset-score.fr.png");
/* harmony import */ var _steps_animate_char_pick_sprite_LTR_gif__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./steps/animate-char-pick-sprite.LTR.gif */ "./src/lib/libraries/decks/steps/animate-char-pick-sprite.LTR.gif");
/* harmony import */ var _steps_animate_char_say_something_fr_png__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ./steps/animate-char-say-something.fr.png */ "./src/lib/libraries/decks/steps/animate-char-say-something.fr.png");
/* harmony import */ var _steps_animate_char_add_sound_fr_png__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ./steps/animate-char-add-sound.fr.png */ "./src/lib/libraries/decks/steps/animate-char-add-sound.fr.png");
/* harmony import */ var _steps_animate_char_talk_fr_png__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ./steps/animate-char-talk.fr.png */ "./src/lib/libraries/decks/steps/animate-char-talk.fr.png");
/* harmony import */ var _steps_animate_char_move_fr_png__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ./steps/animate-char-move.fr.png */ "./src/lib/libraries/decks/steps/animate-char-move.fr.png");
/* harmony import */ var _steps_animate_char_jump_fr_png__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ./steps/animate-char-jump.fr.png */ "./src/lib/libraries/decks/steps/animate-char-jump.fr.png");
/* harmony import */ var _steps_animate_char_change_color_fr_png__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! ./steps/animate-char-change-color.fr.png */ "./src/lib/libraries/decks/steps/animate-char-change-color.fr.png");
/* harmony import */ var _steps_story_pick_backdrop_LTR_gif__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! ./steps/story-pick-backdrop.LTR.gif */ "./src/lib/libraries/decks/steps/story-pick-backdrop.LTR.gif");
/* harmony import */ var _steps_story_pick_sprite_LTR_gif__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! ./steps/story-pick-sprite.LTR.gif */ "./src/lib/libraries/decks/steps/story-pick-sprite.LTR.gif");
/* harmony import */ var _steps_story_say_something_fr_png__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! ./steps/story-say-something.fr.png */ "./src/lib/libraries/decks/steps/story-say-something.fr.png");
/* harmony import */ var _steps_story_pick_sprite2_LTR_gif__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! ./steps/story-pick-sprite2.LTR.gif */ "./src/lib/libraries/decks/steps/story-pick-sprite2.LTR.gif");
/* harmony import */ var _steps_story_flip_fr_gif__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! ./steps/story-flip.fr.gif */ "./src/lib/libraries/decks/steps/story-flip.fr.gif");
/* harmony import */ var _steps_story_conversation_fr_png__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! ./steps/story-conversation.fr.png */ "./src/lib/libraries/decks/steps/story-conversation.fr.png");
/* harmony import */ var _steps_story_pick_backdrop2_LTR_gif__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(/*! ./steps/story-pick-backdrop2.LTR.gif */ "./src/lib/libraries/decks/steps/story-pick-backdrop2.LTR.gif");
/* harmony import */ var _steps_story_switch_backdrop_fr_png__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(/*! ./steps/story-switch-backdrop.fr.png */ "./src/lib/libraries/decks/steps/story-switch-backdrop.fr.png");
/* harmony import */ var _steps_story_hide_character_fr_png__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(/*! ./steps/story-hide-character.fr.png */ "./src/lib/libraries/decks/steps/story-hide-character.fr.png");
/* harmony import */ var _steps_story_show_character_fr_png__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(/*! ./steps/story-show-character.fr.png */ "./src/lib/libraries/decks/steps/story-show-character.fr.png");
/* harmony import */ var _steps_video_add_extension_fr_gif__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(/*! ./steps/video-add-extension.fr.gif */ "./src/lib/libraries/decks/steps/video-add-extension.fr.gif");
/* harmony import */ var _steps_video_pet_fr_png__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__(/*! ./steps/video-pet.fr.png */ "./src/lib/libraries/decks/steps/video-pet.fr.png");
/* harmony import */ var _steps_video_animate_fr_png__WEBPACK_IMPORTED_MODULE_66__ = __webpack_require__(/*! ./steps/video-animate.fr.png */ "./src/lib/libraries/decks/steps/video-animate.fr.png");
/* harmony import */ var _steps_video_pop_fr_png__WEBPACK_IMPORTED_MODULE_67__ = __webpack_require__(/*! ./steps/video-pop.fr.png */ "./src/lib/libraries/decks/steps/video-pop.fr.png");
/* harmony import */ var _steps_fly_choose_backdrop_LTR_gif__WEBPACK_IMPORTED_MODULE_68__ = __webpack_require__(/*! ./steps/fly-choose-backdrop.LTR.gif */ "./src/lib/libraries/decks/steps/fly-choose-backdrop.LTR.gif");
/* harmony import */ var _steps_fly_choose_character_LTR_png__WEBPACK_IMPORTED_MODULE_69__ = __webpack_require__(/*! ./steps/fly-choose-character.LTR.png */ "./src/lib/libraries/decks/steps/fly-choose-character.LTR.png");
/* harmony import */ var _steps_fly_say_something_fr_png__WEBPACK_IMPORTED_MODULE_70__ = __webpack_require__(/*! ./steps/fly-say-something.fr.png */ "./src/lib/libraries/decks/steps/fly-say-something.fr.png");
/* harmony import */ var _steps_fly_make_interactive_fr_png__WEBPACK_IMPORTED_MODULE_71__ = __webpack_require__(/*! ./steps/fly-make-interactive.fr.png */ "./src/lib/libraries/decks/steps/fly-make-interactive.fr.png");
/* harmony import */ var _steps_fly_object_to_collect_LTR_png__WEBPACK_IMPORTED_MODULE_72__ = __webpack_require__(/*! ./steps/fly-object-to-collect.LTR.png */ "./src/lib/libraries/decks/steps/fly-object-to-collect.LTR.png");
/* harmony import */ var _steps_fly_flying_heart_fr_png__WEBPACK_IMPORTED_MODULE_73__ = __webpack_require__(/*! ./steps/fly-flying-heart.fr.png */ "./src/lib/libraries/decks/steps/fly-flying-heart.fr.png");
/* harmony import */ var _steps_fly_select_flyer_LTR_png__WEBPACK_IMPORTED_MODULE_74__ = __webpack_require__(/*! ./steps/fly-select-flyer.LTR.png */ "./src/lib/libraries/decks/steps/fly-select-flyer.LTR.png");
/* harmony import */ var _steps_fly_keep_score_fr_png__WEBPACK_IMPORTED_MODULE_75__ = __webpack_require__(/*! ./steps/fly-keep-score.fr.png */ "./src/lib/libraries/decks/steps/fly-keep-score.fr.png");
/* harmony import */ var _steps_fly_choose_scenery_LTR_gif__WEBPACK_IMPORTED_MODULE_76__ = __webpack_require__(/*! ./steps/fly-choose-scenery.LTR.gif */ "./src/lib/libraries/decks/steps/fly-choose-scenery.LTR.gif");
/* harmony import */ var _steps_fly_move_scenery_fr_png__WEBPACK_IMPORTED_MODULE_77__ = __webpack_require__(/*! ./steps/fly-move-scenery.fr.png */ "./src/lib/libraries/decks/steps/fly-move-scenery.fr.png");
/* harmony import */ var _steps_fly_switch_costume_fr_png__WEBPACK_IMPORTED_MODULE_78__ = __webpack_require__(/*! ./steps/fly-switch-costume.fr.png */ "./src/lib/libraries/decks/steps/fly-switch-costume.fr.png");
/* harmony import */ var _steps_pong_add_backdrop_LTR_png__WEBPACK_IMPORTED_MODULE_79__ = __webpack_require__(/*! ./steps/pong-add-backdrop.LTR.png */ "./src/lib/libraries/decks/steps/pong-add-backdrop.LTR.png");
/* harmony import */ var _steps_pong_add_ball_sprite_LTR_png__WEBPACK_IMPORTED_MODULE_80__ = __webpack_require__(/*! ./steps/pong-add-ball-sprite.LTR.png */ "./src/lib/libraries/decks/steps/pong-add-ball-sprite.LTR.png");
/* harmony import */ var _steps_pong_bounce_around_fr_png__WEBPACK_IMPORTED_MODULE_81__ = __webpack_require__(/*! ./steps/pong-bounce-around.fr.png */ "./src/lib/libraries/decks/steps/pong-bounce-around.fr.png");
/* harmony import */ var _steps_pong_add_a_paddle_LTR_gif__WEBPACK_IMPORTED_MODULE_82__ = __webpack_require__(/*! ./steps/pong-add-a-paddle.LTR.gif */ "./src/lib/libraries/decks/steps/pong-add-a-paddle.LTR.gif");
/* harmony import */ var _steps_pong_move_the_paddle_fr_png__WEBPACK_IMPORTED_MODULE_83__ = __webpack_require__(/*! ./steps/pong-move-the-paddle.fr.png */ "./src/lib/libraries/decks/steps/pong-move-the-paddle.fr.png");
/* harmony import */ var _steps_pong_select_ball_LTR_png__WEBPACK_IMPORTED_MODULE_84__ = __webpack_require__(/*! ./steps/pong-select-ball.LTR.png */ "./src/lib/libraries/decks/steps/pong-select-ball.LTR.png");
/* harmony import */ var _steps_pong_add_code_to_ball_fr_png__WEBPACK_IMPORTED_MODULE_85__ = __webpack_require__(/*! ./steps/pong-add-code-to-ball.fr.png */ "./src/lib/libraries/decks/steps/pong-add-code-to-ball.fr.png");
/* harmony import */ var _steps_pong_choose_score_fr_png__WEBPACK_IMPORTED_MODULE_86__ = __webpack_require__(/*! ./steps/pong-choose-score.fr.png */ "./src/lib/libraries/decks/steps/pong-choose-score.fr.png");
/* harmony import */ var _steps_pong_insert_change_score_fr_png__WEBPACK_IMPORTED_MODULE_87__ = __webpack_require__(/*! ./steps/pong-insert-change-score.fr.png */ "./src/lib/libraries/decks/steps/pong-insert-change-score.fr.png");
/* harmony import */ var _steps_pong_reset_score_fr_png__WEBPACK_IMPORTED_MODULE_88__ = __webpack_require__(/*! ./steps/pong-reset-score.fr.png */ "./src/lib/libraries/decks/steps/pong-reset-score.fr.png");
/* harmony import */ var _steps_pong_add_line_LTR_gif__WEBPACK_IMPORTED_MODULE_89__ = __webpack_require__(/*! ./steps/pong-add-line.LTR.gif */ "./src/lib/libraries/decks/steps/pong-add-line.LTR.gif");
/* harmony import */ var _steps_pong_game_over_fr_png__WEBPACK_IMPORTED_MODULE_90__ = __webpack_require__(/*! ./steps/pong-game-over.fr.png */ "./src/lib/libraries/decks/steps/pong-game-over.fr.png");
/* harmony import */ var _steps_imagine_type_what_you_want_fr_png__WEBPACK_IMPORTED_MODULE_91__ = __webpack_require__(/*! ./steps/imagine-type-what-you-want.fr.png */ "./src/lib/libraries/decks/steps/imagine-type-what-you-want.fr.png");
/* harmony import */ var _steps_imagine_click_green_flag_fr_png__WEBPACK_IMPORTED_MODULE_92__ = __webpack_require__(/*! ./steps/imagine-click-green-flag.fr.png */ "./src/lib/libraries/decks/steps/imagine-click-green-flag.fr.png");
/* harmony import */ var _steps_imagine_choose_backdrop_LTR_png__WEBPACK_IMPORTED_MODULE_93__ = __webpack_require__(/*! ./steps/imagine-choose-backdrop.LTR.png */ "./src/lib/libraries/decks/steps/imagine-choose-backdrop.LTR.png");
/* harmony import */ var _steps_imagine_choose_any_sprite_LTR_png__WEBPACK_IMPORTED_MODULE_94__ = __webpack_require__(/*! ./steps/imagine-choose-any-sprite.LTR.png */ "./src/lib/libraries/decks/steps/imagine-choose-any-sprite.LTR.png");
/* harmony import */ var _steps_imagine_fly_around_fr_png__WEBPACK_IMPORTED_MODULE_95__ = __webpack_require__(/*! ./steps/imagine-fly-around.fr.png */ "./src/lib/libraries/decks/steps/imagine-fly-around.fr.png");
/* harmony import */ var _steps_imagine_choose_another_sprite_LTR_png__WEBPACK_IMPORTED_MODULE_96__ = __webpack_require__(/*! ./steps/imagine-choose-another-sprite.LTR.png */ "./src/lib/libraries/decks/steps/imagine-choose-another-sprite.LTR.png");
/* harmony import */ var _steps_imagine_left_right_fr_png__WEBPACK_IMPORTED_MODULE_97__ = __webpack_require__(/*! ./steps/imagine-left-right.fr.png */ "./src/lib/libraries/decks/steps/imagine-left-right.fr.png");
/* harmony import */ var _steps_imagine_up_down_fr_png__WEBPACK_IMPORTED_MODULE_98__ = __webpack_require__(/*! ./steps/imagine-up-down.fr.png */ "./src/lib/libraries/decks/steps/imagine-up-down.fr.png");
/* harmony import */ var _steps_imagine_change_costumes_fr_png__WEBPACK_IMPORTED_MODULE_99__ = __webpack_require__(/*! ./steps/imagine-change-costumes.fr.png */ "./src/lib/libraries/decks/steps/imagine-change-costumes.fr.png");
/* harmony import */ var _steps_imagine_glide_to_point_fr_png__WEBPACK_IMPORTED_MODULE_100__ = __webpack_require__(/*! ./steps/imagine-glide-to-point.fr.png */ "./src/lib/libraries/decks/steps/imagine-glide-to-point.fr.png");
/* harmony import */ var _steps_imagine_grow_shrink_fr_png__WEBPACK_IMPORTED_MODULE_101__ = __webpack_require__(/*! ./steps/imagine-grow-shrink.fr.png */ "./src/lib/libraries/decks/steps/imagine-grow-shrink.fr.png");
/* harmony import */ var _steps_imagine_choose_another_backdrop_LTR_png__WEBPACK_IMPORTED_MODULE_102__ = __webpack_require__(/*! ./steps/imagine-choose-another-backdrop.LTR.png */ "./src/lib/libraries/decks/steps/imagine-choose-another-backdrop.LTR.png");
/* harmony import */ var _steps_imagine_switch_backdrops_fr_png__WEBPACK_IMPORTED_MODULE_103__ = __webpack_require__(/*! ./steps/imagine-switch-backdrops.fr.png */ "./src/lib/libraries/decks/steps/imagine-switch-backdrops.fr.png");
/* harmony import */ var _steps_imagine_record_a_sound_fr_gif__WEBPACK_IMPORTED_MODULE_104__ = __webpack_require__(/*! ./steps/imagine-record-a-sound.fr.gif */ "./src/lib/libraries/decks/steps/imagine-record-a-sound.fr.gif");
/* harmony import */ var _steps_imagine_choose_sound_fr_png__WEBPACK_IMPORTED_MODULE_105__ = __webpack_require__(/*! ./steps/imagine-choose-sound.fr.png */ "./src/lib/libraries/decks/steps/imagine-choose-sound.fr.png");
/* harmony import */ var _steps_add_backdrop_LTR_png__WEBPACK_IMPORTED_MODULE_106__ = __webpack_require__(/*! ./steps/add-backdrop.LTR.png */ "./src/lib/libraries/decks/steps/add-backdrop.LTR.png");
/* harmony import */ var _steps_add_effects_fr_png__WEBPACK_IMPORTED_MODULE_107__ = __webpack_require__(/*! ./steps/add-effects.fr.png */ "./src/lib/libraries/decks/steps/add-effects.fr.png");
/* harmony import */ var _steps_hide_show_fr_png__WEBPACK_IMPORTED_MODULE_108__ = __webpack_require__(/*! ./steps/hide-show.fr.png */ "./src/lib/libraries/decks/steps/hide-show.fr.png");
/* harmony import */ var _steps_switch_costumes_fr_png__WEBPACK_IMPORTED_MODULE_109__ = __webpack_require__(/*! ./steps/switch-costumes.fr.png */ "./src/lib/libraries/decks/steps/switch-costumes.fr.png");
/* harmony import */ var _steps_change_size_fr_png__WEBPACK_IMPORTED_MODULE_110__ = __webpack_require__(/*! ./steps/change-size.fr.png */ "./src/lib/libraries/decks/steps/change-size.fr.png");
/* harmony import */ var _steps_spin_turn_fr_png__WEBPACK_IMPORTED_MODULE_111__ = __webpack_require__(/*! ./steps/spin-turn.fr.png */ "./src/lib/libraries/decks/steps/spin-turn.fr.png");
/* harmony import */ var _steps_spin_point_in_direction_fr_png__WEBPACK_IMPORTED_MODULE_112__ = __webpack_require__(/*! ./steps/spin-point-in-direction.fr.png */ "./src/lib/libraries/decks/steps/spin-point-in-direction.fr.png");
/* harmony import */ var _steps_record_a_sound_sounds_tab_fr_png__WEBPACK_IMPORTED_MODULE_113__ = __webpack_require__(/*! ./steps/record-a-sound-sounds-tab.fr.png */ "./src/lib/libraries/decks/steps/record-a-sound-sounds-tab.fr.png");
/* harmony import */ var _steps_record_a_sound_click_record_fr_png__WEBPACK_IMPORTED_MODULE_114__ = __webpack_require__(/*! ./steps/record-a-sound-click-record.fr.png */ "./src/lib/libraries/decks/steps/record-a-sound-click-record.fr.png");
/* harmony import */ var _steps_record_a_sound_press_record_button_fr_png__WEBPACK_IMPORTED_MODULE_115__ = __webpack_require__(/*! ./steps/record-a-sound-press-record-button.fr.png */ "./src/lib/libraries/decks/steps/record-a-sound-press-record-button.fr.png");
/* harmony import */ var _steps_record_a_sound_choose_sound_fr_png__WEBPACK_IMPORTED_MODULE_116__ = __webpack_require__(/*! ./steps/record-a-sound-choose-sound.fr.png */ "./src/lib/libraries/decks/steps/record-a-sound-choose-sound.fr.png");
/* harmony import */ var _steps_record_a_sound_play_your_sound_fr_png__WEBPACK_IMPORTED_MODULE_117__ = __webpack_require__(/*! ./steps/record-a-sound-play-your-sound.fr.png */ "./src/lib/libraries/decks/steps/record-a-sound-play-your-sound.fr.png");
/* harmony import */ var _steps_move_arrow_keys_left_right_fr_png__WEBPACK_IMPORTED_MODULE_118__ = __webpack_require__(/*! ./steps/move-arrow-keys-left-right.fr.png */ "./src/lib/libraries/decks/steps/move-arrow-keys-left-right.fr.png");
/* harmony import */ var _steps_move_arrow_keys_up_down_fr_png__WEBPACK_IMPORTED_MODULE_119__ = __webpack_require__(/*! ./steps/move-arrow-keys-up-down.fr.png */ "./src/lib/libraries/decks/steps/move-arrow-keys-up-down.fr.png");
/* harmony import */ var _steps_glide_around_back_and_forth_fr_png__WEBPACK_IMPORTED_MODULE_120__ = __webpack_require__(/*! ./steps/glide-around-back-and-forth.fr.png */ "./src/lib/libraries/decks/steps/glide-around-back-and-forth.fr.png");
/* harmony import */ var _steps_glide_around_point_fr_png__WEBPACK_IMPORTED_MODULE_121__ = __webpack_require__(/*! ./steps/glide-around-point.fr.png */ "./src/lib/libraries/decks/steps/glide-around-point.fr.png");
/* harmony import */ var _steps_code_cartoon_01_say_something_fr_png__WEBPACK_IMPORTED_MODULE_122__ = __webpack_require__(/*! ./steps/code-cartoon-01-say-something.fr.png */ "./src/lib/libraries/decks/steps/code-cartoon-01-say-something.fr.png");
/* harmony import */ var _steps_code_cartoon_02_animate_fr_png__WEBPACK_IMPORTED_MODULE_123__ = __webpack_require__(/*! ./steps/code-cartoon-02-animate.fr.png */ "./src/lib/libraries/decks/steps/code-cartoon-02-animate.fr.png");
/* harmony import */ var _steps_code_cartoon_03_select_different_character_LTR_png__WEBPACK_IMPORTED_MODULE_124__ = __webpack_require__(/*! ./steps/code-cartoon-03-select-different-character.LTR.png */ "./src/lib/libraries/decks/steps/code-cartoon-03-select-different-character.LTR.png");
/* harmony import */ var _steps_code_cartoon_04_use_minus_sign_fr_png__WEBPACK_IMPORTED_MODULE_125__ = __webpack_require__(/*! ./steps/code-cartoon-04-use-minus-sign.fr.png */ "./src/lib/libraries/decks/steps/code-cartoon-04-use-minus-sign.fr.png");
/* harmony import */ var _steps_code_cartoon_05_grow_shrink_fr_png__WEBPACK_IMPORTED_MODULE_126__ = __webpack_require__(/*! ./steps/code-cartoon-05-grow-shrink.fr.png */ "./src/lib/libraries/decks/steps/code-cartoon-05-grow-shrink.fr.png");
/* harmony import */ var _steps_code_cartoon_06_select_another_different_character_LTR_png__WEBPACK_IMPORTED_MODULE_127__ = __webpack_require__(/*! ./steps/code-cartoon-06-select-another-different-character.LTR.png */ "./src/lib/libraries/decks/steps/code-cartoon-06-select-another-different-character.LTR.png");
/* harmony import */ var _steps_code_cartoon_07_jump_fr_png__WEBPACK_IMPORTED_MODULE_128__ = __webpack_require__(/*! ./steps/code-cartoon-07-jump.fr.png */ "./src/lib/libraries/decks/steps/code-cartoon-07-jump.fr.png");
/* harmony import */ var _steps_code_cartoon_08_change_scenes_fr_png__WEBPACK_IMPORTED_MODULE_129__ = __webpack_require__(/*! ./steps/code-cartoon-08-change-scenes.fr.png */ "./src/lib/libraries/decks/steps/code-cartoon-08-change-scenes.fr.png");
/* harmony import */ var _steps_code_cartoon_09_glide_around_fr_png__WEBPACK_IMPORTED_MODULE_130__ = __webpack_require__(/*! ./steps/code-cartoon-09-glide-around.fr.png */ "./src/lib/libraries/decks/steps/code-cartoon-09-glide-around.fr.png");
/* harmony import */ var _steps_code_cartoon_10_change_costumes_fr_png__WEBPACK_IMPORTED_MODULE_131__ = __webpack_require__(/*! ./steps/code-cartoon-10-change-costumes.fr.png */ "./src/lib/libraries/decks/steps/code-cartoon-10-change-costumes.fr.png");
/* harmony import */ var _steps_code_cartoon_11_choose_more_characters_LTR_png__WEBPACK_IMPORTED_MODULE_132__ = __webpack_require__(/*! ./steps/code-cartoon-11-choose-more-characters.LTR.png */ "./src/lib/libraries/decks/steps/code-cartoon-11-choose-more-characters.LTR.png");
/* harmony import */ var _steps_talking_2_choose_sprite_LTR_png__WEBPACK_IMPORTED_MODULE_133__ = __webpack_require__(/*! ./steps/talking-2-choose-sprite.LTR.png */ "./src/lib/libraries/decks/steps/talking-2-choose-sprite.LTR.png");
/* harmony import */ var _steps_talking_3_say_something_fr_png__WEBPACK_IMPORTED_MODULE_134__ = __webpack_require__(/*! ./steps/talking-3-say-something.fr.png */ "./src/lib/libraries/decks/steps/talking-3-say-something.fr.png");
/* harmony import */ var _steps_talking_4_choose_backdrop_LTR_png__WEBPACK_IMPORTED_MODULE_135__ = __webpack_require__(/*! ./steps/talking-4-choose-backdrop.LTR.png */ "./src/lib/libraries/decks/steps/talking-4-choose-backdrop.LTR.png");
/* harmony import */ var _steps_talking_5_switch_backdrop_fr_png__WEBPACK_IMPORTED_MODULE_136__ = __webpack_require__(/*! ./steps/talking-5-switch-backdrop.fr.png */ "./src/lib/libraries/decks/steps/talking-5-switch-backdrop.fr.png");
/* harmony import */ var _steps_talking_6_choose_another_sprite_LTR_png__WEBPACK_IMPORTED_MODULE_137__ = __webpack_require__(/*! ./steps/talking-6-choose-another-sprite.LTR.png */ "./src/lib/libraries/decks/steps/talking-6-choose-another-sprite.LTR.png");
/* harmony import */ var _steps_talking_7_move_around_fr_png__WEBPACK_IMPORTED_MODULE_138__ = __webpack_require__(/*! ./steps/talking-7-move-around.fr.png */ "./src/lib/libraries/decks/steps/talking-7-move-around.fr.png");
/* harmony import */ var _steps_talking_8_choose_another_backdrop_LTR_png__WEBPACK_IMPORTED_MODULE_139__ = __webpack_require__(/*! ./steps/talking-8-choose-another-backdrop.LTR.png */ "./src/lib/libraries/decks/steps/talking-8-choose-another-backdrop.LTR.png");
/* harmony import */ var _steps_talking_9_animate_fr_png__WEBPACK_IMPORTED_MODULE_140__ = __webpack_require__(/*! ./steps/talking-9-animate.fr.png */ "./src/lib/libraries/decks/steps/talking-9-animate.fr.png");
/* harmony import */ var _steps_talking_10_choose_third_backdrop_LTR_png__WEBPACK_IMPORTED_MODULE_141__ = __webpack_require__(/*! ./steps/talking-10-choose-third-backdrop.LTR.png */ "./src/lib/libraries/decks/steps/talking-10-choose-third-backdrop.LTR.png");
/* harmony import */ var _steps_talking_11_choose_sound_fr_gif__WEBPACK_IMPORTED_MODULE_142__ = __webpack_require__(/*! ./steps/talking-11-choose-sound.fr.gif */ "./src/lib/libraries/decks/steps/talking-11-choose-sound.fr.gif");
/* harmony import */ var _steps_talking_12_dance_moves_fr_png__WEBPACK_IMPORTED_MODULE_143__ = __webpack_require__(/*! ./steps/talking-12-dance-moves.fr.png */ "./src/lib/libraries/decks/steps/talking-12-dance-moves.fr.png");
/* harmony import */ var _steps_talking_13_ask_and_answer_fr_png__WEBPACK_IMPORTED_MODULE_144__ = __webpack_require__(/*! ./steps/talking-13-ask-and-answer.fr.png */ "./src/lib/libraries/decks/steps/talking-13-ask-and-answer.fr.png");
// Intro




// Text to Speech











// Cartoon Network









// Add sprite


// Animate a name







// Make Music






// Chase-Game










// Clicker-Game (Pop Game)








// Animate A Character









// Tell A Story











// Video Sensing





// Make it Fly













// Pong














// Imagine a World
















// Add a Backdrop


// Add Effects


// Hide and Show


// Switch Costumes


// Change Size


// Spin



// Record a Sound






// Use Arrow Keys



// Glide Around



// Code a Cartoon












// Talking Tales













const frImages = {
  // Intro
  introMove: _steps_intro_1_move_fr_gif__WEBPACK_IMPORTED_MODULE_0__,
  introSay: _steps_intro_2_say_fr_gif__WEBPACK_IMPORTED_MODULE_1__,
  introGreenFlag: _steps_intro_3_green_flag_fr_gif__WEBPACK_IMPORTED_MODULE_2__,
  // Text to Speech
  speechAddExtension: _steps_speech_add_extension_fr_gif__WEBPACK_IMPORTED_MODULE_3__,
  speechSaySomething: _steps_speech_say_something_fr_png__WEBPACK_IMPORTED_MODULE_4__,
  speechSetVoice: _steps_speech_set_voice_fr_png__WEBPACK_IMPORTED_MODULE_5__,
  speechMoveAround: _steps_speech_move_around_fr_png__WEBPACK_IMPORTED_MODULE_6__,
  speechAddBackdrop: _steps_pick_backdrop_LTR_gif__WEBPACK_IMPORTED_MODULE_7__,
  speechAddSprite: _steps_speech_add_sprite_LTR_gif__WEBPACK_IMPORTED_MODULE_8__,
  speechSong: _steps_speech_song_fr_png__WEBPACK_IMPORTED_MODULE_9__,
  speechChangeColor: _steps_speech_change_color_fr_png__WEBPACK_IMPORTED_MODULE_10__,
  speechSpin: _steps_speech_spin_fr_png__WEBPACK_IMPORTED_MODULE_11__,
  speechGrowShrink: _steps_speech_grow_shrink_fr_png__WEBPACK_IMPORTED_MODULE_12__,
  // Cartoon Network
  cnShowCharacter: _steps_cn_show_character_LTR_gif__WEBPACK_IMPORTED_MODULE_13__,
  cnSay: _steps_cn_say_fr_png__WEBPACK_IMPORTED_MODULE_14__,
  cnGlide: _steps_cn_glide_fr_png__WEBPACK_IMPORTED_MODULE_15__,
  cnPickSprite: _steps_cn_pick_sprite_LTR_gif__WEBPACK_IMPORTED_MODULE_16__,
  cnCollect: _steps_cn_collect_fr_png__WEBPACK_IMPORTED_MODULE_17__,
  cnVariable: _steps_add_variable_fr_gif__WEBPACK_IMPORTED_MODULE_18__,
  cnScore: _steps_cn_score_fr_png__WEBPACK_IMPORTED_MODULE_19__,
  cnBackdrop: _steps_cn_backdrop_fr_png__WEBPACK_IMPORTED_MODULE_20__,
  // Add sprite
  addSprite: _steps_add_sprite_LTR_gif__WEBPACK_IMPORTED_MODULE_21__,
  // Animate a name
  namePickLetter: _steps_name_pick_letter_LTR_gif__WEBPACK_IMPORTED_MODULE_22__,
  namePlaySound: _steps_name_play_sound_fr_png__WEBPACK_IMPORTED_MODULE_23__,
  namePickLetter2: _steps_name_pick_letter2_LTR_gif__WEBPACK_IMPORTED_MODULE_24__,
  nameChangeColor: _steps_name_change_color_fr_png__WEBPACK_IMPORTED_MODULE_25__,
  nameSpin: _steps_name_spin_fr_png__WEBPACK_IMPORTED_MODULE_26__,
  nameGrow: _steps_name_grow_fr_png__WEBPACK_IMPORTED_MODULE_27__,
  // Make-Music
  musicPickInstrument: _steps_music_pick_instrument_LTR_gif__WEBPACK_IMPORTED_MODULE_28__,
  musicPlaySound: _steps_music_play_sound_fr_png__WEBPACK_IMPORTED_MODULE_29__,
  musicMakeSong: _steps_music_make_song_fr_png__WEBPACK_IMPORTED_MODULE_30__,
  musicMakeBeat: _steps_music_make_beat_fr_png__WEBPACK_IMPORTED_MODULE_31__,
  musicMakeBeatbox: _steps_music_make_beatbox_fr_png__WEBPACK_IMPORTED_MODULE_32__,
  // Chase-Game
  chaseGameAddBackdrop: _steps_chase_game_add_backdrop_LTR_gif__WEBPACK_IMPORTED_MODULE_33__,
  chaseGameAddSprite1: _steps_chase_game_add_sprite1_LTR_gif__WEBPACK_IMPORTED_MODULE_34__,
  chaseGameRightLeft: _steps_chase_game_right_left_fr_png__WEBPACK_IMPORTED_MODULE_35__,
  chaseGameUpDown: _steps_chase_game_up_down_fr_png__WEBPACK_IMPORTED_MODULE_36__,
  chaseGameAddSprite2: _steps_chase_game_add_sprite2_LTR_gif__WEBPACK_IMPORTED_MODULE_37__,
  chaseGameMoveRandomly: _steps_chase_game_move_randomly_fr_png__WEBPACK_IMPORTED_MODULE_38__,
  chaseGamePlaySound: _steps_chase_game_play_sound_fr_png__WEBPACK_IMPORTED_MODULE_39__,
  chaseGameAddVariable: _steps_add_variable_fr_gif__WEBPACK_IMPORTED_MODULE_18__,
  chaseGameChangeScore: _steps_chase_game_change_score_fr_png__WEBPACK_IMPORTED_MODULE_40__,
  // Make-A-Pop/Clicker Game
  popGamePickSprite: _steps_pop_game_pick_sprite_LTR_gif__WEBPACK_IMPORTED_MODULE_41__,
  popGamePlaySound: _steps_pop_game_play_sound_fr_png__WEBPACK_IMPORTED_MODULE_42__,
  popGameAddScore: _steps_add_variable_fr_gif__WEBPACK_IMPORTED_MODULE_18__,
  popGameChangeScore: _steps_pop_game_change_score_fr_png__WEBPACK_IMPORTED_MODULE_43__,
  popGameRandomPosition: _steps_pop_game_random_position_fr_png__WEBPACK_IMPORTED_MODULE_44__,
  popGameChangeColor: _steps_pop_game_change_color_fr_png__WEBPACK_IMPORTED_MODULE_45__,
  popGameResetScore: _steps_pop_game_reset_score_fr_png__WEBPACK_IMPORTED_MODULE_46__,
  // Animate A Character
  animateCharPickBackdrop: _steps_pick_backdrop_LTR_gif__WEBPACK_IMPORTED_MODULE_7__,
  animateCharPickSprite: _steps_animate_char_pick_sprite_LTR_gif__WEBPACK_IMPORTED_MODULE_47__,
  animateCharSaySomething: _steps_animate_char_say_something_fr_png__WEBPACK_IMPORTED_MODULE_48__,
  animateCharAddSound: _steps_animate_char_add_sound_fr_png__WEBPACK_IMPORTED_MODULE_49__,
  animateCharTalk: _steps_animate_char_talk_fr_png__WEBPACK_IMPORTED_MODULE_50__,
  animateCharMove: _steps_animate_char_move_fr_png__WEBPACK_IMPORTED_MODULE_51__,
  animateCharJump: _steps_animate_char_jump_fr_png__WEBPACK_IMPORTED_MODULE_52__,
  animateCharChangeColor: _steps_animate_char_change_color_fr_png__WEBPACK_IMPORTED_MODULE_53__,
  // Tell A Story
  storyPickBackdrop: _steps_story_pick_backdrop_LTR_gif__WEBPACK_IMPORTED_MODULE_54__,
  storyPickSprite: _steps_story_pick_sprite_LTR_gif__WEBPACK_IMPORTED_MODULE_55__,
  storySaySomething: _steps_story_say_something_fr_png__WEBPACK_IMPORTED_MODULE_56__,
  storyPickSprite2: _steps_story_pick_sprite2_LTR_gif__WEBPACK_IMPORTED_MODULE_57__,
  storyFlip: _steps_story_flip_fr_gif__WEBPACK_IMPORTED_MODULE_58__,
  storyConversation: _steps_story_conversation_fr_png__WEBPACK_IMPORTED_MODULE_59__,
  storyPickBackdrop2: _steps_story_pick_backdrop2_LTR_gif__WEBPACK_IMPORTED_MODULE_60__,
  storySwitchBackdrop: _steps_story_switch_backdrop_fr_png__WEBPACK_IMPORTED_MODULE_61__,
  storyHideCharacter: _steps_story_hide_character_fr_png__WEBPACK_IMPORTED_MODULE_62__,
  storyShowCharacter: _steps_story_show_character_fr_png__WEBPACK_IMPORTED_MODULE_63__,
  // Video Sensing
  videoAddExtension: _steps_video_add_extension_fr_gif__WEBPACK_IMPORTED_MODULE_64__,
  videoPet: _steps_video_pet_fr_png__WEBPACK_IMPORTED_MODULE_65__,
  videoAnimate: _steps_video_animate_fr_png__WEBPACK_IMPORTED_MODULE_66__,
  videoPop: _steps_video_pop_fr_png__WEBPACK_IMPORTED_MODULE_67__,
  // Make it Fly
  flyChooseBackdrop: _steps_fly_choose_backdrop_LTR_gif__WEBPACK_IMPORTED_MODULE_68__,
  flyChooseCharacter: _steps_fly_choose_character_LTR_png__WEBPACK_IMPORTED_MODULE_69__,
  flySaySomething: _steps_fly_say_something_fr_png__WEBPACK_IMPORTED_MODULE_70__,
  flyMoveArrows: _steps_fly_make_interactive_fr_png__WEBPACK_IMPORTED_MODULE_71__,
  flyChooseObject: _steps_fly_object_to_collect_LTR_png__WEBPACK_IMPORTED_MODULE_72__,
  flyFlyingObject: _steps_fly_flying_heart_fr_png__WEBPACK_IMPORTED_MODULE_73__,
  flySelectFlyingSprite: _steps_fly_select_flyer_LTR_png__WEBPACK_IMPORTED_MODULE_74__,
  flyAddScore: _steps_add_variable_fr_gif__WEBPACK_IMPORTED_MODULE_18__,
  flyKeepScore: _steps_fly_keep_score_fr_png__WEBPACK_IMPORTED_MODULE_75__,
  flyAddScenery: _steps_fly_choose_scenery_LTR_gif__WEBPACK_IMPORTED_MODULE_76__,
  flyMoveScenery: _steps_fly_move_scenery_fr_png__WEBPACK_IMPORTED_MODULE_77__,
  flySwitchLooks: _steps_fly_switch_costume_fr_png__WEBPACK_IMPORTED_MODULE_78__,
  // Pong
  pongAddBackdrop: _steps_pong_add_backdrop_LTR_png__WEBPACK_IMPORTED_MODULE_79__,
  pongAddBallSprite: _steps_pong_add_ball_sprite_LTR_png__WEBPACK_IMPORTED_MODULE_80__,
  pongBounceAround: _steps_pong_bounce_around_fr_png__WEBPACK_IMPORTED_MODULE_81__,
  pongAddPaddle: _steps_pong_add_a_paddle_LTR_gif__WEBPACK_IMPORTED_MODULE_82__,
  pongMoveThePaddle: _steps_pong_move_the_paddle_fr_png__WEBPACK_IMPORTED_MODULE_83__,
  pongSelectBallSprite: _steps_pong_select_ball_LTR_png__WEBPACK_IMPORTED_MODULE_84__,
  pongAddMoreCodeToBall: _steps_pong_add_code_to_ball_fr_png__WEBPACK_IMPORTED_MODULE_85__,
  pongAddAScore: _steps_add_variable_fr_gif__WEBPACK_IMPORTED_MODULE_18__,
  pongChooseScoreFromMenu: _steps_pong_choose_score_fr_png__WEBPACK_IMPORTED_MODULE_86__,
  pongInsertChangeScoreBlock: _steps_pong_insert_change_score_fr_png__WEBPACK_IMPORTED_MODULE_87__,
  pongResetScore: _steps_pong_reset_score_fr_png__WEBPACK_IMPORTED_MODULE_88__,
  pongAddLineSprite: _steps_pong_add_line_LTR_gif__WEBPACK_IMPORTED_MODULE_89__,
  pongGameOver: _steps_pong_game_over_fr_png__WEBPACK_IMPORTED_MODULE_90__,
  // Imagine a World
  imagineTypeWhatYouWant: _steps_imagine_type_what_you_want_fr_png__WEBPACK_IMPORTED_MODULE_91__,
  imagineClickGreenFlag: _steps_imagine_click_green_flag_fr_png__WEBPACK_IMPORTED_MODULE_92__,
  imagineChooseBackdrop: _steps_imagine_choose_backdrop_LTR_png__WEBPACK_IMPORTED_MODULE_93__,
  imagineChooseSprite: _steps_imagine_choose_any_sprite_LTR_png__WEBPACK_IMPORTED_MODULE_94__,
  imagineFlyAround: _steps_imagine_fly_around_fr_png__WEBPACK_IMPORTED_MODULE_95__,
  imagineChooseAnotherSprite: _steps_imagine_choose_another_sprite_LTR_png__WEBPACK_IMPORTED_MODULE_96__,
  imagineLeftRight: _steps_imagine_left_right_fr_png__WEBPACK_IMPORTED_MODULE_97__,
  imagineUpDown: _steps_imagine_up_down_fr_png__WEBPACK_IMPORTED_MODULE_98__,
  imagineChangeCostumes: _steps_imagine_change_costumes_fr_png__WEBPACK_IMPORTED_MODULE_99__,
  imagineGlideToPoint: _steps_imagine_glide_to_point_fr_png__WEBPACK_IMPORTED_MODULE_100__,
  imagineGrowShrink: _steps_imagine_grow_shrink_fr_png__WEBPACK_IMPORTED_MODULE_101__,
  imagineChooseAnotherBackdrop: _steps_imagine_choose_another_backdrop_LTR_png__WEBPACK_IMPORTED_MODULE_102__,
  imagineSwitchBackdrops: _steps_imagine_switch_backdrops_fr_png__WEBPACK_IMPORTED_MODULE_103__,
  imagineRecordASound: _steps_imagine_record_a_sound_fr_gif__WEBPACK_IMPORTED_MODULE_104__,
  imagineChooseSound: _steps_imagine_choose_sound_fr_png__WEBPACK_IMPORTED_MODULE_105__,
  // Add a Backdrop
  addBackdrop: _steps_add_backdrop_LTR_png__WEBPACK_IMPORTED_MODULE_106__,
  // Add Effects
  addEffects: _steps_add_effects_fr_png__WEBPACK_IMPORTED_MODULE_107__,
  // Hide and Show
  hideAndShow: _steps_hide_show_fr_png__WEBPACK_IMPORTED_MODULE_108__,
  // Switch Costumes
  switchCostumes: _steps_switch_costumes_fr_png__WEBPACK_IMPORTED_MODULE_109__,
  // Change Size
  changeSize: _steps_change_size_fr_png__WEBPACK_IMPORTED_MODULE_110__,
  // Spin
  spinTurn: _steps_spin_turn_fr_png__WEBPACK_IMPORTED_MODULE_111__,
  spinPointInDirection: _steps_spin_point_in_direction_fr_png__WEBPACK_IMPORTED_MODULE_112__,
  // Record a Sound
  recordASoundSoundsTab: _steps_record_a_sound_sounds_tab_fr_png__WEBPACK_IMPORTED_MODULE_113__,
  recordASoundClickRecord: _steps_record_a_sound_click_record_fr_png__WEBPACK_IMPORTED_MODULE_114__,
  recordASoundPressRecordButton: _steps_record_a_sound_press_record_button_fr_png__WEBPACK_IMPORTED_MODULE_115__,
  recordASoundChooseSound: _steps_record_a_sound_choose_sound_fr_png__WEBPACK_IMPORTED_MODULE_116__,
  recordASoundPlayYourSound: _steps_record_a_sound_play_your_sound_fr_png__WEBPACK_IMPORTED_MODULE_117__,
  // Use Arrow Keys
  moveArrowKeysLeftRight: _steps_move_arrow_keys_left_right_fr_png__WEBPACK_IMPORTED_MODULE_118__,
  moveArrowKeysUpDown: _steps_move_arrow_keys_up_down_fr_png__WEBPACK_IMPORTED_MODULE_119__,
  // Glide Around
  glideAroundBackAndForth: _steps_glide_around_back_and_forth_fr_png__WEBPACK_IMPORTED_MODULE_120__,
  glideAroundPoint: _steps_glide_around_point_fr_png__WEBPACK_IMPORTED_MODULE_121__,
  // Code a Cartoon
  codeCartoonSaySomething: _steps_code_cartoon_01_say_something_fr_png__WEBPACK_IMPORTED_MODULE_122__,
  codeCartoonAnimate: _steps_code_cartoon_02_animate_fr_png__WEBPACK_IMPORTED_MODULE_123__,
  codeCartoonSelectDifferentCharacter: _steps_code_cartoon_03_select_different_character_LTR_png__WEBPACK_IMPORTED_MODULE_124__,
  codeCartoonUseMinusSign: _steps_code_cartoon_04_use_minus_sign_fr_png__WEBPACK_IMPORTED_MODULE_125__,
  codeCartoonGrowShrink: _steps_code_cartoon_05_grow_shrink_fr_png__WEBPACK_IMPORTED_MODULE_126__,
  codeCartoonSelectDifferentCharacter2: _steps_code_cartoon_06_select_another_different_character_LTR_png__WEBPACK_IMPORTED_MODULE_127__,
  codeCartoonJump: _steps_code_cartoon_07_jump_fr_png__WEBPACK_IMPORTED_MODULE_128__,
  codeCartoonChangeScenes: _steps_code_cartoon_08_change_scenes_fr_png__WEBPACK_IMPORTED_MODULE_129__,
  codeCartoonGlideAround: _steps_code_cartoon_09_glide_around_fr_png__WEBPACK_IMPORTED_MODULE_130__,
  codeCartoonChangeCostumes: _steps_code_cartoon_10_change_costumes_fr_png__WEBPACK_IMPORTED_MODULE_131__,
  codeCartoonChooseMoreCharacters: _steps_code_cartoon_11_choose_more_characters_LTR_png__WEBPACK_IMPORTED_MODULE_132__,
  // Talking Tales
  talesAddExtension: _steps_speech_add_extension_fr_gif__WEBPACK_IMPORTED_MODULE_3__,
  talesChooseSprite: _steps_talking_2_choose_sprite_LTR_png__WEBPACK_IMPORTED_MODULE_133__,
  talesSaySomething: _steps_talking_3_say_something_fr_png__WEBPACK_IMPORTED_MODULE_134__,
  talesAskAnswer: _steps_talking_13_ask_and_answer_fr_png__WEBPACK_IMPORTED_MODULE_144__,
  talesChooseBackdrop: _steps_talking_4_choose_backdrop_LTR_png__WEBPACK_IMPORTED_MODULE_135__,
  talesSwitchBackdrop: _steps_talking_5_switch_backdrop_fr_png__WEBPACK_IMPORTED_MODULE_136__,
  talesChooseAnotherSprite: _steps_talking_6_choose_another_sprite_LTR_png__WEBPACK_IMPORTED_MODULE_137__,
  talesMoveAround: _steps_talking_7_move_around_fr_png__WEBPACK_IMPORTED_MODULE_138__,
  talesChooseAnotherBackdrop: _steps_talking_8_choose_another_backdrop_LTR_png__WEBPACK_IMPORTED_MODULE_139__,
  talesAnimateTalking: _steps_talking_9_animate_fr_png__WEBPACK_IMPORTED_MODULE_140__,
  talesChooseThirdBackdrop: _steps_talking_10_choose_third_backdrop_LTR_png__WEBPACK_IMPORTED_MODULE_141__,
  talesChooseSound: _steps_talking_11_choose_sound_fr_gif__WEBPACK_IMPORTED_MODULE_142__,
  talesDanceMoves: _steps_talking_12_dance_moves_fr_png__WEBPACK_IMPORTED_MODULE_143__
};


/***/ }),

/***/ "./src/lib/libraries/decks/steps/add-effects.fr.png":
/*!**********************************************************!*\
  !*** ./src/lib/libraries/decks/steps/add-effects.fr.png ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/add-effects.fr.bf25a4537fdd4b19d2ff.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/add-variable.fr.gif":
/*!***********************************************************!*\
  !*** ./src/lib/libraries/decks/steps/add-variable.fr.gif ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/add-variable.fr.8546e0aa3da858efb897.gif";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/animate-char-add-sound.fr.png":
/*!*********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/animate-char-add-sound.fr.png ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/animate-char-add-sound.fr.d425c11f4d1cf0ca95f2.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/animate-char-change-color.fr.png":
/*!************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/animate-char-change-color.fr.png ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/animate-char-change-color.fr.177e196642c72d6d9923.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/animate-char-jump.fr.png":
/*!****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/animate-char-jump.fr.png ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/animate-char-jump.fr.0e9dcd0ca0a7e8fbd59e.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/animate-char-move.fr.png":
/*!****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/animate-char-move.fr.png ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/animate-char-move.fr.9bbec89eef4f2805b97b.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/animate-char-say-something.fr.png":
/*!*************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/animate-char-say-something.fr.png ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/animate-char-say-something.fr.06e56846ebeed5e2ef82.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/animate-char-talk.fr.png":
/*!****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/animate-char-talk.fr.png ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/animate-char-talk.fr.72dfd1c271e3446c9858.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/change-size.fr.png":
/*!**********************************************************!*\
  !*** ./src/lib/libraries/decks/steps/change-size.fr.png ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/change-size.fr.b3434e2c3289a191c1cd.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/chase-game-change-score.fr.png":
/*!**********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/chase-game-change-score.fr.png ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/chase-game-change-score.fr.52751f7aa807d010b954.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/chase-game-move-randomly.fr.png":
/*!***********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/chase-game-move-randomly.fr.png ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/chase-game-move-randomly.fr.eadfc9ee8173c6dd3671.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/chase-game-play-sound.fr.png":
/*!********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/chase-game-play-sound.fr.png ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/chase-game-play-sound.fr.b58712894f9e8212b8f2.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/chase-game-right-left.fr.png":
/*!********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/chase-game-right-left.fr.png ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/chase-game-right-left.fr.39733530bdecaaedd9e1.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/chase-game-up-down.fr.png":
/*!*****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/chase-game-up-down.fr.png ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/chase-game-up-down.fr.57613c458e26e8a2f081.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/cn-backdrop.fr.png":
/*!**********************************************************!*\
  !*** ./src/lib/libraries/decks/steps/cn-backdrop.fr.png ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/cn-backdrop.fr.ed2ab4d4ceb124d2932b.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/cn-collect.fr.png":
/*!*********************************************************!*\
  !*** ./src/lib/libraries/decks/steps/cn-collect.fr.png ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/cn-collect.fr.61fd9334257fb3e5c4b5.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/cn-glide.fr.png":
/*!*******************************************************!*\
  !*** ./src/lib/libraries/decks/steps/cn-glide.fr.png ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/cn-glide.fr.37b333a757b823844811.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/cn-say.fr.png":
/*!*****************************************************!*\
  !*** ./src/lib/libraries/decks/steps/cn-say.fr.png ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/cn-say.fr.243ba1cab865c7f08e62.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/cn-score.fr.png":
/*!*******************************************************!*\
  !*** ./src/lib/libraries/decks/steps/cn-score.fr.png ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/cn-score.fr.aafdb0913dfecee49911.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/code-cartoon-01-say-something.fr.png":
/*!****************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/code-cartoon-01-say-something.fr.png ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/code-cartoon-01-say-something.fr.b7ba333221af22815870.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/code-cartoon-02-animate.fr.png":
/*!**********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/code-cartoon-02-animate.fr.png ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/code-cartoon-02-animate.fr.7379cdbd6905d4c1a036.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/code-cartoon-04-use-minus-sign.fr.png":
/*!*****************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/code-cartoon-04-use-minus-sign.fr.png ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/code-cartoon-04-use-minus-sign.fr.458d921b6919d7e4af37.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/code-cartoon-05-grow-shrink.fr.png":
/*!**************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/code-cartoon-05-grow-shrink.fr.png ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/code-cartoon-05-grow-shrink.fr.e1fa8dc086c91523fa06.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/code-cartoon-07-jump.fr.png":
/*!*******************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/code-cartoon-07-jump.fr.png ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/code-cartoon-07-jump.fr.75a690894204cca8f71c.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/code-cartoon-08-change-scenes.fr.png":
/*!****************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/code-cartoon-08-change-scenes.fr.png ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/code-cartoon-08-change-scenes.fr.3afa0de4e605ab4e12f0.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/code-cartoon-09-glide-around.fr.png":
/*!***************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/code-cartoon-09-glide-around.fr.png ***!
  \***************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/code-cartoon-09-glide-around.fr.3851f59f95ebfabeaaa6.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/code-cartoon-10-change-costumes.fr.png":
/*!******************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/code-cartoon-10-change-costumes.fr.png ***!
  \******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/code-cartoon-10-change-costumes.fr.65862a040280c056deeb.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/fly-flying-heart.fr.png":
/*!***************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/fly-flying-heart.fr.png ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/fly-flying-heart.fr.355419bd5da877c354f3.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/fly-keep-score.fr.png":
/*!*************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/fly-keep-score.fr.png ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/fly-keep-score.fr.a892ef3f968267b3e976.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/fly-make-interactive.fr.png":
/*!*******************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/fly-make-interactive.fr.png ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/fly-make-interactive.fr.b8de61ad932da909c68a.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/fly-move-scenery.fr.png":
/*!***************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/fly-move-scenery.fr.png ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/fly-move-scenery.fr.acdb8e8e7a37e145222e.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/fly-say-something.fr.png":
/*!****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/fly-say-something.fr.png ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/fly-say-something.fr.c006b7c279437ebfca53.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/fly-switch-costume.fr.png":
/*!*****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/fly-switch-costume.fr.png ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/fly-switch-costume.fr.b965b86a63bd2e3938a2.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/glide-around-back-and-forth.fr.png":
/*!**************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/glide-around-back-and-forth.fr.png ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/glide-around-back-and-forth.fr.db7b3ad8f40ef4d6a1d0.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/glide-around-point.fr.png":
/*!*****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/glide-around-point.fr.png ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/glide-around-point.fr.d0ccc4e2ad3d9f57f0eb.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/hide-show.fr.png":
/*!********************************************************!*\
  !*** ./src/lib/libraries/decks/steps/hide-show.fr.png ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/hide-show.fr.2049d134c0d0d0b21b50.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/imagine-change-costumes.fr.png":
/*!**********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/imagine-change-costumes.fr.png ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/imagine-change-costumes.fr.f8524e7f0fd4d7c14396.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/imagine-choose-sound.fr.png":
/*!*******************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/imagine-choose-sound.fr.png ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/imagine-choose-sound.fr.a4b0a42b7cf2e32cda2a.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/imagine-click-green-flag.fr.png":
/*!***********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/imagine-click-green-flag.fr.png ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/imagine-click-green-flag.fr.64aee6843c4e7eb8caf9.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/imagine-fly-around.fr.png":
/*!*****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/imagine-fly-around.fr.png ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/imagine-fly-around.fr.3d235a83ce6c2c1a8682.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/imagine-glide-to-point.fr.png":
/*!*********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/imagine-glide-to-point.fr.png ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/imagine-glide-to-point.fr.840618fe2c3409bf06e2.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/imagine-grow-shrink.fr.png":
/*!******************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/imagine-grow-shrink.fr.png ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/imagine-grow-shrink.fr.8b56042c850d52a039e1.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/imagine-left-right.fr.png":
/*!*****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/imagine-left-right.fr.png ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/imagine-left-right.fr.6234f9a3c00a78feec54.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/imagine-record-a-sound.fr.gif":
/*!*********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/imagine-record-a-sound.fr.gif ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/imagine-record-a-sound.fr.ea841cc5db252c3cb83c.gif";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/imagine-switch-backdrops.fr.png":
/*!***********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/imagine-switch-backdrops.fr.png ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/imagine-switch-backdrops.fr.94c2bfbd71ae42cc194f.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/imagine-type-what-you-want.fr.png":
/*!*************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/imagine-type-what-you-want.fr.png ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/imagine-type-what-you-want.fr.f7f41ffe0e883ffa8863.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/imagine-up-down.fr.png":
/*!**************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/imagine-up-down.fr.png ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/imagine-up-down.fr.8c9c73fd5e26517ba772.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/intro-1-move.fr.gif":
/*!***********************************************************!*\
  !*** ./src/lib/libraries/decks/steps/intro-1-move.fr.gif ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/intro-1-move.fr.b82d26829f397ca02df0.gif";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/intro-2-say.fr.gif":
/*!**********************************************************!*\
  !*** ./src/lib/libraries/decks/steps/intro-2-say.fr.gif ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/intro-2-say.fr.8dcf30ee03b1f9614271.gif";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/intro-3-green-flag.fr.gif":
/*!*****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/intro-3-green-flag.fr.gif ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/intro-3-green-flag.fr.fa225d8aaa82e8bd988f.gif";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/move-arrow-keys-left-right.fr.png":
/*!*************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/move-arrow-keys-left-right.fr.png ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/move-arrow-keys-left-right.fr.f0ff2c7485c4e313d7ae.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/move-arrow-keys-up-down.fr.png":
/*!**********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/move-arrow-keys-up-down.fr.png ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/move-arrow-keys-up-down.fr.4b3bd7db00faf76701ac.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/music-make-beat.fr.png":
/*!**************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/music-make-beat.fr.png ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/music-make-beat.fr.4e965b5172ce9075a422.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/music-make-beatbox.fr.png":
/*!*****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/music-make-beatbox.fr.png ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/music-make-beatbox.fr.abf0245d946d6a7c8001.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/music-make-song.fr.png":
/*!**************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/music-make-song.fr.png ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/music-make-song.fr.7c3fd35d02fb31f96503.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/music-play-sound.fr.png":
/*!***************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/music-play-sound.fr.png ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/music-play-sound.fr.31b24b73d4cc5529c7bf.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/name-change-color.fr.png":
/*!****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/name-change-color.fr.png ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/name-change-color.fr.d5f268fc10bf09e60699.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/name-grow.fr.png":
/*!********************************************************!*\
  !*** ./src/lib/libraries/decks/steps/name-grow.fr.png ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/name-grow.fr.ab10b725ce6fb5c9dd5f.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/name-play-sound.fr.png":
/*!**************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/name-play-sound.fr.png ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/name-play-sound.fr.38c798640ddb4bfcebf9.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/name-spin.fr.png":
/*!********************************************************!*\
  !*** ./src/lib/libraries/decks/steps/name-spin.fr.png ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/name-spin.fr.00a9ffedff54c860a9f5.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/pong-add-code-to-ball.fr.png":
/*!********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/pong-add-code-to-ball.fr.png ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/pong-add-code-to-ball.fr.d377787fe8b37b2d9844.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/pong-bounce-around.fr.png":
/*!*****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/pong-bounce-around.fr.png ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/pong-bounce-around.fr.6d1f668f8bdac9210780.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/pong-choose-score.fr.png":
/*!****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/pong-choose-score.fr.png ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/pong-choose-score.fr.ed7940adc4d7aab3c12c.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/pong-game-over.fr.png":
/*!*************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/pong-game-over.fr.png ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/pong-game-over.fr.47c4287dfe181e76adcb.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/pong-insert-change-score.fr.png":
/*!***********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/pong-insert-change-score.fr.png ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/pong-insert-change-score.fr.c0b872b00d283182d294.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/pong-move-the-paddle.fr.png":
/*!*******************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/pong-move-the-paddle.fr.png ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/pong-move-the-paddle.fr.c1c4d0faddba29e446f7.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/pong-reset-score.fr.png":
/*!***************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/pong-reset-score.fr.png ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/pong-reset-score.fr.d81a41702187c1f06c63.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/pop-game-change-color.fr.png":
/*!********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/pop-game-change-color.fr.png ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/pop-game-change-color.fr.669838c949027c81125e.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/pop-game-change-score.fr.png":
/*!********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/pop-game-change-score.fr.png ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/pop-game-change-score.fr.48c578dd8c0b3e433654.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/pop-game-play-sound.fr.png":
/*!******************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/pop-game-play-sound.fr.png ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/pop-game-play-sound.fr.9db8b80fdd0548691b4d.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/pop-game-random-position.fr.png":
/*!***********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/pop-game-random-position.fr.png ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/pop-game-random-position.fr.9e7c3387b4d40843dd7d.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/pop-game-reset-score.fr.png":
/*!*******************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/pop-game-reset-score.fr.png ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/pop-game-reset-score.fr.d1d964ae69a69c027271.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/record-a-sound-choose-sound.fr.png":
/*!**************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/record-a-sound-choose-sound.fr.png ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/record-a-sound-choose-sound.fr.366b044c409bfa890e69.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/record-a-sound-click-record.fr.png":
/*!**************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/record-a-sound-click-record.fr.png ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/record-a-sound-click-record.fr.72cfe4db2cad2868d874.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/record-a-sound-play-your-sound.fr.png":
/*!*****************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/record-a-sound-play-your-sound.fr.png ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = "data:image/png;base64,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";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/record-a-sound-press-record-button.fr.png":
/*!*********************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/record-a-sound-press-record-button.fr.png ***!
  \*********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/record-a-sound-press-record-button.fr.8532d3793e98ba696a1b.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/record-a-sound-sounds-tab.fr.png":
/*!************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/record-a-sound-sounds-tab.fr.png ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/record-a-sound-sounds-tab.fr.edd78ac58b4f596220f9.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/speech-add-extension.fr.gif":
/*!*******************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/speech-add-extension.fr.gif ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/speech-add-extension.fr.0598212953c12b5ea114.gif";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/speech-change-color.fr.png":
/*!******************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/speech-change-color.fr.png ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/speech-change-color.fr.a35729ab3d62285fe57c.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/speech-grow-shrink.fr.png":
/*!*****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/speech-grow-shrink.fr.png ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/speech-grow-shrink.fr.a3b57c8028d876665605.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/speech-move-around.fr.png":
/*!*****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/speech-move-around.fr.png ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/speech-move-around.fr.a881a843bd19473b795b.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/speech-say-something.fr.png":
/*!*******************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/speech-say-something.fr.png ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/speech-say-something.fr.eb7bd6894442e34f3798.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/speech-set-voice.fr.png":
/*!***************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/speech-set-voice.fr.png ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/speech-set-voice.fr.8e14a426ef76620de754.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/speech-song.fr.png":
/*!**********************************************************!*\
  !*** ./src/lib/libraries/decks/steps/speech-song.fr.png ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/speech-song.fr.39113da497f4d54b5821.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/speech-spin.fr.png":
/*!**********************************************************!*\
  !*** ./src/lib/libraries/decks/steps/speech-spin.fr.png ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/speech-spin.fr.e485262edecb52903f73.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/spin-point-in-direction.fr.png":
/*!**********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/spin-point-in-direction.fr.png ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/spin-point-in-direction.fr.253fa5adcd78c6052650.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/spin-turn.fr.png":
/*!********************************************************!*\
  !*** ./src/lib/libraries/decks/steps/spin-turn.fr.png ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/spin-turn.fr.f45966d8381f5ccb7081.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/story-conversation.fr.png":
/*!*****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/story-conversation.fr.png ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/story-conversation.fr.f458f667589ed4a3c76e.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/story-flip.fr.gif":
/*!*********************************************************!*\
  !*** ./src/lib/libraries/decks/steps/story-flip.fr.gif ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/story-flip.fr.6ea81c0b8146a35b7e5a.gif";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/story-hide-character.fr.png":
/*!*******************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/story-hide-character.fr.png ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/story-hide-character.fr.d428e28d12e69c505ea5.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/story-say-something.fr.png":
/*!******************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/story-say-something.fr.png ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/story-say-something.fr.1396fce6d3bc76601d81.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/story-show-character.fr.png":
/*!*******************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/story-show-character.fr.png ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/story-show-character.fr.fc5624d0e7b68f76c015.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/story-switch-backdrop.fr.png":
/*!********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/story-switch-backdrop.fr.png ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/story-switch-backdrop.fr.7dab76e7336d4582ed4d.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/switch-costumes.fr.png":
/*!**************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/switch-costumes.fr.png ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/switch-costumes.fr.d4a0baf2a9ec9e431040.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/talking-11-choose-sound.fr.gif":
/*!**********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/talking-11-choose-sound.fr.gif ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/talking-11-choose-sound.fr.6cca52098bf9facbf9ab.gif";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/talking-12-dance-moves.fr.png":
/*!*********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/talking-12-dance-moves.fr.png ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/talking-12-dance-moves.fr.c10529d4d7f2c770da58.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/talking-13-ask-and-answer.fr.png":
/*!************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/talking-13-ask-and-answer.fr.png ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/talking-13-ask-and-answer.fr.0fd5c5def395806d9172.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/talking-3-say-something.fr.png":
/*!**********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/talking-3-say-something.fr.png ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/talking-3-say-something.fr.7c4547dc4fdd10a5c98c.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/talking-5-switch-backdrop.fr.png":
/*!************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/talking-5-switch-backdrop.fr.png ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/talking-5-switch-backdrop.fr.b8bd004acab4f77157f5.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/talking-7-move-around.fr.png":
/*!********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/talking-7-move-around.fr.png ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/talking-7-move-around.fr.6786ff65282af8aa444f.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/talking-9-animate.fr.png":
/*!****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/talking-9-animate.fr.png ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/talking-9-animate.fr.52c7680290979655aab0.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/video-add-extension.fr.gif":
/*!******************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/video-add-extension.fr.gif ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/video-add-extension.fr.8dfd4b7f764b4e80a494.gif";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/video-animate.fr.png":
/*!************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/video-animate.fr.png ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/video-animate.fr.4747f77515b56bb4cc34.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/video-pet.fr.png":
/*!********************************************************!*\
  !*** ./src/lib/libraries/decks/steps/video-pet.fr.png ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/video-pet.fr.ed8a6dddc7b55ce8a0bc.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/video-pop.fr.png":
/*!********************************************************!*\
  !*** ./src/lib/libraries/decks/steps/video-pop.fr.png ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/video-pop.fr.337c4f6e1e3ae0199b7a.png";

/***/ })

}]);
//# sourceMappingURL=fr-steps.884d5333e5fc5fb0889a.js.map