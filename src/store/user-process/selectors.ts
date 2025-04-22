import { AppNamespace } from '../../const/appnamespaces';
import { State } from '../../types/state';
import { AuthorizationStatus } from '../../const/auth';

const getAuthorizatinStatus = (state: State): AuthorizationStatus =>
  state[AppNamespace.User].authorizationStatus;

const getAuthCheckedStatus = (state: State): boolean =>
  state[AppNamespace.User].authorizationStatus !== AuthorizationStatus.Unknown;

const getUserEmail = (state: State): string => state[AppNamespace.User].userEmail;

export { getAuthorizatinStatus, getAuthCheckedStatus, getUserEmail };
