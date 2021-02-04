import * as jspb from 'google-protobuf'

import * as observor_pb from './observor_pb'; // proto import: "observor.proto"
import * as apimessage_pb from './apimessage_pb'; // proto import: "apimessage.proto"


export class Vessel extends jspb.Message {
  getId(): string;
  setId(value: string): Vessel;

  getName(): string;
  setName(value: string): Vessel;

  getType(): VesselType;
  setType(value: VesselType): Vessel;

  getSituation(): observor_pb.VesselSnapshot.VesselSituation;
  setSituation(value: observor_pb.VesselSnapshot.VesselSituation): Vessel;

  getMet(): number;
  setMet(value: number): Vessel;

  getStage(): number;
  setStage(value: number): Vessel;

  getBiome(): string;
  setBiome(value: string): Vessel;

  getRecoverable(): boolean;
  setRecoverable(value: boolean): Vessel;

  getCrewcapacity(): number;
  setCrewcapacity(value: number): Vessel;

  getCrewcount(): number;
  setCrewcount(value: number): Vessel;

  getMass(): number;
  setMass(value: number): Vessel;

  getDrymass(): number;
  setDrymass(value: number): Vessel;

  getOrbitingbody(): string;
  setOrbitingbody(value: string): Vessel;

  getSasmode(): observor_pb.VesselSnapshot.SASMode;
  setSasmode(value: observor_pb.VesselSnapshot.SASMode): Vessel;

  getTotalresourcesMap(): jspb.Map<string, observor_pb.VesselResource>;
  clearTotalresourcesMap(): Vessel;

  getStageresourcesMap(): jspb.Map<string, observor_pb.VesselResource>;
  clearStageresourcesMap(): Vessel;

  getOrbit(): Orbit | undefined;
  setOrbit(value?: Orbit): Vessel;
  hasOrbit(): boolean;
  clearOrbit(): Vessel;

  getLaunchtime(): number;
  setLaunchtime(value: number): Vessel;

  getTargetname(): string;
  setTargetname(value: string): Vessel;

  getTargetvesselid(): string;
  setTargetvesselid(value: string): Vessel;

  getTargetpartid(): number;
  setTargetpartid(value: number): Vessel;

  getTargetdirection(): observor_pb.Vector3d | undefined;
  setTargetdirection(value?: observor_pb.Vector3d): Vessel;
  hasTargetdirection(): boolean;
  clearTargetdirection(): Vessel;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Vessel.AsObject;
  static toObject(includeInstance: boolean, msg: Vessel): Vessel.AsObject;
  static serializeBinaryToWriter(message: Vessel, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Vessel;
  static deserializeBinaryFromReader(message: Vessel, reader: jspb.BinaryReader): Vessel;
}

export namespace Vessel {
  export type AsObject = {
    id: string,
    name: string,
    type: VesselType,
    situation: observor_pb.VesselSnapshot.VesselSituation,
    met: number,
    stage: number,
    biome: string,
    recoverable: boolean,
    crewcapacity: number,
    crewcount: number,
    mass: number,
    drymass: number,
    orbitingbody: string,
    sasmode: observor_pb.VesselSnapshot.SASMode,
    totalresourcesMap: Array<[string, observor_pb.VesselResource.AsObject]>,
    stageresourcesMap: Array<[string, observor_pb.VesselResource.AsObject]>,
    orbit?: Orbit.AsObject,
    launchtime: number,
    targetname: string,
    targetvesselid: string,
    targetpartid: number,
    targetdirection?: observor_pb.Vector3d.AsObject,
  }
}

export class Orbit extends jspb.Message {
  getBodyname(): string;
  setBodyname(value: string): Orbit;

  getApoapsis(): number;
  setApoapsis(value: number): Orbit;

  getPeriapsis(): number;
  setPeriapsis(value: number): Orbit;

  getApoapsisaltitude(): number;
  setApoapsisaltitude(value: number): Orbit;

  getPeriapsisaltitude(): number;
  setPeriapsisaltitude(value: number): Orbit;

  getSemimajoraxis(): number;
  setSemimajoraxis(value: number): Orbit;

  getSemiminoraxis(): number;
  setSemiminoraxis(value: number): Orbit;

  getRadius(): number;
  setRadius(value: number): Orbit;

  getSpeed(): number;
  setSpeed(value: number): Orbit;

  getPeriod(): number;
  setPeriod(value: number): Orbit;

  getTimetoapoapsis(): number;
  setTimetoapoapsis(value: number): Orbit;

  getTimetoperiapsis(): number;
  setTimetoperiapsis(value: number): Orbit;

  getEccentricity(): number;
  setEccentricity(value: number): Orbit;

  getInclination(): number;
  setInclination(value: number): Orbit;

  getLongitudeofascendingnode(): number;
  setLongitudeofascendingnode(value: number): Orbit;

  getArgumentofperiapsis(): number;
  setArgumentofperiapsis(value: number): Orbit;

  getMeananomalyatepoch(): number;
  setMeananomalyatepoch(value: number): Orbit;

  getEpoch(): number;
  setEpoch(value: number): Orbit;

  getMeananomaly(): number;
  setMeananomaly(value: number): Orbit;

  getEccentricanomaly(): number;
  setEccentricanomaly(value: number): Orbit;

  getTrueanomaly(): number;
  setTrueanomaly(value: number): Orbit;

  getNextorbit(): Orbit | undefined;
  setNextorbit(value?: Orbit): Orbit;
  hasNextorbit(): boolean;
  clearNextorbit(): Orbit;

  getOrbitalspeed(): number;
  setOrbitalspeed(value: number): Orbit;

  getType(): OrbitType;
  setType(value: OrbitType): Orbit;

  getTimetoan(): number;
  setTimetoan(value: number): Orbit;

  getTimetodn(): number;
  setTimetodn(value: number): Orbit;

  getStarttransitiontype(): OrbitTransitionType;
  setStarttransitiontype(value: OrbitTransitionType): Orbit;

  getEndtransitiontype(): OrbitTransitionType;
  setEndtransitiontype(value: OrbitTransitionType): Orbit;

  getTimetosoichange(): number;
  setTimetosoichange(value: number): Orbit;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Orbit.AsObject;
  static toObject(includeInstance: boolean, msg: Orbit): Orbit.AsObject;
  static serializeBinaryToWriter(message: Orbit, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Orbit;
  static deserializeBinaryFromReader(message: Orbit, reader: jspb.BinaryReader): Orbit;
}

export namespace Orbit {
  export type AsObject = {
    bodyname: string,
    apoapsis: number,
    periapsis: number,
    apoapsisaltitude: number,
    periapsisaltitude: number,
    semimajoraxis: number,
    semiminoraxis: number,
    radius: number,
    speed: number,
    period: number,
    timetoapoapsis: number,
    timetoperiapsis: number,
    eccentricity: number,
    inclination: number,
    longitudeofascendingnode: number,
    argumentofperiapsis: number,
    meananomalyatepoch: number,
    epoch: number,
    meananomaly: number,
    eccentricanomaly: number,
    trueanomaly: number,
    nextorbit?: Orbit.AsObject,
    orbitalspeed: number,
    type: OrbitType,
    timetoan: number,
    timetodn: number,
    starttransitiontype: OrbitTransitionType,
    endtransitiontype: OrbitTransitionType,
    timetosoichange: number,
  }
}

export class CelestialBody extends jspb.Message {
  getName(): string;
  setName(value: string): CelestialBody;

  getSatellitesList(): Array<CelestialBody>;
  setSatellitesList(value: Array<CelestialBody>): CelestialBody;
  clearSatellitesList(): CelestialBody;
  addSatellites(value?: CelestialBody, index?: number): CelestialBody;

  getMass(): number;
  setMass(value: number): CelestialBody;

  getGravitationalparameter(): number;
  setGravitationalparameter(value: number): CelestialBody;

  getSurfacegravity(): number;
  setSurfacegravity(value: number): CelestialBody;

  getRotationalperiod(): number;
  setRotationalperiod(value: number): CelestialBody;

  getRotationalspeed(): number;
  setRotationalspeed(value: number): CelestialBody;

  getRotationangle(): number;
  setRotationangle(value: number): CelestialBody;

  getInitialrotation(): number;
  setInitialrotation(value: number): CelestialBody;

  getEquatorialradius(): number;
  setEquatorialradius(value: number): CelestialBody;

  getSphereofinfluence(): number;
  setSphereofinfluence(value: number): CelestialBody;

  getOrbit(): Orbit | undefined;
  setOrbit(value?: Orbit): CelestialBody;
  hasOrbit(): boolean;
  clearOrbit(): CelestialBody;

  getHasatmosphere(): boolean;
  setHasatmosphere(value: boolean): CelestialBody;

  getAtmospheredepth(): number;
  setAtmospheredepth(value: number): CelestialBody;

  getHasatmosphericoxygen(): boolean;
  setHasatmosphericoxygen(value: boolean): CelestialBody;

  getBiomesList(): Array<string>;
  setBiomesList(value: Array<string>): CelestialBody;
  clearBiomesList(): CelestialBody;
  addBiomes(value: string, index?: number): CelestialBody;

  getFlyinghighaltitudethreshold(): number;
  setFlyinghighaltitudethreshold(value: number): CelestialBody;

  getSpacehighaltitudethreshold(): number;
  setSpacehighaltitudethreshold(value: number): CelestialBody;

  getAttitudeinfo(): observor_pb.AttitudeInfo | undefined;
  setAttitudeinfo(value?: observor_pb.AttitudeInfo): CelestialBody;
  hasAttitudeinfo(): boolean;
  clearAttitudeinfo(): CelestialBody;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CelestialBody.AsObject;
  static toObject(includeInstance: boolean, msg: CelestialBody): CelestialBody.AsObject;
  static serializeBinaryToWriter(message: CelestialBody, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CelestialBody;
  static deserializeBinaryFromReader(message: CelestialBody, reader: jspb.BinaryReader): CelestialBody;
}

export namespace CelestialBody {
  export type AsObject = {
    name: string,
    satellitesList: Array<CelestialBody.AsObject>,
    mass: number,
    gravitationalparameter: number,
    surfacegravity: number,
    rotationalperiod: number,
    rotationalspeed: number,
    rotationangle: number,
    initialrotation: number,
    equatorialradius: number,
    sphereofinfluence: number,
    orbit?: Orbit.AsObject,
    hasatmosphere: boolean,
    atmospheredepth: number,
    hasatmosphericoxygen: boolean,
    biomesList: Array<string>,
    flyinghighaltitudethreshold: number,
    spacehighaltitudethreshold: number,
    attitudeinfo?: observor_pb.AttitudeInfo.AsObject,
  }
}

export class TargetOrbitInfo extends jspb.Message {
  getClosestapproachtime(): number;
  setClosestapproachtime(value: number): TargetOrbitInfo;

  getTimetoclosestapproach(): number;
  setTimetoclosestapproach(value: number): TargetOrbitInfo;

  getClosestapproachdistance(): number;
  setClosestapproachdistance(value: number): TargetOrbitInfo;

  getTrueanomalyatan(): number;
  setTrueanomalyatan(value: number): TargetOrbitInfo;

  getTimetotargetan(): number;
  setTimetotargetan(value: number): TargetOrbitInfo;

  getTrueanomalyatdn(): number;
  setTrueanomalyatdn(value: number): TargetOrbitInfo;

  getTimetotargetdn(): number;
  setTimetotargetdn(value: number): TargetOrbitInfo;

  getRelativeinclination(): number;
  setRelativeinclination(value: number): TargetOrbitInfo;

  getTargetrelativespeed(): number;
  setTargetrelativespeed(value: number): TargetOrbitInfo;

  getTargetdistance(): number;
  setTargetdistance(value: number): TargetOrbitInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TargetOrbitInfo.AsObject;
  static toObject(includeInstance: boolean, msg: TargetOrbitInfo): TargetOrbitInfo.AsObject;
  static serializeBinaryToWriter(message: TargetOrbitInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TargetOrbitInfo;
  static deserializeBinaryFromReader(message: TargetOrbitInfo, reader: jspb.BinaryReader): TargetOrbitInfo;
}

export namespace TargetOrbitInfo {
  export type AsObject = {
    closestapproachtime: number,
    timetoclosestapproach: number,
    closestapproachdistance: number,
    trueanomalyatan: number,
    timetotargetan: number,
    trueanomalyatdn: number,
    timetotargetdn: number,
    relativeinclination: number,
    targetrelativespeed: number,
    targetdistance: number,
  }
}

export class GetTargetVesselOrbitInfoResponse extends jspb.Message {
  getOrbit(): Orbit | undefined;
  setOrbit(value?: Orbit): GetTargetVesselOrbitInfoResponse;
  hasOrbit(): boolean;
  clearOrbit(): GetTargetVesselOrbitInfoResponse;

  getTargetorbit(): Orbit | undefined;
  setTargetorbit(value?: Orbit): GetTargetVesselOrbitInfoResponse;
  hasTargetorbit(): boolean;
  clearTargetorbit(): GetTargetVesselOrbitInfoResponse;

  getTargetorbitinfo(): TargetOrbitInfo | undefined;
  setTargetorbitinfo(value?: TargetOrbitInfo): GetTargetVesselOrbitInfoResponse;
  hasTargetorbitinfo(): boolean;
  clearTargetorbitinfo(): GetTargetVesselOrbitInfoResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTargetVesselOrbitInfoResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetTargetVesselOrbitInfoResponse): GetTargetVesselOrbitInfoResponse.AsObject;
  static serializeBinaryToWriter(message: GetTargetVesselOrbitInfoResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTargetVesselOrbitInfoResponse;
  static deserializeBinaryFromReader(message: GetTargetVesselOrbitInfoResponse, reader: jspb.BinaryReader): GetTargetVesselOrbitInfoResponse;
}

export namespace GetTargetVesselOrbitInfoResponse {
  export type AsObject = {
    orbit?: Orbit.AsObject,
    targetorbit?: Orbit.AsObject,
    targetorbitinfo?: TargetOrbitInfo.AsObject,
  }
}

export class GetTargetBodyOrbitInfoResponse extends jspb.Message {
  getOrbit(): Orbit | undefined;
  setOrbit(value?: Orbit): GetTargetBodyOrbitInfoResponse;
  hasOrbit(): boolean;
  clearOrbit(): GetTargetBodyOrbitInfoResponse;

  getTargetorbit(): Orbit | undefined;
  setTargetorbit(value?: Orbit): GetTargetBodyOrbitInfoResponse;
  hasTargetorbit(): boolean;
  clearTargetorbit(): GetTargetBodyOrbitInfoResponse;

  getTargetorbitinfo(): TargetOrbitInfo | undefined;
  setTargetorbitinfo(value?: TargetOrbitInfo): GetTargetBodyOrbitInfoResponse;
  hasTargetorbitinfo(): boolean;
  clearTargetorbitinfo(): GetTargetBodyOrbitInfoResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTargetBodyOrbitInfoResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetTargetBodyOrbitInfoResponse): GetTargetBodyOrbitInfoResponse.AsObject;
  static serializeBinaryToWriter(message: GetTargetBodyOrbitInfoResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTargetBodyOrbitInfoResponse;
  static deserializeBinaryFromReader(message: GetTargetBodyOrbitInfoResponse, reader: jspb.BinaryReader): GetTargetBodyOrbitInfoResponse;
}

export namespace GetTargetBodyOrbitInfoResponse {
  export type AsObject = {
    orbit?: Orbit.AsObject,
    targetorbit?: Orbit.AsObject,
    targetorbitinfo?: TargetOrbitInfo.AsObject,
  }
}

export class GetTargetVesselOrbitInfoFromManeuverNodeResponse extends jspb.Message {
  getNextorbit(): Orbit | undefined;
  setNextorbit(value?: Orbit): GetTargetVesselOrbitInfoFromManeuverNodeResponse;
  hasNextorbit(): boolean;
  clearNextorbit(): GetTargetVesselOrbitInfoFromManeuverNodeResponse;

  getTargetorbit(): Orbit | undefined;
  setTargetorbit(value?: Orbit): GetTargetVesselOrbitInfoFromManeuverNodeResponse;
  hasTargetorbit(): boolean;
  clearTargetorbit(): GetTargetVesselOrbitInfoFromManeuverNodeResponse;

  getTargetorbitinfo(): TargetOrbitInfo | undefined;
  setTargetorbitinfo(value?: TargetOrbitInfo): GetTargetVesselOrbitInfoFromManeuverNodeResponse;
  hasTargetorbitinfo(): boolean;
  clearTargetorbitinfo(): GetTargetVesselOrbitInfoFromManeuverNodeResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTargetVesselOrbitInfoFromManeuverNodeResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetTargetVesselOrbitInfoFromManeuverNodeResponse): GetTargetVesselOrbitInfoFromManeuverNodeResponse.AsObject;
  static serializeBinaryToWriter(message: GetTargetVesselOrbitInfoFromManeuverNodeResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTargetVesselOrbitInfoFromManeuverNodeResponse;
  static deserializeBinaryFromReader(message: GetTargetVesselOrbitInfoFromManeuverNodeResponse, reader: jspb.BinaryReader): GetTargetVesselOrbitInfoFromManeuverNodeResponse;
}

export namespace GetTargetVesselOrbitInfoFromManeuverNodeResponse {
  export type AsObject = {
    nextorbit?: Orbit.AsObject,
    targetorbit?: Orbit.AsObject,
    targetorbitinfo?: TargetOrbitInfo.AsObject,
  }
}

export class GetTargetBodyOrbitInfoFromManeuverNodeResponse extends jspb.Message {
  getNextorbit(): Orbit | undefined;
  setNextorbit(value?: Orbit): GetTargetBodyOrbitInfoFromManeuverNodeResponse;
  hasNextorbit(): boolean;
  clearNextorbit(): GetTargetBodyOrbitInfoFromManeuverNodeResponse;

  getTargetorbit(): Orbit | undefined;
  setTargetorbit(value?: Orbit): GetTargetBodyOrbitInfoFromManeuverNodeResponse;
  hasTargetorbit(): boolean;
  clearTargetorbit(): GetTargetBodyOrbitInfoFromManeuverNodeResponse;

  getTargetorbitinfo(): TargetOrbitInfo | undefined;
  setTargetorbitinfo(value?: TargetOrbitInfo): GetTargetBodyOrbitInfoFromManeuverNodeResponse;
  hasTargetorbitinfo(): boolean;
  clearTargetorbitinfo(): GetTargetBodyOrbitInfoFromManeuverNodeResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTargetBodyOrbitInfoFromManeuverNodeResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetTargetBodyOrbitInfoFromManeuverNodeResponse): GetTargetBodyOrbitInfoFromManeuverNodeResponse.AsObject;
  static serializeBinaryToWriter(message: GetTargetBodyOrbitInfoFromManeuverNodeResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTargetBodyOrbitInfoFromManeuverNodeResponse;
  static deserializeBinaryFromReader(message: GetTargetBodyOrbitInfoFromManeuverNodeResponse, reader: jspb.BinaryReader): GetTargetBodyOrbitInfoFromManeuverNodeResponse;
}

export namespace GetTargetBodyOrbitInfoFromManeuverNodeResponse {
  export type AsObject = {
    nextorbit?: Orbit.AsObject,
    targetorbit?: Orbit.AsObject,
    targetorbitinfo?: TargetOrbitInfo.AsObject,
  }
}

export class GetTargetDockingPortInfoResponse extends jspb.Message {
  getTargetvesselname(): string;
  setTargetvesselname(value: string): GetTargetDockingPortInfoResponse;

  getTargetpartname(): string;
  setTargetpartname(value: string): GetTargetDockingPortInfoResponse;

  getTargetparttag(): string;
  setTargetparttag(value: string): GetTargetDockingPortInfoResponse;

  getRelativeangles(): observor_pb.Vector3d | undefined;
  setRelativeangles(value?: observor_pb.Vector3d): GetTargetDockingPortInfoResponse;
  hasRelativeangles(): boolean;
  clearRelativeangles(): GetTargetDockingPortInfoResponse;

  getRelativedistance(): observor_pb.Vector3d | undefined;
  setRelativedistance(value?: observor_pb.Vector3d): GetTargetDockingPortInfoResponse;
  hasRelativedistance(): boolean;
  clearRelativedistance(): GetTargetDockingPortInfoResponse;

  getRelativevelocity(): observor_pb.Vector3d | undefined;
  setRelativevelocity(value?: observor_pb.Vector3d): GetTargetDockingPortInfoResponse;
  hasRelativevelocity(): boolean;
  clearRelativevelocity(): GetTargetDockingPortInfoResponse;

  getDistance(): number;
  setDistance(value: number): GetTargetDockingPortInfoResponse;

  getRelativespeed(): number;
  setRelativespeed(value: number): GetTargetDockingPortInfoResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTargetDockingPortInfoResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetTargetDockingPortInfoResponse): GetTargetDockingPortInfoResponse.AsObject;
  static serializeBinaryToWriter(message: GetTargetDockingPortInfoResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTargetDockingPortInfoResponse;
  static deserializeBinaryFromReader(message: GetTargetDockingPortInfoResponse, reader: jspb.BinaryReader): GetTargetDockingPortInfoResponse;
}

export namespace GetTargetDockingPortInfoResponse {
  export type AsObject = {
    targetvesselname: string,
    targetpartname: string,
    targetparttag: string,
    relativeangles?: observor_pb.Vector3d.AsObject,
    relativedistance?: observor_pb.Vector3d.AsObject,
    relativevelocity?: observor_pb.Vector3d.AsObject,
    distance: number,
    relativespeed: number,
  }
}

export class GetVerticalLandingInfoResponse extends jspb.Message {
  getYaw(): number;
  setYaw(value: number): GetVerticalLandingInfoResponse;

  getPitch(): number;
  setPitch(value: number): GetVerticalLandingInfoResponse;

  getVelocity(): observor_pb.Vector3d | undefined;
  setVelocity(value?: observor_pb.Vector3d): GetVerticalLandingInfoResponse;
  hasVelocity(): boolean;
  clearVelocity(): GetVerticalLandingInfoResponse;

  getAcceleration(): observor_pb.Vector3d | undefined;
  setAcceleration(value?: observor_pb.Vector3d): GetVerticalLandingInfoResponse;
  hasAcceleration(): boolean;
  clearAcceleration(): GetVerticalLandingInfoResponse;

  getSurfacealtitude(): number;
  setSurfacealtitude(value: number): GetVerticalLandingInfoResponse;

  getSurfaceslope(): number;
  setSurfaceslope(value: number): GetVerticalLandingInfoResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetVerticalLandingInfoResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetVerticalLandingInfoResponse): GetVerticalLandingInfoResponse.AsObject;
  static serializeBinaryToWriter(message: GetVerticalLandingInfoResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetVerticalLandingInfoResponse;
  static deserializeBinaryFromReader(message: GetVerticalLandingInfoResponse, reader: jspb.BinaryReader): GetVerticalLandingInfoResponse;
}

export namespace GetVerticalLandingInfoResponse {
  export type AsObject = {
    yaw: number,
    pitch: number,
    velocity?: observor_pb.Vector3d.AsObject,
    acceleration?: observor_pb.Vector3d.AsObject,
    surfacealtitude: number,
    surfaceslope: number,
  }
}

export class GetReentryInfoResponse extends jspb.Message {
  getSurfacealtitude(): number;
  setSurfacealtitude(value: number): GetReentryInfoResponse;

  getAirspeed(): number;
  setAirspeed(value: number): GetReentryInfoResponse;

  getMach(): number;
  setMach(value: number): GetReentryInfoResponse;

  getSurfacespeed(): number;
  setSurfacespeed(value: number): GetReentryInfoResponse;

  getTerminalspeed(): number;
  setTerminalspeed(value: number): GetReentryInfoResponse;

  getExternaltemperature(): number;
  setExternaltemperature(value: number): GetReentryInfoResponse;

  getTotaltemperature(): number;
  setTotaltemperature(value: number): GetReentryInfoResponse;

  getStatictemperature(): number;
  setStatictemperature(value: number): GetReentryInfoResponse;

  getPodtemperature(): number;
  setPodtemperature(value: number): GetReentryInfoResponse;

  getPodskintemperature(): number;
  setPodskintemperature(value: number): GetReentryInfoResponse;

  getPodmaxskintemperature(): number;
  setPodmaxskintemperature(value: number): GetReentryInfoResponse;

  getShieldtemperature(): number;
  setShieldtemperature(value: number): GetReentryInfoResponse;

  getShieldskintemperature(): number;
  setShieldskintemperature(value: number): GetReentryInfoResponse;

  getShieldmaxskintemperature(): number;
  setShieldmaxskintemperature(value: number): GetReentryInfoResponse;

  getDrag(): number;
  setDrag(value: number): GetReentryInfoResponse;

  getDragacc(): number;
  setDragacc(value: number): GetReentryInfoResponse;

  getAblator(): observor_pb.VesselResource | undefined;
  setAblator(value?: observor_pb.VesselResource): GetReentryInfoResponse;
  hasAblator(): boolean;
  clearAblator(): GetReentryInfoResponse;

  getDynamicpressure(): number;
  setDynamicpressure(value: number): GetReentryInfoResponse;

  getAcceleration(): observor_pb.Vector3d | undefined;
  setAcceleration(value?: observor_pb.Vector3d): GetReentryInfoResponse;
  hasAcceleration(): boolean;
  clearAcceleration(): GetReentryInfoResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetReentryInfoResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetReentryInfoResponse): GetReentryInfoResponse.AsObject;
  static serializeBinaryToWriter(message: GetReentryInfoResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetReentryInfoResponse;
  static deserializeBinaryFromReader(message: GetReentryInfoResponse, reader: jspb.BinaryReader): GetReentryInfoResponse;
}

export namespace GetReentryInfoResponse {
  export type AsObject = {
    surfacealtitude: number,
    airspeed: number,
    mach: number,
    surfacespeed: number,
    terminalspeed: number,
    externaltemperature: number,
    totaltemperature: number,
    statictemperature: number,
    podtemperature: number,
    podskintemperature: number,
    podmaxskintemperature: number,
    shieldtemperature: number,
    shieldskintemperature: number,
    shieldmaxskintemperature: number,
    drag: number,
    dragacc: number,
    ablator?: observor_pb.VesselResource.AsObject,
    dynamicpressure: number,
    acceleration?: observor_pb.Vector3d.AsObject,
  }
}

export class GetManeuverNodeInfoResponse extends jspb.Message {
  getUt(): number;
  setUt(value: number): GetManeuverNodeInfoResponse;

  getUtpe(): number;
  setUtpe(value: number): GetManeuverNodeInfoResponse;

  getUtap(): number;
  setUtap(value: number): GetManeuverNodeInfoResponse;

  getUtan(): number;
  setUtan(value: number): GetManeuverNodeInfoResponse;

  getUtdn(): number;
  setUtdn(value: number): GetManeuverNodeInfoResponse;

  getUttargetan(): number;
  setUttargetan(value: number): GetManeuverNodeInfoResponse;

  getUttargetdn(): number;
  setUttargetdn(value: number): GetManeuverNodeInfoResponse;

  getUttargetclosestapproach(): number;
  setUttargetclosestapproach(value: number): GetManeuverNodeInfoResponse;

  getNode(): apimessage_pb.ManeuverNode | undefined;
  setNode(value?: apimessage_pb.ManeuverNode): GetManeuverNodeInfoResponse;
  hasNode(): boolean;
  clearNode(): GetManeuverNodeInfoResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetManeuverNodeInfoResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetManeuverNodeInfoResponse): GetManeuverNodeInfoResponse.AsObject;
  static serializeBinaryToWriter(message: GetManeuverNodeInfoResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetManeuverNodeInfoResponse;
  static deserializeBinaryFromReader(message: GetManeuverNodeInfoResponse, reader: jspb.BinaryReader): GetManeuverNodeInfoResponse;
}

export namespace GetManeuverNodeInfoResponse {
  export type AsObject = {
    ut: number,
    utpe: number,
    utap: number,
    utan: number,
    utdn: number,
    uttargetan: number,
    uttargetdn: number,
    uttargetclosestapproach: number,
    node?: apimessage_pb.ManeuverNode.AsObject,
  }
}

export class GetRunwayLandingInfoResponse extends jspb.Message {
  getAltitude(): number;
  setAltitude(value: number): GetRunwayLandingInfoResponse;

  getDistance(): number;
  setDistance(value: number): GetRunwayLandingInfoResponse;

  getYawoffset(): number;
  setYawoffset(value: number): GetRunwayLandingInfoResponse;

  getSurfacespeed(): number;
  setSurfacespeed(value: number): GetRunwayLandingInfoResponse;

  getForwarderror(): number;
  setForwarderror(value: number): GetRunwayLandingInfoResponse;

  getVelocityerror(): number;
  setVelocityerror(value: number): GetRunwayLandingInfoResponse;

  getPitch(): number;
  setPitch(value: number): GetRunwayLandingInfoResponse;

  getRoll(): number;
  setRoll(value: number): GetRunwayLandingInfoResponse;

  getVerticalspeed(): number;
  setVerticalspeed(value: number): GetRunwayLandingInfoResponse;

  getRunwaymeanaltitude(): number;
  setRunwaymeanaltitude(value: number): GetRunwayLandingInfoResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetRunwayLandingInfoResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetRunwayLandingInfoResponse): GetRunwayLandingInfoResponse.AsObject;
  static serializeBinaryToWriter(message: GetRunwayLandingInfoResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetRunwayLandingInfoResponse;
  static deserializeBinaryFromReader(message: GetRunwayLandingInfoResponse, reader: jspb.BinaryReader): GetRunwayLandingInfoResponse;
}

export namespace GetRunwayLandingInfoResponse {
  export type AsObject = {
    altitude: number,
    distance: number,
    yawoffset: number,
    surfacespeed: number,
    forwarderror: number,
    velocityerror: number,
    pitch: number,
    roll: number,
    verticalspeed: number,
    runwaymeanaltitude: number,
  }
}

export enum VesselType { 
  DEBRIS = 0,
  SPACEOBJECT = 1,
  UNKNOWN = 2,
  PROBE = 3,
  RELAY = 4,
  ROVER = 5,
  LANDER = 6,
  SHIP = 7,
  PLANE = 8,
  STATION = 9,
  BASE = 10,
  EVA = 11,
  FLAG = 12,
  DEPLOYEDSCIENCECONTROLLER = 13,
  DEPLOYEDSCIENCEPART = 14,
}
export enum OrbitType { 
  SYNCHRONOUS = 0,
  STATIONARY = 1,
  POLAR = 2,
  EQUATORIAL = 3,
  KOLNIYA = 4,
  TUNDRA = 5,
  RANDOM = 6,
}
export enum OrbitTransitionType { 
  INITIAL = 0,
  FINAL = 1,
  ENCOUNTER = 2,
  ESCAPE = 3,
  MANEUVER = 4,
  IMPACT = 5,
}
export enum AutoPilotPhase { 
  INVALID = 0,
  NEW = 1,
  CLEARROLL = 2,
  CLEARPITCHYAW = 3,
  TOTARGET = 4,
}
