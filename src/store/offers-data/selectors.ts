import { AppNamespace } from '../../const/appnamespaces';
import { OfferData } from '../../types/offers';
import { State } from '../../types/state';

const getOffers = (state: State): OfferData[] =>
  state[AppNamespace.Data].offers.offers;

const getOffersDataLoadingStatus = (state: State) =>
  state[AppNamespace.Data].offers.isOffersDataLoading;

export { getOffers, getOffersDataLoadingStatus };
