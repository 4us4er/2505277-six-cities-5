import { AppNamespace } from '../../const/appnamespaces';
import { AppData } from '../../types/state';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Review } from '../../types/comments';

const initialState: AppData = {
  city: 'Paris',
  sortingBy: 'Popular',
  error: null,
  comm:[]
};

const appData = createSlice({
  name: AppNamespace.App,
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    changeSortingType: (state, action: PayloadAction<string>) => {
      state.sortingBy = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    addComm: (state, action: PayloadAction<Review>) => {
      state.comm.push(action.payload);
    },
  },
});
export const { changeCity, setError, changeSortingType,addComm } = appData.actions;

export { appData };
