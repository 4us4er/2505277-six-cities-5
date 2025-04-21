import { NameSpace } from '../../const/namespaces';
import { OfferData } from '../../types/offers';
import { State } from '../../types/state';

const getOffers = (state: State): OfferData[] =>
  state[NameSpace.Data].offers.offers;

const getOffersDataLoadingStatus = (state: State) =>
  state[NameSpace.Data].offers.isOffersDataLoading;

export { getOffers, getOffersDataLoadingStatus };
