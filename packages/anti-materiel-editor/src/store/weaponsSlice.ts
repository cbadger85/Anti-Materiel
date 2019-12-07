import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Weapon } from '@anti-materiel/types';

const initialState: Weapon[] = [];

const weaponsSlice = createSlice({
  name: 'weapons',
  initialState,
  reducers: {
    addWeapon(state, action: PayloadAction<Weapon>) {
      state.push(action.payload);
    },
    updateWeapon(state, action: PayloadAction<Weapon>) {
      const index = state.findIndex(weapon => weapon.id === action.payload.id);

      if (index >= 0) {
        state[index] = action.payload;
      }
    },
    removeWeapon(state, action: PayloadAction<{ id: string }>) {
      return state.filter(w => w.id !== action.payload.id);
    },
    loadWeapons(state, action: PayloadAction<Weapon[]>) {
      return action.payload;
    },
  },
});

export const {
  addWeapon,
  updateWeapon,
  removeWeapon,
  loadWeapons,
} = weaponsSlice.actions;

export default weaponsSlice.reducer;
