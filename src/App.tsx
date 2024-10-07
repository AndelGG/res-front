import React, { useEffect, useState } from 'react';
import './style/index.css';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Table from './Table.tsx';
import { IResOut, IMaterials, IForm, IResponse, ICapOut } from './types.ts';
import InputFill from './InputFill.tsx';
import Settings from './Settings.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { setCooldown } from './store/toggleSlice';
import { RootState } from './store/store.ts';
import InputParams from './InputParams.tsx';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const toggle = useSelector((state: RootState) => state.toggle);
  const [data, setData] = useState<{ res?: IResOut[]; cap?: ICapOut[] } | null>(
    null,
  );
  const [fetchData, setFetchData] = useState<IResponse | null>(null);
  const [materials, setMaterials] = useState<IMaterials[]>([]);
  const { control, register, handleSubmit } = useForm<IForm>({
    defaultValues: {
      temperature: '',
      res: [{ resistance: '', power: '', tolerance: '' }],
      cap: [{ capacity: '' }],
      urab: '',
      material: '-1',
    },
  });

  const onSubmit = (resArr: IForm) => {
    const mW = toggle.mPower ? 1000 : 1;
    const formattedData: IResponse = {
      ...resArr,
      temperature: parseFloat(resArr.temperature),
      material: parseFloat(resArr.material),
      res: resArr.res.map((item) => ({
        ...item,
        power: (parseFloat(item.power) / mW).toString(),
      })),
      cap: resArr.cap.map((item) => ({
        capacity: item.capacity,
        urab: resArr.urab,
        tolerance: resArr.tolerance,
      })),
    };
    setFetchData(formattedData);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    dispatch(setCooldown(true));
    setTimeout(() => {
      dispatch(setCooldown(false));
    }, 2000);
  };

  useEffect(() => {
    const fetchAxios = async () => {
      const url = '/api/';
      try {
        const response = await axios.post(
          url + (toggle.capacity ? 'arrOfCaps' : 'arrOfRes'),
          fetchData,
          {
            headers: { 'Content-Type': 'application/json' },
          },
        );

        toggle.capacity
          ? setData({ res: [], cap: response.data })
          : setData({ res: response.data, cap: [] });
        console.log(fetchData);
        console.log(response.data);
      } catch (error) {
        console.log(fetchData);
        console.error('Error fetching data:', error);
      }
    };
    const fetchMaterial = async () => {
      try {
        const url = '/api/';
        const response = await axios.get(
          url + (toggle.capacity ? 'capacitorMaterials' : 'resistorMaterials'),
          {
            headers: { 'Content-Type': 'application/json' },
          },
        );
        console.log(response.data);
        setMaterials(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData ? fetchAxios() : fetchMaterial();
  }, [fetchData, toggle.capacity]);

  return (
    <div>
      {data?.res && data?.cap && <Table serverData={data} />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-8 text-center bg-[#373737] p-2">
          <label className="text-3xl font-bold text-white">
            {toggle.capacity ? 'Таблица конденсаторов' : 'Таблица резисторов'}
          </label>
        </div>
        <InputFill control={control} register={register} />
        <Settings />
        <InputParams register={register} materials={materials} />
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
