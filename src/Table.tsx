import { ICapOut, IResOut } from './types.ts';
import { useSelector } from 'react-redux';
import { RootState } from './store/store.ts';

interface TableProps {
  cap?: ICapOut[];
  res?: IResOut[];
}
const params = [
  '№',
  'Коэффициент формы',
  'Форма',
  'Материал',
  'γRΔ',
  'Ro-опт',
  'BΔ',
  'Ширина',
  'LΔ',
  'Длина',
  'N of Meander',
  'Xmeander',
  'Ymeander',
  'L sum Trim',
  'M of Trim',
  'Lpodg',
  'ΔR',
  'ΔLr',
  'RminTrim',
];

const paramsPlus = [
  ...params,
  'Bp',
  'Bo',
  'Bn',
  'Bmin',
  'Bmax',
  'Breg',
  'Btehn',
  'ΔL dash Trim',
  'ΔLr Trim',
  'Δb',
  'Δbi',
  'Δl',
  'Δr',
  'γR',
  'γR contact',
  'γR delta Trim',
  'γR окв',
  'γRt',
  'γkf',
  'IR',
  'Ir',
  'Lmax',
  'Lmin',
  'Ln Trim',
  'Lo Trim',
  'L sum',
  'Ltehn',
  'Ltune',
  'Lp',
  'Meander Area',
  'N',
  'Допустимая удельная мощность',
  'Мощность',
  'Rdashmin',
  'Rdashmin Trim',
  'Rmax',
  'Rmin',
  'Rokv max',
  'Rokv min',
  'Senescence',
  'Удельное сопротивление',
  'Температурный коэффициент',
];

const paramsCap = [
  '№',
  'E',
  'Area',
  'D',
  'GammaCt',
  'GammaSdop',
  'Cdash',
  'Cdoubledash',
  'Ctripledash',
  'C0',
  'A1',
  'B1',
  'A2',
  'B2',
  'A3',
  'B3',
  'RealArea',
  'RealD',
  'Area15',
  'Karea15',
];

const Table = ({ cap, res }: TableProps) => {
  const toggle = useSelector((state: RootState) => state.toggle);
  const paramsMap = toggle.capacity
    ? paramsCap
    : toggle.fullTable
      ? paramsPlus
      : params;

  return (
    <div className="overflow-x-auto bg-gray-900">
      <table className="table-auto border-collapse w-full">
        <tbody>
          {paramsMap.map((param, paramIndex) => (
            <tr key={paramIndex}>
              <th className="bg-gray-300 text-sm leading-normal sticky left-0 z-10 w-1/5">
                {param}
              </th>
              {!toggle.capacity
                ? res?.map((item, index) => {
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
                      item.RminTrim,
                    ];
                    const dataPlus = [
                      ...data,
                      item.Bp,
                      item.Bo,
                      item.Bn,
                      item.Bmin,
                      item.Bmax,
                      item.Breg,
                      item.Btehn,
                      item.DeltaLdashTrim,
                      item.DeltaLrTrim,
                      item.Deltab,
                      item.Deltabi.join(', '),
                      item.Deltal,
                      item.Deltar,
                      item.GammaR,
                      item.GammaRcontact,
                      item.GammaRdeltaTrim,
                      item.GammaRokv,
                      item.GammaRt,
                      item.Gammakf,
                      item.IR.join(', '),
                      item.Ir.join(', '),
                      item.Lmax,
                      item.Lmin,
                      item.LnTrim,
                      item.LoTrim,
                      item.Lsum,
                      item.Ltehn,
                      item.Ltune,
                      item.Lp,
                      item.MeanderArea,
                      item.N,
                      item.PermissibleSpecificPowerDissipation,
                      item.Power,
                      item.Rdashmin,
                      item.RdashminTrim,
                      item.Rmax,
                      item.Rmin,
                      item.Rokvmax,
                      item.Rokvmin,
                      item.Senescence,
                      item.SquareResistance,
                      item.TemperatureCoefficientOfResistance,
                    ];
                    return (
                      <td
                        key={index}
                        className={`px-4 text-white text-left p-1 pr-4
                                    ${paramIndex === 0 ? 'text-3xl bg-gray-400 text-black' : ''}`}
                      >
                        {toggle.fullTable
                          ? dataPlus[paramIndex]
                          : data[paramIndex]}
                      </td>
                    );
                  })
                : cap!.map((item, index) => {
                    const data = [
                      index + 1,
                      item.E,
                      item.Area,
                      item.D,
                      item.GammaCt,
                      item.GammaSdop,
                      item.Cdash,
                      item.Cdoubledash,
                      item.Ctripledash,
                      item.C0,
                      item.A1,
                      item.B1,
                      item.A2,
                      item.B2,
                      item.A3,
                      item.B3,
                      item.RealArea,
                      item.RealD,
                      item.Area,
                      item.Karea15,
                    ];
                    return (
                      <td
                        key={index}
                        className={`px-4 text-white text-left p-1 pr-4
                                    ${!paramIndex && 'text-3xl bg-gray-400 text-black'}`}
                      >
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
