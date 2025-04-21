import { cities } from '../../const/city';
import { CitiesItem } from '../cities-item/cities-item';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCurrentCity } from '../../store/app-data/selectors';
import { changeCity } from '../../store/app-data/app-data';

function CitiesList(): JSX.Element {
  const dispatch = useAppDispatch();
  const currentCity = useAppSelector(getCurrentCity);

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {Object.keys(cities).map((city) => (
          <CitiesItem
            key={city}
            city={cities[city]}
            onClick={() => {
              dispatch(changeCity(city));
            }}
            activeClass={city === currentCity ? 'tabs__item--active' : null}
          />
        ))}
      </ul>
    </section>
  );
}
export { CitiesList };
