"use strict";
(self["webpackChunkGUI"] = self["webpackChunkGUI"] || []).push([["am-steps"],{

/***/ "./src/lib/libraries/decks/am-steps.js":
/*!*********************************************!*\
  !*** ./src/lib/libraries/decks/am-steps.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   amImages: () => (/* binding */ amImages)
/* harmony export */ });
/* harmony import */ var _steps_intro_1_move_am_gif__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./steps/intro-1-move.am.gif */ "./src/lib/libraries/decks/steps/intro-1-move.am.gif");
/* harmony import */ var _steps_intro_2_say_am_gif__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./steps/intro-2-say.am.gif */ "./src/lib/libraries/decks/steps/intro-2-say.am.gif");
/* harmony import */ var _steps_intro_3_green_flag_am_gif__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./steps/intro-3-green-flag.am.gif */ "./src/lib/libraries/decks/steps/intro-3-green-flag.am.gif");
/* harmony import */ var _steps_speech_add_extension_am_gif__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./steps/speech-add-extension.am.gif */ "./src/lib/libraries/decks/steps/speech-add-extension.am.gif");
/* harmony import */ var _steps_speech_say_something_am_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./steps/speech-say-something.am.png */ "./src/lib/libraries/decks/steps/speech-say-something.am.png");
/* harmony import */ var _steps_speech_set_voice_am_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./steps/speech-set-voice.am.png */ "./src/lib/libraries/decks/steps/speech-set-voice.am.png");
/* harmony import */ var _steps_speech_move_around_am_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./steps/speech-move-around.am.png */ "./src/lib/libraries/decks/steps/speech-move-around.am.png");
/* harmony import */ var _steps_pick_backdrop_LTR_gif__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./steps/pick-backdrop.LTR.gif */ "./src/lib/libraries/decks/steps/pick-backdrop.LTR.gif");
/* harmony import */ var _steps_speech_add_sprite_LTR_gif__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./steps/speech-add-sprite.LTR.gif */ "./src/lib/libraries/decks/steps/speech-add-sprite.LTR.gif");
/* harmony import */ var _steps_speech_song_am_png__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./steps/speech-song.am.png */ "./src/lib/libraries/decks/steps/speech-song.am.png");
/* harmony import */ var _steps_speech_change_color_am_png__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./steps/speech-change-color.am.png */ "./src/lib/libraries/decks/steps/speech-change-color.am.png");
/* harmony import */ var _steps_speech_spin_am_png__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./steps/speech-spin.am.png */ "./src/lib/libraries/decks/steps/speech-spin.am.png");
/* harmony import */ var _steps_speech_grow_shrink_am_png__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./steps/speech-grow-shrink.am.png */ "./src/lib/libraries/decks/steps/speech-grow-shrink.am.png");
/* harmony import */ var _steps_cn_show_character_LTR_gif__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./steps/cn-show-character.LTR.gif */ "./src/lib/libraries/decks/steps/cn-show-character.LTR.gif");
/* harmony import */ var _steps_cn_say_am_png__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./steps/cn-say.am.png */ "./src/lib/libraries/decks/steps/cn-say.am.png");
/* harmony import */ var _steps_cn_glide_am_png__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./steps/cn-glide.am.png */ "./src/lib/libraries/decks/steps/cn-glide.am.png");
/* harmony import */ var _steps_cn_pick_sprite_LTR_gif__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./steps/cn-pick-sprite.LTR.gif */ "./src/lib/libraries/decks/steps/cn-pick-sprite.LTR.gif");
/* harmony import */ var _steps_cn_collect_am_png__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./steps/cn-collect.am.png */ "./src/lib/libraries/decks/steps/cn-collect.am.png");
/* harmony import */ var _steps_add_variable_am_gif__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./steps/add-variable.am.gif */ "./src/lib/libraries/decks/steps/add-variable.am.gif");
/* harmony import */ var _steps_cn_score_am_png__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./steps/cn-score.am.png */ "./src/lib/libraries/decks/steps/cn-score.am.png");
/* harmony import */ var _steps_cn_backdrop_am_png__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./steps/cn-backdrop.am.png */ "./src/lib/libraries/decks/steps/cn-backdrop.am.png");
/* harmony import */ var _steps_add_sprite_LTR_gif__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./steps/add-sprite.LTR.gif */ "./src/lib/libraries/decks/steps/add-sprite.LTR.gif");
/* harmony import */ var _steps_name_pick_letter_LTR_gif__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./steps/name-pick-letter.LTR.gif */ "./src/lib/libraries/decks/steps/name-pick-letter.LTR.gif");
/* harmony import */ var _steps_name_play_sound_am_png__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./steps/name-play-sound.am.png */ "./src/lib/libraries/decks/steps/name-play-sound.am.png");
/* harmony import */ var _steps_name_pick_letter2_LTR_gif__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./steps/name-pick-letter2.LTR.gif */ "./src/lib/libraries/decks/steps/name-pick-letter2.LTR.gif");
/* harmony import */ var _steps_name_change_color_am_png__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./steps/name-change-color.am.png */ "./src/lib/libraries/decks/steps/name-change-color.am.png");
/* harmony import */ var _steps_name_spin_am_png__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./steps/name-spin.am.png */ "./src/lib/libraries/decks/steps/name-spin.am.png");
/* harmony import */ var _steps_name_grow_am_png__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./steps/name-grow.am.png */ "./src/lib/libraries/decks/steps/name-grow.am.png");
/* harmony import */ var _steps_music_pick_instrument_LTR_gif__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./steps/music-pick-instrument.LTR.gif */ "./src/lib/libraries/decks/steps/music-pick-instrument.LTR.gif");
/* harmony import */ var _steps_music_play_sound_am_png__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./steps/music-play-sound.am.png */ "./src/lib/libraries/decks/steps/music-play-sound.am.png");
/* harmony import */ var _steps_music_make_song_am_png__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./steps/music-make-song.am.png */ "./src/lib/libraries/decks/steps/music-make-song.am.png");
/* harmony import */ var _steps_music_make_beat_am_png__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./steps/music-make-beat.am.png */ "./src/lib/libraries/decks/steps/music-make-beat.am.png");
/* harmony import */ var _steps_music_make_beatbox_am_png__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./steps/music-make-beatbox.am.png */ "./src/lib/libraries/decks/steps/music-make-beatbox.am.png");
/* harmony import */ var _steps_chase_game_add_backdrop_LTR_gif__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./steps/chase-game-add-backdrop.LTR.gif */ "./src/lib/libraries/decks/steps/chase-game-add-backdrop.LTR.gif");
/* harmony import */ var _steps_chase_game_add_sprite1_LTR_gif__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./steps/chase-game-add-sprite1.LTR.gif */ "./src/lib/libraries/decks/steps/chase-game-add-sprite1.LTR.gif");
/* harmony import */ var _steps_chase_game_right_left_am_png__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./steps/chase-game-right-left.am.png */ "./src/lib/libraries/decks/steps/chase-game-right-left.am.png");
/* harmony import */ var _steps_chase_game_up_down_am_png__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./steps/chase-game-up-down.am.png */ "./src/lib/libraries/decks/steps/chase-game-up-down.am.png");
/* harmony import */ var _steps_chase_game_add_sprite2_LTR_gif__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./steps/chase-game-add-sprite2.LTR.gif */ "./src/lib/libraries/decks/steps/chase-game-add-sprite2.LTR.gif");
/* harmony import */ var _steps_chase_game_move_randomly_am_png__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./steps/chase-game-move-randomly.am.png */ "./src/lib/libraries/decks/steps/chase-game-move-randomly.am.png");
/* harmony import */ var _steps_chase_game_play_sound_am_png__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./steps/chase-game-play-sound.am.png */ "./src/lib/libraries/decks/steps/chase-game-play-sound.am.png");
/* harmony import */ var _steps_chase_game_change_score_am_png__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./steps/chase-game-change-score.am.png */ "./src/lib/libraries/decks/steps/chase-game-change-score.am.png");
/* harmony import */ var _steps_pop_game_pick_sprite_LTR_gif__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./steps/pop-game-pick-sprite.LTR.gif */ "./src/lib/libraries/decks/steps/pop-game-pick-sprite.LTR.gif");
/* harmony import */ var _steps_pop_game_play_sound_am_png__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./steps/pop-game-play-sound.am.png */ "./src/lib/libraries/decks/steps/pop-game-play-sound.am.png");
/* harmony import */ var _steps_pop_game_change_score_am_png__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./steps/pop-game-change-score.am.png */ "./src/lib/libraries/decks/steps/pop-game-change-score.am.png");
/* harmony import */ var _steps_pop_game_random_position_am_png__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./steps/pop-game-random-position.am.png */ "./src/lib/libraries/decks/steps/pop-game-random-position.am.png");
/* harmony import */ var _steps_pop_game_change_color_am_png__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./steps/pop-game-change-color.am.png */ "./src/lib/libraries/decks/steps/pop-game-change-color.am.png");
/* harmony import */ var _steps_pop_game_reset_score_am_png__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./steps/pop-game-reset-score.am.png */ "./src/lib/libraries/decks/steps/pop-game-reset-score.am.png");
/* harmony import */ var _steps_animate_char_pick_sprite_LTR_gif__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./steps/animate-char-pick-sprite.LTR.gif */ "./src/lib/libraries/decks/steps/animate-char-pick-sprite.LTR.gif");
/* harmony import */ var _steps_animate_char_say_something_am_png__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ./steps/animate-char-say-something.am.png */ "./src/lib/libraries/decks/steps/animate-char-say-something.am.png");
/* harmony import */ var _steps_animate_char_add_sound_am_png__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ./steps/animate-char-add-sound.am.png */ "./src/lib/libraries/decks/steps/animate-char-add-sound.am.png");
/* harmony import */ var _steps_animate_char_talk_am_png__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ./steps/animate-char-talk.am.png */ "./src/lib/libraries/decks/steps/animate-char-talk.am.png");
/* harmony import */ var _steps_animate_char_move_am_png__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ./steps/animate-char-move.am.png */ "./src/lib/libraries/decks/steps/animate-char-move.am.png");
/* harmony import */ var _steps_animate_char_jump_am_png__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ./steps/animate-char-jump.am.png */ "./src/lib/libraries/decks/steps/animate-char-jump.am.png");
/* harmony import */ var _steps_animate_char_change_color_am_png__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! ./steps/animate-char-change-color.am.png */ "./src/lib/libraries/decks/steps/animate-char-change-color.am.png");
/* harmony import */ var _steps_story_pick_backdrop_LTR_gif__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! ./steps/story-pick-backdrop.LTR.gif */ "./src/lib/libraries/decks/steps/story-pick-backdrop.LTR.gif");
/* harmony import */ var _steps_story_pick_sprite_LTR_gif__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! ./steps/story-pick-sprite.LTR.gif */ "./src/lib/libraries/decks/steps/story-pick-sprite.LTR.gif");
/* harmony import */ var _steps_story_say_something_am_png__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! ./steps/story-say-something.am.png */ "./src/lib/libraries/decks/steps/story-say-something.am.png");
/* harmony import */ var _steps_story_pick_sprite2_LTR_gif__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! ./steps/story-pick-sprite2.LTR.gif */ "./src/lib/libraries/decks/steps/story-pick-sprite2.LTR.gif");
/* harmony import */ var _steps_story_flip_am_gif__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! ./steps/story-flip.am.gif */ "./src/lib/libraries/decks/steps/story-flip.am.gif");
/* harmony import */ var _steps_story_conversation_am_png__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! ./steps/story-conversation.am.png */ "./src/lib/libraries/decks/steps/story-conversation.am.png");
/* harmony import */ var _steps_story_pick_backdrop2_LTR_gif__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(/*! ./steps/story-pick-backdrop2.LTR.gif */ "./src/lib/libraries/decks/steps/story-pick-backdrop2.LTR.gif");
/* harmony import */ var _steps_story_switch_backdrop_am_png__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(/*! ./steps/story-switch-backdrop.am.png */ "./src/lib/libraries/decks/steps/story-switch-backdrop.am.png");
/* harmony import */ var _steps_story_hide_character_am_png__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(/*! ./steps/story-hide-character.am.png */ "./src/lib/libraries/decks/steps/story-hide-character.am.png");
/* harmony import */ var _steps_story_show_character_am_png__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(/*! ./steps/story-show-character.am.png */ "./src/lib/libraries/decks/steps/story-show-character.am.png");
/* harmony import */ var _steps_video_add_extension_am_gif__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(/*! ./steps/video-add-extension.am.gif */ "./src/lib/libraries/decks/steps/video-add-extension.am.gif");
/* harmony import */ var _steps_video_pet_am_png__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__(/*! ./steps/video-pet.am.png */ "./src/lib/libraries/decks/steps/video-pet.am.png");
/* harmony import */ var _steps_video_animate_am_png__WEBPACK_IMPORTED_MODULE_66__ = __webpack_require__(/*! ./steps/video-animate.am.png */ "./src/lib/libraries/decks/steps/video-animate.am.png");
/* harmony import */ var _steps_video_pop_am_png__WEBPACK_IMPORTED_MODULE_67__ = __webpack_require__(/*! ./steps/video-pop.am.png */ "./src/lib/libraries/decks/steps/video-pop.am.png");
/* harmony import */ var _steps_fly_choose_backdrop_LTR_gif__WEBPACK_IMPORTED_MODULE_68__ = __webpack_require__(/*! ./steps/fly-choose-backdrop.LTR.gif */ "./src/lib/libraries/decks/steps/fly-choose-backdrop.LTR.gif");
/* harmony import */ var _steps_fly_choose_character_LTR_png__WEBPACK_IMPORTED_MODULE_69__ = __webpack_require__(/*! ./steps/fly-choose-character.LTR.png */ "./src/lib/libraries/decks/steps/fly-choose-character.LTR.png");
/* harmony import */ var _steps_fly_say_something_am_png__WEBPACK_IMPORTED_MODULE_70__ = __webpack_require__(/*! ./steps/fly-say-something.am.png */ "./src/lib/libraries/decks/steps/fly-say-something.am.png");
/* harmony import */ var _steps_fly_make_interactive_am_png__WEBPACK_IMPORTED_MODULE_71__ = __webpack_require__(/*! ./steps/fly-make-interactive.am.png */ "./src/lib/libraries/decks/steps/fly-make-interactive.am.png");
/* harmony import */ var _steps_fly_object_to_collect_LTR_png__WEBPACK_IMPORTED_MODULE_72__ = __webpack_require__(/*! ./steps/fly-object-to-collect.LTR.png */ "./src/lib/libraries/decks/steps/fly-object-to-collect.LTR.png");
/* harmony import */ var _steps_fly_flying_heart_am_png__WEBPACK_IMPORTED_MODULE_73__ = __webpack_require__(/*! ./steps/fly-flying-heart.am.png */ "./src/lib/libraries/decks/steps/fly-flying-heart.am.png");
/* harmony import */ var _steps_fly_select_flyer_LTR_png__WEBPACK_IMPORTED_MODULE_74__ = __webpack_require__(/*! ./steps/fly-select-flyer.LTR.png */ "./src/lib/libraries/decks/steps/fly-select-flyer.LTR.png");
/* harmony import */ var _steps_fly_keep_score_am_png__WEBPACK_IMPORTED_MODULE_75__ = __webpack_require__(/*! ./steps/fly-keep-score.am.png */ "./src/lib/libraries/decks/steps/fly-keep-score.am.png");
/* harmony import */ var _steps_fly_choose_scenery_LTR_gif__WEBPACK_IMPORTED_MODULE_76__ = __webpack_require__(/*! ./steps/fly-choose-scenery.LTR.gif */ "./src/lib/libraries/decks/steps/fly-choose-scenery.LTR.gif");
/* harmony import */ var _steps_fly_move_scenery_am_png__WEBPACK_IMPORTED_MODULE_77__ = __webpack_require__(/*! ./steps/fly-move-scenery.am.png */ "./src/lib/libraries/decks/steps/fly-move-scenery.am.png");
/* harmony import */ var _steps_fly_switch_costume_am_png__WEBPACK_IMPORTED_MODULE_78__ = __webpack_require__(/*! ./steps/fly-switch-costume.am.png */ "./src/lib/libraries/decks/steps/fly-switch-costume.am.png");
/* harmony import */ var _steps_pong_add_backdrop_LTR_png__WEBPACK_IMPORTED_MODULE_79__ = __webpack_require__(/*! ./steps/pong-add-backdrop.LTR.png */ "./src/lib/libraries/decks/steps/pong-add-backdrop.LTR.png");
/* harmony import */ var _steps_pong_add_ball_sprite_LTR_png__WEBPACK_IMPORTED_MODULE_80__ = __webpack_require__(/*! ./steps/pong-add-ball-sprite.LTR.png */ "./src/lib/libraries/decks/steps/pong-add-ball-sprite.LTR.png");
/* harmony import */ var _steps_pong_bounce_around_am_png__WEBPACK_IMPORTED_MODULE_81__ = __webpack_require__(/*! ./steps/pong-bounce-around.am.png */ "./src/lib/libraries/decks/steps/pong-bounce-around.am.png");
/* harmony import */ var _steps_pong_add_a_paddle_LTR_gif__WEBPACK_IMPORTED_MODULE_82__ = __webpack_require__(/*! ./steps/pong-add-a-paddle.LTR.gif */ "./src/lib/libraries/decks/steps/pong-add-a-paddle.LTR.gif");
/* harmony import */ var _steps_pong_move_the_paddle_am_png__WEBPACK_IMPORTED_MODULE_83__ = __webpack_require__(/*! ./steps/pong-move-the-paddle.am.png */ "./src/lib/libraries/decks/steps/pong-move-the-paddle.am.png");
/* harmony import */ var _steps_pong_select_ball_LTR_png__WEBPACK_IMPORTED_MODULE_84__ = __webpack_require__(/*! ./steps/pong-select-ball.LTR.png */ "./src/lib/libraries/decks/steps/pong-select-ball.LTR.png");
/* harmony import */ var _steps_pong_add_code_to_ball_am_png__WEBPACK_IMPORTED_MODULE_85__ = __webpack_require__(/*! ./steps/pong-add-code-to-ball.am.png */ "./src/lib/libraries/decks/steps/pong-add-code-to-ball.am.png");
/* harmony import */ var _steps_pong_choose_score_am_png__WEBPACK_IMPORTED_MODULE_86__ = __webpack_require__(/*! ./steps/pong-choose-score.am.png */ "./src/lib/libraries/decks/steps/pong-choose-score.am.png");
/* harmony import */ var _steps_pong_insert_change_score_am_png__WEBPACK_IMPORTED_MODULE_87__ = __webpack_require__(/*! ./steps/pong-insert-change-score.am.png */ "./src/lib/libraries/decks/steps/pong-insert-change-score.am.png");
/* harmony import */ var _steps_pong_reset_score_am_png__WEBPACK_IMPORTED_MODULE_88__ = __webpack_require__(/*! ./steps/pong-reset-score.am.png */ "./src/lib/libraries/decks/steps/pong-reset-score.am.png");
/* harmony import */ var _steps_pong_add_line_LTR_gif__WEBPACK_IMPORTED_MODULE_89__ = __webpack_require__(/*! ./steps/pong-add-line.LTR.gif */ "./src/lib/libraries/decks/steps/pong-add-line.LTR.gif");
/* harmony import */ var _steps_pong_game_over_am_png__WEBPACK_IMPORTED_MODULE_90__ = __webpack_require__(/*! ./steps/pong-game-over.am.png */ "./src/lib/libraries/decks/steps/pong-game-over.am.png");
/* harmony import */ var _steps_imagine_type_what_you_want_am_png__WEBPACK_IMPORTED_MODULE_91__ = __webpack_require__(/*! ./steps/imagine-type-what-you-want.am.png */ "./src/lib/libraries/decks/steps/imagine-type-what-you-want.am.png");
/* harmony import */ var _steps_imagine_click_green_flag_am_png__WEBPACK_IMPORTED_MODULE_92__ = __webpack_require__(/*! ./steps/imagine-click-green-flag.am.png */ "./src/lib/libraries/decks/steps/imagine-click-green-flag.am.png");
/* harmony import */ var _steps_imagine_choose_backdrop_LTR_png__WEBPACK_IMPORTED_MODULE_93__ = __webpack_require__(/*! ./steps/imagine-choose-backdrop.LTR.png */ "./src/lib/libraries/decks/steps/imagine-choose-backdrop.LTR.png");
/* harmony import */ var _steps_imagine_choose_any_sprite_LTR_png__WEBPACK_IMPORTED_MODULE_94__ = __webpack_require__(/*! ./steps/imagine-choose-any-sprite.LTR.png */ "./src/lib/libraries/decks/steps/imagine-choose-any-sprite.LTR.png");
/* harmony import */ var _steps_imagine_fly_around_am_png__WEBPACK_IMPORTED_MODULE_95__ = __webpack_require__(/*! ./steps/imagine-fly-around.am.png */ "./src/lib/libraries/decks/steps/imagine-fly-around.am.png");
/* harmony import */ var _steps_imagine_choose_another_sprite_LTR_png__WEBPACK_IMPORTED_MODULE_96__ = __webpack_require__(/*! ./steps/imagine-choose-another-sprite.LTR.png */ "./src/lib/libraries/decks/steps/imagine-choose-another-sprite.LTR.png");
/* harmony import */ var _steps_imagine_left_right_am_png__WEBPACK_IMPORTED_MODULE_97__ = __webpack_require__(/*! ./steps/imagine-left-right.am.png */ "./src/lib/libraries/decks/steps/imagine-left-right.am.png");
/* harmony import */ var _steps_imagine_up_down_am_png__WEBPACK_IMPORTED_MODULE_98__ = __webpack_require__(/*! ./steps/imagine-up-down.am.png */ "./src/lib/libraries/decks/steps/imagine-up-down.am.png");
/* harmony import */ var _steps_imagine_change_costumes_am_png__WEBPACK_IMPORTED_MODULE_99__ = __webpack_require__(/*! ./steps/imagine-change-costumes.am.png */ "./src/lib/libraries/decks/steps/imagine-change-costumes.am.png");
/* harmony import */ var _steps_imagine_glide_to_point_am_png__WEBPACK_IMPORTED_MODULE_100__ = __webpack_require__(/*! ./steps/imagine-glide-to-point.am.png */ "./src/lib/libraries/decks/steps/imagine-glide-to-point.am.png");
/* harmony import */ var _steps_imagine_grow_shrink_am_png__WEBPACK_IMPORTED_MODULE_101__ = __webpack_require__(/*! ./steps/imagine-grow-shrink.am.png */ "./src/lib/libraries/decks/steps/imagine-grow-shrink.am.png");
/* harmony import */ var _steps_imagine_choose_another_backdrop_LTR_png__WEBPACK_IMPORTED_MODULE_102__ = __webpack_require__(/*! ./steps/imagine-choose-another-backdrop.LTR.png */ "./src/lib/libraries/decks/steps/imagine-choose-another-backdrop.LTR.png");
/* harmony import */ var _steps_imagine_switch_backdrops_am_png__WEBPACK_IMPORTED_MODULE_103__ = __webpack_require__(/*! ./steps/imagine-switch-backdrops.am.png */ "./src/lib/libraries/decks/steps/imagine-switch-backdrops.am.png");
/* harmony import */ var _steps_imagine_record_a_sound_am_gif__WEBPACK_IMPORTED_MODULE_104__ = __webpack_require__(/*! ./steps/imagine-record-a-sound.am.gif */ "./src/lib/libraries/decks/steps/imagine-record-a-sound.am.gif");
/* harmony import */ var _steps_imagine_choose_sound_am_png__WEBPACK_IMPORTED_MODULE_105__ = __webpack_require__(/*! ./steps/imagine-choose-sound.am.png */ "./src/lib/libraries/decks/steps/imagine-choose-sound.am.png");
/* harmony import */ var _steps_add_backdrop_LTR_png__WEBPACK_IMPORTED_MODULE_106__ = __webpack_require__(/*! ./steps/add-backdrop.LTR.png */ "./src/lib/libraries/decks/steps/add-backdrop.LTR.png");
/* harmony import */ var _steps_add_effects_am_png__WEBPACK_IMPORTED_MODULE_107__ = __webpack_require__(/*! ./steps/add-effects.am.png */ "./src/lib/libraries/decks/steps/add-effects.am.png");
/* harmony import */ var _steps_hide_show_am_png__WEBPACK_IMPORTED_MODULE_108__ = __webpack_require__(/*! ./steps/hide-show.am.png */ "./src/lib/libraries/decks/steps/hide-show.am.png");
/* harmony import */ var _steps_switch_costumes_am_png__WEBPACK_IMPORTED_MODULE_109__ = __webpack_require__(/*! ./steps/switch-costumes.am.png */ "./src/lib/libraries/decks/steps/switch-costumes.am.png");
/* harmony import */ var _steps_change_size_am_png__WEBPACK_IMPORTED_MODULE_110__ = __webpack_require__(/*! ./steps/change-size.am.png */ "./src/lib/libraries/decks/steps/change-size.am.png");
/* harmony import */ var _steps_spin_turn_am_png__WEBPACK_IMPORTED_MODULE_111__ = __webpack_require__(/*! ./steps/spin-turn.am.png */ "./src/lib/libraries/decks/steps/spin-turn.am.png");
/* harmony import */ var _steps_spin_point_in_direction_am_png__WEBPACK_IMPORTED_MODULE_112__ = __webpack_require__(/*! ./steps/spin-point-in-direction.am.png */ "./src/lib/libraries/decks/steps/spin-point-in-direction.am.png");
/* harmony import */ var _steps_record_a_sound_sounds_tab_am_png__WEBPACK_IMPORTED_MODULE_113__ = __webpack_require__(/*! ./steps/record-a-sound-sounds-tab.am.png */ "./src/lib/libraries/decks/steps/record-a-sound-sounds-tab.am.png");
/* harmony import */ var _steps_record_a_sound_click_record_am_png__WEBPACK_IMPORTED_MODULE_114__ = __webpack_require__(/*! ./steps/record-a-sound-click-record.am.png */ "./src/lib/libraries/decks/steps/record-a-sound-click-record.am.png");
/* harmony import */ var _steps_record_a_sound_press_record_button_am_png__WEBPACK_IMPORTED_MODULE_115__ = __webpack_require__(/*! ./steps/record-a-sound-press-record-button.am.png */ "./src/lib/libraries/decks/steps/record-a-sound-press-record-button.am.png");
/* harmony import */ var _steps_record_a_sound_choose_sound_am_png__WEBPACK_IMPORTED_MODULE_116__ = __webpack_require__(/*! ./steps/record-a-sound-choose-sound.am.png */ "./src/lib/libraries/decks/steps/record-a-sound-choose-sound.am.png");
/* harmony import */ var _steps_record_a_sound_play_your_sound_am_png__WEBPACK_IMPORTED_MODULE_117__ = __webpack_require__(/*! ./steps/record-a-sound-play-your-sound.am.png */ "./src/lib/libraries/decks/steps/record-a-sound-play-your-sound.am.png");
/* harmony import */ var _steps_move_arrow_keys_left_right_am_png__WEBPACK_IMPORTED_MODULE_118__ = __webpack_require__(/*! ./steps/move-arrow-keys-left-right.am.png */ "./src/lib/libraries/decks/steps/move-arrow-keys-left-right.am.png");
/* harmony import */ var _steps_move_arrow_keys_up_down_am_png__WEBPACK_IMPORTED_MODULE_119__ = __webpack_require__(/*! ./steps/move-arrow-keys-up-down.am.png */ "./src/lib/libraries/decks/steps/move-arrow-keys-up-down.am.png");
/* harmony import */ var _steps_glide_around_back_and_forth_am_png__WEBPACK_IMPORTED_MODULE_120__ = __webpack_require__(/*! ./steps/glide-around-back-and-forth.am.png */ "./src/lib/libraries/decks/steps/glide-around-back-and-forth.am.png");
/* harmony import */ var _steps_glide_around_point_am_png__WEBPACK_IMPORTED_MODULE_121__ = __webpack_require__(/*! ./steps/glide-around-point.am.png */ "./src/lib/libraries/decks/steps/glide-around-point.am.png");
/* harmony import */ var _steps_code_cartoon_01_say_something_am_png__WEBPACK_IMPORTED_MODULE_122__ = __webpack_require__(/*! ./steps/code-cartoon-01-say-something.am.png */ "./src/lib/libraries/decks/steps/code-cartoon-01-say-something.am.png");
/* harmony import */ var _steps_code_cartoon_02_animate_am_png__WEBPACK_IMPORTED_MODULE_123__ = __webpack_require__(/*! ./steps/code-cartoon-02-animate.am.png */ "./src/lib/libraries/decks/steps/code-cartoon-02-animate.am.png");
/* harmony import */ var _steps_code_cartoon_03_select_different_character_LTR_png__WEBPACK_IMPORTED_MODULE_124__ = __webpack_require__(/*! ./steps/code-cartoon-03-select-different-character.LTR.png */ "./src/lib/libraries/decks/steps/code-cartoon-03-select-different-character.LTR.png");
/* harmony import */ var _steps_code_cartoon_04_use_minus_sign_am_png__WEBPACK_IMPORTED_MODULE_125__ = __webpack_require__(/*! ./steps/code-cartoon-04-use-minus-sign.am.png */ "./src/lib/libraries/decks/steps/code-cartoon-04-use-minus-sign.am.png");
/* harmony import */ var _steps_code_cartoon_05_grow_shrink_am_png__WEBPACK_IMPORTED_MODULE_126__ = __webpack_require__(/*! ./steps/code-cartoon-05-grow-shrink.am.png */ "./src/lib/libraries/decks/steps/code-cartoon-05-grow-shrink.am.png");
/* harmony import */ var _steps_code_cartoon_06_select_another_different_character_LTR_png__WEBPACK_IMPORTED_MODULE_127__ = __webpack_require__(/*! ./steps/code-cartoon-06-select-another-different-character.LTR.png */ "./src/lib/libraries/decks/steps/code-cartoon-06-select-another-different-character.LTR.png");
/* harmony import */ var _steps_code_cartoon_07_jump_am_png__WEBPACK_IMPORTED_MODULE_128__ = __webpack_require__(/*! ./steps/code-cartoon-07-jump.am.png */ "./src/lib/libraries/decks/steps/code-cartoon-07-jump.am.png");
/* harmony import */ var _steps_code_cartoon_08_change_scenes_am_png__WEBPACK_IMPORTED_MODULE_129__ = __webpack_require__(/*! ./steps/code-cartoon-08-change-scenes.am.png */ "./src/lib/libraries/decks/steps/code-cartoon-08-change-scenes.am.png");
/* harmony import */ var _steps_code_cartoon_09_glide_around_am_png__WEBPACK_IMPORTED_MODULE_130__ = __webpack_require__(/*! ./steps/code-cartoon-09-glide-around.am.png */ "./src/lib/libraries/decks/steps/code-cartoon-09-glide-around.am.png");
/* harmony import */ var _steps_code_cartoon_10_change_costumes_am_png__WEBPACK_IMPORTED_MODULE_131__ = __webpack_require__(/*! ./steps/code-cartoon-10-change-costumes.am.png */ "./src/lib/libraries/decks/steps/code-cartoon-10-change-costumes.am.png");
/* harmony import */ var _steps_code_cartoon_11_choose_more_characters_LTR_png__WEBPACK_IMPORTED_MODULE_132__ = __webpack_require__(/*! ./steps/code-cartoon-11-choose-more-characters.LTR.png */ "./src/lib/libraries/decks/steps/code-cartoon-11-choose-more-characters.LTR.png");
/* harmony import */ var _steps_talking_2_choose_sprite_LTR_png__WEBPACK_IMPORTED_MODULE_133__ = __webpack_require__(/*! ./steps/talking-2-choose-sprite.LTR.png */ "./src/lib/libraries/decks/steps/talking-2-choose-sprite.LTR.png");
/* harmony import */ var _steps_talking_3_say_something_am_png__WEBPACK_IMPORTED_MODULE_134__ = __webpack_require__(/*! ./steps/talking-3-say-something.am.png */ "./src/lib/libraries/decks/steps/talking-3-say-something.am.png");
/* harmony import */ var _steps_talking_4_choose_backdrop_LTR_png__WEBPACK_IMPORTED_MODULE_135__ = __webpack_require__(/*! ./steps/talking-4-choose-backdrop.LTR.png */ "./src/lib/libraries/decks/steps/talking-4-choose-backdrop.LTR.png");
/* harmony import */ var _steps_talking_5_switch_backdrop_am_png__WEBPACK_IMPORTED_MODULE_136__ = __webpack_require__(/*! ./steps/talking-5-switch-backdrop.am.png */ "./src/lib/libraries/decks/steps/talking-5-switch-backdrop.am.png");
/* harmony import */ var _steps_talking_6_choose_another_sprite_LTR_png__WEBPACK_IMPORTED_MODULE_137__ = __webpack_require__(/*! ./steps/talking-6-choose-another-sprite.LTR.png */ "./src/lib/libraries/decks/steps/talking-6-choose-another-sprite.LTR.png");
/* harmony import */ var _steps_talking_7_move_around_am_png__WEBPACK_IMPORTED_MODULE_138__ = __webpack_require__(/*! ./steps/talking-7-move-around.am.png */ "./src/lib/libraries/decks/steps/talking-7-move-around.am.png");
/* harmony import */ var _steps_talking_8_choose_another_backdrop_LTR_png__WEBPACK_IMPORTED_MODULE_139__ = __webpack_require__(/*! ./steps/talking-8-choose-another-backdrop.LTR.png */ "./src/lib/libraries/decks/steps/talking-8-choose-another-backdrop.LTR.png");
/* harmony import */ var _steps_talking_9_animate_am_png__WEBPACK_IMPORTED_MODULE_140__ = __webpack_require__(/*! ./steps/talking-9-animate.am.png */ "./src/lib/libraries/decks/steps/talking-9-animate.am.png");
/* harmony import */ var _steps_talking_10_choose_third_backdrop_LTR_png__WEBPACK_IMPORTED_MODULE_141__ = __webpack_require__(/*! ./steps/talking-10-choose-third-backdrop.LTR.png */ "./src/lib/libraries/decks/steps/talking-10-choose-third-backdrop.LTR.png");
/* harmony import */ var _steps_talking_11_choose_sound_am_gif__WEBPACK_IMPORTED_MODULE_142__ = __webpack_require__(/*! ./steps/talking-11-choose-sound.am.gif */ "./src/lib/libraries/decks/steps/talking-11-choose-sound.am.gif");
/* harmony import */ var _steps_talking_12_dance_moves_am_png__WEBPACK_IMPORTED_MODULE_143__ = __webpack_require__(/*! ./steps/talking-12-dance-moves.am.png */ "./src/lib/libraries/decks/steps/talking-12-dance-moves.am.png");
/* harmony import */ var _steps_talking_13_ask_and_answer_am_png__WEBPACK_IMPORTED_MODULE_144__ = __webpack_require__(/*! ./steps/talking-13-ask-and-answer.am.png */ "./src/lib/libraries/decks/steps/talking-13-ask-and-answer.am.png");
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













const amImages = {
  // Intro
  introMove: _steps_intro_1_move_am_gif__WEBPACK_IMPORTED_MODULE_0__,
  introSay: _steps_intro_2_say_am_gif__WEBPACK_IMPORTED_MODULE_1__,
  introGreenFlag: _steps_intro_3_green_flag_am_gif__WEBPACK_IMPORTED_MODULE_2__,
  // Text to Speech
  speechAddExtension: _steps_speech_add_extension_am_gif__WEBPACK_IMPORTED_MODULE_3__,
  speechSaySomething: _steps_speech_say_something_am_png__WEBPACK_IMPORTED_MODULE_4__,
  speechSetVoice: _steps_speech_set_voice_am_png__WEBPACK_IMPORTED_MODULE_5__,
  speechMoveAround: _steps_speech_move_around_am_png__WEBPACK_IMPORTED_MODULE_6__,
  speechAddBackdrop: _steps_pick_backdrop_LTR_gif__WEBPACK_IMPORTED_MODULE_7__,
  speechAddSprite: _steps_speech_add_sprite_LTR_gif__WEBPACK_IMPORTED_MODULE_8__,
  speechSong: _steps_speech_song_am_png__WEBPACK_IMPORTED_MODULE_9__,
  speechChangeColor: _steps_speech_change_color_am_png__WEBPACK_IMPORTED_MODULE_10__,
  speechSpin: _steps_speech_spin_am_png__WEBPACK_IMPORTED_MODULE_11__,
  speechGrowShrink: _steps_speech_grow_shrink_am_png__WEBPACK_IMPORTED_MODULE_12__,
  // Cartoon Network
  cnShowCharacter: _steps_cn_show_character_LTR_gif__WEBPACK_IMPORTED_MODULE_13__,
  cnSay: _steps_cn_say_am_png__WEBPACK_IMPORTED_MODULE_14__,
  cnGlide: _steps_cn_glide_am_png__WEBPACK_IMPORTED_MODULE_15__,
  cnPickSprite: _steps_cn_pick_sprite_LTR_gif__WEBPACK_IMPORTED_MODULE_16__,
  cnCollect: _steps_cn_collect_am_png__WEBPACK_IMPORTED_MODULE_17__,
  cnVariable: _steps_add_variable_am_gif__WEBPACK_IMPORTED_MODULE_18__,
  cnScore: _steps_cn_score_am_png__WEBPACK_IMPORTED_MODULE_19__,
  cnBackdrop: _steps_cn_backdrop_am_png__WEBPACK_IMPORTED_MODULE_20__,
  // Add sprite
  addSprite: _steps_add_sprite_LTR_gif__WEBPACK_IMPORTED_MODULE_21__,
  // Animate a name
  namePickLetter: _steps_name_pick_letter_LTR_gif__WEBPACK_IMPORTED_MODULE_22__,
  namePlaySound: _steps_name_play_sound_am_png__WEBPACK_IMPORTED_MODULE_23__,
  namePickLetter2: _steps_name_pick_letter2_LTR_gif__WEBPACK_IMPORTED_MODULE_24__,
  nameChangeColor: _steps_name_change_color_am_png__WEBPACK_IMPORTED_MODULE_25__,
  nameSpin: _steps_name_spin_am_png__WEBPACK_IMPORTED_MODULE_26__,
  nameGrow: _steps_name_grow_am_png__WEBPACK_IMPORTED_MODULE_27__,
  // Make-Music
  musicPickInstrument: _steps_music_pick_instrument_LTR_gif__WEBPACK_IMPORTED_MODULE_28__,
  musicPlaySound: _steps_music_play_sound_am_png__WEBPACK_IMPORTED_MODULE_29__,
  musicMakeSong: _steps_music_make_song_am_png__WEBPACK_IMPORTED_MODULE_30__,
  musicMakeBeat: _steps_music_make_beat_am_png__WEBPACK_IMPORTED_MODULE_31__,
  musicMakeBeatbox: _steps_music_make_beatbox_am_png__WEBPACK_IMPORTED_MODULE_32__,
  // Chase-Game
  chaseGameAddBackdrop: _steps_chase_game_add_backdrop_LTR_gif__WEBPACK_IMPORTED_MODULE_33__,
  chaseGameAddSprite1: _steps_chase_game_add_sprite1_LTR_gif__WEBPACK_IMPORTED_MODULE_34__,
  chaseGameRightLeft: _steps_chase_game_right_left_am_png__WEBPACK_IMPORTED_MODULE_35__,
  chaseGameUpDown: _steps_chase_game_up_down_am_png__WEBPACK_IMPORTED_MODULE_36__,
  chaseGameAddSprite2: _steps_chase_game_add_sprite2_LTR_gif__WEBPACK_IMPORTED_MODULE_37__,
  chaseGameMoveRandomly: _steps_chase_game_move_randomly_am_png__WEBPACK_IMPORTED_MODULE_38__,
  chaseGamePlaySound: _steps_chase_game_play_sound_am_png__WEBPACK_IMPORTED_MODULE_39__,
  chaseGameAddVariable: _steps_add_variable_am_gif__WEBPACK_IMPORTED_MODULE_18__,
  chaseGameChangeScore: _steps_chase_game_change_score_am_png__WEBPACK_IMPORTED_MODULE_40__,
  // Make-A-Pop/Clicker Game
  popGamePickSprite: _steps_pop_game_pick_sprite_LTR_gif__WEBPACK_IMPORTED_MODULE_41__,
  popGamePlaySound: _steps_pop_game_play_sound_am_png__WEBPACK_IMPORTED_MODULE_42__,
  popGameAddScore: _steps_add_variable_am_gif__WEBPACK_IMPORTED_MODULE_18__,
  popGameChangeScore: _steps_pop_game_change_score_am_png__WEBPACK_IMPORTED_MODULE_43__,
  popGameRandomPosition: _steps_pop_game_random_position_am_png__WEBPACK_IMPORTED_MODULE_44__,
  popGameChangeColor: _steps_pop_game_change_color_am_png__WEBPACK_IMPORTED_MODULE_45__,
  popGameResetScore: _steps_pop_game_reset_score_am_png__WEBPACK_IMPORTED_MODULE_46__,
  // Animate A Character
  animateCharPickBackdrop: _steps_pick_backdrop_LTR_gif__WEBPACK_IMPORTED_MODULE_7__,
  animateCharPickSprite: _steps_animate_char_pick_sprite_LTR_gif__WEBPACK_IMPORTED_MODULE_47__,
  animateCharSaySomething: _steps_animate_char_say_something_am_png__WEBPACK_IMPORTED_MODULE_48__,
  animateCharAddSound: _steps_animate_char_add_sound_am_png__WEBPACK_IMPORTED_MODULE_49__,
  animateCharTalk: _steps_animate_char_talk_am_png__WEBPACK_IMPORTED_MODULE_50__,
  animateCharMove: _steps_animate_char_move_am_png__WEBPACK_IMPORTED_MODULE_51__,
  animateCharJump: _steps_animate_char_jump_am_png__WEBPACK_IMPORTED_MODULE_52__,
  animateCharChangeColor: _steps_animate_char_change_color_am_png__WEBPACK_IMPORTED_MODULE_53__,
  // Tell A Story
  storyPickBackdrop: _steps_story_pick_backdrop_LTR_gif__WEBPACK_IMPORTED_MODULE_54__,
  storyPickSprite: _steps_story_pick_sprite_LTR_gif__WEBPACK_IMPORTED_MODULE_55__,
  storySaySomething: _steps_story_say_something_am_png__WEBPACK_IMPORTED_MODULE_56__,
  storyPickSprite2: _steps_story_pick_sprite2_LTR_gif__WEBPACK_IMPORTED_MODULE_57__,
  storyFlip: _steps_story_flip_am_gif__WEBPACK_IMPORTED_MODULE_58__,
  storyConversation: _steps_story_conversation_am_png__WEBPACK_IMPORTED_MODULE_59__,
  storyPickBackdrop2: _steps_story_pick_backdrop2_LTR_gif__WEBPACK_IMPORTED_MODULE_60__,
  storySwitchBackdrop: _steps_story_switch_backdrop_am_png__WEBPACK_IMPORTED_MODULE_61__,
  storyHideCharacter: _steps_story_hide_character_am_png__WEBPACK_IMPORTED_MODULE_62__,
  storyShowCharacter: _steps_story_show_character_am_png__WEBPACK_IMPORTED_MODULE_63__,
  // Video Sensing
  videoAddExtension: _steps_video_add_extension_am_gif__WEBPACK_IMPORTED_MODULE_64__,
  videoPet: _steps_video_pet_am_png__WEBPACK_IMPORTED_MODULE_65__,
  videoAnimate: _steps_video_animate_am_png__WEBPACK_IMPORTED_MODULE_66__,
  videoPop: _steps_video_pop_am_png__WEBPACK_IMPORTED_MODULE_67__,
  // Make it Fly
  flyChooseBackdrop: _steps_fly_choose_backdrop_LTR_gif__WEBPACK_IMPORTED_MODULE_68__,
  flyChooseCharacter: _steps_fly_choose_character_LTR_png__WEBPACK_IMPORTED_MODULE_69__,
  flySaySomething: _steps_fly_say_something_am_png__WEBPACK_IMPORTED_MODULE_70__,
  flyMoveArrows: _steps_fly_make_interactive_am_png__WEBPACK_IMPORTED_MODULE_71__,
  flyChooseObject: _steps_fly_object_to_collect_LTR_png__WEBPACK_IMPORTED_MODULE_72__,
  flyFlyingObject: _steps_fly_flying_heart_am_png__WEBPACK_IMPORTED_MODULE_73__,
  flySelectFlyingSprite: _steps_fly_select_flyer_LTR_png__WEBPACK_IMPORTED_MODULE_74__,
  flyAddScore: _steps_add_variable_am_gif__WEBPACK_IMPORTED_MODULE_18__,
  flyKeepScore: _steps_fly_keep_score_am_png__WEBPACK_IMPORTED_MODULE_75__,
  flyAddScenery: _steps_fly_choose_scenery_LTR_gif__WEBPACK_IMPORTED_MODULE_76__,
  flyMoveScenery: _steps_fly_move_scenery_am_png__WEBPACK_IMPORTED_MODULE_77__,
  flySwitchLooks: _steps_fly_switch_costume_am_png__WEBPACK_IMPORTED_MODULE_78__,
  // Pong
  pongAddBackdrop: _steps_pong_add_backdrop_LTR_png__WEBPACK_IMPORTED_MODULE_79__,
  pongAddBallSprite: _steps_pong_add_ball_sprite_LTR_png__WEBPACK_IMPORTED_MODULE_80__,
  pongBounceAround: _steps_pong_bounce_around_am_png__WEBPACK_IMPORTED_MODULE_81__,
  pongAddPaddle: _steps_pong_add_a_paddle_LTR_gif__WEBPACK_IMPORTED_MODULE_82__,
  pongMoveThePaddle: _steps_pong_move_the_paddle_am_png__WEBPACK_IMPORTED_MODULE_83__,
  pongSelectBallSprite: _steps_pong_select_ball_LTR_png__WEBPACK_IMPORTED_MODULE_84__,
  pongAddMoreCodeToBall: _steps_pong_add_code_to_ball_am_png__WEBPACK_IMPORTED_MODULE_85__,
  pongAddAScore: _steps_add_variable_am_gif__WEBPACK_IMPORTED_MODULE_18__,
  pongChooseScoreFromMenu: _steps_pong_choose_score_am_png__WEBPACK_IMPORTED_MODULE_86__,
  pongInsertChangeScoreBlock: _steps_pong_insert_change_score_am_png__WEBPACK_IMPORTED_MODULE_87__,
  pongResetScore: _steps_pong_reset_score_am_png__WEBPACK_IMPORTED_MODULE_88__,
  pongAddLineSprite: _steps_pong_add_line_LTR_gif__WEBPACK_IMPORTED_MODULE_89__,
  pongGameOver: _steps_pong_game_over_am_png__WEBPACK_IMPORTED_MODULE_90__,
  // Imagine a World
  imagineTypeWhatYouWant: _steps_imagine_type_what_you_want_am_png__WEBPACK_IMPORTED_MODULE_91__,
  imagineClickGreenFlag: _steps_imagine_click_green_flag_am_png__WEBPACK_IMPORTED_MODULE_92__,
  imagineChooseBackdrop: _steps_imagine_choose_backdrop_LTR_png__WEBPACK_IMPORTED_MODULE_93__,
  imagineChooseSprite: _steps_imagine_choose_any_sprite_LTR_png__WEBPACK_IMPORTED_MODULE_94__,
  imagineFlyAround: _steps_imagine_fly_around_am_png__WEBPACK_IMPORTED_MODULE_95__,
  imagineChooseAnotherSprite: _steps_imagine_choose_another_sprite_LTR_png__WEBPACK_IMPORTED_MODULE_96__,
  imagineLeftRight: _steps_imagine_left_right_am_png__WEBPACK_IMPORTED_MODULE_97__,
  imagineUpDown: _steps_imagine_up_down_am_png__WEBPACK_IMPORTED_MODULE_98__,
  imagineChangeCostumes: _steps_imagine_change_costumes_am_png__WEBPACK_IMPORTED_MODULE_99__,
  imagineGlideToPoint: _steps_imagine_glide_to_point_am_png__WEBPACK_IMPORTED_MODULE_100__,
  imagineGrowShrink: _steps_imagine_grow_shrink_am_png__WEBPACK_IMPORTED_MODULE_101__,
  imagineChooseAnotherBackdrop: _steps_imagine_choose_another_backdrop_LTR_png__WEBPACK_IMPORTED_MODULE_102__,
  imagineSwitchBackdrops: _steps_imagine_switch_backdrops_am_png__WEBPACK_IMPORTED_MODULE_103__,
  imagineRecordASound: _steps_imagine_record_a_sound_am_gif__WEBPACK_IMPORTED_MODULE_104__,
  imagineChooseSound: _steps_imagine_choose_sound_am_png__WEBPACK_IMPORTED_MODULE_105__,
  // Add a Backdrop
  addBackdrop: _steps_add_backdrop_LTR_png__WEBPACK_IMPORTED_MODULE_106__,
  // Add Effects
  addEffects: _steps_add_effects_am_png__WEBPACK_IMPORTED_MODULE_107__,
  // Hide and Show
  hideAndShow: _steps_hide_show_am_png__WEBPACK_IMPORTED_MODULE_108__,
  // Switch Costumes
  switchCostumes: _steps_switch_costumes_am_png__WEBPACK_IMPORTED_MODULE_109__,
  // Change Size
  changeSize: _steps_change_size_am_png__WEBPACK_IMPORTED_MODULE_110__,
  // Spin
  spinTurn: _steps_spin_turn_am_png__WEBPACK_IMPORTED_MODULE_111__,
  spinPointInDirection: _steps_spin_point_in_direction_am_png__WEBPACK_IMPORTED_MODULE_112__,
  // Record a Sound
  recordASoundSoundsTab: _steps_record_a_sound_sounds_tab_am_png__WEBPACK_IMPORTED_MODULE_113__,
  recordASoundClickRecord: _steps_record_a_sound_click_record_am_png__WEBPACK_IMPORTED_MODULE_114__,
  recordASoundPressRecordButton: _steps_record_a_sound_press_record_button_am_png__WEBPACK_IMPORTED_MODULE_115__,
  recordASoundChooseSound: _steps_record_a_sound_choose_sound_am_png__WEBPACK_IMPORTED_MODULE_116__,
  recordASoundPlayYourSound: _steps_record_a_sound_play_your_sound_am_png__WEBPACK_IMPORTED_MODULE_117__,
  // Use Arrow Keys
  moveArrowKeysLeftRight: _steps_move_arrow_keys_left_right_am_png__WEBPACK_IMPORTED_MODULE_118__,
  moveArrowKeysUpDown: _steps_move_arrow_keys_up_down_am_png__WEBPACK_IMPORTED_MODULE_119__,
  // Glide Around
  glideAroundBackAndForth: _steps_glide_around_back_and_forth_am_png__WEBPACK_IMPORTED_MODULE_120__,
  glideAroundPoint: _steps_glide_around_point_am_png__WEBPACK_IMPORTED_MODULE_121__,
  // Code a Cartoon
  codeCartoonSaySomething: _steps_code_cartoon_01_say_something_am_png__WEBPACK_IMPORTED_MODULE_122__,
  codeCartoonAnimate: _steps_code_cartoon_02_animate_am_png__WEBPACK_IMPORTED_MODULE_123__,
  codeCartoonSelectDifferentCharacter: _steps_code_cartoon_03_select_different_character_LTR_png__WEBPACK_IMPORTED_MODULE_124__,
  codeCartoonUseMinusSign: _steps_code_cartoon_04_use_minus_sign_am_png__WEBPACK_IMPORTED_MODULE_125__,
  codeCartoonGrowShrink: _steps_code_cartoon_05_grow_shrink_am_png__WEBPACK_IMPORTED_MODULE_126__,
  codeCartoonSelectDifferentCharacter2: _steps_code_cartoon_06_select_another_different_character_LTR_png__WEBPACK_IMPORTED_MODULE_127__,
  codeCartoonJump: _steps_code_cartoon_07_jump_am_png__WEBPACK_IMPORTED_MODULE_128__,
  codeCartoonChangeScenes: _steps_code_cartoon_08_change_scenes_am_png__WEBPACK_IMPORTED_MODULE_129__,
  codeCartoonGlideAround: _steps_code_cartoon_09_glide_around_am_png__WEBPACK_IMPORTED_MODULE_130__,
  codeCartoonChangeCostumes: _steps_code_cartoon_10_change_costumes_am_png__WEBPACK_IMPORTED_MODULE_131__,
  codeCartoonChooseMoreCharacters: _steps_code_cartoon_11_choose_more_characters_LTR_png__WEBPACK_IMPORTED_MODULE_132__,
  // Talking Tales
  talesAddExtension: _steps_speech_add_extension_am_gif__WEBPACK_IMPORTED_MODULE_3__,
  talesChooseSprite: _steps_talking_2_choose_sprite_LTR_png__WEBPACK_IMPORTED_MODULE_133__,
  talesSaySomething: _steps_talking_3_say_something_am_png__WEBPACK_IMPORTED_MODULE_134__,
  talesAskAnswer: _steps_talking_13_ask_and_answer_am_png__WEBPACK_IMPORTED_MODULE_144__,
  talesChooseBackdrop: _steps_talking_4_choose_backdrop_LTR_png__WEBPACK_IMPORTED_MODULE_135__,
  talesSwitchBackdrop: _steps_talking_5_switch_backdrop_am_png__WEBPACK_IMPORTED_MODULE_136__,
  talesChooseAnotherSprite: _steps_talking_6_choose_another_sprite_LTR_png__WEBPACK_IMPORTED_MODULE_137__,
  talesMoveAround: _steps_talking_7_move_around_am_png__WEBPACK_IMPORTED_MODULE_138__,
  talesChooseAnotherBackdrop: _steps_talking_8_choose_another_backdrop_LTR_png__WEBPACK_IMPORTED_MODULE_139__,
  talesAnimateTalking: _steps_talking_9_animate_am_png__WEBPACK_IMPORTED_MODULE_140__,
  talesChooseThirdBackdrop: _steps_talking_10_choose_third_backdrop_LTR_png__WEBPACK_IMPORTED_MODULE_141__,
  talesChooseSound: _steps_talking_11_choose_sound_am_gif__WEBPACK_IMPORTED_MODULE_142__,
  talesDanceMoves: _steps_talking_12_dance_moves_am_png__WEBPACK_IMPORTED_MODULE_143__
};


/***/ }),

/***/ "./src/lib/libraries/decks/steps/add-effects.am.png":
/*!**********************************************************!*\
  !*** ./src/lib/libraries/decks/steps/add-effects.am.png ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/add-effects.am.a9eb420ec604feed9253.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/add-variable.am.gif":
/*!***********************************************************!*\
  !*** ./src/lib/libraries/decks/steps/add-variable.am.gif ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/add-variable.am.7b76fad5e5637c425aa7.gif";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/animate-char-add-sound.am.png":
/*!*********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/animate-char-add-sound.am.png ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/animate-char-add-sound.am.7ab9ebc828811bb6d8e8.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/animate-char-change-color.am.png":
/*!************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/animate-char-change-color.am.png ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/animate-char-change-color.am.c73f58d0b4ce22bcb6d2.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/animate-char-jump.am.png":
/*!****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/animate-char-jump.am.png ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/animate-char-jump.am.3851240d5163528a81e1.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/animate-char-move.am.png":
/*!****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/animate-char-move.am.png ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/animate-char-move.am.abcb8e59acf2c9cfbf4f.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/animate-char-say-something.am.png":
/*!*************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/animate-char-say-something.am.png ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/animate-char-say-something.am.b7e61f8217ae964665f6.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/animate-char-talk.am.png":
/*!****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/animate-char-talk.am.png ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/animate-char-talk.am.0b6aa876aaec083cfdb1.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/change-size.am.png":
/*!**********************************************************!*\
  !*** ./src/lib/libraries/decks/steps/change-size.am.png ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/change-size.am.aa6fb9a0c9660947da30.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/chase-game-change-score.am.png":
/*!**********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/chase-game-change-score.am.png ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/chase-game-change-score.am.087ce052adadc4ecc4dc.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/chase-game-move-randomly.am.png":
/*!***********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/chase-game-move-randomly.am.png ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/chase-game-move-randomly.am.2ce024c7be6a80920d02.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/chase-game-play-sound.am.png":
/*!********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/chase-game-play-sound.am.png ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/chase-game-play-sound.am.020b80dcb063733ca3e7.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/chase-game-right-left.am.png":
/*!********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/chase-game-right-left.am.png ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/chase-game-right-left.am.274df71447815709caf0.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/chase-game-up-down.am.png":
/*!*****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/chase-game-up-down.am.png ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/chase-game-up-down.am.03c893e6c5844d9f629d.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/cn-backdrop.am.png":
/*!**********************************************************!*\
  !*** ./src/lib/libraries/decks/steps/cn-backdrop.am.png ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/cn-backdrop.am.83e339a2e031786eb06a.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/cn-collect.am.png":
/*!*********************************************************!*\
  !*** ./src/lib/libraries/decks/steps/cn-collect.am.png ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/cn-collect.am.a8ceaf3c34d2734e7b57.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/cn-glide.am.png":
/*!*******************************************************!*\
  !*** ./src/lib/libraries/decks/steps/cn-glide.am.png ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/cn-glide.am.f5ac20c92791e812bebb.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/cn-say.am.png":
/*!*****************************************************!*\
  !*** ./src/lib/libraries/decks/steps/cn-say.am.png ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/cn-say.am.efe87e3f2abd0c1da016.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/cn-score.am.png":
/*!*******************************************************!*\
  !*** ./src/lib/libraries/decks/steps/cn-score.am.png ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/cn-score.am.b0fb5a7fb75d9697e4af.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/code-cartoon-01-say-something.am.png":
/*!****************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/code-cartoon-01-say-something.am.png ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/code-cartoon-01-say-something.am.627ffbd4955dfbb4f7b5.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/code-cartoon-02-animate.am.png":
/*!**********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/code-cartoon-02-animate.am.png ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/code-cartoon-02-animate.am.705b74026b2401e42630.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/code-cartoon-04-use-minus-sign.am.png":
/*!*****************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/code-cartoon-04-use-minus-sign.am.png ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/code-cartoon-04-use-minus-sign.am.0409513b5d63d007f1d1.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/code-cartoon-05-grow-shrink.am.png":
/*!**************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/code-cartoon-05-grow-shrink.am.png ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/code-cartoon-05-grow-shrink.am.880e3411fa06ad2bc92c.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/code-cartoon-07-jump.am.png":
/*!*******************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/code-cartoon-07-jump.am.png ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/code-cartoon-07-jump.am.ff57094ec16a8ee59442.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/code-cartoon-08-change-scenes.am.png":
/*!****************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/code-cartoon-08-change-scenes.am.png ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/code-cartoon-08-change-scenes.am.9ea1ac240f9fd8298b01.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/code-cartoon-09-glide-around.am.png":
/*!***************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/code-cartoon-09-glide-around.am.png ***!
  \***************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/code-cartoon-09-glide-around.am.fd602bbac336be796fbf.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/code-cartoon-10-change-costumes.am.png":
/*!******************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/code-cartoon-10-change-costumes.am.png ***!
  \******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/code-cartoon-10-change-costumes.am.c0eb464275b34f5ea79c.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/fly-flying-heart.am.png":
/*!***************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/fly-flying-heart.am.png ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/fly-flying-heart.am.29914d5d83dfd804287e.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/fly-keep-score.am.png":
/*!*************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/fly-keep-score.am.png ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/fly-keep-score.am.415c4289c75738823191.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/fly-make-interactive.am.png":
/*!*******************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/fly-make-interactive.am.png ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/fly-make-interactive.am.27191f781e68af6181cc.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/fly-move-scenery.am.png":
/*!***************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/fly-move-scenery.am.png ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/fly-move-scenery.am.a97f7141709135fde7ec.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/fly-say-something.am.png":
/*!****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/fly-say-something.am.png ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/fly-say-something.am.1bda571c8873cf45963b.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/fly-switch-costume.am.png":
/*!*****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/fly-switch-costume.am.png ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/fly-switch-costume.am.f24cb3680857db639315.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/glide-around-back-and-forth.am.png":
/*!**************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/glide-around-back-and-forth.am.png ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/glide-around-back-and-forth.am.1cdb828e3168db01d362.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/glide-around-point.am.png":
/*!*****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/glide-around-point.am.png ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/glide-around-point.am.e36325449eeef8307b1e.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/hide-show.am.png":
/*!********************************************************!*\
  !*** ./src/lib/libraries/decks/steps/hide-show.am.png ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/hide-show.am.eb59ba5e2f459fca481c.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/imagine-change-costumes.am.png":
/*!**********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/imagine-change-costumes.am.png ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/imagine-change-costumes.am.25691f845d7fe5fecf9d.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/imagine-choose-sound.am.png":
/*!*******************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/imagine-choose-sound.am.png ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/imagine-choose-sound.am.3b1ed94d86b6afc3099e.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/imagine-click-green-flag.am.png":
/*!***********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/imagine-click-green-flag.am.png ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/imagine-click-green-flag.am.4ed5c9a0142ec286971f.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/imagine-fly-around.am.png":
/*!*****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/imagine-fly-around.am.png ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/imagine-fly-around.am.8fc9dbc44d43f35b930d.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/imagine-glide-to-point.am.png":
/*!*********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/imagine-glide-to-point.am.png ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/imagine-glide-to-point.am.ab92e88034ca30a28fc8.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/imagine-grow-shrink.am.png":
/*!******************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/imagine-grow-shrink.am.png ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/imagine-grow-shrink.am.c731b82007c70d1a3b35.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/imagine-left-right.am.png":
/*!*****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/imagine-left-right.am.png ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/imagine-left-right.am.04f60e8a30de1be579d5.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/imagine-record-a-sound.am.gif":
/*!*********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/imagine-record-a-sound.am.gif ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/imagine-record-a-sound.am.40bd6707a1fc47dbcb84.gif";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/imagine-switch-backdrops.am.png":
/*!***********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/imagine-switch-backdrops.am.png ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/imagine-switch-backdrops.am.64275dfc41e9f570b55b.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/imagine-type-what-you-want.am.png":
/*!*************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/imagine-type-what-you-want.am.png ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/imagine-type-what-you-want.am.2033b9a79e77022c076a.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/imagine-up-down.am.png":
/*!**************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/imagine-up-down.am.png ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/imagine-up-down.am.40c9556392e985dfdcd0.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/intro-1-move.am.gif":
/*!***********************************************************!*\
  !*** ./src/lib/libraries/decks/steps/intro-1-move.am.gif ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/intro-1-move.am.0ce1ab8f67be1a0835bb.gif";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/intro-2-say.am.gif":
/*!**********************************************************!*\
  !*** ./src/lib/libraries/decks/steps/intro-2-say.am.gif ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/intro-2-say.am.c3edaf1166e0b79b98b9.gif";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/intro-3-green-flag.am.gif":
/*!*****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/intro-3-green-flag.am.gif ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/intro-3-green-flag.am.c2a191233d9d4bf57177.gif";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/move-arrow-keys-left-right.am.png":
/*!*************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/move-arrow-keys-left-right.am.png ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/move-arrow-keys-left-right.am.cf8548f04b4a6e5293cb.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/move-arrow-keys-up-down.am.png":
/*!**********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/move-arrow-keys-up-down.am.png ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/move-arrow-keys-up-down.am.0d822db45553b873d8d1.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/music-make-beat.am.png":
/*!**************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/music-make-beat.am.png ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/music-make-beat.am.7b36c6172657f3ded128.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/music-make-beatbox.am.png":
/*!*****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/music-make-beatbox.am.png ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/music-make-beatbox.am.af05f058225e2b7a18b8.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/music-make-song.am.png":
/*!**************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/music-make-song.am.png ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/music-make-song.am.86c17c0bd4aed2c975c5.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/music-play-sound.am.png":
/*!***************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/music-play-sound.am.png ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/music-play-sound.am.2be17e488f8ac6e35349.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/name-change-color.am.png":
/*!****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/name-change-color.am.png ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/name-change-color.am.b32556cbe646d9507044.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/name-grow.am.png":
/*!********************************************************!*\
  !*** ./src/lib/libraries/decks/steps/name-grow.am.png ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/name-grow.am.db3b2bc8142e19a78d41.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/name-play-sound.am.png":
/*!**************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/name-play-sound.am.png ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/name-play-sound.am.fafb220e4d4d566dec60.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/name-spin.am.png":
/*!********************************************************!*\
  !*** ./src/lib/libraries/decks/steps/name-spin.am.png ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/name-spin.am.e493af8e60e7b4a22884.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/pong-add-code-to-ball.am.png":
/*!********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/pong-add-code-to-ball.am.png ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/pong-add-code-to-ball.am.3d6bd6d24e81053604cc.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/pong-bounce-around.am.png":
/*!*****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/pong-bounce-around.am.png ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/pong-bounce-around.am.cff3a9cca245529d9750.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/pong-choose-score.am.png":
/*!****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/pong-choose-score.am.png ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/pong-choose-score.am.c4f7bf65b458ddcaeda8.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/pong-game-over.am.png":
/*!*************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/pong-game-over.am.png ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/pong-game-over.am.6f2e940de19a22f247fe.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/pong-insert-change-score.am.png":
/*!***********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/pong-insert-change-score.am.png ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/pong-insert-change-score.am.6c8dfef955bb7ebaeca0.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/pong-move-the-paddle.am.png":
/*!*******************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/pong-move-the-paddle.am.png ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/pong-move-the-paddle.am.170f845f9a1ea4300e26.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/pong-reset-score.am.png":
/*!***************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/pong-reset-score.am.png ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/pong-reset-score.am.c2bf69c8c50a57ca7243.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/pop-game-change-color.am.png":
/*!********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/pop-game-change-color.am.png ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/pop-game-change-color.am.d99a6adbe2ec88ed97f0.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/pop-game-change-score.am.png":
/*!********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/pop-game-change-score.am.png ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/pop-game-change-score.am.e3e215e8d21be4900b41.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/pop-game-play-sound.am.png":
/*!******************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/pop-game-play-sound.am.png ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/pop-game-play-sound.am.1938c670214904f87f1b.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/pop-game-random-position.am.png":
/*!***********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/pop-game-random-position.am.png ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/pop-game-random-position.am.6146dc907339716f6dc5.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/pop-game-reset-score.am.png":
/*!*******************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/pop-game-reset-score.am.png ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/pop-game-reset-score.am.16911d63e59fceb883a2.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/record-a-sound-choose-sound.am.png":
/*!**************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/record-a-sound-choose-sound.am.png ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/record-a-sound-choose-sound.am.6681f1372e13e754a27a.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/record-a-sound-click-record.am.png":
/*!**************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/record-a-sound-click-record.am.png ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/record-a-sound-click-record.am.fa227b03f58d10dfff21.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/record-a-sound-play-your-sound.am.png":
/*!*****************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/record-a-sound-play-your-sound.am.png ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = "data:image/png;base64,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";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/record-a-sound-press-record-button.am.png":
/*!*********************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/record-a-sound-press-record-button.am.png ***!
  \*********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/record-a-sound-press-record-button.am.b95e56cd13c2805ca5f3.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/record-a-sound-sounds-tab.am.png":
/*!************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/record-a-sound-sounds-tab.am.png ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/record-a-sound-sounds-tab.am.4ae8716f2c0d577fb28b.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/speech-add-extension.am.gif":
/*!*******************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/speech-add-extension.am.gif ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/speech-add-extension.am.89c11442a1dc31ed4df5.gif";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/speech-change-color.am.png":
/*!******************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/speech-change-color.am.png ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/speech-change-color.am.588140aa5b374feb5f0b.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/speech-grow-shrink.am.png":
/*!*****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/speech-grow-shrink.am.png ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/speech-grow-shrink.am.354b563da959b4b26dbc.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/speech-move-around.am.png":
/*!*****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/speech-move-around.am.png ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/speech-move-around.am.37552e87ed1e63aab276.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/speech-say-something.am.png":
/*!*******************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/speech-say-something.am.png ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/speech-say-something.am.435037d27bd7e50cc8bb.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/speech-set-voice.am.png":
/*!***************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/speech-set-voice.am.png ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/speech-set-voice.am.70edf659ab1a5a64ea0d.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/speech-song.am.png":
/*!**********************************************************!*\
  !*** ./src/lib/libraries/decks/steps/speech-song.am.png ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/speech-song.am.cd28cf13fdb8d52177ff.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/speech-spin.am.png":
/*!**********************************************************!*\
  !*** ./src/lib/libraries/decks/steps/speech-spin.am.png ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/speech-spin.am.970891fbbd32104bb335.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/spin-point-in-direction.am.png":
/*!**********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/spin-point-in-direction.am.png ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/spin-point-in-direction.am.77398124a82bce711b40.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/spin-turn.am.png":
/*!********************************************************!*\
  !*** ./src/lib/libraries/decks/steps/spin-turn.am.png ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/spin-turn.am.59a3ed98a00da6238991.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/story-conversation.am.png":
/*!*****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/story-conversation.am.png ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/story-conversation.am.3341c49f9486a95fde97.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/story-flip.am.gif":
/*!*********************************************************!*\
  !*** ./src/lib/libraries/decks/steps/story-flip.am.gif ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/story-flip.am.c067ee9ef2a42d26644f.gif";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/story-hide-character.am.png":
/*!*******************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/story-hide-character.am.png ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/story-hide-character.am.e88dfbc0b974141a4998.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/story-say-something.am.png":
/*!******************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/story-say-something.am.png ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/story-say-something.am.f8331d9b85e630defaa9.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/story-show-character.am.png":
/*!*******************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/story-show-character.am.png ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/story-show-character.am.319221653d7434856d97.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/story-switch-backdrop.am.png":
/*!********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/story-switch-backdrop.am.png ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/story-switch-backdrop.am.b32c41da45305c68fe75.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/switch-costumes.am.png":
/*!**************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/switch-costumes.am.png ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/switch-costumes.am.6bf4fba4d91b6b74ec32.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/talking-11-choose-sound.am.gif":
/*!**********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/talking-11-choose-sound.am.gif ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/talking-11-choose-sound.am.835817052b36228a8662.gif";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/talking-12-dance-moves.am.png":
/*!*********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/talking-12-dance-moves.am.png ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/talking-12-dance-moves.am.3777b2bc009955792616.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/talking-13-ask-and-answer.am.png":
/*!************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/talking-13-ask-and-answer.am.png ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/talking-13-ask-and-answer.am.6e5fa4200df3c0951281.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/talking-3-say-something.am.png":
/*!**********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/talking-3-say-something.am.png ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/talking-3-say-something.am.90c22af346af54007dbc.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/talking-5-switch-backdrop.am.png":
/*!************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/talking-5-switch-backdrop.am.png ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/talking-5-switch-backdrop.am.7178a14124c167ac65cd.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/talking-7-move-around.am.png":
/*!********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/talking-7-move-around.am.png ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/talking-7-move-around.am.c969e5cca0e7ed26b105.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/talking-9-animate.am.png":
/*!****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/talking-9-animate.am.png ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/talking-9-animate.am.8d44ed242690aaf56f03.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/video-add-extension.am.gif":
/*!******************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/video-add-extension.am.gif ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/video-add-extension.am.bd1dfdfc8c8399c4875d.gif";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/video-animate.am.png":
/*!************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/video-animate.am.png ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/video-animate.am.c84ccb2d745435856ffe.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/video-pet.am.png":
/*!********************************************************!*\
  !*** ./src/lib/libraries/decks/steps/video-pet.am.png ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/video-pet.am.7611a49875433ae37e5b.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/video-pop.am.png":
/*!********************************************************!*\
  !*** ./src/lib/libraries/decks/steps/video-pop.am.png ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/video-pop.am.320a772d07e21f6725de.png";

/***/ })

}]);
//# sourceMappingURL=am-steps.4a17b1d76e3a361c3a9c.js.map