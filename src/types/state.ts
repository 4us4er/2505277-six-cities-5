import { store } from '../store/store';
import { AuthorizationStatus } from '../const/auth';
import { OfferData } from './offers';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  userEmail: string;
};

export type OffersData = {
  offers: OfferData[];
  isOffersDataLoading: boolean;
};

export type FavoritesData = {
  favorites: OfferData[];
};

export type AppData = {
  city: string;
  sortingBy: string;
  error: string | null;
  isLoading: Record<string, boolean>;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
