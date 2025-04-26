import { useMap } from '../../hooks/useMap';
import { useEffect, useRef, useMemo } from 'react';
import { LocationData, OfferData } from '../../types/offers';
import { defaulCustomIcon, activeCustomIcon } from '../../const/map';
import leaflet from 'leaflet';
import { useAppSelector } from '../../hooks';
import { sortingByType } from '../../utils/common';
import { getCurrentCity, getSortingType } from '../../store/app-data/selectors';
import { getOffers } from '../../store/offers-data/selectors';
import React from 'react';

type MapProps = {
  nearestOffers?: OfferData[];
  cityLocation: LocationData;
  hoveredID: string;
  height: string;
  width: string;
  marginBottom: string;
};

function OffersMap({
  nearestOffers,
  height = '794px',
  width = '500px',
  cityLocation,
  hoveredID,
  marginBottom = '',
}: MapProps): JSX.Element {
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useMap(mapRef, cityLocation);

  const currentCity = useAppSelector(getCurrentCity);
  const sortingType = useAppSelector(getSortingType);
  const offers = useAppSelector(getOffers);
  const markerRef = useRef<Map<string, leaflet.Marker>>(new Map());

  const offersFiltered = useMemo(() => {
    const filtered = offers.filter((offer) => offer.city.name === currentCity);
    return sortingByType(sortingType, filtered);
  }, [offers, currentCity, sortingType]);

  const dataToRender = useMemo(
    () => (nearestOffers?.length ? nearestOffers : offersFiltered),
    [nearestOffers, offersFiltered]
  );

  useEffect(() => {
    if (!map || !dataToRender || dataToRender.length === 0) {
      return;
    }

    const markers = leaflet.layerGroup();

    const newMarkerMap = new Map<string, leaflet.Marker>();

    dataToRender.forEach((offer) => {
      const marker = leaflet
        .marker(
          {
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          },
          {
            icon: defaulCustomIcon,
          }
        )
        .addTo(markers);
      newMarkerMap.set(offer.id, marker);
    });

    markers.addTo(map);
    markerRef.current = newMarkerMap;

    return () => {
      markers.clearLayers();
      map.removeLayer(markers);
    };
  }, [map, dataToRender]);

  useEffect(() => {
    if (markerRef.current.size > 0) {
      markerRef.current.forEach((marker, id) => {
        marker.setIcon(id === hoveredID ? activeCustomIcon : defaulCustomIcon);
      });
    }
  }, [hoveredID]);

  useEffect(() => {
    if (map && offersFiltered.length > 0) {
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
    >
    </div>
  );
}
const MemoizedOffersMap = React.memo(
  OffersMap,
  (prevProps, nextProps) =>
    prevProps.hoveredID === nextProps.hoveredID &&
    prevProps.nearestOffers === nextProps.nearestOffers &&
    prevProps.cityLocation === nextProps.cityLocation
);
export { MemoizedOffersMap };
