import { combineReducers } from '@reduxjs/toolkit';
import weaponsSlice from './weaponsSlice';
import equipmentSlice from './equipmentSlice';
import specialRulesSlice from './specialRulesSlice';

const rootReducer = combineReducers({
  weapons: weaponsSlice,
  equipment: equipmentSlice,
  specialRules: specialRulesSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
