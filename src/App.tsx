import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';
import {useForm, useFieldArray} from 'react-hook-form';
import Table from "./Table.tsx";
import { IResInA, IResOut, IMaterials } from "./types.ts";

const App: React.FC = () => {
    const [data, setData] = useState<IResOut[] | null>(null);
    const [fetchData, setFetchData] = useState<IResInA | null>(null);
    const [materials, setMaterials] = useState<IMaterials[]>([])
    const [toggle, setToggle] = useState<{cooldown: boolean, mPower: boolean, fullTable: boolean}>({cooldown: false, mPower: false, fullTable: false})
    const {control, register, handleSubmit} = useForm<IResInA>({
        defaultValues: {
            temperature: 70,
            res: [{resistance: '', power: '', tolerance: ''}],
            material: -1,
        }
    });

    const {fields, append, remove} = useFieldArray({
        control,
        name: 'res'
    });

    const onSubmit = (resArr: IResInA) => {
        const mW = toggle.mPower ? 1000 : 1
        const formattedData = {
    ...resArr,
    temperature: typeof resArr.temperature === "string" ? parseFloat(resArr.temperature) : resArr.temperature,
    material: typeof resArr.material === "string" ? parseFloat(resArr.material) : resArr.material,
    res: resArr.res.map((item) => ({
      ...item,
      power: (parseFloat(item.power) / mW).toString(),
    })),
  };
        setFetchData(formattedData)
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        setToggle((prevToggles) => ({
      ...prevToggles,
      cooldown: true,
    }));
        setTimeout(() => {
           setToggle((prevToggles) => ({
      ...prevToggles,
      cooldown: false,
    }))}, 2000)
    }

    const toggleSwitch = () => {
        setToggle((prevToggles) => ({
      ...prevToggles,
      mPower: !prevToggles["mPower"],
    }));
    }
        const toggleFullTable = () => {
        setToggle((prevToggles) => ({
      ...prevToggles,
      fullTable: !prevToggles["fullTable"],
    }));
    }

    useEffect(() => {
        const fetchAxios = async () => {
            try {
                const response = await axios.post('http://localhost:8080/arrOfRes', fetchData, {
                    headers: {'Content-Type': 'application/json'},
                });
                setData(response.data);
                console.log(fetchData);
                console.log(response.data);
            } catch (error) {
                console.log(fetchData);
                console.error('Error fetching data:', error);
            }
        };
        const fetchMaterial = async () => {
            try {
                const response = await axios.get('http://localhost:8080/resistorMaterials', {
                    headers: {'Content-Type': 'application/json'},
                });
                setMaterials(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData ? fetchAxios() : fetchMaterial()
    }, [fetchData]);

    return(
        <div>
            {data ? (
                <Table serverData={data} fullTable={toggle.fullTable}/>
            ) : (
                <h1></h1>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="my-8 text-center bg-[#373737] p-2"><label className="text-3xl font-bold text-white">Таблица резисторов</label>
                    </div>
                        {fields.map((item, index) => (
                            <div key={item.id} className="flex flex-col md:flex-row m-4 gap-2">
                                <h1 className="text-white text-3xl w-2">{index + 1}</h1>
                                <input
                                    type="number"
                                    {...register(`res.${index}.resistance` as const, { required: "Поле обязательно для ввода",
            min: { value: 0, message: "Значение не может быть меньше 0" }})}
                                    step="0.1"
                                    placeholder="Сопротивление(Ом)"
                                    className="input"
                                />
                                <input
                                    type="number"
                                    step={toggle.mPower ? "1" : "0.001"}
                                    {...register(`res.${index}.power` as const, { required: "Поле обязательно для ввода",
            min: { value: 0, message: "Значение не может быть меньше 0" },
            max: { value: 1000, message: "Значение не может быть больше 1K" }})}
                                    placeholder={toggle.mPower ? "Мощность(мВт)" : "Мощность(Вт)"}
                                    className="input"
                                />
                                <input
                                    type="number"
                                    step="0.1"
                                    {...register(`res.${index}.tolerance` as const, { required: "Поле обязательно для ввода",
            min: { value: 0, message: "Значение не может быть меньше 0" },
            max: { value: 100, message: "Значение не может быть больше 100" }})}
                                    placeholder="Допуск(%)"
                                    className="input"
                                />
                                <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="hover:opacity-100 opacity-50"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <rect width="24" height="24" rx="4" fill="#8B2727"/>
                                        <path
                                            d="M7 17.6066L17.6066 7"
                                            stroke="#DD4646"
                                            strokeWidth="5"
                                            strokeLinecap="round"
                                        />
                                        <path
                                            d="M7 7L17.6066 17.6066"
                                            stroke="#DD4646"
                                            strokeWidth="5"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </button>
                            </div>
                        ))}
                <div className="my-8 flex flex-wrap">
                    <div className="flex md:flex-row flex-col p-3 w-full bg-[#2c2c2c]">
                        <div className="md:w-1/2 flex justify-between items-center w-full md:mb-0 mb-4">
                            <label className="text-white md:text-2xl text-base mr-2">Ввод мВт (Для D0л6@Eб0в)</label>
                            <input
                                type="checkbox"
                                checked={toggle.mPower}
                                onChange={toggleSwitch}
                                className="w-6 h-6"
                            />
                        </div>
                        <div className="md:w-1/2 flex justify-between items-center w-full">
                            <label className="text-white md:text-2xl text-base mr-2">Расширенная таблица</label>
                            <input
                                type="checkbox"
                                checked={toggle.fullTable}
                                onChange={toggleFullTable}
                                className="w-6 h-6"
                            />
                        </div>
                    </div>
<div className="md:flex md:flex-row md:w-full w-5/6 content-center md:py-2 md:px-16">
                    <div className="w-full md:w-1/2 flex items-center justify-between m-4">
                        <button
                            type="button"
                            onClick={() => {
                                if (fields.length < 20) {
                                    append({resistance: "", power: "", tolerance: ""});
                                }
                            }}
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 h-12"
                        >
                            Добавить
                        </button>

                        <div className="flex items-center">
                            <label className="text-white text-2xl mr-2">t, C°</label>
                            <input
                                type="number"
                                {...register("temperature", {required: true})}
                                placeholder="Температура"
                                className="input w-24 h-12"
                            />
                        </div>
                    </div>
                    <div className="flex w-1/2 m-4 md:text-[20px] md:justify-end">
                        <select
                            id="material"
                            className="p-2 bg-[#373737] text-white rounded focus:outline-none focus:border-none"
                            {...register("material", {required: true})}
                        >
                            <option value="-1">
                                Авто материал
                            </option>
                            {materials.map((item, index) => (
                                <option key={index} value={index}>{item.Name}</option>
                            ))}
                        </select></div></div>
                    <div className="w-full flex justify-center">
                        <input
                            disabled={toggle.cooldown}
                            type="submit"
                            value={toggle.cooldown ? "Отправлено" : "Отправить"}
                            className={`text-center text-white py-2 px-4 w-5/6 rounded cursor-pointer h-12 transition-colors duration-500 ${
                                toggle.cooldown
                                    ? "bg-amber-500 hover:bg-amber-500"
                                    : "bg-green-500 hover:bg-green-600"
                            }`}
                        />
                    </div>
                </div>


            </form>
        </div>
    );
};

export default App;