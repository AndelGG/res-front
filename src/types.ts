export interface IResIn {
    resistance: string;
    power: string;
    tolerance: string;
}

export interface IResOut {
    "Temperature": number,
    "FormFactor": number,
    "Form": string,
    "Material": string,
    "GammaRdelta": number,
    "RoOpt": number,
    "Bp": number,
    "Bdelta": number,
    "Width": number,
    "Lp": number,
    "Ldelta": number,
    "Length": number,
    "NOfMeander": number,
    "Xmeander": number,
    "Ymeander": number,
    "LSumTrim": number,
    "MOfTrim": number,
    "Lpodg": number,
    "DeltaR": number,
    "DeltaLr": number,
    "RminTrim": number
}

export interface IResInA {
    temperature: string,
    res: IResIn[];
}