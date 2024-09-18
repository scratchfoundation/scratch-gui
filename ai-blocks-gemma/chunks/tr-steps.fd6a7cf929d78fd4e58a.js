"use strict";
(self["webpackChunkGUI"] = self["webpackChunkGUI"] || []).push([["tr-steps"],{

/***/ "./src/lib/libraries/decks/tr-steps.js":
/*!*********************************************!*\
  !*** ./src/lib/libraries/decks/tr-steps.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   trImages: () => (/* binding */ trImages)
/* harmony export */ });
/* harmony import */ var _steps_intro_1_move_tr_gif__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./steps/intro-1-move.tr.gif */ "./src/lib/libraries/decks/steps/intro-1-move.tr.gif");
/* harmony import */ var _steps_intro_2_say_tr_gif__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./steps/intro-2-say.tr.gif */ "./src/lib/libraries/decks/steps/intro-2-say.tr.gif");
/* harmony import */ var _steps_intro_3_green_flag_tr_gif__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./steps/intro-3-green-flag.tr.gif */ "./src/lib/libraries/decks/steps/intro-3-green-flag.tr.gif");
/* harmony import */ var _steps_speech_add_extension_tr_gif__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./steps/speech-add-extension.tr.gif */ "./src/lib/libraries/decks/steps/speech-add-extension.tr.gif");
/* harmony import */ var _steps_speech_say_something_tr_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./steps/speech-say-something.tr.png */ "./src/lib/libraries/decks/steps/speech-say-something.tr.png");
/* harmony import */ var _steps_speech_set_voice_tr_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./steps/speech-set-voice.tr.png */ "./src/lib/libraries/decks/steps/speech-set-voice.tr.png");
/* harmony import */ var _steps_speech_move_around_tr_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./steps/speech-move-around.tr.png */ "./src/lib/libraries/decks/steps/speech-move-around.tr.png");
/* harmony import */ var _steps_pick_backdrop_LTR_gif__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./steps/pick-backdrop.LTR.gif */ "./src/lib/libraries/decks/steps/pick-backdrop.LTR.gif");
/* harmony import */ var _steps_speech_add_sprite_LTR_gif__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./steps/speech-add-sprite.LTR.gif */ "./src/lib/libraries/decks/steps/speech-add-sprite.LTR.gif");
/* harmony import */ var _steps_speech_song_tr_png__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./steps/speech-song.tr.png */ "./src/lib/libraries/decks/steps/speech-song.tr.png");
/* harmony import */ var _steps_speech_change_color_tr_png__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./steps/speech-change-color.tr.png */ "./src/lib/libraries/decks/steps/speech-change-color.tr.png");
/* harmony import */ var _steps_speech_spin_tr_png__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./steps/speech-spin.tr.png */ "./src/lib/libraries/decks/steps/speech-spin.tr.png");
/* harmony import */ var _steps_speech_grow_shrink_tr_png__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./steps/speech-grow-shrink.tr.png */ "./src/lib/libraries/decks/steps/speech-grow-shrink.tr.png");
/* harmony import */ var _steps_cn_show_character_LTR_gif__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./steps/cn-show-character.LTR.gif */ "./src/lib/libraries/decks/steps/cn-show-character.LTR.gif");
/* harmony import */ var _steps_cn_say_tr_png__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./steps/cn-say.tr.png */ "./src/lib/libraries/decks/steps/cn-say.tr.png");
/* harmony import */ var _steps_cn_glide_tr_png__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./steps/cn-glide.tr.png */ "./src/lib/libraries/decks/steps/cn-glide.tr.png");
/* harmony import */ var _steps_cn_pick_sprite_LTR_gif__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./steps/cn-pick-sprite.LTR.gif */ "./src/lib/libraries/decks/steps/cn-pick-sprite.LTR.gif");
/* harmony import */ var _steps_cn_collect_tr_png__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./steps/cn-collect.tr.png */ "./src/lib/libraries/decks/steps/cn-collect.tr.png");
/* harmony import */ var _steps_add_variable_tr_gif__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./steps/add-variable.tr.gif */ "./src/lib/libraries/decks/steps/add-variable.tr.gif");
/* harmony import */ var _steps_cn_score_tr_png__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./steps/cn-score.tr.png */ "./src/lib/libraries/decks/steps/cn-score.tr.png");
/* harmony import */ var _steps_cn_backdrop_tr_png__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./steps/cn-backdrop.tr.png */ "./src/lib/libraries/decks/steps/cn-backdrop.tr.png");
/* harmony import */ var _steps_add_sprite_LTR_gif__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./steps/add-sprite.LTR.gif */ "./src/lib/libraries/decks/steps/add-sprite.LTR.gif");
/* harmony import */ var _steps_name_pick_letter_LTR_gif__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./steps/name-pick-letter.LTR.gif */ "./src/lib/libraries/decks/steps/name-pick-letter.LTR.gif");
/* harmony import */ var _steps_name_play_sound_tr_png__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./steps/name-play-sound.tr.png */ "./src/lib/libraries/decks/steps/name-play-sound.tr.png");
/* harmony import */ var _steps_name_pick_letter2_LTR_gif__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./steps/name-pick-letter2.LTR.gif */ "./src/lib/libraries/decks/steps/name-pick-letter2.LTR.gif");
/* harmony import */ var _steps_name_change_color_tr_png__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./steps/name-change-color.tr.png */ "./src/lib/libraries/decks/steps/name-change-color.tr.png");
/* harmony import */ var _steps_name_spin_tr_png__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./steps/name-spin.tr.png */ "./src/lib/libraries/decks/steps/name-spin.tr.png");
/* harmony import */ var _steps_name_grow_tr_png__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./steps/name-grow.tr.png */ "./src/lib/libraries/decks/steps/name-grow.tr.png");
/* harmony import */ var _steps_music_pick_instrument_LTR_gif__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./steps/music-pick-instrument.LTR.gif */ "./src/lib/libraries/decks/steps/music-pick-instrument.LTR.gif");
/* harmony import */ var _steps_music_play_sound_tr_png__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./steps/music-play-sound.tr.png */ "./src/lib/libraries/decks/steps/music-play-sound.tr.png");
/* harmony import */ var _steps_music_make_song_tr_png__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./steps/music-make-song.tr.png */ "./src/lib/libraries/decks/steps/music-make-song.tr.png");
/* harmony import */ var _steps_music_make_beat_tr_png__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./steps/music-make-beat.tr.png */ "./src/lib/libraries/decks/steps/music-make-beat.tr.png");
/* harmony import */ var _steps_music_make_beatbox_tr_png__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./steps/music-make-beatbox.tr.png */ "./src/lib/libraries/decks/steps/music-make-beatbox.tr.png");
/* harmony import */ var _steps_chase_game_add_backdrop_LTR_gif__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./steps/chase-game-add-backdrop.LTR.gif */ "./src/lib/libraries/decks/steps/chase-game-add-backdrop.LTR.gif");
/* harmony import */ var _steps_chase_game_add_sprite1_LTR_gif__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./steps/chase-game-add-sprite1.LTR.gif */ "./src/lib/libraries/decks/steps/chase-game-add-sprite1.LTR.gif");
/* harmony import */ var _steps_chase_game_right_left_tr_png__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./steps/chase-game-right-left.tr.png */ "./src/lib/libraries/decks/steps/chase-game-right-left.tr.png");
/* harmony import */ var _steps_chase_game_up_down_tr_png__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./steps/chase-game-up-down.tr.png */ "./src/lib/libraries/decks/steps/chase-game-up-down.tr.png");
/* harmony import */ var _steps_chase_game_add_sprite2_LTR_gif__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./steps/chase-game-add-sprite2.LTR.gif */ "./src/lib/libraries/decks/steps/chase-game-add-sprite2.LTR.gif");
/* harmony import */ var _steps_chase_game_move_randomly_tr_png__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./steps/chase-game-move-randomly.tr.png */ "./src/lib/libraries/decks/steps/chase-game-move-randomly.tr.png");
/* harmony import */ var _steps_chase_game_play_sound_tr_png__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./steps/chase-game-play-sound.tr.png */ "./src/lib/libraries/decks/steps/chase-game-play-sound.tr.png");
/* harmony import */ var _steps_chase_game_change_score_tr_png__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./steps/chase-game-change-score.tr.png */ "./src/lib/libraries/decks/steps/chase-game-change-score.tr.png");
/* harmony import */ var _steps_pop_game_pick_sprite_LTR_gif__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./steps/pop-game-pick-sprite.LTR.gif */ "./src/lib/libraries/decks/steps/pop-game-pick-sprite.LTR.gif");
/* harmony import */ var _steps_pop_game_play_sound_tr_png__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./steps/pop-game-play-sound.tr.png */ "./src/lib/libraries/decks/steps/pop-game-play-sound.tr.png");
/* harmony import */ var _steps_pop_game_change_score_tr_png__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./steps/pop-game-change-score.tr.png */ "./src/lib/libraries/decks/steps/pop-game-change-score.tr.png");
/* harmony import */ var _steps_pop_game_random_position_tr_png__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./steps/pop-game-random-position.tr.png */ "./src/lib/libraries/decks/steps/pop-game-random-position.tr.png");
/* harmony import */ var _steps_pop_game_change_color_tr_png__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./steps/pop-game-change-color.tr.png */ "./src/lib/libraries/decks/steps/pop-game-change-color.tr.png");
/* harmony import */ var _steps_pop_game_reset_score_tr_png__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./steps/pop-game-reset-score.tr.png */ "./src/lib/libraries/decks/steps/pop-game-reset-score.tr.png");
/* harmony import */ var _steps_animate_char_pick_sprite_LTR_gif__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./steps/animate-char-pick-sprite.LTR.gif */ "./src/lib/libraries/decks/steps/animate-char-pick-sprite.LTR.gif");
/* harmony import */ var _steps_animate_char_say_something_tr_png__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ./steps/animate-char-say-something.tr.png */ "./src/lib/libraries/decks/steps/animate-char-say-something.tr.png");
/* harmony import */ var _steps_animate_char_add_sound_tr_png__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ./steps/animate-char-add-sound.tr.png */ "./src/lib/libraries/decks/steps/animate-char-add-sound.tr.png");
/* harmony import */ var _steps_animate_char_talk_tr_png__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ./steps/animate-char-talk.tr.png */ "./src/lib/libraries/decks/steps/animate-char-talk.tr.png");
/* harmony import */ var _steps_animate_char_move_tr_png__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ./steps/animate-char-move.tr.png */ "./src/lib/libraries/decks/steps/animate-char-move.tr.png");
/* harmony import */ var _steps_animate_char_jump_tr_png__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ./steps/animate-char-jump.tr.png */ "./src/lib/libraries/decks/steps/animate-char-jump.tr.png");
/* harmony import */ var _steps_animate_char_change_color_tr_png__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! ./steps/animate-char-change-color.tr.png */ "./src/lib/libraries/decks/steps/animate-char-change-color.tr.png");
/* harmony import */ var _steps_story_pick_backdrop_LTR_gif__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! ./steps/story-pick-backdrop.LTR.gif */ "./src/lib/libraries/decks/steps/story-pick-backdrop.LTR.gif");
/* harmony import */ var _steps_story_pick_sprite_LTR_gif__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! ./steps/story-pick-sprite.LTR.gif */ "./src/lib/libraries/decks/steps/story-pick-sprite.LTR.gif");
/* harmony import */ var _steps_story_say_something_tr_png__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! ./steps/story-say-something.tr.png */ "./src/lib/libraries/decks/steps/story-say-something.tr.png");
/* harmony import */ var _steps_story_pick_sprite2_LTR_gif__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! ./steps/story-pick-sprite2.LTR.gif */ "./src/lib/libraries/decks/steps/story-pick-sprite2.LTR.gif");
/* harmony import */ var _steps_story_flip_tr_gif__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! ./steps/story-flip.tr.gif */ "./src/lib/libraries/decks/steps/story-flip.tr.gif");
/* harmony import */ var _steps_story_conversation_tr_png__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! ./steps/story-conversation.tr.png */ "./src/lib/libraries/decks/steps/story-conversation.tr.png");
/* harmony import */ var _steps_story_pick_backdrop2_LTR_gif__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(/*! ./steps/story-pick-backdrop2.LTR.gif */ "./src/lib/libraries/decks/steps/story-pick-backdrop2.LTR.gif");
/* harmony import */ var _steps_story_switch_backdrop_tr_png__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(/*! ./steps/story-switch-backdrop.tr.png */ "./src/lib/libraries/decks/steps/story-switch-backdrop.tr.png");
/* harmony import */ var _steps_story_hide_character_tr_png__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(/*! ./steps/story-hide-character.tr.png */ "./src/lib/libraries/decks/steps/story-hide-character.tr.png");
/* harmony import */ var _steps_story_show_character_tr_png__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(/*! ./steps/story-show-character.tr.png */ "./src/lib/libraries/decks/steps/story-show-character.tr.png");
/* harmony import */ var _steps_video_add_extension_tr_gif__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(/*! ./steps/video-add-extension.tr.gif */ "./src/lib/libraries/decks/steps/video-add-extension.tr.gif");
/* harmony import */ var _steps_video_pet_tr_png__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__(/*! ./steps/video-pet.tr.png */ "./src/lib/libraries/decks/steps/video-pet.tr.png");
/* harmony import */ var _steps_video_animate_tr_png__WEBPACK_IMPORTED_MODULE_66__ = __webpack_require__(/*! ./steps/video-animate.tr.png */ "./src/lib/libraries/decks/steps/video-animate.tr.png");
/* harmony import */ var _steps_video_pop_tr_png__WEBPACK_IMPORTED_MODULE_67__ = __webpack_require__(/*! ./steps/video-pop.tr.png */ "./src/lib/libraries/decks/steps/video-pop.tr.png");
/* harmony import */ var _steps_fly_choose_backdrop_LTR_gif__WEBPACK_IMPORTED_MODULE_68__ = __webpack_require__(/*! ./steps/fly-choose-backdrop.LTR.gif */ "./src/lib/libraries/decks/steps/fly-choose-backdrop.LTR.gif");
/* harmony import */ var _steps_fly_choose_character_LTR_png__WEBPACK_IMPORTED_MODULE_69__ = __webpack_require__(/*! ./steps/fly-choose-character.LTR.png */ "./src/lib/libraries/decks/steps/fly-choose-character.LTR.png");
/* harmony import */ var _steps_fly_say_something_tr_png__WEBPACK_IMPORTED_MODULE_70__ = __webpack_require__(/*! ./steps/fly-say-something.tr.png */ "./src/lib/libraries/decks/steps/fly-say-something.tr.png");
/* harmony import */ var _steps_fly_make_interactive_tr_png__WEBPACK_IMPORTED_MODULE_71__ = __webpack_require__(/*! ./steps/fly-make-interactive.tr.png */ "./src/lib/libraries/decks/steps/fly-make-interactive.tr.png");
/* harmony import */ var _steps_fly_object_to_collect_LTR_png__WEBPACK_IMPORTED_MODULE_72__ = __webpack_require__(/*! ./steps/fly-object-to-collect.LTR.png */ "./src/lib/libraries/decks/steps/fly-object-to-collect.LTR.png");
/* harmony import */ var _steps_fly_flying_heart_tr_png__WEBPACK_IMPORTED_MODULE_73__ = __webpack_require__(/*! ./steps/fly-flying-heart.tr.png */ "./src/lib/libraries/decks/steps/fly-flying-heart.tr.png");
/* harmony import */ var _steps_fly_select_flyer_LTR_png__WEBPACK_IMPORTED_MODULE_74__ = __webpack_require__(/*! ./steps/fly-select-flyer.LTR.png */ "./src/lib/libraries/decks/steps/fly-select-flyer.LTR.png");
/* harmony import */ var _steps_fly_keep_score_tr_png__WEBPACK_IMPORTED_MODULE_75__ = __webpack_require__(/*! ./steps/fly-keep-score.tr.png */ "./src/lib/libraries/decks/steps/fly-keep-score.tr.png");
/* harmony import */ var _steps_fly_choose_scenery_LTR_gif__WEBPACK_IMPORTED_MODULE_76__ = __webpack_require__(/*! ./steps/fly-choose-scenery.LTR.gif */ "./src/lib/libraries/decks/steps/fly-choose-scenery.LTR.gif");
/* harmony import */ var _steps_fly_move_scenery_tr_png__WEBPACK_IMPORTED_MODULE_77__ = __webpack_require__(/*! ./steps/fly-move-scenery.tr.png */ "./src/lib/libraries/decks/steps/fly-move-scenery.tr.png");
/* harmony import */ var _steps_fly_switch_costume_tr_png__WEBPACK_IMPORTED_MODULE_78__ = __webpack_require__(/*! ./steps/fly-switch-costume.tr.png */ "./src/lib/libraries/decks/steps/fly-switch-costume.tr.png");
/* harmony import */ var _steps_pong_add_backdrop_LTR_png__WEBPACK_IMPORTED_MODULE_79__ = __webpack_require__(/*! ./steps/pong-add-backdrop.LTR.png */ "./src/lib/libraries/decks/steps/pong-add-backdrop.LTR.png");
/* harmony import */ var _steps_pong_add_ball_sprite_LTR_png__WEBPACK_IMPORTED_MODULE_80__ = __webpack_require__(/*! ./steps/pong-add-ball-sprite.LTR.png */ "./src/lib/libraries/decks/steps/pong-add-ball-sprite.LTR.png");
/* harmony import */ var _steps_pong_bounce_around_tr_png__WEBPACK_IMPORTED_MODULE_81__ = __webpack_require__(/*! ./steps/pong-bounce-around.tr.png */ "./src/lib/libraries/decks/steps/pong-bounce-around.tr.png");
/* harmony import */ var _steps_pong_add_a_paddle_LTR_gif__WEBPACK_IMPORTED_MODULE_82__ = __webpack_require__(/*! ./steps/pong-add-a-paddle.LTR.gif */ "./src/lib/libraries/decks/steps/pong-add-a-paddle.LTR.gif");
/* harmony import */ var _steps_pong_move_the_paddle_tr_png__WEBPACK_IMPORTED_MODULE_83__ = __webpack_require__(/*! ./steps/pong-move-the-paddle.tr.png */ "./src/lib/libraries/decks/steps/pong-move-the-paddle.tr.png");
/* harmony import */ var _steps_pong_select_ball_LTR_png__WEBPACK_IMPORTED_MODULE_84__ = __webpack_require__(/*! ./steps/pong-select-ball.LTR.png */ "./src/lib/libraries/decks/steps/pong-select-ball.LTR.png");
/* harmony import */ var _steps_pong_add_code_to_ball_tr_png__WEBPACK_IMPORTED_MODULE_85__ = __webpack_require__(/*! ./steps/pong-add-code-to-ball.tr.png */ "./src/lib/libraries/decks/steps/pong-add-code-to-ball.tr.png");
/* harmony import */ var _steps_pong_choose_score_tr_png__WEBPACK_IMPORTED_MODULE_86__ = __webpack_require__(/*! ./steps/pong-choose-score.tr.png */ "./src/lib/libraries/decks/steps/pong-choose-score.tr.png");
/* harmony import */ var _steps_pong_insert_change_score_tr_png__WEBPACK_IMPORTED_MODULE_87__ = __webpack_require__(/*! ./steps/pong-insert-change-score.tr.png */ "./src/lib/libraries/decks/steps/pong-insert-change-score.tr.png");
/* harmony import */ var _steps_pong_reset_score_tr_png__WEBPACK_IMPORTED_MODULE_88__ = __webpack_require__(/*! ./steps/pong-reset-score.tr.png */ "./src/lib/libraries/decks/steps/pong-reset-score.tr.png");
/* harmony import */ var _steps_pong_add_line_LTR_gif__WEBPACK_IMPORTED_MODULE_89__ = __webpack_require__(/*! ./steps/pong-add-line.LTR.gif */ "./src/lib/libraries/decks/steps/pong-add-line.LTR.gif");
/* harmony import */ var _steps_pong_game_over_tr_png__WEBPACK_IMPORTED_MODULE_90__ = __webpack_require__(/*! ./steps/pong-game-over.tr.png */ "./src/lib/libraries/decks/steps/pong-game-over.tr.png");
/* harmony import */ var _steps_imagine_type_what_you_want_tr_png__WEBPACK_IMPORTED_MODULE_91__ = __webpack_require__(/*! ./steps/imagine-type-what-you-want.tr.png */ "./src/lib/libraries/decks/steps/imagine-type-what-you-want.tr.png");
/* harmony import */ var _steps_imagine_click_green_flag_tr_png__WEBPACK_IMPORTED_MODULE_92__ = __webpack_require__(/*! ./steps/imagine-click-green-flag.tr.png */ "./src/lib/libraries/decks/steps/imagine-click-green-flag.tr.png");
/* harmony import */ var _steps_imagine_choose_backdrop_LTR_png__WEBPACK_IMPORTED_MODULE_93__ = __webpack_require__(/*! ./steps/imagine-choose-backdrop.LTR.png */ "./src/lib/libraries/decks/steps/imagine-choose-backdrop.LTR.png");
/* harmony import */ var _steps_imagine_choose_any_sprite_LTR_png__WEBPACK_IMPORTED_MODULE_94__ = __webpack_require__(/*! ./steps/imagine-choose-any-sprite.LTR.png */ "./src/lib/libraries/decks/steps/imagine-choose-any-sprite.LTR.png");
/* harmony import */ var _steps_imagine_fly_around_tr_png__WEBPACK_IMPORTED_MODULE_95__ = __webpack_require__(/*! ./steps/imagine-fly-around.tr.png */ "./src/lib/libraries/decks/steps/imagine-fly-around.tr.png");
/* harmony import */ var _steps_imagine_choose_another_sprite_LTR_png__WEBPACK_IMPORTED_MODULE_96__ = __webpack_require__(/*! ./steps/imagine-choose-another-sprite.LTR.png */ "./src/lib/libraries/decks/steps/imagine-choose-another-sprite.LTR.png");
/* harmony import */ var _steps_imagine_left_right_tr_png__WEBPACK_IMPORTED_MODULE_97__ = __webpack_require__(/*! ./steps/imagine-left-right.tr.png */ "./src/lib/libraries/decks/steps/imagine-left-right.tr.png");
/* harmony import */ var _steps_imagine_up_down_tr_png__WEBPACK_IMPORTED_MODULE_98__ = __webpack_require__(/*! ./steps/imagine-up-down.tr.png */ "./src/lib/libraries/decks/steps/imagine-up-down.tr.png");
/* harmony import */ var _steps_imagine_change_costumes_tr_png__WEBPACK_IMPORTED_MODULE_99__ = __webpack_require__(/*! ./steps/imagine-change-costumes.tr.png */ "./src/lib/libraries/decks/steps/imagine-change-costumes.tr.png");
/* harmony import */ var _steps_imagine_glide_to_point_tr_png__WEBPACK_IMPORTED_MODULE_100__ = __webpack_require__(/*! ./steps/imagine-glide-to-point.tr.png */ "./src/lib/libraries/decks/steps/imagine-glide-to-point.tr.png");
/* harmony import */ var _steps_imagine_grow_shrink_tr_png__WEBPACK_IMPORTED_MODULE_101__ = __webpack_require__(/*! ./steps/imagine-grow-shrink.tr.png */ "./src/lib/libraries/decks/steps/imagine-grow-shrink.tr.png");
/* harmony import */ var _steps_imagine_choose_another_backdrop_LTR_png__WEBPACK_IMPORTED_MODULE_102__ = __webpack_require__(/*! ./steps/imagine-choose-another-backdrop.LTR.png */ "./src/lib/libraries/decks/steps/imagine-choose-another-backdrop.LTR.png");
/* harmony import */ var _steps_imagine_switch_backdrops_tr_png__WEBPACK_IMPORTED_MODULE_103__ = __webpack_require__(/*! ./steps/imagine-switch-backdrops.tr.png */ "./src/lib/libraries/decks/steps/imagine-switch-backdrops.tr.png");
/* harmony import */ var _steps_imagine_record_a_sound_tr_gif__WEBPACK_IMPORTED_MODULE_104__ = __webpack_require__(/*! ./steps/imagine-record-a-sound.tr.gif */ "./src/lib/libraries/decks/steps/imagine-record-a-sound.tr.gif");
/* harmony import */ var _steps_imagine_choose_sound_tr_png__WEBPACK_IMPORTED_MODULE_105__ = __webpack_require__(/*! ./steps/imagine-choose-sound.tr.png */ "./src/lib/libraries/decks/steps/imagine-choose-sound.tr.png");
/* harmony import */ var _steps_add_backdrop_LTR_png__WEBPACK_IMPORTED_MODULE_106__ = __webpack_require__(/*! ./steps/add-backdrop.LTR.png */ "./src/lib/libraries/decks/steps/add-backdrop.LTR.png");
/* harmony import */ var _steps_add_effects_tr_png__WEBPACK_IMPORTED_MODULE_107__ = __webpack_require__(/*! ./steps/add-effects.tr.png */ "./src/lib/libraries/decks/steps/add-effects.tr.png");
/* harmony import */ var _steps_hide_show_tr_png__WEBPACK_IMPORTED_MODULE_108__ = __webpack_require__(/*! ./steps/hide-show.tr.png */ "./src/lib/libraries/decks/steps/hide-show.tr.png");
/* harmony import */ var _steps_switch_costumes_tr_png__WEBPACK_IMPORTED_MODULE_109__ = __webpack_require__(/*! ./steps/switch-costumes.tr.png */ "./src/lib/libraries/decks/steps/switch-costumes.tr.png");
/* harmony import */ var _steps_change_size_tr_png__WEBPACK_IMPORTED_MODULE_110__ = __webpack_require__(/*! ./steps/change-size.tr.png */ "./src/lib/libraries/decks/steps/change-size.tr.png");
/* harmony import */ var _steps_spin_turn_tr_png__WEBPACK_IMPORTED_MODULE_111__ = __webpack_require__(/*! ./steps/spin-turn.tr.png */ "./src/lib/libraries/decks/steps/spin-turn.tr.png");
/* harmony import */ var _steps_spin_point_in_direction_tr_png__WEBPACK_IMPORTED_MODULE_112__ = __webpack_require__(/*! ./steps/spin-point-in-direction.tr.png */ "./src/lib/libraries/decks/steps/spin-point-in-direction.tr.png");
/* harmony import */ var _steps_record_a_sound_sounds_tab_tr_png__WEBPACK_IMPORTED_MODULE_113__ = __webpack_require__(/*! ./steps/record-a-sound-sounds-tab.tr.png */ "./src/lib/libraries/decks/steps/record-a-sound-sounds-tab.tr.png");
/* harmony import */ var _steps_record_a_sound_click_record_tr_png__WEBPACK_IMPORTED_MODULE_114__ = __webpack_require__(/*! ./steps/record-a-sound-click-record.tr.png */ "./src/lib/libraries/decks/steps/record-a-sound-click-record.tr.png");
/* harmony import */ var _steps_record_a_sound_press_record_button_tr_png__WEBPACK_IMPORTED_MODULE_115__ = __webpack_require__(/*! ./steps/record-a-sound-press-record-button.tr.png */ "./src/lib/libraries/decks/steps/record-a-sound-press-record-button.tr.png");
/* harmony import */ var _steps_record_a_sound_choose_sound_tr_png__WEBPACK_IMPORTED_MODULE_116__ = __webpack_require__(/*! ./steps/record-a-sound-choose-sound.tr.png */ "./src/lib/libraries/decks/steps/record-a-sound-choose-sound.tr.png");
/* harmony import */ var _steps_record_a_sound_play_your_sound_tr_png__WEBPACK_IMPORTED_MODULE_117__ = __webpack_require__(/*! ./steps/record-a-sound-play-your-sound.tr.png */ "./src/lib/libraries/decks/steps/record-a-sound-play-your-sound.tr.png");
/* harmony import */ var _steps_move_arrow_keys_left_right_tr_png__WEBPACK_IMPORTED_MODULE_118__ = __webpack_require__(/*! ./steps/move-arrow-keys-left-right.tr.png */ "./src/lib/libraries/decks/steps/move-arrow-keys-left-right.tr.png");
/* harmony import */ var _steps_move_arrow_keys_up_down_tr_png__WEBPACK_IMPORTED_MODULE_119__ = __webpack_require__(/*! ./steps/move-arrow-keys-up-down.tr.png */ "./src/lib/libraries/decks/steps/move-arrow-keys-up-down.tr.png");
/* harmony import */ var _steps_glide_around_back_and_forth_tr_png__WEBPACK_IMPORTED_MODULE_120__ = __webpack_require__(/*! ./steps/glide-around-back-and-forth.tr.png */ "./src/lib/libraries/decks/steps/glide-around-back-and-forth.tr.png");
/* harmony import */ var _steps_glide_around_point_tr_png__WEBPACK_IMPORTED_MODULE_121__ = __webpack_require__(/*! ./steps/glide-around-point.tr.png */ "./src/lib/libraries/decks/steps/glide-around-point.tr.png");
/* harmony import */ var _steps_code_cartoon_01_say_something_tr_png__WEBPACK_IMPORTED_MODULE_122__ = __webpack_require__(/*! ./steps/code-cartoon-01-say-something.tr.png */ "./src/lib/libraries/decks/steps/code-cartoon-01-say-something.tr.png");
/* harmony import */ var _steps_code_cartoon_02_animate_tr_png__WEBPACK_IMPORTED_MODULE_123__ = __webpack_require__(/*! ./steps/code-cartoon-02-animate.tr.png */ "./src/lib/libraries/decks/steps/code-cartoon-02-animate.tr.png");
/* harmony import */ var _steps_code_cartoon_03_select_different_character_LTR_png__WEBPACK_IMPORTED_MODULE_124__ = __webpack_require__(/*! ./steps/code-cartoon-03-select-different-character.LTR.png */ "./src/lib/libraries/decks/steps/code-cartoon-03-select-different-character.LTR.png");
/* harmony import */ var _steps_code_cartoon_04_use_minus_sign_tr_png__WEBPACK_IMPORTED_MODULE_125__ = __webpack_require__(/*! ./steps/code-cartoon-04-use-minus-sign.tr.png */ "./src/lib/libraries/decks/steps/code-cartoon-04-use-minus-sign.tr.png");
/* harmony import */ var _steps_code_cartoon_05_grow_shrink_tr_png__WEBPACK_IMPORTED_MODULE_126__ = __webpack_require__(/*! ./steps/code-cartoon-05-grow-shrink.tr.png */ "./src/lib/libraries/decks/steps/code-cartoon-05-grow-shrink.tr.png");
/* harmony import */ var _steps_code_cartoon_06_select_another_different_character_LTR_png__WEBPACK_IMPORTED_MODULE_127__ = __webpack_require__(/*! ./steps/code-cartoon-06-select-another-different-character.LTR.png */ "./src/lib/libraries/decks/steps/code-cartoon-06-select-another-different-character.LTR.png");
/* harmony import */ var _steps_code_cartoon_07_jump_tr_png__WEBPACK_IMPORTED_MODULE_128__ = __webpack_require__(/*! ./steps/code-cartoon-07-jump.tr.png */ "./src/lib/libraries/decks/steps/code-cartoon-07-jump.tr.png");
/* harmony import */ var _steps_code_cartoon_08_change_scenes_tr_png__WEBPACK_IMPORTED_MODULE_129__ = __webpack_require__(/*! ./steps/code-cartoon-08-change-scenes.tr.png */ "./src/lib/libraries/decks/steps/code-cartoon-08-change-scenes.tr.png");
/* harmony import */ var _steps_code_cartoon_09_glide_around_tr_png__WEBPACK_IMPORTED_MODULE_130__ = __webpack_require__(/*! ./steps/code-cartoon-09-glide-around.tr.png */ "./src/lib/libraries/decks/steps/code-cartoon-09-glide-around.tr.png");
/* harmony import */ var _steps_code_cartoon_10_change_costumes_tr_png__WEBPACK_IMPORTED_MODULE_131__ = __webpack_require__(/*! ./steps/code-cartoon-10-change-costumes.tr.png */ "./src/lib/libraries/decks/steps/code-cartoon-10-change-costumes.tr.png");
/* harmony import */ var _steps_code_cartoon_11_choose_more_characters_LTR_png__WEBPACK_IMPORTED_MODULE_132__ = __webpack_require__(/*! ./steps/code-cartoon-11-choose-more-characters.LTR.png */ "./src/lib/libraries/decks/steps/code-cartoon-11-choose-more-characters.LTR.png");
/* harmony import */ var _steps_talking_2_choose_sprite_LTR_png__WEBPACK_IMPORTED_MODULE_133__ = __webpack_require__(/*! ./steps/talking-2-choose-sprite.LTR.png */ "./src/lib/libraries/decks/steps/talking-2-choose-sprite.LTR.png");
/* harmony import */ var _steps_talking_3_say_something_tr_png__WEBPACK_IMPORTED_MODULE_134__ = __webpack_require__(/*! ./steps/talking-3-say-something.tr.png */ "./src/lib/libraries/decks/steps/talking-3-say-something.tr.png");
/* harmony import */ var _steps_talking_4_choose_backdrop_LTR_png__WEBPACK_IMPORTED_MODULE_135__ = __webpack_require__(/*! ./steps/talking-4-choose-backdrop.LTR.png */ "./src/lib/libraries/decks/steps/talking-4-choose-backdrop.LTR.png");
/* harmony import */ var _steps_talking_5_switch_backdrop_tr_png__WEBPACK_IMPORTED_MODULE_136__ = __webpack_require__(/*! ./steps/talking-5-switch-backdrop.tr.png */ "./src/lib/libraries/decks/steps/talking-5-switch-backdrop.tr.png");
/* harmony import */ var _steps_talking_6_choose_another_sprite_LTR_png__WEBPACK_IMPORTED_MODULE_137__ = __webpack_require__(/*! ./steps/talking-6-choose-another-sprite.LTR.png */ "./src/lib/libraries/decks/steps/talking-6-choose-another-sprite.LTR.png");
/* harmony import */ var _steps_talking_7_move_around_tr_png__WEBPACK_IMPORTED_MODULE_138__ = __webpack_require__(/*! ./steps/talking-7-move-around.tr.png */ "./src/lib/libraries/decks/steps/talking-7-move-around.tr.png");
/* harmony import */ var _steps_talking_8_choose_another_backdrop_LTR_png__WEBPACK_IMPORTED_MODULE_139__ = __webpack_require__(/*! ./steps/talking-8-choose-another-backdrop.LTR.png */ "./src/lib/libraries/decks/steps/talking-8-choose-another-backdrop.LTR.png");
/* harmony import */ var _steps_talking_9_animate_tr_png__WEBPACK_IMPORTED_MODULE_140__ = __webpack_require__(/*! ./steps/talking-9-animate.tr.png */ "./src/lib/libraries/decks/steps/talking-9-animate.tr.png");
/* harmony import */ var _steps_talking_10_choose_third_backdrop_LTR_png__WEBPACK_IMPORTED_MODULE_141__ = __webpack_require__(/*! ./steps/talking-10-choose-third-backdrop.LTR.png */ "./src/lib/libraries/decks/steps/talking-10-choose-third-backdrop.LTR.png");
/* harmony import */ var _steps_talking_11_choose_sound_tr_gif__WEBPACK_IMPORTED_MODULE_142__ = __webpack_require__(/*! ./steps/talking-11-choose-sound.tr.gif */ "./src/lib/libraries/decks/steps/talking-11-choose-sound.tr.gif");
/* harmony import */ var _steps_talking_12_dance_moves_tr_png__WEBPACK_IMPORTED_MODULE_143__ = __webpack_require__(/*! ./steps/talking-12-dance-moves.tr.png */ "./src/lib/libraries/decks/steps/talking-12-dance-moves.tr.png");
/* harmony import */ var _steps_talking_13_ask_and_answer_tr_png__WEBPACK_IMPORTED_MODULE_144__ = __webpack_require__(/*! ./steps/talking-13-ask-and-answer.tr.png */ "./src/lib/libraries/decks/steps/talking-13-ask-and-answer.tr.png");
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













const trImages = {
  // Intro
  introMove: _steps_intro_1_move_tr_gif__WEBPACK_IMPORTED_MODULE_0__,
  introSay: _steps_intro_2_say_tr_gif__WEBPACK_IMPORTED_MODULE_1__,
  introGreenFlag: _steps_intro_3_green_flag_tr_gif__WEBPACK_IMPORTED_MODULE_2__,
  // Text to Speech
  speechAddExtension: _steps_speech_add_extension_tr_gif__WEBPACK_IMPORTED_MODULE_3__,
  speechSaySomething: _steps_speech_say_something_tr_png__WEBPACK_IMPORTED_MODULE_4__,
  speechSetVoice: _steps_speech_set_voice_tr_png__WEBPACK_IMPORTED_MODULE_5__,
  speechMoveAround: _steps_speech_move_around_tr_png__WEBPACK_IMPORTED_MODULE_6__,
  speechAddBackdrop: _steps_pick_backdrop_LTR_gif__WEBPACK_IMPORTED_MODULE_7__,
  speechAddSprite: _steps_speech_add_sprite_LTR_gif__WEBPACK_IMPORTED_MODULE_8__,
  speechSong: _steps_speech_song_tr_png__WEBPACK_IMPORTED_MODULE_9__,
  speechChangeColor: _steps_speech_change_color_tr_png__WEBPACK_IMPORTED_MODULE_10__,
  speechSpin: _steps_speech_spin_tr_png__WEBPACK_IMPORTED_MODULE_11__,
  speechGrowShrink: _steps_speech_grow_shrink_tr_png__WEBPACK_IMPORTED_MODULE_12__,
  // Cartoon Network
  cnShowCharacter: _steps_cn_show_character_LTR_gif__WEBPACK_IMPORTED_MODULE_13__,
  cnSay: _steps_cn_say_tr_png__WEBPACK_IMPORTED_MODULE_14__,
  cnGlide: _steps_cn_glide_tr_png__WEBPACK_IMPORTED_MODULE_15__,
  cnPickSprite: _steps_cn_pick_sprite_LTR_gif__WEBPACK_IMPORTED_MODULE_16__,
  cnCollect: _steps_cn_collect_tr_png__WEBPACK_IMPORTED_MODULE_17__,
  cnVariable: _steps_add_variable_tr_gif__WEBPACK_IMPORTED_MODULE_18__,
  cnScore: _steps_cn_score_tr_png__WEBPACK_IMPORTED_MODULE_19__,
  cnBackdrop: _steps_cn_backdrop_tr_png__WEBPACK_IMPORTED_MODULE_20__,
  // Add sprite
  addSprite: _steps_add_sprite_LTR_gif__WEBPACK_IMPORTED_MODULE_21__,
  // Animate a name
  namePickLetter: _steps_name_pick_letter_LTR_gif__WEBPACK_IMPORTED_MODULE_22__,
  namePlaySound: _steps_name_play_sound_tr_png__WEBPACK_IMPORTED_MODULE_23__,
  namePickLetter2: _steps_name_pick_letter2_LTR_gif__WEBPACK_IMPORTED_MODULE_24__,
  nameChangeColor: _steps_name_change_color_tr_png__WEBPACK_IMPORTED_MODULE_25__,
  nameSpin: _steps_name_spin_tr_png__WEBPACK_IMPORTED_MODULE_26__,
  nameGrow: _steps_name_grow_tr_png__WEBPACK_IMPORTED_MODULE_27__,
  // Make-Music
  musicPickInstrument: _steps_music_pick_instrument_LTR_gif__WEBPACK_IMPORTED_MODULE_28__,
  musicPlaySound: _steps_music_play_sound_tr_png__WEBPACK_IMPORTED_MODULE_29__,
  musicMakeSong: _steps_music_make_song_tr_png__WEBPACK_IMPORTED_MODULE_30__,
  musicMakeBeat: _steps_music_make_beat_tr_png__WEBPACK_IMPORTED_MODULE_31__,
  musicMakeBeatbox: _steps_music_make_beatbox_tr_png__WEBPACK_IMPORTED_MODULE_32__,
  // Chase-Game
  chaseGameAddBackdrop: _steps_chase_game_add_backdrop_LTR_gif__WEBPACK_IMPORTED_MODULE_33__,
  chaseGameAddSprite1: _steps_chase_game_add_sprite1_LTR_gif__WEBPACK_IMPORTED_MODULE_34__,
  chaseGameRightLeft: _steps_chase_game_right_left_tr_png__WEBPACK_IMPORTED_MODULE_35__,
  chaseGameUpDown: _steps_chase_game_up_down_tr_png__WEBPACK_IMPORTED_MODULE_36__,
  chaseGameAddSprite2: _steps_chase_game_add_sprite2_LTR_gif__WEBPACK_IMPORTED_MODULE_37__,
  chaseGameMoveRandomly: _steps_chase_game_move_randomly_tr_png__WEBPACK_IMPORTED_MODULE_38__,
  chaseGamePlaySound: _steps_chase_game_play_sound_tr_png__WEBPACK_IMPORTED_MODULE_39__,
  chaseGameAddVariable: _steps_add_variable_tr_gif__WEBPACK_IMPORTED_MODULE_18__,
  chaseGameChangeScore: _steps_chase_game_change_score_tr_png__WEBPACK_IMPORTED_MODULE_40__,
  // Make-A-Pop/Clicker Game
  popGamePickSprite: _steps_pop_game_pick_sprite_LTR_gif__WEBPACK_IMPORTED_MODULE_41__,
  popGamePlaySound: _steps_pop_game_play_sound_tr_png__WEBPACK_IMPORTED_MODULE_42__,
  popGameAddScore: _steps_add_variable_tr_gif__WEBPACK_IMPORTED_MODULE_18__,
  popGameChangeScore: _steps_pop_game_change_score_tr_png__WEBPACK_IMPORTED_MODULE_43__,
  popGameRandomPosition: _steps_pop_game_random_position_tr_png__WEBPACK_IMPORTED_MODULE_44__,
  popGameChangeColor: _steps_pop_game_change_color_tr_png__WEBPACK_IMPORTED_MODULE_45__,
  popGameResetScore: _steps_pop_game_reset_score_tr_png__WEBPACK_IMPORTED_MODULE_46__,
  // Animate A Character
  animateCharPickBackdrop: _steps_pick_backdrop_LTR_gif__WEBPACK_IMPORTED_MODULE_7__,
  animateCharPickSprite: _steps_animate_char_pick_sprite_LTR_gif__WEBPACK_IMPORTED_MODULE_47__,
  animateCharSaySomething: _steps_animate_char_say_something_tr_png__WEBPACK_IMPORTED_MODULE_48__,
  animateCharAddSound: _steps_animate_char_add_sound_tr_png__WEBPACK_IMPORTED_MODULE_49__,
  animateCharTalk: _steps_animate_char_talk_tr_png__WEBPACK_IMPORTED_MODULE_50__,
  animateCharMove: _steps_animate_char_move_tr_png__WEBPACK_IMPORTED_MODULE_51__,
  animateCharJump: _steps_animate_char_jump_tr_png__WEBPACK_IMPORTED_MODULE_52__,
  animateCharChangeColor: _steps_animate_char_change_color_tr_png__WEBPACK_IMPORTED_MODULE_53__,
  // Tell A Story
  storyPickBackdrop: _steps_story_pick_backdrop_LTR_gif__WEBPACK_IMPORTED_MODULE_54__,
  storyPickSprite: _steps_story_pick_sprite_LTR_gif__WEBPACK_IMPORTED_MODULE_55__,
  storySaySomething: _steps_story_say_something_tr_png__WEBPACK_IMPORTED_MODULE_56__,
  storyPickSprite2: _steps_story_pick_sprite2_LTR_gif__WEBPACK_IMPORTED_MODULE_57__,
  storyFlip: _steps_story_flip_tr_gif__WEBPACK_IMPORTED_MODULE_58__,
  storyConversation: _steps_story_conversation_tr_png__WEBPACK_IMPORTED_MODULE_59__,
  storyPickBackdrop2: _steps_story_pick_backdrop2_LTR_gif__WEBPACK_IMPORTED_MODULE_60__,
  storySwitchBackdrop: _steps_story_switch_backdrop_tr_png__WEBPACK_IMPORTED_MODULE_61__,
  storyHideCharacter: _steps_story_hide_character_tr_png__WEBPACK_IMPORTED_MODULE_62__,
  storyShowCharacter: _steps_story_show_character_tr_png__WEBPACK_IMPORTED_MODULE_63__,
  // Video Sensing
  videoAddExtension: _steps_video_add_extension_tr_gif__WEBPACK_IMPORTED_MODULE_64__,
  videoPet: _steps_video_pet_tr_png__WEBPACK_IMPORTED_MODULE_65__,
  videoAnimate: _steps_video_animate_tr_png__WEBPACK_IMPORTED_MODULE_66__,
  videoPop: _steps_video_pop_tr_png__WEBPACK_IMPORTED_MODULE_67__,
  // Make it Fly
  flyChooseBackdrop: _steps_fly_choose_backdrop_LTR_gif__WEBPACK_IMPORTED_MODULE_68__,
  flyChooseCharacter: _steps_fly_choose_character_LTR_png__WEBPACK_IMPORTED_MODULE_69__,
  flySaySomething: _steps_fly_say_something_tr_png__WEBPACK_IMPORTED_MODULE_70__,
  flyMoveArrows: _steps_fly_make_interactive_tr_png__WEBPACK_IMPORTED_MODULE_71__,
  flyChooseObject: _steps_fly_object_to_collect_LTR_png__WEBPACK_IMPORTED_MODULE_72__,
  flyFlyingObject: _steps_fly_flying_heart_tr_png__WEBPACK_IMPORTED_MODULE_73__,
  flySelectFlyingSprite: _steps_fly_select_flyer_LTR_png__WEBPACK_IMPORTED_MODULE_74__,
  flyAddScore: _steps_add_variable_tr_gif__WEBPACK_IMPORTED_MODULE_18__,
  flyKeepScore: _steps_fly_keep_score_tr_png__WEBPACK_IMPORTED_MODULE_75__,
  flyAddScenery: _steps_fly_choose_scenery_LTR_gif__WEBPACK_IMPORTED_MODULE_76__,
  flyMoveScenery: _steps_fly_move_scenery_tr_png__WEBPACK_IMPORTED_MODULE_77__,
  flySwitchLooks: _steps_fly_switch_costume_tr_png__WEBPACK_IMPORTED_MODULE_78__,
  // Pong
  pongAddBackdrop: _steps_pong_add_backdrop_LTR_png__WEBPACK_IMPORTED_MODULE_79__,
  pongAddBallSprite: _steps_pong_add_ball_sprite_LTR_png__WEBPACK_IMPORTED_MODULE_80__,
  pongBounceAround: _steps_pong_bounce_around_tr_png__WEBPACK_IMPORTED_MODULE_81__,
  pongAddPaddle: _steps_pong_add_a_paddle_LTR_gif__WEBPACK_IMPORTED_MODULE_82__,
  pongMoveThePaddle: _steps_pong_move_the_paddle_tr_png__WEBPACK_IMPORTED_MODULE_83__,
  pongSelectBallSprite: _steps_pong_select_ball_LTR_png__WEBPACK_IMPORTED_MODULE_84__,
  pongAddMoreCodeToBall: _steps_pong_add_code_to_ball_tr_png__WEBPACK_IMPORTED_MODULE_85__,
  pongAddAScore: _steps_add_variable_tr_gif__WEBPACK_IMPORTED_MODULE_18__,
  pongChooseScoreFromMenu: _steps_pong_choose_score_tr_png__WEBPACK_IMPORTED_MODULE_86__,
  pongInsertChangeScoreBlock: _steps_pong_insert_change_score_tr_png__WEBPACK_IMPORTED_MODULE_87__,
  pongResetScore: _steps_pong_reset_score_tr_png__WEBPACK_IMPORTED_MODULE_88__,
  pongAddLineSprite: _steps_pong_add_line_LTR_gif__WEBPACK_IMPORTED_MODULE_89__,
  pongGameOver: _steps_pong_game_over_tr_png__WEBPACK_IMPORTED_MODULE_90__,
  // Imagine a World
  imagineTypeWhatYouWant: _steps_imagine_type_what_you_want_tr_png__WEBPACK_IMPORTED_MODULE_91__,
  imagineClickGreenFlag: _steps_imagine_click_green_flag_tr_png__WEBPACK_IMPORTED_MODULE_92__,
  imagineChooseBackdrop: _steps_imagine_choose_backdrop_LTR_png__WEBPACK_IMPORTED_MODULE_93__,
  imagineChooseSprite: _steps_imagine_choose_any_sprite_LTR_png__WEBPACK_IMPORTED_MODULE_94__,
  imagineFlyAround: _steps_imagine_fly_around_tr_png__WEBPACK_IMPORTED_MODULE_95__,
  imagineChooseAnotherSprite: _steps_imagine_choose_another_sprite_LTR_png__WEBPACK_IMPORTED_MODULE_96__,
  imagineLeftRight: _steps_imagine_left_right_tr_png__WEBPACK_IMPORTED_MODULE_97__,
  imagineUpDown: _steps_imagine_up_down_tr_png__WEBPACK_IMPORTED_MODULE_98__,
  imagineChangeCostumes: _steps_imagine_change_costumes_tr_png__WEBPACK_IMPORTED_MODULE_99__,
  imagineGlideToPoint: _steps_imagine_glide_to_point_tr_png__WEBPACK_IMPORTED_MODULE_100__,
  imagineGrowShrink: _steps_imagine_grow_shrink_tr_png__WEBPACK_IMPORTED_MODULE_101__,
  imagineChooseAnotherBackdrop: _steps_imagine_choose_another_backdrop_LTR_png__WEBPACK_IMPORTED_MODULE_102__,
  imagineSwitchBackdrops: _steps_imagine_switch_backdrops_tr_png__WEBPACK_IMPORTED_MODULE_103__,
  imagineRecordASound: _steps_imagine_record_a_sound_tr_gif__WEBPACK_IMPORTED_MODULE_104__,
  imagineChooseSound: _steps_imagine_choose_sound_tr_png__WEBPACK_IMPORTED_MODULE_105__,
  // Add a Backdrop
  addBackdrop: _steps_add_backdrop_LTR_png__WEBPACK_IMPORTED_MODULE_106__,
  // Add Effects
  addEffects: _steps_add_effects_tr_png__WEBPACK_IMPORTED_MODULE_107__,
  // Hide and Show
  hideAndShow: _steps_hide_show_tr_png__WEBPACK_IMPORTED_MODULE_108__,
  // Switch Costumes
  switchCostumes: _steps_switch_costumes_tr_png__WEBPACK_IMPORTED_MODULE_109__,
  // Change Size
  changeSize: _steps_change_size_tr_png__WEBPACK_IMPORTED_MODULE_110__,
  // Spin
  spinTurn: _steps_spin_turn_tr_png__WEBPACK_IMPORTED_MODULE_111__,
  spinPointInDirection: _steps_spin_point_in_direction_tr_png__WEBPACK_IMPORTED_MODULE_112__,
  // Record a Sound
  recordASoundSoundsTab: _steps_record_a_sound_sounds_tab_tr_png__WEBPACK_IMPORTED_MODULE_113__,
  recordASoundClickRecord: _steps_record_a_sound_click_record_tr_png__WEBPACK_IMPORTED_MODULE_114__,
  recordASoundPressRecordButton: _steps_record_a_sound_press_record_button_tr_png__WEBPACK_IMPORTED_MODULE_115__,
  recordASoundChooseSound: _steps_record_a_sound_choose_sound_tr_png__WEBPACK_IMPORTED_MODULE_116__,
  recordASoundPlayYourSound: _steps_record_a_sound_play_your_sound_tr_png__WEBPACK_IMPORTED_MODULE_117__,
  // Use Arrow Keys
  moveArrowKeysLeftRight: _steps_move_arrow_keys_left_right_tr_png__WEBPACK_IMPORTED_MODULE_118__,
  moveArrowKeysUpDown: _steps_move_arrow_keys_up_down_tr_png__WEBPACK_IMPORTED_MODULE_119__,
  // Glide Around
  glideAroundBackAndForth: _steps_glide_around_back_and_forth_tr_png__WEBPACK_IMPORTED_MODULE_120__,
  glideAroundPoint: _steps_glide_around_point_tr_png__WEBPACK_IMPORTED_MODULE_121__,
  // Code a Cartoon
  codeCartoonSaySomething: _steps_code_cartoon_01_say_something_tr_png__WEBPACK_IMPORTED_MODULE_122__,
  codeCartoonAnimate: _steps_code_cartoon_02_animate_tr_png__WEBPACK_IMPORTED_MODULE_123__,
  codeCartoonSelectDifferentCharacter: _steps_code_cartoon_03_select_different_character_LTR_png__WEBPACK_IMPORTED_MODULE_124__,
  codeCartoonUseMinusSign: _steps_code_cartoon_04_use_minus_sign_tr_png__WEBPACK_IMPORTED_MODULE_125__,
  codeCartoonGrowShrink: _steps_code_cartoon_05_grow_shrink_tr_png__WEBPACK_IMPORTED_MODULE_126__,
  codeCartoonSelectDifferentCharacter2: _steps_code_cartoon_06_select_another_different_character_LTR_png__WEBPACK_IMPORTED_MODULE_127__,
  codeCartoonJump: _steps_code_cartoon_07_jump_tr_png__WEBPACK_IMPORTED_MODULE_128__,
  codeCartoonChangeScenes: _steps_code_cartoon_08_change_scenes_tr_png__WEBPACK_IMPORTED_MODULE_129__,
  codeCartoonGlideAround: _steps_code_cartoon_09_glide_around_tr_png__WEBPACK_IMPORTED_MODULE_130__,
  codeCartoonChangeCostumes: _steps_code_cartoon_10_change_costumes_tr_png__WEBPACK_IMPORTED_MODULE_131__,
  codeCartoonChooseMoreCharacters: _steps_code_cartoon_11_choose_more_characters_LTR_png__WEBPACK_IMPORTED_MODULE_132__,
  // Talking Tales
  talesAddExtension: _steps_speech_add_extension_tr_gif__WEBPACK_IMPORTED_MODULE_3__,
  talesChooseSprite: _steps_talking_2_choose_sprite_LTR_png__WEBPACK_IMPORTED_MODULE_133__,
  talesSaySomething: _steps_talking_3_say_something_tr_png__WEBPACK_IMPORTED_MODULE_134__,
  talesAskAnswer: _steps_talking_13_ask_and_answer_tr_png__WEBPACK_IMPORTED_MODULE_144__,
  talesChooseBackdrop: _steps_talking_4_choose_backdrop_LTR_png__WEBPACK_IMPORTED_MODULE_135__,
  talesSwitchBackdrop: _steps_talking_5_switch_backdrop_tr_png__WEBPACK_IMPORTED_MODULE_136__,
  talesChooseAnotherSprite: _steps_talking_6_choose_another_sprite_LTR_png__WEBPACK_IMPORTED_MODULE_137__,
  talesMoveAround: _steps_talking_7_move_around_tr_png__WEBPACK_IMPORTED_MODULE_138__,
  talesChooseAnotherBackdrop: _steps_talking_8_choose_another_backdrop_LTR_png__WEBPACK_IMPORTED_MODULE_139__,
  talesAnimateTalking: _steps_talking_9_animate_tr_png__WEBPACK_IMPORTED_MODULE_140__,
  talesChooseThirdBackdrop: _steps_talking_10_choose_third_backdrop_LTR_png__WEBPACK_IMPORTED_MODULE_141__,
  talesChooseSound: _steps_talking_11_choose_sound_tr_gif__WEBPACK_IMPORTED_MODULE_142__,
  talesDanceMoves: _steps_talking_12_dance_moves_tr_png__WEBPACK_IMPORTED_MODULE_143__
};


/***/ }),

/***/ "./src/lib/libraries/decks/steps/add-effects.tr.png":
/*!**********************************************************!*\
  !*** ./src/lib/libraries/decks/steps/add-effects.tr.png ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/add-effects.tr.94db901f0d56f241af20.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/add-variable.tr.gif":
/*!***********************************************************!*\
  !*** ./src/lib/libraries/decks/steps/add-variable.tr.gif ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/add-variable.tr.5535f63d90bcb911bb5e.gif";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/animate-char-add-sound.tr.png":
/*!*********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/animate-char-add-sound.tr.png ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/animate-char-add-sound.tr.2ba3e406ddf90348369b.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/animate-char-change-color.tr.png":
/*!************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/animate-char-change-color.tr.png ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/animate-char-change-color.tr.a5adf1ebee60e8a99892.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/animate-char-jump.tr.png":
/*!****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/animate-char-jump.tr.png ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/animate-char-jump.tr.a09773def64c710875b4.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/animate-char-move.tr.png":
/*!****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/animate-char-move.tr.png ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/animate-char-move.tr.fca6d0b4b6450d330526.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/animate-char-say-something.tr.png":
/*!*************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/animate-char-say-something.tr.png ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/animate-char-say-something.tr.5c7aef090784f2c93ec2.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/animate-char-talk.tr.png":
/*!****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/animate-char-talk.tr.png ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/animate-char-talk.tr.caf16273a566477c7d6f.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/change-size.tr.png":
/*!**********************************************************!*\
  !*** ./src/lib/libraries/decks/steps/change-size.tr.png ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/change-size.tr.0ad4f7b010b7c161ccdb.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/chase-game-change-score.tr.png":
/*!**********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/chase-game-change-score.tr.png ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/chase-game-change-score.tr.68b50c25d8554b2b642e.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/chase-game-move-randomly.tr.png":
/*!***********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/chase-game-move-randomly.tr.png ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/chase-game-move-randomly.tr.e48dbd5a1782029a8fa2.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/chase-game-play-sound.tr.png":
/*!********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/chase-game-play-sound.tr.png ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/chase-game-play-sound.tr.eca255cc2e52faca2824.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/chase-game-right-left.tr.png":
/*!********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/chase-game-right-left.tr.png ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/chase-game-right-left.tr.96f65e8877b4dabe8e8f.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/chase-game-up-down.tr.png":
/*!*****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/chase-game-up-down.tr.png ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/chase-game-up-down.tr.441f818d605df6415b51.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/cn-backdrop.tr.png":
/*!**********************************************************!*\
  !*** ./src/lib/libraries/decks/steps/cn-backdrop.tr.png ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/cn-backdrop.tr.98917eee6d87e2c62779.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/cn-collect.tr.png":
/*!*********************************************************!*\
  !*** ./src/lib/libraries/decks/steps/cn-collect.tr.png ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/cn-collect.tr.a3d5e913469ff07c3576.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/cn-glide.tr.png":
/*!*******************************************************!*\
  !*** ./src/lib/libraries/decks/steps/cn-glide.tr.png ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/cn-glide.tr.a674fbfdd19c1692a5e3.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/cn-say.tr.png":
/*!*****************************************************!*\
  !*** ./src/lib/libraries/decks/steps/cn-say.tr.png ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/cn-say.tr.eaf4325fac98b4a3a160.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/cn-score.tr.png":
/*!*******************************************************!*\
  !*** ./src/lib/libraries/decks/steps/cn-score.tr.png ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/cn-score.tr.5e8d35e10b13c9fa9f14.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/code-cartoon-01-say-something.tr.png":
/*!****************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/code-cartoon-01-say-something.tr.png ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/code-cartoon-01-say-something.tr.979520fc7f2f44c9189e.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/code-cartoon-02-animate.tr.png":
/*!**********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/code-cartoon-02-animate.tr.png ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/code-cartoon-02-animate.tr.74e61812d4f7c5620b86.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/code-cartoon-04-use-minus-sign.tr.png":
/*!*****************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/code-cartoon-04-use-minus-sign.tr.png ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/code-cartoon-04-use-minus-sign.tr.e301dbda6b370b31505f.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/code-cartoon-05-grow-shrink.tr.png":
/*!**************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/code-cartoon-05-grow-shrink.tr.png ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/code-cartoon-05-grow-shrink.tr.10da6cc8ff4b0625464b.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/code-cartoon-07-jump.tr.png":
/*!*******************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/code-cartoon-07-jump.tr.png ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/code-cartoon-07-jump.tr.8475994a5fcdec354f43.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/code-cartoon-08-change-scenes.tr.png":
/*!****************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/code-cartoon-08-change-scenes.tr.png ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/code-cartoon-08-change-scenes.tr.230c50c72908a602d92f.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/code-cartoon-09-glide-around.tr.png":
/*!***************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/code-cartoon-09-glide-around.tr.png ***!
  \***************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/code-cartoon-09-glide-around.tr.1439974d80867862c54c.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/code-cartoon-10-change-costumes.tr.png":
/*!******************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/code-cartoon-10-change-costumes.tr.png ***!
  \******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/code-cartoon-10-change-costumes.tr.fd3601b8ca4839c69379.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/fly-flying-heart.tr.png":
/*!***************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/fly-flying-heart.tr.png ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/fly-flying-heart.tr.e31df8e64a7d6216199c.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/fly-keep-score.tr.png":
/*!*************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/fly-keep-score.tr.png ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/fly-keep-score.tr.97b5549849b4f975f137.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/fly-make-interactive.tr.png":
/*!*******************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/fly-make-interactive.tr.png ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/fly-make-interactive.tr.fa1ca804731813f7b633.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/fly-move-scenery.tr.png":
/*!***************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/fly-move-scenery.tr.png ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/fly-move-scenery.tr.03be0afb8c044559ff59.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/fly-say-something.tr.png":
/*!****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/fly-say-something.tr.png ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/fly-say-something.tr.b6e8cd443224857d9e6f.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/fly-switch-costume.tr.png":
/*!*****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/fly-switch-costume.tr.png ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/fly-switch-costume.tr.82c8c7584b9a525c7f42.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/glide-around-back-and-forth.tr.png":
/*!**************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/glide-around-back-and-forth.tr.png ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/glide-around-back-and-forth.tr.fd290d53be8c706ee1e9.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/glide-around-point.tr.png":
/*!*****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/glide-around-point.tr.png ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/glide-around-point.tr.1dd550093bcd6a17fe0f.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/hide-show.tr.png":
/*!********************************************************!*\
  !*** ./src/lib/libraries/decks/steps/hide-show.tr.png ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/hide-show.tr.ce56b695ae8ccb5faa8c.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/imagine-change-costumes.tr.png":
/*!**********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/imagine-change-costumes.tr.png ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/imagine-change-costumes.tr.973c43bb12ccb7bd424c.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/imagine-choose-sound.tr.png":
/*!*******************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/imagine-choose-sound.tr.png ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/imagine-choose-sound.tr.2a24a4521494dfaf2c60.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/imagine-click-green-flag.tr.png":
/*!***********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/imagine-click-green-flag.tr.png ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/imagine-click-green-flag.tr.213583db3aa18af39c53.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/imagine-fly-around.tr.png":
/*!*****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/imagine-fly-around.tr.png ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/imagine-fly-around.tr.dee2410c13e2843784ae.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/imagine-glide-to-point.tr.png":
/*!*********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/imagine-glide-to-point.tr.png ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/imagine-glide-to-point.tr.02ba444be8e58971337a.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/imagine-grow-shrink.tr.png":
/*!******************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/imagine-grow-shrink.tr.png ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/imagine-grow-shrink.tr.ba1df64f73538e3ea949.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/imagine-left-right.tr.png":
/*!*****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/imagine-left-right.tr.png ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/imagine-left-right.tr.c293e6a0c6f526b23c67.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/imagine-record-a-sound.tr.gif":
/*!*********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/imagine-record-a-sound.tr.gif ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/imagine-record-a-sound.tr.a180b5a515554072a228.gif";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/imagine-switch-backdrops.tr.png":
/*!***********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/imagine-switch-backdrops.tr.png ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/imagine-switch-backdrops.tr.61abbe6b69e28b9a05d9.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/imagine-type-what-you-want.tr.png":
/*!*************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/imagine-type-what-you-want.tr.png ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/imagine-type-what-you-want.tr.8a72332ddef41a941a46.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/imagine-up-down.tr.png":
/*!**************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/imagine-up-down.tr.png ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/imagine-up-down.tr.14c23970cf59b177856b.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/intro-1-move.tr.gif":
/*!***********************************************************!*\
  !*** ./src/lib/libraries/decks/steps/intro-1-move.tr.gif ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/intro-1-move.tr.e2745bdb19ddd7c58173.gif";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/intro-2-say.tr.gif":
/*!**********************************************************!*\
  !*** ./src/lib/libraries/decks/steps/intro-2-say.tr.gif ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/intro-2-say.tr.87f64db6eb759b554c26.gif";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/intro-3-green-flag.tr.gif":
/*!*****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/intro-3-green-flag.tr.gif ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/intro-3-green-flag.tr.7e1705b0b84cc2bbb37f.gif";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/move-arrow-keys-left-right.tr.png":
/*!*************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/move-arrow-keys-left-right.tr.png ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/move-arrow-keys-left-right.tr.04b45c8c2b3e98654c96.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/move-arrow-keys-up-down.tr.png":
/*!**********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/move-arrow-keys-up-down.tr.png ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/move-arrow-keys-up-down.tr.24a5e493dba23aa41724.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/music-make-beat.tr.png":
/*!**************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/music-make-beat.tr.png ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/music-make-beat.tr.9cc88045f3cabd4c3fcd.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/music-make-beatbox.tr.png":
/*!*****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/music-make-beatbox.tr.png ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/music-make-beatbox.tr.a4db5bb0139609010db3.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/music-make-song.tr.png":
/*!**************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/music-make-song.tr.png ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/music-make-song.tr.3f2380f56cad46f2062c.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/music-play-sound.tr.png":
/*!***************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/music-play-sound.tr.png ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/music-play-sound.tr.ffe953993b2e78e5475c.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/name-change-color.tr.png":
/*!****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/name-change-color.tr.png ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/name-change-color.tr.7187ea45b8c390dd9792.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/name-grow.tr.png":
/*!********************************************************!*\
  !*** ./src/lib/libraries/decks/steps/name-grow.tr.png ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/name-grow.tr.becd595db949fd660134.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/name-play-sound.tr.png":
/*!**************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/name-play-sound.tr.png ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/name-play-sound.tr.fa5af041d82443d56f92.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/name-spin.tr.png":
/*!********************************************************!*\
  !*** ./src/lib/libraries/decks/steps/name-spin.tr.png ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/name-spin.tr.444917d4a77ee0a81914.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/pong-add-code-to-ball.tr.png":
/*!********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/pong-add-code-to-ball.tr.png ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/pong-add-code-to-ball.tr.be6855aafcd708ca1144.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/pong-bounce-around.tr.png":
/*!*****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/pong-bounce-around.tr.png ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/pong-bounce-around.tr.df9f89ac9ca6f20ed051.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/pong-choose-score.tr.png":
/*!****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/pong-choose-score.tr.png ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/pong-choose-score.tr.7f285395d3b6f2285433.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/pong-game-over.tr.png":
/*!*************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/pong-game-over.tr.png ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/pong-game-over.tr.08fb8965604ff7f53cbb.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/pong-insert-change-score.tr.png":
/*!***********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/pong-insert-change-score.tr.png ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/pong-insert-change-score.tr.1935b436ac96e68f0790.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/pong-move-the-paddle.tr.png":
/*!*******************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/pong-move-the-paddle.tr.png ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/pong-move-the-paddle.tr.06fff8fafea226704401.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/pong-reset-score.tr.png":
/*!***************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/pong-reset-score.tr.png ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/pong-reset-score.tr.3331f77a86b0a0fcf1a8.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/pop-game-change-color.tr.png":
/*!********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/pop-game-change-color.tr.png ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/pop-game-change-color.tr.be64f545fb6f2ee96006.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/pop-game-change-score.tr.png":
/*!********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/pop-game-change-score.tr.png ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/pop-game-change-score.tr.de249f29522f229c1fd1.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/pop-game-play-sound.tr.png":
/*!******************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/pop-game-play-sound.tr.png ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/pop-game-play-sound.tr.c6e2f2a5f46ef6ce88ef.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/pop-game-random-position.tr.png":
/*!***********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/pop-game-random-position.tr.png ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/pop-game-random-position.tr.3a12322df7e0962a2c2c.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/pop-game-reset-score.tr.png":
/*!*******************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/pop-game-reset-score.tr.png ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/pop-game-reset-score.tr.16176109364ad32d0e86.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/record-a-sound-choose-sound.tr.png":
/*!**************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/record-a-sound-choose-sound.tr.png ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/record-a-sound-choose-sound.tr.9fe52c3fce039f46a148.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/record-a-sound-click-record.tr.png":
/*!**************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/record-a-sound-click-record.tr.png ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/record-a-sound-click-record.tr.b40b5b135b5815108bdd.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/record-a-sound-play-your-sound.tr.png":
/*!*****************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/record-a-sound-play-your-sound.tr.png ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = "data:image/png;base64,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";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/record-a-sound-press-record-button.tr.png":
/*!*********************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/record-a-sound-press-record-button.tr.png ***!
  \*********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/record-a-sound-press-record-button.tr.8566f52d6609ec465a7a.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/record-a-sound-sounds-tab.tr.png":
/*!************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/record-a-sound-sounds-tab.tr.png ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/record-a-sound-sounds-tab.tr.f11c7c6e9d2a9213f8fc.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/speech-add-extension.tr.gif":
/*!*******************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/speech-add-extension.tr.gif ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/speech-add-extension.tr.ce07991d8c3de08cf53c.gif";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/speech-change-color.tr.png":
/*!******************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/speech-change-color.tr.png ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/speech-change-color.tr.d4059f479110da75caa2.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/speech-grow-shrink.tr.png":
/*!*****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/speech-grow-shrink.tr.png ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/speech-grow-shrink.tr.250e1b5178b3225fd6ba.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/speech-move-around.tr.png":
/*!*****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/speech-move-around.tr.png ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/speech-move-around.tr.7474db8a69cfc0dc5582.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/speech-say-something.tr.png":
/*!*******************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/speech-say-something.tr.png ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/speech-say-something.tr.59c5591d77baf06776e3.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/speech-set-voice.tr.png":
/*!***************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/speech-set-voice.tr.png ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/speech-set-voice.tr.98eb24b8d132596b468c.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/speech-song.tr.png":
/*!**********************************************************!*\
  !*** ./src/lib/libraries/decks/steps/speech-song.tr.png ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/speech-song.tr.ebadd75f0186b97ad76e.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/speech-spin.tr.png":
/*!**********************************************************!*\
  !*** ./src/lib/libraries/decks/steps/speech-spin.tr.png ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/speech-spin.tr.f92ee1c77808d911e305.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/spin-point-in-direction.tr.png":
/*!**********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/spin-point-in-direction.tr.png ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/spin-point-in-direction.tr.bd05eb10105eeb31a116.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/spin-turn.tr.png":
/*!********************************************************!*\
  !*** ./src/lib/libraries/decks/steps/spin-turn.tr.png ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/spin-turn.tr.8f450d3f5813d38fa452.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/story-conversation.tr.png":
/*!*****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/story-conversation.tr.png ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/story-conversation.tr.02996fe6baaf299100f5.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/story-flip.tr.gif":
/*!*********************************************************!*\
  !*** ./src/lib/libraries/decks/steps/story-flip.tr.gif ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/story-flip.tr.9af4b3064503d658a55f.gif";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/story-hide-character.tr.png":
/*!*******************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/story-hide-character.tr.png ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/story-hide-character.tr.5f2678812e5dd475fc75.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/story-say-something.tr.png":
/*!******************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/story-say-something.tr.png ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/story-say-something.tr.9e8d31f21665138485fd.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/story-show-character.tr.png":
/*!*******************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/story-show-character.tr.png ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/story-show-character.tr.bc34eb5b1d16d40406a5.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/story-switch-backdrop.tr.png":
/*!********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/story-switch-backdrop.tr.png ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/story-switch-backdrop.tr.efdcf973b0345d1cb68e.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/switch-costumes.tr.png":
/*!**************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/switch-costumes.tr.png ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/switch-costumes.tr.9e66a3e58cf070433edf.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/talking-11-choose-sound.tr.gif":
/*!**********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/talking-11-choose-sound.tr.gif ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/talking-11-choose-sound.tr.9bc0fa7cab5684056158.gif";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/talking-12-dance-moves.tr.png":
/*!*********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/talking-12-dance-moves.tr.png ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/talking-12-dance-moves.tr.af5a438a2b88e40eaa02.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/talking-13-ask-and-answer.tr.png":
/*!************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/talking-13-ask-and-answer.tr.png ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/talking-13-ask-and-answer.tr.ee2fde6dce11006d5c9d.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/talking-3-say-something.tr.png":
/*!**********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/talking-3-say-something.tr.png ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/talking-3-say-something.tr.f1b1f5bba8a4adba5eab.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/talking-5-switch-backdrop.tr.png":
/*!************************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/talking-5-switch-backdrop.tr.png ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/talking-5-switch-backdrop.tr.e1fc659560ff4a605f7d.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/talking-7-move-around.tr.png":
/*!********************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/talking-7-move-around.tr.png ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/talking-7-move-around.tr.6aa60807dc9db68551c1.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/talking-9-animate.tr.png":
/*!****************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/talking-9-animate.tr.png ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/talking-9-animate.tr.af02888e81748cc742c6.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/video-add-extension.tr.gif":
/*!******************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/video-add-extension.tr.gif ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/video-add-extension.tr.471bbaab8238e35be181.gif";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/video-animate.tr.png":
/*!************************************************************!*\
  !*** ./src/lib/libraries/decks/steps/video-animate.tr.png ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/video-animate.tr.6e5e6bcb4cb11921f93c.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/video-pet.tr.png":
/*!********************************************************!*\
  !*** ./src/lib/libraries/decks/steps/video-pet.tr.png ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/video-pet.tr.5c6e45385e798895444c.png";

/***/ }),

/***/ "./src/lib/libraries/decks/steps/video-pop.tr.png":
/*!********************************************************!*\
  !*** ./src/lib/libraries/decks/steps/video-pop.tr.png ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/assets/video-pop.tr.8934ddd913df4498ad87.png";

/***/ })

}]);
//# sourceMappingURL=tr-steps.fd6a7cf929d78fd4e58a.js.map