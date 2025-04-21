import { useState } from 'react';
import { useAppSelector } from '../../hooks';

import { SortingOptionsItem } from '../sorting-options-item/sorting-options-item';
import { getSortingType } from '../../store/app-data/selectors';
function SortingOptionsList(): JSX.Element {
  const sortingType = useAppSelector(getSortingType);
  const [opened, setOpened] = useState(false);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setOpened((prev) => !prev)}
      >
        &nbsp;
        {sortingType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom ${
          opened ? 'places__options--opened' : null
        }`}
      >
        <SortingOptionsItem setOpened={setOpened} />
      </ul>
    </form>
  );
}
export { SortingOptionsList };
