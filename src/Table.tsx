import { IResOut } from "./types.ts";

interface TableProps {
    serverData: IResOut[];
}

const params = [
   "N",
   "Коэффициент формы",
   "Форма",
   "Материал",
   "γRΔ",
   "Ro-опт",
   "Bp",
   "BΔ",
   "Ширина",
   "Lp",
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

const Table = ({ serverData }: TableProps) => {
    return (
        <div className="overflow-x-auto">
            <table className="table-auto border-collapse w-full">
                <tbody>
                    {params.map((param, paramIndex) => (
                        <tr key={paramIndex}>
                            <th className="bg-gray-300 uppercase text-sm leading-normal sticky left-0 z-10 w-1/5">
                                {param}
                            </th>
                            {serverData.map((item, index) => {
                                const data = [
                                    index + 1,
                                    item.FormFactor,
                                    item.Form,
                                    item.Material,
                                    item.GammaRdelta,
                                    item.RoOpt,
                                    item.Bp,
                                    item.Bdelta,
                                    item.Width,
                                    item.Lp,
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
                                    item.RminTrim,
                                ];

                                return (
                                    <td key={index} className="text-white text-right p-1 pr-4">
                                        {data[paramIndex]}
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
