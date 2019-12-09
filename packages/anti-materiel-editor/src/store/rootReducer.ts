import { combineReducers } from '@reduxjs/toolkit';
import weaponsSlice from './weaponsSlice';
import equipmentSlice from './equipmentSlice';

const rootReducer = combineReducers({
  weapons: weaponsSlice,
  equipment: equipmentSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
