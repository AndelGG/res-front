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
    <div className="flex md:flex-row flex-col p-4 md:pb-4  pb-0 w-full bg-[#2c2c2c] my-6">
      <div className="settings">
        <label className="text-white md:text-2xl text-base mr-2">
          Резистор
        </label>
        <div className="flex items-center md:ml-4 md:mr-5">
          <input
            type="checkbox"
            id="toggle"
            className="sr-only"
            checked={toggle.capacity}
            onChange={() => dispatch(toggleCapacity())}
          />
          <label htmlFor="toggle" className="flex items-center cursor-pointer">
            <div className="relative">
              <div className="block w-14 h-8 bg-gray-300 rounded-full"></div>
              <div className="dot absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform"></div>
            </div>
          </label>
        </div>
        <label className="text-white md:text-2xl text-base mr-2">
          Конденсатор
        </label>
      </div>
      {!toggle.capacity && (
        <>
          <div className="settings">
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
          <div className="settings">
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
    </div>
  );
};

export default Settings;
