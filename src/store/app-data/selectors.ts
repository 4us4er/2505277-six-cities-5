import { NameSpace } from '../../const/namespaces';
import { State } from '../../types/state';

const getCurrentCity = (state: State): string => state[NameSpace.App].city;

const getSortingType = (state: State): string => state[NameSpace.App].sortingBy;

const getError = (state: State): null | string => state[NameSpace.App].error;

export { getCurrentCity, getSortingType, getError };
