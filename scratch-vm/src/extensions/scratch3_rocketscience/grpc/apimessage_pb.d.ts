import * as jspb from 'google-protobuf'

import * as observor_pb from './observor_pb'; // proto import: "observor.proto"


export class RCSesEnabledRequest extends jspb.Message {
  getIdsList(): Array<number>;
  setIdsList(value: Array<number>): RCSesEnabledRequest;
  clearIdsList(): RCSesEnabledRequest;
  addIds(value: number, index?: number): RCSesEnabledRequest;

  getEnabled(): boolean;
  setEnabled(value: boolean): RCSesEnabledRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RCSesEnabledRequest.AsObject;
  static toObject(includeInstance: boolean, msg: RCSesEnabledRequest): RCSesEnabledRequest.AsObject;
  static serializeBinaryToWriter(message: RCSesEnabledRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RCSesEnabledRequest;
  static deserializeBinaryFromReader(message: RCSesEnabledRequest, reader: jspb.BinaryReader): RCSesEnabledRequest;
}

export namespace RCSesEnabledRequest {
  export type AsObject = {
    idsList: Array<number>,
    enabled: boolean,
  }
}

export class RCSesEnabledResponse extends jspb.Message {
  getCode(): number;
  setCode(value: number): RCSesEnabledResponse;

  getMessage(): string;
  setMessage(value: string): RCSesEnabledResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RCSesEnabledResponse.AsObject;
  static toObject(includeInstance: boolean, msg: RCSesEnabledResponse): RCSesEnabledResponse.AsObject;
  static serializeBinaryToWriter(message: RCSesEnabledResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RCSesEnabledResponse;
  static deserializeBinaryFromReader(message: RCSesEnabledResponse, reader: jspb.BinaryReader): RCSesEnabledResponse;
}

export namespace RCSesEnabledResponse {
  export type AsObject = {
    code: number,
    message: string,
  }
}

export class ParachutesDeployRequest extends jspb.Message {
  getIdsList(): Array<number>;
  setIdsList(value: Array<number>): ParachutesDeployRequest;
  clearIdsList(): ParachutesDeployRequest;
  addIds(value: number, index?: number): ParachutesDeployRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ParachutesDeployRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ParachutesDeployRequest): ParachutesDeployRequest.AsObject;
  static serializeBinaryToWriter(message: ParachutesDeployRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ParachutesDeployRequest;
  static deserializeBinaryFromReader(message: ParachutesDeployRequest, reader: jspb.BinaryReader): ParachutesDeployRequest;
}

export namespace ParachutesDeployRequest {
  export type AsObject = {
    idsList: Array<number>,
  }
}

export class ParachutesDeployResponse extends jspb.Message {
  getCode(): number;
  setCode(value: number): ParachutesDeployResponse;

  getMessage(): string;
  setMessage(value: string): ParachutesDeployResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ParachutesDeployResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ParachutesDeployResponse): ParachutesDeployResponse.AsObject;
  static serializeBinaryToWriter(message: ParachutesDeployResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ParachutesDeployResponse;
  static deserializeBinaryFromReader(message: ParachutesDeployResponse, reader: jspb.BinaryReader): ParachutesDeployResponse;
}

export namespace ParachutesDeployResponse {
  export type AsObject = {
    code: number,
    message: string,
  }
}

export class FairingsJettisonRequest extends jspb.Message {
  getIdsList(): Array<number>;
  setIdsList(value: Array<number>): FairingsJettisonRequest;
  clearIdsList(): FairingsJettisonRequest;
  addIds(value: number, index?: number): FairingsJettisonRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FairingsJettisonRequest.AsObject;
  static toObject(includeInstance: boolean, msg: FairingsJettisonRequest): FairingsJettisonRequest.AsObject;
  static serializeBinaryToWriter(message: FairingsJettisonRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FairingsJettisonRequest;
  static deserializeBinaryFromReader(message: FairingsJettisonRequest, reader: jspb.BinaryReader): FairingsJettisonRequest;
}

export namespace FairingsJettisonRequest {
  export type AsObject = {
    idsList: Array<number>,
  }
}

export class FairingsJettisonResponse extends jspb.Message {
  getCode(): number;
  setCode(value: number): FairingsJettisonResponse;

  getMessage(): string;
  setMessage(value: string): FairingsJettisonResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FairingsJettisonResponse.AsObject;
  static toObject(includeInstance: boolean, msg: FairingsJettisonResponse): FairingsJettisonResponse.AsObject;
  static serializeBinaryToWriter(message: FairingsJettisonResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FairingsJettisonResponse;
  static deserializeBinaryFromReader(message: FairingsJettisonResponse, reader: jspb.BinaryReader): FairingsJettisonResponse;
}

export namespace FairingsJettisonResponse {
  export type AsObject = {
    code: number,
    message: string,
  }
}

export class AblatorsDecoupleRequest extends jspb.Message {
  getIdsList(): Array<number>;
  setIdsList(value: Array<number>): AblatorsDecoupleRequest;
  clearIdsList(): AblatorsDecoupleRequest;
  addIds(value: number, index?: number): AblatorsDecoupleRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AblatorsDecoupleRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AblatorsDecoupleRequest): AblatorsDecoupleRequest.AsObject;
  static serializeBinaryToWriter(message: AblatorsDecoupleRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AblatorsDecoupleRequest;
  static deserializeBinaryFromReader(message: AblatorsDecoupleRequest, reader: jspb.BinaryReader): AblatorsDecoupleRequest;
}

export namespace AblatorsDecoupleRequest {
  export type AsObject = {
    idsList: Array<number>,
  }
}

export class AblatorsDecoupleResponse extends jspb.Message {
  getCode(): number;
  setCode(value: number): AblatorsDecoupleResponse;

  getMessage(): string;
  setMessage(value: string): AblatorsDecoupleResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AblatorsDecoupleResponse.AsObject;
  static toObject(includeInstance: boolean, msg: AblatorsDecoupleResponse): AblatorsDecoupleResponse.AsObject;
  static serializeBinaryToWriter(message: AblatorsDecoupleResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AblatorsDecoupleResponse;
  static deserializeBinaryFromReader(message: AblatorsDecoupleResponse, reader: jspb.BinaryReader): AblatorsDecoupleResponse;
}

export namespace AblatorsDecoupleResponse {
  export type AsObject = {
    code: number,
    message: string,
  }
}

export class DecouplersActivateRequest extends jspb.Message {
  getIdsList(): Array<number>;
  setIdsList(value: Array<number>): DecouplersActivateRequest;
  clearIdsList(): DecouplersActivateRequest;
  addIds(value: number, index?: number): DecouplersActivateRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DecouplersActivateRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DecouplersActivateRequest): DecouplersActivateRequest.AsObject;
  static serializeBinaryToWriter(message: DecouplersActivateRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DecouplersActivateRequest;
  static deserializeBinaryFromReader(message: DecouplersActivateRequest, reader: jspb.BinaryReader): DecouplersActivateRequest;
}

export namespace DecouplersActivateRequest {
  export type AsObject = {
    idsList: Array<number>,
  }
}

export class DecouplersActivateResponse extends jspb.Message {
  getCode(): number;
  setCode(value: number): DecouplersActivateResponse;

  getMessage(): string;
  setMessage(value: string): DecouplersActivateResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DecouplersActivateResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DecouplersActivateResponse): DecouplersActivateResponse.AsObject;
  static serializeBinaryToWriter(message: DecouplersActivateResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DecouplersActivateResponse;
  static deserializeBinaryFromReader(message: DecouplersActivateResponse, reader: jspb.BinaryReader): DecouplersActivateResponse;
}

export namespace DecouplersActivateResponse {
  export type AsObject = {
    code: number,
    message: string,
  }
}

export class EnginesActivateRequest extends jspb.Message {
  getIdsList(): Array<number>;
  setIdsList(value: Array<number>): EnginesActivateRequest;
  clearIdsList(): EnginesActivateRequest;
  addIds(value: number, index?: number): EnginesActivateRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EnginesActivateRequest.AsObject;
  static toObject(includeInstance: boolean, msg: EnginesActivateRequest): EnginesActivateRequest.AsObject;
  static serializeBinaryToWriter(message: EnginesActivateRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EnginesActivateRequest;
  static deserializeBinaryFromReader(message: EnginesActivateRequest, reader: jspb.BinaryReader): EnginesActivateRequest;
}

export namespace EnginesActivateRequest {
  export type AsObject = {
    idsList: Array<number>,
  }
}

export class EnginesActivateResponse extends jspb.Message {
  getCode(): number;
  setCode(value: number): EnginesActivateResponse;

  getMessage(): string;
  setMessage(value: string): EnginesActivateResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EnginesActivateResponse.AsObject;
  static toObject(includeInstance: boolean, msg: EnginesActivateResponse): EnginesActivateResponse.AsObject;
  static serializeBinaryToWriter(message: EnginesActivateResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EnginesActivateResponse;
  static deserializeBinaryFromReader(message: EnginesActivateResponse, reader: jspb.BinaryReader): EnginesActivateResponse;
}

export namespace EnginesActivateResponse {
  export type AsObject = {
    code: number,
    message: string,
  }
}

export class EnginesShutDownRequest extends jspb.Message {
  getIdsList(): Array<number>;
  setIdsList(value: Array<number>): EnginesShutDownRequest;
  clearIdsList(): EnginesShutDownRequest;
  addIds(value: number, index?: number): EnginesShutDownRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EnginesShutDownRequest.AsObject;
  static toObject(includeInstance: boolean, msg: EnginesShutDownRequest): EnginesShutDownRequest.AsObject;
  static serializeBinaryToWriter(message: EnginesShutDownRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EnginesShutDownRequest;
  static deserializeBinaryFromReader(message: EnginesShutDownRequest, reader: jspb.BinaryReader): EnginesShutDownRequest;
}

export namespace EnginesShutDownRequest {
  export type AsObject = {
    idsList: Array<number>,
  }
}

export class EnginesShutDownResponse extends jspb.Message {
  getCode(): number;
  setCode(value: number): EnginesShutDownResponse;

  getMessage(): string;
  setMessage(value: string): EnginesShutDownResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EnginesShutDownResponse.AsObject;
  static toObject(includeInstance: boolean, msg: EnginesShutDownResponse): EnginesShutDownResponse.AsObject;
  static serializeBinaryToWriter(message: EnginesShutDownResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EnginesShutDownResponse;
  static deserializeBinaryFromReader(message: EnginesShutDownResponse, reader: jspb.BinaryReader): EnginesShutDownResponse;
}

export namespace EnginesShutDownResponse {
  export type AsObject = {
    code: number,
    message: string,
  }
}

export class LaunchClampsReleaseRequest extends jspb.Message {
  getIdsList(): Array<number>;
  setIdsList(value: Array<number>): LaunchClampsReleaseRequest;
  clearIdsList(): LaunchClampsReleaseRequest;
  addIds(value: number, index?: number): LaunchClampsReleaseRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LaunchClampsReleaseRequest.AsObject;
  static toObject(includeInstance: boolean, msg: LaunchClampsReleaseRequest): LaunchClampsReleaseRequest.AsObject;
  static serializeBinaryToWriter(message: LaunchClampsReleaseRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LaunchClampsReleaseRequest;
  static deserializeBinaryFromReader(message: LaunchClampsReleaseRequest, reader: jspb.BinaryReader): LaunchClampsReleaseRequest;
}

export namespace LaunchClampsReleaseRequest {
  export type AsObject = {
    idsList: Array<number>,
  }
}

export class LaunchClampsReleaseResponse extends jspb.Message {
  getCode(): number;
  setCode(value: number): LaunchClampsReleaseResponse;

  getMessage(): string;
  setMessage(value: string): LaunchClampsReleaseResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LaunchClampsReleaseResponse.AsObject;
  static toObject(includeInstance: boolean, msg: LaunchClampsReleaseResponse): LaunchClampsReleaseResponse.AsObject;
  static serializeBinaryToWriter(message: LaunchClampsReleaseResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LaunchClampsReleaseResponse;
  static deserializeBinaryFromReader(message: LaunchClampsReleaseResponse, reader: jspb.BinaryReader): LaunchClampsReleaseResponse;
}

export namespace LaunchClampsReleaseResponse {
  export type AsObject = {
    code: number,
    message: string,
  }
}

export class RestoreCameraRequest extends jspb.Message {
  getDisplay(): number;
  setDisplay(value: number): RestoreCameraRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RestoreCameraRequest.AsObject;
  static toObject(includeInstance: boolean, msg: RestoreCameraRequest): RestoreCameraRequest.AsObject;
  static serializeBinaryToWriter(message: RestoreCameraRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RestoreCameraRequest;
  static deserializeBinaryFromReader(message: RestoreCameraRequest, reader: jspb.BinaryReader): RestoreCameraRequest;
}

export namespace RestoreCameraRequest {
  export type AsObject = {
    display: number,
  }
}

export class RestoreCameraResponse extends jspb.Message {
  getCode(): number;
  setCode(value: number): RestoreCameraResponse;

  getMessage(): string;
  setMessage(value: string): RestoreCameraResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RestoreCameraResponse.AsObject;
  static toObject(includeInstance: boolean, msg: RestoreCameraResponse): RestoreCameraResponse.AsObject;
  static serializeBinaryToWriter(message: RestoreCameraResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RestoreCameraResponse;
  static deserializeBinaryFromReader(message: RestoreCameraResponse, reader: jspb.BinaryReader): RestoreCameraResponse;
}

export namespace RestoreCameraResponse {
  export type AsObject = {
    code: number,
    message: string,
  }
}

export class SetCameraFocussedVesselRequest extends jspb.Message {
  getVesselid(): string;
  setVesselid(value: string): SetCameraFocussedVesselRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetCameraFocussedVesselRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SetCameraFocussedVesselRequest): SetCameraFocussedVesselRequest.AsObject;
  static serializeBinaryToWriter(message: SetCameraFocussedVesselRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetCameraFocussedVesselRequest;
  static deserializeBinaryFromReader(message: SetCameraFocussedVesselRequest, reader: jspb.BinaryReader): SetCameraFocussedVesselRequest;
}

export namespace SetCameraFocussedVesselRequest {
  export type AsObject = {
    vesselid: string,
  }
}

export class SetCameraFocussedVesselResponse extends jspb.Message {
  getCode(): number;
  setCode(value: number): SetCameraFocussedVesselResponse;

  getMessage(): string;
  setMessage(value: string): SetCameraFocussedVesselResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetCameraFocussedVesselResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SetCameraFocussedVesselResponse): SetCameraFocussedVesselResponse.AsObject;
  static serializeBinaryToWriter(message: SetCameraFocussedVesselResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetCameraFocussedVesselResponse;
  static deserializeBinaryFromReader(message: SetCameraFocussedVesselResponse, reader: jspb.BinaryReader): SetCameraFocussedVesselResponse;
}

export namespace SetCameraFocussedVesselResponse {
  export type AsObject = {
    code: number,
    message: string,
  }
}

export class SetCameraModeRequest extends jspb.Message {
  getMode(): CameraMode;
  setMode(value: CameraMode): SetCameraModeRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetCameraModeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SetCameraModeRequest): SetCameraModeRequest.AsObject;
  static serializeBinaryToWriter(message: SetCameraModeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetCameraModeRequest;
  static deserializeBinaryFromReader(message: SetCameraModeRequest, reader: jspb.BinaryReader): SetCameraModeRequest;
}

export namespace SetCameraModeRequest {
  export type AsObject = {
    mode: CameraMode,
  }
}

export class SetCameraModeResponse extends jspb.Message {
  getCode(): number;
  setCode(value: number): SetCameraModeResponse;

  getMessage(): string;
  setMessage(value: string): SetCameraModeResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetCameraModeResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SetCameraModeResponse): SetCameraModeResponse.AsObject;
  static serializeBinaryToWriter(message: SetCameraModeResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetCameraModeResponse;
  static deserializeBinaryFromReader(message: SetCameraModeResponse, reader: jspb.BinaryReader): SetCameraModeResponse;
}

export namespace SetCameraModeResponse {
  export type AsObject = {
    code: number,
    message: string,
  }
}

export class ManeuverNode extends jspb.Message {
  getVesselid(): string;
  setVesselid(value: string): ManeuverNode;

  getUt(): number;
  setUt(value: number): ManeuverNode;

  getDeltavvector(): observor_pb.Vector3d | undefined;
  setDeltavvector(value?: observor_pb.Vector3d): ManeuverNode;
  hasDeltavvector(): boolean;
  clearDeltavvector(): ManeuverNode;

  getDeltav(): number;
  setDeltav(value: number): ManeuverNode;

  getRemainingburnvector(): observor_pb.Vector3d | undefined;
  setRemainingburnvector(value?: observor_pb.Vector3d): ManeuverNode;
  hasRemainingburnvector(): boolean;
  clearRemainingburnvector(): ManeuverNode;

  getRemainingdeltav(): number;
  setRemainingdeltav(value: number): ManeuverNode;

  getStartburnin(): number;
  setStartburnin(value: number): ManeuverNode;

  getBurntime(): number;
  setBurntime(value: number): ManeuverNode;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ManeuverNode.AsObject;
  static toObject(includeInstance: boolean, msg: ManeuverNode): ManeuverNode.AsObject;
  static serializeBinaryToWriter(message: ManeuverNode, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ManeuverNode;
  static deserializeBinaryFromReader(message: ManeuverNode, reader: jspb.BinaryReader): ManeuverNode;
}

export namespace ManeuverNode {
  export type AsObject = {
    vesselid: string,
    ut: number,
    deltavvector?: observor_pb.Vector3d.AsObject,
    deltav: number,
    remainingburnvector?: observor_pb.Vector3d.AsObject,
    remainingdeltav: number,
    startburnin: number,
    burntime: number,
  }
}

export class SetManeuverNodeRequest extends jspb.Message {
  getVesselid(): string;
  setVesselid(value: string): SetManeuverNodeRequest;

  getUt(): number;
  setUt(value: number): SetManeuverNodeRequest;

  getPrograde(): number;
  setPrograde(value: number): SetManeuverNodeRequest;

  getNormal(): number;
  setNormal(value: number): SetManeuverNodeRequest;

  getRadial(): number;
  setRadial(value: number): SetManeuverNodeRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetManeuverNodeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SetManeuverNodeRequest): SetManeuverNodeRequest.AsObject;
  static serializeBinaryToWriter(message: SetManeuverNodeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetManeuverNodeRequest;
  static deserializeBinaryFromReader(message: SetManeuverNodeRequest, reader: jspb.BinaryReader): SetManeuverNodeRequest;
}

export namespace SetManeuverNodeRequest {
  export type AsObject = {
    vesselid: string,
    ut: number,
    prograde: number,
    normal: number,
    radial: number,
  }
}

export class SetManeuverNodeResponse extends jspb.Message {
  getCode(): number;
  setCode(value: number): SetManeuverNodeResponse;

  getMessage(): string;
  setMessage(value: string): SetManeuverNodeResponse;

  getNode(): ManeuverNode | undefined;
  setNode(value?: ManeuverNode): SetManeuverNodeResponse;
  hasNode(): boolean;
  clearNode(): SetManeuverNodeResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetManeuverNodeResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SetManeuverNodeResponse): SetManeuverNodeResponse.AsObject;
  static serializeBinaryToWriter(message: SetManeuverNodeResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetManeuverNodeResponse;
  static deserializeBinaryFromReader(message: SetManeuverNodeResponse, reader: jspb.BinaryReader): SetManeuverNodeResponse;
}

export namespace SetManeuverNodeResponse {
  export type AsObject = {
    code: number,
    message: string,
    node?: ManeuverNode.AsObject,
  }
}

export class GetManeuverNodeRequest extends jspb.Message {
  getVesselid(): string;
  setVesselid(value: string): GetManeuverNodeRequest;

  getUt(): number;
  setUt(value: number): GetManeuverNodeRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetManeuverNodeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetManeuverNodeRequest): GetManeuverNodeRequest.AsObject;
  static serializeBinaryToWriter(message: GetManeuverNodeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetManeuverNodeRequest;
  static deserializeBinaryFromReader(message: GetManeuverNodeRequest, reader: jspb.BinaryReader): GetManeuverNodeRequest;
}

export namespace GetManeuverNodeRequest {
  export type AsObject = {
    vesselid: string,
    ut: number,
  }
}

export class GetManeuverNodeResponse extends jspb.Message {
  getCode(): number;
  setCode(value: number): GetManeuverNodeResponse;

  getMessage(): string;
  setMessage(value: string): GetManeuverNodeResponse;

  getNode(): ManeuverNode | undefined;
  setNode(value?: ManeuverNode): GetManeuverNodeResponse;
  hasNode(): boolean;
  clearNode(): GetManeuverNodeResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetManeuverNodeResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetManeuverNodeResponse): GetManeuverNodeResponse.AsObject;
  static serializeBinaryToWriter(message: GetManeuverNodeResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetManeuverNodeResponse;
  static deserializeBinaryFromReader(message: GetManeuverNodeResponse, reader: jspb.BinaryReader): GetManeuverNodeResponse;
}

export namespace GetManeuverNodeResponse {
  export type AsObject = {
    code: number,
    message: string,
    node?: ManeuverNode.AsObject,
  }
}

export class ListManeuverNodesRequest extends jspb.Message {
  getVesselid(): string;
  setVesselid(value: string): ListManeuverNodesRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListManeuverNodesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListManeuverNodesRequest): ListManeuverNodesRequest.AsObject;
  static serializeBinaryToWriter(message: ListManeuverNodesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListManeuverNodesRequest;
  static deserializeBinaryFromReader(message: ListManeuverNodesRequest, reader: jspb.BinaryReader): ListManeuverNodesRequest;
}

export namespace ListManeuverNodesRequest {
  export type AsObject = {
    vesselid: string,
  }
}

export class ListManeuverNodesResponse extends jspb.Message {
  getCode(): number;
  setCode(value: number): ListManeuverNodesResponse;

  getMessage(): string;
  setMessage(value: string): ListManeuverNodesResponse;

  getNodesList(): Array<ManeuverNode>;
  setNodesList(value: Array<ManeuverNode>): ListManeuverNodesResponse;
  clearNodesList(): ListManeuverNodesResponse;
  addNodes(value?: ManeuverNode, index?: number): ManeuverNode;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListManeuverNodesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListManeuverNodesResponse): ListManeuverNodesResponse.AsObject;
  static serializeBinaryToWriter(message: ListManeuverNodesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListManeuverNodesResponse;
  static deserializeBinaryFromReader(message: ListManeuverNodesResponse, reader: jspb.BinaryReader): ListManeuverNodesResponse;
}

export namespace ListManeuverNodesResponse {
  export type AsObject = {
    code: number,
    message: string,
    nodesList: Array<ManeuverNode.AsObject>,
  }
}

export class RemoveManeuverNodeRequest extends jspb.Message {
  getVesselid(): string;
  setVesselid(value: string): RemoveManeuverNodeRequest;

  getUt(): number;
  setUt(value: number): RemoveManeuverNodeRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RemoveManeuverNodeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: RemoveManeuverNodeRequest): RemoveManeuverNodeRequest.AsObject;
  static serializeBinaryToWriter(message: RemoveManeuverNodeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RemoveManeuverNodeRequest;
  static deserializeBinaryFromReader(message: RemoveManeuverNodeRequest, reader: jspb.BinaryReader): RemoveManeuverNodeRequest;
}

export namespace RemoveManeuverNodeRequest {
  export type AsObject = {
    vesselid: string,
    ut: number,
  }
}

export class RemoveManeuverNodeResponse extends jspb.Message {
  getCode(): number;
  setCode(value: number): RemoveManeuverNodeResponse;

  getMessage(): string;
  setMessage(value: string): RemoveManeuverNodeResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RemoveManeuverNodeResponse.AsObject;
  static toObject(includeInstance: boolean, msg: RemoveManeuverNodeResponse): RemoveManeuverNodeResponse.AsObject;
  static serializeBinaryToWriter(message: RemoveManeuverNodeResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RemoveManeuverNodeResponse;
  static deserializeBinaryFromReader(message: RemoveManeuverNodeResponse, reader: jspb.BinaryReader): RemoveManeuverNodeResponse;
}

export namespace RemoveManeuverNodeResponse {
  export type AsObject = {
    code: number,
    message: string,
  }
}

export class UniversalTimeRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UniversalTimeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UniversalTimeRequest): UniversalTimeRequest.AsObject;
  static serializeBinaryToWriter(message: UniversalTimeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UniversalTimeRequest;
  static deserializeBinaryFromReader(message: UniversalTimeRequest, reader: jspb.BinaryReader): UniversalTimeRequest;
}

export namespace UniversalTimeRequest {
  export type AsObject = {
  }
}

export class UniversalTimeResponse extends jspb.Message {
  getCode(): number;
  setCode(value: number): UniversalTimeResponse;

  getMessage(): string;
  setMessage(value: string): UniversalTimeResponse;

  getUt(): number;
  setUt(value: number): UniversalTimeResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UniversalTimeResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UniversalTimeResponse): UniversalTimeResponse.AsObject;
  static serializeBinaryToWriter(message: UniversalTimeResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UniversalTimeResponse;
  static deserializeBinaryFromReader(message: UniversalTimeResponse, reader: jspb.BinaryReader): UniversalTimeResponse;
}

export namespace UniversalTimeResponse {
  export type AsObject = {
    code: number,
    message: string,
    ut: number,
  }
}

export class WarpToRequest extends jspb.Message {
  getUt(): number;
  setUt(value: number): WarpToRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): WarpToRequest.AsObject;
  static toObject(includeInstance: boolean, msg: WarpToRequest): WarpToRequest.AsObject;
  static serializeBinaryToWriter(message: WarpToRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): WarpToRequest;
  static deserializeBinaryFromReader(message: WarpToRequest, reader: jspb.BinaryReader): WarpToRequest;
}

export namespace WarpToRequest {
  export type AsObject = {
    ut: number,
  }
}

export class WarpToSecondsAfterRequest extends jspb.Message {
  getSeconds(): number;
  setSeconds(value: number): WarpToSecondsAfterRequest;

  getTimetype(): number;
  setTimetype(value: number): WarpToSecondsAfterRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): WarpToSecondsAfterRequest.AsObject;
  static toObject(includeInstance: boolean, msg: WarpToSecondsAfterRequest): WarpToSecondsAfterRequest.AsObject;
  static serializeBinaryToWriter(message: WarpToSecondsAfterRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): WarpToSecondsAfterRequest;
  static deserializeBinaryFromReader(message: WarpToSecondsAfterRequest, reader: jspb.BinaryReader): WarpToSecondsAfterRequest;
}

export namespace WarpToSecondsAfterRequest {
  export type AsObject = {
    seconds: number,
    timetype: number,
  }
}

export class WarpToResponse extends jspb.Message {
  getCode(): number;
  setCode(value: number): WarpToResponse;

  getMessage(): string;
  setMessage(value: string): WarpToResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): WarpToResponse.AsObject;
  static toObject(includeInstance: boolean, msg: WarpToResponse): WarpToResponse.AsObject;
  static serializeBinaryToWriter(message: WarpToResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): WarpToResponse;
  static deserializeBinaryFromReader(message: WarpToResponse, reader: jspb.BinaryReader): WarpToResponse;
}

export namespace WarpToResponse {
  export type AsObject = {
    code: number,
    message: string,
  }
}

export class IncreaseTimeWarpRateRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): IncreaseTimeWarpRateRequest.AsObject;
  static toObject(includeInstance: boolean, msg: IncreaseTimeWarpRateRequest): IncreaseTimeWarpRateRequest.AsObject;
  static serializeBinaryToWriter(message: IncreaseTimeWarpRateRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): IncreaseTimeWarpRateRequest;
  static deserializeBinaryFromReader(message: IncreaseTimeWarpRateRequest, reader: jspb.BinaryReader): IncreaseTimeWarpRateRequest;
}

export namespace IncreaseTimeWarpRateRequest {
  export type AsObject = {
  }
}

export class IncreaseTimeWarpRateResponse extends jspb.Message {
  getCode(): number;
  setCode(value: number): IncreaseTimeWarpRateResponse;

  getMessage(): string;
  setMessage(value: string): IncreaseTimeWarpRateResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): IncreaseTimeWarpRateResponse.AsObject;
  static toObject(includeInstance: boolean, msg: IncreaseTimeWarpRateResponse): IncreaseTimeWarpRateResponse.AsObject;
  static serializeBinaryToWriter(message: IncreaseTimeWarpRateResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): IncreaseTimeWarpRateResponse;
  static deserializeBinaryFromReader(message: IncreaseTimeWarpRateResponse, reader: jspb.BinaryReader): IncreaseTimeWarpRateResponse;
}

export namespace IncreaseTimeWarpRateResponse {
  export type AsObject = {
    code: number,
    message: string,
  }
}

export class DecreaseTimeWarpRateRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DecreaseTimeWarpRateRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DecreaseTimeWarpRateRequest): DecreaseTimeWarpRateRequest.AsObject;
  static serializeBinaryToWriter(message: DecreaseTimeWarpRateRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DecreaseTimeWarpRateRequest;
  static deserializeBinaryFromReader(message: DecreaseTimeWarpRateRequest, reader: jspb.BinaryReader): DecreaseTimeWarpRateRequest;
}

export namespace DecreaseTimeWarpRateRequest {
  export type AsObject = {
  }
}

export class DecreaseTimeWarpRateResponse extends jspb.Message {
  getCode(): number;
  setCode(value: number): DecreaseTimeWarpRateResponse;

  getMessage(): string;
  setMessage(value: string): DecreaseTimeWarpRateResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DecreaseTimeWarpRateResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DecreaseTimeWarpRateResponse): DecreaseTimeWarpRateResponse.AsObject;
  static serializeBinaryToWriter(message: DecreaseTimeWarpRateResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DecreaseTimeWarpRateResponse;
  static deserializeBinaryFromReader(message: DecreaseTimeWarpRateResponse, reader: jspb.BinaryReader): DecreaseTimeWarpRateResponse;
}

export namespace DecreaseTimeWarpRateResponse {
  export type AsObject = {
    code: number,
    message: string,
  }
}

export class IncreaseTimeWarpRateByRequest extends jspb.Message {
  getLevels(): number;
  setLevels(value: number): IncreaseTimeWarpRateByRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): IncreaseTimeWarpRateByRequest.AsObject;
  static toObject(includeInstance: boolean, msg: IncreaseTimeWarpRateByRequest): IncreaseTimeWarpRateByRequest.AsObject;
  static serializeBinaryToWriter(message: IncreaseTimeWarpRateByRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): IncreaseTimeWarpRateByRequest;
  static deserializeBinaryFromReader(message: IncreaseTimeWarpRateByRequest, reader: jspb.BinaryReader): IncreaseTimeWarpRateByRequest;
}

export namespace IncreaseTimeWarpRateByRequest {
  export type AsObject = {
    levels: number,
  }
}

export class IncreaseTimeWarpRateByResponse extends jspb.Message {
  getCode(): number;
  setCode(value: number): IncreaseTimeWarpRateByResponse;

  getMessage(): string;
  setMessage(value: string): IncreaseTimeWarpRateByResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): IncreaseTimeWarpRateByResponse.AsObject;
  static toObject(includeInstance: boolean, msg: IncreaseTimeWarpRateByResponse): IncreaseTimeWarpRateByResponse.AsObject;
  static serializeBinaryToWriter(message: IncreaseTimeWarpRateByResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): IncreaseTimeWarpRateByResponse;
  static deserializeBinaryFromReader(message: IncreaseTimeWarpRateByResponse, reader: jspb.BinaryReader): IncreaseTimeWarpRateByResponse;
}

export namespace IncreaseTimeWarpRateByResponse {
  export type AsObject = {
    code: number,
    message: string,
  }
}

export class DecreaseTimeWarpRateByRequest extends jspb.Message {
  getLevels(): number;
  setLevels(value: number): DecreaseTimeWarpRateByRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DecreaseTimeWarpRateByRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DecreaseTimeWarpRateByRequest): DecreaseTimeWarpRateByRequest.AsObject;
  static serializeBinaryToWriter(message: DecreaseTimeWarpRateByRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DecreaseTimeWarpRateByRequest;
  static deserializeBinaryFromReader(message: DecreaseTimeWarpRateByRequest, reader: jspb.BinaryReader): DecreaseTimeWarpRateByRequest;
}

export namespace DecreaseTimeWarpRateByRequest {
  export type AsObject = {
    levels: number,
  }
}

export class DecreaseTimeWarpRateByResponse extends jspb.Message {
  getCode(): number;
  setCode(value: number): DecreaseTimeWarpRateByResponse;

  getMessage(): string;
  setMessage(value: string): DecreaseTimeWarpRateByResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DecreaseTimeWarpRateByResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DecreaseTimeWarpRateByResponse): DecreaseTimeWarpRateByResponse.AsObject;
  static serializeBinaryToWriter(message: DecreaseTimeWarpRateByResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DecreaseTimeWarpRateByResponse;
  static deserializeBinaryFromReader(message: DecreaseTimeWarpRateByResponse, reader: jspb.BinaryReader): DecreaseTimeWarpRateByResponse;
}

export namespace DecreaseTimeWarpRateByResponse {
  export type AsObject = {
    code: number,
    message: string,
  }
}

export class StopTimeWarpRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StopTimeWarpRequest.AsObject;
  static toObject(includeInstance: boolean, msg: StopTimeWarpRequest): StopTimeWarpRequest.AsObject;
  static serializeBinaryToWriter(message: StopTimeWarpRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StopTimeWarpRequest;
  static deserializeBinaryFromReader(message: StopTimeWarpRequest, reader: jspb.BinaryReader): StopTimeWarpRequest;
}

export namespace StopTimeWarpRequest {
  export type AsObject = {
  }
}

export class StopTimeWarpResponse extends jspb.Message {
  getCode(): number;
  setCode(value: number): StopTimeWarpResponse;

  getMessage(): string;
  setMessage(value: string): StopTimeWarpResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StopTimeWarpResponse.AsObject;
  static toObject(includeInstance: boolean, msg: StopTimeWarpResponse): StopTimeWarpResponse.AsObject;
  static serializeBinaryToWriter(message: StopTimeWarpResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StopTimeWarpResponse;
  static deserializeBinaryFromReader(message: StopTimeWarpResponse, reader: jspb.BinaryReader): StopTimeWarpResponse;
}

export namespace StopTimeWarpResponse {
  export type AsObject = {
    code: number,
    message: string,
  }
}

export class GetTimeWarpRateRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTimeWarpRateRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetTimeWarpRateRequest): GetTimeWarpRateRequest.AsObject;
  static serializeBinaryToWriter(message: GetTimeWarpRateRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTimeWarpRateRequest;
  static deserializeBinaryFromReader(message: GetTimeWarpRateRequest, reader: jspb.BinaryReader): GetTimeWarpRateRequest;
}

export namespace GetTimeWarpRateRequest {
  export type AsObject = {
  }
}

export class GetTimeWarpRateResponse extends jspb.Message {
  getCode(): number;
  setCode(value: number): GetTimeWarpRateResponse;

  getMessage(): string;
  setMessage(value: string): GetTimeWarpRateResponse;

  getRate(): number;
  setRate(value: number): GetTimeWarpRateResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTimeWarpRateResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetTimeWarpRateResponse): GetTimeWarpRateResponse.AsObject;
  static serializeBinaryToWriter(message: GetTimeWarpRateResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTimeWarpRateResponse;
  static deserializeBinaryFromReader(message: GetTimeWarpRateResponse, reader: jspb.BinaryReader): GetTimeWarpRateResponse;
}

export namespace GetTimeWarpRateResponse {
  export type AsObject = {
    code: number,
    message: string,
    rate: number,
  }
}

export class GetFlightSceneStartTimeRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetFlightSceneStartTimeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetFlightSceneStartTimeRequest): GetFlightSceneStartTimeRequest.AsObject;
  static serializeBinaryToWriter(message: GetFlightSceneStartTimeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetFlightSceneStartTimeRequest;
  static deserializeBinaryFromReader(message: GetFlightSceneStartTimeRequest, reader: jspb.BinaryReader): GetFlightSceneStartTimeRequest;
}

export namespace GetFlightSceneStartTimeRequest {
  export type AsObject = {
  }
}

export class GetFlightSceneStartTimeResponse extends jspb.Message {
  getCode(): number;
  setCode(value: number): GetFlightSceneStartTimeResponse;

  getMessage(): string;
  setMessage(value: string): GetFlightSceneStartTimeResponse;

  getTime(): number;
  setTime(value: number): GetFlightSceneStartTimeResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetFlightSceneStartTimeResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetFlightSceneStartTimeResponse): GetFlightSceneStartTimeResponse.AsObject;
  static serializeBinaryToWriter(message: GetFlightSceneStartTimeResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetFlightSceneStartTimeResponse;
  static deserializeBinaryFromReader(message: GetFlightSceneStartTimeResponse, reader: jspb.BinaryReader): GetFlightSceneStartTimeResponse;
}

export namespace GetFlightSceneStartTimeResponse {
  export type AsObject = {
    code: number,
    message: string,
    time: number,
  }
}

export class SwitchActiveVesselRequest extends jspb.Message {
  getVesselid(): string;
  setVesselid(value: string): SwitchActiveVesselRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SwitchActiveVesselRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SwitchActiveVesselRequest): SwitchActiveVesselRequest.AsObject;
  static serializeBinaryToWriter(message: SwitchActiveVesselRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SwitchActiveVesselRequest;
  static deserializeBinaryFromReader(message: SwitchActiveVesselRequest, reader: jspb.BinaryReader): SwitchActiveVesselRequest;
}

export namespace SwitchActiveVesselRequest {
  export type AsObject = {
    vesselid: string,
  }
}

export class SwitchActiveVesselResponse extends jspb.Message {
  getCode(): number;
  setCode(value: number): SwitchActiveVesselResponse;

  getMessage(): string;
  setMessage(value: string): SwitchActiveVesselResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SwitchActiveVesselResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SwitchActiveVesselResponse): SwitchActiveVesselResponse.AsObject;
  static serializeBinaryToWriter(message: SwitchActiveVesselResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SwitchActiveVesselResponse;
  static deserializeBinaryFromReader(message: SwitchActiveVesselResponse, reader: jspb.BinaryReader): SwitchActiveVesselResponse;
}

export namespace SwitchActiveVesselResponse {
  export type AsObject = {
    code: number,
    message: string,
  }
}

export class SearchVesselPartsByTagRequest extends jspb.Message {
  getVesselid(): string;
  setVesselid(value: string): SearchVesselPartsByTagRequest;

  getTag(): string;
  setTag(value: string): SearchVesselPartsByTagRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SearchVesselPartsByTagRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SearchVesselPartsByTagRequest): SearchVesselPartsByTagRequest.AsObject;
  static serializeBinaryToWriter(message: SearchVesselPartsByTagRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SearchVesselPartsByTagRequest;
  static deserializeBinaryFromReader(message: SearchVesselPartsByTagRequest, reader: jspb.BinaryReader): SearchVesselPartsByTagRequest;
}

export namespace SearchVesselPartsByTagRequest {
  export type AsObject = {
    vesselid: string,
    tag: string,
  }
}

export class SearchVesselPartsByTagResponse extends jspb.Message {
  getCode(): number;
  setCode(value: number): SearchVesselPartsByTagResponse;

  getMessage(): string;
  setMessage(value: string): SearchVesselPartsByTagResponse;

  getPartsList(): Array<Part>;
  setPartsList(value: Array<Part>): SearchVesselPartsByTagResponse;
  clearPartsList(): SearchVesselPartsByTagResponse;
  addParts(value?: Part, index?: number): Part;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SearchVesselPartsByTagResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SearchVesselPartsByTagResponse): SearchVesselPartsByTagResponse.AsObject;
  static serializeBinaryToWriter(message: SearchVesselPartsByTagResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SearchVesselPartsByTagResponse;
  static deserializeBinaryFromReader(message: SearchVesselPartsByTagResponse, reader: jspb.BinaryReader): SearchVesselPartsByTagResponse;
}

export namespace SearchVesselPartsByTagResponse {
  export type AsObject = {
    code: number,
    message: string,
    partsList: Array<Part.AsObject>,
  }
}

export class GetVesselPartsByTypeRequest extends jspb.Message {
  getVesselid(): string;
  setVesselid(value: string): GetVesselPartsByTypeRequest;

  getParttype(): Part.PartType;
  setParttype(value: Part.PartType): GetVesselPartsByTypeRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetVesselPartsByTypeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetVesselPartsByTypeRequest): GetVesselPartsByTypeRequest.AsObject;
  static serializeBinaryToWriter(message: GetVesselPartsByTypeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetVesselPartsByTypeRequest;
  static deserializeBinaryFromReader(message: GetVesselPartsByTypeRequest, reader: jspb.BinaryReader): GetVesselPartsByTypeRequest;
}

export namespace GetVesselPartsByTypeRequest {
  export type AsObject = {
    vesselid: string,
    parttype: Part.PartType,
  }
}

export class GetVesselPartsByTypeResponse extends jspb.Message {
  getCode(): number;
  setCode(value: number): GetVesselPartsByTypeResponse;

  getMessage(): string;
  setMessage(value: string): GetVesselPartsByTypeResponse;

  getPartsList(): Array<Part>;
  setPartsList(value: Array<Part>): GetVesselPartsByTypeResponse;
  clearPartsList(): GetVesselPartsByTypeResponse;
  addParts(value?: Part, index?: number): Part;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetVesselPartsByTypeResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetVesselPartsByTypeResponse): GetVesselPartsByTypeResponse.AsObject;
  static serializeBinaryToWriter(message: GetVesselPartsByTypeResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetVesselPartsByTypeResponse;
  static deserializeBinaryFromReader(message: GetVesselPartsByTypeResponse, reader: jspb.BinaryReader): GetVesselPartsByTypeResponse;
}

export namespace GetVesselPartsByTypeResponse {
  export type AsObject = {
    code: number,
    message: string,
    partsList: Array<Part.AsObject>,
  }
}

export class StageRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StageRequest.AsObject;
  static toObject(includeInstance: boolean, msg: StageRequest): StageRequest.AsObject;
  static serializeBinaryToWriter(message: StageRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StageRequest;
  static deserializeBinaryFromReader(message: StageRequest, reader: jspb.BinaryReader): StageRequest;
}

export namespace StageRequest {
  export type AsObject = {
  }
}

export class StageResponse extends jspb.Message {
  getCode(): number;
  setCode(value: number): StageResponse;

  getMessage(): string;
  setMessage(value: string): StageResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StageResponse.AsObject;
  static toObject(includeInstance: boolean, msg: StageResponse): StageResponse.AsObject;
  static serializeBinaryToWriter(message: StageResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StageResponse;
  static deserializeBinaryFromReader(message: StageResponse, reader: jspb.BinaryReader): StageResponse;
}

export namespace StageResponse {
  export type AsObject = {
    code: number,
    message: string,
  }
}

export class ThrottleRequest extends jspb.Message {
  getVesselid(): string;
  setVesselid(value: string): ThrottleRequest;

  getValue(): number;
  setValue(value: number): ThrottleRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ThrottleRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ThrottleRequest): ThrottleRequest.AsObject;
  static serializeBinaryToWriter(message: ThrottleRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ThrottleRequest;
  static deserializeBinaryFromReader(message: ThrottleRequest, reader: jspb.BinaryReader): ThrottleRequest;
}

export namespace ThrottleRequest {
  export type AsObject = {
    vesselid: string,
    value: number,
  }
}

export class ThrottleResponse extends jspb.Message {
  getCode(): number;
  setCode(value: number): ThrottleResponse;

  getMessage(): string;
  setMessage(value: string): ThrottleResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ThrottleResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ThrottleResponse): ThrottleResponse.AsObject;
  static serializeBinaryToWriter(message: ThrottleResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ThrottleResponse;
  static deserializeBinaryFromReader(message: ThrottleResponse, reader: jspb.BinaryReader): ThrottleResponse;
}

export namespace ThrottleResponse {
  export type AsObject = {
    code: number,
    message: string,
  }
}

export class SetSASRequest extends jspb.Message {
  getVesselid(): string;
  setVesselid(value: string): SetSASRequest;

  getEnabled(): boolean;
  setEnabled(value: boolean): SetSASRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetSASRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SetSASRequest): SetSASRequest.AsObject;
  static serializeBinaryToWriter(message: SetSASRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetSASRequest;
  static deserializeBinaryFromReader(message: SetSASRequest, reader: jspb.BinaryReader): SetSASRequest;
}

export namespace SetSASRequest {
  export type AsObject = {
    vesselid: string,
    enabled: boolean,
  }
}

export class SetSASResponse extends jspb.Message {
  getCode(): number;
  setCode(value: number): SetSASResponse;

  getMessage(): string;
  setMessage(value: string): SetSASResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetSASResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SetSASResponse): SetSASResponse.AsObject;
  static serializeBinaryToWriter(message: SetSASResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetSASResponse;
  static deserializeBinaryFromReader(message: SetSASResponse, reader: jspb.BinaryReader): SetSASResponse;
}

export namespace SetSASResponse {
  export type AsObject = {
    code: number,
    message: string,
  }
}

export class SetSASModeRequest extends jspb.Message {
  getVesselid(): string;
  setVesselid(value: string): SetSASModeRequest;

  getMode(): number;
  setMode(value: number): SetSASModeRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetSASModeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SetSASModeRequest): SetSASModeRequest.AsObject;
  static serializeBinaryToWriter(message: SetSASModeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetSASModeRequest;
  static deserializeBinaryFromReader(message: SetSASModeRequest, reader: jspb.BinaryReader): SetSASModeRequest;
}

export namespace SetSASModeRequest {
  export type AsObject = {
    vesselid: string,
    mode: number,
  }
}

export class SetSASModeResponse extends jspb.Message {
  getCode(): number;
  setCode(value: number): SetSASModeResponse;

  getMessage(): string;
  setMessage(value: string): SetSASModeResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetSASModeResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SetSASModeResponse): SetSASModeResponse.AsObject;
  static serializeBinaryToWriter(message: SetSASModeResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetSASModeResponse;
  static deserializeBinaryFromReader(message: SetSASModeResponse, reader: jspb.BinaryReader): SetSASModeResponse;
}

export namespace SetSASModeResponse {
  export type AsObject = {
    code: number,
    message: string,
  }
}

export class SetRCSRequest extends jspb.Message {
  getVesselid(): string;
  setVesselid(value: string): SetRCSRequest;

  getEnabled(): boolean;
  setEnabled(value: boolean): SetRCSRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetRCSRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SetRCSRequest): SetRCSRequest.AsObject;
  static serializeBinaryToWriter(message: SetRCSRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetRCSRequest;
  static deserializeBinaryFromReader(message: SetRCSRequest, reader: jspb.BinaryReader): SetRCSRequest;
}

export namespace SetRCSRequest {
  export type AsObject = {
    vesselid: string,
    enabled: boolean,
  }
}

export class SetRCSResponse extends jspb.Message {
  getCode(): number;
  setCode(value: number): SetRCSResponse;

  getMessage(): string;
  setMessage(value: string): SetRCSResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetRCSResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SetRCSResponse): SetRCSResponse.AsObject;
  static serializeBinaryToWriter(message: SetRCSResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetRCSResponse;
  static deserializeBinaryFromReader(message: SetRCSResponse, reader: jspb.BinaryReader): SetRCSResponse;
}

export namespace SetRCSResponse {
  export type AsObject = {
    code: number,
    message: string,
  }
}

export class SetLightsRequest extends jspb.Message {
  getVesselid(): string;
  setVesselid(value: string): SetLightsRequest;

  getEnabled(): boolean;
  setEnabled(value: boolean): SetLightsRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetLightsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SetLightsRequest): SetLightsRequest.AsObject;
  static serializeBinaryToWriter(message: SetLightsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetLightsRequest;
  static deserializeBinaryFromReader(message: SetLightsRequest, reader: jspb.BinaryReader): SetLightsRequest;
}

export namespace SetLightsRequest {
  export type AsObject = {
    vesselid: string,
    enabled: boolean,
  }
}

export class SetLightsResponse extends jspb.Message {
  getCode(): number;
  setCode(value: number): SetLightsResponse;

  getMessage(): string;
  setMessage(value: string): SetLightsResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetLightsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SetLightsResponse): SetLightsResponse.AsObject;
  static serializeBinaryToWriter(message: SetLightsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetLightsResponse;
  static deserializeBinaryFromReader(message: SetLightsResponse, reader: jspb.BinaryReader): SetLightsResponse;
}

export namespace SetLightsResponse {
  export type AsObject = {
    code: number,
    message: string,
  }
}

export class SetAntennasRequest extends jspb.Message {
  getVesselid(): string;
  setVesselid(value: string): SetAntennasRequest;

  getEnabled(): boolean;
  setEnabled(value: boolean): SetAntennasRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetAntennasRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SetAntennasRequest): SetAntennasRequest.AsObject;
  static serializeBinaryToWriter(message: SetAntennasRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetAntennasRequest;
  static deserializeBinaryFromReader(message: SetAntennasRequest, reader: jspb.BinaryReader): SetAntennasRequest;
}

export namespace SetAntennasRequest {
  export type AsObject = {
    vesselid: string,
    enabled: boolean,
  }
}

export class SetAntennasResponse extends jspb.Message {
  getCode(): number;
  setCode(value: number): SetAntennasResponse;

  getMessage(): string;
  setMessage(value: string): SetAntennasResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetAntennasResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SetAntennasResponse): SetAntennasResponse.AsObject;
  static serializeBinaryToWriter(message: SetAntennasResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetAntennasResponse;
  static deserializeBinaryFromReader(message: SetAntennasResponse, reader: jspb.BinaryReader): SetAntennasResponse;
}

export namespace SetAntennasResponse {
  export type AsObject = {
    code: number,
    message: string,
  }
}

export class ToggleActionGroupRequest extends jspb.Message {
  getVesselid(): string;
  setVesselid(value: string): ToggleActionGroupRequest;

  getGroupid(): number;
  setGroupid(value: number): ToggleActionGroupRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ToggleActionGroupRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ToggleActionGroupRequest): ToggleActionGroupRequest.AsObject;
  static serializeBinaryToWriter(message: ToggleActionGroupRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ToggleActionGroupRequest;
  static deserializeBinaryFromReader(message: ToggleActionGroupRequest, reader: jspb.BinaryReader): ToggleActionGroupRequest;
}

export namespace ToggleActionGroupRequest {
  export type AsObject = {
    vesselid: string,
    groupid: number,
  }
}

export class ToggleActionGroupResponse extends jspb.Message {
  getCode(): number;
  setCode(value: number): ToggleActionGroupResponse;

  getMessage(): string;
  setMessage(value: string): ToggleActionGroupResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ToggleActionGroupResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ToggleActionGroupResponse): ToggleActionGroupResponse.AsObject;
  static serializeBinaryToWriter(message: ToggleActionGroupResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ToggleActionGroupResponse;
  static deserializeBinaryFromReader(message: ToggleActionGroupResponse, reader: jspb.BinaryReader): ToggleActionGroupResponse;
}

export namespace ToggleActionGroupResponse {
  export type AsObject = {
    code: number,
    message: string,
  }
}

export class SetSolarPanelsRequest extends jspb.Message {
  getVesselid(): string;
  setVesselid(value: string): SetSolarPanelsRequest;

  getEnabled(): boolean;
  setEnabled(value: boolean): SetSolarPanelsRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetSolarPanelsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SetSolarPanelsRequest): SetSolarPanelsRequest.AsObject;
  static serializeBinaryToWriter(message: SetSolarPanelsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetSolarPanelsRequest;
  static deserializeBinaryFromReader(message: SetSolarPanelsRequest, reader: jspb.BinaryReader): SetSolarPanelsRequest;
}

export namespace SetSolarPanelsRequest {
  export type AsObject = {
    vesselid: string,
    enabled: boolean,
  }
}

export class SetSolarPanelsResponse extends jspb.Message {
  getCode(): number;
  setCode(value: number): SetSolarPanelsResponse;

  getMessage(): string;
  setMessage(value: string): SetSolarPanelsResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetSolarPanelsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SetSolarPanelsResponse): SetSolarPanelsResponse.AsObject;
  static serializeBinaryToWriter(message: SetSolarPanelsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetSolarPanelsResponse;
  static deserializeBinaryFromReader(message: SetSolarPanelsResponse, reader: jspb.BinaryReader): SetSolarPanelsResponse;
}

export namespace SetSolarPanelsResponse {
  export type AsObject = {
    code: number,
    message: string,
  }
}

export class SetHeadingRequest extends jspb.Message {
  getVesselid(): string;
  setVesselid(value: string): SetHeadingRequest;

  getPitch(): number;
  setPitch(value: number): SetHeadingRequest;

  getYaw(): number;
  setYaw(value: number): SetHeadingRequest;

  getStablefirst(): boolean;
  setStablefirst(value: boolean): SetHeadingRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetHeadingRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SetHeadingRequest): SetHeadingRequest.AsObject;
  static serializeBinaryToWriter(message: SetHeadingRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetHeadingRequest;
  static deserializeBinaryFromReader(message: SetHeadingRequest, reader: jspb.BinaryReader): SetHeadingRequest;
}

export namespace SetHeadingRequest {
  export type AsObject = {
    vesselid: string,
    pitch: number,
    yaw: number,
    stablefirst: boolean,
  }
}

export class SetHeadingResponse extends jspb.Message {
  getCode(): number;
  setCode(value: number): SetHeadingResponse;

  getMessage(): string;
  setMessage(value: string): SetHeadingResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetHeadingResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SetHeadingResponse): SetHeadingResponse.AsObject;
  static serializeBinaryToWriter(message: SetHeadingResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetHeadingResponse;
  static deserializeBinaryFromReader(message: SetHeadingResponse, reader: jspb.BinaryReader): SetHeadingResponse;
}

export namespace SetHeadingResponse {
  export type AsObject = {
    code: number,
    message: string,
  }
}

export class SetHeadingRollFirstRequest extends jspb.Message {
  getVesselid(): string;
  setVesselid(value: string): SetHeadingRollFirstRequest;

  getPitch(): number;
  setPitch(value: number): SetHeadingRollFirstRequest;

  getYaw(): number;
  setYaw(value: number): SetHeadingRollFirstRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetHeadingRollFirstRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SetHeadingRollFirstRequest): SetHeadingRollFirstRequest.AsObject;
  static serializeBinaryToWriter(message: SetHeadingRollFirstRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetHeadingRollFirstRequest;
  static deserializeBinaryFromReader(message: SetHeadingRollFirstRequest, reader: jspb.BinaryReader): SetHeadingRollFirstRequest;
}

export namespace SetHeadingRollFirstRequest {
  export type AsObject = {
    vesselid: string,
    pitch: number,
    yaw: number,
  }
}

export class SetHeadingRollFirstResponse extends jspb.Message {
  getCode(): number;
  setCode(value: number): SetHeadingRollFirstResponse;

  getMessage(): string;
  setMessage(value: string): SetHeadingRollFirstResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetHeadingRollFirstResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SetHeadingRollFirstResponse): SetHeadingRollFirstResponse.AsObject;
  static serializeBinaryToWriter(message: SetHeadingRollFirstResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetHeadingRollFirstResponse;
  static deserializeBinaryFromReader(message: SetHeadingRollFirstResponse, reader: jspb.BinaryReader): SetHeadingRollFirstResponse;
}

export namespace SetHeadingRollFirstResponse {
  export type AsObject = {
    code: number,
    message: string,
  }
}

export class SetOrientationRequest extends jspb.Message {
  getVesselid(): string;
  setVesselid(value: string): SetOrientationRequest;

  getPitch(): number;
  setPitch(value: number): SetOrientationRequest;

  getYaw(): number;
  setYaw(value: number): SetOrientationRequest;

  getRoll(): number;
  setRoll(value: number): SetOrientationRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetOrientationRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SetOrientationRequest): SetOrientationRequest.AsObject;
  static serializeBinaryToWriter(message: SetOrientationRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetOrientationRequest;
  static deserializeBinaryFromReader(message: SetOrientationRequest, reader: jspb.BinaryReader): SetOrientationRequest;
}

export namespace SetOrientationRequest {
  export type AsObject = {
    vesselid: string,
    pitch: number,
    yaw: number,
    roll: number,
  }
}

export class SetOrientationResponse extends jspb.Message {
  getCode(): number;
  setCode(value: number): SetOrientationResponse;

  getMessage(): string;
  setMessage(value: string): SetOrientationResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetOrientationResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SetOrientationResponse): SetOrientationResponse.AsObject;
  static serializeBinaryToWriter(message: SetOrientationResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetOrientationResponse;
  static deserializeBinaryFromReader(message: SetOrientationResponse, reader: jspb.BinaryReader): SetOrientationResponse;
}

export namespace SetOrientationResponse {
  export type AsObject = {
    code: number,
    message: string,
  }
}

export class SetOrientationRollFirstRequest extends jspb.Message {
  getVesselid(): string;
  setVesselid(value: string): SetOrientationRollFirstRequest;

  getPitch(): number;
  setPitch(value: number): SetOrientationRollFirstRequest;

  getYaw(): number;
  setYaw(value: number): SetOrientationRollFirstRequest;

  getRoll(): number;
  setRoll(value: number): SetOrientationRollFirstRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetOrientationRollFirstRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SetOrientationRollFirstRequest): SetOrientationRollFirstRequest.AsObject;
  static serializeBinaryToWriter(message: SetOrientationRollFirstRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetOrientationRollFirstRequest;
  static deserializeBinaryFromReader(message: SetOrientationRollFirstRequest, reader: jspb.BinaryReader): SetOrientationRollFirstRequest;
}

export namespace SetOrientationRollFirstRequest {
  export type AsObject = {
    vesselid: string,
    pitch: number,
    yaw: number,
    roll: number,
  }
}

export class SetOrientationRollFirstResponse extends jspb.Message {
  getCode(): number;
  setCode(value: number): SetOrientationRollFirstResponse;

  getMessage(): string;
  setMessage(value: string): SetOrientationRollFirstResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetOrientationRollFirstResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SetOrientationRollFirstResponse): SetOrientationRollFirstResponse.AsObject;
  static serializeBinaryToWriter(message: SetOrientationRollFirstResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetOrientationRollFirstResponse;
  static deserializeBinaryFromReader(message: SetOrientationRollFirstResponse, reader: jspb.BinaryReader): SetOrientationRollFirstResponse;
}

export namespace SetOrientationRollFirstResponse {
  export type AsObject = {
    code: number,
    message: string,
  }
}

export class DisengageAutoPilotRequest extends jspb.Message {
  getVesselid(): string;
  setVesselid(value: string): DisengageAutoPilotRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DisengageAutoPilotRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DisengageAutoPilotRequest): DisengageAutoPilotRequest.AsObject;
  static serializeBinaryToWriter(message: DisengageAutoPilotRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DisengageAutoPilotRequest;
  static deserializeBinaryFromReader(message: DisengageAutoPilotRequest, reader: jspb.BinaryReader): DisengageAutoPilotRequest;
}

export namespace DisengageAutoPilotRequest {
  export type AsObject = {
    vesselid: string,
  }
}

export class DisengageAutoPilotResponse extends jspb.Message {
  getCode(): number;
  setCode(value: number): DisengageAutoPilotResponse;

  getMessage(): string;
  setMessage(value: string): DisengageAutoPilotResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DisengageAutoPilotResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DisengageAutoPilotResponse): DisengageAutoPilotResponse.AsObject;
  static serializeBinaryToWriter(message: DisengageAutoPilotResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DisengageAutoPilotResponse;
  static deserializeBinaryFromReader(message: DisengageAutoPilotResponse, reader: jspb.BinaryReader): DisengageAutoPilotResponse;
}

export namespace DisengageAutoPilotResponse {
  export type AsObject = {
    code: number,
    message: string,
  }
}

export class Request extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Request.AsObject;
  static toObject(includeInstance: boolean, msg: Request): Request.AsObject;
  static serializeBinaryToWriter(message: Request, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Request;
  static deserializeBinaryFromReader(message: Request, reader: jspb.BinaryReader): Request;
}

export namespace Request {
  export type AsObject = {
  }
}

export class Response extends jspb.Message {
  getCode(): number;
  setCode(value: number): Response;

  getMessage(): string;
  setMessage(value: string): Response;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Response.AsObject;
  static toObject(includeInstance: boolean, msg: Response): Response.AsObject;
  static serializeBinaryToWriter(message: Response, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Response;
  static deserializeBinaryFromReader(message: Response, reader: jspb.BinaryReader): Response;
}

export namespace Response {
  export type AsObject = {
    code: number,
    message: string,
  }
}

export class Wheel extends jspb.Message {
  getType(): observor_pb.WheelSnapshot.WheelType;
  setType(value: observor_pb.WheelSnapshot.WheelType): Wheel;

  getState(): observor_pb.WheelSnapshot.WheelState;
  setState(value: observor_pb.WheelSnapshot.WheelState): Wheel;

  getRadius(): number;
  setRadius(value: number): Wheel;

  getGrounded(): boolean;
  setGrounded(value: boolean): Wheel;

  getHasbrakes(): boolean;
  setHasbrakes(value: boolean): Wheel;

  getBrakeforce(): number;
  setBrakeforce(value: number): Wheel;

  getAutofrictioncontrol(): boolean;
  setAutofrictioncontrol(value: boolean): Wheel;

  getManualfrictioncontrol(): number;
  setManualfrictioncontrol(value: number): Wheel;

  getDeployable(): boolean;
  setDeployable(value: boolean): Wheel;

  getDeployed(): boolean;
  setDeployed(value: boolean): Wheel;

  getPowered(): boolean;
  setPowered(value: boolean): Wheel;

  getMotorenabled(): boolean;
  setMotorenabled(value: boolean): Wheel;

  getMotorinverted(): boolean;
  setMotorinverted(value: boolean): Wheel;

  getMotorstate(): observor_pb.WheelSnapshot.MotorState;
  setMotorstate(value: observor_pb.WheelSnapshot.MotorState): Wheel;

  getMotoroutput(): number;
  setMotoroutput(value: number): Wheel;

  getTractioncontrolenabled(): boolean;
  setTractioncontrolenabled(value: boolean): Wheel;

  getTractioncontrol(): number;
  setTractioncontrol(value: number): Wheel;

  getDrivelimiter(): number;
  setDrivelimiter(value: number): Wheel;

  getSteerable(): boolean;
  setSteerable(value: boolean): Wheel;

  getSteeringenabled(): boolean;
  setSteeringenabled(value: boolean): Wheel;

  getSteeringinverted(): boolean;
  setSteeringinverted(value: boolean): Wheel;

  getHassuspension(): boolean;
  setHassuspension(value: boolean): Wheel;

  getSuspensionspringstrength(): number;
  setSuspensionspringstrength(value: number): Wheel;

  getSuspensiondamperstrength(): number;
  setSuspensiondamperstrength(value: number): Wheel;

  getBroken(): boolean;
  setBroken(value: boolean): Wheel;

  getRepairable(): boolean;
  setRepairable(value: boolean): Wheel;

  getStress(): number;
  setStress(value: number): Wheel;

  getStresstolerance(): number;
  setStresstolerance(value: number): Wheel;

  getStresspercentage(): number;
  setStresspercentage(value: number): Wheel;

  getDeflection(): number;
  setDeflection(value: number): Wheel;

  getSlip(): number;
  setSlip(value: number): Wheel;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Wheel.AsObject;
  static toObject(includeInstance: boolean, msg: Wheel): Wheel.AsObject;
  static serializeBinaryToWriter(message: Wheel, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Wheel;
  static deserializeBinaryFromReader(message: Wheel, reader: jspb.BinaryReader): Wheel;
}

export namespace Wheel {
  export type AsObject = {
    type: observor_pb.WheelSnapshot.WheelType,
    state: observor_pb.WheelSnapshot.WheelState,
    radius: number,
    grounded: boolean,
    hasbrakes: boolean,
    brakeforce: number,
    autofrictioncontrol: boolean,
    manualfrictioncontrol: number,
    deployable: boolean,
    deployed: boolean,
    powered: boolean,
    motorenabled: boolean,
    motorinverted: boolean,
    motorstate: observor_pb.WheelSnapshot.MotorState,
    motoroutput: number,
    tractioncontrolenabled: boolean,
    tractioncontrol: number,
    drivelimiter: number,
    steerable: boolean,
    steeringenabled: boolean,
    steeringinverted: boolean,
    hassuspension: boolean,
    suspensionspringstrength: number,
    suspensiondamperstrength: number,
    broken: boolean,
    repairable: boolean,
    stress: number,
    stresstolerance: number,
    stresspercentage: number,
    deflection: number,
    slip: number,
  }
}

export class SolarPanel extends jspb.Message {
  getState(): observor_pb.SolarPanelSnapshot.SolarPanelState;
  setState(value: observor_pb.SolarPanelSnapshot.SolarPanelState): SolarPanel;

  getDeployable(): boolean;
  setDeployable(value: boolean): SolarPanel;

  getDeployed(): boolean;
  setDeployed(value: boolean): SolarPanel;

  getEnergyflow(): number;
  setEnergyflow(value: number): SolarPanel;

  getSunexposure(): number;
  setSunexposure(value: number): SolarPanel;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SolarPanel.AsObject;
  static toObject(includeInstance: boolean, msg: SolarPanel): SolarPanel.AsObject;
  static serializeBinaryToWriter(message: SolarPanel, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SolarPanel;
  static deserializeBinaryFromReader(message: SolarPanel, reader: jspb.BinaryReader): SolarPanel;
}

export namespace SolarPanel {
  export type AsObject = {
    state: observor_pb.SolarPanelSnapshot.SolarPanelState,
    deployable: boolean,
    deployed: boolean,
    energyflow: number,
    sunexposure: number,
  }
}

export class Sensor extends jspb.Message {
  getActivated(): boolean;
  setActivated(value: boolean): Sensor;

  getReading(): string;
  setReading(value: string): Sensor;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Sensor.AsObject;
  static toObject(includeInstance: boolean, msg: Sensor): Sensor.AsObject;
  static serializeBinaryToWriter(message: Sensor, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Sensor;
  static deserializeBinaryFromReader(message: Sensor, reader: jspb.BinaryReader): Sensor;
}

export namespace Sensor {
  export type AsObject = {
    activated: boolean,
    reading: string,
  }
}

export class ResourceHarvester extends jspb.Message {
  getState(): observor_pb.ResourceHarvesterSnapshot.ResourceHarvesterState;
  setState(value: observor_pb.ResourceHarvesterSnapshot.ResourceHarvesterState): ResourceHarvester;

  getDeployed(): boolean;
  setDeployed(value: boolean): ResourceHarvester;

  getActivated(): boolean;
  setActivated(value: boolean): ResourceHarvester;

  getExtractionrate(): number;
  setExtractionrate(value: number): ResourceHarvester;

  getThermalefficiency(): number;
  setThermalefficiency(value: number): ResourceHarvester;

  getCoretemperature(): number;
  setCoretemperature(value: number): ResourceHarvester;

  getOptimumcoretemperature(): number;
  setOptimumcoretemperature(value: number): ResourceHarvester;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ResourceHarvester.AsObject;
  static toObject(includeInstance: boolean, msg: ResourceHarvester): ResourceHarvester.AsObject;
  static serializeBinaryToWriter(message: ResourceHarvester, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ResourceHarvester;
  static deserializeBinaryFromReader(message: ResourceHarvester, reader: jspb.BinaryReader): ResourceHarvester;
}

export namespace ResourceHarvester {
  export type AsObject = {
    state: observor_pb.ResourceHarvesterSnapshot.ResourceHarvesterState,
    deployed: boolean,
    activated: boolean,
    extractionrate: number,
    thermalefficiency: number,
    coretemperature: number,
    optimumcoretemperature: number,
  }
}

export class ConverterResource extends jspb.Message {
  getResourcename(): string;
  setResourcename(value: string): ConverterResource;

  getRatio(): number;
  setRatio(value: number): ConverterResource;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConverterResource.AsObject;
  static toObject(includeInstance: boolean, msg: ConverterResource): ConverterResource.AsObject;
  static serializeBinaryToWriter(message: ConverterResource, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConverterResource;
  static deserializeBinaryFromReader(message: ConverterResource, reader: jspb.BinaryReader): ConverterResource;
}

export namespace ConverterResource {
  export type AsObject = {
    resourcename: string,
    ratio: number,
  }
}

export class Converter extends jspb.Message {
  getState(): observor_pb.ConverterSnapshot.ResourceConverterState;
  setState(value: observor_pb.ConverterSnapshot.ResourceConverterState): Converter;

  getName(): string;
  setName(value: string): Converter;

  getActive(): boolean;
  setActive(value: boolean): Converter;

  getStatus(): string;
  setStatus(value: string): Converter;

  getThermalefficiency(): number;
  setThermalefficiency(value: number): Converter;

  getCoretemperature(): number;
  setCoretemperature(value: number): Converter;

  getOptimumcoretemperature(): number;
  setOptimumcoretemperature(value: number): Converter;

  getInputsList(): Array<ConverterResource>;
  setInputsList(value: Array<ConverterResource>): Converter;
  clearInputsList(): Converter;
  addInputs(value?: ConverterResource, index?: number): ConverterResource;

  getOutputsList(): Array<ConverterResource>;
  setOutputsList(value: Array<ConverterResource>): Converter;
  clearOutputsList(): Converter;
  addOutputs(value?: ConverterResource, index?: number): ConverterResource;

  getRequirementsList(): Array<ConverterResource>;
  setRequirementsList(value: Array<ConverterResource>): Converter;
  clearRequirementsList(): Converter;
  addRequirements(value?: ConverterResource, index?: number): ConverterResource;

  getIndex(): number;
  setIndex(value: number): Converter;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Converter.AsObject;
  static toObject(includeInstance: boolean, msg: Converter): Converter.AsObject;
  static serializeBinaryToWriter(message: Converter, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Converter;
  static deserializeBinaryFromReader(message: Converter, reader: jspb.BinaryReader): Converter;
}

export namespace Converter {
  export type AsObject = {
    state: observor_pb.ConverterSnapshot.ResourceConverterState,
    name: string,
    active: boolean,
    status: string,
    thermalefficiency: number,
    coretemperature: number,
    optimumcoretemperature: number,
    inputsList: Array<ConverterResource.AsObject>,
    outputsList: Array<ConverterResource.AsObject>,
    requirementsList: Array<ConverterResource.AsObject>,
    index: number,
  }
}

export class ResourceConverter extends jspb.Message {
  getConvertersList(): Array<Converter>;
  setConvertersList(value: Array<Converter>): ResourceConverter;
  clearConvertersList(): ResourceConverter;
  addConverters(value?: Converter, index?: number): Converter;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ResourceConverter.AsObject;
  static toObject(includeInstance: boolean, msg: ResourceConverter): ResourceConverter.AsObject;
  static serializeBinaryToWriter(message: ResourceConverter, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ResourceConverter;
  static deserializeBinaryFromReader(message: ResourceConverter, reader: jspb.BinaryReader): ResourceConverter;
}

export namespace ResourceConverter {
  export type AsObject = {
    convertersList: Array<Converter.AsObject>,
  }
}

export class ReactionWheel extends jspb.Message {
  getState(): observor_pb.ReactionWheelSnapshot.ReactionWheelState;
  setState(value: observor_pb.ReactionWheelSnapshot.ReactionWheelState): ReactionWheel;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ReactionWheel.AsObject;
  static toObject(includeInstance: boolean, msg: ReactionWheel): ReactionWheel.AsObject;
  static serializeBinaryToWriter(message: ReactionWheel, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ReactionWheel;
  static deserializeBinaryFromReader(message: ReactionWheel, reader: jspb.BinaryReader): ReactionWheel;
}

export namespace ReactionWheel {
  export type AsObject = {
    state: observor_pb.ReactionWheelSnapshot.ReactionWheelState,
  }
}

export class RCS extends jspb.Message {
  getEnabled(): boolean;
  setEnabled(value: boolean): RCS;

  getPitchenabled(): boolean;
  setPitchenabled(value: boolean): RCS;

  getYawenabled(): boolean;
  setYawenabled(value: boolean): RCS;

  getRollenabled(): boolean;
  setRollenabled(value: boolean): RCS;

  getUpenabled(): boolean;
  setUpenabled(value: boolean): RCS;

  getForwardenabled(): boolean;
  setForwardenabled(value: boolean): RCS;

  getRightenabled(): boolean;
  setRightenabled(value: boolean): RCS;

  getHasfuel(): boolean;
  setHasfuel(value: boolean): RCS;

  getPropellantnamesList(): Array<string>;
  setPropellantnamesList(value: Array<string>): RCS;
  clearPropellantnamesList(): RCS;
  addPropellantnames(value: string, index?: number): RCS;

  getPropellantsMap(): jspb.Map<string, observor_pb.Propellant>;
  clearPropellantsMap(): RCS;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RCS.AsObject;
  static toObject(includeInstance: boolean, msg: RCS): RCS.AsObject;
  static serializeBinaryToWriter(message: RCS, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RCS;
  static deserializeBinaryFromReader(message: RCS, reader: jspb.BinaryReader): RCS;
}

export namespace RCS {
  export type AsObject = {
    enabled: boolean,
    pitchenabled: boolean,
    yawenabled: boolean,
    rollenabled: boolean,
    upenabled: boolean,
    forwardenabled: boolean,
    rightenabled: boolean,
    hasfuel: boolean,
    propellantnamesList: Array<string>,
    propellantsMap: Array<[string, observor_pb.Propellant.AsObject]>,
  }
}

export class Radiator extends jspb.Message {
  getState(): observor_pb.RadiatorSnapshot.RadiatorState;
  setState(value: observor_pb.RadiatorSnapshot.RadiatorState): Radiator;

  getDeployable(): boolean;
  setDeployable(value: boolean): Radiator;

  getDeployed(): boolean;
  setDeployed(value: boolean): Radiator;

  getCooling(): boolean;
  setCooling(value: boolean): Radiator;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Radiator.AsObject;
  static toObject(includeInstance: boolean, msg: Radiator): Radiator.AsObject;
  static serializeBinaryToWriter(message: Radiator, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Radiator;
  static deserializeBinaryFromReader(message: Radiator, reader: jspb.BinaryReader): Radiator;
}

export namespace Radiator {
  export type AsObject = {
    state: observor_pb.RadiatorSnapshot.RadiatorState,
    deployable: boolean,
    deployed: boolean,
    cooling: boolean,
  }
}

export class Parachute extends jspb.Message {
  getState(): observor_pb.ParachuteSnapshot.ParachuteState;
  setState(value: observor_pb.ParachuteSnapshot.ParachuteState): Parachute;

  getDeployed(): boolean;
  setDeployed(value: boolean): Parachute;

  getDeployaltitude(): number;
  setDeployaltitude(value: number): Parachute;

  getDeployminpressure(): number;
  setDeployminpressure(value: number): Parachute;

  getDeploymentsafestate(): observor_pb.ParachuteSnapshot.DeploymentSafeState;
  setDeploymentsafestate(value: observor_pb.ParachuteSnapshot.DeploymentSafeState): Parachute;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Parachute.AsObject;
  static toObject(includeInstance: boolean, msg: Parachute): Parachute.AsObject;
  static serializeBinaryToWriter(message: Parachute, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Parachute;
  static deserializeBinaryFromReader(message: Parachute, reader: jspb.BinaryReader): Parachute;
}

export namespace Parachute {
  export type AsObject = {
    state: observor_pb.ParachuteSnapshot.ParachuteState,
    deployed: boolean,
    deployaltitude: number,
    deployminpressure: number,
    deploymentsafestate: observor_pb.ParachuteSnapshot.DeploymentSafeState,
  }
}

export class Light extends jspb.Message {
  getOn(): boolean;
  setOn(value: boolean): Light;

  getPowerusage(): number;
  setPowerusage(value: number): Light;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Light.AsObject;
  static toObject(includeInstance: boolean, msg: Light): Light.AsObject;
  static serializeBinaryToWriter(message: Light, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Light;
  static deserializeBinaryFromReader(message: Light, reader: jspb.BinaryReader): Light;
}

export namespace Light {
  export type AsObject = {
    on: boolean,
    powerusage: number,
  }
}

export class Leg extends jspb.Message {
  getState(): observor_pb.LegSnapshot.LegState;
  setState(value: observor_pb.LegSnapshot.LegState): Leg;

  getDeployable(): boolean;
  setDeployable(value: boolean): Leg;

  getDeployed(): boolean;
  setDeployed(value: boolean): Leg;

  getGrounded(): boolean;
  setGrounded(value: boolean): Leg;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Leg.AsObject;
  static toObject(includeInstance: boolean, msg: Leg): Leg.AsObject;
  static serializeBinaryToWriter(message: Leg, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Leg;
  static deserializeBinaryFromReader(message: Leg, reader: jspb.BinaryReader): Leg;
}

export namespace Leg {
  export type AsObject = {
    state: observor_pb.LegSnapshot.LegState,
    deployable: boolean,
    deployed: boolean,
    grounded: boolean,
  }
}

export class Intake extends jspb.Message {
  getOpen(): boolean;
  setOpen(value: boolean): Intake;

  getSpeed(): number;
  setSpeed(value: number): Intake;

  getFlow(): number;
  setFlow(value: number): Intake;

  getArea(): number;
  setArea(value: number): Intake;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Intake.AsObject;
  static toObject(includeInstance: boolean, msg: Intake): Intake.AsObject;
  static serializeBinaryToWriter(message: Intake, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Intake;
  static deserializeBinaryFromReader(message: Intake, reader: jspb.BinaryReader): Intake;
}

export namespace Intake {
  export type AsObject = {
    open: boolean,
    speed: number,
    flow: number,
    area: number,
  }
}

export class Fairing extends jspb.Message {
  getJettisoned(): boolean;
  setJettisoned(value: boolean): Fairing;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Fairing.AsObject;
  static toObject(includeInstance: boolean, msg: Fairing): Fairing.AsObject;
  static serializeBinaryToWriter(message: Fairing, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Fairing;
  static deserializeBinaryFromReader(message: Fairing, reader: jspb.BinaryReader): Fairing;
}

export namespace Fairing {
  export type AsObject = {
    jettisoned: boolean,
  }
}

export class Engine extends jspb.Message {
  getActive(): boolean;
  setActive(value: boolean): Engine;

  getThrust(): number;
  setThrust(value: number): Engine;

  getMaxvacuumthrust(): number;
  setMaxvacuumthrust(value: number): Engine;

  getThrustpercentage(): number;
  setThrustpercentage(value: number): Engine;

  getSpecificimpulse(): number;
  setSpecificimpulse(value: number): Engine;

  getVacuumspecificimpulse(): number;
  setVacuumspecificimpulse(value: number): Engine;

  getKerbinsealevelspecificimpulse(): number;
  setKerbinsealevelspecificimpulse(value: number): Engine;

  getPropellantnamesList(): Array<string>;
  setPropellantnamesList(value: Array<string>): Engine;
  clearPropellantnamesList(): Engine;
  addPropellantnames(value: string, index?: number): Engine;

  getPropellantsMap(): jspb.Map<string, observor_pb.Propellant>;
  clearPropellantsMap(): Engine;

  getHasfuel(): boolean;
  setHasfuel(value: boolean): Engine;

  getThrottle(): number;
  setThrottle(value: number): Engine;

  getThrottlelocked(): boolean;
  setThrottlelocked(value: boolean): Engine;

  getCanrestart(): boolean;
  setCanrestart(value: boolean): Engine;

  getCanshutdown(): boolean;
  setCanshutdown(value: boolean): Engine;

  getHasmodes(): boolean;
  setHasmodes(value: boolean): Engine;

  getAutoswitchmode(): boolean;
  setAutoswitchmode(value: boolean): Engine;

  getMode(): string;
  setMode(value: string): Engine;

  getModesList(): Array<string>;
  setModesList(value: Array<string>): Engine;
  clearModesList(): Engine;
  addModes(value: string, index?: number): Engine;

  getGimballed(): boolean;
  setGimballed(value: boolean): Engine;

  getGimbalrange(): number;
  setGimbalrange(value: number): Engine;

  getGimballocked(): boolean;
  setGimballocked(value: boolean): Engine;

  getGimballimit(): number;
  setGimballimit(value: number): Engine;

  getFlameout(): boolean;
  setFlameout(value: boolean): Engine;

  getElectricitychargerate(): number;
  setElectricitychargerate(value: number): Engine;

  getRemainingignitions(): number;
  setRemainingignitions(value: number): Engine;

  getIgnitions(): number;
  setIgnitions(value: number): Engine;

  getActualthrottle(): number;
  setActualthrottle(value: number): Engine;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Engine.AsObject;
  static toObject(includeInstance: boolean, msg: Engine): Engine.AsObject;
  static serializeBinaryToWriter(message: Engine, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Engine;
  static deserializeBinaryFromReader(message: Engine, reader: jspb.BinaryReader): Engine;
}

export namespace Engine {
  export type AsObject = {
    active: boolean,
    thrust: number,
    maxvacuumthrust: number,
    thrustpercentage: number,
    specificimpulse: number,
    vacuumspecificimpulse: number,
    kerbinsealevelspecificimpulse: number,
    propellantnamesList: Array<string>,
    propellantsMap: Array<[string, observor_pb.Propellant.AsObject]>,
    hasfuel: boolean,
    throttle: number,
    throttlelocked: boolean,
    canrestart: boolean,
    canshutdown: boolean,
    hasmodes: boolean,
    autoswitchmode: boolean,
    mode: string,
    modesList: Array<string>,
    gimballed: boolean,
    gimbalrange: number,
    gimballocked: boolean,
    gimballimit: number,
    flameout: boolean,
    electricitychargerate: number,
    remainingignitions: number,
    ignitions: number,
    actualthrottle: number,
  }
}

export class DockingPort extends jspb.Message {
  getState(): observor_pb.DockingPortSnapshot.DockingPortState;
  setState(value: observor_pb.DockingPortSnapshot.DockingPortState): DockingPort;

  getHasshield(): boolean;
  setHasshield(value: boolean): DockingPort;

  getShieled(): boolean;
  setShieled(value: boolean): DockingPort;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DockingPort.AsObject;
  static toObject(includeInstance: boolean, msg: DockingPort): DockingPort.AsObject;
  static serializeBinaryToWriter(message: DockingPort, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DockingPort;
  static deserializeBinaryFromReader(message: DockingPort, reader: jspb.BinaryReader): DockingPort;
}

export namespace DockingPort {
  export type AsObject = {
    state: observor_pb.DockingPortSnapshot.DockingPortState,
    hasshield: boolean,
    shieled: boolean,
  }
}

export class Decoupler extends jspb.Message {
  getDecoupled(): boolean;
  setDecoupled(value: boolean): Decoupler;

  getStagingenabled(): boolean;
  setStagingenabled(value: boolean): Decoupler;

  getEjectionforce(): number;
  setEjectionforce(value: number): Decoupler;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Decoupler.AsObject;
  static toObject(includeInstance: boolean, msg: Decoupler): Decoupler.AsObject;
  static serializeBinaryToWriter(message: Decoupler, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Decoupler;
  static deserializeBinaryFromReader(message: Decoupler, reader: jspb.BinaryReader): Decoupler;
}

export namespace Decoupler {
  export type AsObject = {
    decoupled: boolean,
    stagingenabled: boolean,
    ejectionforce: number,
  }
}

export class ControlSurface extends jspb.Message {
  getPitchenabled(): boolean;
  setPitchenabled(value: boolean): ControlSurface;

  getYawenabled(): boolean;
  setYawenabled(value: boolean): ControlSurface;

  getRollenabled(): boolean;
  setRollenabled(value: boolean): ControlSurface;

  getAuthoritylimiter(): number;
  setAuthoritylimiter(value: number): ControlSurface;

  getInverted(): boolean;
  setInverted(value: boolean): ControlSurface;

  getDeployed(): boolean;
  setDeployed(value: boolean): ControlSurface;

  getSurfacearea(): number;
  setSurfacearea(value: number): ControlSurface;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ControlSurface.AsObject;
  static toObject(includeInstance: boolean, msg: ControlSurface): ControlSurface.AsObject;
  static serializeBinaryToWriter(message: ControlSurface, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ControlSurface;
  static deserializeBinaryFromReader(message: ControlSurface, reader: jspb.BinaryReader): ControlSurface;
}

export namespace ControlSurface {
  export type AsObject = {
    pitchenabled: boolean,
    yawenabled: boolean,
    rollenabled: boolean,
    authoritylimiter: number,
    inverted: boolean,
    deployed: boolean,
    surfacearea: number,
  }
}

export class CargoBay extends jspb.Message {
  getState(): observor_pb.CargoBaySnapshot.CargoBayState;
  setState(value: observor_pb.CargoBaySnapshot.CargoBayState): CargoBay;

  getDeploypercent(): number;
  setDeploypercent(value: number): CargoBay;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CargoBay.AsObject;
  static toObject(includeInstance: boolean, msg: CargoBay): CargoBay.AsObject;
  static serializeBinaryToWriter(message: CargoBay, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CargoBay;
  static deserializeBinaryFromReader(message: CargoBay, reader: jspb.BinaryReader): CargoBay;
}

export namespace CargoBay {
  export type AsObject = {
    state: observor_pb.CargoBaySnapshot.CargoBayState,
    deploypercent: number,
  }
}

export class Antenna extends jspb.Message {
  getState(): observor_pb.AntennaSnapshot.AntennaState;
  setState(value: observor_pb.AntennaSnapshot.AntennaState): Antenna;

  getCantransmit(): boolean;
  setCantransmit(value: boolean): Antenna;

  getAllowpartial(): boolean;
  setAllowpartial(value: boolean): Antenna;

  getPower(): number;
  setPower(value: number): Antenna;

  getCombinable(): boolean;
  setCombinable(value: boolean): Antenna;

  getCombinableexponent(): number;
  setCombinableexponent(value: number): Antenna;

  getPacketinterval(): number;
  setPacketinterval(value: number): Antenna;

  getPacketsize(): number;
  setPacketsize(value: number): Antenna;

  getPacketresourcecost(): number;
  setPacketresourcecost(value: number): Antenna;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Antenna.AsObject;
  static toObject(includeInstance: boolean, msg: Antenna): Antenna.AsObject;
  static serializeBinaryToWriter(message: Antenna, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Antenna;
  static deserializeBinaryFromReader(message: Antenna, reader: jspb.BinaryReader): Antenna;
}

export namespace Antenna {
  export type AsObject = {
    state: observor_pb.AntennaSnapshot.AntennaState,
    cantransmit: boolean,
    allowpartial: boolean,
    power: number,
    combinable: boolean,
    combinableexponent: number,
    packetinterval: number,
    packetsize: number,
    packetresourcecost: number,
  }
}

export class Resource extends jspb.Message {
  getName(): string;
  setName(value: string): Resource;

  getCapacity(): number;
  setCapacity(value: number): Resource;

  getAmount(): number;
  setAmount(value: number): Resource;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Resource.AsObject;
  static toObject(includeInstance: boolean, msg: Resource): Resource.AsObject;
  static serializeBinaryToWriter(message: Resource, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Resource;
  static deserializeBinaryFromReader(message: Resource, reader: jspb.BinaryReader): Resource;
}

export namespace Resource {
  export type AsObject = {
    name: string,
    capacity: number,
    amount: number,
  }
}

export class Resources extends jspb.Message {
  getResourcesList(): Array<Resource>;
  setResourcesList(value: Array<Resource>): Resources;
  clearResourcesList(): Resources;
  addResources(value?: Resource, index?: number): Resource;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Resources.AsObject;
  static toObject(includeInstance: boolean, msg: Resources): Resources.AsObject;
  static serializeBinaryToWriter(message: Resources, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Resources;
  static deserializeBinaryFromReader(message: Resources, reader: jspb.BinaryReader): Resources;
}

export namespace Resources {
  export type AsObject = {
    resourcesList: Array<Resource.AsObject>,
  }
}

export class Command extends jspb.Message {
  getRequirespilot(): boolean;
  setRequirespilot(value: boolean): Command;

  getSignalstrengthlevel(): Command.SignalStrengthLevel;
  setSignalstrengthlevel(value: Command.SignalStrengthLevel): Command;

  getSignalstrength(): number;
  setSignalstrength(value: number): Command;

  getMinimumcrew(): number;
  setMinimumcrew(value: number): Command;

  getVesselcontrolstate(): Command.VesselControlState;
  setVesselcontrolstate(value: Command.VesselControlState): Command;

  getModulecontrolstate(): Command.ModuleControlState;
  setModulecontrolstate(value: Command.ModuleControlState): Command;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Command.AsObject;
  static toObject(includeInstance: boolean, msg: Command): Command.AsObject;
  static serializeBinaryToWriter(message: Command, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Command;
  static deserializeBinaryFromReader(message: Command, reader: jspb.BinaryReader): Command;
}

export namespace Command {
  export type AsObject = {
    requirespilot: boolean,
    signalstrengthlevel: Command.SignalStrengthLevel,
    signalstrength: number,
    minimumcrew: number,
    vesselcontrolstate: Command.VesselControlState,
    modulecontrolstate: Command.ModuleControlState,
  }

  export enum SignalStrengthLevel { 
    NONE = 0,
    RED = 1,
    ORANGE = 2,
    YELLOW = 3,
    GREEN = 4,
  }

  export enum VesselControlState { 
    INVALID = 0,
    PROBENONE = 2,
    KERBALNONE = 4,
    PARTIAL = 8,
    PROBEPARTIAL = 10,
    KERBALPARTIAL = 12,
    FULL = 16,
    PROBEFULL = 18,
    KERBALFULL = 20,
  }

  export enum ModuleControlState { 
    NOTENOUGHCREW = 0,
    NOTENOUGHRESOURCES = 1,
    PARTIALMANNED = 2,
    NOCONTROLPOINT = 3,
    TOURISTCREW = 4,
    PARTIALPROBE = 5,
    NOMINAL = 6,
  }
}

export class Ablator extends jspb.Message {
  getLoss(): number;
  setLoss(value: number): Ablator;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Ablator.AsObject;
  static toObject(includeInstance: boolean, msg: Ablator): Ablator.AsObject;
  static serializeBinaryToWriter(message: Ablator, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Ablator;
  static deserializeBinaryFromReader(message: Ablator, reader: jspb.BinaryReader): Ablator;
}

export namespace Ablator {
  export type AsObject = {
    loss: number,
  }
}

export class Generator extends jspb.Message {
  getIsactive(): boolean;
  setIsactive(value: boolean): Generator;

  getRate(): number;
  setRate(value: number): Generator;

  getEfficiency(): number;
  setEfficiency(value: number): Generator;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Generator.AsObject;
  static toObject(includeInstance: boolean, msg: Generator): Generator.AsObject;
  static serializeBinaryToWriter(message: Generator, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Generator;
  static deserializeBinaryFromReader(message: Generator, reader: jspb.BinaryReader): Generator;
}

export namespace Generator {
  export type AsObject = {
    isactive: boolean,
    rate: number,
    efficiency: number,
  }
}

export class Part extends jspb.Message {
  getId(): number;
  setId(value: number): Part;

  getName(): string;
  setName(value: string): Part;

  getTitle(): string;
  setTitle(value: string): Part;

  getTag(): string;
  setTag(value: string): Part;

  getStage(): number;
  setStage(value: number): Part;

  getMass(): number;
  setMass(value: number): Part;

  getDrymass(): number;
  setDrymass(value: number): Part;

  getShielded(): boolean;
  setShielded(value: boolean): Part;

  getTemperature(): number;
  setTemperature(value: number): Part;

  getSkintemperature(): number;
  setSkintemperature(value: number): Part;

  getMaxtemperature(): number;
  setMaxtemperature(value: number): Part;

  getMaxskintemperature(): number;
  setMaxskintemperature(value: number): Part;

  getResources(): Resources | undefined;
  setResources(value?: Resources): Part;
  hasResources(): boolean;
  clearResources(): Part;

  getAntenna(): Antenna | undefined;
  setAntenna(value?: Antenna): Part;
  hasAntenna(): boolean;
  clearAntenna(): Part;

  getCargobay(): CargoBay | undefined;
  setCargobay(value?: CargoBay): Part;
  hasCargobay(): boolean;
  clearCargobay(): Part;

  getControlsurface(): ControlSurface | undefined;
  setControlsurface(value?: ControlSurface): Part;
  hasControlsurface(): boolean;
  clearControlsurface(): Part;

  getDecoupler(): Decoupler | undefined;
  setDecoupler(value?: Decoupler): Part;
  hasDecoupler(): boolean;
  clearDecoupler(): Part;

  getDockingport(): DockingPort | undefined;
  setDockingport(value?: DockingPort): Part;
  hasDockingport(): boolean;
  clearDockingport(): Part;

  getEngine(): Engine | undefined;
  setEngine(value?: Engine): Part;
  hasEngine(): boolean;
  clearEngine(): Part;

  getFairing(): Fairing | undefined;
  setFairing(value?: Fairing): Part;
  hasFairing(): boolean;
  clearFairing(): Part;

  getIntake(): Intake | undefined;
  setIntake(value?: Intake): Part;
  hasIntake(): boolean;
  clearIntake(): Part;

  getLeg(): Leg | undefined;
  setLeg(value?: Leg): Part;
  hasLeg(): boolean;
  clearLeg(): Part;

  getLight(): Light | undefined;
  setLight(value?: Light): Part;
  hasLight(): boolean;
  clearLight(): Part;

  getParachute(): Parachute | undefined;
  setParachute(value?: Parachute): Part;
  hasParachute(): boolean;
  clearParachute(): Part;

  getRadiator(): Radiator | undefined;
  setRadiator(value?: Radiator): Part;
  hasRadiator(): boolean;
  clearRadiator(): Part;

  getRcs(): RCS | undefined;
  setRcs(value?: RCS): Part;
  hasRcs(): boolean;
  clearRcs(): Part;

  getReactionwheel(): ReactionWheel | undefined;
  setReactionwheel(value?: ReactionWheel): Part;
  hasReactionwheel(): boolean;
  clearReactionwheel(): Part;

  getResourceconverter(): ResourceConverter | undefined;
  setResourceconverter(value?: ResourceConverter): Part;
  hasResourceconverter(): boolean;
  clearResourceconverter(): Part;

  getResourceharvester(): ResourceHarvester | undefined;
  setResourceharvester(value?: ResourceHarvester): Part;
  hasResourceharvester(): boolean;
  clearResourceharvester(): Part;

  getSensor(): Sensor | undefined;
  setSensor(value?: Sensor): Part;
  hasSensor(): boolean;
  clearSensor(): Part;

  getSolarpanel(): SolarPanel | undefined;
  setSolarpanel(value?: SolarPanel): Part;
  hasSolarpanel(): boolean;
  clearSolarpanel(): Part;

  getWheel(): Wheel | undefined;
  setWheel(value?: Wheel): Part;
  hasWheel(): boolean;
  clearWheel(): Part;

  getCommand(): Command | undefined;
  setCommand(value?: Command): Part;
  hasCommand(): boolean;
  clearCommand(): Part;

  getAblator(): Ablator | undefined;
  setAblator(value?: Ablator): Part;
  hasAblator(): boolean;
  clearAblator(): Part;

  getGenerator(): Generator | undefined;
  setGenerator(value?: Generator): Part;
  hasGenerator(): boolean;
  clearGenerator(): Part;

  getTypesList(): Array<Part.PartType>;
  setTypesList(value: Array<Part.PartType>): Part;
  clearTypesList(): Part;
  addTypes(value: Part.PartType, index?: number): Part;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Part.AsObject;
  static toObject(includeInstance: boolean, msg: Part): Part.AsObject;
  static serializeBinaryToWriter(message: Part, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Part;
  static deserializeBinaryFromReader(message: Part, reader: jspb.BinaryReader): Part;
}

export namespace Part {
  export type AsObject = {
    id: number,
    name: string,
    title: string,
    tag: string,
    stage: number,
    mass: number,
    drymass: number,
    shielded: boolean,
    temperature: number,
    skintemperature: number,
    maxtemperature: number,
    maxskintemperature: number,
    resources?: Resources.AsObject,
    antenna?: Antenna.AsObject,
    cargobay?: CargoBay.AsObject,
    controlsurface?: ControlSurface.AsObject,
    decoupler?: Decoupler.AsObject,
    dockingport?: DockingPort.AsObject,
    engine?: Engine.AsObject,
    fairing?: Fairing.AsObject,
    intake?: Intake.AsObject,
    leg?: Leg.AsObject,
    light?: Light.AsObject,
    parachute?: Parachute.AsObject,
    radiator?: Radiator.AsObject,
    rcs?: RCS.AsObject,
    reactionwheel?: ReactionWheel.AsObject,
    resourceconverter?: ResourceConverter.AsObject,
    resourceharvester?: ResourceHarvester.AsObject,
    sensor?: Sensor.AsObject,
    solarpanel?: SolarPanel.AsObject,
    wheel?: Wheel.AsObject,
    command?: Command.AsObject,
    ablator?: Ablator.AsObject,
    generator?: Generator.AsObject,
    typesList: Array<Part.PartType>,
  }

  export enum PartType { 
    UNKNOWN = 0,
    HASRESOURCE = 1,
    ANTENNA = 2,
    CARGOBAY = 3,
    CONTROLSURFACE = 4,
    DECOUPLER = 5,
    DOCKINGPORT = 6,
    ENGINE = 7,
    FAIRING = 8,
    INTAKE = 9,
    LEG = 10,
    LAUNCHCLAMP = 11,
    LIGHT = 12,
    PARACHUTE = 13,
    RADIATOR = 14,
    RCS = 15,
    REACTIONWHEEL = 16,
    RESOURCECONVERTER = 17,
    RESOURCEHARVESTER = 18,
    SENSOR = 19,
    SOLARPANEL = 20,
    WHEEL = 21,
    COMMAND = 22,
    ABLATOR = 23,
    GENERATOR = 24,
  }
}

export enum CameraMode { 
  AUTO = 0,
  FREE = 1,
  ORBITAL = 2,
  CHASE = 3,
  LOCKED = 4,
  IVA = 5,
  MAP = 6,
}
