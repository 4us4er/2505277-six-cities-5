import { createSlice } from '@reduxjs/toolkit';
import { OffersData } from '../../types/state';
import { AppNamespace } from '../../const/appnamespaces';
import { fetchOffersAction } from '../api-actions';

const initialState: OffersData = {
  offers: [],
  isOffersDataLoading: false,
};

const offersData = createSlice({
  name: AppNamespace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersDataLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersDataLoading = false;
      });
  },
});
export { offersData };
