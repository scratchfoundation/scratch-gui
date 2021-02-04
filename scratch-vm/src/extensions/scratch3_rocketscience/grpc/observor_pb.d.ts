import * as jspb from 'google-protobuf'



export class PartSnapshotRequest extends jspb.Message {
  getPartid(): number;
  setPartid(value: number): PartSnapshotRequest;

  getItemsList(): Array<PartSnapshotRequest.OPart>;
  setItemsList(value: Array<PartSnapshotRequest.OPart>): PartSnapshotRequest;
  clearItemsList(): PartSnapshotRequest;
  addItems(value: PartSnapshotRequest.OPart, index?: number): PartSnapshotRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PartSnapshotRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PartSnapshotRequest): PartSnapshotRequest.AsObject;
  static serializeBinaryToWriter(message: PartSnapshotRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PartSnapshotRequest;
  static deserializeBinaryFromReader(message: PartSnapshotRequest, reader: jspb.BinaryReader): PartSnapshotRequest;
}

export namespace PartSnapshotRequest {
  export type AsObject = {
    partid: number,
    itemsList: Array<PartSnapshotRequest.OPart>,
  }

  export enum OPart { 
    PARTMASS = 0,
    PARTSHIELDED = 1,
    PARTTEMPERATURE = 2,
    PARTSKINTEMPERATURE = 3,
    ANTENNASTATE = 4,
    CARGOBAYSTATE = 5,
    CARGOBAYDEPLOYPERCENT = 6,
    CONTROLSURFACEPITCHENABLED = 7,
    CONTROLSURFACEYAWENABLED = 8,
    CONTROLSURFACEROLLENABLED = 9,
    CONTROLSURFACEAUTHORITYLIMITER = 10,
    CONTROLSURFACEDEPLOYED = 11,
    DECOUPLERDECOUPLED = 12,
    DOCKINGPORTSTATE = 13,
    DOCKINGPORTSHIELDED = 14,
    ENGINEACTIVE = 15,
    ENGINETHRUST = 16,
    ENGINETHRUSTPERCENTAGE = 17,
    ENGINETHROTTLE = 18,
    ENGINESPECIFICIMPULSE = 19,
    ENGINEVACUUMSPECIFICIMPULSE = 20,
    ENGINEPROPELLANTINFO = 21,
    ENGINEHASFUEL = 22,
    ENGINEMODE = 23,
    ENGINEAUTOSWITCHMODE = 24,
    ENGINEGIMBALLIMIT = 25,
    FARINGJETTISONED = 26,
    INTAKEOPEN = 27,
    INTAKESPEED = 28,
    INTAKEFLOW = 29,
    LEGSTATE = 30,
    LEGDEPLOYED = 31,
    LEGGROUNDED = 32,
    LIGHTON = 33,
    PARACHUTESTATE = 34,
    PARACHUTEDEPLOYED = 35,
    PARACHUTEDEPLOYALTITUDE = 36,
    PARACHUTEDEPLOYMINPRESSURE = 37,
    PARACHUTEDEPLOYMENTSAFESTATE = 38,
    RADIATORSTATE = 39,
    RADIATORDEPLOYED = 40,
    RADIATORCOOLING = 41,
    RCSENABLED = 42,
    RCSTHRUSTLIMIT = 43,
    RCSPITCHENABLED = 44,
    RCSYAWENABLED = 45,
    RCSROLLENABLED = 46,
    RCSUPENABLED = 47,
    RCSFORWARDENABLED = 48,
    RCSRIGHTENABLED = 49,
    RCSHASFUEL = 50,
    RCSPROPELLANTINFO = 51,
    REACTIONWHEELSTATE = 52,
    RESOURCECONVERTERSTATE = 53,
    RESOURCECONVERTERTHERMALEFFICIENCY = 54,
    RESOURCECONVERTERCORETEMPERATURE = 55,
    RESOURCECONVERTERSTATUS = 56,
    RESOURCECONVERTERACTIVE = 57,
    RESOURCEHARVESTERSTATE = 58,
    RESOURCEHARVESTERDEPLOYED = 59,
    RESOURCEHARVESTERACTIVATED = 60,
    RESOURCEHARVESTEREXTRACTIONRATE = 61,
    RESOURCEHARVESTERTHERMALEFFICIENCY = 62,
    RESOURCEHARVESTERCORETEMPERATURE = 63,
    SENSORACTIVATED = 64,
    SENSORREADING = 65,
    SOLARPANELSTATE = 66,
    SOLARPANELDEPLOYED = 67,
    SOLARPANELENERGYFLOW = 68,
    SOLARPANELSUNEXPOSURE = 69,
    WHEELSTATE = 70,
    WHEELGROUNDED = 71,
    WHEELDEPLOYED = 72,
    WHEELPOWERED = 73,
    WHEELMOTORENABLED = 74,
    WHEELMOTORSTATE = 75,
    WHEELMOTOROUTPUT = 76,
    WHEELINVERTED = 77,
    WHEELAUTOFRICTIONCONTROLENABLED = 78,
    WHEELMANUALFRICTIONCONTROL = 79,
    WHEELTRACTIONCONTROLENABLED = 80,
    WHEELTRACTIONCONTROL = 81,
    WHEELDRIVELIMITER = 82,
    WHEELSTEERINGENABLED = 83,
    WHEELSTEERINGINVERTED = 84,
    WHEELBROKEN = 85,
    WHEELSTRESS = 86,
    WHEELSTRESSPERCENTAGE = 87,
    WHEELDEFLECTION = 88,
    WHEELSLIP = 89,
  }
}

export class VesselSnapshotRequest extends jspb.Message {
  getItemsList(): Array<VesselSnapshotRequest.OVessel>;
  setItemsList(value: Array<VesselSnapshotRequest.OVessel>): VesselSnapshotRequest;
  clearItemsList(): VesselSnapshotRequest;
  addItems(value: VesselSnapshotRequest.OVessel, index?: number): VesselSnapshotRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VesselSnapshotRequest.AsObject;
  static toObject(includeInstance: boolean, msg: VesselSnapshotRequest): VesselSnapshotRequest.AsObject;
  static serializeBinaryToWriter(message: VesselSnapshotRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VesselSnapshotRequest;
  static deserializeBinaryFromReader(message: VesselSnapshotRequest, reader: jspb.BinaryReader): VesselSnapshotRequest;
}

export namespace VesselSnapshotRequest {
  export type AsObject = {
    itemsList: Array<VesselSnapshotRequest.OVessel>,
  }

  export enum OVessel { 
    _V = 0,
    SITUATION = 1,
    MET = 2,
    BIOME = 3,
    MASS = 4,
    STAGE = 5,
    STAGERESOURCES = 6,
    TOTALRESOURCES = 7,
    SAS_MODE = 8,
    ORBITINGBODY = 9,
    MAINTHROTTLE = 10,
    SASENABLED = 11,
    RCSENABLED = 12,
    GEARENABLED = 13,
    LIGHTENABLED = 14,
    BRAKESENABLED = 15,
  }
}

export class FlightSnapshotRequest extends jspb.Message {
  getItemsList(): Array<FlightSnapshotRequest.OFlight>;
  setItemsList(value: Array<FlightSnapshotRequest.OFlight>): FlightSnapshotRequest;
  clearItemsList(): FlightSnapshotRequest;
  addItems(value: FlightSnapshotRequest.OFlight, index?: number): FlightSnapshotRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FlightSnapshotRequest.AsObject;
  static toObject(includeInstance: boolean, msg: FlightSnapshotRequest): FlightSnapshotRequest.AsObject;
  static serializeBinaryToWriter(message: FlightSnapshotRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FlightSnapshotRequest;
  static deserializeBinaryFromReader(message: FlightSnapshotRequest, reader: jspb.BinaryReader): FlightSnapshotRequest;
}

export namespace FlightSnapshotRequest {
  export type AsObject = {
    itemsList: Array<FlightSnapshotRequest.OFlight>,
  }

  export enum OFlight { 
    _F = 0,
    GFORCE = 1,
    MEANALTITUDE = 2,
    SURFACEALTITUDE = 3,
    BEDROCKALTITUDE = 4,
    ELEVATION = 5,
    LATITUDE = 6,
    LONGITUDE = 7,
    SURFACESPEED = 8,
    HORIZONTALSPEED = 9,
    VERTICALSPEED = 10,
    PITCH = 11,
    YAW = 12,
    ROLL = 13,
    ATMOSPHEREDENSITY = 14,
    DYNAMICPRESSURE = 15,
    STATICPRESSUREATMSL = 16,
    STATICPRESSURE = 17,
    SPEEDOFSOUND = 18,
    MACH = 19,
    TRUEAIRSPEED = 20,
    ANGLEOFATTACK = 21,
    TOTALAIRTEMPERATURE = 22,
    STATICAIRTEMPERATURE = 23,
    ORBITSPEED = 24,
    MISSIONTIME = 25,
    SIDESLIPANGLE = 26,
    SURFACEVELOCITYPROGRADE = 27,
    ORBITALVELOCITYPROGRADE = 28,
    NAVBALLANGLES = 29,
    EXTERNALTEMPERATURE = 30,
    TWRACTUAL = 31,
    TWRMAXTHRUST = 32,
    TWRMAXTHRUSTNOLIMIT = 33,
    DRAGFORCE = 34,
    LIFTFORCE = 35,
    TERMINALVELOCITY = 36,
    LIFTUPFORCE = 37,
    ATTITUDEDATA = 38,
    UT = 39,
    NAVMODE = 40,
    STALLFRACTION = 41,
    DRAGCOEFFICIENT = 42,
    LIFTCOEFFICIENT = 43,
    BALLISTICCOEFFICIENT = 44,
    TSFC = 45,
    REYNOLDSNUMBER = 46,
    TWRDATA = 47,
  }
}

export class OrbitSnapshotRequest extends jspb.Message {
  getItemsList(): Array<OrbitSnapshotRequest.OOrbit>;
  setItemsList(value: Array<OrbitSnapshotRequest.OOrbit>): OrbitSnapshotRequest;
  clearItemsList(): OrbitSnapshotRequest;
  addItems(value: OrbitSnapshotRequest.OOrbit, index?: number): OrbitSnapshotRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): OrbitSnapshotRequest.AsObject;
  static toObject(includeInstance: boolean, msg: OrbitSnapshotRequest): OrbitSnapshotRequest.AsObject;
  static serializeBinaryToWriter(message: OrbitSnapshotRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): OrbitSnapshotRequest;
  static deserializeBinaryFromReader(message: OrbitSnapshotRequest, reader: jspb.BinaryReader): OrbitSnapshotRequest;
}

export namespace OrbitSnapshotRequest {
  export type AsObject = {
    itemsList: Array<OrbitSnapshotRequest.OOrbit>,
  }

  export enum OOrbit { 
    _O = 0,
    BODYNAME = 1,
    APOAPSIS = 2,
    PERIAPSIS = 3,
    APOAPSISALTITUDE = 4,
    PERIAPSISALTITUDE = 5,
    SEMIMAJORAXIS = 6,
    SEMIMINORAXIS = 7,
    RADIUS = 8,
    SPEED = 9,
    PERIOD = 10,
    TIMETOAPOAPSIS = 11,
    TIMETOPERIAPSIS = 12,
    ECCENTRICITY = 13,
    INCLINATION = 14,
    LONGITUDEOFASCENDINGNODE = 15,
    ARGUMENTOFPERIAPSIS = 16,
    MEANANOMALYATEPOCH = 17,
    EPOCH = 18,
    MEANANOMALY = 19,
    ECCENTRICANOMALY = 20,
    TRUEANOMALY = 21,
    TIMETOSOICHANGE = 22,
    ORBITALSPEED = 23,
  }
}

export class SnapshotRequest extends jspb.Message {
  getVesselid(): string;
  setVesselid(value: string): SnapshotRequest;

  getVessel(): VesselSnapshotRequest | undefined;
  setVessel(value?: VesselSnapshotRequest): SnapshotRequest;
  hasVessel(): boolean;
  clearVessel(): SnapshotRequest;

  getFlight(): FlightSnapshotRequest | undefined;
  setFlight(value?: FlightSnapshotRequest): SnapshotRequest;
  hasFlight(): boolean;
  clearFlight(): SnapshotRequest;

  getOrbit(): OrbitSnapshotRequest | undefined;
  setOrbit(value?: OrbitSnapshotRequest): SnapshotRequest;
  hasOrbit(): boolean;
  clearOrbit(): SnapshotRequest;

  getPartsList(): Array<PartSnapshotRequest>;
  setPartsList(value: Array<PartSnapshotRequest>): SnapshotRequest;
  clearPartsList(): SnapshotRequest;
  addParts(value?: PartSnapshotRequest, index?: number): PartSnapshotRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SnapshotRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SnapshotRequest): SnapshotRequest.AsObject;
  static serializeBinaryToWriter(message: SnapshotRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SnapshotRequest;
  static deserializeBinaryFromReader(message: SnapshotRequest, reader: jspb.BinaryReader): SnapshotRequest;
}

export namespace SnapshotRequest {
  export type AsObject = {
    vesselid: string,
    vessel?: VesselSnapshotRequest.AsObject,
    flight?: FlightSnapshotRequest.AsObject,
    orbit?: OrbitSnapshotRequest.AsObject,
    partsList: Array<PartSnapshotRequest.AsObject>,
  }
}

export class VesselResource extends jspb.Message {
  getName(): string;
  setName(value: string): VesselResource;

  getCapacity(): number;
  setCapacity(value: number): VesselResource;

  getAmount(): number;
  setAmount(value: number): VesselResource;

  getRate(): number;
  setRate(value: number): VesselResource;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VesselResource.AsObject;
  static toObject(includeInstance: boolean, msg: VesselResource): VesselResource.AsObject;
  static serializeBinaryToWriter(message: VesselResource, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VesselResource;
  static deserializeBinaryFromReader(message: VesselResource, reader: jspb.BinaryReader): VesselResource;
}

export namespace VesselResource {
  export type AsObject = {
    name: string,
    capacity: number,
    amount: number,
    rate: number,
  }
}

export class VesselSnapshot extends jspb.Message {
  getSituation(): VesselSnapshot.VesselSituation;
  setSituation(value: VesselSnapshot.VesselSituation): VesselSnapshot;

  getMet(): number;
  setMet(value: number): VesselSnapshot;

  getBiome(): string;
  setBiome(value: string): VesselSnapshot;

  getMass(): number;
  setMass(value: number): VesselSnapshot;

  getStage(): number;
  setStage(value: number): VesselSnapshot;

  getTotalresourcesMap(): jspb.Map<string, VesselResource>;
  clearTotalresourcesMap(): VesselSnapshot;

  getStageresourcesMap(): jspb.Map<string, VesselResource>;
  clearStageresourcesMap(): VesselSnapshot;

  getSasmode(): VesselSnapshot.SASMode;
  setSasmode(value: VesselSnapshot.SASMode): VesselSnapshot;

  getOrbitingbody(): string;
  setOrbitingbody(value: string): VesselSnapshot;

  getMainthrottle(): number;
  setMainthrottle(value: number): VesselSnapshot;

  getSasenabled(): boolean;
  setSasenabled(value: boolean): VesselSnapshot;

  getRcsenabled(): boolean;
  setRcsenabled(value: boolean): VesselSnapshot;

  getGearenabled(): boolean;
  setGearenabled(value: boolean): VesselSnapshot;

  getLightenabled(): boolean;
  setLightenabled(value: boolean): VesselSnapshot;

  getBrakesenabled(): boolean;
  setBrakesenabled(value: boolean): VesselSnapshot;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VesselSnapshot.AsObject;
  static toObject(includeInstance: boolean, msg: VesselSnapshot): VesselSnapshot.AsObject;
  static serializeBinaryToWriter(message: VesselSnapshot, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VesselSnapshot;
  static deserializeBinaryFromReader(message: VesselSnapshot, reader: jspb.BinaryReader): VesselSnapshot;
}

export namespace VesselSnapshot {
  export type AsObject = {
    situation: VesselSnapshot.VesselSituation,
    met: number,
    biome: string,
    mass: number,
    stage: number,
    totalresourcesMap: Array<[string, VesselResource.AsObject]>,
    stageresourcesMap: Array<[string, VesselResource.AsObject]>,
    sasmode: VesselSnapshot.SASMode,
    orbitingbody: string,
    mainthrottle: number,
    sasenabled: boolean,
    rcsenabled: boolean,
    gearenabled: boolean,
    lightenabled: boolean,
    brakesenabled: boolean,
  }

  export enum VesselSituation { 
    LANDED = 0,
    SPLASHED = 1,
    PRELAUNCH = 2,
    FLYING = 3,
    SUBORBITAL = 4,
    ORBITING = 5,
    ESCAPING = 6,
    DOCKED = 7,
  }

  export enum SASMode { 
    STABILITYASSIST = 0,
    PROGRADE = 1,
    RETROGRADE = 2,
    NORMAL = 3,
    ANTINORMAL = 4,
    RADIALIN = 5,
    RADIALOUT = 6,
    TARGET = 7,
    ANTITARGET = 8,
    MANEUVER = 9,
  }
}

export class Vector3d extends jspb.Message {
  getX(): number;
  setX(value: number): Vector3d;

  getY(): number;
  setY(value: number): Vector3d;

  getZ(): number;
  setZ(value: number): Vector3d;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Vector3d.AsObject;
  static toObject(includeInstance: boolean, msg: Vector3d): Vector3d.AsObject;
  static serializeBinaryToWriter(message: Vector3d, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Vector3d;
  static deserializeBinaryFromReader(message: Vector3d, reader: jspb.BinaryReader): Vector3d;
}

export namespace Vector3d {
  export type AsObject = {
    x: number,
    y: number,
    z: number,
  }
}

export class QuaternionD extends jspb.Message {
  getX(): number;
  setX(value: number): QuaternionD;

  getY(): number;
  setY(value: number): QuaternionD;

  getZ(): number;
  setZ(value: number): QuaternionD;

  getW(): number;
  setW(value: number): QuaternionD;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): QuaternionD.AsObject;
  static toObject(includeInstance: boolean, msg: QuaternionD): QuaternionD.AsObject;
  static serializeBinaryToWriter(message: QuaternionD, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): QuaternionD;
  static deserializeBinaryFromReader(message: QuaternionD, reader: jspb.BinaryReader): QuaternionD;
}

export namespace QuaternionD {
  export type AsObject = {
    x: number,
    y: number,
    z: number,
    w: number,
  }
}

export class NavBallMarker extends jspb.Message {
  getYaw(): number;
  setYaw(value: number): NavBallMarker;

  getPitch(): number;
  setPitch(value: number): NavBallMarker;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NavBallMarker.AsObject;
  static toObject(includeInstance: boolean, msg: NavBallMarker): NavBallMarker.AsObject;
  static serializeBinaryToWriter(message: NavBallMarker, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NavBallMarker;
  static deserializeBinaryFromReader(message: NavBallMarker, reader: jspb.BinaryReader): NavBallMarker;
}

export namespace NavBallMarker {
  export type AsObject = {
    yaw: number,
    pitch: number,
  }
}

export class AttitudeInfo extends jspb.Message {
  getPosition(): Vector3d | undefined;
  setPosition(value?: Vector3d): AttitudeInfo;
  hasPosition(): boolean;
  clearPosition(): AttitudeInfo;

  getDirection(): Vector3d | undefined;
  setDirection(value?: Vector3d): AttitudeInfo;
  hasDirection(): boolean;
  clearDirection(): AttitudeInfo;

  getVelocity(): Vector3d | undefined;
  setVelocity(value?: Vector3d): AttitudeInfo;
  hasVelocity(): boolean;
  clearVelocity(): AttitudeInfo;

  getPrograde(): Vector3d | undefined;
  setPrograde(value?: Vector3d): AttitudeInfo;
  hasPrograde(): boolean;
  clearPrograde(): AttitudeInfo;

  getNormal(): Vector3d | undefined;
  setNormal(value?: Vector3d): AttitudeInfo;
  hasNormal(): boolean;
  clearNormal(): AttitudeInfo;

  getRadialout(): Vector3d | undefined;
  setRadialout(value?: Vector3d): AttitudeInfo;
  hasRadialout(): boolean;
  clearRadialout(): AttitudeInfo;

  getUp(): Vector3d | undefined;
  setUp(value?: Vector3d): AttitudeInfo;
  hasUp(): boolean;
  clearUp(): AttitudeInfo;

  getForward(): Vector3d | undefined;
  setForward(value?: Vector3d): AttitudeInfo;
  hasForward(): boolean;
  clearForward(): AttitudeInfo;

  getRight(): Vector3d | undefined;
  setRight(value?: Vector3d): AttitudeInfo;
  hasRight(): boolean;
  clearRight(): AttitudeInfo;

  getRotation(): QuaternionD | undefined;
  setRotation(value?: QuaternionD): AttitudeInfo;
  hasRotation(): boolean;
  clearRotation(): AttitudeInfo;

  getSrfreferenceframerotation(): QuaternionD | undefined;
  setSrfreferenceframerotation(value?: QuaternionD): AttitudeInfo;
  hasSrfreferenceframerotation(): boolean;
  clearSrfreferenceframerotation(): AttitudeInfo;

  getOrbitprograde(): NavBallMarker | undefined;
  setOrbitprograde(value?: NavBallMarker): AttitudeInfo;
  hasOrbitprograde(): boolean;
  clearOrbitprograde(): AttitudeInfo;

  getOrbitretrograde(): NavBallMarker | undefined;
  setOrbitretrograde(value?: NavBallMarker): AttitudeInfo;
  hasOrbitretrograde(): boolean;
  clearOrbitretrograde(): AttitudeInfo;

  getOrbitnormal(): NavBallMarker | undefined;
  setOrbitnormal(value?: NavBallMarker): AttitudeInfo;
  hasOrbitnormal(): boolean;
  clearOrbitnormal(): AttitudeInfo;

  getOrbitantinormal(): NavBallMarker | undefined;
  setOrbitantinormal(value?: NavBallMarker): AttitudeInfo;
  hasOrbitantinormal(): boolean;
  clearOrbitantinormal(): AttitudeInfo;

  getOrbitradialin(): NavBallMarker | undefined;
  setOrbitradialin(value?: NavBallMarker): AttitudeInfo;
  hasOrbitradialin(): boolean;
  clearOrbitradialin(): AttitudeInfo;

  getOrbitradialout(): NavBallMarker | undefined;
  setOrbitradialout(value?: NavBallMarker): AttitudeInfo;
  hasOrbitradialout(): boolean;
  clearOrbitradialout(): AttitudeInfo;

  getSrfprograde(): NavBallMarker | undefined;
  setSrfprograde(value?: NavBallMarker): AttitudeInfo;
  hasSrfprograde(): boolean;
  clearSrfprograde(): AttitudeInfo;

  getSrfretrograde(): NavBallMarker | undefined;
  setSrfretrograde(value?: NavBallMarker): AttitudeInfo;
  hasSrfretrograde(): boolean;
  clearSrfretrograde(): AttitudeInfo;

  getTarget(): NavBallMarker | undefined;
  setTarget(value?: NavBallMarker): AttitudeInfo;
  hasTarget(): boolean;
  clearTarget(): AttitudeInfo;

  getAntitarget(): NavBallMarker | undefined;
  setAntitarget(value?: NavBallMarker): AttitudeInfo;
  hasAntitarget(): boolean;
  clearAntitarget(): AttitudeInfo;

  getTargetrelvel(): NavBallMarker | undefined;
  setTargetrelvel(value?: NavBallMarker): AttitudeInfo;
  hasTargetrelvel(): boolean;
  clearTargetrelvel(): AttitudeInfo;

  getAntitargetrelvel(): NavBallMarker | undefined;
  setAntitargetrelvel(value?: NavBallMarker): AttitudeInfo;
  hasAntitargetrelvel(): boolean;
  clearAntitargetrelvel(): AttitudeInfo;

  getManeuvernode(): NavBallMarker | undefined;
  setManeuvernode(value?: NavBallMarker): AttitudeInfo;
  hasManeuvernode(): boolean;
  clearManeuvernode(): AttitudeInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AttitudeInfo.AsObject;
  static toObject(includeInstance: boolean, msg: AttitudeInfo): AttitudeInfo.AsObject;
  static serializeBinaryToWriter(message: AttitudeInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AttitudeInfo;
  static deserializeBinaryFromReader(message: AttitudeInfo, reader: jspb.BinaryReader): AttitudeInfo;
}

export namespace AttitudeInfo {
  export type AsObject = {
    position?: Vector3d.AsObject,
    direction?: Vector3d.AsObject,
    velocity?: Vector3d.AsObject,
    prograde?: Vector3d.AsObject,
    normal?: Vector3d.AsObject,
    radialout?: Vector3d.AsObject,
    up?: Vector3d.AsObject,
    forward?: Vector3d.AsObject,
    right?: Vector3d.AsObject,
    rotation?: QuaternionD.AsObject,
    srfreferenceframerotation?: QuaternionD.AsObject,
    orbitprograde?: NavBallMarker.AsObject,
    orbitretrograde?: NavBallMarker.AsObject,
    orbitnormal?: NavBallMarker.AsObject,
    orbitantinormal?: NavBallMarker.AsObject,
    orbitradialin?: NavBallMarker.AsObject,
    orbitradialout?: NavBallMarker.AsObject,
    srfprograde?: NavBallMarker.AsObject,
    srfretrograde?: NavBallMarker.AsObject,
    target?: NavBallMarker.AsObject,
    antitarget?: NavBallMarker.AsObject,
    targetrelvel?: NavBallMarker.AsObject,
    antitargetrelvel?: NavBallMarker.AsObject,
    maneuvernode?: NavBallMarker.AsObject,
  }
}

export class FlightSnapshot extends jspb.Message {
  getVesselid(): string;
  setVesselid(value: string): FlightSnapshot;

  getGforce(): number;
  setGforce(value: number): FlightSnapshot;

  getMeanaltitude(): number;
  setMeanaltitude(value: number): FlightSnapshot;

  getSurfacealtitude(): number;
  setSurfacealtitude(value: number): FlightSnapshot;

  getBedrockaltitude(): number;
  setBedrockaltitude(value: number): FlightSnapshot;

  getElevation(): number;
  setElevation(value: number): FlightSnapshot;

  getLatitude(): number;
  setLatitude(value: number): FlightSnapshot;

  getLongitude(): number;
  setLongitude(value: number): FlightSnapshot;

  getSurfacespeed(): number;
  setSurfacespeed(value: number): FlightSnapshot;

  getHorizontalspeed(): number;
  setHorizontalspeed(value: number): FlightSnapshot;

  getVerticalspeed(): number;
  setVerticalspeed(value: number): FlightSnapshot;

  getPitch(): number;
  setPitch(value: number): FlightSnapshot;

  getYaw(): number;
  setYaw(value: number): FlightSnapshot;

  getRoll(): number;
  setRoll(value: number): FlightSnapshot;

  getAtmospheredensity(): number;
  setAtmospheredensity(value: number): FlightSnapshot;

  getDynamicpressure(): number;
  setDynamicpressure(value: number): FlightSnapshot;

  getStaticpressureatmsl(): number;
  setStaticpressureatmsl(value: number): FlightSnapshot;

  getStaticpressure(): number;
  setStaticpressure(value: number): FlightSnapshot;

  getSpeedofsound(): number;
  setSpeedofsound(value: number): FlightSnapshot;

  getMach(): number;
  setMach(value: number): FlightSnapshot;

  getTrueairspeed(): number;
  setTrueairspeed(value: number): FlightSnapshot;

  getAngleofattack(): number;
  setAngleofattack(value: number): FlightSnapshot;

  getTotalairtemperature(): number;
  setTotalairtemperature(value: number): FlightSnapshot;

  getStaticairtemperature(): number;
  setStaticairtemperature(value: number): FlightSnapshot;

  getOrbitspeed(): number;
  setOrbitspeed(value: number): FlightSnapshot;

  getMissiontime(): number;
  setMissiontime(value: number): FlightSnapshot;

  getSideslipangle(): number;
  setSideslipangle(value: number): FlightSnapshot;

  getSurfacevelocityprograde(): Vector3d | undefined;
  setSurfacevelocityprograde(value?: Vector3d): FlightSnapshot;
  hasSurfacevelocityprograde(): boolean;
  clearSurfacevelocityprograde(): FlightSnapshot;

  getOrbitalvelocityprograde(): Vector3d | undefined;
  setOrbitalvelocityprograde(value?: Vector3d): FlightSnapshot;
  hasOrbitalvelocityprograde(): boolean;
  clearOrbitalvelocityprograde(): FlightSnapshot;

  getNavballangles(): Vector3d | undefined;
  setNavballangles(value?: Vector3d): FlightSnapshot;
  hasNavballangles(): boolean;
  clearNavballangles(): FlightSnapshot;

  getExternaltemperature(): number;
  setExternaltemperature(value: number): FlightSnapshot;

  getTwractual(): number;
  setTwractual(value: number): FlightSnapshot;

  getTwrmaxthrust(): number;
  setTwrmaxthrust(value: number): FlightSnapshot;

  getTwrmaxthrustnolimit(): number;
  setTwrmaxthrustnolimit(value: number): FlightSnapshot;

  getDragforce(): number;
  setDragforce(value: number): FlightSnapshot;

  getLiftforce(): number;
  setLiftforce(value: number): FlightSnapshot;

  getTerminalvelocity(): number;
  setTerminalvelocity(value: number): FlightSnapshot;

  getLiftupforce(): number;
  setLiftupforce(value: number): FlightSnapshot;

  getAttitudeinfo(): AttitudeInfo | undefined;
  setAttitudeinfo(value?: AttitudeInfo): FlightSnapshot;
  hasAttitudeinfo(): boolean;
  clearAttitudeinfo(): FlightSnapshot;

  getUt(): number;
  setUt(value: number): FlightSnapshot;

  getNavmode(): string;
  setNavmode(value: string): FlightSnapshot;

  getStallfraction(): number;
  setStallfraction(value: number): FlightSnapshot;

  getDragcoefficient(): number;
  setDragcoefficient(value: number): FlightSnapshot;

  getLiftcoefficient(): number;
  setLiftcoefficient(value: number): FlightSnapshot;

  getBallisticcoefficient(): number;
  setBallisticcoefficient(value: number): FlightSnapshot;

  getTsfc(): number;
  setTsfc(value: number): FlightSnapshot;

  getReynoldsnumber(): number;
  setReynoldsnumber(value: number): FlightSnapshot;

  getTwrdata(): Vector3d | undefined;
  setTwrdata(value?: Vector3d): FlightSnapshot;
  hasTwrdata(): boolean;
  clearTwrdata(): FlightSnapshot;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FlightSnapshot.AsObject;
  static toObject(includeInstance: boolean, msg: FlightSnapshot): FlightSnapshot.AsObject;
  static serializeBinaryToWriter(message: FlightSnapshot, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FlightSnapshot;
  static deserializeBinaryFromReader(message: FlightSnapshot, reader: jspb.BinaryReader): FlightSnapshot;
}

export namespace FlightSnapshot {
  export type AsObject = {
    vesselid: string,
    gforce: number,
    meanaltitude: number,
    surfacealtitude: number,
    bedrockaltitude: number,
    elevation: number,
    latitude: number,
    longitude: number,
    surfacespeed: number,
    horizontalspeed: number,
    verticalspeed: number,
    pitch: number,
    yaw: number,
    roll: number,
    atmospheredensity: number,
    dynamicpressure: number,
    staticpressureatmsl: number,
    staticpressure: number,
    speedofsound: number,
    mach: number,
    trueairspeed: number,
    angleofattack: number,
    totalairtemperature: number,
    staticairtemperature: number,
    orbitspeed: number,
    missiontime: number,
    sideslipangle: number,
    surfacevelocityprograde?: Vector3d.AsObject,
    orbitalvelocityprograde?: Vector3d.AsObject,
    navballangles?: Vector3d.AsObject,
    externaltemperature: number,
    twractual: number,
    twrmaxthrust: number,
    twrmaxthrustnolimit: number,
    dragforce: number,
    liftforce: number,
    terminalvelocity: number,
    liftupforce: number,
    attitudeinfo?: AttitudeInfo.AsObject,
    ut: number,
    navmode: string,
    stallfraction: number,
    dragcoefficient: number,
    liftcoefficient: number,
    ballisticcoefficient: number,
    tsfc: number,
    reynoldsnumber: number,
    twrdata?: Vector3d.AsObject,
  }
}

export class OrbitSnapshot extends jspb.Message {
  getBodyname(): string;
  setBodyname(value: string): OrbitSnapshot;

  getApoapsis(): number;
  setApoapsis(value: number): OrbitSnapshot;

  getPeriapsis(): number;
  setPeriapsis(value: number): OrbitSnapshot;

  getApoapsisaltitude(): number;
  setApoapsisaltitude(value: number): OrbitSnapshot;

  getPeriapsisaltitude(): number;
  setPeriapsisaltitude(value: number): OrbitSnapshot;

  getSemimajoraxis(): number;
  setSemimajoraxis(value: number): OrbitSnapshot;

  getSemiminoraxis(): number;
  setSemiminoraxis(value: number): OrbitSnapshot;

  getRadius(): number;
  setRadius(value: number): OrbitSnapshot;

  getSpeed(): number;
  setSpeed(value: number): OrbitSnapshot;

  getPeriod(): number;
  setPeriod(value: number): OrbitSnapshot;

  getTimetoapoapsis(): number;
  setTimetoapoapsis(value: number): OrbitSnapshot;

  getTimetoperiapsis(): number;
  setTimetoperiapsis(value: number): OrbitSnapshot;

  getEccentricity(): number;
  setEccentricity(value: number): OrbitSnapshot;

  getInclination(): number;
  setInclination(value: number): OrbitSnapshot;

  getLongitudeofascendingnode(): number;
  setLongitudeofascendingnode(value: number): OrbitSnapshot;

  getArgumentofperiapsis(): number;
  setArgumentofperiapsis(value: number): OrbitSnapshot;

  getMeananomalyatepoch(): number;
  setMeananomalyatepoch(value: number): OrbitSnapshot;

  getEpoch(): number;
  setEpoch(value: number): OrbitSnapshot;

  getMeananomaly(): number;
  setMeananomaly(value: number): OrbitSnapshot;

  getEccentricanomaly(): number;
  setEccentricanomaly(value: number): OrbitSnapshot;

  getTrueanomaly(): number;
  setTrueanomaly(value: number): OrbitSnapshot;

  getTimetosoichange(): number;
  setTimetosoichange(value: number): OrbitSnapshot;

  getOrbitalspeed(): number;
  setOrbitalspeed(value: number): OrbitSnapshot;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): OrbitSnapshot.AsObject;
  static toObject(includeInstance: boolean, msg: OrbitSnapshot): OrbitSnapshot.AsObject;
  static serializeBinaryToWriter(message: OrbitSnapshot, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): OrbitSnapshot;
  static deserializeBinaryFromReader(message: OrbitSnapshot, reader: jspb.BinaryReader): OrbitSnapshot;
}

export namespace OrbitSnapshot {
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
    timetosoichange: number,
    orbitalspeed: number,
  }
}

export class WheelSnapshot extends jspb.Message {
  getState(): WheelSnapshot.WheelState;
  setState(value: WheelSnapshot.WheelState): WheelSnapshot;

  getGrounded(): boolean;
  setGrounded(value: boolean): WheelSnapshot;

  getDeployed(): boolean;
  setDeployed(value: boolean): WheelSnapshot;

  getPowered(): boolean;
  setPowered(value: boolean): WheelSnapshot;

  getMotorenabled(): boolean;
  setMotorenabled(value: boolean): WheelSnapshot;

  getMotorstate(): WheelSnapshot.MotorState;
  setMotorstate(value: WheelSnapshot.MotorState): WheelSnapshot;

  getMotoroutput(): number;
  setMotoroutput(value: number): WheelSnapshot;

  getInverted(): boolean;
  setInverted(value: boolean): WheelSnapshot;

  getTractioncontrolenabled(): boolean;
  setTractioncontrolenabled(value: boolean): WheelSnapshot;

  getTractioncontrol(): number;
  setTractioncontrol(value: number): WheelSnapshot;

  getDrivelimiter(): number;
  setDrivelimiter(value: number): WheelSnapshot;

  getAutofrictioncontrolenabled(): boolean;
  setAutofrictioncontrolenabled(value: boolean): WheelSnapshot;

  getManualfrictioncontrol(): number;
  setManualfrictioncontrol(value: number): WheelSnapshot;

  getSteeringenabled(): boolean;
  setSteeringenabled(value: boolean): WheelSnapshot;

  getSteeringinverted(): boolean;
  setSteeringinverted(value: boolean): WheelSnapshot;

  getBroken(): boolean;
  setBroken(value: boolean): WheelSnapshot;

  getStress(): number;
  setStress(value: number): WheelSnapshot;

  getStresspercentage(): number;
  setStresspercentage(value: number): WheelSnapshot;

  getDeflection(): number;
  setDeflection(value: number): WheelSnapshot;

  getSlip(): number;
  setSlip(value: number): WheelSnapshot;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): WheelSnapshot.AsObject;
  static toObject(includeInstance: boolean, msg: WheelSnapshot): WheelSnapshot.AsObject;
  static serializeBinaryToWriter(message: WheelSnapshot, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): WheelSnapshot;
  static deserializeBinaryFromReader(message: WheelSnapshot, reader: jspb.BinaryReader): WheelSnapshot;
}

export namespace WheelSnapshot {
  export type AsObject = {
    state: WheelSnapshot.WheelState,
    grounded: boolean,
    deployed: boolean,
    powered: boolean,
    motorenabled: boolean,
    motorstate: WheelSnapshot.MotorState,
    motoroutput: number,
    inverted: boolean,
    tractioncontrolenabled: boolean,
    tractioncontrol: number,
    drivelimiter: number,
    autofrictioncontrolenabled: boolean,
    manualfrictioncontrol: number,
    steeringenabled: boolean,
    steeringinverted: boolean,
    broken: boolean,
    stress: number,
    stresspercentage: number,
    deflection: number,
    slip: number,
  }

  export enum WheelType { 
    FREE = 0,
    MOTORIZED = 1,
    LEG = 2,
  }

  export enum WheelState { 
    RETRACTED = 0,
    DEPLOYED = 1,
    RETRACTING = 2,
    DEPLOYING = 3,
    BROKEN = 4,
  }

  export enum MotorState { 
    INOPERABLE = 0,
    NOTENOUGHRESOURCES = 11,
    DISABLED = 2,
    IDLE = 3,
    RUNNING = 4,
  }
}

export class SolarPanelSnapshot extends jspb.Message {
  getState(): SolarPanelSnapshot.SolarPanelState;
  setState(value: SolarPanelSnapshot.SolarPanelState): SolarPanelSnapshot;

  getDeployed(): boolean;
  setDeployed(value: boolean): SolarPanelSnapshot;

  getEnergyflow(): number;
  setEnergyflow(value: number): SolarPanelSnapshot;

  getSunexposure(): number;
  setSunexposure(value: number): SolarPanelSnapshot;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SolarPanelSnapshot.AsObject;
  static toObject(includeInstance: boolean, msg: SolarPanelSnapshot): SolarPanelSnapshot.AsObject;
  static serializeBinaryToWriter(message: SolarPanelSnapshot, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SolarPanelSnapshot;
  static deserializeBinaryFromReader(message: SolarPanelSnapshot, reader: jspb.BinaryReader): SolarPanelSnapshot;
}

export namespace SolarPanelSnapshot {
  export type AsObject = {
    state: SolarPanelSnapshot.SolarPanelState,
    deployed: boolean,
    energyflow: number,
    sunexposure: number,
  }

  export enum SolarPanelState { 
    RETRACTED = 0,
    EXTENDED = 1,
    RETRACTING = 2,
    EXTENDING = 3,
    BROKEN = 4,
  }
}

export class SensorSnapshot extends jspb.Message {
  getActivated(): boolean;
  setActivated(value: boolean): SensorSnapshot;

  getReading(): string;
  setReading(value: string): SensorSnapshot;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SensorSnapshot.AsObject;
  static toObject(includeInstance: boolean, msg: SensorSnapshot): SensorSnapshot.AsObject;
  static serializeBinaryToWriter(message: SensorSnapshot, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SensorSnapshot;
  static deserializeBinaryFromReader(message: SensorSnapshot, reader: jspb.BinaryReader): SensorSnapshot;
}

export namespace SensorSnapshot {
  export type AsObject = {
    activated: boolean,
    reading: string,
  }
}

export class ResourceHarvesterSnapshot extends jspb.Message {
  getState(): ResourceHarvesterSnapshot.ResourceHarvesterState;
  setState(value: ResourceHarvesterSnapshot.ResourceHarvesterState): ResourceHarvesterSnapshot;

  getDeployed(): boolean;
  setDeployed(value: boolean): ResourceHarvesterSnapshot;

  getActivated(): boolean;
  setActivated(value: boolean): ResourceHarvesterSnapshot;

  getExtractionrate(): number;
  setExtractionrate(value: number): ResourceHarvesterSnapshot;

  getThermalefficiency(): number;
  setThermalefficiency(value: number): ResourceHarvesterSnapshot;

  getCoretemperature(): number;
  setCoretemperature(value: number): ResourceHarvesterSnapshot;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ResourceHarvesterSnapshot.AsObject;
  static toObject(includeInstance: boolean, msg: ResourceHarvesterSnapshot): ResourceHarvesterSnapshot.AsObject;
  static serializeBinaryToWriter(message: ResourceHarvesterSnapshot, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ResourceHarvesterSnapshot;
  static deserializeBinaryFromReader(message: ResourceHarvesterSnapshot, reader: jspb.BinaryReader): ResourceHarvesterSnapshot;
}

export namespace ResourceHarvesterSnapshot {
  export type AsObject = {
    state: ResourceHarvesterSnapshot.ResourceHarvesterState,
    deployed: boolean,
    activated: boolean,
    extractionrate: number,
    thermalefficiency: number,
    coretemperature: number,
  }

  export enum ResourceHarvesterState { 
    RETRACTED = 0,
    DEPLOYED = 1,
    RETRACTING = 2,
    DEPLOYING = 3,
    ACTIVE = 4,
  }
}

export class ConverterSnapshot extends jspb.Message {
  getName(): string;
  setName(value: string): ConverterSnapshot;

  getState(): ConverterSnapshot.ResourceConverterState;
  setState(value: ConverterSnapshot.ResourceConverterState): ConverterSnapshot;

  getThermalefficiency(): number;
  setThermalefficiency(value: number): ConverterSnapshot;

  getCoretemperature(): number;
  setCoretemperature(value: number): ConverterSnapshot;

  getActive(): boolean;
  setActive(value: boolean): ConverterSnapshot;

  getStatus(): string;
  setStatus(value: string): ConverterSnapshot;

  getOverheating(): boolean;
  setOverheating(value: boolean): ConverterSnapshot;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConverterSnapshot.AsObject;
  static toObject(includeInstance: boolean, msg: ConverterSnapshot): ConverterSnapshot.AsObject;
  static serializeBinaryToWriter(message: ConverterSnapshot, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConverterSnapshot;
  static deserializeBinaryFromReader(message: ConverterSnapshot, reader: jspb.BinaryReader): ConverterSnapshot;
}

export namespace ConverterSnapshot {
  export type AsObject = {
    name: string,
    state: ConverterSnapshot.ResourceConverterState,
    thermalefficiency: number,
    coretemperature: number,
    active: boolean,
    status: string,
    overheating: boolean,
  }

  export enum ResourceConverterState { 
    UNKNOWN = 0,
    RUNNING = 1,
    IDLE = 2,
    MISSINGRESOURCE = 3,
    STORAGEFULL = 4,
    CAPACITY = 5,
  }
}

export class ResourceConverterSnapshot extends jspb.Message {
  getConvertersMap(): jspb.Map<string, ConverterSnapshot>;
  clearConvertersMap(): ResourceConverterSnapshot;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ResourceConverterSnapshot.AsObject;
  static toObject(includeInstance: boolean, msg: ResourceConverterSnapshot): ResourceConverterSnapshot.AsObject;
  static serializeBinaryToWriter(message: ResourceConverterSnapshot, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ResourceConverterSnapshot;
  static deserializeBinaryFromReader(message: ResourceConverterSnapshot, reader: jspb.BinaryReader): ResourceConverterSnapshot;
}

export namespace ResourceConverterSnapshot {
  export type AsObject = {
    convertersMap: Array<[string, ConverterSnapshot.AsObject]>,
  }
}

export class ReactionWheelSnapshot extends jspb.Message {
  getState(): ReactionWheelSnapshot.ReactionWheelState;
  setState(value: ReactionWheelSnapshot.ReactionWheelState): ReactionWheelSnapshot;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ReactionWheelSnapshot.AsObject;
  static toObject(includeInstance: boolean, msg: ReactionWheelSnapshot): ReactionWheelSnapshot.AsObject;
  static serializeBinaryToWriter(message: ReactionWheelSnapshot, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ReactionWheelSnapshot;
  static deserializeBinaryFromReader(message: ReactionWheelSnapshot, reader: jspb.BinaryReader): ReactionWheelSnapshot;
}

export namespace ReactionWheelSnapshot {
  export type AsObject = {
    state: ReactionWheelSnapshot.ReactionWheelState,
  }

  export enum ReactionWheelState { 
    ACTIVE = 0,
    DISABLED = 1,
    BROKEN = 2,
  }
}

export class RCSSnapshot extends jspb.Message {
  getEnabled(): boolean;
  setEnabled(value: boolean): RCSSnapshot;

  getThrustlimit(): number;
  setThrustlimit(value: number): RCSSnapshot;

  getPitchenabled(): boolean;
  setPitchenabled(value: boolean): RCSSnapshot;

  getYawenabled(): boolean;
  setYawenabled(value: boolean): RCSSnapshot;

  getRollenabled(): boolean;
  setRollenabled(value: boolean): RCSSnapshot;

  getUpenabled(): boolean;
  setUpenabled(value: boolean): RCSSnapshot;

  getForwardenabled(): boolean;
  setForwardenabled(value: boolean): RCSSnapshot;

  getRightenabled(): boolean;
  setRightenabled(value: boolean): RCSSnapshot;

  getHasfuel(): boolean;
  setHasfuel(value: boolean): RCSSnapshot;

  getPropellantinfoMap(): jspb.Map<string, Propellant>;
  clearPropellantinfoMap(): RCSSnapshot;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RCSSnapshot.AsObject;
  static toObject(includeInstance: boolean, msg: RCSSnapshot): RCSSnapshot.AsObject;
  static serializeBinaryToWriter(message: RCSSnapshot, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RCSSnapshot;
  static deserializeBinaryFromReader(message: RCSSnapshot, reader: jspb.BinaryReader): RCSSnapshot;
}

export namespace RCSSnapshot {
  export type AsObject = {
    enabled: boolean,
    thrustlimit: number,
    pitchenabled: boolean,
    yawenabled: boolean,
    rollenabled: boolean,
    upenabled: boolean,
    forwardenabled: boolean,
    rightenabled: boolean,
    hasfuel: boolean,
    propellantinfoMap: Array<[string, Propellant.AsObject]>,
  }
}

export class RadiatorSnapshot extends jspb.Message {
  getState(): RadiatorSnapshot.RadiatorState;
  setState(value: RadiatorSnapshot.RadiatorState): RadiatorSnapshot;

  getDeployed(): boolean;
  setDeployed(value: boolean): RadiatorSnapshot;

  getCooling(): boolean;
  setCooling(value: boolean): RadiatorSnapshot;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RadiatorSnapshot.AsObject;
  static toObject(includeInstance: boolean, msg: RadiatorSnapshot): RadiatorSnapshot.AsObject;
  static serializeBinaryToWriter(message: RadiatorSnapshot, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RadiatorSnapshot;
  static deserializeBinaryFromReader(message: RadiatorSnapshot, reader: jspb.BinaryReader): RadiatorSnapshot;
}

export namespace RadiatorSnapshot {
  export type AsObject = {
    state: RadiatorSnapshot.RadiatorState,
    deployed: boolean,
    cooling: boolean,
  }

  export enum RadiatorState { 
    RETRACTED = 0,
    EXTENDED = 1,
    RETRACTING = 2,
    EXTENDING = 3,
    BROKEN = 4,
  }
}

export class ParachuteSnapshot extends jspb.Message {
  getState(): ParachuteSnapshot.ParachuteState;
  setState(value: ParachuteSnapshot.ParachuteState): ParachuteSnapshot;

  getDeployed(): boolean;
  setDeployed(value: boolean): ParachuteSnapshot;

  getDeployaltitude(): number;
  setDeployaltitude(value: number): ParachuteSnapshot;

  getDeployminpressure(): number;
  setDeployminpressure(value: number): ParachuteSnapshot;

  getDeploymentsafestate(): ParachuteSnapshot.DeploymentSafeState;
  setDeploymentsafestate(value: ParachuteSnapshot.DeploymentSafeState): ParachuteSnapshot;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ParachuteSnapshot.AsObject;
  static toObject(includeInstance: boolean, msg: ParachuteSnapshot): ParachuteSnapshot.AsObject;
  static serializeBinaryToWriter(message: ParachuteSnapshot, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ParachuteSnapshot;
  static deserializeBinaryFromReader(message: ParachuteSnapshot, reader: jspb.BinaryReader): ParachuteSnapshot;
}

export namespace ParachuteSnapshot {
  export type AsObject = {
    state: ParachuteSnapshot.ParachuteState,
    deployed: boolean,
    deployaltitude: number,
    deployminpressure: number,
    deploymentsafestate: ParachuteSnapshot.DeploymentSafeState,
  }

  export enum ParachuteState { 
    STOWED = 0,
    ACTIVE = 1,
    SEMIDEPLOYED = 2,
    DEPLOYED = 3,
    CUT = 4,
  }

  export enum DeploymentSafeState { 
    SAFE = 0,
    RISKY = 1,
    UNSAFE = 2,
    NONE = 3,
  }
}

export class LightSnapshot extends jspb.Message {
  getOn(): boolean;
  setOn(value: boolean): LightSnapshot;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LightSnapshot.AsObject;
  static toObject(includeInstance: boolean, msg: LightSnapshot): LightSnapshot.AsObject;
  static serializeBinaryToWriter(message: LightSnapshot, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LightSnapshot;
  static deserializeBinaryFromReader(message: LightSnapshot, reader: jspb.BinaryReader): LightSnapshot;
}

export namespace LightSnapshot {
  export type AsObject = {
    on: boolean,
  }
}

export class LegSnapshot extends jspb.Message {
  getState(): LegSnapshot.LegState;
  setState(value: LegSnapshot.LegState): LegSnapshot;

  getDeployed(): boolean;
  setDeployed(value: boolean): LegSnapshot;

  getGrounded(): boolean;
  setGrounded(value: boolean): LegSnapshot;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LegSnapshot.AsObject;
  static toObject(includeInstance: boolean, msg: LegSnapshot): LegSnapshot.AsObject;
  static serializeBinaryToWriter(message: LegSnapshot, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LegSnapshot;
  static deserializeBinaryFromReader(message: LegSnapshot, reader: jspb.BinaryReader): LegSnapshot;
}

export namespace LegSnapshot {
  export type AsObject = {
    state: LegSnapshot.LegState,
    deployed: boolean,
    grounded: boolean,
  }

  export enum LegState { 
    RETRACTED = 0,
    DEPLOYED = 1,
    RETRACTING = 2,
    DEPLOYING = 3,
    BROKEN = 4,
  }
}

export class IntakeSnapshot extends jspb.Message {
  getOpen(): boolean;
  setOpen(value: boolean): IntakeSnapshot;

  getSpeed(): number;
  setSpeed(value: number): IntakeSnapshot;

  getFlow(): number;
  setFlow(value: number): IntakeSnapshot;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): IntakeSnapshot.AsObject;
  static toObject(includeInstance: boolean, msg: IntakeSnapshot): IntakeSnapshot.AsObject;
  static serializeBinaryToWriter(message: IntakeSnapshot, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): IntakeSnapshot;
  static deserializeBinaryFromReader(message: IntakeSnapshot, reader: jspb.BinaryReader): IntakeSnapshot;
}

export namespace IntakeSnapshot {
  export type AsObject = {
    open: boolean,
    speed: number,
    flow: number,
  }
}

export class FairingSnapshot extends jspb.Message {
  getJettisoned(): boolean;
  setJettisoned(value: boolean): FairingSnapshot;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FairingSnapshot.AsObject;
  static toObject(includeInstance: boolean, msg: FairingSnapshot): FairingSnapshot.AsObject;
  static serializeBinaryToWriter(message: FairingSnapshot, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FairingSnapshot;
  static deserializeBinaryFromReader(message: FairingSnapshot, reader: jspb.BinaryReader): FairingSnapshot;
}

export namespace FairingSnapshot {
  export type AsObject = {
    jettisoned: boolean,
  }
}

export class Propellant extends jspb.Message {
  getName(): string;
  setName(value: string): Propellant;

  getCurrentamount(): number;
  setCurrentamount(value: number): Propellant;

  getCurrentrequirement(): number;
  setCurrentrequirement(value: number): Propellant;

  getTotalresourceavailable(): number;
  setTotalresourceavailable(value: number): Propellant;

  getTotalresourcecapacity(): number;
  setTotalresourcecapacity(value: number): Propellant;

  getIsdeprived(): boolean;
  setIsdeprived(value: boolean): Propellant;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Propellant.AsObject;
  static toObject(includeInstance: boolean, msg: Propellant): Propellant.AsObject;
  static serializeBinaryToWriter(message: Propellant, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Propellant;
  static deserializeBinaryFromReader(message: Propellant, reader: jspb.BinaryReader): Propellant;
}

export namespace Propellant {
  export type AsObject = {
    name: string,
    currentamount: number,
    currentrequirement: number,
    totalresourceavailable: number,
    totalresourcecapacity: number,
    isdeprived: boolean,
  }
}

export class EngineSnapshot extends jspb.Message {
  getActive(): boolean;
  setActive(value: boolean): EngineSnapshot;

  getThrust(): number;
  setThrust(value: number): EngineSnapshot;

  getThrustpercentage(): number;
  setThrustpercentage(value: number): EngineSnapshot;

  getThrottle(): number;
  setThrottle(value: number): EngineSnapshot;

  getSpecificimpulse(): number;
  setSpecificimpulse(value: number): EngineSnapshot;

  getVacuumspecificimpulse(): number;
  setVacuumspecificimpulse(value: number): EngineSnapshot;

  getPropellantinfoMap(): jspb.Map<string, Propellant>;
  clearPropellantinfoMap(): EngineSnapshot;

  getHasfuel(): boolean;
  setHasfuel(value: boolean): EngineSnapshot;

  getMode(): string;
  setMode(value: string): EngineSnapshot;

  getAutoswitchmode(): boolean;
  setAutoswitchmode(value: boolean): EngineSnapshot;

  getGimballimit(): number;
  setGimballimit(value: number): EngineSnapshot;

  getFlameout(): boolean;
  setFlameout(value: boolean): EngineSnapshot;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EngineSnapshot.AsObject;
  static toObject(includeInstance: boolean, msg: EngineSnapshot): EngineSnapshot.AsObject;
  static serializeBinaryToWriter(message: EngineSnapshot, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EngineSnapshot;
  static deserializeBinaryFromReader(message: EngineSnapshot, reader: jspb.BinaryReader): EngineSnapshot;
}

export namespace EngineSnapshot {
  export type AsObject = {
    active: boolean,
    thrust: number,
    thrustpercentage: number,
    throttle: number,
    specificimpulse: number,
    vacuumspecificimpulse: number,
    propellantinfoMap: Array<[string, Propellant.AsObject]>,
    hasfuel: boolean,
    mode: string,
    autoswitchmode: boolean,
    gimballimit: number,
    flameout: boolean,
  }
}

export class DockingPortSnapshot extends jspb.Message {
  getState(): DockingPortSnapshot.DockingPortState;
  setState(value: DockingPortSnapshot.DockingPortState): DockingPortSnapshot;

  getShieled(): boolean;
  setShieled(value: boolean): DockingPortSnapshot;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DockingPortSnapshot.AsObject;
  static toObject(includeInstance: boolean, msg: DockingPortSnapshot): DockingPortSnapshot.AsObject;
  static serializeBinaryToWriter(message: DockingPortSnapshot, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DockingPortSnapshot;
  static deserializeBinaryFromReader(message: DockingPortSnapshot, reader: jspb.BinaryReader): DockingPortSnapshot;
}

export namespace DockingPortSnapshot {
  export type AsObject = {
    state: DockingPortSnapshot.DockingPortState,
    shieled: boolean,
  }

  export enum DockingPortState { 
    READY = 0,
    DOCKED = 1,
    DOCKING = 2,
    UNDOCKING = 3,
    SHIELDED = 4,
    MOVING = 5,
    PREATTACHED = 6,
  }
}

export class DecouplerSnapshot extends jspb.Message {
  getDecoupled(): boolean;
  setDecoupled(value: boolean): DecouplerSnapshot;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DecouplerSnapshot.AsObject;
  static toObject(includeInstance: boolean, msg: DecouplerSnapshot): DecouplerSnapshot.AsObject;
  static serializeBinaryToWriter(message: DecouplerSnapshot, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DecouplerSnapshot;
  static deserializeBinaryFromReader(message: DecouplerSnapshot, reader: jspb.BinaryReader): DecouplerSnapshot;
}

export namespace DecouplerSnapshot {
  export type AsObject = {
    decoupled: boolean,
  }
}

export class ControlSurfaceSnapshot extends jspb.Message {
  getPitchenabled(): boolean;
  setPitchenabled(value: boolean): ControlSurfaceSnapshot;

  getYawenabled(): boolean;
  setYawenabled(value: boolean): ControlSurfaceSnapshot;

  getRollenabled(): boolean;
  setRollenabled(value: boolean): ControlSurfaceSnapshot;

  getAuthoritylimiter(): number;
  setAuthoritylimiter(value: number): ControlSurfaceSnapshot;

  getDeployed(): boolean;
  setDeployed(value: boolean): ControlSurfaceSnapshot;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ControlSurfaceSnapshot.AsObject;
  static toObject(includeInstance: boolean, msg: ControlSurfaceSnapshot): ControlSurfaceSnapshot.AsObject;
  static serializeBinaryToWriter(message: ControlSurfaceSnapshot, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ControlSurfaceSnapshot;
  static deserializeBinaryFromReader(message: ControlSurfaceSnapshot, reader: jspb.BinaryReader): ControlSurfaceSnapshot;
}

export namespace ControlSurfaceSnapshot {
  export type AsObject = {
    pitchenabled: boolean,
    yawenabled: boolean,
    rollenabled: boolean,
    authoritylimiter: number,
    deployed: boolean,
  }
}

export class CargoBaySnapshot extends jspb.Message {
  getState(): CargoBaySnapshot.CargoBayState;
  setState(value: CargoBaySnapshot.CargoBayState): CargoBaySnapshot;

  getDeploypercent(): number;
  setDeploypercent(value: number): CargoBaySnapshot;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CargoBaySnapshot.AsObject;
  static toObject(includeInstance: boolean, msg: CargoBaySnapshot): CargoBaySnapshot.AsObject;
  static serializeBinaryToWriter(message: CargoBaySnapshot, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CargoBaySnapshot;
  static deserializeBinaryFromReader(message: CargoBaySnapshot, reader: jspb.BinaryReader): CargoBaySnapshot;
}

export namespace CargoBaySnapshot {
  export type AsObject = {
    state: CargoBaySnapshot.CargoBayState,
    deploypercent: number,
  }

  export enum CargoBayState { 
    CLOSED = 0,
    OPEN = 1,
    CLOSING = 2,
    OPENING = 3,
  }
}

export class AntennaSnapshot extends jspb.Message {
  getState(): AntennaSnapshot.AntennaState;
  setState(value: AntennaSnapshot.AntennaState): AntennaSnapshot;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AntennaSnapshot.AsObject;
  static toObject(includeInstance: boolean, msg: AntennaSnapshot): AntennaSnapshot.AsObject;
  static serializeBinaryToWriter(message: AntennaSnapshot, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AntennaSnapshot;
  static deserializeBinaryFromReader(message: AntennaSnapshot, reader: jspb.BinaryReader): AntennaSnapshot;
}

export namespace AntennaSnapshot {
  export type AsObject = {
    state: AntennaSnapshot.AntennaState,
  }

  export enum AntennaState { 
    RETRACTED = 0,
    EXTENDED = 1,
    RETRACTING = 2,
    EXTENDING = 3,
    BROKEN = 4,
  }
}

export class PartSnapshot extends jspb.Message {
  getName(): string;
  setName(value: string): PartSnapshot;

  getMass(): number;
  setMass(value: number): PartSnapshot;

  getShielded(): boolean;
  setShielded(value: boolean): PartSnapshot;

  getTemperature(): number;
  setTemperature(value: number): PartSnapshot;

  getSkintemperature(): number;
  setSkintemperature(value: number): PartSnapshot;

  getAntenna(): AntennaSnapshot | undefined;
  setAntenna(value?: AntennaSnapshot): PartSnapshot;
  hasAntenna(): boolean;
  clearAntenna(): PartSnapshot;

  getCargobay(): CargoBaySnapshot | undefined;
  setCargobay(value?: CargoBaySnapshot): PartSnapshot;
  hasCargobay(): boolean;
  clearCargobay(): PartSnapshot;

  getControlsurface(): ControlSurfaceSnapshot | undefined;
  setControlsurface(value?: ControlSurfaceSnapshot): PartSnapshot;
  hasControlsurface(): boolean;
  clearControlsurface(): PartSnapshot;

  getDecoupler(): DecouplerSnapshot | undefined;
  setDecoupler(value?: DecouplerSnapshot): PartSnapshot;
  hasDecoupler(): boolean;
  clearDecoupler(): PartSnapshot;

  getDockingport(): DockingPortSnapshot | undefined;
  setDockingport(value?: DockingPortSnapshot): PartSnapshot;
  hasDockingport(): boolean;
  clearDockingport(): PartSnapshot;

  getEngine(): EngineSnapshot | undefined;
  setEngine(value?: EngineSnapshot): PartSnapshot;
  hasEngine(): boolean;
  clearEngine(): PartSnapshot;

  getFairing(): FairingSnapshot | undefined;
  setFairing(value?: FairingSnapshot): PartSnapshot;
  hasFairing(): boolean;
  clearFairing(): PartSnapshot;

  getIntake(): IntakeSnapshot | undefined;
  setIntake(value?: IntakeSnapshot): PartSnapshot;
  hasIntake(): boolean;
  clearIntake(): PartSnapshot;

  getLeg(): LegSnapshot | undefined;
  setLeg(value?: LegSnapshot): PartSnapshot;
  hasLeg(): boolean;
  clearLeg(): PartSnapshot;

  getLight(): LightSnapshot | undefined;
  setLight(value?: LightSnapshot): PartSnapshot;
  hasLight(): boolean;
  clearLight(): PartSnapshot;

  getParachute(): ParachuteSnapshot | undefined;
  setParachute(value?: ParachuteSnapshot): PartSnapshot;
  hasParachute(): boolean;
  clearParachute(): PartSnapshot;

  getRadiator(): RadiatorSnapshot | undefined;
  setRadiator(value?: RadiatorSnapshot): PartSnapshot;
  hasRadiator(): boolean;
  clearRadiator(): PartSnapshot;

  getRcs(): RCSSnapshot | undefined;
  setRcs(value?: RCSSnapshot): PartSnapshot;
  hasRcs(): boolean;
  clearRcs(): PartSnapshot;

  getReactionwheel(): ReactionWheelSnapshot | undefined;
  setReactionwheel(value?: ReactionWheelSnapshot): PartSnapshot;
  hasReactionwheel(): boolean;
  clearReactionwheel(): PartSnapshot;

  getResourceconverter(): ResourceConverterSnapshot | undefined;
  setResourceconverter(value?: ResourceConverterSnapshot): PartSnapshot;
  hasResourceconverter(): boolean;
  clearResourceconverter(): PartSnapshot;

  getResourceharvester(): ResourceHarvesterSnapshot | undefined;
  setResourceharvester(value?: ResourceHarvesterSnapshot): PartSnapshot;
  hasResourceharvester(): boolean;
  clearResourceharvester(): PartSnapshot;

  getSensor(): SensorSnapshot | undefined;
  setSensor(value?: SensorSnapshot): PartSnapshot;
  hasSensor(): boolean;
  clearSensor(): PartSnapshot;

  getSolarpanel(): SolarPanelSnapshot | undefined;
  setSolarpanel(value?: SolarPanelSnapshot): PartSnapshot;
  hasSolarpanel(): boolean;
  clearSolarpanel(): PartSnapshot;

  getWheel(): WheelSnapshot | undefined;
  setWheel(value?: WheelSnapshot): PartSnapshot;
  hasWheel(): boolean;
  clearWheel(): PartSnapshot;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PartSnapshot.AsObject;
  static toObject(includeInstance: boolean, msg: PartSnapshot): PartSnapshot.AsObject;
  static serializeBinaryToWriter(message: PartSnapshot, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PartSnapshot;
  static deserializeBinaryFromReader(message: PartSnapshot, reader: jspb.BinaryReader): PartSnapshot;
}

export namespace PartSnapshot {
  export type AsObject = {
    name: string,
    mass: number,
    shielded: boolean,
    temperature: number,
    skintemperature: number,
    antenna?: AntennaSnapshot.AsObject,
    cargobay?: CargoBaySnapshot.AsObject,
    controlsurface?: ControlSurfaceSnapshot.AsObject,
    decoupler?: DecouplerSnapshot.AsObject,
    dockingport?: DockingPortSnapshot.AsObject,
    engine?: EngineSnapshot.AsObject,
    fairing?: FairingSnapshot.AsObject,
    intake?: IntakeSnapshot.AsObject,
    leg?: LegSnapshot.AsObject,
    light?: LightSnapshot.AsObject,
    parachute?: ParachuteSnapshot.AsObject,
    radiator?: RadiatorSnapshot.AsObject,
    rcs?: RCSSnapshot.AsObject,
    reactionwheel?: ReactionWheelSnapshot.AsObject,
    resourceconverter?: ResourceConverterSnapshot.AsObject,
    resourceharvester?: ResourceHarvesterSnapshot.AsObject,
    sensor?: SensorSnapshot.AsObject,
    solarpanel?: SolarPanelSnapshot.AsObject,
    wheel?: WheelSnapshot.AsObject,
  }
}

export class SnapshotResponse extends jspb.Message {
  getVessel(): VesselSnapshot | undefined;
  setVessel(value?: VesselSnapshot): SnapshotResponse;
  hasVessel(): boolean;
  clearVessel(): SnapshotResponse;

  getFlight(): FlightSnapshot | undefined;
  setFlight(value?: FlightSnapshot): SnapshotResponse;
  hasFlight(): boolean;
  clearFlight(): SnapshotResponse;

  getOrbit(): OrbitSnapshot | undefined;
  setOrbit(value?: OrbitSnapshot): SnapshotResponse;
  hasOrbit(): boolean;
  clearOrbit(): SnapshotResponse;

  getPartsMap(): jspb.Map<number, PartSnapshot>;
  clearPartsMap(): SnapshotResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SnapshotResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SnapshotResponse): SnapshotResponse.AsObject;
  static serializeBinaryToWriter(message: SnapshotResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SnapshotResponse;
  static deserializeBinaryFromReader(message: SnapshotResponse, reader: jspb.BinaryReader): SnapshotResponse;
}

export namespace SnapshotResponse {
  export type AsObject = {
    vessel?: VesselSnapshot.AsObject,
    flight?: FlightSnapshot.AsObject,
    orbit?: OrbitSnapshot.AsObject,
    partsMap: Array<[number, PartSnapshot.AsObject]>,
  }
}

