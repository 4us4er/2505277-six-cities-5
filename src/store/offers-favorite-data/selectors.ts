import { NameSpace } from '../../const/namespaces';
import { State } from '../../types/state';

const getFavorites = (state: State) =>
  state[NameSpace.Data].favorites.favorites;

export { getFavorites };
