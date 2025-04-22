import { combineReducers } from '@reduxjs/toolkit';
import { offersData } from './store/offers-data/offers-data';
import { userProcess } from './store/user-process/user-process';
import { appData } from './store/app-data/app-data';
import { favoritesData } from './store/offers-favorite-data/offers-favorite-data';
import { AppNamespace } from './const/appnamespaces';

const dataReducer = combineReducers({
  offers: offersData.reducer,
  favorites: favoritesData.reducer,
});

const rootReducer = combineReducers({
  [AppNamespace.Data]: dataReducer,
  [AppNamespace.App]: appData.reducer,
  [AppNamespace.User]: userProcess.reducer,
});

export { rootReducer };
