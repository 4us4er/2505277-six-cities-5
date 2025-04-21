type OfferData = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: OffersCity;
  location: LocationData;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
};
type SelectedOffer = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: OffersCity;
  location: LocationData;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
  images: string[];
};
type LocationData = {
  latitude: number;
  longitude: number;
  zoom: number;
};
type OffersCity = {
  name: string;
  location: LocationData;
};

export type { OfferData, LocationData, SelectedOffer };
