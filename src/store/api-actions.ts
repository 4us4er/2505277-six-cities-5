import { APIRoute } from '../const/routes';
import { OfferData } from '../types/offers';
import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { State, AppDispatch } from '../types/state';
import {
  loadOffers,
  loadFavorites,
  requireAuthorization,
  setError,
} from './action';
import { setOffersDataLoadingStatus, setUserEmail } from './action';
import { AuthorizationStatus } from '../const/auth';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { dropToken, saveToken } from '../services/token';
import { TIMEOUT_SHOW_ERROR } from '../const/routes';
import { store } from './store';

type ThunkExtra = {
  api: AxiosInstance;
};

const fetchOffersAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: ThunkExtra;
  }
>('data/fetchOffers', async (_arg, { dispatch, extra }) => {
  dispatch(setOffersDataLoadingStatus(true));
  const { data } = await extra.api.get<OfferData[]>(APIRoute.Offers);

  dispatch(setOffersDataLoadingStatus(false));
  dispatch(loadOffers(data));
});

const fetchSelectedOffersAction = createAsyncThunk<
  OfferData,
  { offerID: string | undefined },
  {
    dispatch: AppDispatch;
    state: State;
    extra: ThunkExtra;
  }
>('data/fetchSelectedOffers', async ({ offerID }, { extra }) => {
  const { data } = await extra.api.get<OfferData>(
    `${APIRoute.Offers}/${offerID}`
  );

  return data;
});

const fetchNearbyOfferAction = createAsyncThunk<
  OfferData[],
  { offerID: string | undefined },
  { dispatch: AppDispatch; state: State; extra: ThunkExtra }
>('data/fetchNearbyOffer', async ({ offerID }, { extra }) => {
  const { data } = await extra.api.get<OfferData[]>(
    `${APIRoute.Offers}/${offerID}/nearby`
  );
  return data;
});
const fetchFavoritesAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: ThunkExtra;
  }
>('data/fetchOffers', async (_arg, { dispatch, extra }) => {
  const { data } = await extra.api.get<OfferData[]>(APIRoute.Favorite);
  dispatch(loadFavorites(data));
});

const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: ThunkExtra;
  }
>('user/checkAuth', async (_arg, { dispatch, extra }) => {
  try {
    await extra.api.get(APIRoute.Login);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  } catch {
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  }
});

const loginAction = createAsyncThunk<
  void,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: ThunkExtra;
  }
>('user/login', async ({ login: email, password }, { dispatch, extra }) => {
  const {
    data: { token },
  } = await extra.api.post<UserData>(APIRoute.Login, { email, password });
  saveToken(token);
  localStorage.setItem('userEmail', email);
  dispatch(setUserEmail(email));
  dispatch(requireAuthorization(AuthorizationStatus.Auth));
});

const changeStatus = createAsyncThunk<
  OfferData,
  {
    offerID: string;
    status: number;
  },
  {
    dispatch: AppDispatch;
    state: State;
    extra: ThunkExtra;
  }
>(
  'favorites/changeStatus',
  async ({ offerID, status }, { dispatch, extra }) => {
    const { data } = await extra.api.post<OfferData>(
      `${APIRoute.Favorite}/${offerID}/${status}`
    );

    dispatch(fetchOffersAction());
    dispatch(fetchFavoritesAction());
    return data;
  }
);

const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: ThunkExtra;
  }
>('user/logout', async (_arg, { dispatch, extra }) => {
  await extra.api.delete(APIRoute.Logout);
  dropToken();
  dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
});

const clearErrorAction = createAsyncThunk('clearError', () =>
  setTimeout(() => store.dispatch(setError(null)), TIMEOUT_SHOW_ERROR)
);
export {
  clearErrorAction,
  checkAuthAction,
  loginAction,
  logoutAction,
  fetchOffersAction,
  fetchFavoritesAction,
  changeStatus,
  fetchSelectedOffersAction,
  fetchNearbyOfferAction,
};
