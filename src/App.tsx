import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';
import {useForm, useFieldArray} from 'react-hook-form';
import Table from "./Table.tsx";
import { IResInA, IResOut } from "./types.ts";

const App: React.FC = () => {
    const [data, setData] = useState<IResOut[] | null>(null);
    const [fetchData, setFetchData] = useState<IResInA | null>(null);
    const {control, register, handleSubmit} = useForm<IResInA>({
        defaultValues: {
            temperature: "70",
            res: [{resistance: '', power: '', tolerance: ''}]
        }
    });

    const {fields, append, remove} = useFieldArray({
        control,
        name: 'res'
    });

    useEffect(() => {
        const fetchAxios = async () => {
            try {
                const response = await axios.post('http://govasya-backend-1:8080/arrOfRes', fetchData, {
                    headers: {'Content-Type': 'application/json'},
                });
                setData(response.data);
                console.log(fetchData);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchAxios();
    }, [fetchData]);

    return(
        <div>
            {data ? (
                <Table serverData={data}/>
            ) : (
                <h1></h1>
            )}
            <form onSubmit={handleSubmit((resArr) => setFetchData(resArr))}>
                <label className="text-3xl font-bold underline"></label>
                {fields.map((item, index) => (
                    <div key={item.id} className="flex flex-col md:flex-row m-4 gap-2">
                        <input
                            type="number"
                            {...register(`res.${index}.resistance` as const)}
                            placeholder="resistance"
                            className="input"
                        />
                        <input
                            type="number"
                            step="0.0001"
                            {...register(`res.${index}.power` as const)}
                            placeholder="power"
                            className="input"
                        />
                        <input
                            type="number"
                            step="0.01"
                            {...register(`res.${index}.tolerance` as const)}
                            placeholder="tolerance"
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
                <button
                    type="button"
                    onClick={() => {
                        append({resistance: "", power: "", tolerance: ""});
                    }}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 input h-12"
                >
                    Add
                </button>
                <input
                    type="number"
                    {...register("temperature", {required: true})}
                    placeholder="temperature"
                    className="input h-12"
                />
                <input
                    type="submit"
                    value="Отправить"
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 cursor-pointer input h-12"
                />
            </form>
        </div>
    );
};

export default App;