export interface IResIn {
    resistance: string;
    power: string;
    tolerance: string;
}

export interface IMaterials{
        "Number": number,
        "Name": string,
        "SquareResistance": number,
        "PermissibleSpecificPowerDissipation": number,
        "TemperatureCoefficientOfResistance": number,
        "Senescence": number
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
  Deltabi: number[] // Массив из 3 чисел
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
  IR: number[]; // Массив из 3 чисел
  Ir: number[]; // Массив из 3 чисел
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

export interface IResInA {
    temperature: number | string,
    material: number | string,
    res: IResIn[];
}