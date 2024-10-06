import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/store.ts';
import {
  toggleFullTable,
  toggleCapacity,
  toggleMPower,
} from './store/toggleSlice.ts';

const Settings = () => {
  const dispatch = useDispatch();
  const toggle = useSelector((state: RootState) => state.toggle);

  return (
    <div className="my-8 flex flex-wrap">
      <div className="flex md:flex-row flex-col p-3 w-full bg-[#2c2c2c]">
        {!toggle.capacity && (
          <>
            <div className="md:w-1/2 flex justify-between items-center w-full md:mb-0 mb-4">
              <label className="text-white md:text-2xl text-base mr-2">
                Ввод мВт (Для D0л6@Еб0в)
              </label>
              <input
                type="checkbox"
                checked={toggle.mPower}
                onChange={() => dispatch(toggleMPower())}
                className="w-6 h-6"
              />
            </div>
            <div className="md:w-1/2 flex justify-between items-center w-full md:mb-0 mb-4">
              <label className="text-white md:text-2xl text-base mr-2">
                Расширенная таблица
              </label>
              <input
                type="checkbox"
                checked={toggle.fullTable}
                onChange={() => dispatch(toggleFullTable())}
                className="w-6 h-6"
              />
            </div>
          </>
        )}
        <div className="md:w-1/2 flex justify-between items-center w-full">
          <label className="text-white md:text-2xl text-base mr-2">
            Расчет конденсаторов
          </label>
          <input
            type="checkbox"
            checked={toggle.capacity}
            onChange={() => dispatch(toggleCapacity())}
            className="w-6 h-6"
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;
