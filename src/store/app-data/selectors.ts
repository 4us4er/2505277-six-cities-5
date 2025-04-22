import { AppNamespace } from '../../const/appnamespaces';
import { State } from '../../types/state';

const getCurrentCity = (state: State): string => state[AppNamespace.App].city;

const getSortingType = (state: State): string => state[AppNamespace.App].sortingBy;

const getError = (state: State): null | string => state[AppNamespace.App].error;

export { getCurrentCity, getSortingType, getError };
