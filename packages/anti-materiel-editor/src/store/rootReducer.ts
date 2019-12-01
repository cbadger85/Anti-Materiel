import { combineReducers } from '@reduxjs/toolkit';
import weaponsSlice from './weaponsSlice';

const rootReducer = combineReducers({
  weapons: weaponsSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
