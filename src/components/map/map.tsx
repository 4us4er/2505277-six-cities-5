import { useMap } from '../../hooks/useMap';
import { useEffect, useRef, useState } from 'react';
import { LocationData, OfferData } from '../../types/offers';
import { defaulCustomIcon, activeCustomIcon } from '../../const/map';
import leaflet from 'leaflet';
import { useAppSelector } from '../../hooks';
import { sortingByType } from '../../utils/common';
import { getCurrentCity, getSortingType } from '../../store/app-data/selectors';
import { getOffers } from '../../store/offers-data/selectors';

type MapProps = {
  nearestOffers?: OfferData[];
  cityLocation: LocationData;
  hoveredID: string;
  height: string;
  width: string;
  marginBottom: string;
};
function Map({
  nearestOffers,
  height = '794px',
  width = '500px',
  cityLocation,
  hoveredID,
  marginBottom = '',
}: MapProps): JSX.Element {
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useMap(mapRef, cityLocation);
  const [offersFiltered, setOffersFiltered] = useState<OfferData[]>([]);
  const currentCity = useAppSelector(getCurrentCity);
  const sortingType = useAppSelector(getSortingType);
  const offers = useAppSelector(getOffers);
  useEffect(() => {
    let filtered = offers.filter((offer) => offer.city.name === currentCity);
    filtered = sortingByType(sortingType, filtered);
    setOffersFiltered(filtered);
  }, [offers, currentCity, sortingType]);
  useEffect(() => {
    if (!map) {
      return;
    }
    const markers = leaflet.layerGroup();
    const dataToRender = nearestOffers?.length ? nearestOffers : offersFiltered;

    dataToRender.forEach((offer) => {
      leaflet
        .marker(
          {
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          },
          {
            icon: offer.id === hoveredID ? activeCustomIcon : defaulCustomIcon,
          }
        )
        .addTo(markers);
    });

    markers.addTo(map);

    return () => {
      markers.clearLayers();
      map.removeLayer(markers);
    };
  }, [map, nearestOffers, offersFiltered, hoveredID]);

  useEffect(() => {
    if (map) {
      map.setView(
        [
          offersFiltered[0].location.latitude,
          offersFiltered[0].location.longitude,
        ],
        12
      );
    }
  }, [map, offersFiltered]);
  return (
    <div
      style={{ height, width, margin: 'auto', marginBottom }}
      ref={mapRef}
    ></div>
  );
}
export { Map, type MapProps };
