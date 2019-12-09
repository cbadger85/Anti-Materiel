import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Equipment } from '@anti-materiel/types';

const initialState: Equipment[] = [];

const equipmentSlice = createSlice({
  name: 'equipment',
  initialState,
  reducers: {
    addEquipment(state, action: PayloadAction<Equipment>) {
      state.push(action.payload);
    },
    updateEquipment(state, action: PayloadAction<Equipment>) {
      const index = state.findIndex(
        equipment => equipment.id === action.payload.id,
      );

      if (index >= 0) {
        state[index] = action.payload;
      }
    },
    removeEquipment(state, action: PayloadAction<{ id: string }>) {
      return state.filter(equipment => equipment.id !== action.payload.id);
    },
    loadEquipment(state, action: PayloadAction<Equipment[]>) {
      return action.payload;
    },
  },
});

export const {
  addEquipment,
  updateEquipment,
  removeEquipment,
  loadEquipment,
} = equipmentSlice.actions;

export default equipmentSlice.reducer;
