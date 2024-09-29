import { IResOut } from "./types.ts";

interface TableProps {
    serverData: IResOut[];
    fullTable: boolean
}
const params = [
  "№",
  "Коэффициент формы",
  "Форма",
  "Материал",
  "γRΔ",
  "Ro-опт",
  "BΔ",
  "Ширина",
  "LΔ",
  "Длина",
  "N of Meander",
  "Xmeander",
  "Ymeander",
  "L sum Trim",
  "M of Trim",
  "Lpodg",
  "ΔR",
  "ΔLr",
  "RminTrim"
];

const paramsPlus = [
    ...params,
  "Bp",
  "Bo",
  "Bn",
  "Bmin",
  "Bmax",
  "Breg",
  "Btehn",
  "ΔL dash Trim",
  "ΔLr Trim",
  "Δb",
  "Δbi",
  "Δl",
  "Δr",
  "γR",
  "γR contact",
  "γR delta Trim",
  "γR окв",
  "γRt",
  "γkf",
  "IR",
  "Ir",
  "Lmax",
  "Lmin",
  "Ln Trim",
  "Lo Trim",
  "L sum",
  "Ltehn",
  "Ltune",
  "Lp",
  "Meander Area",
  "N",
  "Допустимая удельная мощность",
  "Мощность",
  "Rdashmin",
  "Rdashmin Trim",
  "Rmax",
  "Rmin",
  "Rokv max",
  "Rokv min",
  "Senescence",
  "Удельное сопротивление",
  "Температурный коэффициент",
];


const Table = ({ serverData, fullTable }: TableProps) => {
    const paramsMap = fullTable ? paramsPlus : params

    return (
        <div className="overflow-x-auto bg-gray-900">
            <table className="table-auto border-collapse w-full">
                <tbody>
                    {paramsMap.map((param, paramIndex) => (
                        <tr key={paramIndex}>
                            <th className="bg-gray-300 text-sm leading-normal sticky left-0 z-10 w-1/5">
                                {param}
                            </th>
                            {serverData.map((item, index) => {
                                const data = [
                                    index + 1,
                                    item.FormFactor,
                                    item.FormOfResistor,
                                    item.NameOfMaterial,
                                    item.GammaRdelta,
                                    item.RoOpt,
                                    item.Bdelta,
                                    item.Width,
                                    item.Ldelta,
                                    item.Length,
                                    item.NOfMeander,
                                    item.Xmeander,
                                    item.Ymeander,
                                    item.LSumTrim,
                                    item.MOfTrim,
                                    item.Lpodg,
                                    item.DeltaR,
                                    item.DeltaLr,
                                    item.RminTrim,                         // Ymeander

];
                                const dataPlus = [

                                    ...data,
  item.Bp,                                 // Bp
  item.Bo,                                 // Bo
  item.Bn,                                 // Bn
  item.Bmin,                               // Bmin
  item.Bmax,                         // RminTrim
  item.Breg,                               // Breg
  item.Btehn,                              // Btehn
  item.DeltaLdashTrim,                     // DeltaLdashTrim
  item.DeltaLrTrim,                        // DeltaLrTrim
  item.Deltab,                             // Deltab
  item.Deltabi.join(', '),                 // Deltabi (массив чисел, преобразуем в строку)
  item.Deltal,                             // Deltal
  item.Deltar,                             // Deltar
  item.GammaR,                             // GammaR
  item.GammaRcontact,                      // GammaRcontact
  item.GammaRdeltaTrim,                    // GammaRdeltaTrim
  item.GammaRokv,                          // GammaRokv
  item.GammaRt,                            // GammaRt
  item.Gammakf,                            // Gammakf
  item.IR.join(', '),                      // IR (массив чисел, преобразуем в строку)
  item.Ir.join(', '),                      // Ir (массив чисел, преобразуем в строку)
  item.Lmax,                               // Lmax
  item.Lmin,                               // Lmin
  item.LnTrim,                             // LnTrim
  item.LoTrim,                             // LoTrim
  item.Lsum,                               // Lsum
  item.Ltehn,                              // Ltehn
  item.Ltune,
  item.Lp,
  item.MeanderArea,                        // MeanderArea
  item.N,                                  // N
  item.PermissibleSpecificPowerDissipation,
  item.Power,// Допустимая удельная мощность рассеивания
  item.Rdashmin,                           // Rdashmin
  item.RdashminTrim,                       // RdashminTrim
  item.Rmax,                               // Rmax
  item.Rmin,                               // Rmin
  item.Rokvmax,                            // Rokvmax
  item.Rokvmin,                            // Rokvmin
  item.Senescence,                         // Сенсибилизация
  item.SquareResistance,                   // Удельное сопротивление
  item.TemperatureCoefficientOfResistance, // Температурный коэффициент сопротивления                             // Bdelta
                                ]

                                return (
                                    <td key={index} className={`px-4 text-white text-left p-1 pr-4
                                    ${paramIndex === 0 ? "text-3xl bg-gray-400 text-black" : ""}`}>
                                        {fullTable ? dataPlus[paramIndex] : data[paramIndex]}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
