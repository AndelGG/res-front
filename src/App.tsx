import React, { useEffect } from 'react';
import './style/index.css';
import { useForm } from 'react-hook-form';
import Table from './Table.tsx';
import { IForm, IResponse } from './types.ts';
import InputFill from './InputFill.tsx';
import Settings from './Settings.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { setCooldown } from './store/toggleSlice';
import { AppDispatch, RootState } from './store/store.ts';
import InputParams from './InputParams.tsx';
import { useGetCapMutation, useGetResMutation } from './store/api.ts';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const toggle = useSelector((state: RootState) => state.toggle);
  const { control, register, handleSubmit } = useForm<IForm>({
    defaultValues: {
      temperature: '',
      res: [{ resistance: '', power: '', tolerance: '' }],
      cap: [{ capacity: '' }],
      urab: '',
      material: '-1',
    },
  });

  const [
    sendRes,
    { data: resData, isLoading: resLoading, isSuccess: capSuccess },
  ] = useGetResMutation();
  const [
    sendCap,
    { data: capData, isLoading: capLoading, isSuccess: resSuccess },
  ] = useGetCapMutation();

  const onSubmit = (form: IForm) => {
    const mW = toggle.mPower ? 1000 : 1;
    const formattedData: IResponse = {
      ...form,
      temperature: parseFloat(form.temperature),
      material: parseFloat(form.material),
      res: form.res.map((item) => ({
        ...item,
        power: (parseFloat(item.power) / mW).toString(),
      })),
      cap: form.cap.map((item) => ({
        capacity: item.capacity,
        urab: form.urab,
        tolerance: form.tolerance,
      })),
    };
    toggle.capacity
      ? sendCap({ body: formattedData })
      : sendRes({ body: formattedData });
    dispatch(setCooldown());
  };

  useEffect(() => {
    if (resSuccess || capSuccess) {
      console.log('Компонент обновлен');
    }
  }, [resSuccess, capSuccess, dispatch]);

  return (
    <div>
      {(toggle.capacity ? capLoading : resLoading) && (
        <Table cap={capData} res={resData} />
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-8 text-center bg-[#373737] p-2">
          <label className="text-3xl font-bold text-white">
            {toggle.capacity ? 'Таблица конденсаторов' : 'Таблица резисторов'}
          </label>
        </div>
        <InputFill control={control} register={register} />
        <Settings />
        <InputParams register={register} />
        <div className="w-full flex justify-center mb-12">
          <input
            disabled={toggle.cooldown}
            type="submit"
            value={toggle.cooldown ? 'Отправлено' : 'Отправить'}
            className={`text-center text-white py-2 px-4 w-5/6 md:w-1/4 rounded cursor-pointer h-12 transition-colors duration-500 ${
              toggle.cooldown
                ? 'bg-amber-500 hover:bg-amber-500'
                : 'bg-green-500 hover:bg-green-600'
            }`}
          />
        </div>
      </form>
    </div>
  );
};

export default App;
