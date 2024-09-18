"use strict";
(self["webpackChunkGUI"] = self["webpackChunkGUI"] || []).push([["sw-steps"],{

/***/ "./src/lib/libraries/decks/sw-steps.js":
/*!*********************************************!*\
  !*** ./src/lib/libraries/decks/sw-steps.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   swImages: () => (/* binding */ swImages)
/* harmony export */ });
/* harmony import */ var _steps_intro_1_move_sw_gif__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./steps/intro-1-move.sw.gif */ "./src/lib/libraries/decks/steps/intro-1-move.sw.gif");
/* harmony import */ var _steps_intro_2_say_sw_gif__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./steps/intro-2-say.sw.gif */ "./src/lib/libraries/decks/steps/intro-2-say.sw.gif");
/* harmony import */ var _steps_intro_3_green_flag_sw_gif__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./steps/intro-3-green-flag.sw.gif */ "./src/lib/libraries/decks/steps/intro-3-green-flag.sw.gif");
/* harmony import */ var _steps_speech_add_extension_sw_gif__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./steps/speech-add-extension.sw.gif */ "./src/lib/libraries/decks/steps/speech-add-extension.sw.gif");
/* harmony import */ var _steps_speech_say_something_sw_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./steps/speech-say-something.sw.png */ "./src/lib/libraries/decks/steps/speech-say-something.sw.png");
/* harmony import */ var _steps_speech_set_voice_sw_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./steps/speech-set-voice.sw.png */ "./src/lib/libraries/decks/steps/speech-set-voice.sw.png");
/* harmony import */ var _steps_speech_move_around_sw_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./steps/speech-move-around.sw.png */ "./src/lib/libraries/decks/steps/speech-move-around.sw.png");
/* harmony import */ var _steps_pick_backdrop_LTR_gif__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./steps/pick-backdrop.LTR.gif */ "./src/lib/libraries/decks/steps/pick-backdrop.LTR.gif");
/* harmony import */ var _steps_speech_add_sprite_LTR_gif__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./steps/speech-add-sprite.LTR.gif */ "./src/lib/libraries/decks/steps/speech-add-sprite.LTR.gif");
/* harmony import */ var _steps_speech_song_sw_png__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./steps/speech-song.sw.png */ "./src/lib/libraries/decks/steps/speech-song.sw.png");
/* harmony import */ var _steps_speech_change_color_sw_png__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./steps/speech-change-color.sw.png */ "./src/lib/libraries/decks/steps/speech-change-color.sw.png");
/* harmony import */ var _steps_speech_spin_sw_png__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./steps/speech-spin.sw.png */ "./src/lib/libraries/decks/steps/speech-spin.sw.png");
/* harmony import */ var _steps_speech_grow_shrink_sw_png__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./steps/speech-grow-shrink.sw.png */ "./src/lib/libraries/decks/steps/speech-grow-shrink.sw.png");
/* harmony import */ var _steps_cn_show_character_LTR_gif__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./steps/cn-show-character.LTR.gif */ "./src/lib/libraries/decks/steps/cn-show-character.LTR.gif");
/* harmony import */ var _steps_cn_say_sw_png__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./steps/cn-say.sw.png */ "./src/lib/libraries/decks/steps/cn-say.sw.png");
/* harmony import */ var _steps_cn_glide_sw_png__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./steps/cn-glide.sw.png */ "./src/lib/libraries/decks/steps/cn-glide.sw.png");
/* harmony import */ var _steps_cn_pick_sprite_LTR_gif__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./steps/cn-pick-sprite.LTR.gif */ "./src/lib/libraries/decks/steps/cn-pick-sprite.LTR.gif");
/* harmony import */ var _steps_cn_collect_sw_png__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./steps/cn-collect.sw.png */ "./src/lib/libraries/decks/steps/cn-collect.sw.png");
/* harmony import */ var _steps_add_variable_sw_gif__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./steps/add-variable.sw.gif */ "./src/lib/libraries/decks/steps/add-variable.sw.gif");
/* harmony import */ var _steps_cn_score_sw_png__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./steps/cn-score.sw.png */ "./src/lib/libraries/decks/steps/cn-score.sw.png");
/* harmony import */ var _steps_cn_backdrop_sw_png__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./steps/cn-backdrop.sw.png */ "./src/lib/libraries/decks/steps/cn-backdrop.sw.png");
/* harmony import */ var _steps_add_sprite_LTR_gif__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./steps/add-sprite.LTR.gif */ "./src/lib/libraries/decks/steps/add-sprite.LTR.gif");
/* harmony import */ var _steps_name_pick_letter_LTR_gif__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./steps/name-pick-letter.LTR.gif */ "./src/lib/libraries/decks/steps/name-pick-letter.LTR.gif");
/* harmony import */ var _steps_name_play_sound_sw_png__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./steps/name-play-sound.sw.png */ "./src/lib/libraries/decks/steps/name-play-sound.sw.png");
/* harmony import */ var _steps_name_pick_letter2_LTR_gif__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./steps/name-pick-letter2.LTR.gif */ "./src/lib/libraries/decks/steps/name-pick-letter2.LTR.gif");
/* harmony import */ var _steps_name_change_color_sw_png__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./steps/name-change-color.sw.png */ "./src/lib/libraries/decks/steps/name-change-color.sw.png");
/* harmony import */ var _steps_name_spin_sw_png__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./steps/name-spin.sw.png */ "./src/lib/libraries/decks/steps/name-spin.sw.png");
/* harmony import */ var _steps_name_grow_sw_png__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./steps/name-grow.sw.png */ "./src/lib/libraries/decks/steps/name-grow.sw.png");
/* harmony import */ var _steps_music_pick_instrument_LTR_gif__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./steps/music-pick-instrument.LTR.gif */ "./src/lib/libraries/decks/steps/music-pick-instrument.LTR.gif");
/* harmony import */ var _steps_music_play_sound_sw_png__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./steps/music-play-sound.sw.png */ "./src/lib/libraries/decks/steps/music-play-sound.sw.png");
/* harmony import */ var _steps_music_make_song_sw_png__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./steps/music-make-song.sw.png */ "./src/lib/libraries/decks/steps/music-make-song.sw.png");
/* harmony import */ var _steps_music_make_beat_sw_png__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./steps/music-make-beat.sw.png */ "./src/lib/libraries/decks/steps/music-make-beat.sw.png");
/* harmony import */ var _steps_music_make_beatbox_sw_png__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./steps/music-make-beatbox.sw.png */ "./src/lib/libraries/decks/steps/music-make-beatbox.sw.png");
/* harmony import */ var _steps_chase_game_add_backdrop_LTR_gif__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./steps/chase-game-add-backdrop.LTR.gif */ "./src/lib/libraries/decks/steps/chase-game-add-backdrop.LTR.gif");
/* harmony import */ var _steps_chase_game_add_sprite1_LTR_gif__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./steps/chase-game-add-sprite1.LTR.gif */ "./src/lib/libraries/decks/steps/chase-game-add-sprite1.LTR.gif");
/* harmony import */ var _steps_chase_game_right_left_sw_png__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./steps/chase-game-right-left.sw.png */ "./src/lib/libraries/decks/steps/chase-game-right-left.sw.png");
/* harmony import */ var _steps_chase_game_up_down_sw_png__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./steps/chase-game-up-down.sw.png */ "./src/lib/libraries/decks/steps/chase-game-up-down.sw.png");
/* harmony import */ var _steps_chase_game_add_sprite2_LTR_gif__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./steps/chase-game-add-sprite2.LTR.gif */ "./src/lib/libraries/decks/steps/chase-game-add-sprite2.LTR.gif");
/* harmony import */ var _steps_chase_game_move_randomly_sw_png__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./steps/chase-game-move-randomly.sw.png */ "./src/lib/libraries/decks/steps/chase-game-move-randomly.sw.png");
/* harmony import */ var _steps_chase_game_play_sound_sw_png__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./steps/chase-game-play-sound.sw.png */ "./src/lib/libraries/decks/steps/chase-game-play-sound.sw.png");
/* harmony import */ var _steps_chase_game_change_score_sw_png__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./steps/chase-game-change-score.sw.png */ "./src/lib/libraries/decks/steps/chase-game-change-score.sw.png");
/* harmony import */ var _steps_pop_game_pick_sprite_LTR_gif__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./steps/pop-game-pick-sprite.LTR.gif */ "./src/lib/libraries/decks/steps/pop-game-pick-sprite.LTR.gif");
/* harmony import */ var _steps_pop_game_play_sound_sw_png__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./steps/pop-game-play-sound.sw.png */ "./src/lib/libraries/decks/steps/pop-game-play-sound.sw.png");
/* harmony import */ var _steps_pop_game_change_score_sw_png__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./steps/pop-game-change-score.sw.png */ "./src/lib/libraries/decks/steps/pop-game-change-score.sw.png");
/* harmony import */ var _steps_pop_game_random_position_sw_png__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./steps/pop-game-random-position.sw.png */ "./src/lib/libraries/decks/steps/pop-game-random-position.sw.png");
/* harmony import */ var _steps_pop_game_change_color_sw_png__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./steps/pop-game-change-color.sw.png */ "./src/lib/libraries/decks/steps/pop-game-change-color.sw.png");
/* harmony import */ var _steps_pop_game_reset_score_sw_png__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./steps/pop-game-reset-score.sw.png */ "./src/lib/libraries/decks/steps/pop-game-reset-score.sw.png");
/* harmony import */ var _steps_animate_char_pick_sprite_LTR_gif__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./steps/animate-char-pick-sprite.LTR.gif */ "./src/lib/libraries/decks/steps/animate-char-pick-sprite.LTR.gif");
/* harmony import */ var _steps_animate_char_say_something_sw_png__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ./steps/animate-char-say-something.sw.png */ "./src/lib/libraries/decks/steps/animate-char-say-something.sw.png");
/* harmony import */ var _steps_animate_char_add_sound_sw_png__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ./steps/animate-char-add-sound.sw.png */ "./src/lib/libraries/decks/steps/animate-char-add-sound.sw.png");
/* harmony import */ var _steps_animate_char_talk_sw_png__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ./steps/animate-char-talk.sw.png */ "./src/lib/libraries/decks/steps/animate-char-talk.sw.png");
/* harmony import */ var _steps_animate_char_move_sw_png__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ./steps/animate-char-move.sw.png */ "./src/lib/libraries/decks/steps/animate-char-move.sw.png");
/* harmony import */ var _steps_animate_char_jump_sw_png__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ./steps/animate-char-jump.sw.png */ "./src/lib/libraries/decks/steps/animate-char-jump.sw.png");
/* harmony import */ var _steps_animate_char_change_color_sw_png__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! ./steps/animate-char-change-color.sw.png */ "./src/lib/libraries/decks/steps/animate-char-change-color.sw.png");
/* harmony import */ var _steps_story_pick_backdrop_LTR_gif__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! ./steps/story-pick-backdrop.LTR.gif */ "./src/lib/libraries/decks/steps/story-pick-backdrop.LTR.gif");
/* harmony import */ var _steps_story_pick_sprite_LTR_gif__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! ./steps/story-pick-sprite.LTR.gif */ "./src/lib/libraries/decks/steps/story-pick-sprite.LTR.gif");
/* harmony import */ var _steps_story_say_something_sw_png__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! ./steps/story-say-something.sw.png */ "./src/lib/libraries/decks/steps/story-say-something.sw.png");
/* harmony import */ var _steps_story_pick_sprite2_LTR_gif__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! ./steps/story-pick-sprite2.LTR.gif */ "./src/lib/libraries/decks/steps/story-pick-sprite2.LTR.gif");
/* harmony import */ var _steps_story_flip_sw_gif__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! ./steps/story-flip.sw.gif */ "./src/lib/libraries/decks/steps/story-flip.sw.gif");
/* harmony import */ var _steps_story_conversation_sw_png__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! ./steps/story-conversation.sw.png */ "./src/lib/libraries/decks/steps/story-conversation.sw.png");
/* harmony import */ var _steps_story_pick_backdrop2_LTR_gif__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(/*! ./steps/story-pick-backdrop2.LTR.gif */ "./src/lib/libraries/decks/steps/story-pick-backdrop2.LTR.gif");
/* harmony import */ var _steps_story_switch_backdrop_sw_png__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(/*! ./steps/story-switch-backdrop.sw.png */ "./src/lib/libraries/decks/steps/story-switch-backdrop.sw.png");
/* harmony import */ var _steps_story_hide_character_sw_png__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(/*! ./steps/story-hide-character.sw.png */ "./src/lib/libraries/decks/steps/story-hide-character.sw.png");
/* harmony import */ var _steps_story_show_character_sw_png__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(/*! ./steps/story-show-character.sw.png */ "./src/lib/libraries/decks/steps/story-show-character.sw.png");
/* harmony import */ var _steps_video_add_extension_sw_gif__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(/*! ./steps/video-add-extension.sw.gif */ "./src/lib/libraries/decks/steps/video-add-extension.sw.gif");
/* harmony import */ var _steps_video_pet_sw_png__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__(/*! ./steps/video-pet.sw.png */ "./src/lib/libraries/decks/steps/video-pet.sw.png");
/* harmony import */ var _steps_video_animate_sw_png__WEBPACK_IMPORTED_MODULE_66__ = __webpack_require__(/*! ./steps/video-animate.sw.png */ "./src/lib/libraries/decks/steps/video-animate.sw.png");
/* harmony import */ var _steps_video_pop_sw_png__WEBPACK_IMPORTED_MODULE_67__ = __webpack_require__(/*! ./steps/video-pop.sw.png */ "./src/lib/libraries/decks/steps/video-pop.sw.png");
/* harmony import */ var _steps_fly_choose_backdrop_LTR_gif__WEBPACK_IMPORTED_MODULE_68__ = __webpack_require__(/*! ./steps/fly-choose-backdrop.LTR.gif */ "./src/lib/libraries/decks/steps/fly-choose-backdrop.LTR.gif");
/* harmony import */ var _steps_fly_choose_character_LTR_png__WEBPACK_IMPORTED_MODULE_69__ = __webpack_require__(/*! ./steps/fly-choose-character.LTR.png */ "./src/lib/libraries/decks/steps/fly-choose-character.LTR.png");
/* harmony import */ var _steps_fly_say_something_sw_png__WEBPACK_IMPORTED_MODULE_70__ = __webpack_require__(/*! ./steps/fly-say-something.sw.png */ "./src/lib/libraries/decks/steps/fly-say-something.sw.png");
/* harmony import */ var _steps_fly_make_interactive_sw_png__WEBPACK_IMPORTED_MODULE_71__ = __webpack_require__(/*! ./steps/fly-make-interactive.sw.png */ "./src/lib/libraries/decks/steps/fly-make-interactive.sw.png");
/* harmony import */ var _steps_fly_object_to_collect_LTR_png__WEBPACK_IMPORTED_MODULE_72__ = __webpack_require__(/*! ./steps/fly-object-to-collect.LTR.png */ "./src/lib/libraries/decks/steps/fly-object-to-collect.LTR.png");
/* harmony import */ var _steps_fly_flying_heart_sw_png__WEBPACK_IMPORTED_MODULE_73__ = __webpack_require__(/*! ./steps/fly-flying-heart.sw.png */ "./src/lib/libraries/decks/steps/fly-flying-heart.sw.png");
/* harmony import */ var _steps_fly_select_flyer_LTR_png__WEBPACK_IMPORTED_MODULE_74__ = __webpack_require__(/*! ./steps/fly-select-flyer.LTR.png */ "./src/lib/libraries/decks/steps/fly-select-flyer.LTR.png");
/* harmony import */ var _steps_fly_keep_score_sw_png__WEBPACK_IMPORTED_MODULE_75__ = __webpack_require__(/*! ./steps/fly-keep-score.sw.png */ "./src/lib/libraries/decks/steps/fly-keep-score.sw.png");
/* harmony import */ var _steps_fly_choose_scenery_LTR_gif__WEBPACK_IMPORTED_MODULE_76__ = __webpack_require__(/*! ./steps/fly-choose-scenery.LTR.gif */ "./src/lib/libraries/decks/steps/fly-choose-scenery.LTR.gif");
/* harmony import */ var _steps_fly_move_scenery_sw_png__WEBPACK_IMPORTED_MODULE_77__ = __webpack_require__(/*! ./steps/fly-move-scenery.sw.png */ "./src/lib/libraries/decks/steps/fly-move-scenery.sw.png");
/* harmony import */ var _steps_fly_switch_costume_sw_png__WEBPACK_IMPORTED_MODULE_78__ = __webpack_require__(/*! ./steps/fly-switch-costume.sw.png */ "./src/lib/libraries/decks/steps/fly-switch-costume.sw.png");
/* harmony import */ var _steps_pong_add_backdrop_LTR_png__WEBPACK_IMPORTED_MODULE_79__ = __webpack_require__(/*! ./steps/pong-add-backdrop.LTR.png */ "./src/lib/libraries/decks/steps/pong-add-backdrop.LTR.png");
/* harmony import */ var _steps_pong_add_ball_sprite_LTR_png__WEBPACK_IMPORTED_MODULE_80__ = __webpack_require__(/*! ./steps/pong-add-ball-sprite.LTR.png */ "./src/lib/libraries/decks/steps/pong-add-ball-sprite.LTR.png");
/* harmony import */ var _steps_pong_bounce_around_sw_png__WEBPACK_IMPORTED_MODULE_81__ = __webpack_require__(/*! ./steps/pong-bounce-around.sw.png */ "./src/lib/libraries/decks/steps/pong-bounce-around.sw.png");
/* harmony import */ var _steps_pong_add_a_paddle_LTR_gif__WEBPACK_IMPORTED_MODULE_82__ = __webpack_require__(/*! ./steps/pong-add-a-paddle.LTR.gif */ "./src/lib/libraries/decks/steps/pong-add-a-paddle.LTR.gif");
/* harmony import */ var _steps_pong_move_the_paddle_sw_png__WEBPACK_IMPORTED_MODULE_83__ = __webpack_require__(/*! ./steps/pong-move-the-paddle.sw.png */ "./src/lib/libraries/decks/steps/pong-move-the-paddle.sw.png");
/* harmony import */ var _steps_pong_select_ball_LTR_png__WEBPACK_IMPORTED_MODULE_84__ = __webpack_require__(/*! ./steps/pong-select-ball.LTR.png */ "./src/lib/libraries/decks/steps/pong-select-ball.LTR.png");
/* harmony import */ var _steps_pong_add_code_to_ball_sw_png__WEBPACK_IMPORTED_MODULE_85__ = __webpack_require__(/*! ./steps/pong-add-code-to-ball.sw.png */ "./src/lib/libraries/decks/steps/pong-add-code-to-ball.sw.png");
/* harmony import */ var _steps_pong_choose_score_sw_png__WEBPACK_IMPORTED_MODULE_86__ = __webpack_require__(/*! ./steps/pong-choose-score.sw.png */ "./src/lib/libraries/decks/steps/pong-choose-score.sw.png");
/* harmony import */ var _steps_pong_insert_change_score_sw_png__WEBPACK_IMPORTED_MODULE_87__ = __webpack_require__(/*! ./steps/pong-insert-change-score.sw.png */ "./src/lib/libraries/decks/steps/pong-insert-change-score.sw.png");
/* harmony import */ var _steps_pong_reset_score_sw_png__WEBPACK_IMPORTED_MODULE_88__ = __webpack_require__(/*! ./steps/pong-reset-score.sw.png */ "./src/lib/libraries/decks/steps/pong-reset-score.sw.png");
/* harmony import */ var _steps_pong_add_line_LTR_gif__WEBPACK_IMPORTED_MODULE_89__ = __webpack_require__(/*! ./steps/pong-add-line.LTR.gif */ "./src/lib/libraries/decks/steps/pong-add-line.LTR.gif");
/* harmony import */ var _steps_pong_game_over_sw_png__WEBPACK_IMPORTED_MODULE_90__ = __webpack_require__(/*! ./steps/pong-game-over.sw.png */ "./src/lib/libraries/decks/steps/pong-game-over.sw.png");
/* harmony import */ var _steps_imagine_type_what_you_want_sw_png__WEBPACK_IMPORTED_MODULE_91__ = __webpack_require__(/*! ./steps/imagine-type-what-you-want.sw.png */ "./src/lib/libraries/decks/steps/imagine-type-what-you-want.sw.png");
/* harmony import */ var _steps_imagine_click_green_flag_sw_png__WEBPACK_IMPORTED_MODULE_92__ = __webpack_require__(/*! ./steps/imagine-click-green-flag.sw.png */ "./src/lib/libraries/decks/steps/imagine-click-green-flag.sw.png");
/* harmony import */ var _steps_imagine_choose_backdrop_LTR_png__WEBPACK_IMPORTED_MODULE_93__ = __webpack_require__(/*! ./steps/imagine-choose-backdrop.LTR.png */ "./src/lib/libraries/decks/steps/imagine-choose-backdrop.LTR.png");
/* harmony import */ var _steps_imagine_choose_any_sprite_LTR_png__WEBPACK_IMPORTED_MODULE_94__ = __webpack_require__(/*! ./steps/imagine-choose-any-sprite.LTR.png */ "./src/lib/libraries/decks/steps/imagine-choose-any-sprite.LTR.png");
/* harmony import */ var _steps_imagine_fly_around_sw_png__WEBPACK_IMPORTED_MODULE_95__ = __webpack_require__(/*! ./steps/imagine-fly-around.sw.png */ "./src/lib/libraries/decks/steps/imagine-fly-around.sw.png");
/* harmony import */ var _steps_imagine_choose_another_sprite_LTR_png__WEBPACK_IMPORTED_MODULE_96__ = __webpack_require__(/*! ./steps/imagine-choose-another-sprite.LTR.png */ "./src/lib/libraries/decks/steps/imagine-choose-another-sprite.LTR.png");
/* harmony import */ var _steps_imagine_left_right_sw_png__WEBPACK_IMPORTED_MODULE_97__ = __webpack_require__(/*! ./steps/imagine-left-right.sw.png */ "./src/lib/libraries/decks/steps/imagine-left-right.sw.png");
/* harmony import */ var _steps_imagine_up_down_sw_png__WEBPACK_IMPORTED_MODULE_98__ = __webpack_require__(/*! ./steps/imagine-up-down.sw.png */ "./src/lib/libraries/decks/steps/imagine-up-down.sw.png");
/* harmony import */ var _steps_imagine_change_costumes_sw_png__WEBPACK_IMPORTED_MODULE_99__ = __webpack_require__(/*! ./steps/imagine-change-costumes.sw.png */ "./src/lib/libraries/decks/steps/imagine-change-costumes.sw.png");
/* harmony import */ var _steps_imagine_glide_to_point_sw_png__WEBPACK_IMPORTED_MODULE_100__ = __webpack_require__(/*! ./steps/imagine-glide-to-point.sw.png */ "./src/lib/libraries/decks/steps/imagine-glide-to-point.sw.png");
/* harmony import */ var _steps_imagine_grow_shrink_sw_png__WEBPACK_IMPORTED_MODULE_101__ = __webpack_require__(/*! ./steps/imagine-grow-shrink.sw.png */ "./src/lib/libraries/decks/steps/imagine-grow-shrink.sw.png");
/* harmony import */ var _steps_imagine_choose_another_backdrop_LTR_png__WEBPACK_IMPORTED_MODULE_102__ = __webpack_require__(/*! ./steps/imagine-choose-another-backdrop.LTR.png */ "./src/lib/libraries/decks/steps/imagine-choose-another-backdrop.LTR.png");
/* harmony import */ var _steps_imagine_switch_backdrops_sw_png__WEBPACK_IMPORTED_MODULE_103__ = __webpack_require__(/*! ./steps/imagine-switch-backdrops.sw.png */ "./src/lib/libraries/decks/steps/imagine-switch-backdrops.sw.png");
/* harmony import */ var _steps_imagine_record_a_sound_sw_gif__WEBPACK_IMPORTED_MODULE_104__ = __webpack_require__(/*! ./steps/imagine-record-a-sound.sw.gif */ "./src/lib/libraries/decks/steps/imagine-record-a-sound.sw.gif");
/* harmony import */ var _steps_imagine_choose_sound_sw_png__WEBPACK_IMPORTED_MODULE_105__ = __webpack_require__(/*! ./steps/imagine-choose-sound.sw.png */ "./src/lib/libraries/decks/steps/imagine-choose-sound.sw.png");
/* harmony import */ var _steps_add_backdrop_LTR_png__WEBPACK_IMPORTED_MODULE_106__ = __webpack_require__(/*! ./steps/add-backdrop.LTR.png */ "./src/lib/libraries/decks/steps/add-backdrop.LTR.png");
/* harmony import */ var _steps_add_effects_sw_png__WEBPACK_IMPORTED_MODULE_107__ = __webpack_require__(/*! ./steps/add-effects.sw.png */ "./src/lib/libraries/decks/steps/add-effects.sw.png");
/* harmony import */ var _steps_hide_show_sw_png__WEBPACK_IMPORTED_MODULE_108__ = __webpack_require__(/*! ./steps/hide-show.sw.png */ "./src/lib/libraries/decks/steps/hide-show.sw.png");
/* harmony import */ var _steps_switch_costumes_sw_png__WEBPACK_IMPORTED_MODULE_109__ = __webpack_require__(/*! ./steps/switch-costumes.sw.png */ "./src/lib/libraries/decks/steps/switch-costumes.sw.png");
/* harmony import */ var _steps_change_size_sw_png__WEBPACK_IMPORTED_MODULE_110__ = __webpack_require__(/*! ./steps/change-size.sw.png */ "./src/lib/libraries/decks/steps/change-size.sw.png");
/* harmony import */ var _steps_spin_turn_sw_png__WEBPACK_IMPORTED_MODULE_111__ = __webpack_require__(/*! ./steps/spin-turn.sw.png */ "./src/lib/libraries/decks/steps/spin-turn.sw.png");
/* harmony import */ var _steps_spin_point_in_direction_sw_png__WEBPACK_IMPORTED_MODULE_112__ = __webpack_require__(/*! ./steps/spin-point-in-direction.sw.png */ "./src/lib/libraries/decks/steps/spin-point-in-direction.sw.png");
/* harmony import */ var _steps_record_a_sound_sounds_tab_sw_png__WEBPACK_IMPORTED_MODULE_113__ = __webpack_require__(/*! ./steps/record-a-sound-sounds-tab.sw.png */ "./src/lib/libraries/decks/steps/record-a-sound-sounds-tab.sw.png");
/* harmony import */ var _steps_record_a_sound_click_record_sw_png__WEBPACK_IMPORTED_MODULE_114__ = __webpack_require__(/*! ./steps/record-a-sound-click-record.sw.png */ "./src/lib/libraries/decks/steps/record-a-sound-click-record.sw.png");
/* harmony import */ var _steps_record_a_sound_press_record_button_sw_png__WEBPACK_IMPORTED_MODULE_115__ = __webpack_require__(/*! ./steps/record-a-sound-press-record-button.sw.png */ "./src/lib/libraries/decks/steps/record-a-sound-press-record-button.sw.png");
/* harmony import */ var _steps_record_a_sound_choose_sound_sw_png__WEBPACK_IMPORTED_MODULE_116__ = __webpack_require__(/*! ./steps/record-a-sound-choose-sound.sw.png */ "./src/lib/libraries/decks/steps/record-a-sound-choose-sound.sw.png");
/* harmony import */ var _steps_record_a_sound_play_your_sound_sw_png__WEBPACK_IMPORTED_MODULE_117__ = __webpack_require__(/*! ./steps/record-a-sound-play-your-sound.sw.png */ "./src/lib/libraries/decks/steps/record-a-sound-play-your-sound.sw.png");
/* harmony import */ var _steps_move_arrow_keys_left_right_sw_png__WEBPACK_IMPORTED_MODULE_118__ = __webpack_require__(/*! ./steps/move-arrow-keys-left-right.sw.png */ "./src/lib/libraries/decks/steps/move-arrow-keys-left-right.sw.png");
/* harmony import */ var _steps_move_arrow_keys_up_down_sw_png__WEBPACK_IMPORTED_MODULE_119__ = __webpack_require__(/*! ./steps/move-arrow-keys-up-down.sw.png */ "./src/lib/libraries/decks/steps/move-arrow-keys-up-down.sw.png");
/* harmony import */ var _steps_glide_around_back_and_forth_sw_png__WEBPACK_IMPORTED_MODULE_120__ = __webpack_require__(/*! ./steps/glide-around-back-and-forth.sw.png */ "./src/lib/libraries/decks/steps/glide-around-back-and-forth.sw.png");
/* harmony import */ var _steps_glide_around_point_sw_png__WEBPACK_IMPORTED_MODULE_121__ = __webpack_require__(/*! ./steps/glide-around-point.sw.png */ "./src/lib/libraries/decks/steps/glide-around-point.sw.png");
/* harmony import */ var _steps_code_cartoon_01_say_something_sw_png__WEBPACK_IMPORTED_MODULE_122__ = __webpack_require__(/*! ./steps/code-cartoon-01-say-something.sw.png */ "./src/lib/libraries/decks/steps/code-cartoon-01-say-something.sw.png");
/* harmony import */ var _steps_code_cartoon_02_animate_sw_png__WEBPACK_IMPORTED_MODULE_123__ = __webpack_require__(/*! ./steps/code-cartoon-02-animate.sw.png */ "./src/lib/libraries/decks/steps/code-cartoon-02-animate.sw.png");
/* harmony import */ var _steps_code_cartoon_03_select_different_character_LTR_png__WEBPACK_IMPORTED_MODULE_124__ = __webpack_require__(/*! ./steps/code-cartoon-03-select-different-character.LTR.png */ "./src/lib/libraries/decks/steps/code-cartoon-03-select-different-character.LTR.png");
/* harmony import */ var _steps_code_cartoon_04_use_minus_sign_sw_png__WEBPACK_IMPORTED_MODULE_125__ = __webpack_require__(/*! ./steps/code-cartoon-04-use-minus-sign.sw.png */ "./src/lib/libraries/decks/steps/code-cartoon-04-use-minus-sign.sw.png");
/* harmony import */ var _steps_code_cartoon_05_grow_shrink_sw_png__WEBPACK_IMPORTED_MODULE_126__ = __webpack_require__(/*! ./steps/code-cartoon-05-grow-shrink.sw.png */ "./src/lib/libraries/decks/steps/code-cartoon-05-grow-shrink.sw.png");
/* harmony import */ var _steps_code_cartoon_06_select_another_different_character_LTR_png__WEBPACK_IMPORTED_MODULE_127__ = __webpack_require__(/*! ./steps/code-cartoon-06-select-another-different-character.LTR.png */ "./src/lib/libraries/decks/steps/code-cartoon-06-select-another-different-character.LTR.png");
/* harmony import */ var _steps_code_cartoon_07_jump_sw_png__WEBPACK_IMPORTED_MODULE_128__ = __webpack_require__(/*! ./steps/code-cartoon-07-jump.sw.png */ "./src/lib/libraries/decks/steps/code-cartoon-07-jump.sw.png");
/* harmony import */ var _steps_code_cartoon_08_change_scenes_sw_png__WEBPACK_IMPORTED_MODULE_129__ = __webpack_require__(/*! ./steps/code-cartoon-08-change-scenes.sw.png */ "./src/lib/libraries/decks/steps/code-cartoon-08-change-scenes.sw.png");
/* harmony import */ var _steps_code_cartoon_09_glide_around_sw_png__WEBPACK_IMPORTED_MODULE_130__ = __webpack_require__(/*! ./steps/code-cartoon-09-glide-around.sw.png */ "./src/lib/libraries/decks/steps/code-cartoon-09-glide-around.sw.png");
/* harmony import */ var _steps_code_cartoon_10_change_costumes_sw_png__WEBPACK_IMPORTED_MODULE_131__ = __webpack_require__(/*! ./steps/code-cartoon-10-change-costumes.sw.png */ "./src/lib/libraries/decks/steps/code-cartoon-10-change-costumes.sw.png");
/* harmony import */ var _steps_code_cartoon_11_choose_more_characters_LTR_png__WEBPACK_IMPORTED_MODULE_132__ = __webpack_require__(/*! ./steps/code-cartoon-11-choose-more-characters.LTR.png */ "./src/lib/libraries/decks/steps/code-cartoon-11-choose-more-characters.LTR.png");
/* harmony import */ var _steps_talking_2_choose_sprite_LTR_png__WEBPACK_IMPORTED_MODULE_133__ = __webpack_require__(/*! ./steps/talking-2-choose-sprite.LTR.png */ "./src/lib/libraries/decks/steps/talking-2-choose-sprite.LTR.png");
/* harmony import */ var _steps_talking_3_say_something_sw_png__WEBPACK_IMPORTED_MODULE_134__ = __webpack_require__(/*! ./steps/talking-3-say-something.sw.png */ "./src/lib/libraries/decks/steps/talking-3-say-something.sw.png");
/* harmony import */ var _steps_talking_4_choose_backdrop_LTR_png__WEBPACK_IMPORTED_MODULE_135__ = __webpack_require__(/*! ./steps/talking-4-choose-backdrop.LTR.png */ "./src/lib/libraries/decks/steps/talking-4-choose-backdrop.LTR.png");
/* harmony import */ var _steps_talking_5_switch_backdrop_sw_png__WEBPACK_IMPORTED_MODULE_136__ = __webpack_require__(/*! ./steps/talking-5-switch-backdrop.sw.png */ "./src/lib/libraries/decks/steps/talking-5-switch-backdrop.sw.png");
/* harmony import */ var _steps_talking_6_choose_another_sprite_LTR_png__WEBPACK_IMPORTED_MODULE_137__ = __webpack_require__(/*! ./steps/talking-6-choose-another-sprite.LTR.png */ "./src/lib/libraries/decks/steps/talking-6-choose-another-sprite.LTR.png");
/* harmony import */ var _steps_talking_7_move_around_sw_png__WEBPACK_IMPORTED_MODULE_138__ = __webpack_require__(/*! ./steps/talking-7-move-around.sw.png */ "./src/lib/libraries/decks/steps/talking-7-move-around.sw.png");
/* harmony import */ var _steps_talking_8_choose_another_backdrop_LTR_png__WEBPACK_IMPORTED_MODULE_139__ = __webpack_require__(/*! ./steps/talking-8-choose-another-backdrop.LTR.png */ "./src/lib/libraries/decks/steps/talking-8-choose-another-backdrop.LTR.png");
/* harmony import */ var _steps_talking_9_animate_sw_png__WEBPACK_IMPORTED_MODULE_140__ = __webpack_require__(/*! ./steps/talking-9-animate.sw.png */ "./src/lib/libraries/decks/steps/talking-9-animate.sw.png");
/* harmony import */ var _steps_talking_10_choose_third_backdrop_LTR_png__WEBPACK_IMPORTED_MODULE_141__ = __webpack_require__(/*! ./steps/talking-10-choose-third-backdrop.LTR.png */ "./src/lib/libraries/decks/steps/talking-10-choose-third-backdrop.LTR.png");
/* harmony import */ var _steps_talking_11_choose_sound_sw_gif__WEBPACK_IMPORTED_MODULE_142__ = __webpack_require__(/*! ./steps/talking-11-choose-sound.sw.gif */ "./src/lib/libraries/decks/steps/talking-11-choose-sound.sw.gif");
/* harmony import */ var _steps_talking_12_dance_moves_sw_png__WEBPACK_IMPORTED_MODULE_143__ = __webpack_require__(/*! ./steps/talking-12-dance-moves.sw.png */ "./src/lib/libraries/decks/steps/talking-12-dance-moves.sw.png");
/* harmony import */ var _steps_talking_13_ask_and_answer_sw_png__WEBPACK_IMPORTED_MODULE_144__ = __webpack_require__(/*! ./steps/talking-13-ask-and-answer.sw.png */ "./src/lib/libraries/decks/steps/talking-13-ask-and-answer.sw.png");
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













const swImages = {
  // Intro
  introMove: _steps_intro_1_move_sw_gif__WEBPACK_IMPORTED_MODULE_0__,
  introSay: _steps_intro_2_say_sw_gif__WEBPACK_IMPORTED_MODULE_1__,
  introGreenFlag: _steps_intro_3_green_flag_sw_gif__WEBPACK_IMPORTED_MODULE_2__,
  // Text to Speech
  speechAddExtension: _steps_speech_add_extension_sw_gif__WEBPACK_IMPORTED_MODULE_3__,
  speechSaySomething: _steps_speech_say_something_sw_png__WEBPACK_IMPORTED_MODULE_4__,
  speechSetVoice: _steps_speech_set_voice_sw_png__WEBPACK_IMPORTED_MODULE_5__,
  speechMoveAround: _steps_speech_move_around_sw_png__WEBPACK_IMPORTED_MODULE_6__,
  speechAddBackdrop: _steps_pick_backdrop_LTR_gif__WEBPACK_IMPORTED_MODULE_7__,
  speechAddSprite: _steps_speech_add_sprite_LTR_gif__WEBPACK_IMPORTED_MODULE_8__,
  speechSong: _steps_speech_song_sw_png__WEBPACK_IMPORTED_MODULE_9__,
  speechChangeColor: _steps_speech_change_color_sw_png__WEBPACK_IMPORTED_MODULE_10__,
  speechSpin: _steps_speech_spin_sw_png__WEBPACK_IMPORTED_MODULE_11__,
  speechGrowShrink: _steps_speech_grow_shrink_sw_png__WEBPACK_IMPORTED_MODULE_12__,
  // Cartoon Network
  cnShowCharacter: _steps_cn_show_character_LTR_gif__WEBPACK_IMPORTED_MODULE_13__,
  cnSay: _steps_cn_say_sw_png__WEBPACK_IMPORTED_MODULE_14__,
  cnGlide: _steps_cn_glide_sw_png__WEBPACK_IMPORTED_MODULE_15__,
  cnPickSprite: _steps_cn_pick_sprite_LTR_gif__WEBPACK_IMPORTED_MODULE_16__,
  cnCollect: _steps_cn_collect_sw_png__WEBPACK_IMPORTED_MODULE_17__,
  cnVariable: _steps_add_variable_sw_gif__WEBPACK_IMPORTED_MODULE_18__,
  cnScore: _steps_cn_score_sw_png__WEBPACK_IMPORTED_MODULE_19__,
  cnBackdrop: _steps_cn_backdrop_sw_png__WEBPACK_IMPORTED_MODULE_20__,
  // Add sprite
  addSprite: _steps_add_sprite_LTR_gif__WEBPACK_IMPORTED_MODULE_21__,
  // Animate a name
  namePickLetter: _steps_name_pick_letter_LTR_gif__WEBPACK_IMPORTED_MODULE_22__,
  namePlaySound: _steps_name_play_sound_sw_png__WEBPACK_IMPORTED_MODULE_23__,
  namePickLetter2: _steps_name_pick_letter2_LTR_gif__WEBPACK_IMPORTED_MODULE_24__,
  nameChangeColor: _steps_name_change_color_sw_png__WEBPACK_IMPORTED_MODULE_25__,
  nameSpin: _steps_name_spin_sw_png__WEBPACK_IMPORTED_MODULE_26__,
  nameGrow: _steps_name_grow_sw_png__WEBPACK_IMPORTED_MODULE_27__,
  // Make-Music
  musicPickInstrument: _steps_music_pick_instrument_LTR_gif__WEBPACK_IMPORTED_MODULE_28__,
  musicPlaySound: _steps_music_play_sound_sw_png__WEBPACK_IMPORTED_MODULE_29__,
  musicMakeSong: _steps_music_make_song_sw_png__WEBPACK_IMPORTED_MODULE_30__,
  musicMakeBeat: _steps_music_make_beat_sw_png__WEBPACK_IMPORTED_MODULE_31__,
  musicMakeBeatbox: _steps_music_make_beatbox_sw_png__WEBPACK_IMPORTED_MODULE_32__,
  // Chase-Game
  chaseGameAddBackdrop: _steps_chase_game_add_backdrop_LTR_gif__WEBPACK_IMPORTED_MODULE_33__,
  chaseGameAddSprite1: _steps_chase_game_add_sprite1_LTR_gif__WEBPACK_IMPORTED_MODULE_34__,
  chaseGameRightLeft: _steps_chase_game_right_left_sw_png__WEBPACK_IMPORTED_MODULE_35__,
  chaseGameUpDown: _steps_chase_game_up_down_sw_png__WEBPACK_IMPORTED_MODULE_36__,
  chaseGameAddSprite2: _steps_chase_game_add_sprite2_LTR_gif__WEBPACK_IMPORTED_MODULE_37__,
  chaseGameMoveRandomly: _steps_chase_game_move_randomly_sw_png__WEBPACK_IMPORTED_MODULE_38__,
  chaseGamePlaySound: _steps_chase_game_play_sound_sw_png__WEBPACK_IMPORTED_MODULE_39__,
  chaseGameAddVariable: _steps_add_variable_sw_gif__WEBPACK_IMPORTED_MODULE_18__,
  chaseGameChangeScore: _steps_chase_game_change_score_sw_png__WEBPACK_IMPORTED_MODULE_40__,
  // Make-A-Pop/Clicker Game
  popGamePickSprite: _steps_pop_game_pick_sprite_LTR_gif__WEBPACK_IMPORTED_MODULE_41__,
  popGamePlaySound: _steps_pop_game_play_sound_sw_png__WEBPACK_IMPORTED_MODULE_42__,
  popGameAddScore: _steps_add_variable_sw_gif__WEBPACK_IMPORTED_MODULE_18__,
  popGameChangeScore: _steps_pop_game_change_score_sw_png__WEBPACK_IMPORTED_MODULE_43__,
  popGameRandomPosition: _steps_pop_game_random_position_sw_png__WEBPACK_IMPORTED_MODULE_44__,
  popGameChangeColor: _steps_pop_game_change_color_sw_png__WEBPACK_IMPORTED_MODULE_45__,
  popGameResetScore: _steps_pop_game_reset_score_sw_png__WEBPACK_IMPORTED_MODULE_46__,
  // Animate A Character
  animateCharPickBackdrop: _steps_pick_backdrop_LTR_gif__WEBPACK_IMPORTED_MODULE_7__,
  animateCharPickSprite: _steps_animate_char_pick_sprite_LTR_gif__WEBPACK_IMPORTED_MODULE_47__,
  animateCharSaySomething: _steps_animate_char_say_something_sw_png__WEBPACK_IMPORTED_MODULE_48__,
  animateCharAddSound: _steps_animate_char_add_sound_sw_png__WEBPACK_IMPORTED_MODULE_49__,
  animateCharTalk: _steps_animate_char_talk_sw_png__WEBPACK_IMPORTED_MODULE_50__,
  animateCharMove: _steps_animate_char_move_sw_png__WEBPACK_IMPORTED_MODULE_51__,
  animateCharJump: _steps_animate_char_jump_sw_png__WEBPACK_IMPORTED_MODULE_52__,
  animateCharChangeColor: _steps_animate_char_change_color_sw_png__WEBPACK_IMPORTED_MODULE_53__,
  // Tell A Story
  storyPickBackdrop: _steps_story_pick_backdrop_LTR_gif__WEBPACK_IMPORTED_MODULE_54__,
  storyPickSprite: _steps_story_pick_sprite_LTR_gif__WEBPACK_IMPORTED_MODULE_55__,
  storySaySomething: _steps_story_say_something_sw_png__WEBPACK_IMPORTED_MODULE_56__,
  storyPickSprite2: _steps_story_pick_sprite2_LTR_gif__WEBPACK_IMPORTED_MODULE_57__,
  storyFlip: _steps_story_flip_sw_gif__WEBPACK_IMPORTED_MODULE_58__,
  storyConversation: _steps_story_conversation_sw_png__WEBPACK_IMPORTED_MODULE_59__,
  storyPickBackdrop2: _steps_story_pick_backdrop2_LTR_gif__WEBPACK_IMPORTED_MODULE_60__,
  storySwitchBackdrop: _steps_story_switch_backdrop_sw_png__WEBPACK_IMPORTED_MODULE_61__,
  storyHideCharacter: _steps_story_hide_character_sw_png__WEBPACK_IMPORTED_MODULE_62__,
  storyShowCharacter: _steps_story_show_character_sw_png__WEBPACK_IMPORTED_MODULE_63__,
  // Video Sensing
  videoAddExtension: _steps_video_add_extension_sw_gif__WEBPACK_IMPORTED_MODULE_64__,
  videoPet: _steps_video_pet_sw_png__WEBPACK_IMPORTED_MODULE_65__,
  videoAnimate: _steps_video_animate_sw_png__WEBPACK_IMPORTED_MODULE_66__,
  videoPop: _steps_video_pop_sw_png__WEBPACK_IMPORTED_MODULE_67__,
  // Make it Fly
  flyChooseBackdrop: _steps_fly_choose_backdrop_LTR_gif__WEBPACK_IMPORTED_MODULE_68__,
  flyChooseCharacter: _steps_fly_choose_character_LTR_png__WEBPACK_IMPORTED_MODULE_69__,
  flySaySomething: _steps_fly_say_something_sw_png__WEBPACK_IMPORTED_MODULE_70__,
  flyMoveArrows: _steps_fly_make_interactive_sw_png__WEBPACK_IMPORTED_MODULE_71__,
  flyChooseObject: _steps_fly_object_to_collect_LTR_png__WEBPACK_IMPORTED_MODULE_72__,
  flyFlyingObject: _steps_fly_flying_heart_sw_png__WEBPACK_IMPORTED_MODULE_73__,
  flySelectFlyingSprite: _steps_fly_select_flyer_LTR_png__WEBPACK_IMPORTED_MODULE_74__,
  flyAddScore: _steps_add_variable_sw_gif__WEBPACK_IMPORTED_MODULE_18__,
  flyKeepScore: _steps_fly_keep_score_sw_png__WEBPACK_IMPORTED_MODULE_75__,
  flyAddScenery: _steps_fly_choose_scenery_LTR_gif__WEBPACK_IMPORTED_MODULE_76__,
  flyMoveScenery: _steps_fly_move_scenery_sw_png__WEBPACK_IMPORTED_MODULE_77__,
  flySwitchLooks: _steps_fly_switch_costume_sw_png__WEBPACK_IMPORTED_MODULE_78__,
  // Pong
  pongAddBackdrop: _steps_pong_add_backdrop_LTR_png__WEBPACK_IMPORTED_MODULE_79__,
  pongAddBallSprite: _steps_pong_add_ball_sprite_LTR_png__WEBPACK_IMPORTED_MODULE_80__,
  pongBounceAround: _steps_pong_bounce_around_sw_png__WEBPACK_IMPORTED_MODULE_81__,
  pongAddPaddle: _steps_pong_add_a_paddle_LTR_gif__WEBPACK_IMPORTED_MODULE_82__,
  pongMoveThePaddle: _steps_pong_move_the_paddle_sw_png__WEBPACK_IMPORTED_MODULE_83__,
  pongSelectBallSprite: _steps_pong_select_ball_LTR_png__WEBPACK_IMPORTED_MODULE_84__,
  pongAddMoreCodeToBall: _steps_pong_add_code_to_ball_sw_png__WEBPACK_IMPORTED_MODULE_85__,
  pongAddAScore: _steps_add_variable_sw_gif__WEBPACK_IMPORTED_MODULE_18__,
  pongChooseScoreFromMenu: _steps_pong_choose_score_sw_png__WEBPACK_IMPORTED_MODULE_86__,
  pongInsertChangeScoreBlock: _steps_pong_insert_change_score_sw_png__WEBPACK_IMPORTED_MODULE_87__,
  pongResetScore: _steps_pong_reset_score_sw_png__WEBPACK_IMPORTED_MODULE_88__,
  pongAddLineSprite: _steps_pong_add_line_LTR_gif__WEBPACK_IMPORTED_MODULE_89__,
  pongGameOver: _steps_pong_game_over_sw_png__WEBPACK_IMPORTED_MODULE_90__,
  // Imagine a World
  imagineTypeWhatYouWant: _steps_imagine_type_what_you_want_sw_png__WEBPACK_IMPORTED_MODULE_91__,
  imagineClickGreenFlag: _steps_imagine_click_green_flag_sw_png__WEBPACK_IMPORTED_MODULE_92__,
  imagineChooseBackdrop: _steps_imagine_choose_backdrop_LTR_png__WEBPACK_IMPORTED_MODULE_93__,
  imagineChooseSprite: _steps_imagine_choose_any_sprite_LTR_png__WEBPACK_IMPORTED_MODULE_94__,
  imagineFlyAround: _steps_imagine_fly_around_sw_png__WEBPACK_IMPORTED_MODULE_95__,
  imagineChooseAnotherSprite: _steps_imagine_choose_another_sprite_LTR_png__WEBPACK_IMPORTED_MODULE_96__,
  imagineLeftRight: _steps_imagine_left_right_sw_png__WEBPACK_IMPORTED_MODULE_97__,
  imagineUpDown: _steps_imagine_up_down_sw_png__WEBPACK_IMPORTED_MODULE_98__,
  imagineChangeCostumes: _steps_imagine_change_costumes_sw_png__WEBPACK_IMPORTED_MODULE_99__,
  imagineGlideToPoint: _steps_imagine_glide_to_point_sw_png__WEBPACK_IMPORTED_MODULE_100__,
  imagineGrowShrink: _steps_imagine_grow_shrink_sw_png__WEBPACK_IMPORTED_MODULE_101__,
  imagineChooseAnotherBackdrop: _steps_imagine_choose_another_backdrop_LTR_png__WEBPACK_IMPORTED_MODULE_102__,
  imagineSwitchBackdrops: _steps_imagine_switch_backdrops_sw_png__WEBPACK_IMPORTED_MODULE_103__,
  imagineRecordASound: _steps_imagine_record_a_sound_sw_gif__WEBPACK_IMPORTED_MODULE_104__,
  imagineChooseSound: _steps_imagine_choose_sound_sw_png__WEBPACK_IMPORTED_MODULE_105__,
  // Add a Backdrop
  addBackdrop: _steps_add_backdrop_LTR_png__WEBPACK_IMPORTED_MODULE_106__,
  // Add Effects
  addEffects: _steps_add_effects_sw_png__WEBPACK_IMPORTED_MODULE_107__,
  // Hide and Show
  hideAndShow: _steps_hide_show_sw_png__WEBPACK_IMPORTED_MODULE_108__,
  // Switch Costumes
  switchCostumes: _steps_switch_costumes_sw_png__WEBPACK_IMPORTED_MODULE_109__,
  // Change Size
  changeSize: _steps_change_size_sw_png__WEBPACK_IMPORTED_MODULE_110__,
  // Spin
  spinTurn: _steps_spin_turn_sw_png__WEBPACK_IMPORTED_MODULE_111__,
  spinPointInDirection: _steps_spin_point_in_direction_sw_png__WEBPACK_IMPORTED_MODULE_112__,
  // Record a Sound
  recordASoundSoundsTab: _steps_record_a_sound_sounds_tab_sw_png__WEBPACK_IMPORTED_MODULE_113__,
  recordASoundClickRecord: _steps_record_a_sound_click_record_sw_png__WEBPACK_IMPORTED_MODULE_114__,
  recordASoundPressRecordButton: _steps_record_a_sound_press_record_button_sw_png__WEBPACK_IMPORTED_MODULE_115__,
  recordASoundChooseSound: _steps_record_a_sound_choose_sound_sw_png__WEBPACK_IMPORTED_MODULE_116__,
  recordASoundPlayYourSound: _steps_record_a_sound_play_your_sound_sw_png__WEBPACK_IMPORTED_MODULE_117__,
  // Use Arrow Keys
  moveArrowKeysLeftRight: _steps_move_arrow_keys_left_right_sw_png__WEBPACK_IMPORTED_MODULE_118__,
  moveArrowKeysUpDown: _steps_move_arrow_keys_up_down_sw_png__WEBPACK_IMPORTED_MODULE_119__,
  // Glide Around
  glideAroundBackAndForth: _steps_glide_around_back_and_forth_sw_png__WEBPACK_IMPORTED_MODULE_120__,
  glideAroundPoint: _steps_glide_around_point_sw_png__WEBPACK_IMPORTED_MODULE_121__,
  // Code a Cartoon
  codeCartoonSaySomething: _steps_code_cartoon_01_say_something_sw_png__WEBPACK_IMPORTED_MODULE_122__,
  codeCartoonAnimate: _steps_code_cartoon_02_animate_sw_png__WEBPACK_IMPORTED_MODULE_123__,
  codeCartoonSelectDifferentCharacter: _steps_code_cartoon_03_select_different_character_LTR_png__WEBPACK_IMPORTED_MODULE_124__,
  codeCartoonUseMinusSign: _steps_code_cartoon_04_use_minus_sign_sw_png__WEBPACK_IMPORTED_MODULE_125__,
  codeCartoonGrowShrink: _steps_code_cartoon_05_grow_shrink_sw_png__WEBPACK_IMPORTED_MODULE_126__,
  codeCartoonSelectDifferentCharacter2: _steps_code_cartoon_06_select_another_different_character_LTR_png__WEBPACK_IMPORTED_MODULE_127__,
  codeCartoonJump: _steps_code_cartoon_07_jump_sw_png__WEBPACK_IMPORTED_MODULE_128__,
  codeCartoonChangeScenes: _steps_code_cartoon_08_change_scenes_sw_png__WEBPACK_IMPORTED_MODULE_129__,
  codeCartoonGlideAround: _steps_code_cartoon_09_glide_around_sw_png__WEBPACK_IMPORTED_MODULE_130__,
  codeCartoonChangeCostumes: _steps_code_cartoon_10_change_costumes_sw_png__WEBPACK_IMPORTED_MODULE_131__,
  codeCartoonChooseMoreCharacters: _steps_code_cartoon_11_choose_more_characters_LTR_png__WEBPACK_IMPORTED_MODULE_132__,
  // Talking Tales
  talesAddExtension: _steps_speech_add_extension_sw_gif__WEBPACK_IMPORTED_MODULE_3__,
  talesChooseSprite: _steps_talking_2_choose_sprite_LTR_png__WEBPACK_IMPORTED_MODULE_133__,
  talesSaySomething: _steps_talking_3_say_something_sw_png__WEBPACK_IMPORTED_MODULE_134__,
  talesAskAnswer: _steps_talking_13_ask_and_answer_sw_png__WEBPACK_IMPORTED_MODULE_144__,
  talesChooseBackdrop: _steps_talking_4_choose_backdrop_LTR_png__WEBPACK_IMPORTED_MODULE_135__,
  talesSwitchBackdrop: _steps_talking_5_switch_backdrop_sw_png__WEBPACK_IMPORTED_MODULE_136__,
  talesChooseAnotherSprite: _steps_talking_6_choose_another_sprite_LTR_png__WEBPACK_IMPORTED_MODULE_137__,
  talesMoveAround: _steps_talking_7_move_around_sw_png__WEBPACK_IMPORTED_MODULE_138__,
  talesChooseAnotherBackdrop: _steps_talking_8_choose_another_backdrop_LTR_png__WEBPACK_IMPORTED_MODULE_139__,
  talesAnimateTalking: _steps_talking_9_animate_sw_png__WEBPACK_IMPORTED_MODULE_140__,
  talesChooseThirdBackdrop: _steps_talking_10_choose_third_backdrop_LTR_png__WEBPACK_IMPORTED_MODULE_141__,
  talesChooseSound: _steps_talking_11_choose_sound_sw_gif__WEBPACK_IMPORTED_MODULE_142__,
  talesDanceMoves: _steps_talking_12_dance_moves_sw_png__WEBPACK_IMPORTED_MODULE_143__
};


/***/ }),

/***/ "./src/lib/libraries/decks/steps/add-effects.sw.png":
/*!**********************************************************!*\
  !*** ./src/lib/libraries/decks/steps/add-effects.sw.png ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/add-effects.sw.c8410e60bab3bd08a064.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/add-variable.sw.gif":
/*!***********************************************************!*\
  !*** ./src/lib/libraries/decks/steps/add-variable.sw.gif ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/add-variable.sw.9f1776ddf20a1b3fb344.gif";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/animate-char-add-sound.sw.png":
/*!*********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/animate-char-add-sound.sw.png ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/animate-char-add-sound.sw.6373bf8e1f84c3c386d3.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/animate-char-change-color.sw.png":
/*!************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/animate-char-change-color.sw.png ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/animate-char-change-color.sw.db47ee04a729fa666665.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/animate-char-jump.sw.png":
/*!****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/animate-char-jump.sw.png ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/animate-char-jump.sw.3f8289d57d26463aa9b8.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/animate-char-move.sw.png":
/*!****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/animate-char-move.sw.png ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/animate-char-move.sw.ce178fd6231a3fd49e41.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/animate-char-say-something.sw.png":
/*!*************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/animate-char-say-something.sw.png ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/animate-char-say-something.sw.b004350722c10125eff2.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/animate-char-talk.sw.png":
/*!****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/animate-char-talk.sw.png ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/animate-char-talk.sw.30f70e9adf952afde3ca.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/change-size.sw.png":
/*!**********************************************************!*\
  !*** ./src/lib/libraries/decks/steps/change-size.sw.png ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/change-size.sw.d15321b4fdd9373c0cde.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/chase-game-change-score.sw.png":
/*!**********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/chase-game-change-score.sw.png ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/chase-game-change-score.sw.d4fe100f256602e11862.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/chase-game-move-randomly.sw.png":
/*!***********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/chase-game-move-randomly.sw.png ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/chase-game-move-randomly.sw.ccddb0365477df3d54dd.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/chase-game-play-sound.sw.png":
/*!********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/chase-game-play-sound.sw.png ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/chase-game-play-sound.sw.8a4839aab6ddf893a6e0.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/chase-game-right-left.sw.png":
/*!********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/chase-game-right-left.sw.png ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/chase-game-right-left.sw.3ac443eafcaa1a80e24d.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/chase-game-up-down.sw.png":
/*!*****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/chase-game-up-down.sw.png ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/chase-game-up-down.sw.fbe1708002c1a432c3ba.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/cn-backdrop.sw.png":
/*!**********************************************************!*\
  !*** ./src/lib/libraries/decks/steps/cn-backdrop.sw.png ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/cn-backdrop.sw.f720f10e8c4faddcc14e.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/cn-collect.sw.png":
/*!*********************************************************!*\
  !*** ./src/lib/libraries/decks/steps/cn-collect.sw.png ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/cn-collect.sw.f8423848e17fdc2a2d9f.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/cn-glide.sw.png":
/*!*******************************************************!*\
  !*** ./src/lib/libraries/decks/steps/cn-glide.sw.png ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/cn-glide.sw.9c52c0671977b439e298.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/cn-say.sw.png":
/*!*****************************************************!*\
  !*** ./src/lib/libraries/decks/steps/cn-say.sw.png ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/cn-say.sw.a2d556971a96878bd8c8.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/cn-score.sw.png":
/*!*******************************************************!*\
  !*** ./src/lib/libraries/decks/steps/cn-score.sw.png ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/cn-score.sw.01ecb5c5e85c538562b5.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/code-cartoon-01-say-something.sw.png":
/*!****************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/code-cartoon-01-say-something.sw.png ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/code-cartoon-01-say-something.sw.672f31f729519c786b77.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/code-cartoon-02-animate.sw.png":
/*!**********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/code-cartoon-02-animate.sw.png ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/code-cartoon-02-animate.sw.15b2dce847c2f225aa85.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/code-cartoon-04-use-minus-sign.sw.png":
/*!*****************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/code-cartoon-04-use-minus-sign.sw.png ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/code-cartoon-04-use-minus-sign.sw.71c11300ab86742cb08b.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/code-cartoon-05-grow-shrink.sw.png":
/*!**************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/code-cartoon-05-grow-shrink.sw.png ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/code-cartoon-05-grow-shrink.sw.0566d75484d4a52dfb7c.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/code-cartoon-07-jump.sw.png":
/*!*******************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/code-cartoon-07-jump.sw.png ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/code-cartoon-07-jump.sw.402decf337dccfec5aab.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/code-cartoon-08-change-scenes.sw.png":
/*!****************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/code-cartoon-08-change-scenes.sw.png ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/code-cartoon-08-change-scenes.sw.ae9fc42a338ea62e086f.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/code-cartoon-09-glide-around.sw.png":
/*!***************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/code-cartoon-09-glide-around.sw.png ***!
  \***************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/code-cartoon-09-glide-around.sw.4522cb3ec474c9af0a4f.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/code-cartoon-10-change-costumes.sw.png":
/*!******************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/code-cartoon-10-change-costumes.sw.png ***!
  \******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/code-cartoon-10-change-costumes.sw.5606d16361f459327ce8.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/fly-flying-heart.sw.png":
/*!***************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/fly-flying-heart.sw.png ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/fly-flying-heart.sw.17410cdca8e558e00d50.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/fly-keep-score.sw.png":
/*!*************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/fly-keep-score.sw.png ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/fly-keep-score.sw.bfea9c64995f8adeb97e.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/fly-make-interactive.sw.png":
/*!*******************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/fly-make-interactive.sw.png ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/fly-make-interactive.sw.23c708f0226e78e85481.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/fly-move-scenery.sw.png":
/*!***************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/fly-move-scenery.sw.png ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/fly-move-scenery.sw.2d57e0e21e176d028d92.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/fly-say-something.sw.png":
/*!****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/fly-say-something.sw.png ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/fly-say-something.sw.f8e32099c8ac2675b8aa.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/fly-switch-costume.sw.png":
/*!*****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/fly-switch-costume.sw.png ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/fly-switch-costume.sw.e2c8b96e2d9261792bab.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/glide-around-back-and-forth.sw.png":
/*!**************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/glide-around-back-and-forth.sw.png ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/glide-around-back-and-forth.sw.d86d7d2db32ee8443853.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/glide-around-point.sw.png":
/*!*****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/glide-around-point.sw.png ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/glide-around-point.sw.c7153ff83fd439ebcd08.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/hide-show.sw.png":
/*!********************************************************!*\
  !*** ./src/lib/libraries/decks/steps/hide-show.sw.png ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/hide-show.sw.b352e01827ae3a207874.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/imagine-change-costumes.sw.png":
/*!**********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/imagine-change-costumes.sw.png ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/imagine-change-costumes.sw.8bca916a717eba028cb5.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/imagine-choose-sound.sw.png":
/*!*******************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/imagine-choose-sound.sw.png ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/imagine-choose-sound.sw.9eb19525ce567dd718f3.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/imagine-click-green-flag.sw.png":
/*!***********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/imagine-click-green-flag.sw.png ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/imagine-click-green-flag.sw.004b32acb9fbfdd1c651.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/imagine-fly-around.sw.png":
/*!*****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/imagine-fly-around.sw.png ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/imagine-fly-around.sw.f4763ccc927754230ce6.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/imagine-glide-to-point.sw.png":
/*!*********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/imagine-glide-to-point.sw.png ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/imagine-glide-to-point.sw.d95a36a3c455c10f468d.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/imagine-grow-shrink.sw.png":
/*!******************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/imagine-grow-shrink.sw.png ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/imagine-grow-shrink.sw.24c1d356b9209daa0731.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/imagine-left-right.sw.png":
/*!*****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/imagine-left-right.sw.png ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/imagine-left-right.sw.e6aa36b434b36a3ca60e.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/imagine-record-a-sound.sw.gif":
/*!*********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/imagine-record-a-sound.sw.gif ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/imagine-record-a-sound.sw.d97e98405195f60d32c9.gif";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/imagine-switch-backdrops.sw.png":
/*!***********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/imagine-switch-backdrops.sw.png ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/imagine-switch-backdrops.sw.9e914b7f1c8ae6cd38b5.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/imagine-type-what-you-want.sw.png":
/*!*************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/imagine-type-what-you-want.sw.png ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/imagine-type-what-you-want.sw.d55194a9cecf2481794d.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/imagine-up-down.sw.png":
/*!**************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/imagine-up-down.sw.png ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/imagine-up-down.sw.84bce2763ab9e8c2e440.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/intro-1-move.sw.gif":
/*!***********************************************************!*\
  !*** ./src/lib/libraries/decks/steps/intro-1-move.sw.gif ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/intro-1-move.sw.6ddb31d96572df7c0e69.gif";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/intro-2-say.sw.gif":
/*!**********************************************************!*\
  !*** ./src/lib/libraries/decks/steps/intro-2-say.sw.gif ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/intro-2-say.sw.8a7a1c1f1fc09d434e24.gif";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/intro-3-green-flag.sw.gif":
/*!*****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/intro-3-green-flag.sw.gif ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/intro-3-green-flag.sw.cbb4427404d2a8ce5825.gif";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/move-arrow-keys-left-right.sw.png":
/*!*************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/move-arrow-keys-left-right.sw.png ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/move-arrow-keys-left-right.sw.c526b0c9f465ed5ece39.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/move-arrow-keys-up-down.sw.png":
/*!**********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/move-arrow-keys-up-down.sw.png ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/move-arrow-keys-up-down.sw.f07f9dcb2807e5d32eb7.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/music-make-beat.sw.png":
/*!**************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/music-make-beat.sw.png ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/music-make-beat.sw.5d71ca81104224dde790.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/music-make-beatbox.sw.png":
/*!*****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/music-make-beatbox.sw.png ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/music-make-beatbox.sw.4dca2421ff74798e7113.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/music-make-song.sw.png":
/*!**************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/music-make-song.sw.png ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/music-make-song.sw.04c149ec28081e903170.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/music-play-sound.sw.png":
/*!***************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/music-play-sound.sw.png ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/music-play-sound.sw.ab3aa9047cb05eb8291d.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/name-change-color.sw.png":
/*!****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/name-change-color.sw.png ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/name-change-color.sw.0c51b55f2564e9d344a9.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/name-grow.sw.png":
/*!********************************************************!*\
  !*** ./src/lib/libraries/decks/steps/name-grow.sw.png ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/name-grow.sw.6d41ca3b2ec2afa183cc.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/name-play-sound.sw.png":
/*!**************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/name-play-sound.sw.png ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/name-play-sound.sw.d2ac9aab78a8e4829662.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/name-spin.sw.png":
/*!********************************************************!*\
  !*** ./src/lib/libraries/decks/steps/name-spin.sw.png ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/name-spin.sw.b630975bca2c41c00cce.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/pong-add-code-to-ball.sw.png":
/*!********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/pong-add-code-to-ball.sw.png ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/pong-add-code-to-ball.sw.6e9f648baf94aaa36627.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/pong-bounce-around.sw.png":
/*!*****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/pong-bounce-around.sw.png ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/pong-bounce-around.sw.a2fdf3698fa5800a1f65.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/pong-choose-score.sw.png":
/*!****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/pong-choose-score.sw.png ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/pong-choose-score.sw.1e3786f9e82cfd160368.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/pong-game-over.sw.png":
/*!*************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/pong-game-over.sw.png ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/pong-game-over.sw.5d31bc547f0edd259727.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/pong-insert-change-score.sw.png":
/*!***********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/pong-insert-change-score.sw.png ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/pong-insert-change-score.sw.4fe6ed4c2def696a8542.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/pong-move-the-paddle.sw.png":
/*!*******************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/pong-move-the-paddle.sw.png ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/pong-move-the-paddle.sw.4c2788095715e75b7d92.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/pong-reset-score.sw.png":
/*!***************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/pong-reset-score.sw.png ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/pong-reset-score.sw.28c74054e2c31d57093d.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/pop-game-change-color.sw.png":
/*!********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/pop-game-change-color.sw.png ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/pop-game-change-color.sw.df11352dd7d21d36ff51.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/pop-game-change-score.sw.png":
/*!********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/pop-game-change-score.sw.png ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/pop-game-change-score.sw.fe8821c9587b0ecae441.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/pop-game-play-sound.sw.png":
/*!******************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/pop-game-play-sound.sw.png ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/pop-game-play-sound.sw.3a4a2dd730c7867f3659.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/pop-game-random-position.sw.png":
/*!***********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/pop-game-random-position.sw.png ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/pop-game-random-position.sw.b13e8d16332387c5255b.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/pop-game-reset-score.sw.png":
/*!*******************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/pop-game-reset-score.sw.png ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/pop-game-reset-score.sw.fab2ed0102e5399a1ef5.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/record-a-sound-choose-sound.sw.png":
/*!**************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/record-a-sound-choose-sound.sw.png ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/record-a-sound-choose-sound.sw.74cb660d23139d5d9a2b.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/record-a-sound-click-record.sw.png":
/*!**************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/record-a-sound-click-record.sw.png ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/record-a-sound-click-record.sw.e0490f13b25a90286cd3.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/record-a-sound-play-your-sound.sw.png":
/*!*****************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/record-a-sound-play-your-sound.sw.png ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = "data:image/png;base64,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";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/record-a-sound-press-record-button.sw.png":
/*!*********************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/record-a-sound-press-record-button.sw.png ***!
  \*********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/record-a-sound-press-record-button.sw.588647db6d5240859a67.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/record-a-sound-sounds-tab.sw.png":
/*!************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/record-a-sound-sounds-tab.sw.png ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/record-a-sound-sounds-tab.sw.7f09591efe5f6a6f0c3d.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/speech-add-extension.sw.gif":
/*!*******************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/speech-add-extension.sw.gif ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/speech-add-extension.sw.e70e592d7894f9dfa6e1.gif";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/speech-change-color.sw.png":
/*!******************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/speech-change-color.sw.png ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/speech-change-color.sw.719403c916289ad3476e.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/speech-grow-shrink.sw.png":
/*!*****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/speech-grow-shrink.sw.png ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/speech-grow-shrink.sw.bc76423167dc1bae256d.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/speech-move-around.sw.png":
/*!*****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/speech-move-around.sw.png ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/speech-move-around.sw.1c5603c10195ca30be34.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/speech-say-something.sw.png":
/*!*******************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/speech-say-something.sw.png ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/speech-say-something.sw.6b0393a9b5dd425b2d8d.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/speech-set-voice.sw.png":
/*!***************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/speech-set-voice.sw.png ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/speech-set-voice.sw.869d8dd75345578b27ab.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/speech-song.sw.png":
/*!**********************************************************!*\
  !*** ./src/lib/libraries/decks/steps/speech-song.sw.png ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/speech-song.sw.f58df6e9166b2643d737.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/speech-spin.sw.png":
/*!**********************************************************!*\
  !*** ./src/lib/libraries/decks/steps/speech-spin.sw.png ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/speech-spin.sw.606d88c47312579298ef.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/spin-point-in-direction.sw.png":
/*!**********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/spin-point-in-direction.sw.png ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/spin-point-in-direction.sw.9533a6fe006c9285c082.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/spin-turn.sw.png":
/*!********************************************************!*\
  !*** ./src/lib/libraries/decks/steps/spin-turn.sw.png ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/spin-turn.sw.579d35279ffe2be28a1d.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/story-conversation.sw.png":
/*!*****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/story-conversation.sw.png ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/story-conversation.sw.ba94772fa7b43507c096.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/story-flip.sw.gif":
/*!*********************************************************!*\
  !*** ./src/lib/libraries/decks/steps/story-flip.sw.gif ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/story-flip.sw.0df826518d01cb56697d.gif";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/story-hide-character.sw.png":
/*!*******************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/story-hide-character.sw.png ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/story-hide-character.sw.af3b754936b2e7600215.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/story-say-something.sw.png":
/*!******************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/story-say-something.sw.png ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/story-say-something.sw.f45e06d178a4805ecb88.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/story-show-character.sw.png":
/*!*******************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/story-show-character.sw.png ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/story-show-character.sw.2e6c6eb279dd0f3cde10.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/story-switch-backdrop.sw.png":
/*!********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/story-switch-backdrop.sw.png ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/story-switch-backdrop.sw.9f8e95c78149f7ddbea9.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/switch-costumes.sw.png":
/*!**************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/switch-costumes.sw.png ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/switch-costumes.sw.a652939f7f8644021272.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/talking-11-choose-sound.sw.gif":
/*!**********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/talking-11-choose-sound.sw.gif ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/talking-11-choose-sound.sw.75fd9a179480b51b9998.gif";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/talking-12-dance-moves.sw.png":
/*!*********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/talking-12-dance-moves.sw.png ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/talking-12-dance-moves.sw.5adcd805913a0b09df00.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/talking-13-ask-and-answer.sw.png":
/*!************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/talking-13-ask-and-answer.sw.png ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/talking-13-ask-and-answer.sw.aede9cc9d1ea7cdc5659.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/talking-3-say-something.sw.png":
/*!**********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/talking-3-say-something.sw.png ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/talking-3-say-something.sw.f911ad99fe9ca0c13adb.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/talking-5-switch-backdrop.sw.png":
/*!************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/talking-5-switch-backdrop.sw.png ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/talking-5-switch-backdrop.sw.fcc8607ecca71a4395b8.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/talking-7-move-around.sw.png":
/*!********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/talking-7-move-around.sw.png ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/talking-7-move-around.sw.fd412bf3e1088e844d4c.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/talking-9-animate.sw.png":
/*!****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/talking-9-animate.sw.png ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/talking-9-animate.sw.fecad616594dde92d49f.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/video-add-extension.sw.gif":
/*!******************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/video-add-extension.sw.gif ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/video-add-extension.sw.d75aed5b21bb11dd59a5.gif";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/video-animate.sw.png":
/*!************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/video-animate.sw.png ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/video-animate.sw.482695f82eeb6babc09b.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/video-pet.sw.png":
/*!********************************************************!*\
  !*** ./src/lib/libraries/decks/steps/video-pet.sw.png ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/video-pet.sw.c1d36606fa6e0da7f00e.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/video-pop.sw.png":
/*!********************************************************!*\
  !*** ./src/lib/libraries/decks/steps/video-pop.sw.png ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/video-pop.sw.6462b34a0f7fd0ed2318.png";

/***/ })

}]);
//# sourceMappingURL=sw-steps.d7fee686ec5a0df1a9e6.js.map