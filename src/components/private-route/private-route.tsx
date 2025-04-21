import { Navigate } from 'react-router-dom';
import { AuthorizationStatus } from '../../const/auth';
import { AppRoute } from '../../const/routes';
import { useAppSelector } from '../../hooks';
import { getAuthorizatinStatus } from '../../store/user-process/selectors';

type PrivateRouteProps = {
  children: JSX.Element;
};
function PrivateRouteComponent(props: PrivateRouteProps): JSX.Element {
  const { children } = props;
  const authorizationStatus = useAppSelector(getAuthorizatinStatus);

  return authorizationStatus === AuthorizationStatus.Auth ? (
    children
  ) : (
    <Navigate to={AppRoute.Login} />
  );
}

export { PrivateRouteComponent };
