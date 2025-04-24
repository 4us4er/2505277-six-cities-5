import { FavoritesCard } from '../../components/favorites-card/favorites-card';
import { useAppSelector } from '../../hooks';
import { getFavorites } from '../../store/offers-favorite-data/selectors';
import { Header } from '../../components/header/header';
import { useMemo } from 'react';

function Favorites(): JSX.Element {
  const favorites = useAppSelector(getFavorites);
  const memorizedHeader = useMemo(()=> <Header />,[]);
  return (
    <div className="page">
      {memorizedHeader}
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {favorites.length > 0 ? (
                favorites.map((offer) => (
                  <FavoritesCard key={offer.id} offer={offer} />
                ))
              ) : (
                <div style={{ fontSize: '40px', textAlign: 'center' }}>
                  Nothing yet saved
                </div>
              )}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width="64"
            height="33"
          />
        </a>
      </footer>
    </div>
  );
}
export { Favorites };
