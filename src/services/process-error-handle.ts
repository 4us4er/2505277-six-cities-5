import { setError } from '../store/action';
import { clearErrorAction } from '../store/api-actions';
import { store } from '../store/store';

const processErrorHandle = (message: string): void => {
  store.dispatch(setError(message));
  store.dispatch(clearErrorAction);
};
export { processErrorHandle };
