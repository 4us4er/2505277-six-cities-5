import { NameSpace } from '../../const/namespaces';
import { AppData } from '../../types/state';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: AppData = {
  city: 'Paris',
  sortingBy: 'Popular',
  error: null,
  isLoading: {},
};

const appData = createSlice({
  name: NameSpace.App,
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
  },
});
export const { changeCity, setError, changeSortingType } = appData.actions;

export { appData };
