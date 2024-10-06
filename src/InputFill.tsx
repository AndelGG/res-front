import { useFieldArray, UseFormRegister, Control } from 'react-hook-form';
import './style/index.css';
import DelSvg from './svg/DelSvg.tsx';
import { useSelector } from 'react-redux';
import { RootState } from './store/store.ts';
import { IForm } from './types.ts';
import Cookies from 'js-cookie';

interface InputProps {
  register: UseFormRegister<IForm>;
  control: Control<IForm>;
}

const InputFill = ({ control, register }: InputProps) => {
  const toggle = useSelector((state: RootState) => state.toggle);
  const { fields, append, remove } = useFieldArray({
    control,
    name: toggle.capacity ? 'cap' : 'res',

    /*const setFieldArrayLength = (desiredLength: number) => {
        const currentLength = fields.length;

        if (currentLength < desiredLength) {
            // Добавляем недостающие элементы
            for (let i = currentLength; i < desiredLength; i++) {
                append({resistance: "", power: "", tolerance: ""});
            }
        } else if (currentLength > desiredLength) {
            // Удаляем лишние элементы
            for (let i = currentLength - 1; i >= desiredLength; i--) {
                remove(i);
            }
        }
    };*/
  });
  return (
    <div className="flex flex-col">
      <div>
        {fields.map((item, index) => (
          <div key={item.id} className="flex flex-col md:flex-row m-4 gap-2">
            <h1 className="text-white text-3xl w-2">{index + 1}</h1>
            {toggle.capacity ? (
              <div
                key={item.id}
                className="flex flex-col md:flex-row m-4 gap-2"
              >
                <input
                  type="number"
                  {...register(`cap.${index}.capacity` as const, {
                    required: 'Поле обязательно для ввода',
                    min: {
                      value: 0.01,
                      message: 'Значение не может быть меньше 0.01',
                    },
                    max: {
                      value: 1000000,
                      message: 'Значение не может быть больше 1000000',
                    },
                  })}
                  step="0.01"
                  placeholder="Емкость(пкФ)"
                  className="input"
                />
              </div>
            ) : (
              <div>
                <input
                  type="number"
                  {...register(`res.${index}.resistance` as const, {
                    required: 'Поле обязательно для ввода',
                    min: {
                      value: 0,
                      message: 'Значение не может быть меньше 0',
                    },
                  })}
                  step="0.1"
                  placeholder="Сопротивление(Ом)"
                  className="input"
                />
                <input
                  type="number"
                  step={toggle.mPower ? '1' : '0.001'}
                  {...register(`res.${index}.power` as const, {
                    required: 'Поле обязательно для ввода',
                    min: {
                      value: 0,
                      message: 'Значение не может быть меньше 0',
                    },
                    max: {
                      value: 1000,
                      message: 'Значение не может быть больше 1K',
                    },
                  })}
                  placeholder={toggle.mPower ? 'Мощность(мВт)' : 'Мощность(Вт)'}
                  className="input"
                />
                <input
                  type="number"
                  step="0.1"
                  {...register(`res.${index}.tolerance` as const, {
                    required: 'Поле обязательно для ввода',
                    min: {
                      value: 0,
                      message: 'Значение не может быть меньше 0',
                    },
                    max: {
                      value: 100,
                      message: 'Значение не может быть больше 100',
                    },
                  })}
                  placeholder="Допуск(%)"
                  className="input"
                />
              </div>
            )}
            <button
              type="button"
              onClick={() => {
                if (fields.length > 1) {
                  remove(index);
                }
              }}
              className="hover:opacity-100 opacity-50"
            >
              <DelSvg />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => {
          if (fields.length < 20) {
            append({ resistance: '', power: '', tolerance: '' });
            if (toggle.capacity) {
              Cookies.set('cap', JSON.stringify(fields), { expires: 7 });
            } else {
              Cookies.set('res', JSON.stringify(fields), { expires: 7 });
            }
          }
        }}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 h-12"
      >
        Добавить
      </button>
    </div>
  );
};

export default InputFill;
