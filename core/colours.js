/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2016 Massachusetts Institute of Technology
 * All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

goog.provide('Blockly.Colours');

Blockly.Colours = {
  // SVG colours: these must be specificed in #RRGGBB style
  // To add an opacity, this must be specified as a separate property (for SVG fill-opacity)
  "motion": {
    "primary": "#4C97FF",
    "secondary": "#4280D7",
    "tertiary": "#3373CC"
  },
  "looks": {
    "primary": "#9966FF",
    "secondary": "#855CD6",
    "tertiary": "#774DCB"
  },
  "sounds": {
    "primary": "#D65CD6",
    "secondary": "#BF40BF",
    "tertiary": "#A63FA6"
  },
  "control": {
    "primary": "#FFAB19",
    "secondary": "#EC9C13",
    "tertiary": "#CF8B17"
  },
  "event": {
    "primary": "#FFD500",
    "secondary": "#DBC200",
    "tertiary": "#CCAA00"
  },
  "text": "#575E75",
  "workspace": "#F5F8FF",
  "toolbox": "#DDDDDD",
  "toolboxText": "#000000",
  "flyout": "#DDDDDD",
  "scrollbar": "#CCCCCC",
  "scrollbarHover": '#BBBBBB',
  "textField": "#FFFFFF",
  "insertionMarker": "#949494",
  "insertionMarkerOpacity": 0.6,
  "dragShadowOpacity": 0.3,
  "stackGlow": "#FFF200",
  "stackGlowOpacity": 1,
  // CSS colours: support RGBA
  "fieldShadow": "rgba(0,0,0,0.1)",
  "dropDownShadow": "rgba(0, 0, 0, .3)",
  "numPadBackground": "#547AB2",
  "numPadBorder": "#435F91",
  "numPadActiveBackground": "#435F91",
  "numPadText": "#FFFFFF"
};
