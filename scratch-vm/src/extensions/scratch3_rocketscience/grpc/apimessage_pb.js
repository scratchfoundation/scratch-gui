// source: apimessage.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

var observor_pb = require('./observor_pb.js');
goog.object.extend(proto, observor_pb);
goog.exportSymbol('proto.Ablator', null, global);
goog.exportSymbol('proto.AblatorsDecoupleRequest', null, global);
goog.exportSymbol('proto.AblatorsDecoupleResponse', null, global);
goog.exportSymbol('proto.Antenna', null, global);
goog.exportSymbol('proto.CameraMode', null, global);
goog.exportSymbol('proto.CargoBay', null, global);
goog.exportSymbol('proto.Command', null, global);
goog.exportSymbol('proto.Command.ModuleControlState', null, global);
goog.exportSymbol('proto.Command.SignalStrengthLevel', null, global);
goog.exportSymbol('proto.Command.VesselControlState', null, global);
goog.exportSymbol('proto.ControlSurface', null, global);
goog.exportSymbol('proto.Converter', null, global);
goog.exportSymbol('proto.ConverterResource', null, global);
goog.exportSymbol('proto.Decoupler', null, global);
goog.exportSymbol('proto.DecouplersActivateRequest', null, global);
goog.exportSymbol('proto.DecouplersActivateResponse', null, global);
goog.exportSymbol('proto.DecreaseTimeWarpRateByRequest', null, global);
goog.exportSymbol('proto.DecreaseTimeWarpRateByResponse', null, global);
goog.exportSymbol('proto.DecreaseTimeWarpRateRequest', null, global);
goog.exportSymbol('proto.DecreaseTimeWarpRateResponse', null, global);
goog.exportSymbol('proto.DisengageAutoPilotRequest', null, global);
goog.exportSymbol('proto.DisengageAutoPilotResponse', null, global);
goog.exportSymbol('proto.DockingPort', null, global);
goog.exportSymbol('proto.Engine', null, global);
goog.exportSymbol('proto.EnginesActivateRequest', null, global);
goog.exportSymbol('proto.EnginesActivateResponse', null, global);
goog.exportSymbol('proto.EnginesShutDownRequest', null, global);
goog.exportSymbol('proto.EnginesShutDownResponse', null, global);
goog.exportSymbol('proto.Fairing', null, global);
goog.exportSymbol('proto.FairingsJettisonRequest', null, global);
goog.exportSymbol('proto.FairingsJettisonResponse', null, global);
goog.exportSymbol('proto.Generator', null, global);
goog.exportSymbol('proto.GetFlightSceneStartTimeRequest', null, global);
goog.exportSymbol('proto.GetFlightSceneStartTimeResponse', null, global);
goog.exportSymbol('proto.GetManeuverNodeRequest', null, global);
goog.exportSymbol('proto.GetManeuverNodeResponse', null, global);
goog.exportSymbol('proto.GetTimeWarpRateRequest', null, global);
goog.exportSymbol('proto.GetTimeWarpRateResponse', null, global);
goog.exportSymbol('proto.GetVesselPartsByTypeRequest', null, global);
goog.exportSymbol('proto.GetVesselPartsByTypeResponse', null, global);
goog.exportSymbol('proto.IncreaseTimeWarpRateByRequest', null, global);
goog.exportSymbol('proto.IncreaseTimeWarpRateByResponse', null, global);
goog.exportSymbol('proto.IncreaseTimeWarpRateRequest', null, global);
goog.exportSymbol('proto.IncreaseTimeWarpRateResponse', null, global);
goog.exportSymbol('proto.Intake', null, global);
goog.exportSymbol('proto.LaunchClampsReleaseRequest', null, global);
goog.exportSymbol('proto.LaunchClampsReleaseResponse', null, global);
goog.exportSymbol('proto.Leg', null, global);
goog.exportSymbol('proto.Light', null, global);
goog.exportSymbol('proto.ListManeuverNodesRequest', null, global);
goog.exportSymbol('proto.ListManeuverNodesResponse', null, global);
goog.exportSymbol('proto.ManeuverNode', null, global);
goog.exportSymbol('proto.Parachute', null, global);
goog.exportSymbol('proto.ParachutesDeployRequest', null, global);
goog.exportSymbol('proto.ParachutesDeployResponse', null, global);
goog.exportSymbol('proto.Part', null, global);
goog.exportSymbol('proto.Part.PartType', null, global);
goog.exportSymbol('proto.RCS', null, global);
goog.exportSymbol('proto.RCSesEnabledRequest', null, global);
goog.exportSymbol('proto.RCSesEnabledResponse', null, global);
goog.exportSymbol('proto.Radiator', null, global);
goog.exportSymbol('proto.ReactionWheel', null, global);
goog.exportSymbol('proto.RemoveManeuverNodeRequest', null, global);
goog.exportSymbol('proto.RemoveManeuverNodeResponse', null, global);
goog.exportSymbol('proto.Request', null, global);
goog.exportSymbol('proto.Resource', null, global);
goog.exportSymbol('proto.ResourceConverter', null, global);
goog.exportSymbol('proto.ResourceHarvester', null, global);
goog.exportSymbol('proto.Resources', null, global);
goog.exportSymbol('proto.Response', null, global);
goog.exportSymbol('proto.RestoreCameraRequest', null, global);
goog.exportSymbol('proto.RestoreCameraResponse', null, global);
goog.exportSymbol('proto.SearchVesselPartsByTagRequest', null, global);
goog.exportSymbol('proto.SearchVesselPartsByTagResponse', null, global);
goog.exportSymbol('proto.Sensor', null, global);
goog.exportSymbol('proto.SetAntennasRequest', null, global);
goog.exportSymbol('proto.SetAntennasResponse', null, global);
goog.exportSymbol('proto.SetCameraFocussedVesselRequest', null, global);
goog.exportSymbol('proto.SetCameraFocussedVesselResponse', null, global);
goog.exportSymbol('proto.SetCameraModeRequest', null, global);
goog.exportSymbol('proto.SetCameraModeResponse', null, global);
goog.exportSymbol('proto.SetHeadingRequest', null, global);
goog.exportSymbol('proto.SetHeadingResponse', null, global);
goog.exportSymbol('proto.SetHeadingRollFirstRequest', null, global);
goog.exportSymbol('proto.SetHeadingRollFirstResponse', null, global);
goog.exportSymbol('proto.SetLightsRequest', null, global);
goog.exportSymbol('proto.SetLightsResponse', null, global);
goog.exportSymbol('proto.SetManeuverNodeRequest', null, global);
goog.exportSymbol('proto.SetManeuverNodeResponse', null, global);
goog.exportSymbol('proto.SetOrientationRequest', null, global);
goog.exportSymbol('proto.SetOrientationResponse', null, global);
goog.exportSymbol('proto.SetOrientationRollFirstRequest', null, global);
goog.exportSymbol('proto.SetOrientationRollFirstResponse', null, global);
goog.exportSymbol('proto.SetRCSRequest', null, global);
goog.exportSymbol('proto.SetRCSResponse', null, global);
goog.exportSymbol('proto.SetSASModeRequest', null, global);
goog.exportSymbol('proto.SetSASModeResponse', null, global);
goog.exportSymbol('proto.SetSASRequest', null, global);
goog.exportSymbol('proto.SetSASResponse', null, global);
goog.exportSymbol('proto.SetSolarPanelsRequest', null, global);
goog.exportSymbol('proto.SetSolarPanelsResponse', null, global);
goog.exportSymbol('proto.SolarPanel', null, global);
goog.exportSymbol('proto.StageRequest', null, global);
goog.exportSymbol('proto.StageResponse', null, global);
goog.exportSymbol('proto.StopTimeWarpRequest', null, global);
goog.exportSymbol('proto.StopTimeWarpResponse', null, global);
goog.exportSymbol('proto.SwitchActiveVesselRequest', null, global);
goog.exportSymbol('proto.SwitchActiveVesselResponse', null, global);
goog.exportSymbol('proto.ThrottleRequest', null, global);
goog.exportSymbol('proto.ThrottleResponse', null, global);
goog.exportSymbol('proto.ToggleActionGroupRequest', null, global);
goog.exportSymbol('proto.ToggleActionGroupResponse', null, global);
goog.exportSymbol('proto.UniversalTimeRequest', null, global);
goog.exportSymbol('proto.UniversalTimeResponse', null, global);
goog.exportSymbol('proto.WarpToRequest', null, global);
goog.exportSymbol('proto.WarpToResponse', null, global);
goog.exportSymbol('proto.WarpToSecondsAfterRequest', null, global);
goog.exportSymbol('proto.Wheel', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.RCSesEnabledRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.RCSesEnabledRequest.repeatedFields_, null);
};
goog.inherits(proto.RCSesEnabledRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.RCSesEnabledRequest.displayName = 'proto.RCSesEnabledRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.RCSesEnabledResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.RCSesEnabledResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.RCSesEnabledResponse.displayName = 'proto.RCSesEnabledResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.ParachutesDeployRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.ParachutesDeployRequest.repeatedFields_, null);
};
goog.inherits(proto.ParachutesDeployRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.ParachutesDeployRequest.displayName = 'proto.ParachutesDeployRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.ParachutesDeployResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.ParachutesDeployResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.ParachutesDeployResponse.displayName = 'proto.ParachutesDeployResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.FairingsJettisonRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.FairingsJettisonRequest.repeatedFields_, null);
};
goog.inherits(proto.FairingsJettisonRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.FairingsJettisonRequest.displayName = 'proto.FairingsJettisonRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.FairingsJettisonResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.FairingsJettisonResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.FairingsJettisonResponse.displayName = 'proto.FairingsJettisonResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.AblatorsDecoupleRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.AblatorsDecoupleRequest.repeatedFields_, null);
};
goog.inherits(proto.AblatorsDecoupleRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.AblatorsDecoupleRequest.displayName = 'proto.AblatorsDecoupleRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.AblatorsDecoupleResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.AblatorsDecoupleResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.AblatorsDecoupleResponse.displayName = 'proto.AblatorsDecoupleResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.DecouplersActivateRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.DecouplersActivateRequest.repeatedFields_, null);
};
goog.inherits(proto.DecouplersActivateRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.DecouplersActivateRequest.displayName = 'proto.DecouplersActivateRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.DecouplersActivateResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.DecouplersActivateResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.DecouplersActivateResponse.displayName = 'proto.DecouplersActivateResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.EnginesActivateRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.EnginesActivateRequest.repeatedFields_, null);
};
goog.inherits(proto.EnginesActivateRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.EnginesActivateRequest.displayName = 'proto.EnginesActivateRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.EnginesActivateResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.EnginesActivateResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.EnginesActivateResponse.displayName = 'proto.EnginesActivateResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.EnginesShutDownRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.EnginesShutDownRequest.repeatedFields_, null);
};
goog.inherits(proto.EnginesShutDownRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.EnginesShutDownRequest.displayName = 'proto.EnginesShutDownRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.EnginesShutDownResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.EnginesShutDownResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.EnginesShutDownResponse.displayName = 'proto.EnginesShutDownResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.LaunchClampsReleaseRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.LaunchClampsReleaseRequest.repeatedFields_, null);
};
goog.inherits(proto.LaunchClampsReleaseRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.LaunchClampsReleaseRequest.displayName = 'proto.LaunchClampsReleaseRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.LaunchClampsReleaseResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.LaunchClampsReleaseResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.LaunchClampsReleaseResponse.displayName = 'proto.LaunchClampsReleaseResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.RestoreCameraRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.RestoreCameraRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.RestoreCameraRequest.displayName = 'proto.RestoreCameraRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.RestoreCameraResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.RestoreCameraResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.RestoreCameraResponse.displayName = 'proto.RestoreCameraResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.SetCameraFocussedVesselRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.SetCameraFocussedVesselRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.SetCameraFocussedVesselRequest.displayName = 'proto.SetCameraFocussedVesselRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.SetCameraFocussedVesselResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.SetCameraFocussedVesselResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.SetCameraFocussedVesselResponse.displayName = 'proto.SetCameraFocussedVesselResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.SetCameraModeRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.SetCameraModeRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.SetCameraModeRequest.displayName = 'proto.SetCameraModeRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.SetCameraModeResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.SetCameraModeResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.SetCameraModeResponse.displayName = 'proto.SetCameraModeResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.ManeuverNode = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.ManeuverNode, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.ManeuverNode.displayName = 'proto.ManeuverNode';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.SetManeuverNodeRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.SetManeuverNodeRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.SetManeuverNodeRequest.displayName = 'proto.SetManeuverNodeRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.SetManeuverNodeResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.SetManeuverNodeResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.SetManeuverNodeResponse.displayName = 'proto.SetManeuverNodeResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.GetManeuverNodeRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.GetManeuverNodeRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.GetManeuverNodeRequest.displayName = 'proto.GetManeuverNodeRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.GetManeuverNodeResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.GetManeuverNodeResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.GetManeuverNodeResponse.displayName = 'proto.GetManeuverNodeResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.ListManeuverNodesRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.ListManeuverNodesRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.ListManeuverNodesRequest.displayName = 'proto.ListManeuverNodesRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.ListManeuverNodesResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.ListManeuverNodesResponse.repeatedFields_, null);
};
goog.inherits(proto.ListManeuverNodesResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.ListManeuverNodesResponse.displayName = 'proto.ListManeuverNodesResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.RemoveManeuverNodeRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.RemoveManeuverNodeRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.RemoveManeuverNodeRequest.displayName = 'proto.RemoveManeuverNodeRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.RemoveManeuverNodeResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.RemoveManeuverNodeResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.RemoveManeuverNodeResponse.displayName = 'proto.RemoveManeuverNodeResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.UniversalTimeRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.UniversalTimeRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.UniversalTimeRequest.displayName = 'proto.UniversalTimeRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.UniversalTimeResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.UniversalTimeResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.UniversalTimeResponse.displayName = 'proto.UniversalTimeResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.WarpToRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.WarpToRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.WarpToRequest.displayName = 'proto.WarpToRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.WarpToSecondsAfterRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.WarpToSecondsAfterRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.WarpToSecondsAfterRequest.displayName = 'proto.WarpToSecondsAfterRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.WarpToResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.WarpToResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.WarpToResponse.displayName = 'proto.WarpToResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.IncreaseTimeWarpRateRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.IncreaseTimeWarpRateRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.IncreaseTimeWarpRateRequest.displayName = 'proto.IncreaseTimeWarpRateRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.IncreaseTimeWarpRateResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.IncreaseTimeWarpRateResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.IncreaseTimeWarpRateResponse.displayName = 'proto.IncreaseTimeWarpRateResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.DecreaseTimeWarpRateRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.DecreaseTimeWarpRateRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.DecreaseTimeWarpRateRequest.displayName = 'proto.DecreaseTimeWarpRateRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.DecreaseTimeWarpRateResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.DecreaseTimeWarpRateResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.DecreaseTimeWarpRateResponse.displayName = 'proto.DecreaseTimeWarpRateResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.IncreaseTimeWarpRateByRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.IncreaseTimeWarpRateByRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.IncreaseTimeWarpRateByRequest.displayName = 'proto.IncreaseTimeWarpRateByRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.IncreaseTimeWarpRateByResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.IncreaseTimeWarpRateByResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.IncreaseTimeWarpRateByResponse.displayName = 'proto.IncreaseTimeWarpRateByResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.DecreaseTimeWarpRateByRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.DecreaseTimeWarpRateByRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.DecreaseTimeWarpRateByRequest.displayName = 'proto.DecreaseTimeWarpRateByRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.DecreaseTimeWarpRateByResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.DecreaseTimeWarpRateByResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.DecreaseTimeWarpRateByResponse.displayName = 'proto.DecreaseTimeWarpRateByResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.StopTimeWarpRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.StopTimeWarpRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.StopTimeWarpRequest.displayName = 'proto.StopTimeWarpRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.StopTimeWarpResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.StopTimeWarpResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.StopTimeWarpResponse.displayName = 'proto.StopTimeWarpResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.GetTimeWarpRateRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.GetTimeWarpRateRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.GetTimeWarpRateRequest.displayName = 'proto.GetTimeWarpRateRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.GetTimeWarpRateResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.GetTimeWarpRateResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.GetTimeWarpRateResponse.displayName = 'proto.GetTimeWarpRateResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.GetFlightSceneStartTimeRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.GetFlightSceneStartTimeRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.GetFlightSceneStartTimeRequest.displayName = 'proto.GetFlightSceneStartTimeRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.GetFlightSceneStartTimeResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.GetFlightSceneStartTimeResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.GetFlightSceneStartTimeResponse.displayName = 'proto.GetFlightSceneStartTimeResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.SwitchActiveVesselRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.SwitchActiveVesselRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.SwitchActiveVesselRequest.displayName = 'proto.SwitchActiveVesselRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.SwitchActiveVesselResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.SwitchActiveVesselResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.SwitchActiveVesselResponse.displayName = 'proto.SwitchActiveVesselResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.SearchVesselPartsByTagRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.SearchVesselPartsByTagRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.SearchVesselPartsByTagRequest.displayName = 'proto.SearchVesselPartsByTagRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.SearchVesselPartsByTagResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.SearchVesselPartsByTagResponse.repeatedFields_, null);
};
goog.inherits(proto.SearchVesselPartsByTagResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.SearchVesselPartsByTagResponse.displayName = 'proto.SearchVesselPartsByTagResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.GetVesselPartsByTypeRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.GetVesselPartsByTypeRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.GetVesselPartsByTypeRequest.displayName = 'proto.GetVesselPartsByTypeRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.GetVesselPartsByTypeResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.GetVesselPartsByTypeResponse.repeatedFields_, null);
};
goog.inherits(proto.GetVesselPartsByTypeResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.GetVesselPartsByTypeResponse.displayName = 'proto.GetVesselPartsByTypeResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.StageRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.StageRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.StageRequest.displayName = 'proto.StageRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.StageResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.StageResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.StageResponse.displayName = 'proto.StageResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.ThrottleRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.ThrottleRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.ThrottleRequest.displayName = 'proto.ThrottleRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.ThrottleResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.ThrottleResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.ThrottleResponse.displayName = 'proto.ThrottleResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.SetSASRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.SetSASRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.SetSASRequest.displayName = 'proto.SetSASRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.SetSASResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.SetSASResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.SetSASResponse.displayName = 'proto.SetSASResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.SetSASModeRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.SetSASModeRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.SetSASModeRequest.displayName = 'proto.SetSASModeRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.SetSASModeResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.SetSASModeResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.SetSASModeResponse.displayName = 'proto.SetSASModeResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.SetRCSRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.SetRCSRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.SetRCSRequest.displayName = 'proto.SetRCSRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.SetRCSResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.SetRCSResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.SetRCSResponse.displayName = 'proto.SetRCSResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.SetLightsRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.SetLightsRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.SetLightsRequest.displayName = 'proto.SetLightsRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.SetLightsResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.SetLightsResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.SetLightsResponse.displayName = 'proto.SetLightsResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.SetAntennasRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.SetAntennasRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.SetAntennasRequest.displayName = 'proto.SetAntennasRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.SetAntennasResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.SetAntennasResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.SetAntennasResponse.displayName = 'proto.SetAntennasResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.ToggleActionGroupRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.ToggleActionGroupRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.ToggleActionGroupRequest.displayName = 'proto.ToggleActionGroupRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.ToggleActionGroupResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.ToggleActionGroupResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.ToggleActionGroupResponse.displayName = 'proto.ToggleActionGroupResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.SetSolarPanelsRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.SetSolarPanelsRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.SetSolarPanelsRequest.displayName = 'proto.SetSolarPanelsRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.SetSolarPanelsResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.SetSolarPanelsResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.SetSolarPanelsResponse.displayName = 'proto.SetSolarPanelsResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.SetHeadingRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.SetHeadingRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.SetHeadingRequest.displayName = 'proto.SetHeadingRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.SetHeadingResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.SetHeadingResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.SetHeadingResponse.displayName = 'proto.SetHeadingResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.SetHeadingRollFirstRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.SetHeadingRollFirstRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.SetHeadingRollFirstRequest.displayName = 'proto.SetHeadingRollFirstRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.SetHeadingRollFirstResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.SetHeadingRollFirstResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.SetHeadingRollFirstResponse.displayName = 'proto.SetHeadingRollFirstResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.SetOrientationRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.SetOrientationRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.SetOrientationRequest.displayName = 'proto.SetOrientationRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.SetOrientationResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.SetOrientationResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.SetOrientationResponse.displayName = 'proto.SetOrientationResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.SetOrientationRollFirstRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.SetOrientationRollFirstRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.SetOrientationRollFirstRequest.displayName = 'proto.SetOrientationRollFirstRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.SetOrientationRollFirstResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.SetOrientationRollFirstResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.SetOrientationRollFirstResponse.displayName = 'proto.SetOrientationRollFirstResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.DisengageAutoPilotRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.DisengageAutoPilotRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.DisengageAutoPilotRequest.displayName = 'proto.DisengageAutoPilotRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.DisengageAutoPilotResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.DisengageAutoPilotResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.DisengageAutoPilotResponse.displayName = 'proto.DisengageAutoPilotResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Request = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.Request, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.Request.displayName = 'proto.Request';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Response = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.Response, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.Response.displayName = 'proto.Response';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Wheel = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.Wheel, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.Wheel.displayName = 'proto.Wheel';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.SolarPanel = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.SolarPanel, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.SolarPanel.displayName = 'proto.SolarPanel';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Sensor = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.Sensor, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.Sensor.displayName = 'proto.Sensor';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.ResourceHarvester = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.ResourceHarvester, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.ResourceHarvester.displayName = 'proto.ResourceHarvester';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.ConverterResource = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.ConverterResource, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.ConverterResource.displayName = 'proto.ConverterResource';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Converter = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.Converter.repeatedFields_, null);
};
goog.inherits(proto.Converter, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.Converter.displayName = 'proto.Converter';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.ResourceConverter = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.ResourceConverter.repeatedFields_, null);
};
goog.inherits(proto.ResourceConverter, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.ResourceConverter.displayName = 'proto.ResourceConverter';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.ReactionWheel = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.ReactionWheel, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.ReactionWheel.displayName = 'proto.ReactionWheel';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.RCS = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.RCS.repeatedFields_, null);
};
goog.inherits(proto.RCS, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.RCS.displayName = 'proto.RCS';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Radiator = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.Radiator, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.Radiator.displayName = 'proto.Radiator';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Parachute = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.Parachute, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.Parachute.displayName = 'proto.Parachute';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Light = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.Light, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.Light.displayName = 'proto.Light';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Leg = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.Leg, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.Leg.displayName = 'proto.Leg';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Intake = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.Intake, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.Intake.displayName = 'proto.Intake';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Fairing = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.Fairing, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.Fairing.displayName = 'proto.Fairing';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Engine = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.Engine.repeatedFields_, null);
};
goog.inherits(proto.Engine, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.Engine.displayName = 'proto.Engine';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.DockingPort = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.DockingPort, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.DockingPort.displayName = 'proto.DockingPort';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Decoupler = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.Decoupler, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.Decoupler.displayName = 'proto.Decoupler';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.ControlSurface = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.ControlSurface, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.ControlSurface.displayName = 'proto.ControlSurface';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.CargoBay = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.CargoBay, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.CargoBay.displayName = 'proto.CargoBay';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Antenna = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.Antenna, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.Antenna.displayName = 'proto.Antenna';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Resource = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.Resource, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.Resource.displayName = 'proto.Resource';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Resources = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.Resources.repeatedFields_, null);
};
goog.inherits(proto.Resources, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.Resources.displayName = 'proto.Resources';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Command = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.Command, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.Command.displayName = 'proto.Command';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Ablator = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.Ablator, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.Ablator.displayName = 'proto.Ablator';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Generator = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.Generator, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.Generator.displayName = 'proto.Generator';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Part = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.Part.repeatedFields_, null);
};
goog.inherits(proto.Part, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.Part.displayName = 'proto.Part';
}

/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.RCSesEnabledRequest.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.RCSesEnabledRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.RCSesEnabledRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.RCSesEnabledRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.RCSesEnabledRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    idsList: (f = jspb.Message.getRepeatedField(msg, 1)) == null ? undefined : f,
    enabled: jspb.Message.getBooleanFieldWithDefault(msg, 2, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.RCSesEnabledRequest}
 */
proto.RCSesEnabledRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.RCSesEnabledRequest;
  return proto.RCSesEnabledRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.RCSesEnabledRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.RCSesEnabledRequest}
 */
proto.RCSesEnabledRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var values = /** @type {!Array<number>} */ (reader.isDelimited() ? reader.readPackedInt64() : [reader.readInt64()]);
      for (var i = 0; i < values.length; i++) {
        msg.addIds(values[i]);
      }
      break;
    case 2:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setEnabled(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.RCSesEnabledRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.RCSesEnabledRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.RCSesEnabledRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.RCSesEnabledRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getIdsList();
  if (f.length > 0) {
    writer.writePackedInt64(
      1,
      f
    );
  }
  f = message.getEnabled();
  if (f) {
    writer.writeBool(
      2,
      f
    );
  }
};


/**
 * repeated int64 ids = 1;
 * @return {!Array<number>}
 */
proto.RCSesEnabledRequest.prototype.getIdsList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedField(this, 1));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.RCSesEnabledRequest} returns this
 */
proto.RCSesEnabledRequest.prototype.setIdsList = function(value) {
  return jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.RCSesEnabledRequest} returns this
 */
proto.RCSesEnabledRequest.prototype.addIds = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.RCSesEnabledRequest} returns this
 */
proto.RCSesEnabledRequest.prototype.clearIdsList = function() {
  return this.setIdsList([]);
};


/**
 * optional bool enabled = 2;
 * @return {boolean}
 */
proto.RCSesEnabledRequest.prototype.getEnabled = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 2, false));
};


/**
 * @param {boolean} value
 * @return {!proto.RCSesEnabledRequest} returns this
 */
proto.RCSesEnabledRequest.prototype.setEnabled = function(value) {
  return jspb.Message.setProto3BooleanField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.RCSesEnabledResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.RCSesEnabledResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.RCSesEnabledResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.RCSesEnabledResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    code: jspb.Message.getFieldWithDefault(msg, 1, 0),
    message: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.RCSesEnabledResponse}
 */
proto.RCSesEnabledResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.RCSesEnabledResponse;
  return proto.RCSesEnabledResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.RCSesEnabledResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.RCSesEnabledResponse}
 */
proto.RCSesEnabledResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setCode(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.RCSesEnabledResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.RCSesEnabledResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.RCSesEnabledResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.RCSesEnabledResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional int32 code = 1;
 * @return {number}
 */
proto.RCSesEnabledResponse.prototype.getCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.RCSesEnabledResponse} returns this
 */
proto.RCSesEnabledResponse.prototype.setCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string message = 2;
 * @return {string}
 */
proto.RCSesEnabledResponse.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.RCSesEnabledResponse} returns this
 */
proto.RCSesEnabledResponse.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.ParachutesDeployRequest.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ParachutesDeployRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.ParachutesDeployRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ParachutesDeployRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ParachutesDeployRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    idsList: (f = jspb.Message.getRepeatedField(msg, 1)) == null ? undefined : f
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.ParachutesDeployRequest}
 */
proto.ParachutesDeployRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ParachutesDeployRequest;
  return proto.ParachutesDeployRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ParachutesDeployRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ParachutesDeployRequest}
 */
proto.ParachutesDeployRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var values = /** @type {!Array<number>} */ (reader.isDelimited() ? reader.readPackedInt64() : [reader.readInt64()]);
      for (var i = 0; i < values.length; i++) {
        msg.addIds(values[i]);
      }
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ParachutesDeployRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.ParachutesDeployRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.ParachutesDeployRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ParachutesDeployRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getIdsList();
  if (f.length > 0) {
    writer.writePackedInt64(
      1,
      f
    );
  }
};


/**
 * repeated int64 ids = 1;
 * @return {!Array<number>}
 */
proto.ParachutesDeployRequest.prototype.getIdsList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedField(this, 1));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.ParachutesDeployRequest} returns this
 */
proto.ParachutesDeployRequest.prototype.setIdsList = function(value) {
  return jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.ParachutesDeployRequest} returns this
 */
proto.ParachutesDeployRequest.prototype.addIds = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.ParachutesDeployRequest} returns this
 */
proto.ParachutesDeployRequest.prototype.clearIdsList = function() {
  return this.setIdsList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ParachutesDeployResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.ParachutesDeployResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ParachutesDeployResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ParachutesDeployResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    code: jspb.Message.getFieldWithDefault(msg, 1, 0),
    message: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.ParachutesDeployResponse}
 */
proto.ParachutesDeployResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ParachutesDeployResponse;
  return proto.ParachutesDeployResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ParachutesDeployResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ParachutesDeployResponse}
 */
proto.ParachutesDeployResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setCode(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ParachutesDeployResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.ParachutesDeployResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.ParachutesDeployResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ParachutesDeployResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional int32 code = 1;
 * @return {number}
 */
proto.ParachutesDeployResponse.prototype.getCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.ParachutesDeployResponse} returns this
 */
proto.ParachutesDeployResponse.prototype.setCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string message = 2;
 * @return {string}
 */
proto.ParachutesDeployResponse.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.ParachutesDeployResponse} returns this
 */
proto.ParachutesDeployResponse.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.FairingsJettisonRequest.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.FairingsJettisonRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.FairingsJettisonRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.FairingsJettisonRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.FairingsJettisonRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    idsList: (f = jspb.Message.getRepeatedField(msg, 1)) == null ? undefined : f
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.FairingsJettisonRequest}
 */
proto.FairingsJettisonRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.FairingsJettisonRequest;
  return proto.FairingsJettisonRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.FairingsJettisonRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.FairingsJettisonRequest}
 */
proto.FairingsJettisonRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var values = /** @type {!Array<number>} */ (reader.isDelimited() ? reader.readPackedInt64() : [reader.readInt64()]);
      for (var i = 0; i < values.length; i++) {
        msg.addIds(values[i]);
      }
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.FairingsJettisonRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.FairingsJettisonRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.FairingsJettisonRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.FairingsJettisonRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getIdsList();
  if (f.length > 0) {
    writer.writePackedInt64(
      1,
      f
    );
  }
};


/**
 * repeated int64 ids = 1;
 * @return {!Array<number>}
 */
proto.FairingsJettisonRequest.prototype.getIdsList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedField(this, 1));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.FairingsJettisonRequest} returns this
 */
proto.FairingsJettisonRequest.prototype.setIdsList = function(value) {
  return jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.FairingsJettisonRequest} returns this
 */
proto.FairingsJettisonRequest.prototype.addIds = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.FairingsJettisonRequest} returns this
 */
proto.FairingsJettisonRequest.prototype.clearIdsList = function() {
  return this.setIdsList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.FairingsJettisonResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.FairingsJettisonResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.FairingsJettisonResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.FairingsJettisonResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    code: jspb.Message.getFieldWithDefault(msg, 1, 0),
    message: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.FairingsJettisonResponse}
 */
proto.FairingsJettisonResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.FairingsJettisonResponse;
  return proto.FairingsJettisonResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.FairingsJettisonResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.FairingsJettisonResponse}
 */
proto.FairingsJettisonResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setCode(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.FairingsJettisonResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.FairingsJettisonResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.FairingsJettisonResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.FairingsJettisonResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional int32 code = 1;
 * @return {number}
 */
proto.FairingsJettisonResponse.prototype.getCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.FairingsJettisonResponse} returns this
 */
proto.FairingsJettisonResponse.prototype.setCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string message = 2;
 * @return {string}
 */
proto.FairingsJettisonResponse.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.FairingsJettisonResponse} returns this
 */
proto.FairingsJettisonResponse.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.AblatorsDecoupleRequest.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.AblatorsDecoupleRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.AblatorsDecoupleRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.AblatorsDecoupleRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.AblatorsDecoupleRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    idsList: (f = jspb.Message.getRepeatedField(msg, 1)) == null ? undefined : f
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.AblatorsDecoupleRequest}
 */
proto.AblatorsDecoupleRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.AblatorsDecoupleRequest;
  return proto.AblatorsDecoupleRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.AblatorsDecoupleRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.AblatorsDecoupleRequest}
 */
proto.AblatorsDecoupleRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var values = /** @type {!Array<number>} */ (reader.isDelimited() ? reader.readPackedInt64() : [reader.readInt64()]);
      for (var i = 0; i < values.length; i++) {
        msg.addIds(values[i]);
      }
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.AblatorsDecoupleRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.AblatorsDecoupleRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.AblatorsDecoupleRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.AblatorsDecoupleRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getIdsList();
  if (f.length > 0) {
    writer.writePackedInt64(
      1,
      f
    );
  }
};


/**
 * repeated int64 ids = 1;
 * @return {!Array<number>}
 */
proto.AblatorsDecoupleRequest.prototype.getIdsList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedField(this, 1));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.AblatorsDecoupleRequest} returns this
 */
proto.AblatorsDecoupleRequest.prototype.setIdsList = function(value) {
  return jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.AblatorsDecoupleRequest} returns this
 */
proto.AblatorsDecoupleRequest.prototype.addIds = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.AblatorsDecoupleRequest} returns this
 */
proto.AblatorsDecoupleRequest.prototype.clearIdsList = function() {
  return this.setIdsList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.AblatorsDecoupleResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.AblatorsDecoupleResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.AblatorsDecoupleResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.AblatorsDecoupleResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    code: jspb.Message.getFieldWithDefault(msg, 1, 0),
    message: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.AblatorsDecoupleResponse}
 */
proto.AblatorsDecoupleResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.AblatorsDecoupleResponse;
  return proto.AblatorsDecoupleResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.AblatorsDecoupleResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.AblatorsDecoupleResponse}
 */
proto.AblatorsDecoupleResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setCode(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.AblatorsDecoupleResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.AblatorsDecoupleResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.AblatorsDecoupleResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.AblatorsDecoupleResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional int32 code = 1;
 * @return {number}
 */
proto.AblatorsDecoupleResponse.prototype.getCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.AblatorsDecoupleResponse} returns this
 */
proto.AblatorsDecoupleResponse.prototype.setCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string message = 2;
 * @return {string}
 */
proto.AblatorsDecoupleResponse.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.AblatorsDecoupleResponse} returns this
 */
proto.AblatorsDecoupleResponse.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.DecouplersActivateRequest.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.DecouplersActivateRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.DecouplersActivateRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.DecouplersActivateRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.DecouplersActivateRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    idsList: (f = jspb.Message.getRepeatedField(msg, 1)) == null ? undefined : f
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.DecouplersActivateRequest}
 */
proto.DecouplersActivateRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.DecouplersActivateRequest;
  return proto.DecouplersActivateRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.DecouplersActivateRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.DecouplersActivateRequest}
 */
proto.DecouplersActivateRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var values = /** @type {!Array<number>} */ (reader.isDelimited() ? reader.readPackedInt64() : [reader.readInt64()]);
      for (var i = 0; i < values.length; i++) {
        msg.addIds(values[i]);
      }
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.DecouplersActivateRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.DecouplersActivateRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.DecouplersActivateRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.DecouplersActivateRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getIdsList();
  if (f.length > 0) {
    writer.writePackedInt64(
      1,
      f
    );
  }
};


/**
 * repeated int64 ids = 1;
 * @return {!Array<number>}
 */
proto.DecouplersActivateRequest.prototype.getIdsList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedField(this, 1));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.DecouplersActivateRequest} returns this
 */
proto.DecouplersActivateRequest.prototype.setIdsList = function(value) {
  return jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.DecouplersActivateRequest} returns this
 */
proto.DecouplersActivateRequest.prototype.addIds = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.DecouplersActivateRequest} returns this
 */
proto.DecouplersActivateRequest.prototype.clearIdsList = function() {
  return this.setIdsList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.DecouplersActivateResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.DecouplersActivateResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.DecouplersActivateResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.DecouplersActivateResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    code: jspb.Message.getFieldWithDefault(msg, 1, 0),
    message: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.DecouplersActivateResponse}
 */
proto.DecouplersActivateResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.DecouplersActivateResponse;
  return proto.DecouplersActivateResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.DecouplersActivateResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.DecouplersActivateResponse}
 */
proto.DecouplersActivateResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setCode(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.DecouplersActivateResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.DecouplersActivateResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.DecouplersActivateResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.DecouplersActivateResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional int32 code = 1;
 * @return {number}
 */
proto.DecouplersActivateResponse.prototype.getCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.DecouplersActivateResponse} returns this
 */
proto.DecouplersActivateResponse.prototype.setCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string message = 2;
 * @return {string}
 */
proto.DecouplersActivateResponse.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.DecouplersActivateResponse} returns this
 */
proto.DecouplersActivateResponse.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.EnginesActivateRequest.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.EnginesActivateRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.EnginesActivateRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.EnginesActivateRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.EnginesActivateRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    idsList: (f = jspb.Message.getRepeatedField(msg, 1)) == null ? undefined : f
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.EnginesActivateRequest}
 */
proto.EnginesActivateRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.EnginesActivateRequest;
  return proto.EnginesActivateRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.EnginesActivateRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.EnginesActivateRequest}
 */
proto.EnginesActivateRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var values = /** @type {!Array<number>} */ (reader.isDelimited() ? reader.readPackedInt64() : [reader.readInt64()]);
      for (var i = 0; i < values.length; i++) {
        msg.addIds(values[i]);
      }
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.EnginesActivateRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.EnginesActivateRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.EnginesActivateRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.EnginesActivateRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getIdsList();
  if (f.length > 0) {
    writer.writePackedInt64(
      1,
      f
    );
  }
};


/**
 * repeated int64 ids = 1;
 * @return {!Array<number>}
 */
proto.EnginesActivateRequest.prototype.getIdsList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedField(this, 1));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.EnginesActivateRequest} returns this
 */
proto.EnginesActivateRequest.prototype.setIdsList = function(value) {
  return jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.EnginesActivateRequest} returns this
 */
proto.EnginesActivateRequest.prototype.addIds = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.EnginesActivateRequest} returns this
 */
proto.EnginesActivateRequest.prototype.clearIdsList = function() {
  return this.setIdsList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.EnginesActivateResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.EnginesActivateResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.EnginesActivateResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.EnginesActivateResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    code: jspb.Message.getFieldWithDefault(msg, 1, 0),
    message: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.EnginesActivateResponse}
 */
proto.EnginesActivateResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.EnginesActivateResponse;
  return proto.EnginesActivateResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.EnginesActivateResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.EnginesActivateResponse}
 */
proto.EnginesActivateResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setCode(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.EnginesActivateResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.EnginesActivateResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.EnginesActivateResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.EnginesActivateResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional int32 code = 1;
 * @return {number}
 */
proto.EnginesActivateResponse.prototype.getCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.EnginesActivateResponse} returns this
 */
proto.EnginesActivateResponse.prototype.setCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string message = 2;
 * @return {string}
 */
proto.EnginesActivateResponse.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.EnginesActivateResponse} returns this
 */
proto.EnginesActivateResponse.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.EnginesShutDownRequest.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.EnginesShutDownRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.EnginesShutDownRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.EnginesShutDownRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.EnginesShutDownRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    idsList: (f = jspb.Message.getRepeatedField(msg, 1)) == null ? undefined : f
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.EnginesShutDownRequest}
 */
proto.EnginesShutDownRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.EnginesShutDownRequest;
  return proto.EnginesShutDownRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.EnginesShutDownRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.EnginesShutDownRequest}
 */
proto.EnginesShutDownRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var values = /** @type {!Array<number>} */ (reader.isDelimited() ? reader.readPackedInt64() : [reader.readInt64()]);
      for (var i = 0; i < values.length; i++) {
        msg.addIds(values[i]);
      }
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.EnginesShutDownRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.EnginesShutDownRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.EnginesShutDownRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.EnginesShutDownRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getIdsList();
  if (f.length > 0) {
    writer.writePackedInt64(
      1,
      f
    );
  }
};


/**
 * repeated int64 ids = 1;
 * @return {!Array<number>}
 */
proto.EnginesShutDownRequest.prototype.getIdsList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedField(this, 1));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.EnginesShutDownRequest} returns this
 */
proto.EnginesShutDownRequest.prototype.setIdsList = function(value) {
  return jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.EnginesShutDownRequest} returns this
 */
proto.EnginesShutDownRequest.prototype.addIds = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.EnginesShutDownRequest} returns this
 */
proto.EnginesShutDownRequest.prototype.clearIdsList = function() {
  return this.setIdsList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.EnginesShutDownResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.EnginesShutDownResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.EnginesShutDownResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.EnginesShutDownResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    code: jspb.Message.getFieldWithDefault(msg, 1, 0),
    message: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.EnginesShutDownResponse}
 */
proto.EnginesShutDownResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.EnginesShutDownResponse;
  return proto.EnginesShutDownResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.EnginesShutDownResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.EnginesShutDownResponse}
 */
proto.EnginesShutDownResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setCode(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.EnginesShutDownResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.EnginesShutDownResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.EnginesShutDownResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.EnginesShutDownResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional int32 code = 1;
 * @return {number}
 */
proto.EnginesShutDownResponse.prototype.getCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.EnginesShutDownResponse} returns this
 */
proto.EnginesShutDownResponse.prototype.setCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string message = 2;
 * @return {string}
 */
proto.EnginesShutDownResponse.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.EnginesShutDownResponse} returns this
 */
proto.EnginesShutDownResponse.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.LaunchClampsReleaseRequest.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.LaunchClampsReleaseRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.LaunchClampsReleaseRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.LaunchClampsReleaseRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.LaunchClampsReleaseRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    idsList: (f = jspb.Message.getRepeatedField(msg, 1)) == null ? undefined : f
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.LaunchClampsReleaseRequest}
 */
proto.LaunchClampsReleaseRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.LaunchClampsReleaseRequest;
  return proto.LaunchClampsReleaseRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.LaunchClampsReleaseRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.LaunchClampsReleaseRequest}
 */
proto.LaunchClampsReleaseRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var values = /** @type {!Array<number>} */ (reader.isDelimited() ? reader.readPackedInt64() : [reader.readInt64()]);
      for (var i = 0; i < values.length; i++) {
        msg.addIds(values[i]);
      }
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.LaunchClampsReleaseRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.LaunchClampsReleaseRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.LaunchClampsReleaseRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.LaunchClampsReleaseRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getIdsList();
  if (f.length > 0) {
    writer.writePackedInt64(
      1,
      f
    );
  }
};


/**
 * repeated int64 ids = 1;
 * @return {!Array<number>}
 */
proto.LaunchClampsReleaseRequest.prototype.getIdsList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedField(this, 1));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.LaunchClampsReleaseRequest} returns this
 */
proto.LaunchClampsReleaseRequest.prototype.setIdsList = function(value) {
  return jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.LaunchClampsReleaseRequest} returns this
 */
proto.LaunchClampsReleaseRequest.prototype.addIds = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.LaunchClampsReleaseRequest} returns this
 */
proto.LaunchClampsReleaseRequest.prototype.clearIdsList = function() {
  return this.setIdsList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.LaunchClampsReleaseResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.LaunchClampsReleaseResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.LaunchClampsReleaseResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.LaunchClampsReleaseResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    code: jspb.Message.getFieldWithDefault(msg, 1, 0),
    message: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.LaunchClampsReleaseResponse}
 */
proto.LaunchClampsReleaseResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.LaunchClampsReleaseResponse;
  return proto.LaunchClampsReleaseResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.LaunchClampsReleaseResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.LaunchClampsReleaseResponse}
 */
proto.LaunchClampsReleaseResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setCode(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.LaunchClampsReleaseResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.LaunchClampsReleaseResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.LaunchClampsReleaseResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.LaunchClampsReleaseResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional int32 code = 1;
 * @return {number}
 */
proto.LaunchClampsReleaseResponse.prototype.getCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.LaunchClampsReleaseResponse} returns this
 */
proto.LaunchClampsReleaseResponse.prototype.setCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string message = 2;
 * @return {string}
 */
proto.LaunchClampsReleaseResponse.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.LaunchClampsReleaseResponse} returns this
 */
proto.LaunchClampsReleaseResponse.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.RestoreCameraRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.RestoreCameraRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.RestoreCameraRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.RestoreCameraRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    display: jspb.Message.getFieldWithDefault(msg, 1, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.RestoreCameraRequest}
 */
proto.RestoreCameraRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.RestoreCameraRequest;
  return proto.RestoreCameraRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.RestoreCameraRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.RestoreCameraRequest}
 */
proto.RestoreCameraRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setDisplay(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.RestoreCameraRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.RestoreCameraRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.RestoreCameraRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.RestoreCameraRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDisplay();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
};


/**
 * optional int32 display = 1;
 * @return {number}
 */
proto.RestoreCameraRequest.prototype.getDisplay = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.RestoreCameraRequest} returns this
 */
proto.RestoreCameraRequest.prototype.setDisplay = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.RestoreCameraResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.RestoreCameraResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.RestoreCameraResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.RestoreCameraResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    code: jspb.Message.getFieldWithDefault(msg, 1, 0),
    message: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.RestoreCameraResponse}
 */
proto.RestoreCameraResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.RestoreCameraResponse;
  return proto.RestoreCameraResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.RestoreCameraResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.RestoreCameraResponse}
 */
proto.RestoreCameraResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setCode(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.RestoreCameraResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.RestoreCameraResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.RestoreCameraResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.RestoreCameraResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional int32 code = 1;
 * @return {number}
 */
proto.RestoreCameraResponse.prototype.getCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.RestoreCameraResponse} returns this
 */
proto.RestoreCameraResponse.prototype.setCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string message = 2;
 * @return {string}
 */
proto.RestoreCameraResponse.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.RestoreCameraResponse} returns this
 */
proto.RestoreCameraResponse.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.SetCameraFocussedVesselRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.SetCameraFocussedVesselRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.SetCameraFocussedVesselRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SetCameraFocussedVesselRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    vesselid: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.SetCameraFocussedVesselRequest}
 */
proto.SetCameraFocussedVesselRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.SetCameraFocussedVesselRequest;
  return proto.SetCameraFocussedVesselRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.SetCameraFocussedVesselRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.SetCameraFocussedVesselRequest}
 */
proto.SetCameraFocussedVesselRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setVesselid(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.SetCameraFocussedVesselRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.SetCameraFocussedVesselRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.SetCameraFocussedVesselRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SetCameraFocussedVesselRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getVesselid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string vesselId = 1;
 * @return {string}
 */
proto.SetCameraFocussedVesselRequest.prototype.getVesselid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.SetCameraFocussedVesselRequest} returns this
 */
proto.SetCameraFocussedVesselRequest.prototype.setVesselid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.SetCameraFocussedVesselResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.SetCameraFocussedVesselResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.SetCameraFocussedVesselResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SetCameraFocussedVesselResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    code: jspb.Message.getFieldWithDefault(msg, 1, 0),
    message: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.SetCameraFocussedVesselResponse}
 */
proto.SetCameraFocussedVesselResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.SetCameraFocussedVesselResponse;
  return proto.SetCameraFocussedVesselResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.SetCameraFocussedVesselResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.SetCameraFocussedVesselResponse}
 */
proto.SetCameraFocussedVesselResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setCode(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.SetCameraFocussedVesselResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.SetCameraFocussedVesselResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.SetCameraFocussedVesselResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SetCameraFocussedVesselResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional int32 code = 1;
 * @return {number}
 */
proto.SetCameraFocussedVesselResponse.prototype.getCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.SetCameraFocussedVesselResponse} returns this
 */
proto.SetCameraFocussedVesselResponse.prototype.setCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string message = 2;
 * @return {string}
 */
proto.SetCameraFocussedVesselResponse.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.SetCameraFocussedVesselResponse} returns this
 */
proto.SetCameraFocussedVesselResponse.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.SetCameraModeRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.SetCameraModeRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.SetCameraModeRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SetCameraModeRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    mode: jspb.Message.getFieldWithDefault(msg, 1, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.SetCameraModeRequest}
 */
proto.SetCameraModeRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.SetCameraModeRequest;
  return proto.SetCameraModeRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.SetCameraModeRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.SetCameraModeRequest}
 */
proto.SetCameraModeRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.CameraMode} */ (reader.readEnum());
      msg.setMode(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.SetCameraModeRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.SetCameraModeRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.SetCameraModeRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SetCameraModeRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getMode();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
};


/**
 * optional CameraMode mode = 1;
 * @return {!proto.CameraMode}
 */
proto.SetCameraModeRequest.prototype.getMode = function() {
  return /** @type {!proto.CameraMode} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {!proto.CameraMode} value
 * @return {!proto.SetCameraModeRequest} returns this
 */
proto.SetCameraModeRequest.prototype.setMode = function(value) {
  return jspb.Message.setProto3EnumField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.SetCameraModeResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.SetCameraModeResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.SetCameraModeResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SetCameraModeResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    code: jspb.Message.getFieldWithDefault(msg, 1, 0),
    message: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.SetCameraModeResponse}
 */
proto.SetCameraModeResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.SetCameraModeResponse;
  return proto.SetCameraModeResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.SetCameraModeResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.SetCameraModeResponse}
 */
proto.SetCameraModeResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setCode(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.SetCameraModeResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.SetCameraModeResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.SetCameraModeResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SetCameraModeResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional int32 code = 1;
 * @return {number}
 */
proto.SetCameraModeResponse.prototype.getCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.SetCameraModeResponse} returns this
 */
proto.SetCameraModeResponse.prototype.setCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string message = 2;
 * @return {string}
 */
proto.SetCameraModeResponse.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.SetCameraModeResponse} returns this
 */
proto.SetCameraModeResponse.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ManeuverNode.prototype.toObject = function(opt_includeInstance) {
  return proto.ManeuverNode.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ManeuverNode} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ManeuverNode.toObject = function(includeInstance, msg) {
  var f, obj = {
    vesselid: jspb.Message.getFieldWithDefault(msg, 1, ""),
    ut: jspb.Message.getFloatingPointFieldWithDefault(msg, 2, 0.0),
    deltavvector: (f = msg.getDeltavvector()) && observor_pb.Vector3d.toObject(includeInstance, f),
    deltav: jspb.Message.getFloatingPointFieldWithDefault(msg, 4, 0.0),
    remainingburnvector: (f = msg.getRemainingburnvector()) && observor_pb.Vector3d.toObject(includeInstance, f),
    remainingdeltav: jspb.Message.getFloatingPointFieldWithDefault(msg, 6, 0.0),
    startburnin: jspb.Message.getFloatingPointFieldWithDefault(msg, 7, 0.0),
    burntime: jspb.Message.getFloatingPointFieldWithDefault(msg, 8, 0.0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.ManeuverNode}
 */
proto.ManeuverNode.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ManeuverNode;
  return proto.ManeuverNode.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ManeuverNode} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ManeuverNode}
 */
proto.ManeuverNode.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setVesselid(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setUt(value);
      break;
    case 3:
      var value = new observor_pb.Vector3d;
      reader.readMessage(value,observor_pb.Vector3d.deserializeBinaryFromReader);
      msg.setDeltavvector(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setDeltav(value);
      break;
    case 5:
      var value = new observor_pb.Vector3d;
      reader.readMessage(value,observor_pb.Vector3d.deserializeBinaryFromReader);
      msg.setRemainingburnvector(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setRemainingdeltav(value);
      break;
    case 7:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setStartburnin(value);
      break;
    case 8:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setBurntime(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ManeuverNode.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.ManeuverNode.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.ManeuverNode} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ManeuverNode.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getVesselid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getUt();
  if (f !== 0.0) {
    writer.writeDouble(
      2,
      f
    );
  }
  f = message.getDeltavvector();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      observor_pb.Vector3d.serializeBinaryToWriter
    );
  }
  f = message.getDeltav();
  if (f !== 0.0) {
    writer.writeDouble(
      4,
      f
    );
  }
  f = message.getRemainingburnvector();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      observor_pb.Vector3d.serializeBinaryToWriter
    );
  }
  f = message.getRemainingdeltav();
  if (f !== 0.0) {
    writer.writeDouble(
      6,
      f
    );
  }
  f = message.getStartburnin();
  if (f !== 0.0) {
    writer.writeDouble(
      7,
      f
    );
  }
  f = message.getBurntime();
  if (f !== 0.0) {
    writer.writeDouble(
      8,
      f
    );
  }
};


/**
 * optional string vesselId = 1;
 * @return {string}
 */
proto.ManeuverNode.prototype.getVesselid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.ManeuverNode} returns this
 */
proto.ManeuverNode.prototype.setVesselid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional double ut = 2;
 * @return {number}
 */
proto.ManeuverNode.prototype.getUt = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 2, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.ManeuverNode} returns this
 */
proto.ManeuverNode.prototype.setUt = function(value) {
  return jspb.Message.setProto3FloatField(this, 2, value);
};


/**
 * optional Vector3d deltaVVector = 3;
 * @return {?proto.Vector3d}
 */
proto.ManeuverNode.prototype.getDeltavvector = function() {
  return /** @type{?proto.Vector3d} */ (
    jspb.Message.getWrapperField(this, observor_pb.Vector3d, 3));
};


/**
 * @param {?proto.Vector3d|undefined} value
 * @return {!proto.ManeuverNode} returns this
*/
proto.ManeuverNode.prototype.setDeltavvector = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.ManeuverNode} returns this
 */
proto.ManeuverNode.prototype.clearDeltavvector = function() {
  return this.setDeltavvector(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.ManeuverNode.prototype.hasDeltavvector = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional double deltaV = 4;
 * @return {number}
 */
proto.ManeuverNode.prototype.getDeltav = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 4, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.ManeuverNode} returns this
 */
proto.ManeuverNode.prototype.setDeltav = function(value) {
  return jspb.Message.setProto3FloatField(this, 4, value);
};


/**
 * optional Vector3d remainingBurnVector = 5;
 * @return {?proto.Vector3d}
 */
proto.ManeuverNode.prototype.getRemainingburnvector = function() {
  return /** @type{?proto.Vector3d} */ (
    jspb.Message.getWrapperField(this, observor_pb.Vector3d, 5));
};


/**
 * @param {?proto.Vector3d|undefined} value
 * @return {!proto.ManeuverNode} returns this
*/
proto.ManeuverNode.prototype.setRemainingburnvector = function(value) {
  return jspb.Message.setWrapperField(this, 5, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.ManeuverNode} returns this
 */
proto.ManeuverNode.prototype.clearRemainingburnvector = function() {
  return this.setRemainingburnvector(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.ManeuverNode.prototype.hasRemainingburnvector = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional double remainingDeltaV = 6;
 * @return {number}
 */
proto.ManeuverNode.prototype.getRemainingdeltav = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 6, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.ManeuverNode} returns this
 */
proto.ManeuverNode.prototype.setRemainingdeltav = function(value) {
  return jspb.Message.setProto3FloatField(this, 6, value);
};


/**
 * optional double startBurnIn = 7;
 * @return {number}
 */
proto.ManeuverNode.prototype.getStartburnin = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 7, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.ManeuverNode} returns this
 */
proto.ManeuverNode.prototype.setStartburnin = function(value) {
  return jspb.Message.setProto3FloatField(this, 7, value);
};


/**
 * optional double burnTime = 8;
 * @return {number}
 */
proto.ManeuverNode.prototype.getBurntime = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 8, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.ManeuverNode} returns this
 */
proto.ManeuverNode.prototype.setBurntime = function(value) {
  return jspb.Message.setProto3FloatField(this, 8, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.SetManeuverNodeRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.SetManeuverNodeRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.SetManeuverNodeRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SetManeuverNodeRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    vesselid: jspb.Message.getFieldWithDefault(msg, 1, ""),
    ut: jspb.Message.getFloatingPointFieldWithDefault(msg, 2, 0.0),
    prograde: jspb.Message.getFloatingPointFieldWithDefault(msg, 3, 0.0),
    normal: jspb.Message.getFloatingPointFieldWithDefault(msg, 4, 0.0),
    radial: jspb.Message.getFloatingPointFieldWithDefault(msg, 5, 0.0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.SetManeuverNodeRequest}
 */
proto.SetManeuverNodeRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.SetManeuverNodeRequest;
  return proto.SetManeuverNodeRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.SetManeuverNodeRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.SetManeuverNodeRequest}
 */
proto.SetManeuverNodeRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setVesselid(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setUt(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setPrograde(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setNormal(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setRadial(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.SetManeuverNodeRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.SetManeuverNodeRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.SetManeuverNodeRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SetManeuverNodeRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getVesselid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getUt();
  if (f !== 0.0) {
    writer.writeDouble(
      2,
      f
    );
  }
  f = message.getPrograde();
  if (f !== 0.0) {
    writer.writeDouble(
      3,
      f
    );
  }
  f = message.getNormal();
  if (f !== 0.0) {
    writer.writeDouble(
      4,
      f
    );
  }
  f = message.getRadial();
  if (f !== 0.0) {
    writer.writeDouble(
      5,
      f
    );
  }
};


/**
 * optional string vesselId = 1;
 * @return {string}
 */
proto.SetManeuverNodeRequest.prototype.getVesselid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.SetManeuverNodeRequest} returns this
 */
proto.SetManeuverNodeRequest.prototype.setVesselid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional double ut = 2;
 * @return {number}
 */
proto.SetManeuverNodeRequest.prototype.getUt = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 2, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.SetManeuverNodeRequest} returns this
 */
proto.SetManeuverNodeRequest.prototype.setUt = function(value) {
  return jspb.Message.setProto3FloatField(this, 2, value);
};


/**
 * optional double prograde = 3;
 * @return {number}
 */
proto.SetManeuverNodeRequest.prototype.getPrograde = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 3, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.SetManeuverNodeRequest} returns this
 */
proto.SetManeuverNodeRequest.prototype.setPrograde = function(value) {
  return jspb.Message.setProto3FloatField(this, 3, value);
};


/**
 * optional double normal = 4;
 * @return {number}
 */
proto.SetManeuverNodeRequest.prototype.getNormal = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 4, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.SetManeuverNodeRequest} returns this
 */
proto.SetManeuverNodeRequest.prototype.setNormal = function(value) {
  return jspb.Message.setProto3FloatField(this, 4, value);
};


/**
 * optional double radial = 5;
 * @return {number}
 */
proto.SetManeuverNodeRequest.prototype.getRadial = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 5, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.SetManeuverNodeRequest} returns this
 */
proto.SetManeuverNodeRequest.prototype.setRadial = function(value) {
  return jspb.Message.setProto3FloatField(this, 5, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.SetManeuverNodeResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.SetManeuverNodeResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.SetManeuverNodeResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SetManeuverNodeResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    code: jspb.Message.getFieldWithDefault(msg, 1, 0),
    message: jspb.Message.getFieldWithDefault(msg, 2, ""),
    node: (f = msg.getNode()) && proto.ManeuverNode.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.SetManeuverNodeResponse}
 */
proto.SetManeuverNodeResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.SetManeuverNodeResponse;
  return proto.SetManeuverNodeResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.SetManeuverNodeResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.SetManeuverNodeResponse}
 */
proto.SetManeuverNodeResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setCode(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    case 3:
      var value = new proto.ManeuverNode;
      reader.readMessage(value,proto.ManeuverNode.deserializeBinaryFromReader);
      msg.setNode(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.SetManeuverNodeResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.SetManeuverNodeResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.SetManeuverNodeResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SetManeuverNodeResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getNode();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.ManeuverNode.serializeBinaryToWriter
    );
  }
};


/**
 * optional int32 code = 1;
 * @return {number}
 */
proto.SetManeuverNodeResponse.prototype.getCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.SetManeuverNodeResponse} returns this
 */
proto.SetManeuverNodeResponse.prototype.setCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string message = 2;
 * @return {string}
 */
proto.SetManeuverNodeResponse.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.SetManeuverNodeResponse} returns this
 */
proto.SetManeuverNodeResponse.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional ManeuverNode node = 3;
 * @return {?proto.ManeuverNode}
 */
proto.SetManeuverNodeResponse.prototype.getNode = function() {
  return /** @type{?proto.ManeuverNode} */ (
    jspb.Message.getWrapperField(this, proto.ManeuverNode, 3));
};


/**
 * @param {?proto.ManeuverNode|undefined} value
 * @return {!proto.SetManeuverNodeResponse} returns this
*/
proto.SetManeuverNodeResponse.prototype.setNode = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.SetManeuverNodeResponse} returns this
 */
proto.SetManeuverNodeResponse.prototype.clearNode = function() {
  return this.setNode(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.SetManeuverNodeResponse.prototype.hasNode = function() {
  return jspb.Message.getField(this, 3) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.GetManeuverNodeRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.GetManeuverNodeRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.GetManeuverNodeRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.GetManeuverNodeRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    vesselid: jspb.Message.getFieldWithDefault(msg, 1, ""),
    ut: jspb.Message.getFloatingPointFieldWithDefault(msg, 2, 0.0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.GetManeuverNodeRequest}
 */
proto.GetManeuverNodeRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.GetManeuverNodeRequest;
  return proto.GetManeuverNodeRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.GetManeuverNodeRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.GetManeuverNodeRequest}
 */
proto.GetManeuverNodeRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setVesselid(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setUt(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.GetManeuverNodeRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.GetManeuverNodeRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.GetManeuverNodeRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.GetManeuverNodeRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getVesselid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getUt();
  if (f !== 0.0) {
    writer.writeDouble(
      2,
      f
    );
  }
};


/**
 * optional string vesselId = 1;
 * @return {string}
 */
proto.GetManeuverNodeRequest.prototype.getVesselid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.GetManeuverNodeRequest} returns this
 */
proto.GetManeuverNodeRequest.prototype.setVesselid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional double ut = 2;
 * @return {number}
 */
proto.GetManeuverNodeRequest.prototype.getUt = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 2, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.GetManeuverNodeRequest} returns this
 */
proto.GetManeuverNodeRequest.prototype.setUt = function(value) {
  return jspb.Message.setProto3FloatField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.GetManeuverNodeResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.GetManeuverNodeResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.GetManeuverNodeResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.GetManeuverNodeResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    code: jspb.Message.getFieldWithDefault(msg, 1, 0),
    message: jspb.Message.getFieldWithDefault(msg, 2, ""),
    node: (f = msg.getNode()) && proto.ManeuverNode.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.GetManeuverNodeResponse}
 */
proto.GetManeuverNodeResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.GetManeuverNodeResponse;
  return proto.GetManeuverNodeResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.GetManeuverNodeResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.GetManeuverNodeResponse}
 */
proto.GetManeuverNodeResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setCode(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    case 3:
      var value = new proto.ManeuverNode;
      reader.readMessage(value,proto.ManeuverNode.deserializeBinaryFromReader);
      msg.setNode(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.GetManeuverNodeResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.GetManeuverNodeResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.GetManeuverNodeResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.GetManeuverNodeResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getNode();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.ManeuverNode.serializeBinaryToWriter
    );
  }
};


/**
 * optional int32 code = 1;
 * @return {number}
 */
proto.GetManeuverNodeResponse.prototype.getCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.GetManeuverNodeResponse} returns this
 */
proto.GetManeuverNodeResponse.prototype.setCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string message = 2;
 * @return {string}
 */
proto.GetManeuverNodeResponse.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.GetManeuverNodeResponse} returns this
 */
proto.GetManeuverNodeResponse.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional ManeuverNode node = 3;
 * @return {?proto.ManeuverNode}
 */
proto.GetManeuverNodeResponse.prototype.getNode = function() {
  return /** @type{?proto.ManeuverNode} */ (
    jspb.Message.getWrapperField(this, proto.ManeuverNode, 3));
};


/**
 * @param {?proto.ManeuverNode|undefined} value
 * @return {!proto.GetManeuverNodeResponse} returns this
*/
proto.GetManeuverNodeResponse.prototype.setNode = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.GetManeuverNodeResponse} returns this
 */
proto.GetManeuverNodeResponse.prototype.clearNode = function() {
  return this.setNode(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.GetManeuverNodeResponse.prototype.hasNode = function() {
  return jspb.Message.getField(this, 3) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ListManeuverNodesRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.ListManeuverNodesRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ListManeuverNodesRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ListManeuverNodesRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    vesselid: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.ListManeuverNodesRequest}
 */
proto.ListManeuverNodesRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ListManeuverNodesRequest;
  return proto.ListManeuverNodesRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ListManeuverNodesRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ListManeuverNodesRequest}
 */
proto.ListManeuverNodesRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setVesselid(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ListManeuverNodesRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.ListManeuverNodesRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.ListManeuverNodesRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ListManeuverNodesRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getVesselid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string vesselId = 1;
 * @return {string}
 */
proto.ListManeuverNodesRequest.prototype.getVesselid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.ListManeuverNodesRequest} returns this
 */
proto.ListManeuverNodesRequest.prototype.setVesselid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.ListManeuverNodesResponse.repeatedFields_ = [3];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ListManeuverNodesResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.ListManeuverNodesResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ListManeuverNodesResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ListManeuverNodesResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    code: jspb.Message.getFieldWithDefault(msg, 1, 0),
    message: jspb.Message.getFieldWithDefault(msg, 2, ""),
    nodesList: jspb.Message.toObjectList(msg.getNodesList(),
    proto.ManeuverNode.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.ListManeuverNodesResponse}
 */
proto.ListManeuverNodesResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ListManeuverNodesResponse;
  return proto.ListManeuverNodesResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ListManeuverNodesResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ListManeuverNodesResponse}
 */
proto.ListManeuverNodesResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setCode(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    case 3:
      var value = new proto.ManeuverNode;
      reader.readMessage(value,proto.ManeuverNode.deserializeBinaryFromReader);
      msg.addNodes(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ListManeuverNodesResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.ListManeuverNodesResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.ListManeuverNodesResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ListManeuverNodesResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getNodesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      3,
      f,
      proto.ManeuverNode.serializeBinaryToWriter
    );
  }
};


/**
 * optional int32 code = 1;
 * @return {number}
 */
proto.ListManeuverNodesResponse.prototype.getCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.ListManeuverNodesResponse} returns this
 */
proto.ListManeuverNodesResponse.prototype.setCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string message = 2;
 * @return {string}
 */
proto.ListManeuverNodesResponse.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.ListManeuverNodesResponse} returns this
 */
proto.ListManeuverNodesResponse.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * repeated ManeuverNode nodes = 3;
 * @return {!Array<!proto.ManeuverNode>}
 */
proto.ListManeuverNodesResponse.prototype.getNodesList = function() {
  return /** @type{!Array<!proto.ManeuverNode>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.ManeuverNode, 3));
};


/**
 * @param {!Array<!proto.ManeuverNode>} value
 * @return {!proto.ListManeuverNodesResponse} returns this
*/
proto.ListManeuverNodesResponse.prototype.setNodesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 3, value);
};


/**
 * @param {!proto.ManeuverNode=} opt_value
 * @param {number=} opt_index
 * @return {!proto.ManeuverNode}
 */
proto.ListManeuverNodesResponse.prototype.addNodes = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 3, opt_value, proto.ManeuverNode, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.ListManeuverNodesResponse} returns this
 */
proto.ListManeuverNodesResponse.prototype.clearNodesList = function() {
  return this.setNodesList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.RemoveManeuverNodeRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.RemoveManeuverNodeRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.RemoveManeuverNodeRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.RemoveManeuverNodeRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    vesselid: jspb.Message.getFieldWithDefault(msg, 1, ""),
    ut: jspb.Message.getFloatingPointFieldWithDefault(msg, 2, 0.0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.RemoveManeuverNodeRequest}
 */
proto.RemoveManeuverNodeRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.RemoveManeuverNodeRequest;
  return proto.RemoveManeuverNodeRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.RemoveManeuverNodeRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.RemoveManeuverNodeRequest}
 */
proto.RemoveManeuverNodeRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setVesselid(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setUt(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.RemoveManeuverNodeRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.RemoveManeuverNodeRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.RemoveManeuverNodeRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.RemoveManeuverNodeRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getVesselid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getUt();
  if (f !== 0.0) {
    writer.writeDouble(
      2,
      f
    );
  }
};


/**
 * optional string vesselId = 1;
 * @return {string}
 */
proto.RemoveManeuverNodeRequest.prototype.getVesselid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.RemoveManeuverNodeRequest} returns this
 */
proto.RemoveManeuverNodeRequest.prototype.setVesselid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional double ut = 2;
 * @return {number}
 */
proto.RemoveManeuverNodeRequest.prototype.getUt = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 2, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.RemoveManeuverNodeRequest} returns this
 */
proto.RemoveManeuverNodeRequest.prototype.setUt = function(value) {
  return jspb.Message.setProto3FloatField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.RemoveManeuverNodeResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.RemoveManeuverNodeResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.RemoveManeuverNodeResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.RemoveManeuverNodeResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    code: jspb.Message.getFieldWithDefault(msg, 1, 0),
    message: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.RemoveManeuverNodeResponse}
 */
proto.RemoveManeuverNodeResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.RemoveManeuverNodeResponse;
  return proto.RemoveManeuverNodeResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.RemoveManeuverNodeResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.RemoveManeuverNodeResponse}
 */
proto.RemoveManeuverNodeResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setCode(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.RemoveManeuverNodeResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.RemoveManeuverNodeResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.RemoveManeuverNodeResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.RemoveManeuverNodeResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional int32 code = 1;
 * @return {number}
 */
proto.RemoveManeuverNodeResponse.prototype.getCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.RemoveManeuverNodeResponse} returns this
 */
proto.RemoveManeuverNodeResponse.prototype.setCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string message = 2;
 * @return {string}
 */
proto.RemoveManeuverNodeResponse.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.RemoveManeuverNodeResponse} returns this
 */
proto.RemoveManeuverNodeResponse.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.UniversalTimeRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.UniversalTimeRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.UniversalTimeRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.UniversalTimeRequest.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.UniversalTimeRequest}
 */
proto.UniversalTimeRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.UniversalTimeRequest;
  return proto.UniversalTimeRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.UniversalTimeRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.UniversalTimeRequest}
 */
proto.UniversalTimeRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.UniversalTimeRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.UniversalTimeRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.UniversalTimeRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.UniversalTimeRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.UniversalTimeResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.UniversalTimeResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.UniversalTimeResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.UniversalTimeResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    code: jspb.Message.getFieldWithDefault(msg, 1, 0),
    message: jspb.Message.getFieldWithDefault(msg, 2, ""),
    ut: jspb.Message.getFloatingPointFieldWithDefault(msg, 3, 0.0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.UniversalTimeResponse}
 */
proto.UniversalTimeResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.UniversalTimeResponse;
  return proto.UniversalTimeResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.UniversalTimeResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.UniversalTimeResponse}
 */
proto.UniversalTimeResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setCode(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setUt(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.UniversalTimeResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.UniversalTimeResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.UniversalTimeResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.UniversalTimeResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getUt();
  if (f !== 0.0) {
    writer.writeDouble(
      3,
      f
    );
  }
};


/**
 * optional int32 code = 1;
 * @return {number}
 */
proto.UniversalTimeResponse.prototype.getCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.UniversalTimeResponse} returns this
 */
proto.UniversalTimeResponse.prototype.setCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string message = 2;
 * @return {string}
 */
proto.UniversalTimeResponse.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.UniversalTimeResponse} returns this
 */
proto.UniversalTimeResponse.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional double ut = 3;
 * @return {number}
 */
proto.UniversalTimeResponse.prototype.getUt = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 3, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.UniversalTimeResponse} returns this
 */
proto.UniversalTimeResponse.prototype.setUt = function(value) {
  return jspb.Message.setProto3FloatField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.WarpToRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.WarpToRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.WarpToRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.WarpToRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    ut: jspb.Message.getFloatingPointFieldWithDefault(msg, 1, 0.0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.WarpToRequest}
 */
proto.WarpToRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.WarpToRequest;
  return proto.WarpToRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.WarpToRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.WarpToRequest}
 */
proto.WarpToRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setUt(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.WarpToRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.WarpToRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.WarpToRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.WarpToRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUt();
  if (f !== 0.0) {
    writer.writeDouble(
      1,
      f
    );
  }
};


/**
 * optional double ut = 1;
 * @return {number}
 */
proto.WarpToRequest.prototype.getUt = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 1, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.WarpToRequest} returns this
 */
proto.WarpToRequest.prototype.setUt = function(value) {
  return jspb.Message.setProto3FloatField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.WarpToSecondsAfterRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.WarpToSecondsAfterRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.WarpToSecondsAfterRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.WarpToSecondsAfterRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    seconds: jspb.Message.getFloatingPointFieldWithDefault(msg, 1, 0.0),
    timetype: jspb.Message.getFieldWithDefault(msg, 2, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.WarpToSecondsAfterRequest}
 */
proto.WarpToSecondsAfterRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.WarpToSecondsAfterRequest;
  return proto.WarpToSecondsAfterRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.WarpToSecondsAfterRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.WarpToSecondsAfterRequest}
 */
proto.WarpToSecondsAfterRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setSeconds(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setTimetype(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.WarpToSecondsAfterRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.WarpToSecondsAfterRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.WarpToSecondsAfterRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.WarpToSecondsAfterRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSeconds();
  if (f !== 0.0) {
    writer.writeDouble(
      1,
      f
    );
  }
  f = message.getTimetype();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
};


/**
 * optional double seconds = 1;
 * @return {number}
 */
proto.WarpToSecondsAfterRequest.prototype.getSeconds = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 1, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.WarpToSecondsAfterRequest} returns this
 */
proto.WarpToSecondsAfterRequest.prototype.setSeconds = function(value) {
  return jspb.Message.setProto3FloatField(this, 1, value);
};


/**
 * optional int32 timeType = 2;
 * @return {number}
 */
proto.WarpToSecondsAfterRequest.prototype.getTimetype = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.WarpToSecondsAfterRequest} returns this
 */
proto.WarpToSecondsAfterRequest.prototype.setTimetype = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.WarpToResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.WarpToResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.WarpToResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.WarpToResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    code: jspb.Message.getFieldWithDefault(msg, 1, 0),
    message: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.WarpToResponse}
 */
proto.WarpToResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.WarpToResponse;
  return proto.WarpToResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.WarpToResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.WarpToResponse}
 */
proto.WarpToResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setCode(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.WarpToResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.WarpToResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.WarpToResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.WarpToResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional int32 code = 1;
 * @return {number}
 */
proto.WarpToResponse.prototype.getCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.WarpToResponse} returns this
 */
proto.WarpToResponse.prototype.setCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string message = 2;
 * @return {string}
 */
proto.WarpToResponse.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.WarpToResponse} returns this
 */
proto.WarpToResponse.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.IncreaseTimeWarpRateRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.IncreaseTimeWarpRateRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.IncreaseTimeWarpRateRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.IncreaseTimeWarpRateRequest.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.IncreaseTimeWarpRateRequest}
 */
proto.IncreaseTimeWarpRateRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.IncreaseTimeWarpRateRequest;
  return proto.IncreaseTimeWarpRateRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.IncreaseTimeWarpRateRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.IncreaseTimeWarpRateRequest}
 */
proto.IncreaseTimeWarpRateRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.IncreaseTimeWarpRateRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.IncreaseTimeWarpRateRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.IncreaseTimeWarpRateRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.IncreaseTimeWarpRateRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.IncreaseTimeWarpRateResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.IncreaseTimeWarpRateResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.IncreaseTimeWarpRateResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.IncreaseTimeWarpRateResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    code: jspb.Message.getFieldWithDefault(msg, 1, 0),
    message: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.IncreaseTimeWarpRateResponse}
 */
proto.IncreaseTimeWarpRateResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.IncreaseTimeWarpRateResponse;
  return proto.IncreaseTimeWarpRateResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.IncreaseTimeWarpRateResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.IncreaseTimeWarpRateResponse}
 */
proto.IncreaseTimeWarpRateResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setCode(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.IncreaseTimeWarpRateResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.IncreaseTimeWarpRateResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.IncreaseTimeWarpRateResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.IncreaseTimeWarpRateResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional int32 code = 1;
 * @return {number}
 */
proto.IncreaseTimeWarpRateResponse.prototype.getCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.IncreaseTimeWarpRateResponse} returns this
 */
proto.IncreaseTimeWarpRateResponse.prototype.setCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string message = 2;
 * @return {string}
 */
proto.IncreaseTimeWarpRateResponse.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.IncreaseTimeWarpRateResponse} returns this
 */
proto.IncreaseTimeWarpRateResponse.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.DecreaseTimeWarpRateRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.DecreaseTimeWarpRateRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.DecreaseTimeWarpRateRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.DecreaseTimeWarpRateRequest.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.DecreaseTimeWarpRateRequest}
 */
proto.DecreaseTimeWarpRateRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.DecreaseTimeWarpRateRequest;
  return proto.DecreaseTimeWarpRateRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.DecreaseTimeWarpRateRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.DecreaseTimeWarpRateRequest}
 */
proto.DecreaseTimeWarpRateRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.DecreaseTimeWarpRateRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.DecreaseTimeWarpRateRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.DecreaseTimeWarpRateRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.DecreaseTimeWarpRateRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.DecreaseTimeWarpRateResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.DecreaseTimeWarpRateResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.DecreaseTimeWarpRateResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.DecreaseTimeWarpRateResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    code: jspb.Message.getFieldWithDefault(msg, 1, 0),
    message: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.DecreaseTimeWarpRateResponse}
 */
proto.DecreaseTimeWarpRateResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.DecreaseTimeWarpRateResponse;
  return proto.DecreaseTimeWarpRateResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.DecreaseTimeWarpRateResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.DecreaseTimeWarpRateResponse}
 */
proto.DecreaseTimeWarpRateResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setCode(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.DecreaseTimeWarpRateResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.DecreaseTimeWarpRateResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.DecreaseTimeWarpRateResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.DecreaseTimeWarpRateResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional int32 code = 1;
 * @return {number}
 */
proto.DecreaseTimeWarpRateResponse.prototype.getCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.DecreaseTimeWarpRateResponse} returns this
 */
proto.DecreaseTimeWarpRateResponse.prototype.setCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string message = 2;
 * @return {string}
 */
proto.DecreaseTimeWarpRateResponse.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.DecreaseTimeWarpRateResponse} returns this
 */
proto.DecreaseTimeWarpRateResponse.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.IncreaseTimeWarpRateByRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.IncreaseTimeWarpRateByRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.IncreaseTimeWarpRateByRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.IncreaseTimeWarpRateByRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    levels: jspb.Message.getFieldWithDefault(msg, 1, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.IncreaseTimeWarpRateByRequest}
 */
proto.IncreaseTimeWarpRateByRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.IncreaseTimeWarpRateByRequest;
  return proto.IncreaseTimeWarpRateByRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.IncreaseTimeWarpRateByRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.IncreaseTimeWarpRateByRequest}
 */
proto.IncreaseTimeWarpRateByRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setLevels(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.IncreaseTimeWarpRateByRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.IncreaseTimeWarpRateByRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.IncreaseTimeWarpRateByRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.IncreaseTimeWarpRateByRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getLevels();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
};


/**
 * optional int32 levels = 1;
 * @return {number}
 */
proto.IncreaseTimeWarpRateByRequest.prototype.getLevels = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.IncreaseTimeWarpRateByRequest} returns this
 */
proto.IncreaseTimeWarpRateByRequest.prototype.setLevels = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.IncreaseTimeWarpRateByResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.IncreaseTimeWarpRateByResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.IncreaseTimeWarpRateByResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.IncreaseTimeWarpRateByResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    code: jspb.Message.getFieldWithDefault(msg, 1, 0),
    message: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.IncreaseTimeWarpRateByResponse}
 */
proto.IncreaseTimeWarpRateByResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.IncreaseTimeWarpRateByResponse;
  return proto.IncreaseTimeWarpRateByResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.IncreaseTimeWarpRateByResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.IncreaseTimeWarpRateByResponse}
 */
proto.IncreaseTimeWarpRateByResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setCode(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.IncreaseTimeWarpRateByResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.IncreaseTimeWarpRateByResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.IncreaseTimeWarpRateByResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.IncreaseTimeWarpRateByResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional int32 code = 1;
 * @return {number}
 */
proto.IncreaseTimeWarpRateByResponse.prototype.getCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.IncreaseTimeWarpRateByResponse} returns this
 */
proto.IncreaseTimeWarpRateByResponse.prototype.setCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string message = 2;
 * @return {string}
 */
proto.IncreaseTimeWarpRateByResponse.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.IncreaseTimeWarpRateByResponse} returns this
 */
proto.IncreaseTimeWarpRateByResponse.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.DecreaseTimeWarpRateByRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.DecreaseTimeWarpRateByRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.DecreaseTimeWarpRateByRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.DecreaseTimeWarpRateByRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    levels: jspb.Message.getFieldWithDefault(msg, 1, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.DecreaseTimeWarpRateByRequest}
 */
proto.DecreaseTimeWarpRateByRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.DecreaseTimeWarpRateByRequest;
  return proto.DecreaseTimeWarpRateByRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.DecreaseTimeWarpRateByRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.DecreaseTimeWarpRateByRequest}
 */
proto.DecreaseTimeWarpRateByRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setLevels(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.DecreaseTimeWarpRateByRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.DecreaseTimeWarpRateByRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.DecreaseTimeWarpRateByRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.DecreaseTimeWarpRateByRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getLevels();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
};


/**
 * optional int32 levels = 1;
 * @return {number}
 */
proto.DecreaseTimeWarpRateByRequest.prototype.getLevels = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.DecreaseTimeWarpRateByRequest} returns this
 */
proto.DecreaseTimeWarpRateByRequest.prototype.setLevels = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.DecreaseTimeWarpRateByResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.DecreaseTimeWarpRateByResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.DecreaseTimeWarpRateByResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.DecreaseTimeWarpRateByResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    code: jspb.Message.getFieldWithDefault(msg, 1, 0),
    message: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.DecreaseTimeWarpRateByResponse}
 */
proto.DecreaseTimeWarpRateByResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.DecreaseTimeWarpRateByResponse;
  return proto.DecreaseTimeWarpRateByResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.DecreaseTimeWarpRateByResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.DecreaseTimeWarpRateByResponse}
 */
proto.DecreaseTimeWarpRateByResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setCode(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.DecreaseTimeWarpRateByResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.DecreaseTimeWarpRateByResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.DecreaseTimeWarpRateByResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.DecreaseTimeWarpRateByResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional int32 code = 1;
 * @return {number}
 */
proto.DecreaseTimeWarpRateByResponse.prototype.getCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.DecreaseTimeWarpRateByResponse} returns this
 */
proto.DecreaseTimeWarpRateByResponse.prototype.setCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string message = 2;
 * @return {string}
 */
proto.DecreaseTimeWarpRateByResponse.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.DecreaseTimeWarpRateByResponse} returns this
 */
proto.DecreaseTimeWarpRateByResponse.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.StopTimeWarpRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.StopTimeWarpRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.StopTimeWarpRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.StopTimeWarpRequest.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.StopTimeWarpRequest}
 */
proto.StopTimeWarpRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.StopTimeWarpRequest;
  return proto.StopTimeWarpRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.StopTimeWarpRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.StopTimeWarpRequest}
 */
proto.StopTimeWarpRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.StopTimeWarpRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.StopTimeWarpRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.StopTimeWarpRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.StopTimeWarpRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.StopTimeWarpResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.StopTimeWarpResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.StopTimeWarpResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.StopTimeWarpResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    code: jspb.Message.getFieldWithDefault(msg, 1, 0),
    message: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.StopTimeWarpResponse}
 */
proto.StopTimeWarpResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.StopTimeWarpResponse;
  return proto.StopTimeWarpResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.StopTimeWarpResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.StopTimeWarpResponse}
 */
proto.StopTimeWarpResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setCode(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.StopTimeWarpResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.StopTimeWarpResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.StopTimeWarpResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.StopTimeWarpResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional int32 code = 1;
 * @return {number}
 */
proto.StopTimeWarpResponse.prototype.getCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.StopTimeWarpResponse} returns this
 */
proto.StopTimeWarpResponse.prototype.setCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string message = 2;
 * @return {string}
 */
proto.StopTimeWarpResponse.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.StopTimeWarpResponse} returns this
 */
proto.StopTimeWarpResponse.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.GetTimeWarpRateRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.GetTimeWarpRateRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.GetTimeWarpRateRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.GetTimeWarpRateRequest.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.GetTimeWarpRateRequest}
 */
proto.GetTimeWarpRateRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.GetTimeWarpRateRequest;
  return proto.GetTimeWarpRateRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.GetTimeWarpRateRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.GetTimeWarpRateRequest}
 */
proto.GetTimeWarpRateRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.GetTimeWarpRateRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.GetTimeWarpRateRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.GetTimeWarpRateRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.GetTimeWarpRateRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.GetTimeWarpRateResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.GetTimeWarpRateResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.GetTimeWarpRateResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.GetTimeWarpRateResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    code: jspb.Message.getFieldWithDefault(msg, 1, 0),
    message: jspb.Message.getFieldWithDefault(msg, 2, ""),
    rate: jspb.Message.getFieldWithDefault(msg, 3, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.GetTimeWarpRateResponse}
 */
proto.GetTimeWarpRateResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.GetTimeWarpRateResponse;
  return proto.GetTimeWarpRateResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.GetTimeWarpRateResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.GetTimeWarpRateResponse}
 */
proto.GetTimeWarpRateResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setCode(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setRate(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.GetTimeWarpRateResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.GetTimeWarpRateResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.GetTimeWarpRateResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.GetTimeWarpRateResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getRate();
  if (f !== 0) {
    writer.writeInt32(
      3,
      f
    );
  }
};


/**
 * optional int32 code = 1;
 * @return {number}
 */
proto.GetTimeWarpRateResponse.prototype.getCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.GetTimeWarpRateResponse} returns this
 */
proto.GetTimeWarpRateResponse.prototype.setCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string message = 2;
 * @return {string}
 */
proto.GetTimeWarpRateResponse.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.GetTimeWarpRateResponse} returns this
 */
proto.GetTimeWarpRateResponse.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional int32 rate = 3;
 * @return {number}
 */
proto.GetTimeWarpRateResponse.prototype.getRate = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.GetTimeWarpRateResponse} returns this
 */
proto.GetTimeWarpRateResponse.prototype.setRate = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.GetFlightSceneStartTimeRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.GetFlightSceneStartTimeRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.GetFlightSceneStartTimeRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.GetFlightSceneStartTimeRequest.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.GetFlightSceneStartTimeRequest}
 */
proto.GetFlightSceneStartTimeRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.GetFlightSceneStartTimeRequest;
  return proto.GetFlightSceneStartTimeRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.GetFlightSceneStartTimeRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.GetFlightSceneStartTimeRequest}
 */
proto.GetFlightSceneStartTimeRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.GetFlightSceneStartTimeRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.GetFlightSceneStartTimeRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.GetFlightSceneStartTimeRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.GetFlightSceneStartTimeRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.GetFlightSceneStartTimeResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.GetFlightSceneStartTimeResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.GetFlightSceneStartTimeResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.GetFlightSceneStartTimeResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    code: jspb.Message.getFieldWithDefault(msg, 1, 0),
    message: jspb.Message.getFieldWithDefault(msg, 2, ""),
    time: jspb.Message.getFieldWithDefault(msg, 3, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.GetFlightSceneStartTimeResponse}
 */
proto.GetFlightSceneStartTimeResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.GetFlightSceneStartTimeResponse;
  return proto.GetFlightSceneStartTimeResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.GetFlightSceneStartTimeResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.GetFlightSceneStartTimeResponse}
 */
proto.GetFlightSceneStartTimeResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setCode(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setTime(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.GetFlightSceneStartTimeResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.GetFlightSceneStartTimeResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.GetFlightSceneStartTimeResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.GetFlightSceneStartTimeResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getTime();
  if (f !== 0) {
    writer.writeInt64(
      3,
      f
    );
  }
};


/**
 * optional int32 code = 1;
 * @return {number}
 */
proto.GetFlightSceneStartTimeResponse.prototype.getCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.GetFlightSceneStartTimeResponse} returns this
 */
proto.GetFlightSceneStartTimeResponse.prototype.setCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string message = 2;
 * @return {string}
 */
proto.GetFlightSceneStartTimeResponse.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.GetFlightSceneStartTimeResponse} returns this
 */
proto.GetFlightSceneStartTimeResponse.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional int64 time = 3;
 * @return {number}
 */
proto.GetFlightSceneStartTimeResponse.prototype.getTime = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.GetFlightSceneStartTimeResponse} returns this
 */
proto.GetFlightSceneStartTimeResponse.prototype.setTime = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.SwitchActiveVesselRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.SwitchActiveVesselRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.SwitchActiveVesselRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SwitchActiveVesselRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    vesselid: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.SwitchActiveVesselRequest}
 */
proto.SwitchActiveVesselRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.SwitchActiveVesselRequest;
  return proto.SwitchActiveVesselRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.SwitchActiveVesselRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.SwitchActiveVesselRequest}
 */
proto.SwitchActiveVesselRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setVesselid(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.SwitchActiveVesselRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.SwitchActiveVesselRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.SwitchActiveVesselRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SwitchActiveVesselRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getVesselid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string vesselId = 1;
 * @return {string}
 */
proto.SwitchActiveVesselRequest.prototype.getVesselid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.SwitchActiveVesselRequest} returns this
 */
proto.SwitchActiveVesselRequest.prototype.setVesselid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.SwitchActiveVesselResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.SwitchActiveVesselResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.SwitchActiveVesselResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SwitchActiveVesselResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    code: jspb.Message.getFieldWithDefault(msg, 1, 0),
    message: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.SwitchActiveVesselResponse}
 */
proto.SwitchActiveVesselResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.SwitchActiveVesselResponse;
  return proto.SwitchActiveVesselResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.SwitchActiveVesselResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.SwitchActiveVesselResponse}
 */
proto.SwitchActiveVesselResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setCode(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.SwitchActiveVesselResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.SwitchActiveVesselResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.SwitchActiveVesselResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SwitchActiveVesselResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional int32 code = 1;
 * @return {number}
 */
proto.SwitchActiveVesselResponse.prototype.getCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.SwitchActiveVesselResponse} returns this
 */
proto.SwitchActiveVesselResponse.prototype.setCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string message = 2;
 * @return {string}
 */
proto.SwitchActiveVesselResponse.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.SwitchActiveVesselResponse} returns this
 */
proto.SwitchActiveVesselResponse.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.SearchVesselPartsByTagRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.SearchVesselPartsByTagRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.SearchVesselPartsByTagRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SearchVesselPartsByTagRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    vesselid: jspb.Message.getFieldWithDefault(msg, 1, ""),
    tag: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.SearchVesselPartsByTagRequest}
 */
proto.SearchVesselPartsByTagRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.SearchVesselPartsByTagRequest;
  return proto.SearchVesselPartsByTagRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.SearchVesselPartsByTagRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.SearchVesselPartsByTagRequest}
 */
proto.SearchVesselPartsByTagRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setVesselid(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setTag(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.SearchVesselPartsByTagRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.SearchVesselPartsByTagRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.SearchVesselPartsByTagRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SearchVesselPartsByTagRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getVesselid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getTag();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional string vesselId = 1;
 * @return {string}
 */
proto.SearchVesselPartsByTagRequest.prototype.getVesselid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.SearchVesselPartsByTagRequest} returns this
 */
proto.SearchVesselPartsByTagRequest.prototype.setVesselid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string tag = 2;
 * @return {string}
 */
proto.SearchVesselPartsByTagRequest.prototype.getTag = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.SearchVesselPartsByTagRequest} returns this
 */
proto.SearchVesselPartsByTagRequest.prototype.setTag = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.SearchVesselPartsByTagResponse.repeatedFields_ = [3];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.SearchVesselPartsByTagResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.SearchVesselPartsByTagResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.SearchVesselPartsByTagResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SearchVesselPartsByTagResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    code: jspb.Message.getFieldWithDefault(msg, 1, 0),
    message: jspb.Message.getFieldWithDefault(msg, 2, ""),
    partsList: jspb.Message.toObjectList(msg.getPartsList(),
    proto.Part.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.SearchVesselPartsByTagResponse}
 */
proto.SearchVesselPartsByTagResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.SearchVesselPartsByTagResponse;
  return proto.SearchVesselPartsByTagResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.SearchVesselPartsByTagResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.SearchVesselPartsByTagResponse}
 */
proto.SearchVesselPartsByTagResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setCode(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    case 3:
      var value = new proto.Part;
      reader.readMessage(value,proto.Part.deserializeBinaryFromReader);
      msg.addParts(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.SearchVesselPartsByTagResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.SearchVesselPartsByTagResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.SearchVesselPartsByTagResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SearchVesselPartsByTagResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getPartsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      3,
      f,
      proto.Part.serializeBinaryToWriter
    );
  }
};


/**
 * optional int32 code = 1;
 * @return {number}
 */
proto.SearchVesselPartsByTagResponse.prototype.getCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.SearchVesselPartsByTagResponse} returns this
 */
proto.SearchVesselPartsByTagResponse.prototype.setCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string message = 2;
 * @return {string}
 */
proto.SearchVesselPartsByTagResponse.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.SearchVesselPartsByTagResponse} returns this
 */
proto.SearchVesselPartsByTagResponse.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * repeated Part parts = 3;
 * @return {!Array<!proto.Part>}
 */
proto.SearchVesselPartsByTagResponse.prototype.getPartsList = function() {
  return /** @type{!Array<!proto.Part>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.Part, 3));
};


/**
 * @param {!Array<!proto.Part>} value
 * @return {!proto.SearchVesselPartsByTagResponse} returns this
*/
proto.SearchVesselPartsByTagResponse.prototype.setPartsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 3, value);
};


/**
 * @param {!proto.Part=} opt_value
 * @param {number=} opt_index
 * @return {!proto.Part}
 */
proto.SearchVesselPartsByTagResponse.prototype.addParts = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 3, opt_value, proto.Part, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.SearchVesselPartsByTagResponse} returns this
 */
proto.SearchVesselPartsByTagResponse.prototype.clearPartsList = function() {
  return this.setPartsList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.GetVesselPartsByTypeRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.GetVesselPartsByTypeRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.GetVesselPartsByTypeRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.GetVesselPartsByTypeRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    vesselid: jspb.Message.getFieldWithDefault(msg, 1, ""),
    parttype: jspb.Message.getFieldWithDefault(msg, 2, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.GetVesselPartsByTypeRequest}
 */
proto.GetVesselPartsByTypeRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.GetVesselPartsByTypeRequest;
  return proto.GetVesselPartsByTypeRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.GetVesselPartsByTypeRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.GetVesselPartsByTypeRequest}
 */
proto.GetVesselPartsByTypeRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setVesselid(value);
      break;
    case 2:
      var value = /** @type {!proto.Part.PartType} */ (reader.readEnum());
      msg.setParttype(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.GetVesselPartsByTypeRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.GetVesselPartsByTypeRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.GetVesselPartsByTypeRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.GetVesselPartsByTypeRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getVesselid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getParttype();
  if (f !== 0.0) {
    writer.writeEnum(
      2,
      f
    );
  }
};


/**
 * optional string vesselId = 1;
 * @return {string}
 */
proto.GetVesselPartsByTypeRequest.prototype.getVesselid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.GetVesselPartsByTypeRequest} returns this
 */
proto.GetVesselPartsByTypeRequest.prototype.setVesselid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional Part.PartType partType = 2;
 * @return {!proto.Part.PartType}
 */
proto.GetVesselPartsByTypeRequest.prototype.getParttype = function() {
  return /** @type {!proto.Part.PartType} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {!proto.Part.PartType} value
 * @return {!proto.GetVesselPartsByTypeRequest} returns this
 */
proto.GetVesselPartsByTypeRequest.prototype.setParttype = function(value) {
  return jspb.Message.setProto3EnumField(this, 2, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.GetVesselPartsByTypeResponse.repeatedFields_ = [3];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.GetVesselPartsByTypeResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.GetVesselPartsByTypeResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.GetVesselPartsByTypeResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.GetVesselPartsByTypeResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    code: jspb.Message.getFieldWithDefault(msg, 1, 0),
    message: jspb.Message.getFieldWithDefault(msg, 2, ""),
    partsList: jspb.Message.toObjectList(msg.getPartsList(),
    proto.Part.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.GetVesselPartsByTypeResponse}
 */
proto.GetVesselPartsByTypeResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.GetVesselPartsByTypeResponse;
  return proto.GetVesselPartsByTypeResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.GetVesselPartsByTypeResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.GetVesselPartsByTypeResponse}
 */
proto.GetVesselPartsByTypeResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setCode(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    case 3:
      var value = new proto.Part;
      reader.readMessage(value,proto.Part.deserializeBinaryFromReader);
      msg.addParts(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.GetVesselPartsByTypeResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.GetVesselPartsByTypeResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.GetVesselPartsByTypeResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.GetVesselPartsByTypeResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getPartsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      3,
      f,
      proto.Part.serializeBinaryToWriter
    );
  }
};


/**
 * optional int32 code = 1;
 * @return {number}
 */
proto.GetVesselPartsByTypeResponse.prototype.getCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.GetVesselPartsByTypeResponse} returns this
 */
proto.GetVesselPartsByTypeResponse.prototype.setCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string message = 2;
 * @return {string}
 */
proto.GetVesselPartsByTypeResponse.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.GetVesselPartsByTypeResponse} returns this
 */
proto.GetVesselPartsByTypeResponse.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * repeated Part parts = 3;
 * @return {!Array<!proto.Part>}
 */
proto.GetVesselPartsByTypeResponse.prototype.getPartsList = function() {
  return /** @type{!Array<!proto.Part>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.Part, 3));
};


/**
 * @param {!Array<!proto.Part>} value
 * @return {!proto.GetVesselPartsByTypeResponse} returns this
*/
proto.GetVesselPartsByTypeResponse.prototype.setPartsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 3, value);
};


/**
 * @param {!proto.Part=} opt_value
 * @param {number=} opt_index
 * @return {!proto.Part}
 */
proto.GetVesselPartsByTypeResponse.prototype.addParts = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 3, opt_value, proto.Part, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.GetVesselPartsByTypeResponse} returns this
 */
proto.GetVesselPartsByTypeResponse.prototype.clearPartsList = function() {
  return this.setPartsList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.StageRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.StageRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.StageRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.StageRequest.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.StageRequest}
 */
proto.StageRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.StageRequest;
  return proto.StageRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.StageRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.StageRequest}
 */
proto.StageRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.StageRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.StageRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.StageRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.StageRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.StageResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.StageResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.StageResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.StageResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    code: jspb.Message.getFieldWithDefault(msg, 1, 0),
    message: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.StageResponse}
 */
proto.StageResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.StageResponse;
  return proto.StageResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.StageResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.StageResponse}
 */
proto.StageResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setCode(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.StageResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.StageResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.StageResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.StageResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional int32 code = 1;
 * @return {number}
 */
proto.StageResponse.prototype.getCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.StageResponse} returns this
 */
proto.StageResponse.prototype.setCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string message = 2;
 * @return {string}
 */
proto.StageResponse.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.StageResponse} returns this
 */
proto.StageResponse.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ThrottleRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.ThrottleRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ThrottleRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ThrottleRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    vesselid: jspb.Message.getFieldWithDefault(msg, 1, ""),
    value: jspb.Message.getFloatingPointFieldWithDefault(msg, 2, 0.0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.ThrottleRequest}
 */
proto.ThrottleRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ThrottleRequest;
  return proto.ThrottleRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ThrottleRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ThrottleRequest}
 */
proto.ThrottleRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setVesselid(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setValue(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ThrottleRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.ThrottleRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.ThrottleRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ThrottleRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getVesselid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getValue();
  if (f !== 0.0) {
    writer.writeDouble(
      2,
      f
    );
  }
};


/**
 * optional string vesselId = 1;
 * @return {string}
 */
proto.ThrottleRequest.prototype.getVesselid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.ThrottleRequest} returns this
 */
proto.ThrottleRequest.prototype.setVesselid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional double value = 2;
 * @return {number}
 */
proto.ThrottleRequest.prototype.getValue = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 2, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.ThrottleRequest} returns this
 */
proto.ThrottleRequest.prototype.setValue = function(value) {
  return jspb.Message.setProto3FloatField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ThrottleResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.ThrottleResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ThrottleResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ThrottleResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    code: jspb.Message.getFieldWithDefault(msg, 1, 0),
    message: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.ThrottleResponse}
 */
proto.ThrottleResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ThrottleResponse;
  return proto.ThrottleResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ThrottleResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ThrottleResponse}
 */
proto.ThrottleResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setCode(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ThrottleResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.ThrottleResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.ThrottleResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ThrottleResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional int32 code = 1;
 * @return {number}
 */
proto.ThrottleResponse.prototype.getCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.ThrottleResponse} returns this
 */
proto.ThrottleResponse.prototype.setCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string message = 2;
 * @return {string}
 */
proto.ThrottleResponse.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.ThrottleResponse} returns this
 */
proto.ThrottleResponse.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.SetSASRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.SetSASRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.SetSASRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SetSASRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    vesselid: jspb.Message.getFieldWithDefault(msg, 1, ""),
    enabled: jspb.Message.getBooleanFieldWithDefault(msg, 2, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.SetSASRequest}
 */
proto.SetSASRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.SetSASRequest;
  return proto.SetSASRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.SetSASRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.SetSASRequest}
 */
proto.SetSASRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setVesselid(value);
      break;
    case 2:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setEnabled(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.SetSASRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.SetSASRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.SetSASRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SetSASRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getVesselid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getEnabled();
  if (f) {
    writer.writeBool(
      2,
      f
    );
  }
};


/**
 * optional string vesselId = 1;
 * @return {string}
 */
proto.SetSASRequest.prototype.getVesselid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.SetSASRequest} returns this
 */
proto.SetSASRequest.prototype.setVesselid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional bool enabled = 2;
 * @return {boolean}
 */
proto.SetSASRequest.prototype.getEnabled = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 2, false));
};


/**
 * @param {boolean} value
 * @return {!proto.SetSASRequest} returns this
 */
proto.SetSASRequest.prototype.setEnabled = function(value) {
  return jspb.Message.setProto3BooleanField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.SetSASResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.SetSASResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.SetSASResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SetSASResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    code: jspb.Message.getFieldWithDefault(msg, 1, 0),
    message: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.SetSASResponse}
 */
proto.SetSASResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.SetSASResponse;
  return proto.SetSASResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.SetSASResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.SetSASResponse}
 */
proto.SetSASResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setCode(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.SetSASResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.SetSASResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.SetSASResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SetSASResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional int32 code = 1;
 * @return {number}
 */
proto.SetSASResponse.prototype.getCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.SetSASResponse} returns this
 */
proto.SetSASResponse.prototype.setCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string message = 2;
 * @return {string}
 */
proto.SetSASResponse.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.SetSASResponse} returns this
 */
proto.SetSASResponse.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.SetSASModeRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.SetSASModeRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.SetSASModeRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SetSASModeRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    vesselid: jspb.Message.getFieldWithDefault(msg, 1, ""),
    mode: jspb.Message.getFieldWithDefault(msg, 2, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.SetSASModeRequest}
 */
proto.SetSASModeRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.SetSASModeRequest;
  return proto.SetSASModeRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.SetSASModeRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.SetSASModeRequest}
 */
proto.SetSASModeRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setVesselid(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setMode(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.SetSASModeRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.SetSASModeRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.SetSASModeRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SetSASModeRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getVesselid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getMode();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
};


/**
 * optional string vesselId = 1;
 * @return {string}
 */
proto.SetSASModeRequest.prototype.getVesselid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.SetSASModeRequest} returns this
 */
proto.SetSASModeRequest.prototype.setVesselid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional int32 mode = 2;
 * @return {number}
 */
proto.SetSASModeRequest.prototype.getMode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.SetSASModeRequest} returns this
 */
proto.SetSASModeRequest.prototype.setMode = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.SetSASModeResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.SetSASModeResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.SetSASModeResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SetSASModeResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    code: jspb.Message.getFieldWithDefault(msg, 1, 0),
    message: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.SetSASModeResponse}
 */
proto.SetSASModeResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.SetSASModeResponse;
  return proto.SetSASModeResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.SetSASModeResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.SetSASModeResponse}
 */
proto.SetSASModeResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setCode(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.SetSASModeResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.SetSASModeResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.SetSASModeResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SetSASModeResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional int32 code = 1;
 * @return {number}
 */
proto.SetSASModeResponse.prototype.getCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.SetSASModeResponse} returns this
 */
proto.SetSASModeResponse.prototype.setCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string message = 2;
 * @return {string}
 */
proto.SetSASModeResponse.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.SetSASModeResponse} returns this
 */
proto.SetSASModeResponse.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.SetRCSRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.SetRCSRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.SetRCSRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SetRCSRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    vesselid: jspb.Message.getFieldWithDefault(msg, 1, ""),
    enabled: jspb.Message.getBooleanFieldWithDefault(msg, 2, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.SetRCSRequest}
 */
proto.SetRCSRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.SetRCSRequest;
  return proto.SetRCSRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.SetRCSRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.SetRCSRequest}
 */
proto.SetRCSRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setVesselid(value);
      break;
    case 2:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setEnabled(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.SetRCSRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.SetRCSRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.SetRCSRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SetRCSRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getVesselid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getEnabled();
  if (f) {
    writer.writeBool(
      2,
      f
    );
  }
};


/**
 * optional string vesselId = 1;
 * @return {string}
 */
proto.SetRCSRequest.prototype.getVesselid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.SetRCSRequest} returns this
 */
proto.SetRCSRequest.prototype.setVesselid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional bool enabled = 2;
 * @return {boolean}
 */
proto.SetRCSRequest.prototype.getEnabled = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 2, false));
};


/**
 * @param {boolean} value
 * @return {!proto.SetRCSRequest} returns this
 */
proto.SetRCSRequest.prototype.setEnabled = function(value) {
  return jspb.Message.setProto3BooleanField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.SetRCSResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.SetRCSResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.SetRCSResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SetRCSResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    code: jspb.Message.getFieldWithDefault(msg, 1, 0),
    message: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.SetRCSResponse}
 */
proto.SetRCSResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.SetRCSResponse;
  return proto.SetRCSResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.SetRCSResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.SetRCSResponse}
 */
proto.SetRCSResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setCode(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.SetRCSResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.SetRCSResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.SetRCSResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SetRCSResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional int32 code = 1;
 * @return {number}
 */
proto.SetRCSResponse.prototype.getCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.SetRCSResponse} returns this
 */
proto.SetRCSResponse.prototype.setCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string message = 2;
 * @return {string}
 */
proto.SetRCSResponse.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.SetRCSResponse} returns this
 */
proto.SetRCSResponse.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.SetLightsRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.SetLightsRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.SetLightsRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SetLightsRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    vesselid: jspb.Message.getFieldWithDefault(msg, 1, ""),
    enabled: jspb.Message.getBooleanFieldWithDefault(msg, 2, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.SetLightsRequest}
 */
proto.SetLightsRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.SetLightsRequest;
  return proto.SetLightsRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.SetLightsRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.SetLightsRequest}
 */
proto.SetLightsRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setVesselid(value);
      break;
    case 2:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setEnabled(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.SetLightsRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.SetLightsRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.SetLightsRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SetLightsRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getVesselid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getEnabled();
  if (f) {
    writer.writeBool(
      2,
      f
    );
  }
};


/**
 * optional string vesselId = 1;
 * @return {string}
 */
proto.SetLightsRequest.prototype.getVesselid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.SetLightsRequest} returns this
 */
proto.SetLightsRequest.prototype.setVesselid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional bool enabled = 2;
 * @return {boolean}
 */
proto.SetLightsRequest.prototype.getEnabled = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 2, false));
};


/**
 * @param {boolean} value
 * @return {!proto.SetLightsRequest} returns this
 */
proto.SetLightsRequest.prototype.setEnabled = function(value) {
  return jspb.Message.setProto3BooleanField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.SetLightsResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.SetLightsResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.SetLightsResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SetLightsResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    code: jspb.Message.getFieldWithDefault(msg, 1, 0),
    message: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.SetLightsResponse}
 */
proto.SetLightsResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.SetLightsResponse;
  return proto.SetLightsResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.SetLightsResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.SetLightsResponse}
 */
proto.SetLightsResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setCode(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.SetLightsResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.SetLightsResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.SetLightsResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SetLightsResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional int32 code = 1;
 * @return {number}
 */
proto.SetLightsResponse.prototype.getCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.SetLightsResponse} returns this
 */
proto.SetLightsResponse.prototype.setCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string message = 2;
 * @return {string}
 */
proto.SetLightsResponse.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.SetLightsResponse} returns this
 */
proto.SetLightsResponse.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.SetAntennasRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.SetAntennasRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.SetAntennasRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SetAntennasRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    vesselid: jspb.Message.getFieldWithDefault(msg, 1, ""),
    enabled: jspb.Message.getBooleanFieldWithDefault(msg, 2, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.SetAntennasRequest}
 */
proto.SetAntennasRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.SetAntennasRequest;
  return proto.SetAntennasRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.SetAntennasRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.SetAntennasRequest}
 */
proto.SetAntennasRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setVesselid(value);
      break;
    case 2:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setEnabled(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.SetAntennasRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.SetAntennasRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.SetAntennasRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SetAntennasRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getVesselid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getEnabled();
  if (f) {
    writer.writeBool(
      2,
      f
    );
  }
};


/**
 * optional string vesselId = 1;
 * @return {string}
 */
proto.SetAntennasRequest.prototype.getVesselid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.SetAntennasRequest} returns this
 */
proto.SetAntennasRequest.prototype.setVesselid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional bool enabled = 2;
 * @return {boolean}
 */
proto.SetAntennasRequest.prototype.getEnabled = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 2, false));
};


/**
 * @param {boolean} value
 * @return {!proto.SetAntennasRequest} returns this
 */
proto.SetAntennasRequest.prototype.setEnabled = function(value) {
  return jspb.Message.setProto3BooleanField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.SetAntennasResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.SetAntennasResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.SetAntennasResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SetAntennasResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    code: jspb.Message.getFieldWithDefault(msg, 1, 0),
    message: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.SetAntennasResponse}
 */
proto.SetAntennasResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.SetAntennasResponse;
  return proto.SetAntennasResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.SetAntennasResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.SetAntennasResponse}
 */
proto.SetAntennasResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setCode(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.SetAntennasResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.SetAntennasResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.SetAntennasResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SetAntennasResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional int32 code = 1;
 * @return {number}
 */
proto.SetAntennasResponse.prototype.getCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.SetAntennasResponse} returns this
 */
proto.SetAntennasResponse.prototype.setCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string message = 2;
 * @return {string}
 */
proto.SetAntennasResponse.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.SetAntennasResponse} returns this
 */
proto.SetAntennasResponse.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ToggleActionGroupRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.ToggleActionGroupRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ToggleActionGroupRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ToggleActionGroupRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    vesselid: jspb.Message.getFieldWithDefault(msg, 1, ""),
    groupid: jspb.Message.getFieldWithDefault(msg, 2, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.ToggleActionGroupRequest}
 */
proto.ToggleActionGroupRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ToggleActionGroupRequest;
  return proto.ToggleActionGroupRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ToggleActionGroupRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ToggleActionGroupRequest}
 */
proto.ToggleActionGroupRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setVesselid(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setGroupid(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ToggleActionGroupRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.ToggleActionGroupRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.ToggleActionGroupRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ToggleActionGroupRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getVesselid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getGroupid();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
};


/**
 * optional string vesselId = 1;
 * @return {string}
 */
proto.ToggleActionGroupRequest.prototype.getVesselid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.ToggleActionGroupRequest} returns this
 */
proto.ToggleActionGroupRequest.prototype.setVesselid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional int32 groupId = 2;
 * @return {number}
 */
proto.ToggleActionGroupRequest.prototype.getGroupid = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.ToggleActionGroupRequest} returns this
 */
proto.ToggleActionGroupRequest.prototype.setGroupid = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ToggleActionGroupResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.ToggleActionGroupResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ToggleActionGroupResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ToggleActionGroupResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    code: jspb.Message.getFieldWithDefault(msg, 1, 0),
    message: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.ToggleActionGroupResponse}
 */
proto.ToggleActionGroupResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ToggleActionGroupResponse;
  return proto.ToggleActionGroupResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ToggleActionGroupResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ToggleActionGroupResponse}
 */
proto.ToggleActionGroupResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setCode(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ToggleActionGroupResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.ToggleActionGroupResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.ToggleActionGroupResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ToggleActionGroupResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional int32 code = 1;
 * @return {number}
 */
proto.ToggleActionGroupResponse.prototype.getCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.ToggleActionGroupResponse} returns this
 */
proto.ToggleActionGroupResponse.prototype.setCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string message = 2;
 * @return {string}
 */
proto.ToggleActionGroupResponse.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.ToggleActionGroupResponse} returns this
 */
proto.ToggleActionGroupResponse.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.SetSolarPanelsRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.SetSolarPanelsRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.SetSolarPanelsRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SetSolarPanelsRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    vesselid: jspb.Message.getFieldWithDefault(msg, 1, ""),
    enabled: jspb.Message.getBooleanFieldWithDefault(msg, 2, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.SetSolarPanelsRequest}
 */
proto.SetSolarPanelsRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.SetSolarPanelsRequest;
  return proto.SetSolarPanelsRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.SetSolarPanelsRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.SetSolarPanelsRequest}
 */
proto.SetSolarPanelsRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setVesselid(value);
      break;
    case 2:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setEnabled(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.SetSolarPanelsRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.SetSolarPanelsRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.SetSolarPanelsRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SetSolarPanelsRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getVesselid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getEnabled();
  if (f) {
    writer.writeBool(
      2,
      f
    );
  }
};


/**
 * optional string vesselId = 1;
 * @return {string}
 */
proto.SetSolarPanelsRequest.prototype.getVesselid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.SetSolarPanelsRequest} returns this
 */
proto.SetSolarPanelsRequest.prototype.setVesselid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional bool enabled = 2;
 * @return {boolean}
 */
proto.SetSolarPanelsRequest.prototype.getEnabled = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 2, false));
};


/**
 * @param {boolean} value
 * @return {!proto.SetSolarPanelsRequest} returns this
 */
proto.SetSolarPanelsRequest.prototype.setEnabled = function(value) {
  return jspb.Message.setProto3BooleanField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.SetSolarPanelsResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.SetSolarPanelsResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.SetSolarPanelsResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SetSolarPanelsResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    code: jspb.Message.getFieldWithDefault(msg, 1, 0),
    message: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.SetSolarPanelsResponse}
 */
proto.SetSolarPanelsResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.SetSolarPanelsResponse;
  return proto.SetSolarPanelsResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.SetSolarPanelsResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.SetSolarPanelsResponse}
 */
proto.SetSolarPanelsResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setCode(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.SetSolarPanelsResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.SetSolarPanelsResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.SetSolarPanelsResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SetSolarPanelsResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional int32 code = 1;
 * @return {number}
 */
proto.SetSolarPanelsResponse.prototype.getCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.SetSolarPanelsResponse} returns this
 */
proto.SetSolarPanelsResponse.prototype.setCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string message = 2;
 * @return {string}
 */
proto.SetSolarPanelsResponse.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.SetSolarPanelsResponse} returns this
 */
proto.SetSolarPanelsResponse.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.SetHeadingRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.SetHeadingRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.SetHeadingRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SetHeadingRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    vesselid: jspb.Message.getFieldWithDefault(msg, 1, ""),
    pitch: jspb.Message.getFloatingPointFieldWithDefault(msg, 2, 0.0),
    yaw: jspb.Message.getFloatingPointFieldWithDefault(msg, 3, 0.0),
    stablefirst: jspb.Message.getBooleanFieldWithDefault(msg, 4, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.SetHeadingRequest}
 */
proto.SetHeadingRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.SetHeadingRequest;
  return proto.SetHeadingRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.SetHeadingRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.SetHeadingRequest}
 */
proto.SetHeadingRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setVesselid(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setPitch(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setYaw(value);
      break;
    case 4:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setStablefirst(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.SetHeadingRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.SetHeadingRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.SetHeadingRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SetHeadingRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getVesselid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getPitch();
  if (f !== 0.0) {
    writer.writeDouble(
      2,
      f
    );
  }
  f = message.getYaw();
  if (f !== 0.0) {
    writer.writeDouble(
      3,
      f
    );
  }
  f = message.getStablefirst();
  if (f) {
    writer.writeBool(
      4,
      f
    );
  }
};


/**
 * optional string vesselId = 1;
 * @return {string}
 */
proto.SetHeadingRequest.prototype.getVesselid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.SetHeadingRequest} returns this
 */
proto.SetHeadingRequest.prototype.setVesselid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional double pitch = 2;
 * @return {number}
 */
proto.SetHeadingRequest.prototype.getPitch = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 2, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.SetHeadingRequest} returns this
 */
proto.SetHeadingRequest.prototype.setPitch = function(value) {
  return jspb.Message.setProto3FloatField(this, 2, value);
};


/**
 * optional double yaw = 3;
 * @return {number}
 */
proto.SetHeadingRequest.prototype.getYaw = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 3, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.SetHeadingRequest} returns this
 */
proto.SetHeadingRequest.prototype.setYaw = function(value) {
  return jspb.Message.setProto3FloatField(this, 3, value);
};


/**
 * optional bool stableFirst = 4;
 * @return {boolean}
 */
proto.SetHeadingRequest.prototype.getStablefirst = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 4, false));
};


/**
 * @param {boolean} value
 * @return {!proto.SetHeadingRequest} returns this
 */
proto.SetHeadingRequest.prototype.setStablefirst = function(value) {
  return jspb.Message.setProto3BooleanField(this, 4, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.SetHeadingResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.SetHeadingResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.SetHeadingResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SetHeadingResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    code: jspb.Message.getFieldWithDefault(msg, 1, 0),
    message: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.SetHeadingResponse}
 */
proto.SetHeadingResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.SetHeadingResponse;
  return proto.SetHeadingResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.SetHeadingResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.SetHeadingResponse}
 */
proto.SetHeadingResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setCode(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.SetHeadingResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.SetHeadingResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.SetHeadingResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SetHeadingResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional int32 code = 1;
 * @return {number}
 */
proto.SetHeadingResponse.prototype.getCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.SetHeadingResponse} returns this
 */
proto.SetHeadingResponse.prototype.setCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string message = 2;
 * @return {string}
 */
proto.SetHeadingResponse.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.SetHeadingResponse} returns this
 */
proto.SetHeadingResponse.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.SetHeadingRollFirstRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.SetHeadingRollFirstRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.SetHeadingRollFirstRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SetHeadingRollFirstRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    vesselid: jspb.Message.getFieldWithDefault(msg, 1, ""),
    pitch: jspb.Message.getFloatingPointFieldWithDefault(msg, 2, 0.0),
    yaw: jspb.Message.getFloatingPointFieldWithDefault(msg, 3, 0.0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.SetHeadingRollFirstRequest}
 */
proto.SetHeadingRollFirstRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.SetHeadingRollFirstRequest;
  return proto.SetHeadingRollFirstRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.SetHeadingRollFirstRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.SetHeadingRollFirstRequest}
 */
proto.SetHeadingRollFirstRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setVesselid(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setPitch(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setYaw(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.SetHeadingRollFirstRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.SetHeadingRollFirstRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.SetHeadingRollFirstRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SetHeadingRollFirstRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getVesselid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getPitch();
  if (f !== 0.0) {
    writer.writeDouble(
      2,
      f
    );
  }
  f = message.getYaw();
  if (f !== 0.0) {
    writer.writeDouble(
      3,
      f
    );
  }
};


/**
 * optional string vesselId = 1;
 * @return {string}
 */
proto.SetHeadingRollFirstRequest.prototype.getVesselid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.SetHeadingRollFirstRequest} returns this
 */
proto.SetHeadingRollFirstRequest.prototype.setVesselid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional double pitch = 2;
 * @return {number}
 */
proto.SetHeadingRollFirstRequest.prototype.getPitch = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 2, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.SetHeadingRollFirstRequest} returns this
 */
proto.SetHeadingRollFirstRequest.prototype.setPitch = function(value) {
  return jspb.Message.setProto3FloatField(this, 2, value);
};


/**
 * optional double yaw = 3;
 * @return {number}
 */
proto.SetHeadingRollFirstRequest.prototype.getYaw = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 3, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.SetHeadingRollFirstRequest} returns this
 */
proto.SetHeadingRollFirstRequest.prototype.setYaw = function(value) {
  return jspb.Message.setProto3FloatField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.SetHeadingRollFirstResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.SetHeadingRollFirstResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.SetHeadingRollFirstResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SetHeadingRollFirstResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    code: jspb.Message.getFieldWithDefault(msg, 1, 0),
    message: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.SetHeadingRollFirstResponse}
 */
proto.SetHeadingRollFirstResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.SetHeadingRollFirstResponse;
  return proto.SetHeadingRollFirstResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.SetHeadingRollFirstResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.SetHeadingRollFirstResponse}
 */
proto.SetHeadingRollFirstResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setCode(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.SetHeadingRollFirstResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.SetHeadingRollFirstResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.SetHeadingRollFirstResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SetHeadingRollFirstResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional int32 code = 1;
 * @return {number}
 */
proto.SetHeadingRollFirstResponse.prototype.getCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.SetHeadingRollFirstResponse} returns this
 */
proto.SetHeadingRollFirstResponse.prototype.setCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string message = 2;
 * @return {string}
 */
proto.SetHeadingRollFirstResponse.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.SetHeadingRollFirstResponse} returns this
 */
proto.SetHeadingRollFirstResponse.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.SetOrientationRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.SetOrientationRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.SetOrientationRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SetOrientationRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    vesselid: jspb.Message.getFieldWithDefault(msg, 1, ""),
    pitch: jspb.Message.getFloatingPointFieldWithDefault(msg, 2, 0.0),
    yaw: jspb.Message.getFloatingPointFieldWithDefault(msg, 3, 0.0),
    roll: jspb.Message.getFloatingPointFieldWithDefault(msg, 4, 0.0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.SetOrientationRequest}
 */
proto.SetOrientationRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.SetOrientationRequest;
  return proto.SetOrientationRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.SetOrientationRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.SetOrientationRequest}
 */
proto.SetOrientationRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setVesselid(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setPitch(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setYaw(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setRoll(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.SetOrientationRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.SetOrientationRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.SetOrientationRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SetOrientationRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getVesselid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getPitch();
  if (f !== 0.0) {
    writer.writeDouble(
      2,
      f
    );
  }
  f = message.getYaw();
  if (f !== 0.0) {
    writer.writeDouble(
      3,
      f
    );
  }
  f = message.getRoll();
  if (f !== 0.0) {
    writer.writeDouble(
      4,
      f
    );
  }
};


/**
 * optional string vesselId = 1;
 * @return {string}
 */
proto.SetOrientationRequest.prototype.getVesselid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.SetOrientationRequest} returns this
 */
proto.SetOrientationRequest.prototype.setVesselid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional double pitch = 2;
 * @return {number}
 */
proto.SetOrientationRequest.prototype.getPitch = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 2, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.SetOrientationRequest} returns this
 */
proto.SetOrientationRequest.prototype.setPitch = function(value) {
  return jspb.Message.setProto3FloatField(this, 2, value);
};


/**
 * optional double yaw = 3;
 * @return {number}
 */
proto.SetOrientationRequest.prototype.getYaw = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 3, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.SetOrientationRequest} returns this
 */
proto.SetOrientationRequest.prototype.setYaw = function(value) {
  return jspb.Message.setProto3FloatField(this, 3, value);
};


/**
 * optional double roll = 4;
 * @return {number}
 */
proto.SetOrientationRequest.prototype.getRoll = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 4, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.SetOrientationRequest} returns this
 */
proto.SetOrientationRequest.prototype.setRoll = function(value) {
  return jspb.Message.setProto3FloatField(this, 4, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.SetOrientationResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.SetOrientationResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.SetOrientationResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SetOrientationResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    code: jspb.Message.getFieldWithDefault(msg, 1, 0),
    message: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.SetOrientationResponse}
 */
proto.SetOrientationResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.SetOrientationResponse;
  return proto.SetOrientationResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.SetOrientationResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.SetOrientationResponse}
 */
proto.SetOrientationResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setCode(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.SetOrientationResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.SetOrientationResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.SetOrientationResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SetOrientationResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional int32 code = 1;
 * @return {number}
 */
proto.SetOrientationResponse.prototype.getCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.SetOrientationResponse} returns this
 */
proto.SetOrientationResponse.prototype.setCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string message = 2;
 * @return {string}
 */
proto.SetOrientationResponse.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.SetOrientationResponse} returns this
 */
proto.SetOrientationResponse.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.SetOrientationRollFirstRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.SetOrientationRollFirstRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.SetOrientationRollFirstRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SetOrientationRollFirstRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    vesselid: jspb.Message.getFieldWithDefault(msg, 1, ""),
    pitch: jspb.Message.getFloatingPointFieldWithDefault(msg, 2, 0.0),
    yaw: jspb.Message.getFloatingPointFieldWithDefault(msg, 3, 0.0),
    roll: jspb.Message.getFloatingPointFieldWithDefault(msg, 4, 0.0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.SetOrientationRollFirstRequest}
 */
proto.SetOrientationRollFirstRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.SetOrientationRollFirstRequest;
  return proto.SetOrientationRollFirstRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.SetOrientationRollFirstRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.SetOrientationRollFirstRequest}
 */
proto.SetOrientationRollFirstRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setVesselid(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setPitch(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setYaw(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setRoll(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.SetOrientationRollFirstRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.SetOrientationRollFirstRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.SetOrientationRollFirstRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SetOrientationRollFirstRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getVesselid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getPitch();
  if (f !== 0.0) {
    writer.writeDouble(
      2,
      f
    );
  }
  f = message.getYaw();
  if (f !== 0.0) {
    writer.writeDouble(
      3,
      f
    );
  }
  f = message.getRoll();
  if (f !== 0.0) {
    writer.writeDouble(
      4,
      f
    );
  }
};


/**
 * optional string vesselId = 1;
 * @return {string}
 */
proto.SetOrientationRollFirstRequest.prototype.getVesselid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.SetOrientationRollFirstRequest} returns this
 */
proto.SetOrientationRollFirstRequest.prototype.setVesselid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional double pitch = 2;
 * @return {number}
 */
proto.SetOrientationRollFirstRequest.prototype.getPitch = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 2, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.SetOrientationRollFirstRequest} returns this
 */
proto.SetOrientationRollFirstRequest.prototype.setPitch = function(value) {
  return jspb.Message.setProto3FloatField(this, 2, value);
};


/**
 * optional double yaw = 3;
 * @return {number}
 */
proto.SetOrientationRollFirstRequest.prototype.getYaw = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 3, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.SetOrientationRollFirstRequest} returns this
 */
proto.SetOrientationRollFirstRequest.prototype.setYaw = function(value) {
  return jspb.Message.setProto3FloatField(this, 3, value);
};


/**
 * optional double roll = 4;
 * @return {number}
 */
proto.SetOrientationRollFirstRequest.prototype.getRoll = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 4, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.SetOrientationRollFirstRequest} returns this
 */
proto.SetOrientationRollFirstRequest.prototype.setRoll = function(value) {
  return jspb.Message.setProto3FloatField(this, 4, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.SetOrientationRollFirstResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.SetOrientationRollFirstResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.SetOrientationRollFirstResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SetOrientationRollFirstResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    code: jspb.Message.getFieldWithDefault(msg, 1, 0),
    message: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.SetOrientationRollFirstResponse}
 */
proto.SetOrientationRollFirstResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.SetOrientationRollFirstResponse;
  return proto.SetOrientationRollFirstResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.SetOrientationRollFirstResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.SetOrientationRollFirstResponse}
 */
proto.SetOrientationRollFirstResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setCode(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.SetOrientationRollFirstResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.SetOrientationRollFirstResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.SetOrientationRollFirstResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SetOrientationRollFirstResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional int32 code = 1;
 * @return {number}
 */
proto.SetOrientationRollFirstResponse.prototype.getCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.SetOrientationRollFirstResponse} returns this
 */
proto.SetOrientationRollFirstResponse.prototype.setCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string message = 2;
 * @return {string}
 */
proto.SetOrientationRollFirstResponse.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.SetOrientationRollFirstResponse} returns this
 */
proto.SetOrientationRollFirstResponse.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.DisengageAutoPilotRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.DisengageAutoPilotRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.DisengageAutoPilotRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.DisengageAutoPilotRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    vesselid: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.DisengageAutoPilotRequest}
 */
proto.DisengageAutoPilotRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.DisengageAutoPilotRequest;
  return proto.DisengageAutoPilotRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.DisengageAutoPilotRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.DisengageAutoPilotRequest}
 */
proto.DisengageAutoPilotRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setVesselid(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.DisengageAutoPilotRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.DisengageAutoPilotRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.DisengageAutoPilotRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.DisengageAutoPilotRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getVesselid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string vesselId = 1;
 * @return {string}
 */
proto.DisengageAutoPilotRequest.prototype.getVesselid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.DisengageAutoPilotRequest} returns this
 */
proto.DisengageAutoPilotRequest.prototype.setVesselid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.DisengageAutoPilotResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.DisengageAutoPilotResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.DisengageAutoPilotResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.DisengageAutoPilotResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    code: jspb.Message.getFieldWithDefault(msg, 1, 0),
    message: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.DisengageAutoPilotResponse}
 */
proto.DisengageAutoPilotResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.DisengageAutoPilotResponse;
  return proto.DisengageAutoPilotResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.DisengageAutoPilotResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.DisengageAutoPilotResponse}
 */
proto.DisengageAutoPilotResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setCode(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.DisengageAutoPilotResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.DisengageAutoPilotResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.DisengageAutoPilotResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.DisengageAutoPilotResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional int32 code = 1;
 * @return {number}
 */
proto.DisengageAutoPilotResponse.prototype.getCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.DisengageAutoPilotResponse} returns this
 */
proto.DisengageAutoPilotResponse.prototype.setCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string message = 2;
 * @return {string}
 */
proto.DisengageAutoPilotResponse.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.DisengageAutoPilotResponse} returns this
 */
proto.DisengageAutoPilotResponse.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Request.prototype.toObject = function(opt_includeInstance) {
  return proto.Request.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Request} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Request.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Request}
 */
proto.Request.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Request;
  return proto.Request.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Request} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Request}
 */
proto.Request.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Request.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Request.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Request} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Request.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Response.prototype.toObject = function(opt_includeInstance) {
  return proto.Response.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Response} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Response.toObject = function(includeInstance, msg) {
  var f, obj = {
    code: jspb.Message.getFieldWithDefault(msg, 1, 0),
    message: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Response}
 */
proto.Response.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Response;
  return proto.Response.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Response} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Response}
 */
proto.Response.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setCode(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Response.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Response.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Response} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Response.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional int32 code = 1;
 * @return {number}
 */
proto.Response.prototype.getCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.Response} returns this
 */
proto.Response.prototype.setCode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string message = 2;
 * @return {string}
 */
proto.Response.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.Response} returns this
 */
proto.Response.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Wheel.prototype.toObject = function(opt_includeInstance) {
  return proto.Wheel.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Wheel} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Wheel.toObject = function(includeInstance, msg) {
  var f, obj = {
    type: jspb.Message.getFieldWithDefault(msg, 1, 0),
    state: jspb.Message.getFieldWithDefault(msg, 2, 0),
    radius: jspb.Message.getFloatingPointFieldWithDefault(msg, 3, 0.0),
    grounded: jspb.Message.getBooleanFieldWithDefault(msg, 4, false),
    hasbrakes: jspb.Message.getBooleanFieldWithDefault(msg, 5, false),
    brakeforce: jspb.Message.getFloatingPointFieldWithDefault(msg, 6, 0.0),
    autofrictioncontrol: jspb.Message.getBooleanFieldWithDefault(msg, 7, false),
    manualfrictioncontrol: jspb.Message.getFloatingPointFieldWithDefault(msg, 8, 0.0),
    deployable: jspb.Message.getBooleanFieldWithDefault(msg, 9, false),
    deployed: jspb.Message.getBooleanFieldWithDefault(msg, 10, false),
    powered: jspb.Message.getBooleanFieldWithDefault(msg, 11, false),
    motorenabled: jspb.Message.getBooleanFieldWithDefault(msg, 12, false),
    motorinverted: jspb.Message.getBooleanFieldWithDefault(msg, 13, false),
    motorstate: jspb.Message.getFieldWithDefault(msg, 14, 0),
    motoroutput: jspb.Message.getFloatingPointFieldWithDefault(msg, 15, 0.0),
    tractioncontrolenabled: jspb.Message.getBooleanFieldWithDefault(msg, 16, false),
    tractioncontrol: jspb.Message.getFloatingPointFieldWithDefault(msg, 17, 0.0),
    drivelimiter: jspb.Message.getFloatingPointFieldWithDefault(msg, 18, 0.0),
    steerable: jspb.Message.getBooleanFieldWithDefault(msg, 19, false),
    steeringenabled: jspb.Message.getBooleanFieldWithDefault(msg, 20, false),
    steeringinverted: jspb.Message.getBooleanFieldWithDefault(msg, 21, false),
    hassuspension: jspb.Message.getBooleanFieldWithDefault(msg, 22, false),
    suspensionspringstrength: jspb.Message.getFloatingPointFieldWithDefault(msg, 23, 0.0),
    suspensiondamperstrength: jspb.Message.getFloatingPointFieldWithDefault(msg, 24, 0.0),
    broken: jspb.Message.getBooleanFieldWithDefault(msg, 25, false),
    repairable: jspb.Message.getBooleanFieldWithDefault(msg, 26, false),
    stress: jspb.Message.getFloatingPointFieldWithDefault(msg, 27, 0.0),
    stresstolerance: jspb.Message.getFloatingPointFieldWithDefault(msg, 28, 0.0),
    stresspercentage: jspb.Message.getFloatingPointFieldWithDefault(msg, 29, 0.0),
    deflection: jspb.Message.getFloatingPointFieldWithDefault(msg, 30, 0.0),
    slip: jspb.Message.getFloatingPointFieldWithDefault(msg, 31, 0.0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Wheel}
 */
proto.Wheel.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Wheel;
  return proto.Wheel.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Wheel} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Wheel}
 */
proto.Wheel.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.WheelSnapshot.WheelType} */ (reader.readEnum());
      msg.setType(value);
      break;
    case 2:
      var value = /** @type {!proto.WheelSnapshot.WheelState} */ (reader.readEnum());
      msg.setState(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setRadius(value);
      break;
    case 4:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setGrounded(value);
      break;
    case 5:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setHasbrakes(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setBrakeforce(value);
      break;
    case 7:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setAutofrictioncontrol(value);
      break;
    case 8:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setManualfrictioncontrol(value);
      break;
    case 9:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setDeployable(value);
      break;
    case 10:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setDeployed(value);
      break;
    case 11:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setPowered(value);
      break;
    case 12:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setMotorenabled(value);
      break;
    case 13:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setMotorinverted(value);
      break;
    case 14:
      var value = /** @type {!proto.WheelSnapshot.MotorState} */ (reader.readEnum());
      msg.setMotorstate(value);
      break;
    case 15:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setMotoroutput(value);
      break;
    case 16:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setTractioncontrolenabled(value);
      break;
    case 17:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setTractioncontrol(value);
      break;
    case 18:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setDrivelimiter(value);
      break;
    case 19:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setSteerable(value);
      break;
    case 20:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setSteeringenabled(value);
      break;
    case 21:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setSteeringinverted(value);
      break;
    case 22:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setHassuspension(value);
      break;
    case 23:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setSuspensionspringstrength(value);
      break;
    case 24:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setSuspensiondamperstrength(value);
      break;
    case 25:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setBroken(value);
      break;
    case 26:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setRepairable(value);
      break;
    case 27:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setStress(value);
      break;
    case 28:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setStresstolerance(value);
      break;
    case 29:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setStresspercentage(value);
      break;
    case 30:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setDeflection(value);
      break;
    case 31:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setSlip(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Wheel.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Wheel.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Wheel} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Wheel.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getType();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
  f = message.getState();
  if (f !== 0.0) {
    writer.writeEnum(
      2,
      f
    );
  }
  f = message.getRadius();
  if (f !== 0.0) {
    writer.writeDouble(
      3,
      f
    );
  }
  f = message.getGrounded();
  if (f) {
    writer.writeBool(
      4,
      f
    );
  }
  f = message.getHasbrakes();
  if (f) {
    writer.writeBool(
      5,
      f
    );
  }
  f = message.getBrakeforce();
  if (f !== 0.0) {
    writer.writeDouble(
      6,
      f
    );
  }
  f = message.getAutofrictioncontrol();
  if (f) {
    writer.writeBool(
      7,
      f
    );
  }
  f = message.getManualfrictioncontrol();
  if (f !== 0.0) {
    writer.writeDouble(
      8,
      f
    );
  }
  f = message.getDeployable();
  if (f) {
    writer.writeBool(
      9,
      f
    );
  }
  f = message.getDeployed();
  if (f) {
    writer.writeBool(
      10,
      f
    );
  }
  f = message.getPowered();
  if (f) {
    writer.writeBool(
      11,
      f
    );
  }
  f = message.getMotorenabled();
  if (f) {
    writer.writeBool(
      12,
      f
    );
  }
  f = message.getMotorinverted();
  if (f) {
    writer.writeBool(
      13,
      f
    );
  }
  f = message.getMotorstate();
  if (f !== 0.0) {
    writer.writeEnum(
      14,
      f
    );
  }
  f = message.getMotoroutput();
  if (f !== 0.0) {
    writer.writeDouble(
      15,
      f
    );
  }
  f = message.getTractioncontrolenabled();
  if (f) {
    writer.writeBool(
      16,
      f
    );
  }
  f = message.getTractioncontrol();
  if (f !== 0.0) {
    writer.writeDouble(
      17,
      f
    );
  }
  f = message.getDrivelimiter();
  if (f !== 0.0) {
    writer.writeDouble(
      18,
      f
    );
  }
  f = message.getSteerable();
  if (f) {
    writer.writeBool(
      19,
      f
    );
  }
  f = message.getSteeringenabled();
  if (f) {
    writer.writeBool(
      20,
      f
    );
  }
  f = message.getSteeringinverted();
  if (f) {
    writer.writeBool(
      21,
      f
    );
  }
  f = message.getHassuspension();
  if (f) {
    writer.writeBool(
      22,
      f
    );
  }
  f = message.getSuspensionspringstrength();
  if (f !== 0.0) {
    writer.writeDouble(
      23,
      f
    );
  }
  f = message.getSuspensiondamperstrength();
  if (f !== 0.0) {
    writer.writeDouble(
      24,
      f
    );
  }
  f = message.getBroken();
  if (f) {
    writer.writeBool(
      25,
      f
    );
  }
  f = message.getRepairable();
  if (f) {
    writer.writeBool(
      26,
      f
    );
  }
  f = message.getStress();
  if (f !== 0.0) {
    writer.writeDouble(
      27,
      f
    );
  }
  f = message.getStresstolerance();
  if (f !== 0.0) {
    writer.writeDouble(
      28,
      f
    );
  }
  f = message.getStresspercentage();
  if (f !== 0.0) {
    writer.writeDouble(
      29,
      f
    );
  }
  f = message.getDeflection();
  if (f !== 0.0) {
    writer.writeDouble(
      30,
      f
    );
  }
  f = message.getSlip();
  if (f !== 0.0) {
    writer.writeDouble(
      31,
      f
    );
  }
};


/**
 * optional WheelSnapshot.WheelType type = 1;
 * @return {!proto.WheelSnapshot.WheelType}
 */
proto.Wheel.prototype.getType = function() {
  return /** @type {!proto.WheelSnapshot.WheelType} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {!proto.WheelSnapshot.WheelType} value
 * @return {!proto.Wheel} returns this
 */
proto.Wheel.prototype.setType = function(value) {
  return jspb.Message.setProto3EnumField(this, 1, value);
};


/**
 * optional WheelSnapshot.WheelState state = 2;
 * @return {!proto.WheelSnapshot.WheelState}
 */
proto.Wheel.prototype.getState = function() {
  return /** @type {!proto.WheelSnapshot.WheelState} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {!proto.WheelSnapshot.WheelState} value
 * @return {!proto.Wheel} returns this
 */
proto.Wheel.prototype.setState = function(value) {
  return jspb.Message.setProto3EnumField(this, 2, value);
};


/**
 * optional double radius = 3;
 * @return {number}
 */
proto.Wheel.prototype.getRadius = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 3, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Wheel} returns this
 */
proto.Wheel.prototype.setRadius = function(value) {
  return jspb.Message.setProto3FloatField(this, 3, value);
};


/**
 * optional bool grounded = 4;
 * @return {boolean}
 */
proto.Wheel.prototype.getGrounded = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 4, false));
};


/**
 * @param {boolean} value
 * @return {!proto.Wheel} returns this
 */
proto.Wheel.prototype.setGrounded = function(value) {
  return jspb.Message.setProto3BooleanField(this, 4, value);
};


/**
 * optional bool hasBrakes = 5;
 * @return {boolean}
 */
proto.Wheel.prototype.getHasbrakes = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 5, false));
};


/**
 * @param {boolean} value
 * @return {!proto.Wheel} returns this
 */
proto.Wheel.prototype.setHasbrakes = function(value) {
  return jspb.Message.setProto3BooleanField(this, 5, value);
};


/**
 * optional double brakeForce = 6;
 * @return {number}
 */
proto.Wheel.prototype.getBrakeforce = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 6, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Wheel} returns this
 */
proto.Wheel.prototype.setBrakeforce = function(value) {
  return jspb.Message.setProto3FloatField(this, 6, value);
};


/**
 * optional bool autoFrictionControl = 7;
 * @return {boolean}
 */
proto.Wheel.prototype.getAutofrictioncontrol = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 7, false));
};


/**
 * @param {boolean} value
 * @return {!proto.Wheel} returns this
 */
proto.Wheel.prototype.setAutofrictioncontrol = function(value) {
  return jspb.Message.setProto3BooleanField(this, 7, value);
};


/**
 * optional double manualFrictionControl = 8;
 * @return {number}
 */
proto.Wheel.prototype.getManualfrictioncontrol = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 8, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Wheel} returns this
 */
proto.Wheel.prototype.setManualfrictioncontrol = function(value) {
  return jspb.Message.setProto3FloatField(this, 8, value);
};


/**
 * optional bool deployable = 9;
 * @return {boolean}
 */
proto.Wheel.prototype.getDeployable = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 9, false));
};


/**
 * @param {boolean} value
 * @return {!proto.Wheel} returns this
 */
proto.Wheel.prototype.setDeployable = function(value) {
  return jspb.Message.setProto3BooleanField(this, 9, value);
};


/**
 * optional bool deployed = 10;
 * @return {boolean}
 */
proto.Wheel.prototype.getDeployed = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 10, false));
};


/**
 * @param {boolean} value
 * @return {!proto.Wheel} returns this
 */
proto.Wheel.prototype.setDeployed = function(value) {
  return jspb.Message.setProto3BooleanField(this, 10, value);
};


/**
 * optional bool powered = 11;
 * @return {boolean}
 */
proto.Wheel.prototype.getPowered = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 11, false));
};


/**
 * @param {boolean} value
 * @return {!proto.Wheel} returns this
 */
proto.Wheel.prototype.setPowered = function(value) {
  return jspb.Message.setProto3BooleanField(this, 11, value);
};


/**
 * optional bool motorEnabled = 12;
 * @return {boolean}
 */
proto.Wheel.prototype.getMotorenabled = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 12, false));
};


/**
 * @param {boolean} value
 * @return {!proto.Wheel} returns this
 */
proto.Wheel.prototype.setMotorenabled = function(value) {
  return jspb.Message.setProto3BooleanField(this, 12, value);
};


/**
 * optional bool motorInverted = 13;
 * @return {boolean}
 */
proto.Wheel.prototype.getMotorinverted = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 13, false));
};


/**
 * @param {boolean} value
 * @return {!proto.Wheel} returns this
 */
proto.Wheel.prototype.setMotorinverted = function(value) {
  return jspb.Message.setProto3BooleanField(this, 13, value);
};


/**
 * optional WheelSnapshot.MotorState motorState = 14;
 * @return {!proto.WheelSnapshot.MotorState}
 */
proto.Wheel.prototype.getMotorstate = function() {
  return /** @type {!proto.WheelSnapshot.MotorState} */ (jspb.Message.getFieldWithDefault(this, 14, 0));
};


/**
 * @param {!proto.WheelSnapshot.MotorState} value
 * @return {!proto.Wheel} returns this
 */
proto.Wheel.prototype.setMotorstate = function(value) {
  return jspb.Message.setProto3EnumField(this, 14, value);
};


/**
 * optional double motorOutput = 15;
 * @return {number}
 */
proto.Wheel.prototype.getMotoroutput = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 15, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Wheel} returns this
 */
proto.Wheel.prototype.setMotoroutput = function(value) {
  return jspb.Message.setProto3FloatField(this, 15, value);
};


/**
 * optional bool tractionControlEnabled = 16;
 * @return {boolean}
 */
proto.Wheel.prototype.getTractioncontrolenabled = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 16, false));
};


/**
 * @param {boolean} value
 * @return {!proto.Wheel} returns this
 */
proto.Wheel.prototype.setTractioncontrolenabled = function(value) {
  return jspb.Message.setProto3BooleanField(this, 16, value);
};


/**
 * optional double tractionControl = 17;
 * @return {number}
 */
proto.Wheel.prototype.getTractioncontrol = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 17, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Wheel} returns this
 */
proto.Wheel.prototype.setTractioncontrol = function(value) {
  return jspb.Message.setProto3FloatField(this, 17, value);
};


/**
 * optional double driveLimiter = 18;
 * @return {number}
 */
proto.Wheel.prototype.getDrivelimiter = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 18, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Wheel} returns this
 */
proto.Wheel.prototype.setDrivelimiter = function(value) {
  return jspb.Message.setProto3FloatField(this, 18, value);
};


/**
 * optional bool steerable = 19;
 * @return {boolean}
 */
proto.Wheel.prototype.getSteerable = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 19, false));
};


/**
 * @param {boolean} value
 * @return {!proto.Wheel} returns this
 */
proto.Wheel.prototype.setSteerable = function(value) {
  return jspb.Message.setProto3BooleanField(this, 19, value);
};


/**
 * optional bool steeringEnabled = 20;
 * @return {boolean}
 */
proto.Wheel.prototype.getSteeringenabled = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 20, false));
};


/**
 * @param {boolean} value
 * @return {!proto.Wheel} returns this
 */
proto.Wheel.prototype.setSteeringenabled = function(value) {
  return jspb.Message.setProto3BooleanField(this, 20, value);
};


/**
 * optional bool steeringInverted = 21;
 * @return {boolean}
 */
proto.Wheel.prototype.getSteeringinverted = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 21, false));
};


/**
 * @param {boolean} value
 * @return {!proto.Wheel} returns this
 */
proto.Wheel.prototype.setSteeringinverted = function(value) {
  return jspb.Message.setProto3BooleanField(this, 21, value);
};


/**
 * optional bool hasSuspension = 22;
 * @return {boolean}
 */
proto.Wheel.prototype.getHassuspension = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 22, false));
};


/**
 * @param {boolean} value
 * @return {!proto.Wheel} returns this
 */
proto.Wheel.prototype.setHassuspension = function(value) {
  return jspb.Message.setProto3BooleanField(this, 22, value);
};


/**
 * optional double suspensionSpringStrength = 23;
 * @return {number}
 */
proto.Wheel.prototype.getSuspensionspringstrength = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 23, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Wheel} returns this
 */
proto.Wheel.prototype.setSuspensionspringstrength = function(value) {
  return jspb.Message.setProto3FloatField(this, 23, value);
};


/**
 * optional double suspensionDamperStrength = 24;
 * @return {number}
 */
proto.Wheel.prototype.getSuspensiondamperstrength = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 24, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Wheel} returns this
 */
proto.Wheel.prototype.setSuspensiondamperstrength = function(value) {
  return jspb.Message.setProto3FloatField(this, 24, value);
};


/**
 * optional bool broken = 25;
 * @return {boolean}
 */
proto.Wheel.prototype.getBroken = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 25, false));
};


/**
 * @param {boolean} value
 * @return {!proto.Wheel} returns this
 */
proto.Wheel.prototype.setBroken = function(value) {
  return jspb.Message.setProto3BooleanField(this, 25, value);
};


/**
 * optional bool repairable = 26;
 * @return {boolean}
 */
proto.Wheel.prototype.getRepairable = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 26, false));
};


/**
 * @param {boolean} value
 * @return {!proto.Wheel} returns this
 */
proto.Wheel.prototype.setRepairable = function(value) {
  return jspb.Message.setProto3BooleanField(this, 26, value);
};


/**
 * optional double stress = 27;
 * @return {number}
 */
proto.Wheel.prototype.getStress = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 27, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Wheel} returns this
 */
proto.Wheel.prototype.setStress = function(value) {
  return jspb.Message.setProto3FloatField(this, 27, value);
};


/**
 * optional double stressTolerance = 28;
 * @return {number}
 */
proto.Wheel.prototype.getStresstolerance = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 28, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Wheel} returns this
 */
proto.Wheel.prototype.setStresstolerance = function(value) {
  return jspb.Message.setProto3FloatField(this, 28, value);
};


/**
 * optional double stressPercentage = 29;
 * @return {number}
 */
proto.Wheel.prototype.getStresspercentage = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 29, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Wheel} returns this
 */
proto.Wheel.prototype.setStresspercentage = function(value) {
  return jspb.Message.setProto3FloatField(this, 29, value);
};


/**
 * optional double deflection = 30;
 * @return {number}
 */
proto.Wheel.prototype.getDeflection = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 30, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Wheel} returns this
 */
proto.Wheel.prototype.setDeflection = function(value) {
  return jspb.Message.setProto3FloatField(this, 30, value);
};


/**
 * optional double slip = 31;
 * @return {number}
 */
proto.Wheel.prototype.getSlip = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 31, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Wheel} returns this
 */
proto.Wheel.prototype.setSlip = function(value) {
  return jspb.Message.setProto3FloatField(this, 31, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.SolarPanel.prototype.toObject = function(opt_includeInstance) {
  return proto.SolarPanel.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.SolarPanel} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SolarPanel.toObject = function(includeInstance, msg) {
  var f, obj = {
    state: jspb.Message.getFieldWithDefault(msg, 1, 0),
    deployable: jspb.Message.getBooleanFieldWithDefault(msg, 2, false),
    deployed: jspb.Message.getBooleanFieldWithDefault(msg, 3, false),
    energyflow: jspb.Message.getFloatingPointFieldWithDefault(msg, 4, 0.0),
    sunexposure: jspb.Message.getFloatingPointFieldWithDefault(msg, 5, 0.0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.SolarPanel}
 */
proto.SolarPanel.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.SolarPanel;
  return proto.SolarPanel.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.SolarPanel} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.SolarPanel}
 */
proto.SolarPanel.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.SolarPanelSnapshot.SolarPanelState} */ (reader.readEnum());
      msg.setState(value);
      break;
    case 2:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setDeployable(value);
      break;
    case 3:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setDeployed(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setEnergyflow(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setSunexposure(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.SolarPanel.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.SolarPanel.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.SolarPanel} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SolarPanel.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getState();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
  f = message.getDeployable();
  if (f) {
    writer.writeBool(
      2,
      f
    );
  }
  f = message.getDeployed();
  if (f) {
    writer.writeBool(
      3,
      f
    );
  }
  f = message.getEnergyflow();
  if (f !== 0.0) {
    writer.writeDouble(
      4,
      f
    );
  }
  f = message.getSunexposure();
  if (f !== 0.0) {
    writer.writeDouble(
      5,
      f
    );
  }
};


/**
 * optional SolarPanelSnapshot.SolarPanelState state = 1;
 * @return {!proto.SolarPanelSnapshot.SolarPanelState}
 */
proto.SolarPanel.prototype.getState = function() {
  return /** @type {!proto.SolarPanelSnapshot.SolarPanelState} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {!proto.SolarPanelSnapshot.SolarPanelState} value
 * @return {!proto.SolarPanel} returns this
 */
proto.SolarPanel.prototype.setState = function(value) {
  return jspb.Message.setProto3EnumField(this, 1, value);
};


/**
 * optional bool deployable = 2;
 * @return {boolean}
 */
proto.SolarPanel.prototype.getDeployable = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 2, false));
};


/**
 * @param {boolean} value
 * @return {!proto.SolarPanel} returns this
 */
proto.SolarPanel.prototype.setDeployable = function(value) {
  return jspb.Message.setProto3BooleanField(this, 2, value);
};


/**
 * optional bool deployed = 3;
 * @return {boolean}
 */
proto.SolarPanel.prototype.getDeployed = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 3, false));
};


/**
 * @param {boolean} value
 * @return {!proto.SolarPanel} returns this
 */
proto.SolarPanel.prototype.setDeployed = function(value) {
  return jspb.Message.setProto3BooleanField(this, 3, value);
};


/**
 * optional double energyFlow = 4;
 * @return {number}
 */
proto.SolarPanel.prototype.getEnergyflow = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 4, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.SolarPanel} returns this
 */
proto.SolarPanel.prototype.setEnergyflow = function(value) {
  return jspb.Message.setProto3FloatField(this, 4, value);
};


/**
 * optional double sunExposure = 5;
 * @return {number}
 */
proto.SolarPanel.prototype.getSunexposure = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 5, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.SolarPanel} returns this
 */
proto.SolarPanel.prototype.setSunexposure = function(value) {
  return jspb.Message.setProto3FloatField(this, 5, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Sensor.prototype.toObject = function(opt_includeInstance) {
  return proto.Sensor.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Sensor} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Sensor.toObject = function(includeInstance, msg) {
  var f, obj = {
    activated: jspb.Message.getBooleanFieldWithDefault(msg, 1, false),
    reading: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Sensor}
 */
proto.Sensor.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Sensor;
  return proto.Sensor.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Sensor} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Sensor}
 */
proto.Sensor.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setActivated(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setReading(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Sensor.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Sensor.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Sensor} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Sensor.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getActivated();
  if (f) {
    writer.writeBool(
      1,
      f
    );
  }
  f = message.getReading();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional bool activated = 1;
 * @return {boolean}
 */
proto.Sensor.prototype.getActivated = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 1, false));
};


/**
 * @param {boolean} value
 * @return {!proto.Sensor} returns this
 */
proto.Sensor.prototype.setActivated = function(value) {
  return jspb.Message.setProto3BooleanField(this, 1, value);
};


/**
 * optional string reading = 2;
 * @return {string}
 */
proto.Sensor.prototype.getReading = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.Sensor} returns this
 */
proto.Sensor.prototype.setReading = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ResourceHarvester.prototype.toObject = function(opt_includeInstance) {
  return proto.ResourceHarvester.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ResourceHarvester} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ResourceHarvester.toObject = function(includeInstance, msg) {
  var f, obj = {
    state: jspb.Message.getFieldWithDefault(msg, 1, 0),
    deployed: jspb.Message.getBooleanFieldWithDefault(msg, 2, false),
    activated: jspb.Message.getBooleanFieldWithDefault(msg, 3, false),
    extractionrate: jspb.Message.getFloatingPointFieldWithDefault(msg, 4, 0.0),
    thermalefficiency: jspb.Message.getFloatingPointFieldWithDefault(msg, 5, 0.0),
    coretemperature: jspb.Message.getFloatingPointFieldWithDefault(msg, 6, 0.0),
    optimumcoretemperature: jspb.Message.getFloatingPointFieldWithDefault(msg, 7, 0.0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.ResourceHarvester}
 */
proto.ResourceHarvester.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ResourceHarvester;
  return proto.ResourceHarvester.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ResourceHarvester} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ResourceHarvester}
 */
proto.ResourceHarvester.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.ResourceHarvesterSnapshot.ResourceHarvesterState} */ (reader.readEnum());
      msg.setState(value);
      break;
    case 2:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setDeployed(value);
      break;
    case 3:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setActivated(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setExtractionrate(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setThermalefficiency(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setCoretemperature(value);
      break;
    case 7:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setOptimumcoretemperature(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ResourceHarvester.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.ResourceHarvester.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.ResourceHarvester} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ResourceHarvester.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getState();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
  f = message.getDeployed();
  if (f) {
    writer.writeBool(
      2,
      f
    );
  }
  f = message.getActivated();
  if (f) {
    writer.writeBool(
      3,
      f
    );
  }
  f = message.getExtractionrate();
  if (f !== 0.0) {
    writer.writeDouble(
      4,
      f
    );
  }
  f = message.getThermalefficiency();
  if (f !== 0.0) {
    writer.writeDouble(
      5,
      f
    );
  }
  f = message.getCoretemperature();
  if (f !== 0.0) {
    writer.writeDouble(
      6,
      f
    );
  }
  f = message.getOptimumcoretemperature();
  if (f !== 0.0) {
    writer.writeDouble(
      7,
      f
    );
  }
};


/**
 * optional ResourceHarvesterSnapshot.ResourceHarvesterState state = 1;
 * @return {!proto.ResourceHarvesterSnapshot.ResourceHarvesterState}
 */
proto.ResourceHarvester.prototype.getState = function() {
  return /** @type {!proto.ResourceHarvesterSnapshot.ResourceHarvesterState} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {!proto.ResourceHarvesterSnapshot.ResourceHarvesterState} value
 * @return {!proto.ResourceHarvester} returns this
 */
proto.ResourceHarvester.prototype.setState = function(value) {
  return jspb.Message.setProto3EnumField(this, 1, value);
};


/**
 * optional bool deployed = 2;
 * @return {boolean}
 */
proto.ResourceHarvester.prototype.getDeployed = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 2, false));
};


/**
 * @param {boolean} value
 * @return {!proto.ResourceHarvester} returns this
 */
proto.ResourceHarvester.prototype.setDeployed = function(value) {
  return jspb.Message.setProto3BooleanField(this, 2, value);
};


/**
 * optional bool activated = 3;
 * @return {boolean}
 */
proto.ResourceHarvester.prototype.getActivated = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 3, false));
};


/**
 * @param {boolean} value
 * @return {!proto.ResourceHarvester} returns this
 */
proto.ResourceHarvester.prototype.setActivated = function(value) {
  return jspb.Message.setProto3BooleanField(this, 3, value);
};


/**
 * optional double extractionRate = 4;
 * @return {number}
 */
proto.ResourceHarvester.prototype.getExtractionrate = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 4, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.ResourceHarvester} returns this
 */
proto.ResourceHarvester.prototype.setExtractionrate = function(value) {
  return jspb.Message.setProto3FloatField(this, 4, value);
};


/**
 * optional double thermalEfficiency = 5;
 * @return {number}
 */
proto.ResourceHarvester.prototype.getThermalefficiency = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 5, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.ResourceHarvester} returns this
 */
proto.ResourceHarvester.prototype.setThermalefficiency = function(value) {
  return jspb.Message.setProto3FloatField(this, 5, value);
};


/**
 * optional double coreTemperature = 6;
 * @return {number}
 */
proto.ResourceHarvester.prototype.getCoretemperature = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 6, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.ResourceHarvester} returns this
 */
proto.ResourceHarvester.prototype.setCoretemperature = function(value) {
  return jspb.Message.setProto3FloatField(this, 6, value);
};


/**
 * optional double optimumCoreTemperature = 7;
 * @return {number}
 */
proto.ResourceHarvester.prototype.getOptimumcoretemperature = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 7, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.ResourceHarvester} returns this
 */
proto.ResourceHarvester.prototype.setOptimumcoretemperature = function(value) {
  return jspb.Message.setProto3FloatField(this, 7, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ConverterResource.prototype.toObject = function(opt_includeInstance) {
  return proto.ConverterResource.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ConverterResource} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ConverterResource.toObject = function(includeInstance, msg) {
  var f, obj = {
    resourcename: jspb.Message.getFieldWithDefault(msg, 1, ""),
    ratio: jspb.Message.getFloatingPointFieldWithDefault(msg, 2, 0.0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.ConverterResource}
 */
proto.ConverterResource.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ConverterResource;
  return proto.ConverterResource.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ConverterResource} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ConverterResource}
 */
proto.ConverterResource.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setResourcename(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setRatio(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ConverterResource.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.ConverterResource.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.ConverterResource} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ConverterResource.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getResourcename();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getRatio();
  if (f !== 0.0) {
    writer.writeDouble(
      2,
      f
    );
  }
};


/**
 * optional string resourceName = 1;
 * @return {string}
 */
proto.ConverterResource.prototype.getResourcename = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.ConverterResource} returns this
 */
proto.ConverterResource.prototype.setResourcename = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional double ratio = 2;
 * @return {number}
 */
proto.ConverterResource.prototype.getRatio = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 2, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.ConverterResource} returns this
 */
proto.ConverterResource.prototype.setRatio = function(value) {
  return jspb.Message.setProto3FloatField(this, 2, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.Converter.repeatedFields_ = [8,9,10];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Converter.prototype.toObject = function(opt_includeInstance) {
  return proto.Converter.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Converter} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Converter.toObject = function(includeInstance, msg) {
  var f, obj = {
    state: jspb.Message.getFieldWithDefault(msg, 1, 0),
    name: jspb.Message.getFieldWithDefault(msg, 2, ""),
    active: jspb.Message.getBooleanFieldWithDefault(msg, 3, false),
    status: jspb.Message.getFieldWithDefault(msg, 4, ""),
    thermalefficiency: jspb.Message.getFloatingPointFieldWithDefault(msg, 5, 0.0),
    coretemperature: jspb.Message.getFloatingPointFieldWithDefault(msg, 6, 0.0),
    optimumcoretemperature: jspb.Message.getFloatingPointFieldWithDefault(msg, 7, 0.0),
    inputsList: jspb.Message.toObjectList(msg.getInputsList(),
    proto.ConverterResource.toObject, includeInstance),
    outputsList: jspb.Message.toObjectList(msg.getOutputsList(),
    proto.ConverterResource.toObject, includeInstance),
    requirementsList: jspb.Message.toObjectList(msg.getRequirementsList(),
    proto.ConverterResource.toObject, includeInstance),
    index: jspb.Message.getFieldWithDefault(msg, 11, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Converter}
 */
proto.Converter.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Converter;
  return proto.Converter.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Converter} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Converter}
 */
proto.Converter.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.ConverterSnapshot.ResourceConverterState} */ (reader.readEnum());
      msg.setState(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 3:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setActive(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setStatus(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setThermalefficiency(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setCoretemperature(value);
      break;
    case 7:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setOptimumcoretemperature(value);
      break;
    case 8:
      var value = new proto.ConverterResource;
      reader.readMessage(value,proto.ConverterResource.deserializeBinaryFromReader);
      msg.addInputs(value);
      break;
    case 9:
      var value = new proto.ConverterResource;
      reader.readMessage(value,proto.ConverterResource.deserializeBinaryFromReader);
      msg.addOutputs(value);
      break;
    case 10:
      var value = new proto.ConverterResource;
      reader.readMessage(value,proto.ConverterResource.deserializeBinaryFromReader);
      msg.addRequirements(value);
      break;
    case 11:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setIndex(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Converter.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Converter.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Converter} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Converter.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getState();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getActive();
  if (f) {
    writer.writeBool(
      3,
      f
    );
  }
  f = message.getStatus();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getThermalefficiency();
  if (f !== 0.0) {
    writer.writeDouble(
      5,
      f
    );
  }
  f = message.getCoretemperature();
  if (f !== 0.0) {
    writer.writeDouble(
      6,
      f
    );
  }
  f = message.getOptimumcoretemperature();
  if (f !== 0.0) {
    writer.writeDouble(
      7,
      f
    );
  }
  f = message.getInputsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      8,
      f,
      proto.ConverterResource.serializeBinaryToWriter
    );
  }
  f = message.getOutputsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      9,
      f,
      proto.ConverterResource.serializeBinaryToWriter
    );
  }
  f = message.getRequirementsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      10,
      f,
      proto.ConverterResource.serializeBinaryToWriter
    );
  }
  f = message.getIndex();
  if (f !== 0) {
    writer.writeInt32(
      11,
      f
    );
  }
};


/**
 * optional ConverterSnapshot.ResourceConverterState state = 1;
 * @return {!proto.ConverterSnapshot.ResourceConverterState}
 */
proto.Converter.prototype.getState = function() {
  return /** @type {!proto.ConverterSnapshot.ResourceConverterState} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {!proto.ConverterSnapshot.ResourceConverterState} value
 * @return {!proto.Converter} returns this
 */
proto.Converter.prototype.setState = function(value) {
  return jspb.Message.setProto3EnumField(this, 1, value);
};


/**
 * optional string name = 2;
 * @return {string}
 */
proto.Converter.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.Converter} returns this
 */
proto.Converter.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional bool active = 3;
 * @return {boolean}
 */
proto.Converter.prototype.getActive = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 3, false));
};


/**
 * @param {boolean} value
 * @return {!proto.Converter} returns this
 */
proto.Converter.prototype.setActive = function(value) {
  return jspb.Message.setProto3BooleanField(this, 3, value);
};


/**
 * optional string status = 4;
 * @return {string}
 */
proto.Converter.prototype.getStatus = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.Converter} returns this
 */
proto.Converter.prototype.setStatus = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional double thermalEfficiency = 5;
 * @return {number}
 */
proto.Converter.prototype.getThermalefficiency = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 5, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Converter} returns this
 */
proto.Converter.prototype.setThermalefficiency = function(value) {
  return jspb.Message.setProto3FloatField(this, 5, value);
};


/**
 * optional double coreTemperature = 6;
 * @return {number}
 */
proto.Converter.prototype.getCoretemperature = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 6, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Converter} returns this
 */
proto.Converter.prototype.setCoretemperature = function(value) {
  return jspb.Message.setProto3FloatField(this, 6, value);
};


/**
 * optional double optimumCoreTemperature = 7;
 * @return {number}
 */
proto.Converter.prototype.getOptimumcoretemperature = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 7, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Converter} returns this
 */
proto.Converter.prototype.setOptimumcoretemperature = function(value) {
  return jspb.Message.setProto3FloatField(this, 7, value);
};


/**
 * repeated ConverterResource inputs = 8;
 * @return {!Array<!proto.ConverterResource>}
 */
proto.Converter.prototype.getInputsList = function() {
  return /** @type{!Array<!proto.ConverterResource>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.ConverterResource, 8));
};


/**
 * @param {!Array<!proto.ConverterResource>} value
 * @return {!proto.Converter} returns this
*/
proto.Converter.prototype.setInputsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 8, value);
};


/**
 * @param {!proto.ConverterResource=} opt_value
 * @param {number=} opt_index
 * @return {!proto.ConverterResource}
 */
proto.Converter.prototype.addInputs = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 8, opt_value, proto.ConverterResource, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.Converter} returns this
 */
proto.Converter.prototype.clearInputsList = function() {
  return this.setInputsList([]);
};


/**
 * repeated ConverterResource outputs = 9;
 * @return {!Array<!proto.ConverterResource>}
 */
proto.Converter.prototype.getOutputsList = function() {
  return /** @type{!Array<!proto.ConverterResource>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.ConverterResource, 9));
};


/**
 * @param {!Array<!proto.ConverterResource>} value
 * @return {!proto.Converter} returns this
*/
proto.Converter.prototype.setOutputsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 9, value);
};


/**
 * @param {!proto.ConverterResource=} opt_value
 * @param {number=} opt_index
 * @return {!proto.ConverterResource}
 */
proto.Converter.prototype.addOutputs = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 9, opt_value, proto.ConverterResource, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.Converter} returns this
 */
proto.Converter.prototype.clearOutputsList = function() {
  return this.setOutputsList([]);
};


/**
 * repeated ConverterResource requirements = 10;
 * @return {!Array<!proto.ConverterResource>}
 */
proto.Converter.prototype.getRequirementsList = function() {
  return /** @type{!Array<!proto.ConverterResource>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.ConverterResource, 10));
};


/**
 * @param {!Array<!proto.ConverterResource>} value
 * @return {!proto.Converter} returns this
*/
proto.Converter.prototype.setRequirementsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 10, value);
};


/**
 * @param {!proto.ConverterResource=} opt_value
 * @param {number=} opt_index
 * @return {!proto.ConverterResource}
 */
proto.Converter.prototype.addRequirements = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 10, opt_value, proto.ConverterResource, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.Converter} returns this
 */
proto.Converter.prototype.clearRequirementsList = function() {
  return this.setRequirementsList([]);
};


/**
 * optional int32 index = 11;
 * @return {number}
 */
proto.Converter.prototype.getIndex = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 11, 0));
};


/**
 * @param {number} value
 * @return {!proto.Converter} returns this
 */
proto.Converter.prototype.setIndex = function(value) {
  return jspb.Message.setProto3IntField(this, 11, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.ResourceConverter.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ResourceConverter.prototype.toObject = function(opt_includeInstance) {
  return proto.ResourceConverter.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ResourceConverter} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ResourceConverter.toObject = function(includeInstance, msg) {
  var f, obj = {
    convertersList: jspb.Message.toObjectList(msg.getConvertersList(),
    proto.Converter.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.ResourceConverter}
 */
proto.ResourceConverter.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ResourceConverter;
  return proto.ResourceConverter.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ResourceConverter} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ResourceConverter}
 */
proto.ResourceConverter.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.Converter;
      reader.readMessage(value,proto.Converter.deserializeBinaryFromReader);
      msg.addConverters(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ResourceConverter.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.ResourceConverter.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.ResourceConverter} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ResourceConverter.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getConvertersList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.Converter.serializeBinaryToWriter
    );
  }
};


/**
 * repeated Converter converters = 1;
 * @return {!Array<!proto.Converter>}
 */
proto.ResourceConverter.prototype.getConvertersList = function() {
  return /** @type{!Array<!proto.Converter>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.Converter, 1));
};


/**
 * @param {!Array<!proto.Converter>} value
 * @return {!proto.ResourceConverter} returns this
*/
proto.ResourceConverter.prototype.setConvertersList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.Converter=} opt_value
 * @param {number=} opt_index
 * @return {!proto.Converter}
 */
proto.ResourceConverter.prototype.addConverters = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.Converter, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.ResourceConverter} returns this
 */
proto.ResourceConverter.prototype.clearConvertersList = function() {
  return this.setConvertersList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ReactionWheel.prototype.toObject = function(opt_includeInstance) {
  return proto.ReactionWheel.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ReactionWheel} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ReactionWheel.toObject = function(includeInstance, msg) {
  var f, obj = {
    state: jspb.Message.getFieldWithDefault(msg, 1, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.ReactionWheel}
 */
proto.ReactionWheel.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ReactionWheel;
  return proto.ReactionWheel.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ReactionWheel} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ReactionWheel}
 */
proto.ReactionWheel.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.ReactionWheelSnapshot.ReactionWheelState} */ (reader.readEnum());
      msg.setState(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ReactionWheel.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.ReactionWheel.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.ReactionWheel} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ReactionWheel.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getState();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
};


/**
 * optional ReactionWheelSnapshot.ReactionWheelState state = 1;
 * @return {!proto.ReactionWheelSnapshot.ReactionWheelState}
 */
proto.ReactionWheel.prototype.getState = function() {
  return /** @type {!proto.ReactionWheelSnapshot.ReactionWheelState} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {!proto.ReactionWheelSnapshot.ReactionWheelState} value
 * @return {!proto.ReactionWheel} returns this
 */
proto.ReactionWheel.prototype.setState = function(value) {
  return jspb.Message.setProto3EnumField(this, 1, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.RCS.repeatedFields_ = [9];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.RCS.prototype.toObject = function(opt_includeInstance) {
  return proto.RCS.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.RCS} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.RCS.toObject = function(includeInstance, msg) {
  var f, obj = {
    enabled: jspb.Message.getBooleanFieldWithDefault(msg, 1, false),
    pitchenabled: jspb.Message.getBooleanFieldWithDefault(msg, 2, false),
    yawenabled: jspb.Message.getBooleanFieldWithDefault(msg, 3, false),
    rollenabled: jspb.Message.getBooleanFieldWithDefault(msg, 4, false),
    upenabled: jspb.Message.getBooleanFieldWithDefault(msg, 5, false),
    forwardenabled: jspb.Message.getBooleanFieldWithDefault(msg, 6, false),
    rightenabled: jspb.Message.getBooleanFieldWithDefault(msg, 7, false),
    hasfuel: jspb.Message.getBooleanFieldWithDefault(msg, 8, false),
    propellantnamesList: (f = jspb.Message.getRepeatedField(msg, 9)) == null ? undefined : f,
    propellantsMap: (f = msg.getPropellantsMap()) ? f.toObject(includeInstance, proto.Propellant.toObject) : []
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.RCS}
 */
proto.RCS.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.RCS;
  return proto.RCS.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.RCS} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.RCS}
 */
proto.RCS.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setEnabled(value);
      break;
    case 2:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setPitchenabled(value);
      break;
    case 3:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setYawenabled(value);
      break;
    case 4:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setRollenabled(value);
      break;
    case 5:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setUpenabled(value);
      break;
    case 6:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setForwardenabled(value);
      break;
    case 7:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setRightenabled(value);
      break;
    case 8:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setHasfuel(value);
      break;
    case 9:
      var value = /** @type {string} */ (reader.readString());
      msg.addPropellantnames(value);
      break;
    case 10:
      var value = msg.getPropellantsMap();
      reader.readMessage(value, function(message, reader) {
        jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readMessage, proto.Propellant.deserializeBinaryFromReader, "", new proto.Propellant());
         });
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.RCS.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.RCS.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.RCS} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.RCS.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getEnabled();
  if (f) {
    writer.writeBool(
      1,
      f
    );
  }
  f = message.getPitchenabled();
  if (f) {
    writer.writeBool(
      2,
      f
    );
  }
  f = message.getYawenabled();
  if (f) {
    writer.writeBool(
      3,
      f
    );
  }
  f = message.getRollenabled();
  if (f) {
    writer.writeBool(
      4,
      f
    );
  }
  f = message.getUpenabled();
  if (f) {
    writer.writeBool(
      5,
      f
    );
  }
  f = message.getForwardenabled();
  if (f) {
    writer.writeBool(
      6,
      f
    );
  }
  f = message.getRightenabled();
  if (f) {
    writer.writeBool(
      7,
      f
    );
  }
  f = message.getHasfuel();
  if (f) {
    writer.writeBool(
      8,
      f
    );
  }
  f = message.getPropellantnamesList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      9,
      f
    );
  }
  f = message.getPropellantsMap(true);
  if (f && f.getLength() > 0) {
    f.serializeBinary(10, writer, jspb.BinaryWriter.prototype.writeString, jspb.BinaryWriter.prototype.writeMessage, proto.Propellant.serializeBinaryToWriter);
  }
};


/**
 * optional bool enabled = 1;
 * @return {boolean}
 */
proto.RCS.prototype.getEnabled = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 1, false));
};


/**
 * @param {boolean} value
 * @return {!proto.RCS} returns this
 */
proto.RCS.prototype.setEnabled = function(value) {
  return jspb.Message.setProto3BooleanField(this, 1, value);
};


/**
 * optional bool pitchEnabled = 2;
 * @return {boolean}
 */
proto.RCS.prototype.getPitchenabled = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 2, false));
};


/**
 * @param {boolean} value
 * @return {!proto.RCS} returns this
 */
proto.RCS.prototype.setPitchenabled = function(value) {
  return jspb.Message.setProto3BooleanField(this, 2, value);
};


/**
 * optional bool yawEnabled = 3;
 * @return {boolean}
 */
proto.RCS.prototype.getYawenabled = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 3, false));
};


/**
 * @param {boolean} value
 * @return {!proto.RCS} returns this
 */
proto.RCS.prototype.setYawenabled = function(value) {
  return jspb.Message.setProto3BooleanField(this, 3, value);
};


/**
 * optional bool rollEnabled = 4;
 * @return {boolean}
 */
proto.RCS.prototype.getRollenabled = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 4, false));
};


/**
 * @param {boolean} value
 * @return {!proto.RCS} returns this
 */
proto.RCS.prototype.setRollenabled = function(value) {
  return jspb.Message.setProto3BooleanField(this, 4, value);
};


/**
 * optional bool upEnabled = 5;
 * @return {boolean}
 */
proto.RCS.prototype.getUpenabled = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 5, false));
};


/**
 * @param {boolean} value
 * @return {!proto.RCS} returns this
 */
proto.RCS.prototype.setUpenabled = function(value) {
  return jspb.Message.setProto3BooleanField(this, 5, value);
};


/**
 * optional bool forwardEnabled = 6;
 * @return {boolean}
 */
proto.RCS.prototype.getForwardenabled = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 6, false));
};


/**
 * @param {boolean} value
 * @return {!proto.RCS} returns this
 */
proto.RCS.prototype.setForwardenabled = function(value) {
  return jspb.Message.setProto3BooleanField(this, 6, value);
};


/**
 * optional bool rightEnabled = 7;
 * @return {boolean}
 */
proto.RCS.prototype.getRightenabled = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 7, false));
};


/**
 * @param {boolean} value
 * @return {!proto.RCS} returns this
 */
proto.RCS.prototype.setRightenabled = function(value) {
  return jspb.Message.setProto3BooleanField(this, 7, value);
};


/**
 * optional bool hasFuel = 8;
 * @return {boolean}
 */
proto.RCS.prototype.getHasfuel = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 8, false));
};


/**
 * @param {boolean} value
 * @return {!proto.RCS} returns this
 */
proto.RCS.prototype.setHasfuel = function(value) {
  return jspb.Message.setProto3BooleanField(this, 8, value);
};


/**
 * repeated string propellantNames = 9;
 * @return {!Array<string>}
 */
proto.RCS.prototype.getPropellantnamesList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 9));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.RCS} returns this
 */
proto.RCS.prototype.setPropellantnamesList = function(value) {
  return jspb.Message.setField(this, 9, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.RCS} returns this
 */
proto.RCS.prototype.addPropellantnames = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 9, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.RCS} returns this
 */
proto.RCS.prototype.clearPropellantnamesList = function() {
  return this.setPropellantnamesList([]);
};


/**
 * map<string, Propellant> propellants = 10;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,!proto.Propellant>}
 */
proto.RCS.prototype.getPropellantsMap = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<string,!proto.Propellant>} */ (
      jspb.Message.getMapField(this, 10, opt_noLazyCreate,
      proto.Propellant));
};


/**
 * Clears values from the map. The map will be non-null.
 * @return {!proto.RCS} returns this
 */
proto.RCS.prototype.clearPropellantsMap = function() {
  this.getPropellantsMap().clear();
  return this;};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Radiator.prototype.toObject = function(opt_includeInstance) {
  return proto.Radiator.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Radiator} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Radiator.toObject = function(includeInstance, msg) {
  var f, obj = {
    state: jspb.Message.getFieldWithDefault(msg, 1, 0),
    deployable: jspb.Message.getBooleanFieldWithDefault(msg, 2, false),
    deployed: jspb.Message.getBooleanFieldWithDefault(msg, 3, false),
    cooling: jspb.Message.getBooleanFieldWithDefault(msg, 4, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Radiator}
 */
proto.Radiator.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Radiator;
  return proto.Radiator.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Radiator} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Radiator}
 */
proto.Radiator.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.RadiatorSnapshot.RadiatorState} */ (reader.readEnum());
      msg.setState(value);
      break;
    case 2:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setDeployable(value);
      break;
    case 3:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setDeployed(value);
      break;
    case 4:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setCooling(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Radiator.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Radiator.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Radiator} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Radiator.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getState();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
  f = message.getDeployable();
  if (f) {
    writer.writeBool(
      2,
      f
    );
  }
  f = message.getDeployed();
  if (f) {
    writer.writeBool(
      3,
      f
    );
  }
  f = message.getCooling();
  if (f) {
    writer.writeBool(
      4,
      f
    );
  }
};


/**
 * optional RadiatorSnapshot.RadiatorState state = 1;
 * @return {!proto.RadiatorSnapshot.RadiatorState}
 */
proto.Radiator.prototype.getState = function() {
  return /** @type {!proto.RadiatorSnapshot.RadiatorState} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {!proto.RadiatorSnapshot.RadiatorState} value
 * @return {!proto.Radiator} returns this
 */
proto.Radiator.prototype.setState = function(value) {
  return jspb.Message.setProto3EnumField(this, 1, value);
};


/**
 * optional bool deployable = 2;
 * @return {boolean}
 */
proto.Radiator.prototype.getDeployable = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 2, false));
};


/**
 * @param {boolean} value
 * @return {!proto.Radiator} returns this
 */
proto.Radiator.prototype.setDeployable = function(value) {
  return jspb.Message.setProto3BooleanField(this, 2, value);
};


/**
 * optional bool deployed = 3;
 * @return {boolean}
 */
proto.Radiator.prototype.getDeployed = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 3, false));
};


/**
 * @param {boolean} value
 * @return {!proto.Radiator} returns this
 */
proto.Radiator.prototype.setDeployed = function(value) {
  return jspb.Message.setProto3BooleanField(this, 3, value);
};


/**
 * optional bool cooling = 4;
 * @return {boolean}
 */
proto.Radiator.prototype.getCooling = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 4, false));
};


/**
 * @param {boolean} value
 * @return {!proto.Radiator} returns this
 */
proto.Radiator.prototype.setCooling = function(value) {
  return jspb.Message.setProto3BooleanField(this, 4, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Parachute.prototype.toObject = function(opt_includeInstance) {
  return proto.Parachute.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Parachute} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Parachute.toObject = function(includeInstance, msg) {
  var f, obj = {
    state: jspb.Message.getFieldWithDefault(msg, 1, 0),
    deployed: jspb.Message.getBooleanFieldWithDefault(msg, 2, false),
    deployaltitude: jspb.Message.getFloatingPointFieldWithDefault(msg, 3, 0.0),
    deployminpressure: jspb.Message.getFloatingPointFieldWithDefault(msg, 4, 0.0),
    deploymentsafestate: jspb.Message.getFieldWithDefault(msg, 5, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Parachute}
 */
proto.Parachute.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Parachute;
  return proto.Parachute.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Parachute} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Parachute}
 */
proto.Parachute.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.ParachuteSnapshot.ParachuteState} */ (reader.readEnum());
      msg.setState(value);
      break;
    case 2:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setDeployed(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setDeployaltitude(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setDeployminpressure(value);
      break;
    case 5:
      var value = /** @type {!proto.ParachuteSnapshot.DeploymentSafeState} */ (reader.readEnum());
      msg.setDeploymentsafestate(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Parachute.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Parachute.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Parachute} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Parachute.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getState();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
  f = message.getDeployed();
  if (f) {
    writer.writeBool(
      2,
      f
    );
  }
  f = message.getDeployaltitude();
  if (f !== 0.0) {
    writer.writeDouble(
      3,
      f
    );
  }
  f = message.getDeployminpressure();
  if (f !== 0.0) {
    writer.writeDouble(
      4,
      f
    );
  }
  f = message.getDeploymentsafestate();
  if (f !== 0.0) {
    writer.writeEnum(
      5,
      f
    );
  }
};


/**
 * optional ParachuteSnapshot.ParachuteState state = 1;
 * @return {!proto.ParachuteSnapshot.ParachuteState}
 */
proto.Parachute.prototype.getState = function() {
  return /** @type {!proto.ParachuteSnapshot.ParachuteState} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {!proto.ParachuteSnapshot.ParachuteState} value
 * @return {!proto.Parachute} returns this
 */
proto.Parachute.prototype.setState = function(value) {
  return jspb.Message.setProto3EnumField(this, 1, value);
};


/**
 * optional bool deployed = 2;
 * @return {boolean}
 */
proto.Parachute.prototype.getDeployed = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 2, false));
};


/**
 * @param {boolean} value
 * @return {!proto.Parachute} returns this
 */
proto.Parachute.prototype.setDeployed = function(value) {
  return jspb.Message.setProto3BooleanField(this, 2, value);
};


/**
 * optional double deployAltitude = 3;
 * @return {number}
 */
proto.Parachute.prototype.getDeployaltitude = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 3, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Parachute} returns this
 */
proto.Parachute.prototype.setDeployaltitude = function(value) {
  return jspb.Message.setProto3FloatField(this, 3, value);
};


/**
 * optional double deployMinPressure = 4;
 * @return {number}
 */
proto.Parachute.prototype.getDeployminpressure = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 4, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Parachute} returns this
 */
proto.Parachute.prototype.setDeployminpressure = function(value) {
  return jspb.Message.setProto3FloatField(this, 4, value);
};


/**
 * optional ParachuteSnapshot.DeploymentSafeState deploymentSafeState = 5;
 * @return {!proto.ParachuteSnapshot.DeploymentSafeState}
 */
proto.Parachute.prototype.getDeploymentsafestate = function() {
  return /** @type {!proto.ParachuteSnapshot.DeploymentSafeState} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {!proto.ParachuteSnapshot.DeploymentSafeState} value
 * @return {!proto.Parachute} returns this
 */
proto.Parachute.prototype.setDeploymentsafestate = function(value) {
  return jspb.Message.setProto3EnumField(this, 5, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Light.prototype.toObject = function(opt_includeInstance) {
  return proto.Light.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Light} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Light.toObject = function(includeInstance, msg) {
  var f, obj = {
    on: jspb.Message.getBooleanFieldWithDefault(msg, 1, false),
    powerusage: jspb.Message.getFloatingPointFieldWithDefault(msg, 2, 0.0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Light}
 */
proto.Light.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Light;
  return proto.Light.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Light} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Light}
 */
proto.Light.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setOn(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setPowerusage(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Light.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Light.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Light} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Light.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOn();
  if (f) {
    writer.writeBool(
      1,
      f
    );
  }
  f = message.getPowerusage();
  if (f !== 0.0) {
    writer.writeDouble(
      2,
      f
    );
  }
};


/**
 * optional bool on = 1;
 * @return {boolean}
 */
proto.Light.prototype.getOn = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 1, false));
};


/**
 * @param {boolean} value
 * @return {!proto.Light} returns this
 */
proto.Light.prototype.setOn = function(value) {
  return jspb.Message.setProto3BooleanField(this, 1, value);
};


/**
 * optional double powerUsage = 2;
 * @return {number}
 */
proto.Light.prototype.getPowerusage = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 2, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Light} returns this
 */
proto.Light.prototype.setPowerusage = function(value) {
  return jspb.Message.setProto3FloatField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Leg.prototype.toObject = function(opt_includeInstance) {
  return proto.Leg.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Leg} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Leg.toObject = function(includeInstance, msg) {
  var f, obj = {
    state: jspb.Message.getFieldWithDefault(msg, 1, 0),
    deployable: jspb.Message.getBooleanFieldWithDefault(msg, 2, false),
    deployed: jspb.Message.getBooleanFieldWithDefault(msg, 3, false),
    grounded: jspb.Message.getBooleanFieldWithDefault(msg, 4, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Leg}
 */
proto.Leg.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Leg;
  return proto.Leg.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Leg} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Leg}
 */
proto.Leg.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.LegSnapshot.LegState} */ (reader.readEnum());
      msg.setState(value);
      break;
    case 2:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setDeployable(value);
      break;
    case 3:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setDeployed(value);
      break;
    case 4:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setGrounded(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Leg.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Leg.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Leg} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Leg.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getState();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
  f = message.getDeployable();
  if (f) {
    writer.writeBool(
      2,
      f
    );
  }
  f = message.getDeployed();
  if (f) {
    writer.writeBool(
      3,
      f
    );
  }
  f = message.getGrounded();
  if (f) {
    writer.writeBool(
      4,
      f
    );
  }
};


/**
 * optional LegSnapshot.LegState state = 1;
 * @return {!proto.LegSnapshot.LegState}
 */
proto.Leg.prototype.getState = function() {
  return /** @type {!proto.LegSnapshot.LegState} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {!proto.LegSnapshot.LegState} value
 * @return {!proto.Leg} returns this
 */
proto.Leg.prototype.setState = function(value) {
  return jspb.Message.setProto3EnumField(this, 1, value);
};


/**
 * optional bool deployable = 2;
 * @return {boolean}
 */
proto.Leg.prototype.getDeployable = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 2, false));
};


/**
 * @param {boolean} value
 * @return {!proto.Leg} returns this
 */
proto.Leg.prototype.setDeployable = function(value) {
  return jspb.Message.setProto3BooleanField(this, 2, value);
};


/**
 * optional bool deployed = 3;
 * @return {boolean}
 */
proto.Leg.prototype.getDeployed = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 3, false));
};


/**
 * @param {boolean} value
 * @return {!proto.Leg} returns this
 */
proto.Leg.prototype.setDeployed = function(value) {
  return jspb.Message.setProto3BooleanField(this, 3, value);
};


/**
 * optional bool grounded = 4;
 * @return {boolean}
 */
proto.Leg.prototype.getGrounded = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 4, false));
};


/**
 * @param {boolean} value
 * @return {!proto.Leg} returns this
 */
proto.Leg.prototype.setGrounded = function(value) {
  return jspb.Message.setProto3BooleanField(this, 4, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Intake.prototype.toObject = function(opt_includeInstance) {
  return proto.Intake.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Intake} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Intake.toObject = function(includeInstance, msg) {
  var f, obj = {
    open: jspb.Message.getBooleanFieldWithDefault(msg, 1, false),
    speed: jspb.Message.getFloatingPointFieldWithDefault(msg, 2, 0.0),
    flow: jspb.Message.getFloatingPointFieldWithDefault(msg, 3, 0.0),
    area: jspb.Message.getFloatingPointFieldWithDefault(msg, 4, 0.0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Intake}
 */
proto.Intake.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Intake;
  return proto.Intake.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Intake} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Intake}
 */
proto.Intake.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setOpen(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setSpeed(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setFlow(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setArea(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Intake.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Intake.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Intake} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Intake.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOpen();
  if (f) {
    writer.writeBool(
      1,
      f
    );
  }
  f = message.getSpeed();
  if (f !== 0.0) {
    writer.writeDouble(
      2,
      f
    );
  }
  f = message.getFlow();
  if (f !== 0.0) {
    writer.writeDouble(
      3,
      f
    );
  }
  f = message.getArea();
  if (f !== 0.0) {
    writer.writeDouble(
      4,
      f
    );
  }
};


/**
 * optional bool open = 1;
 * @return {boolean}
 */
proto.Intake.prototype.getOpen = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 1, false));
};


/**
 * @param {boolean} value
 * @return {!proto.Intake} returns this
 */
proto.Intake.prototype.setOpen = function(value) {
  return jspb.Message.setProto3BooleanField(this, 1, value);
};


/**
 * optional double speed = 2;
 * @return {number}
 */
proto.Intake.prototype.getSpeed = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 2, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Intake} returns this
 */
proto.Intake.prototype.setSpeed = function(value) {
  return jspb.Message.setProto3FloatField(this, 2, value);
};


/**
 * optional double flow = 3;
 * @return {number}
 */
proto.Intake.prototype.getFlow = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 3, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Intake} returns this
 */
proto.Intake.prototype.setFlow = function(value) {
  return jspb.Message.setProto3FloatField(this, 3, value);
};


/**
 * optional double area = 4;
 * @return {number}
 */
proto.Intake.prototype.getArea = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 4, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Intake} returns this
 */
proto.Intake.prototype.setArea = function(value) {
  return jspb.Message.setProto3FloatField(this, 4, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Fairing.prototype.toObject = function(opt_includeInstance) {
  return proto.Fairing.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Fairing} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Fairing.toObject = function(includeInstance, msg) {
  var f, obj = {
    jettisoned: jspb.Message.getBooleanFieldWithDefault(msg, 1, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Fairing}
 */
proto.Fairing.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Fairing;
  return proto.Fairing.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Fairing} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Fairing}
 */
proto.Fairing.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setJettisoned(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Fairing.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Fairing.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Fairing} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Fairing.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getJettisoned();
  if (f) {
    writer.writeBool(
      1,
      f
    );
  }
};


/**
 * optional bool jettisoned = 1;
 * @return {boolean}
 */
proto.Fairing.prototype.getJettisoned = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 1, false));
};


/**
 * @param {boolean} value
 * @return {!proto.Fairing} returns this
 */
proto.Fairing.prototype.setJettisoned = function(value) {
  return jspb.Message.setProto3BooleanField(this, 1, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.Engine.repeatedFields_ = [8,18];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Engine.prototype.toObject = function(opt_includeInstance) {
  return proto.Engine.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Engine} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Engine.toObject = function(includeInstance, msg) {
  var f, obj = {
    active: jspb.Message.getBooleanFieldWithDefault(msg, 1, false),
    thrust: jspb.Message.getFloatingPointFieldWithDefault(msg, 2, 0.0),
    maxvacuumthrust: jspb.Message.getFloatingPointFieldWithDefault(msg, 3, 0.0),
    thrustpercentage: jspb.Message.getFloatingPointFieldWithDefault(msg, 4, 0.0),
    specificimpulse: jspb.Message.getFloatingPointFieldWithDefault(msg, 5, 0.0),
    vacuumspecificimpulse: jspb.Message.getFloatingPointFieldWithDefault(msg, 6, 0.0),
    kerbinsealevelspecificimpulse: jspb.Message.getFloatingPointFieldWithDefault(msg, 7, 0.0),
    propellantnamesList: (f = jspb.Message.getRepeatedField(msg, 8)) == null ? undefined : f,
    propellantsMap: (f = msg.getPropellantsMap()) ? f.toObject(includeInstance, proto.Propellant.toObject) : [],
    hasfuel: jspb.Message.getBooleanFieldWithDefault(msg, 10, false),
    throttle: jspb.Message.getFloatingPointFieldWithDefault(msg, 11, 0.0),
    throttlelocked: jspb.Message.getBooleanFieldWithDefault(msg, 12, false),
    canrestart: jspb.Message.getBooleanFieldWithDefault(msg, 13, false),
    canshutdown: jspb.Message.getBooleanFieldWithDefault(msg, 14, false),
    hasmodes: jspb.Message.getBooleanFieldWithDefault(msg, 15, false),
    autoswitchmode: jspb.Message.getBooleanFieldWithDefault(msg, 16, false),
    mode: jspb.Message.getFieldWithDefault(msg, 17, ""),
    modesList: (f = jspb.Message.getRepeatedField(msg, 18)) == null ? undefined : f,
    gimballed: jspb.Message.getBooleanFieldWithDefault(msg, 19, false),
    gimbalrange: jspb.Message.getFloatingPointFieldWithDefault(msg, 20, 0.0),
    gimballocked: jspb.Message.getBooleanFieldWithDefault(msg, 21, false),
    gimballimit: jspb.Message.getFloatingPointFieldWithDefault(msg, 22, 0.0),
    flameout: jspb.Message.getBooleanFieldWithDefault(msg, 23, false),
    electricitychargerate: jspb.Message.getFloatingPointFieldWithDefault(msg, 24, 0.0),
    remainingignitions: jspb.Message.getFloatingPointFieldWithDefault(msg, 25, 0.0),
    ignitions: jspb.Message.getFloatingPointFieldWithDefault(msg, 26, 0.0),
    actualthrottle: jspb.Message.getFloatingPointFieldWithDefault(msg, 27, 0.0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Engine}
 */
proto.Engine.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Engine;
  return proto.Engine.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Engine} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Engine}
 */
proto.Engine.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setActive(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setThrust(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setMaxvacuumthrust(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setThrustpercentage(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setSpecificimpulse(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setVacuumspecificimpulse(value);
      break;
    case 7:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setKerbinsealevelspecificimpulse(value);
      break;
    case 8:
      var value = /** @type {string} */ (reader.readString());
      msg.addPropellantnames(value);
      break;
    case 9:
      var value = msg.getPropellantsMap();
      reader.readMessage(value, function(message, reader) {
        jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readMessage, proto.Propellant.deserializeBinaryFromReader, "", new proto.Propellant());
         });
      break;
    case 10:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setHasfuel(value);
      break;
    case 11:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setThrottle(value);
      break;
    case 12:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setThrottlelocked(value);
      break;
    case 13:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setCanrestart(value);
      break;
    case 14:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setCanshutdown(value);
      break;
    case 15:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setHasmodes(value);
      break;
    case 16:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setAutoswitchmode(value);
      break;
    case 17:
      var value = /** @type {string} */ (reader.readString());
      msg.setMode(value);
      break;
    case 18:
      var value = /** @type {string} */ (reader.readString());
      msg.addModes(value);
      break;
    case 19:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setGimballed(value);
      break;
    case 20:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setGimbalrange(value);
      break;
    case 21:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setGimballocked(value);
      break;
    case 22:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setGimballimit(value);
      break;
    case 23:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setFlameout(value);
      break;
    case 24:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setElectricitychargerate(value);
      break;
    case 25:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setRemainingignitions(value);
      break;
    case 26:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setIgnitions(value);
      break;
    case 27:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setActualthrottle(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Engine.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Engine.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Engine} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Engine.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getActive();
  if (f) {
    writer.writeBool(
      1,
      f
    );
  }
  f = message.getThrust();
  if (f !== 0.0) {
    writer.writeDouble(
      2,
      f
    );
  }
  f = message.getMaxvacuumthrust();
  if (f !== 0.0) {
    writer.writeDouble(
      3,
      f
    );
  }
  f = message.getThrustpercentage();
  if (f !== 0.0) {
    writer.writeDouble(
      4,
      f
    );
  }
  f = message.getSpecificimpulse();
  if (f !== 0.0) {
    writer.writeDouble(
      5,
      f
    );
  }
  f = message.getVacuumspecificimpulse();
  if (f !== 0.0) {
    writer.writeDouble(
      6,
      f
    );
  }
  f = message.getKerbinsealevelspecificimpulse();
  if (f !== 0.0) {
    writer.writeDouble(
      7,
      f
    );
  }
  f = message.getPropellantnamesList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      8,
      f
    );
  }
  f = message.getPropellantsMap(true);
  if (f && f.getLength() > 0) {
    f.serializeBinary(9, writer, jspb.BinaryWriter.prototype.writeString, jspb.BinaryWriter.prototype.writeMessage, proto.Propellant.serializeBinaryToWriter);
  }
  f = message.getHasfuel();
  if (f) {
    writer.writeBool(
      10,
      f
    );
  }
  f = message.getThrottle();
  if (f !== 0.0) {
    writer.writeDouble(
      11,
      f
    );
  }
  f = message.getThrottlelocked();
  if (f) {
    writer.writeBool(
      12,
      f
    );
  }
  f = message.getCanrestart();
  if (f) {
    writer.writeBool(
      13,
      f
    );
  }
  f = message.getCanshutdown();
  if (f) {
    writer.writeBool(
      14,
      f
    );
  }
  f = message.getHasmodes();
  if (f) {
    writer.writeBool(
      15,
      f
    );
  }
  f = message.getAutoswitchmode();
  if (f) {
    writer.writeBool(
      16,
      f
    );
  }
  f = message.getMode();
  if (f.length > 0) {
    writer.writeString(
      17,
      f
    );
  }
  f = message.getModesList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      18,
      f
    );
  }
  f = message.getGimballed();
  if (f) {
    writer.writeBool(
      19,
      f
    );
  }
  f = message.getGimbalrange();
  if (f !== 0.0) {
    writer.writeDouble(
      20,
      f
    );
  }
  f = message.getGimballocked();
  if (f) {
    writer.writeBool(
      21,
      f
    );
  }
  f = message.getGimballimit();
  if (f !== 0.0) {
    writer.writeDouble(
      22,
      f
    );
  }
  f = message.getFlameout();
  if (f) {
    writer.writeBool(
      23,
      f
    );
  }
  f = message.getElectricitychargerate();
  if (f !== 0.0) {
    writer.writeDouble(
      24,
      f
    );
  }
  f = message.getRemainingignitions();
  if (f !== 0.0) {
    writer.writeDouble(
      25,
      f
    );
  }
  f = message.getIgnitions();
  if (f !== 0.0) {
    writer.writeDouble(
      26,
      f
    );
  }
  f = message.getActualthrottle();
  if (f !== 0.0) {
    writer.writeDouble(
      27,
      f
    );
  }
};


/**
 * optional bool active = 1;
 * @return {boolean}
 */
proto.Engine.prototype.getActive = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 1, false));
};


/**
 * @param {boolean} value
 * @return {!proto.Engine} returns this
 */
proto.Engine.prototype.setActive = function(value) {
  return jspb.Message.setProto3BooleanField(this, 1, value);
};


/**
 * optional double thrust = 2;
 * @return {number}
 */
proto.Engine.prototype.getThrust = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 2, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Engine} returns this
 */
proto.Engine.prototype.setThrust = function(value) {
  return jspb.Message.setProto3FloatField(this, 2, value);
};


/**
 * optional double maxVacuumThrust = 3;
 * @return {number}
 */
proto.Engine.prototype.getMaxvacuumthrust = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 3, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Engine} returns this
 */
proto.Engine.prototype.setMaxvacuumthrust = function(value) {
  return jspb.Message.setProto3FloatField(this, 3, value);
};


/**
 * optional double thrustPercentage = 4;
 * @return {number}
 */
proto.Engine.prototype.getThrustpercentage = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 4, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Engine} returns this
 */
proto.Engine.prototype.setThrustpercentage = function(value) {
  return jspb.Message.setProto3FloatField(this, 4, value);
};


/**
 * optional double specificImpulse = 5;
 * @return {number}
 */
proto.Engine.prototype.getSpecificimpulse = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 5, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Engine} returns this
 */
proto.Engine.prototype.setSpecificimpulse = function(value) {
  return jspb.Message.setProto3FloatField(this, 5, value);
};


/**
 * optional double vacuumSpecificImpulse = 6;
 * @return {number}
 */
proto.Engine.prototype.getVacuumspecificimpulse = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 6, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Engine} returns this
 */
proto.Engine.prototype.setVacuumspecificimpulse = function(value) {
  return jspb.Message.setProto3FloatField(this, 6, value);
};


/**
 * optional double kerbinSeaLevelSpecificImpulse = 7;
 * @return {number}
 */
proto.Engine.prototype.getKerbinsealevelspecificimpulse = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 7, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Engine} returns this
 */
proto.Engine.prototype.setKerbinsealevelspecificimpulse = function(value) {
  return jspb.Message.setProto3FloatField(this, 7, value);
};


/**
 * repeated string propellantNames = 8;
 * @return {!Array<string>}
 */
proto.Engine.prototype.getPropellantnamesList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 8));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.Engine} returns this
 */
proto.Engine.prototype.setPropellantnamesList = function(value) {
  return jspb.Message.setField(this, 8, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.Engine} returns this
 */
proto.Engine.prototype.addPropellantnames = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 8, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.Engine} returns this
 */
proto.Engine.prototype.clearPropellantnamesList = function() {
  return this.setPropellantnamesList([]);
};


/**
 * map<string, Propellant> propellants = 9;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,!proto.Propellant>}
 */
proto.Engine.prototype.getPropellantsMap = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<string,!proto.Propellant>} */ (
      jspb.Message.getMapField(this, 9, opt_noLazyCreate,
      proto.Propellant));
};


/**
 * Clears values from the map. The map will be non-null.
 * @return {!proto.Engine} returns this
 */
proto.Engine.prototype.clearPropellantsMap = function() {
  this.getPropellantsMap().clear();
  return this;};


/**
 * optional bool hasFuel = 10;
 * @return {boolean}
 */
proto.Engine.prototype.getHasfuel = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 10, false));
};


/**
 * @param {boolean} value
 * @return {!proto.Engine} returns this
 */
proto.Engine.prototype.setHasfuel = function(value) {
  return jspb.Message.setProto3BooleanField(this, 10, value);
};


/**
 * optional double throttle = 11;
 * @return {number}
 */
proto.Engine.prototype.getThrottle = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 11, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Engine} returns this
 */
proto.Engine.prototype.setThrottle = function(value) {
  return jspb.Message.setProto3FloatField(this, 11, value);
};


/**
 * optional bool throttleLocked = 12;
 * @return {boolean}
 */
proto.Engine.prototype.getThrottlelocked = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 12, false));
};


/**
 * @param {boolean} value
 * @return {!proto.Engine} returns this
 */
proto.Engine.prototype.setThrottlelocked = function(value) {
  return jspb.Message.setProto3BooleanField(this, 12, value);
};


/**
 * optional bool canRestart = 13;
 * @return {boolean}
 */
proto.Engine.prototype.getCanrestart = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 13, false));
};


/**
 * @param {boolean} value
 * @return {!proto.Engine} returns this
 */
proto.Engine.prototype.setCanrestart = function(value) {
  return jspb.Message.setProto3BooleanField(this, 13, value);
};


/**
 * optional bool canShutdown = 14;
 * @return {boolean}
 */
proto.Engine.prototype.getCanshutdown = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 14, false));
};


/**
 * @param {boolean} value
 * @return {!proto.Engine} returns this
 */
proto.Engine.prototype.setCanshutdown = function(value) {
  return jspb.Message.setProto3BooleanField(this, 14, value);
};


/**
 * optional bool hasModes = 15;
 * @return {boolean}
 */
proto.Engine.prototype.getHasmodes = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 15, false));
};


/**
 * @param {boolean} value
 * @return {!proto.Engine} returns this
 */
proto.Engine.prototype.setHasmodes = function(value) {
  return jspb.Message.setProto3BooleanField(this, 15, value);
};


/**
 * optional bool autoSwitchMode = 16;
 * @return {boolean}
 */
proto.Engine.prototype.getAutoswitchmode = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 16, false));
};


/**
 * @param {boolean} value
 * @return {!proto.Engine} returns this
 */
proto.Engine.prototype.setAutoswitchmode = function(value) {
  return jspb.Message.setProto3BooleanField(this, 16, value);
};


/**
 * optional string mode = 17;
 * @return {string}
 */
proto.Engine.prototype.getMode = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 17, ""));
};


/**
 * @param {string} value
 * @return {!proto.Engine} returns this
 */
proto.Engine.prototype.setMode = function(value) {
  return jspb.Message.setProto3StringField(this, 17, value);
};


/**
 * repeated string modes = 18;
 * @return {!Array<string>}
 */
proto.Engine.prototype.getModesList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 18));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.Engine} returns this
 */
proto.Engine.prototype.setModesList = function(value) {
  return jspb.Message.setField(this, 18, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.Engine} returns this
 */
proto.Engine.prototype.addModes = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 18, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.Engine} returns this
 */
proto.Engine.prototype.clearModesList = function() {
  return this.setModesList([]);
};


/**
 * optional bool gimballed = 19;
 * @return {boolean}
 */
proto.Engine.prototype.getGimballed = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 19, false));
};


/**
 * @param {boolean} value
 * @return {!proto.Engine} returns this
 */
proto.Engine.prototype.setGimballed = function(value) {
  return jspb.Message.setProto3BooleanField(this, 19, value);
};


/**
 * optional double gimbalRange = 20;
 * @return {number}
 */
proto.Engine.prototype.getGimbalrange = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 20, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Engine} returns this
 */
proto.Engine.prototype.setGimbalrange = function(value) {
  return jspb.Message.setProto3FloatField(this, 20, value);
};


/**
 * optional bool gimbalLocked = 21;
 * @return {boolean}
 */
proto.Engine.prototype.getGimballocked = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 21, false));
};


/**
 * @param {boolean} value
 * @return {!proto.Engine} returns this
 */
proto.Engine.prototype.setGimballocked = function(value) {
  return jspb.Message.setProto3BooleanField(this, 21, value);
};


/**
 * optional double gimbalLimit = 22;
 * @return {number}
 */
proto.Engine.prototype.getGimballimit = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 22, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Engine} returns this
 */
proto.Engine.prototype.setGimballimit = function(value) {
  return jspb.Message.setProto3FloatField(this, 22, value);
};


/**
 * optional bool flameout = 23;
 * @return {boolean}
 */
proto.Engine.prototype.getFlameout = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 23, false));
};


/**
 * @param {boolean} value
 * @return {!proto.Engine} returns this
 */
proto.Engine.prototype.setFlameout = function(value) {
  return jspb.Message.setProto3BooleanField(this, 23, value);
};


/**
 * optional double electricityChargeRate = 24;
 * @return {number}
 */
proto.Engine.prototype.getElectricitychargerate = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 24, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Engine} returns this
 */
proto.Engine.prototype.setElectricitychargerate = function(value) {
  return jspb.Message.setProto3FloatField(this, 24, value);
};


/**
 * optional double remainingIgnitions = 25;
 * @return {number}
 */
proto.Engine.prototype.getRemainingignitions = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 25, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Engine} returns this
 */
proto.Engine.prototype.setRemainingignitions = function(value) {
  return jspb.Message.setProto3FloatField(this, 25, value);
};


/**
 * optional double ignitions = 26;
 * @return {number}
 */
proto.Engine.prototype.getIgnitions = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 26, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Engine} returns this
 */
proto.Engine.prototype.setIgnitions = function(value) {
  return jspb.Message.setProto3FloatField(this, 26, value);
};


/**
 * optional double actualThrottle = 27;
 * @return {number}
 */
proto.Engine.prototype.getActualthrottle = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 27, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Engine} returns this
 */
proto.Engine.prototype.setActualthrottle = function(value) {
  return jspb.Message.setProto3FloatField(this, 27, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.DockingPort.prototype.toObject = function(opt_includeInstance) {
  return proto.DockingPort.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.DockingPort} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.DockingPort.toObject = function(includeInstance, msg) {
  var f, obj = {
    state: jspb.Message.getFieldWithDefault(msg, 1, 0),
    hasshield: jspb.Message.getBooleanFieldWithDefault(msg, 2, false),
    shieled: jspb.Message.getBooleanFieldWithDefault(msg, 3, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.DockingPort}
 */
proto.DockingPort.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.DockingPort;
  return proto.DockingPort.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.DockingPort} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.DockingPort}
 */
proto.DockingPort.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.DockingPortSnapshot.DockingPortState} */ (reader.readEnum());
      msg.setState(value);
      break;
    case 2:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setHasshield(value);
      break;
    case 3:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setShieled(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.DockingPort.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.DockingPort.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.DockingPort} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.DockingPort.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getState();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
  f = message.getHasshield();
  if (f) {
    writer.writeBool(
      2,
      f
    );
  }
  f = message.getShieled();
  if (f) {
    writer.writeBool(
      3,
      f
    );
  }
};


/**
 * optional DockingPortSnapshot.DockingPortState state = 1;
 * @return {!proto.DockingPortSnapshot.DockingPortState}
 */
proto.DockingPort.prototype.getState = function() {
  return /** @type {!proto.DockingPortSnapshot.DockingPortState} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {!proto.DockingPortSnapshot.DockingPortState} value
 * @return {!proto.DockingPort} returns this
 */
proto.DockingPort.prototype.setState = function(value) {
  return jspb.Message.setProto3EnumField(this, 1, value);
};


/**
 * optional bool hasShield = 2;
 * @return {boolean}
 */
proto.DockingPort.prototype.getHasshield = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 2, false));
};


/**
 * @param {boolean} value
 * @return {!proto.DockingPort} returns this
 */
proto.DockingPort.prototype.setHasshield = function(value) {
  return jspb.Message.setProto3BooleanField(this, 2, value);
};


/**
 * optional bool shieled = 3;
 * @return {boolean}
 */
proto.DockingPort.prototype.getShieled = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 3, false));
};


/**
 * @param {boolean} value
 * @return {!proto.DockingPort} returns this
 */
proto.DockingPort.prototype.setShieled = function(value) {
  return jspb.Message.setProto3BooleanField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Decoupler.prototype.toObject = function(opt_includeInstance) {
  return proto.Decoupler.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Decoupler} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Decoupler.toObject = function(includeInstance, msg) {
  var f, obj = {
    decoupled: jspb.Message.getBooleanFieldWithDefault(msg, 1, false),
    stagingenabled: jspb.Message.getBooleanFieldWithDefault(msg, 2, false),
    ejectionforce: jspb.Message.getFloatingPointFieldWithDefault(msg, 3, 0.0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Decoupler}
 */
proto.Decoupler.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Decoupler;
  return proto.Decoupler.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Decoupler} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Decoupler}
 */
proto.Decoupler.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setDecoupled(value);
      break;
    case 2:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setStagingenabled(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setEjectionforce(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Decoupler.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Decoupler.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Decoupler} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Decoupler.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDecoupled();
  if (f) {
    writer.writeBool(
      1,
      f
    );
  }
  f = message.getStagingenabled();
  if (f) {
    writer.writeBool(
      2,
      f
    );
  }
  f = message.getEjectionforce();
  if (f !== 0.0) {
    writer.writeDouble(
      3,
      f
    );
  }
};


/**
 * optional bool decoupled = 1;
 * @return {boolean}
 */
proto.Decoupler.prototype.getDecoupled = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 1, false));
};


/**
 * @param {boolean} value
 * @return {!proto.Decoupler} returns this
 */
proto.Decoupler.prototype.setDecoupled = function(value) {
  return jspb.Message.setProto3BooleanField(this, 1, value);
};


/**
 * optional bool stagingEnabled = 2;
 * @return {boolean}
 */
proto.Decoupler.prototype.getStagingenabled = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 2, false));
};


/**
 * @param {boolean} value
 * @return {!proto.Decoupler} returns this
 */
proto.Decoupler.prototype.setStagingenabled = function(value) {
  return jspb.Message.setProto3BooleanField(this, 2, value);
};


/**
 * optional double ejectionForce = 3;
 * @return {number}
 */
proto.Decoupler.prototype.getEjectionforce = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 3, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Decoupler} returns this
 */
proto.Decoupler.prototype.setEjectionforce = function(value) {
  return jspb.Message.setProto3FloatField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ControlSurface.prototype.toObject = function(opt_includeInstance) {
  return proto.ControlSurface.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ControlSurface} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ControlSurface.toObject = function(includeInstance, msg) {
  var f, obj = {
    pitchenabled: jspb.Message.getBooleanFieldWithDefault(msg, 1, false),
    yawenabled: jspb.Message.getBooleanFieldWithDefault(msg, 2, false),
    rollenabled: jspb.Message.getBooleanFieldWithDefault(msg, 3, false),
    authoritylimiter: jspb.Message.getFloatingPointFieldWithDefault(msg, 4, 0.0),
    inverted: jspb.Message.getBooleanFieldWithDefault(msg, 5, false),
    deployed: jspb.Message.getBooleanFieldWithDefault(msg, 6, false),
    surfacearea: jspb.Message.getFloatingPointFieldWithDefault(msg, 7, 0.0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.ControlSurface}
 */
proto.ControlSurface.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ControlSurface;
  return proto.ControlSurface.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ControlSurface} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ControlSurface}
 */
proto.ControlSurface.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setPitchenabled(value);
      break;
    case 2:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setYawenabled(value);
      break;
    case 3:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setRollenabled(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setAuthoritylimiter(value);
      break;
    case 5:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setInverted(value);
      break;
    case 6:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setDeployed(value);
      break;
    case 7:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setSurfacearea(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ControlSurface.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.ControlSurface.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.ControlSurface} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ControlSurface.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPitchenabled();
  if (f) {
    writer.writeBool(
      1,
      f
    );
  }
  f = message.getYawenabled();
  if (f) {
    writer.writeBool(
      2,
      f
    );
  }
  f = message.getRollenabled();
  if (f) {
    writer.writeBool(
      3,
      f
    );
  }
  f = message.getAuthoritylimiter();
  if (f !== 0.0) {
    writer.writeDouble(
      4,
      f
    );
  }
  f = message.getInverted();
  if (f) {
    writer.writeBool(
      5,
      f
    );
  }
  f = message.getDeployed();
  if (f) {
    writer.writeBool(
      6,
      f
    );
  }
  f = message.getSurfacearea();
  if (f !== 0.0) {
    writer.writeDouble(
      7,
      f
    );
  }
};


/**
 * optional bool pitchEnabled = 1;
 * @return {boolean}
 */
proto.ControlSurface.prototype.getPitchenabled = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 1, false));
};


/**
 * @param {boolean} value
 * @return {!proto.ControlSurface} returns this
 */
proto.ControlSurface.prototype.setPitchenabled = function(value) {
  return jspb.Message.setProto3BooleanField(this, 1, value);
};


/**
 * optional bool yawEnabled = 2;
 * @return {boolean}
 */
proto.ControlSurface.prototype.getYawenabled = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 2, false));
};


/**
 * @param {boolean} value
 * @return {!proto.ControlSurface} returns this
 */
proto.ControlSurface.prototype.setYawenabled = function(value) {
  return jspb.Message.setProto3BooleanField(this, 2, value);
};


/**
 * optional bool rollEnabled = 3;
 * @return {boolean}
 */
proto.ControlSurface.prototype.getRollenabled = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 3, false));
};


/**
 * @param {boolean} value
 * @return {!proto.ControlSurface} returns this
 */
proto.ControlSurface.prototype.setRollenabled = function(value) {
  return jspb.Message.setProto3BooleanField(this, 3, value);
};


/**
 * optional double authorityLimiter = 4;
 * @return {number}
 */
proto.ControlSurface.prototype.getAuthoritylimiter = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 4, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.ControlSurface} returns this
 */
proto.ControlSurface.prototype.setAuthoritylimiter = function(value) {
  return jspb.Message.setProto3FloatField(this, 4, value);
};


/**
 * optional bool inverted = 5;
 * @return {boolean}
 */
proto.ControlSurface.prototype.getInverted = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 5, false));
};


/**
 * @param {boolean} value
 * @return {!proto.ControlSurface} returns this
 */
proto.ControlSurface.prototype.setInverted = function(value) {
  return jspb.Message.setProto3BooleanField(this, 5, value);
};


/**
 * optional bool deployed = 6;
 * @return {boolean}
 */
proto.ControlSurface.prototype.getDeployed = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 6, false));
};


/**
 * @param {boolean} value
 * @return {!proto.ControlSurface} returns this
 */
proto.ControlSurface.prototype.setDeployed = function(value) {
  return jspb.Message.setProto3BooleanField(this, 6, value);
};


/**
 * optional double surfaceArea = 7;
 * @return {number}
 */
proto.ControlSurface.prototype.getSurfacearea = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 7, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.ControlSurface} returns this
 */
proto.ControlSurface.prototype.setSurfacearea = function(value) {
  return jspb.Message.setProto3FloatField(this, 7, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.CargoBay.prototype.toObject = function(opt_includeInstance) {
  return proto.CargoBay.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.CargoBay} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.CargoBay.toObject = function(includeInstance, msg) {
  var f, obj = {
    state: jspb.Message.getFieldWithDefault(msg, 1, 0),
    deploypercent: jspb.Message.getFloatingPointFieldWithDefault(msg, 2, 0.0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.CargoBay}
 */
proto.CargoBay.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.CargoBay;
  return proto.CargoBay.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.CargoBay} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.CargoBay}
 */
proto.CargoBay.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.CargoBaySnapshot.CargoBayState} */ (reader.readEnum());
      msg.setState(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setDeploypercent(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.CargoBay.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.CargoBay.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.CargoBay} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.CargoBay.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getState();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
  f = message.getDeploypercent();
  if (f !== 0.0) {
    writer.writeDouble(
      2,
      f
    );
  }
};


/**
 * optional CargoBaySnapshot.CargoBayState state = 1;
 * @return {!proto.CargoBaySnapshot.CargoBayState}
 */
proto.CargoBay.prototype.getState = function() {
  return /** @type {!proto.CargoBaySnapshot.CargoBayState} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {!proto.CargoBaySnapshot.CargoBayState} value
 * @return {!proto.CargoBay} returns this
 */
proto.CargoBay.prototype.setState = function(value) {
  return jspb.Message.setProto3EnumField(this, 1, value);
};


/**
 * optional double deployPercent = 2;
 * @return {number}
 */
proto.CargoBay.prototype.getDeploypercent = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 2, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.CargoBay} returns this
 */
proto.CargoBay.prototype.setDeploypercent = function(value) {
  return jspb.Message.setProto3FloatField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Antenna.prototype.toObject = function(opt_includeInstance) {
  return proto.Antenna.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Antenna} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Antenna.toObject = function(includeInstance, msg) {
  var f, obj = {
    state: jspb.Message.getFieldWithDefault(msg, 1, 0),
    cantransmit: jspb.Message.getBooleanFieldWithDefault(msg, 2, false),
    allowpartial: jspb.Message.getBooleanFieldWithDefault(msg, 3, false),
    power: jspb.Message.getFloatingPointFieldWithDefault(msg, 4, 0.0),
    combinable: jspb.Message.getBooleanFieldWithDefault(msg, 5, false),
    combinableexponent: jspb.Message.getFloatingPointFieldWithDefault(msg, 6, 0.0),
    packetinterval: jspb.Message.getFloatingPointFieldWithDefault(msg, 7, 0.0),
    packetsize: jspb.Message.getFloatingPointFieldWithDefault(msg, 8, 0.0),
    packetresourcecost: jspb.Message.getFloatingPointFieldWithDefault(msg, 9, 0.0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Antenna}
 */
proto.Antenna.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Antenna;
  return proto.Antenna.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Antenna} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Antenna}
 */
proto.Antenna.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.AntennaSnapshot.AntennaState} */ (reader.readEnum());
      msg.setState(value);
      break;
    case 2:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setCantransmit(value);
      break;
    case 3:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setAllowpartial(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setPower(value);
      break;
    case 5:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setCombinable(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setCombinableexponent(value);
      break;
    case 7:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setPacketinterval(value);
      break;
    case 8:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setPacketsize(value);
      break;
    case 9:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setPacketresourcecost(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Antenna.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Antenna.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Antenna} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Antenna.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getState();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
  f = message.getCantransmit();
  if (f) {
    writer.writeBool(
      2,
      f
    );
  }
  f = message.getAllowpartial();
  if (f) {
    writer.writeBool(
      3,
      f
    );
  }
  f = message.getPower();
  if (f !== 0.0) {
    writer.writeDouble(
      4,
      f
    );
  }
  f = message.getCombinable();
  if (f) {
    writer.writeBool(
      5,
      f
    );
  }
  f = message.getCombinableexponent();
  if (f !== 0.0) {
    writer.writeDouble(
      6,
      f
    );
  }
  f = message.getPacketinterval();
  if (f !== 0.0) {
    writer.writeDouble(
      7,
      f
    );
  }
  f = message.getPacketsize();
  if (f !== 0.0) {
    writer.writeDouble(
      8,
      f
    );
  }
  f = message.getPacketresourcecost();
  if (f !== 0.0) {
    writer.writeDouble(
      9,
      f
    );
  }
};


/**
 * optional AntennaSnapshot.AntennaState state = 1;
 * @return {!proto.AntennaSnapshot.AntennaState}
 */
proto.Antenna.prototype.getState = function() {
  return /** @type {!proto.AntennaSnapshot.AntennaState} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {!proto.AntennaSnapshot.AntennaState} value
 * @return {!proto.Antenna} returns this
 */
proto.Antenna.prototype.setState = function(value) {
  return jspb.Message.setProto3EnumField(this, 1, value);
};


/**
 * optional bool canTransmit = 2;
 * @return {boolean}
 */
proto.Antenna.prototype.getCantransmit = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 2, false));
};


/**
 * @param {boolean} value
 * @return {!proto.Antenna} returns this
 */
proto.Antenna.prototype.setCantransmit = function(value) {
  return jspb.Message.setProto3BooleanField(this, 2, value);
};


/**
 * optional bool allowPartial = 3;
 * @return {boolean}
 */
proto.Antenna.prototype.getAllowpartial = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 3, false));
};


/**
 * @param {boolean} value
 * @return {!proto.Antenna} returns this
 */
proto.Antenna.prototype.setAllowpartial = function(value) {
  return jspb.Message.setProto3BooleanField(this, 3, value);
};


/**
 * optional double power = 4;
 * @return {number}
 */
proto.Antenna.prototype.getPower = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 4, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Antenna} returns this
 */
proto.Antenna.prototype.setPower = function(value) {
  return jspb.Message.setProto3FloatField(this, 4, value);
};


/**
 * optional bool combinable = 5;
 * @return {boolean}
 */
proto.Antenna.prototype.getCombinable = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 5, false));
};


/**
 * @param {boolean} value
 * @return {!proto.Antenna} returns this
 */
proto.Antenna.prototype.setCombinable = function(value) {
  return jspb.Message.setProto3BooleanField(this, 5, value);
};


/**
 * optional double combinableExponent = 6;
 * @return {number}
 */
proto.Antenna.prototype.getCombinableexponent = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 6, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Antenna} returns this
 */
proto.Antenna.prototype.setCombinableexponent = function(value) {
  return jspb.Message.setProto3FloatField(this, 6, value);
};


/**
 * optional double packetInterval = 7;
 * @return {number}
 */
proto.Antenna.prototype.getPacketinterval = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 7, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Antenna} returns this
 */
proto.Antenna.prototype.setPacketinterval = function(value) {
  return jspb.Message.setProto3FloatField(this, 7, value);
};


/**
 * optional double packetSize = 8;
 * @return {number}
 */
proto.Antenna.prototype.getPacketsize = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 8, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Antenna} returns this
 */
proto.Antenna.prototype.setPacketsize = function(value) {
  return jspb.Message.setProto3FloatField(this, 8, value);
};


/**
 * optional double packetResourceCost = 9;
 * @return {number}
 */
proto.Antenna.prototype.getPacketresourcecost = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 9, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Antenna} returns this
 */
proto.Antenna.prototype.setPacketresourcecost = function(value) {
  return jspb.Message.setProto3FloatField(this, 9, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Resource.prototype.toObject = function(opt_includeInstance) {
  return proto.Resource.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Resource} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Resource.toObject = function(includeInstance, msg) {
  var f, obj = {
    name: jspb.Message.getFieldWithDefault(msg, 1, ""),
    capacity: jspb.Message.getFloatingPointFieldWithDefault(msg, 2, 0.0),
    amount: jspb.Message.getFloatingPointFieldWithDefault(msg, 3, 0.0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Resource}
 */
proto.Resource.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Resource;
  return proto.Resource.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Resource} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Resource}
 */
proto.Resource.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setCapacity(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setAmount(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Resource.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Resource.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Resource} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Resource.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getCapacity();
  if (f !== 0.0) {
    writer.writeDouble(
      2,
      f
    );
  }
  f = message.getAmount();
  if (f !== 0.0) {
    writer.writeDouble(
      3,
      f
    );
  }
};


/**
 * optional string name = 1;
 * @return {string}
 */
proto.Resource.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.Resource} returns this
 */
proto.Resource.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional double capacity = 2;
 * @return {number}
 */
proto.Resource.prototype.getCapacity = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 2, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Resource} returns this
 */
proto.Resource.prototype.setCapacity = function(value) {
  return jspb.Message.setProto3FloatField(this, 2, value);
};


/**
 * optional double amount = 3;
 * @return {number}
 */
proto.Resource.prototype.getAmount = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 3, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Resource} returns this
 */
proto.Resource.prototype.setAmount = function(value) {
  return jspb.Message.setProto3FloatField(this, 3, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.Resources.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Resources.prototype.toObject = function(opt_includeInstance) {
  return proto.Resources.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Resources} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Resources.toObject = function(includeInstance, msg) {
  var f, obj = {
    resourcesList: jspb.Message.toObjectList(msg.getResourcesList(),
    proto.Resource.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Resources}
 */
proto.Resources.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Resources;
  return proto.Resources.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Resources} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Resources}
 */
proto.Resources.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.Resource;
      reader.readMessage(value,proto.Resource.deserializeBinaryFromReader);
      msg.addResources(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Resources.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Resources.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Resources} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Resources.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getResourcesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.Resource.serializeBinaryToWriter
    );
  }
};


/**
 * repeated Resource resources = 1;
 * @return {!Array<!proto.Resource>}
 */
proto.Resources.prototype.getResourcesList = function() {
  return /** @type{!Array<!proto.Resource>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.Resource, 1));
};


/**
 * @param {!Array<!proto.Resource>} value
 * @return {!proto.Resources} returns this
*/
proto.Resources.prototype.setResourcesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.Resource=} opt_value
 * @param {number=} opt_index
 * @return {!proto.Resource}
 */
proto.Resources.prototype.addResources = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.Resource, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.Resources} returns this
 */
proto.Resources.prototype.clearResourcesList = function() {
  return this.setResourcesList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Command.prototype.toObject = function(opt_includeInstance) {
  return proto.Command.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Command} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Command.toObject = function(includeInstance, msg) {
  var f, obj = {
    requirespilot: jspb.Message.getBooleanFieldWithDefault(msg, 1, false),
    signalstrengthlevel: jspb.Message.getFieldWithDefault(msg, 2, 0),
    signalstrength: jspb.Message.getFloatingPointFieldWithDefault(msg, 3, 0.0),
    minimumcrew: jspb.Message.getFieldWithDefault(msg, 4, 0),
    vesselcontrolstate: jspb.Message.getFieldWithDefault(msg, 5, 0),
    modulecontrolstate: jspb.Message.getFieldWithDefault(msg, 6, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Command}
 */
proto.Command.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Command;
  return proto.Command.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Command} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Command}
 */
proto.Command.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setRequirespilot(value);
      break;
    case 2:
      var value = /** @type {!proto.Command.SignalStrengthLevel} */ (reader.readEnum());
      msg.setSignalstrengthlevel(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setSignalstrength(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setMinimumcrew(value);
      break;
    case 5:
      var value = /** @type {!proto.Command.VesselControlState} */ (reader.readEnum());
      msg.setVesselcontrolstate(value);
      break;
    case 6:
      var value = /** @type {!proto.Command.ModuleControlState} */ (reader.readEnum());
      msg.setModulecontrolstate(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Command.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Command.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Command} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Command.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getRequirespilot();
  if (f) {
    writer.writeBool(
      1,
      f
    );
  }
  f = message.getSignalstrengthlevel();
  if (f !== 0.0) {
    writer.writeEnum(
      2,
      f
    );
  }
  f = message.getSignalstrength();
  if (f !== 0.0) {
    writer.writeDouble(
      3,
      f
    );
  }
  f = message.getMinimumcrew();
  if (f !== 0) {
    writer.writeInt32(
      4,
      f
    );
  }
  f = message.getVesselcontrolstate();
  if (f !== 0.0) {
    writer.writeEnum(
      5,
      f
    );
  }
  f = message.getModulecontrolstate();
  if (f !== 0.0) {
    writer.writeEnum(
      6,
      f
    );
  }
};


/**
 * @enum {number}
 */
proto.Command.SignalStrengthLevel = {
  NONE: 0,
  RED: 1,
  ORANGE: 2,
  YELLOW: 3,
  GREEN: 4
};

/**
 * @enum {number}
 */
proto.Command.VesselControlState = {
  INVALID: 0,
  PROBENONE: 2,
  KERBALNONE: 4,
  PARTIAL: 8,
  PROBEPARTIAL: 10,
  KERBALPARTIAL: 12,
  FULL: 16,
  PROBEFULL: 18,
  KERBALFULL: 20
};

/**
 * @enum {number}
 */
proto.Command.ModuleControlState = {
  NOTENOUGHCREW: 0,
  NOTENOUGHRESOURCES: 1,
  PARTIALMANNED: 2,
  NOCONTROLPOINT: 3,
  TOURISTCREW: 4,
  PARTIALPROBE: 5,
  NOMINAL: 6
};

/**
 * optional bool requiresPilot = 1;
 * @return {boolean}
 */
proto.Command.prototype.getRequirespilot = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 1, false));
};


/**
 * @param {boolean} value
 * @return {!proto.Command} returns this
 */
proto.Command.prototype.setRequirespilot = function(value) {
  return jspb.Message.setProto3BooleanField(this, 1, value);
};


/**
 * optional SignalStrengthLevel signalStrengthLevel = 2;
 * @return {!proto.Command.SignalStrengthLevel}
 */
proto.Command.prototype.getSignalstrengthlevel = function() {
  return /** @type {!proto.Command.SignalStrengthLevel} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {!proto.Command.SignalStrengthLevel} value
 * @return {!proto.Command} returns this
 */
proto.Command.prototype.setSignalstrengthlevel = function(value) {
  return jspb.Message.setProto3EnumField(this, 2, value);
};


/**
 * optional double signalStrength = 3;
 * @return {number}
 */
proto.Command.prototype.getSignalstrength = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 3, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Command} returns this
 */
proto.Command.prototype.setSignalstrength = function(value) {
  return jspb.Message.setProto3FloatField(this, 3, value);
};


/**
 * optional int32 minimumCrew = 4;
 * @return {number}
 */
proto.Command.prototype.getMinimumcrew = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.Command} returns this
 */
proto.Command.prototype.setMinimumcrew = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional VesselControlState vesselControlState = 5;
 * @return {!proto.Command.VesselControlState}
 */
proto.Command.prototype.getVesselcontrolstate = function() {
  return /** @type {!proto.Command.VesselControlState} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {!proto.Command.VesselControlState} value
 * @return {!proto.Command} returns this
 */
proto.Command.prototype.setVesselcontrolstate = function(value) {
  return jspb.Message.setProto3EnumField(this, 5, value);
};


/**
 * optional ModuleControlState moduleControlState = 6;
 * @return {!proto.Command.ModuleControlState}
 */
proto.Command.prototype.getModulecontrolstate = function() {
  return /** @type {!proto.Command.ModuleControlState} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/**
 * @param {!proto.Command.ModuleControlState} value
 * @return {!proto.Command} returns this
 */
proto.Command.prototype.setModulecontrolstate = function(value) {
  return jspb.Message.setProto3EnumField(this, 6, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Ablator.prototype.toObject = function(opt_includeInstance) {
  return proto.Ablator.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Ablator} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Ablator.toObject = function(includeInstance, msg) {
  var f, obj = {
    loss: jspb.Message.getFloatingPointFieldWithDefault(msg, 1, 0.0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Ablator}
 */
proto.Ablator.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Ablator;
  return proto.Ablator.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Ablator} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Ablator}
 */
proto.Ablator.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setLoss(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Ablator.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Ablator.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Ablator} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Ablator.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getLoss();
  if (f !== 0.0) {
    writer.writeDouble(
      1,
      f
    );
  }
};


/**
 * optional double loss = 1;
 * @return {number}
 */
proto.Ablator.prototype.getLoss = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 1, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Ablator} returns this
 */
proto.Ablator.prototype.setLoss = function(value) {
  return jspb.Message.setProto3FloatField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Generator.prototype.toObject = function(opt_includeInstance) {
  return proto.Generator.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Generator} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Generator.toObject = function(includeInstance, msg) {
  var f, obj = {
    isactive: jspb.Message.getBooleanFieldWithDefault(msg, 1, false),
    rate: jspb.Message.getFloatingPointFieldWithDefault(msg, 2, 0.0),
    efficiency: jspb.Message.getFloatingPointFieldWithDefault(msg, 3, 0.0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Generator}
 */
proto.Generator.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Generator;
  return proto.Generator.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Generator} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Generator}
 */
proto.Generator.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setIsactive(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setRate(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setEfficiency(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Generator.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Generator.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Generator} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Generator.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getIsactive();
  if (f) {
    writer.writeBool(
      1,
      f
    );
  }
  f = message.getRate();
  if (f !== 0.0) {
    writer.writeDouble(
      2,
      f
    );
  }
  f = message.getEfficiency();
  if (f !== 0.0) {
    writer.writeDouble(
      3,
      f
    );
  }
};


/**
 * optional bool isActive = 1;
 * @return {boolean}
 */
proto.Generator.prototype.getIsactive = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 1, false));
};


/**
 * @param {boolean} value
 * @return {!proto.Generator} returns this
 */
proto.Generator.prototype.setIsactive = function(value) {
  return jspb.Message.setProto3BooleanField(this, 1, value);
};


/**
 * optional double rate = 2;
 * @return {number}
 */
proto.Generator.prototype.getRate = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 2, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Generator} returns this
 */
proto.Generator.prototype.setRate = function(value) {
  return jspb.Message.setProto3FloatField(this, 2, value);
};


/**
 * optional double efficiency = 3;
 * @return {number}
 */
proto.Generator.prototype.getEfficiency = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 3, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Generator} returns this
 */
proto.Generator.prototype.setEfficiency = function(value) {
  return jspb.Message.setProto3FloatField(this, 3, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.Part.repeatedFields_ = [37];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Part.prototype.toObject = function(opt_includeInstance) {
  return proto.Part.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Part} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Part.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, 0),
    name: jspb.Message.getFieldWithDefault(msg, 2, ""),
    title: jspb.Message.getFieldWithDefault(msg, 3, ""),
    tag: jspb.Message.getFieldWithDefault(msg, 4, ""),
    stage: jspb.Message.getFieldWithDefault(msg, 5, 0),
    mass: jspb.Message.getFloatingPointFieldWithDefault(msg, 6, 0.0),
    drymass: jspb.Message.getFloatingPointFieldWithDefault(msg, 7, 0.0),
    shielded: jspb.Message.getBooleanFieldWithDefault(msg, 8, false),
    temperature: jspb.Message.getFloatingPointFieldWithDefault(msg, 9, 0.0),
    skintemperature: jspb.Message.getFloatingPointFieldWithDefault(msg, 10, 0.0),
    maxtemperature: jspb.Message.getFloatingPointFieldWithDefault(msg, 11, 0.0),
    maxskintemperature: jspb.Message.getFloatingPointFieldWithDefault(msg, 12, 0.0),
    resources: (f = msg.getResources()) && proto.Resources.toObject(includeInstance, f),
    antenna: (f = msg.getAntenna()) && proto.Antenna.toObject(includeInstance, f),
    cargobay: (f = msg.getCargobay()) && proto.CargoBay.toObject(includeInstance, f),
    controlsurface: (f = msg.getControlsurface()) && proto.ControlSurface.toObject(includeInstance, f),
    decoupler: (f = msg.getDecoupler()) && proto.Decoupler.toObject(includeInstance, f),
    dockingport: (f = msg.getDockingport()) && proto.DockingPort.toObject(includeInstance, f),
    engine: (f = msg.getEngine()) && proto.Engine.toObject(includeInstance, f),
    fairing: (f = msg.getFairing()) && proto.Fairing.toObject(includeInstance, f),
    intake: (f = msg.getIntake()) && proto.Intake.toObject(includeInstance, f),
    leg: (f = msg.getLeg()) && proto.Leg.toObject(includeInstance, f),
    light: (f = msg.getLight()) && proto.Light.toObject(includeInstance, f),
    parachute: (f = msg.getParachute()) && proto.Parachute.toObject(includeInstance, f),
    radiator: (f = msg.getRadiator()) && proto.Radiator.toObject(includeInstance, f),
    rcs: (f = msg.getRcs()) && proto.RCS.toObject(includeInstance, f),
    reactionwheel: (f = msg.getReactionwheel()) && proto.ReactionWheel.toObject(includeInstance, f),
    resourceconverter: (f = msg.getResourceconverter()) && proto.ResourceConverter.toObject(includeInstance, f),
    resourceharvester: (f = msg.getResourceharvester()) && proto.ResourceHarvester.toObject(includeInstance, f),
    sensor: (f = msg.getSensor()) && proto.Sensor.toObject(includeInstance, f),
    solarpanel: (f = msg.getSolarpanel()) && proto.SolarPanel.toObject(includeInstance, f),
    wheel: (f = msg.getWheel()) && proto.Wheel.toObject(includeInstance, f),
    command: (f = msg.getCommand()) && proto.Command.toObject(includeInstance, f),
    ablator: (f = msg.getAblator()) && proto.Ablator.toObject(includeInstance, f),
    generator: (f = msg.getGenerator()) && proto.Generator.toObject(includeInstance, f),
    typesList: (f = jspb.Message.getRepeatedField(msg, 37)) == null ? undefined : f
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Part}
 */
proto.Part.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Part;
  return proto.Part.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Part} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Part}
 */
proto.Part.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setTitle(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setTag(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setStage(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setMass(value);
      break;
    case 7:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setDrymass(value);
      break;
    case 8:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setShielded(value);
      break;
    case 9:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setTemperature(value);
      break;
    case 10:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setSkintemperature(value);
      break;
    case 11:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setMaxtemperature(value);
      break;
    case 12:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setMaxskintemperature(value);
      break;
    case 13:
      var value = new proto.Resources;
      reader.readMessage(value,proto.Resources.deserializeBinaryFromReader);
      msg.setResources(value);
      break;
    case 14:
      var value = new proto.Antenna;
      reader.readMessage(value,proto.Antenna.deserializeBinaryFromReader);
      msg.setAntenna(value);
      break;
    case 15:
      var value = new proto.CargoBay;
      reader.readMessage(value,proto.CargoBay.deserializeBinaryFromReader);
      msg.setCargobay(value);
      break;
    case 16:
      var value = new proto.ControlSurface;
      reader.readMessage(value,proto.ControlSurface.deserializeBinaryFromReader);
      msg.setControlsurface(value);
      break;
    case 17:
      var value = new proto.Decoupler;
      reader.readMessage(value,proto.Decoupler.deserializeBinaryFromReader);
      msg.setDecoupler(value);
      break;
    case 18:
      var value = new proto.DockingPort;
      reader.readMessage(value,proto.DockingPort.deserializeBinaryFromReader);
      msg.setDockingport(value);
      break;
    case 19:
      var value = new proto.Engine;
      reader.readMessage(value,proto.Engine.deserializeBinaryFromReader);
      msg.setEngine(value);
      break;
    case 20:
      var value = new proto.Fairing;
      reader.readMessage(value,proto.Fairing.deserializeBinaryFromReader);
      msg.setFairing(value);
      break;
    case 21:
      var value = new proto.Intake;
      reader.readMessage(value,proto.Intake.deserializeBinaryFromReader);
      msg.setIntake(value);
      break;
    case 22:
      var value = new proto.Leg;
      reader.readMessage(value,proto.Leg.deserializeBinaryFromReader);
      msg.setLeg(value);
      break;
    case 24:
      var value = new proto.Light;
      reader.readMessage(value,proto.Light.deserializeBinaryFromReader);
      msg.setLight(value);
      break;
    case 25:
      var value = new proto.Parachute;
      reader.readMessage(value,proto.Parachute.deserializeBinaryFromReader);
      msg.setParachute(value);
      break;
    case 26:
      var value = new proto.Radiator;
      reader.readMessage(value,proto.Radiator.deserializeBinaryFromReader);
      msg.setRadiator(value);
      break;
    case 27:
      var value = new proto.RCS;
      reader.readMessage(value,proto.RCS.deserializeBinaryFromReader);
      msg.setRcs(value);
      break;
    case 28:
      var value = new proto.ReactionWheel;
      reader.readMessage(value,proto.ReactionWheel.deserializeBinaryFromReader);
      msg.setReactionwheel(value);
      break;
    case 29:
      var value = new proto.ResourceConverter;
      reader.readMessage(value,proto.ResourceConverter.deserializeBinaryFromReader);
      msg.setResourceconverter(value);
      break;
    case 30:
      var value = new proto.ResourceHarvester;
      reader.readMessage(value,proto.ResourceHarvester.deserializeBinaryFromReader);
      msg.setResourceharvester(value);
      break;
    case 31:
      var value = new proto.Sensor;
      reader.readMessage(value,proto.Sensor.deserializeBinaryFromReader);
      msg.setSensor(value);
      break;
    case 32:
      var value = new proto.SolarPanel;
      reader.readMessage(value,proto.SolarPanel.deserializeBinaryFromReader);
      msg.setSolarpanel(value);
      break;
    case 33:
      var value = new proto.Wheel;
      reader.readMessage(value,proto.Wheel.deserializeBinaryFromReader);
      msg.setWheel(value);
      break;
    case 34:
      var value = new proto.Command;
      reader.readMessage(value,proto.Command.deserializeBinaryFromReader);
      msg.setCommand(value);
      break;
    case 35:
      var value = new proto.Ablator;
      reader.readMessage(value,proto.Ablator.deserializeBinaryFromReader);
      msg.setAblator(value);
      break;
    case 36:
      var value = new proto.Generator;
      reader.readMessage(value,proto.Generator.deserializeBinaryFromReader);
      msg.setGenerator(value);
      break;
    case 37:
      var values = /** @type {!Array<!proto.Part.PartType>} */ (reader.isDelimited() ? reader.readPackedEnum() : [reader.readEnum()]);
      for (var i = 0; i < values.length; i++) {
        msg.addTypes(values[i]);
      }
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Part.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Part.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Part} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Part.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f !== 0) {
    writer.writeInt64(
      1,
      f
    );
  }
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getTitle();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getTag();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getStage();
  if (f !== 0) {
    writer.writeInt32(
      5,
      f
    );
  }
  f = message.getMass();
  if (f !== 0.0) {
    writer.writeDouble(
      6,
      f
    );
  }
  f = message.getDrymass();
  if (f !== 0.0) {
    writer.writeDouble(
      7,
      f
    );
  }
  f = message.getShielded();
  if (f) {
    writer.writeBool(
      8,
      f
    );
  }
  f = message.getTemperature();
  if (f !== 0.0) {
    writer.writeDouble(
      9,
      f
    );
  }
  f = message.getSkintemperature();
  if (f !== 0.0) {
    writer.writeDouble(
      10,
      f
    );
  }
  f = message.getMaxtemperature();
  if (f !== 0.0) {
    writer.writeDouble(
      11,
      f
    );
  }
  f = message.getMaxskintemperature();
  if (f !== 0.0) {
    writer.writeDouble(
      12,
      f
    );
  }
  f = message.getResources();
  if (f != null) {
    writer.writeMessage(
      13,
      f,
      proto.Resources.serializeBinaryToWriter
    );
  }
  f = message.getAntenna();
  if (f != null) {
    writer.writeMessage(
      14,
      f,
      proto.Antenna.serializeBinaryToWriter
    );
  }
  f = message.getCargobay();
  if (f != null) {
    writer.writeMessage(
      15,
      f,
      proto.CargoBay.serializeBinaryToWriter
    );
  }
  f = message.getControlsurface();
  if (f != null) {
    writer.writeMessage(
      16,
      f,
      proto.ControlSurface.serializeBinaryToWriter
    );
  }
  f = message.getDecoupler();
  if (f != null) {
    writer.writeMessage(
      17,
      f,
      proto.Decoupler.serializeBinaryToWriter
    );
  }
  f = message.getDockingport();
  if (f != null) {
    writer.writeMessage(
      18,
      f,
      proto.DockingPort.serializeBinaryToWriter
    );
  }
  f = message.getEngine();
  if (f != null) {
    writer.writeMessage(
      19,
      f,
      proto.Engine.serializeBinaryToWriter
    );
  }
  f = message.getFairing();
  if (f != null) {
    writer.writeMessage(
      20,
      f,
      proto.Fairing.serializeBinaryToWriter
    );
  }
  f = message.getIntake();
  if (f != null) {
    writer.writeMessage(
      21,
      f,
      proto.Intake.serializeBinaryToWriter
    );
  }
  f = message.getLeg();
  if (f != null) {
    writer.writeMessage(
      22,
      f,
      proto.Leg.serializeBinaryToWriter
    );
  }
  f = message.getLight();
  if (f != null) {
    writer.writeMessage(
      24,
      f,
      proto.Light.serializeBinaryToWriter
    );
  }
  f = message.getParachute();
  if (f != null) {
    writer.writeMessage(
      25,
      f,
      proto.Parachute.serializeBinaryToWriter
    );
  }
  f = message.getRadiator();
  if (f != null) {
    writer.writeMessage(
      26,
      f,
      proto.Radiator.serializeBinaryToWriter
    );
  }
  f = message.getRcs();
  if (f != null) {
    writer.writeMessage(
      27,
      f,
      proto.RCS.serializeBinaryToWriter
    );
  }
  f = message.getReactionwheel();
  if (f != null) {
    writer.writeMessage(
      28,
      f,
      proto.ReactionWheel.serializeBinaryToWriter
    );
  }
  f = message.getResourceconverter();
  if (f != null) {
    writer.writeMessage(
      29,
      f,
      proto.ResourceConverter.serializeBinaryToWriter
    );
  }
  f = message.getResourceharvester();
  if (f != null) {
    writer.writeMessage(
      30,
      f,
      proto.ResourceHarvester.serializeBinaryToWriter
    );
  }
  f = message.getSensor();
  if (f != null) {
    writer.writeMessage(
      31,
      f,
      proto.Sensor.serializeBinaryToWriter
    );
  }
  f = message.getSolarpanel();
  if (f != null) {
    writer.writeMessage(
      32,
      f,
      proto.SolarPanel.serializeBinaryToWriter
    );
  }
  f = message.getWheel();
  if (f != null) {
    writer.writeMessage(
      33,
      f,
      proto.Wheel.serializeBinaryToWriter
    );
  }
  f = message.getCommand();
  if (f != null) {
    writer.writeMessage(
      34,
      f,
      proto.Command.serializeBinaryToWriter
    );
  }
  f = message.getAblator();
  if (f != null) {
    writer.writeMessage(
      35,
      f,
      proto.Ablator.serializeBinaryToWriter
    );
  }
  f = message.getGenerator();
  if (f != null) {
    writer.writeMessage(
      36,
      f,
      proto.Generator.serializeBinaryToWriter
    );
  }
  f = message.getTypesList();
  if (f.length > 0) {
    writer.writePackedEnum(
      37,
      f
    );
  }
};


/**
 * @enum {number}
 */
proto.Part.PartType = {
  UNKNOWN: 0,
  HASRESOURCE: 1,
  ANTENNA: 2,
  CARGOBAY: 3,
  CONTROLSURFACE: 4,
  DECOUPLER: 5,
  DOCKINGPORT: 6,
  ENGINE: 7,
  FAIRING: 8,
  INTAKE: 9,
  LEG: 10,
  LAUNCHCLAMP: 11,
  LIGHT: 12,
  PARACHUTE: 13,
  RADIATOR: 14,
  RCS: 15,
  REACTIONWHEEL: 16,
  RESOURCECONVERTER: 17,
  RESOURCEHARVESTER: 18,
  SENSOR: 19,
  SOLARPANEL: 20,
  WHEEL: 21,
  COMMAND: 22,
  ABLATOR: 23,
  GENERATOR: 24
};

/**
 * optional int64 id = 1;
 * @return {number}
 */
proto.Part.prototype.getId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.Part} returns this
 */
proto.Part.prototype.setId = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string name = 2;
 * @return {string}
 */
proto.Part.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.Part} returns this
 */
proto.Part.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string title = 3;
 * @return {string}
 */
proto.Part.prototype.getTitle = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.Part} returns this
 */
proto.Part.prototype.setTitle = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string tag = 4;
 * @return {string}
 */
proto.Part.prototype.getTag = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.Part} returns this
 */
proto.Part.prototype.setTag = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional int32 stage = 5;
 * @return {number}
 */
proto.Part.prototype.getStage = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.Part} returns this
 */
proto.Part.prototype.setStage = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};


/**
 * optional double mass = 6;
 * @return {number}
 */
proto.Part.prototype.getMass = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 6, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Part} returns this
 */
proto.Part.prototype.setMass = function(value) {
  return jspb.Message.setProto3FloatField(this, 6, value);
};


/**
 * optional double dryMass = 7;
 * @return {number}
 */
proto.Part.prototype.getDrymass = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 7, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Part} returns this
 */
proto.Part.prototype.setDrymass = function(value) {
  return jspb.Message.setProto3FloatField(this, 7, value);
};


/**
 * optional bool shielded = 8;
 * @return {boolean}
 */
proto.Part.prototype.getShielded = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 8, false));
};


/**
 * @param {boolean} value
 * @return {!proto.Part} returns this
 */
proto.Part.prototype.setShielded = function(value) {
  return jspb.Message.setProto3BooleanField(this, 8, value);
};


/**
 * optional double temperature = 9;
 * @return {number}
 */
proto.Part.prototype.getTemperature = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 9, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Part} returns this
 */
proto.Part.prototype.setTemperature = function(value) {
  return jspb.Message.setProto3FloatField(this, 9, value);
};


/**
 * optional double skinTemperature = 10;
 * @return {number}
 */
proto.Part.prototype.getSkintemperature = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 10, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Part} returns this
 */
proto.Part.prototype.setSkintemperature = function(value) {
  return jspb.Message.setProto3FloatField(this, 10, value);
};


/**
 * optional double maxTemperature = 11;
 * @return {number}
 */
proto.Part.prototype.getMaxtemperature = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 11, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Part} returns this
 */
proto.Part.prototype.setMaxtemperature = function(value) {
  return jspb.Message.setProto3FloatField(this, 11, value);
};


/**
 * optional double maxSkinTemperature = 12;
 * @return {number}
 */
proto.Part.prototype.getMaxskintemperature = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 12, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Part} returns this
 */
proto.Part.prototype.setMaxskintemperature = function(value) {
  return jspb.Message.setProto3FloatField(this, 12, value);
};


/**
 * optional Resources resources = 13;
 * @return {?proto.Resources}
 */
proto.Part.prototype.getResources = function() {
  return /** @type{?proto.Resources} */ (
    jspb.Message.getWrapperField(this, proto.Resources, 13));
};


/**
 * @param {?proto.Resources|undefined} value
 * @return {!proto.Part} returns this
*/
proto.Part.prototype.setResources = function(value) {
  return jspb.Message.setWrapperField(this, 13, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.Part} returns this
 */
proto.Part.prototype.clearResources = function() {
  return this.setResources(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Part.prototype.hasResources = function() {
  return jspb.Message.getField(this, 13) != null;
};


/**
 * optional Antenna antenna = 14;
 * @return {?proto.Antenna}
 */
proto.Part.prototype.getAntenna = function() {
  return /** @type{?proto.Antenna} */ (
    jspb.Message.getWrapperField(this, proto.Antenna, 14));
};


/**
 * @param {?proto.Antenna|undefined} value
 * @return {!proto.Part} returns this
*/
proto.Part.prototype.setAntenna = function(value) {
  return jspb.Message.setWrapperField(this, 14, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.Part} returns this
 */
proto.Part.prototype.clearAntenna = function() {
  return this.setAntenna(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Part.prototype.hasAntenna = function() {
  return jspb.Message.getField(this, 14) != null;
};


/**
 * optional CargoBay cargoBay = 15;
 * @return {?proto.CargoBay}
 */
proto.Part.prototype.getCargobay = function() {
  return /** @type{?proto.CargoBay} */ (
    jspb.Message.getWrapperField(this, proto.CargoBay, 15));
};


/**
 * @param {?proto.CargoBay|undefined} value
 * @return {!proto.Part} returns this
*/
proto.Part.prototype.setCargobay = function(value) {
  return jspb.Message.setWrapperField(this, 15, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.Part} returns this
 */
proto.Part.prototype.clearCargobay = function() {
  return this.setCargobay(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Part.prototype.hasCargobay = function() {
  return jspb.Message.getField(this, 15) != null;
};


/**
 * optional ControlSurface controlSurface = 16;
 * @return {?proto.ControlSurface}
 */
proto.Part.prototype.getControlsurface = function() {
  return /** @type{?proto.ControlSurface} */ (
    jspb.Message.getWrapperField(this, proto.ControlSurface, 16));
};


/**
 * @param {?proto.ControlSurface|undefined} value
 * @return {!proto.Part} returns this
*/
proto.Part.prototype.setControlsurface = function(value) {
  return jspb.Message.setWrapperField(this, 16, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.Part} returns this
 */
proto.Part.prototype.clearControlsurface = function() {
  return this.setControlsurface(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Part.prototype.hasControlsurface = function() {
  return jspb.Message.getField(this, 16) != null;
};


/**
 * optional Decoupler decoupler = 17;
 * @return {?proto.Decoupler}
 */
proto.Part.prototype.getDecoupler = function() {
  return /** @type{?proto.Decoupler} */ (
    jspb.Message.getWrapperField(this, proto.Decoupler, 17));
};


/**
 * @param {?proto.Decoupler|undefined} value
 * @return {!proto.Part} returns this
*/
proto.Part.prototype.setDecoupler = function(value) {
  return jspb.Message.setWrapperField(this, 17, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.Part} returns this
 */
proto.Part.prototype.clearDecoupler = function() {
  return this.setDecoupler(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Part.prototype.hasDecoupler = function() {
  return jspb.Message.getField(this, 17) != null;
};


/**
 * optional DockingPort dockingPort = 18;
 * @return {?proto.DockingPort}
 */
proto.Part.prototype.getDockingport = function() {
  return /** @type{?proto.DockingPort} */ (
    jspb.Message.getWrapperField(this, proto.DockingPort, 18));
};


/**
 * @param {?proto.DockingPort|undefined} value
 * @return {!proto.Part} returns this
*/
proto.Part.prototype.setDockingport = function(value) {
  return jspb.Message.setWrapperField(this, 18, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.Part} returns this
 */
proto.Part.prototype.clearDockingport = function() {
  return this.setDockingport(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Part.prototype.hasDockingport = function() {
  return jspb.Message.getField(this, 18) != null;
};


/**
 * optional Engine engine = 19;
 * @return {?proto.Engine}
 */
proto.Part.prototype.getEngine = function() {
  return /** @type{?proto.Engine} */ (
    jspb.Message.getWrapperField(this, proto.Engine, 19));
};


/**
 * @param {?proto.Engine|undefined} value
 * @return {!proto.Part} returns this
*/
proto.Part.prototype.setEngine = function(value) {
  return jspb.Message.setWrapperField(this, 19, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.Part} returns this
 */
proto.Part.prototype.clearEngine = function() {
  return this.setEngine(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Part.prototype.hasEngine = function() {
  return jspb.Message.getField(this, 19) != null;
};


/**
 * optional Fairing fairing = 20;
 * @return {?proto.Fairing}
 */
proto.Part.prototype.getFairing = function() {
  return /** @type{?proto.Fairing} */ (
    jspb.Message.getWrapperField(this, proto.Fairing, 20));
};


/**
 * @param {?proto.Fairing|undefined} value
 * @return {!proto.Part} returns this
*/
proto.Part.prototype.setFairing = function(value) {
  return jspb.Message.setWrapperField(this, 20, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.Part} returns this
 */
proto.Part.prototype.clearFairing = function() {
  return this.setFairing(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Part.prototype.hasFairing = function() {
  return jspb.Message.getField(this, 20) != null;
};


/**
 * optional Intake intake = 21;
 * @return {?proto.Intake}
 */
proto.Part.prototype.getIntake = function() {
  return /** @type{?proto.Intake} */ (
    jspb.Message.getWrapperField(this, proto.Intake, 21));
};


/**
 * @param {?proto.Intake|undefined} value
 * @return {!proto.Part} returns this
*/
proto.Part.prototype.setIntake = function(value) {
  return jspb.Message.setWrapperField(this, 21, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.Part} returns this
 */
proto.Part.prototype.clearIntake = function() {
  return this.setIntake(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Part.prototype.hasIntake = function() {
  return jspb.Message.getField(this, 21) != null;
};


/**
 * optional Leg leg = 22;
 * @return {?proto.Leg}
 */
proto.Part.prototype.getLeg = function() {
  return /** @type{?proto.Leg} */ (
    jspb.Message.getWrapperField(this, proto.Leg, 22));
};


/**
 * @param {?proto.Leg|undefined} value
 * @return {!proto.Part} returns this
*/
proto.Part.prototype.setLeg = function(value) {
  return jspb.Message.setWrapperField(this, 22, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.Part} returns this
 */
proto.Part.prototype.clearLeg = function() {
  return this.setLeg(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Part.prototype.hasLeg = function() {
  return jspb.Message.getField(this, 22) != null;
};


/**
 * optional Light light = 24;
 * @return {?proto.Light}
 */
proto.Part.prototype.getLight = function() {
  return /** @type{?proto.Light} */ (
    jspb.Message.getWrapperField(this, proto.Light, 24));
};


/**
 * @param {?proto.Light|undefined} value
 * @return {!proto.Part} returns this
*/
proto.Part.prototype.setLight = function(value) {
  return jspb.Message.setWrapperField(this, 24, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.Part} returns this
 */
proto.Part.prototype.clearLight = function() {
  return this.setLight(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Part.prototype.hasLight = function() {
  return jspb.Message.getField(this, 24) != null;
};


/**
 * optional Parachute parachute = 25;
 * @return {?proto.Parachute}
 */
proto.Part.prototype.getParachute = function() {
  return /** @type{?proto.Parachute} */ (
    jspb.Message.getWrapperField(this, proto.Parachute, 25));
};


/**
 * @param {?proto.Parachute|undefined} value
 * @return {!proto.Part} returns this
*/
proto.Part.prototype.setParachute = function(value) {
  return jspb.Message.setWrapperField(this, 25, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.Part} returns this
 */
proto.Part.prototype.clearParachute = function() {
  return this.setParachute(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Part.prototype.hasParachute = function() {
  return jspb.Message.getField(this, 25) != null;
};


/**
 * optional Radiator radiator = 26;
 * @return {?proto.Radiator}
 */
proto.Part.prototype.getRadiator = function() {
  return /** @type{?proto.Radiator} */ (
    jspb.Message.getWrapperField(this, proto.Radiator, 26));
};


/**
 * @param {?proto.Radiator|undefined} value
 * @return {!proto.Part} returns this
*/
proto.Part.prototype.setRadiator = function(value) {
  return jspb.Message.setWrapperField(this, 26, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.Part} returns this
 */
proto.Part.prototype.clearRadiator = function() {
  return this.setRadiator(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Part.prototype.hasRadiator = function() {
  return jspb.Message.getField(this, 26) != null;
};


/**
 * optional RCS rcs = 27;
 * @return {?proto.RCS}
 */
proto.Part.prototype.getRcs = function() {
  return /** @type{?proto.RCS} */ (
    jspb.Message.getWrapperField(this, proto.RCS, 27));
};


/**
 * @param {?proto.RCS|undefined} value
 * @return {!proto.Part} returns this
*/
proto.Part.prototype.setRcs = function(value) {
  return jspb.Message.setWrapperField(this, 27, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.Part} returns this
 */
proto.Part.prototype.clearRcs = function() {
  return this.setRcs(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Part.prototype.hasRcs = function() {
  return jspb.Message.getField(this, 27) != null;
};


/**
 * optional ReactionWheel reactionWheel = 28;
 * @return {?proto.ReactionWheel}
 */
proto.Part.prototype.getReactionwheel = function() {
  return /** @type{?proto.ReactionWheel} */ (
    jspb.Message.getWrapperField(this, proto.ReactionWheel, 28));
};


/**
 * @param {?proto.ReactionWheel|undefined} value
 * @return {!proto.Part} returns this
*/
proto.Part.prototype.setReactionwheel = function(value) {
  return jspb.Message.setWrapperField(this, 28, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.Part} returns this
 */
proto.Part.prototype.clearReactionwheel = function() {
  return this.setReactionwheel(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Part.prototype.hasReactionwheel = function() {
  return jspb.Message.getField(this, 28) != null;
};


/**
 * optional ResourceConverter resourceConverter = 29;
 * @return {?proto.ResourceConverter}
 */
proto.Part.prototype.getResourceconverter = function() {
  return /** @type{?proto.ResourceConverter} */ (
    jspb.Message.getWrapperField(this, proto.ResourceConverter, 29));
};


/**
 * @param {?proto.ResourceConverter|undefined} value
 * @return {!proto.Part} returns this
*/
proto.Part.prototype.setResourceconverter = function(value) {
  return jspb.Message.setWrapperField(this, 29, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.Part} returns this
 */
proto.Part.prototype.clearResourceconverter = function() {
  return this.setResourceconverter(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Part.prototype.hasResourceconverter = function() {
  return jspb.Message.getField(this, 29) != null;
};


/**
 * optional ResourceHarvester resourceHarvester = 30;
 * @return {?proto.ResourceHarvester}
 */
proto.Part.prototype.getResourceharvester = function() {
  return /** @type{?proto.ResourceHarvester} */ (
    jspb.Message.getWrapperField(this, proto.ResourceHarvester, 30));
};


/**
 * @param {?proto.ResourceHarvester|undefined} value
 * @return {!proto.Part} returns this
*/
proto.Part.prototype.setResourceharvester = function(value) {
  return jspb.Message.setWrapperField(this, 30, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.Part} returns this
 */
proto.Part.prototype.clearResourceharvester = function() {
  return this.setResourceharvester(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Part.prototype.hasResourceharvester = function() {
  return jspb.Message.getField(this, 30) != null;
};


/**
 * optional Sensor sensor = 31;
 * @return {?proto.Sensor}
 */
proto.Part.prototype.getSensor = function() {
  return /** @type{?proto.Sensor} */ (
    jspb.Message.getWrapperField(this, proto.Sensor, 31));
};


/**
 * @param {?proto.Sensor|undefined} value
 * @return {!proto.Part} returns this
*/
proto.Part.prototype.setSensor = function(value) {
  return jspb.Message.setWrapperField(this, 31, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.Part} returns this
 */
proto.Part.prototype.clearSensor = function() {
  return this.setSensor(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Part.prototype.hasSensor = function() {
  return jspb.Message.getField(this, 31) != null;
};


/**
 * optional SolarPanel solarPanel = 32;
 * @return {?proto.SolarPanel}
 */
proto.Part.prototype.getSolarpanel = function() {
  return /** @type{?proto.SolarPanel} */ (
    jspb.Message.getWrapperField(this, proto.SolarPanel, 32));
};


/**
 * @param {?proto.SolarPanel|undefined} value
 * @return {!proto.Part} returns this
*/
proto.Part.prototype.setSolarpanel = function(value) {
  return jspb.Message.setWrapperField(this, 32, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.Part} returns this
 */
proto.Part.prototype.clearSolarpanel = function() {
  return this.setSolarpanel(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Part.prototype.hasSolarpanel = function() {
  return jspb.Message.getField(this, 32) != null;
};


/**
 * optional Wheel wheel = 33;
 * @return {?proto.Wheel}
 */
proto.Part.prototype.getWheel = function() {
  return /** @type{?proto.Wheel} */ (
    jspb.Message.getWrapperField(this, proto.Wheel, 33));
};


/**
 * @param {?proto.Wheel|undefined} value
 * @return {!proto.Part} returns this
*/
proto.Part.prototype.setWheel = function(value) {
  return jspb.Message.setWrapperField(this, 33, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.Part} returns this
 */
proto.Part.prototype.clearWheel = function() {
  return this.setWheel(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Part.prototype.hasWheel = function() {
  return jspb.Message.getField(this, 33) != null;
};


/**
 * optional Command command = 34;
 * @return {?proto.Command}
 */
proto.Part.prototype.getCommand = function() {
  return /** @type{?proto.Command} */ (
    jspb.Message.getWrapperField(this, proto.Command, 34));
};


/**
 * @param {?proto.Command|undefined} value
 * @return {!proto.Part} returns this
*/
proto.Part.prototype.setCommand = function(value) {
  return jspb.Message.setWrapperField(this, 34, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.Part} returns this
 */
proto.Part.prototype.clearCommand = function() {
  return this.setCommand(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Part.prototype.hasCommand = function() {
  return jspb.Message.getField(this, 34) != null;
};


/**
 * optional Ablator ablator = 35;
 * @return {?proto.Ablator}
 */
proto.Part.prototype.getAblator = function() {
  return /** @type{?proto.Ablator} */ (
    jspb.Message.getWrapperField(this, proto.Ablator, 35));
};


/**
 * @param {?proto.Ablator|undefined} value
 * @return {!proto.Part} returns this
*/
proto.Part.prototype.setAblator = function(value) {
  return jspb.Message.setWrapperField(this, 35, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.Part} returns this
 */
proto.Part.prototype.clearAblator = function() {
  return this.setAblator(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Part.prototype.hasAblator = function() {
  return jspb.Message.getField(this, 35) != null;
};


/**
 * optional Generator generator = 36;
 * @return {?proto.Generator}
 */
proto.Part.prototype.getGenerator = function() {
  return /** @type{?proto.Generator} */ (
    jspb.Message.getWrapperField(this, proto.Generator, 36));
};


/**
 * @param {?proto.Generator|undefined} value
 * @return {!proto.Part} returns this
*/
proto.Part.prototype.setGenerator = function(value) {
  return jspb.Message.setWrapperField(this, 36, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.Part} returns this
 */
proto.Part.prototype.clearGenerator = function() {
  return this.setGenerator(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Part.prototype.hasGenerator = function() {
  return jspb.Message.getField(this, 36) != null;
};


/**
 * repeated PartType types = 37;
 * @return {!Array<!proto.Part.PartType>}
 */
proto.Part.prototype.getTypesList = function() {
  return /** @type {!Array<!proto.Part.PartType>} */ (jspb.Message.getRepeatedField(this, 37));
};


/**
 * @param {!Array<!proto.Part.PartType>} value
 * @return {!proto.Part} returns this
 */
proto.Part.prototype.setTypesList = function(value) {
  return jspb.Message.setField(this, 37, value || []);
};


/**
 * @param {!proto.Part.PartType} value
 * @param {number=} opt_index
 * @return {!proto.Part} returns this
 */
proto.Part.prototype.addTypes = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 37, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.Part} returns this
 */
proto.Part.prototype.clearTypesList = function() {
  return this.setTypesList([]);
};


/**
 * @enum {number}
 */
proto.CameraMode = {
  AUTO: 0,
  FREE: 1,
  ORBITAL: 2,
  CHASE: 3,
  LOCKED: 4,
  IVA: 5,
  MAP: 6
};

goog.object.extend(exports, proto);
