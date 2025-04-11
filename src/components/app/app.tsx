import { Main } from '../../pages/main/main';
import { Login } from '../../pages/login/login';
import { Favorites } from '../../pages/favorites/favorites';
import { Offer } from '../../pages/offer/offer';
import { NotFoundScreen } from '../../pages/not-found-screen/not-found-screen';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthorizationStatus } from '../../const/auth';
import { AppRoute } from '../../const/routes';
import { PrivateRouteComponent } from '../private-route/private-route';
import { useAppSelector } from '../../hooks';
import { LoadingScreen } from '../loading-screen/loading-screen';

function App(): JSX.Element {
  const isOffersDataLoading = useAppSelector((state)=>state.isOffersDataLoading);
  if(isOffersDataLoading){
    return (<LoadingScreen />);
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<Main />} />
        <Route path={AppRoute.Login} element={<Login />} />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRouteComponent
              authorizationStatus={AuthorizationStatus.NoAuth}
            >
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
