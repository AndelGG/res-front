export interface IResIn {
  resistance: string;
  power: string;
  tolerance: string;
}

export interface ICapIn {
  capacity: string;
  urab: string;
  tolerance: string;
}

export interface IMaterials {
  Number: number;
  Name: string;
  SquareResistance?: number;
  PermissibleSpecificPowerDissipation?: number;
  TemperatureCoefficientOfResistance?: number;
  Senescence?: number;
  Cud?: number;
  ElStrength?: number;
  E?: number;
  Tgdelta?: number;
  Tke?: number;
}

export interface IResOut {
  Bdelta: number;
  Bmax: number;
  Bmin: number;
  Bn: number;
  Bo: number;
  Bp: number;
  Breg: number;
  Btehn: number;
  DeltaLdashTrim: number;
  DeltaLr: number;
  DeltaLrTrim: number;
  DeltaR: number;
  Deltab: number;
  Deltabi: number[];
  Deltal: number;
  Deltar: number;
  FormFactor: number;
  FormOfResistor: string;
  GammaR: number;
  GammaRcontact: number;
  GammaRdelta: number;
  GammaRdeltaTrim: number;
  GammaRokv: number;
  GammaRt: number;
  Gammakf: number;
  IR: number[];
  Ir: number[];
  LSumTrim: number;
  Ldelta: number;
  Length: number;
  Lmax: number;
  Lmin: number;
  LnTrim: number;
  LoTrim: number;
  Lp: number;
  Lpodg: number;
  Lsum: number;
  Ltehn: number;
  Ltune: number;
  MOfTrim: number;
  MeanderArea: number;
  N: number;
  NOfMeander: number;
  NameOfMaterial: string;
  PermissibleSpecificPowerDissipation: number;
  Power: number;
  Rdashmin: number;
  RdashminTrim: number;
  Resistance: number;
  Rmax: number;
  Rmin: number;
  RminTrim: number;
  RoOpt: number;
  Rokvmax: number;
  Rokvmin: number;
  Senescence: number;
  SquareResistance: number;
  Temperature: number;
  TemperatureCoefficientOfResistance: number;
  Tolerance: number;
  Width: number;
  Xmeander: number;
  Ymeander: number;
}

export interface ICapOut {
  Capacity: number;
  Tolerance: number;
  Urab: number;
  E: number;
  Area: number;
  D: number;
  GammaCt: number;
  GammaSdop: number;
  Cdash: number;
  Cdoubledash: number;
  Ctripledash: number;
  C0: number;
  A1: number;
  B1: number;
  A2: number;
  B2: number;
  A3: number;
  B3: number;
  RealArea: number;
  RealD: number;
  Area15: number;
  Karea15: number;
}

interface Cap {
  capacity: string;
}
export interface IForm {
  temperature: string;
  material: string;
  tolerance: string;
  urab: string;
  res: IResIn[];
  cap: Cap[];
}

export interface IResponse {
  temperature: number;
  material: number;
  res: IResIn[];
  cap: ICapIn[];
}
