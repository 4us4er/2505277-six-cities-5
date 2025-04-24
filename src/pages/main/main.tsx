import { Cities } from '../../components/cities/cities';
import { CitiesList } from '../../components/cities-list/cities-list';
import { Header } from '../../components/header/header';
import { useMemo } from 'react';

function Main(): JSX.Element {
  const memorizedHeader = useMemo(()=><Header />,[]);
  return (
    <div className="page page--gray page--main">
      {memorizedHeader}
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CitiesList />
        </div>
        <Cities />
      </main>
    </div>
  );
}

export { Main };
