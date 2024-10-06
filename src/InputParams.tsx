import { UseFormRegister } from 'react-hook-form';
import { IMaterials, IForm } from './types.ts';
import { useSelector } from 'react-redux';
import { RootState } from './store/store.ts';

interface InputProps {
  register: UseFormRegister<IForm>;
  materials: IMaterials[];
}

const InputParams = ({ register, materials }: InputProps) => {
  const toggle = useSelector((state: RootState) => state.toggle);
  return (
    <div className="flex flex-col md:flex-row w-full content-center md:py-2 md:px-16">
      <div className="w-full md:w-1/2 flex items-center justify-between m-4">
        <input
          type="number"
          {...register('temperature', { required: true })}
          placeholder="Температура(°C)"
          className="input w-4/5 h-12"
        />
      </div>
      {toggle.capacity && (
        <>
          <div className="w-full md:w-1/2 flex items-center justify-between m-4">
            <input
              type="number"
              {...register('urab', { required: true })}
              placeholder="Рабочее напряжение(Uраб, В"
              className="input w-4/5 h-12"
            />
          </div>
          <div className="w-full md:w-1/2 flex items-center justify-between m-4">
            <input
              type="number"
              {...register('tolerance', { required: true })}
              placeholder="Допуск(%)"
              className="input w-4/5 h-12"
            />
          </div>
        </>
      )}
      <div className="flex w-1/2 m-4 md:text-[20px] md:justify-end">
        <select
          id="material"
          className="p-2 bg-[#373737] text-white rounded focus:outline-none focus:border-none"
          {...register('material', { required: true })}
        >
          <option value="-1">Авто материал</option>
          {materials.map((item, index) => (
            <option key={index} value={index}>
              {item.Name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default InputParams;
