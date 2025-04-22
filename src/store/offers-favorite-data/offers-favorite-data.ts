import { createSlice } from '@reduxjs/toolkit';
import { FavoritesData } from '../../types/state';
import { AppNamespace } from '../../const/appnamespaces';
import { fetchFavoritesAction } from '../api-actions';
const initialState: FavoritesData = {
  favorites: [],
};

const favoritesData = createSlice({
  name: AppNamespace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchFavoritesAction.fulfilled, (state, action) => {
      state.favorites = action.payload;
    });
  },
});

export { favoritesData };
