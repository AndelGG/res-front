// slices/toggleSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from './store.ts';

interface ToggleState {
  cooldown: boolean;
  mPower: boolean;
  fullTable: boolean;
  capacity: boolean;
}

const initialState: ToggleState = {
  cooldown: false,
  mPower: false,
  fullTable: false,
  capacity: false,
};

const toggleSlice = createSlice({
  name: 'toggle',
  initialState,
  reducers: {
    toggleCooldown(state, action: PayloadAction<boolean>) {
      state.cooldown = action.payload;
    },
    toggleMPower(state) {
      state.mPower = !state.mPower;
    },
    toggleFullTable(state) {
      state.fullTable = !state.fullTable;
    },
    toggleCapacity(state) {
      state.capacity = !state.capacity;
    },
  },
});

export const { toggleCooldown, toggleMPower, toggleFullTable, toggleCapacity } =
  toggleSlice.actions;

export const setCooldown = () => (dispatch: AppDispatch) => {
  dispatch(toggleCooldown(true));
  setTimeout(() => {
    dispatch(toggleCooldown(false));
  }, 2000);
};
export const toggleReducer = toggleSlice.reducer;
