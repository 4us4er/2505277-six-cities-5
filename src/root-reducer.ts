import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from './const/namespaces';
import { offersData } from './store/offers-data/offers-data';
import { userProcess } from './store/user-process/user-process';
import { appData } from './store/app-data/app-data';
import { favoritesData } from './store/offers-favorite-data/offers-favorite-data';

const dataReducer = combineReducers({
  offers: offersData.reducer,
  favorites: favoritesData.reducer,
});

const rootReducer = combineReducers({
  [NameSpace.Data]: dataReducer,
  [NameSpace.App]: appData.reducer,
  [NameSpace.User]: userProcess.reducer,
});

export { rootReducer };
