import { APIRoute } from '../const/routes';
import { OfferData, SelectedOffer } from '../types/offers';
import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { State, AppDispatch } from '../types/state';
import { setError } from './app-data/app-data';
import { AuthData } from '../types/auth-data';
import { Comments } from '../types/comments';
import { UserData } from '../types/user-data';
import { dropToken, saveToken } from '../services/token';
import { TIMEOUT_SHOW_ERROR } from '../const/routes';
import { store } from './store';
import { setUserEmail } from './user-process/user-process';

type ThunkExtra = {
  api: AxiosInstance;
};

const fetchOffersAction = createAsyncThunk<
  OfferData[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: ThunkExtra;
  }
>('data/fetchOffers', async (_arg, { extra }) => {
  const { data } = await extra.api.get<OfferData[]>(APIRoute.Offers);
  return data;
});

const fetchSelectedOffersAction = createAsyncThunk<
  SelectedOffer,
  { offerID: string | undefined },
  {
    dispatch: AppDispatch;
    state: State;
    extra: ThunkExtra;
  }
>('data/fetchSelectedOffers', async ({ offerID }, { extra }) => {
  const { data } = await extra.api.get<SelectedOffer>(
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

const fetchCommentsAction = createAsyncThunk<
  Comments[],
  { offerID: string | undefined },
  {
    dispatch: AppDispatch;
    state: State;
    extra: ThunkExtra;
  }
>('data/fetchComments', async ({ offerID }, { extra }) => {
  const { data } = await extra.api.get<Comments[]>(
    `${APIRoute.Comments}/${offerID}`
  );
  return data;
});

const fetchFavoritesAction = createAsyncThunk<
  OfferData[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: ThunkExtra;
  }
>('data/fetchFavoriteOffers', async (_arg, { extra }) => {
  const { data } = await extra.api.get<OfferData[]>(APIRoute.Favorite);

  return data;
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
>('data/changeStatus', async ({ offerID, status }, { dispatch, extra }) => {
  const { data } = await extra.api.post<OfferData>(
    `${APIRoute.Favorite}/${offerID}/${status}`
  );

  dispatch(fetchOffersAction());
  dispatch(fetchFavoritesAction());
  return data;
});

const addComments = createAsyncThunk<
  Comments,
  {
    offerID: string | undefined;
    comm: {
      comment: string;
      rating: number;
    };
  },
  {
    dispatch: AppDispatch;
    state: State;
    extra: ThunkExtra;
  }
>('data/addComments', async ({ offerID, comm }, { extra }) => {
  const { data } = await extra.api.post<Comments>(
    `${APIRoute.Comments}/${offerID}`,
    comm
  );
  return data;
});

const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: ThunkExtra;
  }
>('user/checkAuth', async (_arg, { extra }) => {
  await extra.api.get(APIRoute.Login);
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
});

const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: ThunkExtra;
  }
>('user/logout', async (_arg, { extra }) => {
  await extra.api.delete(APIRoute.Logout);
  dropToken();
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
  fetchCommentsAction,
  addComments,
};
