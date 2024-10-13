import { UseFormRegister } from 'react-hook-form';
import { IForm } from './types.ts';
import { useSelector } from 'react-redux';
import { RootState } from './store/store.ts';
import { useGetMaterialsQuery } from './store/api.ts';

interface InputProps {
  register: UseFormRegister<IForm>;
}

const InputParams = ({ register }: InputProps) => {
  const toggle = useSelector((state: RootState) => state.toggle);
  const { data, isLoading } = useGetMaterialsQuery(toggle.capacity);

  return (
    <div className="flex flex-col md:flex-row w-full content-center md:py-2 md:px-16">
      <div className="params">
        <input
          type="number"
          {...register('temperature', { required: true })}
          placeholder="Температура(°C)"
          className="input md:w-full h-12"
        />
      </div>
      {toggle.capacity && (
        <>
          <div className="params">
            <input
              type="number"
              {...register('urab', { required: true })}
              placeholder="Рабочее напряжение(Uраб, В)"
              className="input md:w-full h-12"
              step="0.1"
            />
          </div>
          <div className="params">
            <input
              type="number"
              {...register('tolerance', { required: true })}
              placeholder="Допуск(%)"
              className="input md:w-full h-12"
            />
          </div>
        </>
      )}
      <div className="flex w-full my-6 md:text-[20px] justify-center md:justify-end">
        {isLoading ? (
          <div className="p-2 w-4/5 bg-[#373737] text-white rounded"></div>
        ) : (
          <select
            id="material"
            className="p-2 w-4/5 bg-[#373737] text-white rounded focus:outline-none focus:border-none"
            {...register('material', { required: true })}
          >
            {!toggle.capacity && <option value="-1">Авто материал</option>}
            {data!.map((item, index) => (
              <option key={index} value={index}>
                {item.Name}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
};

export default InputParams;
