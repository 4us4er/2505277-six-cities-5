import { AppNamespace } from '../../const/appnamespaces';
import { State } from '../../types/state';

const getFavorites = (state: State) =>
  state[AppNamespace.Data].favorites.favorites;

export { getFavorites };
