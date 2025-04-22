import { Card } from '../card/сard';
import { appendSForPlural } from '../../utils/common';
import { SortingOptionsList } from '../sorting-options-list/sorting-options-list';
import { useCallback, useMemo, useState } from 'react';
import { Map } from '../map/map';
import { useAppSelector } from '../../hooks';
import { sortingByType } from '../../utils/common';
import { getCurrentCity, getSortingType } from '../../store/app-data/selectors';
import { getOffers } from '../../store/offers-data/selectors';

function Cities(): JSX.Element {
  const [hoveredID, setHoveredID] = useState('');

  const city = useAppSelector(getCurrentCity);

  const currentCity = useAppSelector(getCurrentCity);
  const sortingType = useAppSelector(getSortingType);
  const offers = useAppSelector(getOffers);

  const handleMouseLeave = useCallback(() => {
    setHoveredID('');
  }, []);

  const handleMouseEnter = useCallback((id: string) => {
    setHoveredID(id);
  }, []);

  const offersFiltered = useMemo(() => {
    const filtered = offers.filter((offer) => offer.city.name === currentCity);
    return sortingByType(sortingType, filtered);
  }, [offers, currentCity, sortingType]);

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">
            {' '}
            {offersFiltered.length} place
            {appendSForPlural(offersFiltered.length)} to stay in {city}
          </b>
          <SortingOptionsList />
          <div className="cities__places-list places__list tabs__content">
            {offersFiltered.map((offer) => (
              <Card
                key={offer.id}
                offer={offer}
                onMouseLeave={handleMouseLeave}
                onMouseEnter={() => handleMouseEnter(offer.id)}
                classPrefix="cities"
              />
            ))}
          </div>
        </section>
        <div className="cities__right-section">
          <Map
            cityLocation={{
              latitude: 52.3909553943508,
              longitude: 4.85309666406198,
              zoom: 8,
            }}
            hoveredID={hoveredID}
            height="794px"
            width="500px"
            marginBottom="0px"
          />
        </div>
      </div>
    </div>
  );
}

export { Cities };
