import { Main } from '../../pages/main/main';
import { Login } from '../../pages/login/login';
import { Favorites } from '../../pages/favorites/favorites';
import { Offer } from '../../pages/offer/offer';
import { NotFoundScreen } from '../../pages/not-found-screen/not-found-screen';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const/routes';
import { PrivateRouteComponent } from '../private-route/private-route';
import { useAppSelector } from '../../hooks';
import { LoadingScreen } from '../loading-screen/loading-screen';
import {
  fetchOffersAction,
  fetchFavoritesAction,
  checkAuthAction,
} from '../../store/api-actions';
import { store } from '../../store/store';
import { useEffect } from 'react';
import { getAuthorizatinStatus,getAuthCheckedStatus} from '../../store/user-process/selectors';

import { getOffersDataLoadingStatus } from '../../store/offers-data/selectors';
import { AuthorizationStatus } from '../../const/auth';
function App(): JSX.Element {
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);
  const authStatus = useAppSelector(getAuthorizatinStatus);

  useEffect(() => {
    store.dispatch(fetchOffersAction());
    store.dispatch(checkAuthAction());
  }, []);

  useEffect(() => {
    if(authStatus === AuthorizationStatus.Auth){
      store.dispatch(fetchFavoritesAction());
    }
  }, [authStatus]);
  const isOffersDataLoading = useAppSelector(getOffersDataLoadingStatus);
  if (!isAuthChecked || isOffersDataLoading) {
    return <LoadingScreen />;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<Main />} />
        <Route path={AppRoute.Login} element={<Login />} />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRouteComponent>
              <Favorites />
            </PrivateRouteComponent>
          }
        />
        <Route path={AppRoute.Offer} element={<Offer />} />
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export { App };
