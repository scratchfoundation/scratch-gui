import * as grpcWeb from 'grpc-web';

import * as apimessage_pb from './apimessage_pb'; // proto import: "apimessage.proto"
import * as observor_pb from './observor_pb'; // proto import: "observor.proto"


export class ScratchServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  restoreCamera(
    request: apimessage_pb.RestoreCameraRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: apimessage_pb.RestoreCameraResponse) => void
  ): grpcWeb.ClientReadableStream<apimessage_pb.RestoreCameraResponse>;

  setCameraFocussedVessel(
    request: apimessage_pb.SetCameraFocussedVesselRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: apimessage_pb.SetCameraFocussedVesselResponse) => void
  ): grpcWeb.ClientReadableStream<apimessage_pb.SetCameraFocussedVesselResponse>;

  setCameraMode(
    request: apimessage_pb.SetCameraModeRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: apimessage_pb.SetCameraModeResponse) => void
  ): grpcWeb.ClientReadableStream<apimessage_pb.SetCameraModeResponse>;

  setManeuverNode(
    request: apimessage_pb.SetManeuverNodeRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: apimessage_pb.SetManeuverNodeResponse) => void
  ): grpcWeb.ClientReadableStream<apimessage_pb.SetManeuverNodeResponse>;

  getManeuverNode(
    request: apimessage_pb.GetManeuverNodeRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: apimessage_pb.GetManeuverNodeResponse) => void
  ): grpcWeb.ClientReadableStream<apimessage_pb.GetManeuverNodeResponse>;

  listManeuverNodes(
    request: apimessage_pb.ListManeuverNodesRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: apimessage_pb.ListManeuverNodesResponse) => void
  ): grpcWeb.ClientReadableStream<apimessage_pb.ListManeuverNodesResponse>;

  removeManeuverNode(
    request: apimessage_pb.RemoveManeuverNodeRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: apimessage_pb.RemoveManeuverNodeResponse) => void
  ): grpcWeb.ClientReadableStream<apimessage_pb.RemoveManeuverNodeResponse>;

  universalTime(
    request: apimessage_pb.UniversalTimeRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: apimessage_pb.UniversalTimeResponse) => void
  ): grpcWeb.ClientReadableStream<apimessage_pb.UniversalTimeResponse>;

  warpTo(
    request: apimessage_pb.WarpToRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: apimessage_pb.WarpToResponse) => void
  ): grpcWeb.ClientReadableStream<apimessage_pb.WarpToResponse>;

  warpToSecondsAfter(
    request: apimessage_pb.WarpToSecondsAfterRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: apimessage_pb.WarpToSecondsAfterRequest) => void
  ): grpcWeb.ClientReadableStream<apimessage_pb.WarpToSecondsAfterRequest>;

  increaseTimeWarpRate(
    request: apimessage_pb.IncreaseTimeWarpRateRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: apimessage_pb.IncreaseTimeWarpRateResponse) => void
  ): grpcWeb.ClientReadableStream<apimessage_pb.IncreaseTimeWarpRateResponse>;

  decreaseTimeWarpRate(
    request: apimessage_pb.DecreaseTimeWarpRateRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: apimessage_pb.DecreaseTimeWarpRateResponse) => void
  ): grpcWeb.ClientReadableStream<apimessage_pb.DecreaseTimeWarpRateResponse>;

  increaseTimeWarpRateBy(
    request: apimessage_pb.IncreaseTimeWarpRateByRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: apimessage_pb.IncreaseTimeWarpRateByResponse) => void
  ): grpcWeb.ClientReadableStream<apimessage_pb.IncreaseTimeWarpRateByResponse>;

  decreaseTimeWarpRateBy(
    request: apimessage_pb.DecreaseTimeWarpRateByRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: apimessage_pb.DecreaseTimeWarpRateByResponse) => void
  ): grpcWeb.ClientReadableStream<apimessage_pb.DecreaseTimeWarpRateByResponse>;

  stopTimeWarp(
    request: apimessage_pb.StopTimeWarpRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: apimessage_pb.StopTimeWarpResponse) => void
  ): grpcWeb.ClientReadableStream<apimessage_pb.StopTimeWarpResponse>;

  getTimeWarpRate(
    request: apimessage_pb.GetTimeWarpRateRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: apimessage_pb.GetTimeWarpRateResponse) => void
  ): grpcWeb.ClientReadableStream<apimessage_pb.GetTimeWarpRateResponse>;

  getFlightSceneStartTime(
    request: apimessage_pb.GetFlightSceneStartTimeRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: apimessage_pb.GetFlightSceneStartTimeResponse) => void
  ): grpcWeb.ClientReadableStream<apimessage_pb.GetFlightSceneStartTimeResponse>;

  switchActiveVessel(
    request: apimessage_pb.SwitchActiveVesselRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: apimessage_pb.SwitchActiveVesselResponse) => void
  ): grpcWeb.ClientReadableStream<apimessage_pb.SwitchActiveVesselResponse>;

  snapshot(
    request: observor_pb.SnapshotRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: observor_pb.SnapshotResponse) => void
  ): grpcWeb.ClientReadableStream<observor_pb.SnapshotResponse>;

  getVesselPartsByType(
    request: apimessage_pb.GetVesselPartsByTypeRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: apimessage_pb.GetVesselPartsByTypeResponse) => void
  ): grpcWeb.ClientReadableStream<apimessage_pb.GetVesselPartsByTypeResponse>;

  searchVesselPartsByTag(
    request: apimessage_pb.SearchVesselPartsByTagRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: apimessage_pb.SearchVesselPartsByTagResponse) => void
  ): grpcWeb.ClientReadableStream<apimessage_pb.SearchVesselPartsByTagResponse>;

  stage(
    request: apimessage_pb.StageRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: apimessage_pb.StageResponse) => void
  ): grpcWeb.ClientReadableStream<apimessage_pb.StageResponse>;

  throttle(
    request: apimessage_pb.ThrottleRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: apimessage_pb.ThrottleResponse) => void
  ): grpcWeb.ClientReadableStream<apimessage_pb.ThrottleResponse>;

  setSAS(
    request: apimessage_pb.SetSASRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: apimessage_pb.SetSASResponse) => void
  ): grpcWeb.ClientReadableStream<apimessage_pb.SetSASResponse>;

  setSASMode(
    request: apimessage_pb.SetSASModeRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: apimessage_pb.SetSASModeResponse) => void
  ): grpcWeb.ClientReadableStream<apimessage_pb.SetSASModeResponse>;

  setRCS(
    request: apimessage_pb.SetRCSRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: apimessage_pb.SetRCSResponse) => void
  ): grpcWeb.ClientReadableStream<apimessage_pb.SetRCSResponse>;

  setLights(
    request: apimessage_pb.SetLightsRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: apimessage_pb.SetLightsResponse) => void
  ): grpcWeb.ClientReadableStream<apimessage_pb.SetLightsResponse>;

  setAntennas(
    request: apimessage_pb.SetAntennasRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: apimessage_pb.SetAntennasResponse) => void
  ): grpcWeb.ClientReadableStream<apimessage_pb.SetAntennasResponse>;

  setSolarPanels(
    request: apimessage_pb.SetSolarPanelsRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: apimessage_pb.SetSolarPanelsResponse) => void
  ): grpcWeb.ClientReadableStream<apimessage_pb.SetSolarPanelsResponse>;

  toggleActionGroup(
    request: apimessage_pb.ToggleActionGroupRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: apimessage_pb.ToggleActionGroupResponse) => void
  ): grpcWeb.ClientReadableStream<apimessage_pb.ToggleActionGroupResponse>;

  setHeading(
    request: apimessage_pb.SetHeadingRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: apimessage_pb.SetHeadingResponse) => void
  ): grpcWeb.ClientReadableStream<apimessage_pb.SetHeadingResponse>;

  setHeadingRollFirst(
    request: apimessage_pb.SetHeadingRollFirstRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: apimessage_pb.SetHeadingRollFirstResponse) => void
  ): grpcWeb.ClientReadableStream<apimessage_pb.SetHeadingRollFirstResponse>;

  setOrientation(
    request: apimessage_pb.SetOrientationRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: apimessage_pb.SetOrientationResponse) => void
  ): grpcWeb.ClientReadableStream<apimessage_pb.SetOrientationResponse>;

  setOrientationRollFirst(
    request: apimessage_pb.SetOrientationRollFirstRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: apimessage_pb.SetOrientationRollFirstResponse) => void
  ): grpcWeb.ClientReadableStream<apimessage_pb.SetOrientationRollFirstResponse>;

  disengageAutoPilot(
    request: apimessage_pb.DisengageAutoPilotRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: apimessage_pb.DisengageAutoPilotResponse) => void
  ): grpcWeb.ClientReadableStream<apimessage_pb.DisengageAutoPilotResponse>;

  launchClampsRelease(
    request: apimessage_pb.LaunchClampsReleaseRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: apimessage_pb.LaunchClampsReleaseResponse) => void
  ): grpcWeb.ClientReadableStream<apimessage_pb.LaunchClampsReleaseResponse>;

  ablatorsDecouple(
    request: apimessage_pb.AblatorsDecoupleRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: apimessage_pb.AblatorsDecoupleResponse) => void
  ): grpcWeb.ClientReadableStream<apimessage_pb.AblatorsDecoupleResponse>;

  decouplersActivate(
    request: apimessage_pb.DecouplersActivateRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: apimessage_pb.DecouplersActivateResponse) => void
  ): grpcWeb.ClientReadableStream<apimessage_pb.DecouplersActivateResponse>;

  enginesActivate(
    request: apimessage_pb.EnginesActivateRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: apimessage_pb.EnginesActivateResponse) => void
  ): grpcWeb.ClientReadableStream<apimessage_pb.EnginesActivateResponse>;

  enginesShutDown(
    request: apimessage_pb.EnginesShutDownRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: apimessage_pb.EnginesShutDownResponse) => void
  ): grpcWeb.ClientReadableStream<apimessage_pb.EnginesShutDownResponse>;

  fairingsJettison(
    request: apimessage_pb.FairingsJettisonRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: apimessage_pb.FairingsJettisonResponse) => void
  ): grpcWeb.ClientReadableStream<apimessage_pb.FairingsJettisonResponse>;

  parachutesDeploy(
    request: apimessage_pb.ParachutesDeployRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: apimessage_pb.ParachutesDeployResponse) => void
  ): grpcWeb.ClientReadableStream<apimessage_pb.ParachutesDeployResponse>;

  rCSesEnabled(
    request: apimessage_pb.RCSesEnabledRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: apimessage_pb.RCSesEnabledResponse) => void
  ): grpcWeb.ClientReadableStream<apimessage_pb.RCSesEnabledResponse>;

}

export class ScratchServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  restoreCamera(
    request: apimessage_pb.RestoreCameraRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<apimessage_pb.RestoreCameraResponse>;

  setCameraFocussedVessel(
    request: apimessage_pb.SetCameraFocussedVesselRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<apimessage_pb.SetCameraFocussedVesselResponse>;

  setCameraMode(
    request: apimessage_pb.SetCameraModeRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<apimessage_pb.SetCameraModeResponse>;

  setManeuverNode(
    request: apimessage_pb.SetManeuverNodeRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<apimessage_pb.SetManeuverNodeResponse>;

  getManeuverNode(
    request: apimessage_pb.GetManeuverNodeRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<apimessage_pb.GetManeuverNodeResponse>;

  listManeuverNodes(
    request: apimessage_pb.ListManeuverNodesRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<apimessage_pb.ListManeuverNodesResponse>;

  removeManeuverNode(
    request: apimessage_pb.RemoveManeuverNodeRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<apimessage_pb.RemoveManeuverNodeResponse>;

  universalTime(
    request: apimessage_pb.UniversalTimeRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<apimessage_pb.UniversalTimeResponse>;

  warpTo(
    request: apimessage_pb.WarpToRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<apimessage_pb.WarpToResponse>;

  warpToSecondsAfter(
    request: apimessage_pb.WarpToSecondsAfterRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<apimessage_pb.WarpToSecondsAfterRequest>;

  increaseTimeWarpRate(
    request: apimessage_pb.IncreaseTimeWarpRateRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<apimessage_pb.IncreaseTimeWarpRateResponse>;

  decreaseTimeWarpRate(
    request: apimessage_pb.DecreaseTimeWarpRateRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<apimessage_pb.DecreaseTimeWarpRateResponse>;

  increaseTimeWarpRateBy(
    request: apimessage_pb.IncreaseTimeWarpRateByRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<apimessage_pb.IncreaseTimeWarpRateByResponse>;

  decreaseTimeWarpRateBy(
    request: apimessage_pb.DecreaseTimeWarpRateByRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<apimessage_pb.DecreaseTimeWarpRateByResponse>;

  stopTimeWarp(
    request: apimessage_pb.StopTimeWarpRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<apimessage_pb.StopTimeWarpResponse>;

  getTimeWarpRate(
    request: apimessage_pb.GetTimeWarpRateRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<apimessage_pb.GetTimeWarpRateResponse>;

  getFlightSceneStartTime(
    request: apimessage_pb.GetFlightSceneStartTimeRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<apimessage_pb.GetFlightSceneStartTimeResponse>;

  switchActiveVessel(
    request: apimessage_pb.SwitchActiveVesselRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<apimessage_pb.SwitchActiveVesselResponse>;

  snapshot(
    request: observor_pb.SnapshotRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<observor_pb.SnapshotResponse>;

  getVesselPartsByType(
    request: apimessage_pb.GetVesselPartsByTypeRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<apimessage_pb.GetVesselPartsByTypeResponse>;

  searchVesselPartsByTag(
    request: apimessage_pb.SearchVesselPartsByTagRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<apimessage_pb.SearchVesselPartsByTagResponse>;

  stage(
    request: apimessage_pb.StageRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<apimessage_pb.StageResponse>;

  throttle(
    request: apimessage_pb.ThrottleRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<apimessage_pb.ThrottleResponse>;

  setSAS(
    request: apimessage_pb.SetSASRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<apimessage_pb.SetSASResponse>;

  setSASMode(
    request: apimessage_pb.SetSASModeRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<apimessage_pb.SetSASModeResponse>;

  setRCS(
    request: apimessage_pb.SetRCSRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<apimessage_pb.SetRCSResponse>;

  setLights(
    request: apimessage_pb.SetLightsRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<apimessage_pb.SetLightsResponse>;

  setAntennas(
    request: apimessage_pb.SetAntennasRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<apimessage_pb.SetAntennasResponse>;

  setSolarPanels(
    request: apimessage_pb.SetSolarPanelsRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<apimessage_pb.SetSolarPanelsResponse>;

  toggleActionGroup(
    request: apimessage_pb.ToggleActionGroupRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<apimessage_pb.ToggleActionGroupResponse>;

  setHeading(
    request: apimessage_pb.SetHeadingRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<apimessage_pb.SetHeadingResponse>;

  setHeadingRollFirst(
    request: apimessage_pb.SetHeadingRollFirstRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<apimessage_pb.SetHeadingRollFirstResponse>;

  setOrientation(
    request: apimessage_pb.SetOrientationRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<apimessage_pb.SetOrientationResponse>;

  setOrientationRollFirst(
    request: apimessage_pb.SetOrientationRollFirstRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<apimessage_pb.SetOrientationRollFirstResponse>;

  disengageAutoPilot(
    request: apimessage_pb.DisengageAutoPilotRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<apimessage_pb.DisengageAutoPilotResponse>;

  launchClampsRelease(
    request: apimessage_pb.LaunchClampsReleaseRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<apimessage_pb.LaunchClampsReleaseResponse>;

  ablatorsDecouple(
    request: apimessage_pb.AblatorsDecoupleRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<apimessage_pb.AblatorsDecoupleResponse>;

  decouplersActivate(
    request: apimessage_pb.DecouplersActivateRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<apimessage_pb.DecouplersActivateResponse>;

  enginesActivate(
    request: apimessage_pb.EnginesActivateRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<apimessage_pb.EnginesActivateResponse>;

  enginesShutDown(
    request: apimessage_pb.EnginesShutDownRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<apimessage_pb.EnginesShutDownResponse>;

  fairingsJettison(
    request: apimessage_pb.FairingsJettisonRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<apimessage_pb.FairingsJettisonResponse>;

  parachutesDeploy(
    request: apimessage_pb.ParachutesDeployRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<apimessage_pb.ParachutesDeployResponse>;

  rCSesEnabled(
    request: apimessage_pb.RCSesEnabledRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<apimessage_pb.RCSesEnabledResponse>;

}

