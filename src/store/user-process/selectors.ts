import { NameSpace } from '../../const/namespaces';
import { State } from '../../types/state';
import { AuthorizationStatus } from '../../const/auth';

const getAuthorizatinStatus = (state: State): AuthorizationStatus =>
  state[NameSpace.User].authorizationStatus;

const getAuthCheckedStatus = (state: State): boolean =>
  state[NameSpace.User].authorizationStatus !== AuthorizationStatus.Unknown;

const getUserEmail = (state: State): string => state[NameSpace.User].userEmail;

export { getAuthorizatinStatus, getAuthCheckedStatus, getUserEmail };
