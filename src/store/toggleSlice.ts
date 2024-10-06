// slices/toggleSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
    setCooldown(state, action: PayloadAction<boolean>) {
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

export const { setCooldown, toggleMPower, toggleFullTable, toggleCapacity } =
  toggleSlice.actions;
export const toggleReducer = toggleSlice.reducer;
