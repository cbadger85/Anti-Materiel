import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SpecialRule } from '@anti-materiel/types';

const initialState: SpecialRule[] = [];

const secialRulesSlice = createSlice({
  name: 'specialRules',
  initialState,
  reducers: {
    addSpecialRule(state, action: PayloadAction<SpecialRule>) {
      state.push(action.payload);
    },
    updateSpecialRule(state, action: PayloadAction<SpecialRule>) {
      const index = state.findIndex(rule => rule.id === action.payload.id);

      if (index >= 0) {
        state[index] = action.payload;
      }
    },
    removeSpecialRule(state, action: PayloadAction<{ id: string }>) {
      return state.filter(rule => rule.id !== action.payload.id);
    },
    loadSpecialRules(state, action: PayloadAction<SpecialRule[]>) {
      return action.payload;
    },
  },
});

export const {
  addSpecialRule,
  updateSpecialRule,
  removeSpecialRule,
  loadSpecialRules,
} = secialRulesSlice.actions;

export default secialRulesSlice.reducer;
