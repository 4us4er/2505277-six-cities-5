import { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { CommentForm } from '../../components/comment-form/comment-form';
import { ReviewsList } from '../../components/reviews-list/reviews-list';
import { Map } from '../../components/map/map';
import { Card } from '../../components/card/сard';
import { OfferData, SelectedOffer } from '../../types/offers';
import { useAppSelector } from '../../hooks';
import { Comments } from '../../types/comments';
import {
  fetchSelectedOffersAction,
  fetchNearbyOfferAction,
  fetchCommentsAction,
} from '../../store/api-actions';
import { store } from '../../store/store';
import { getOffers } from '../../store/offers-data/selectors';
import { Header } from '../../components/header/header';

function Offer(): JSX.Element {
  const [reviews, setReviews] = useState<Comments[]>([]);

  const [selectOffer, setSelectOffer] = useState<SelectedOffer | null>(null);
  const [nearbyOffers, setNearbyOffers] = useState<OfferData[] | undefined>(
    undefined
  );

  const [hoveredOfferID, setHoveredOfferID] = useState('');

  const offers = useAppSelector(getOffers);

  const { id } = useParams();

  const handleMouseLeave = useCallback(() => {
    setHoveredOfferID('');
  }, []);

  const handleMouseEnter = useCallback(
    (ID: string) => () => setHoveredOfferID(ID),
    []
  );
  const nearbyList = useMemo(
    () =>
      nearbyOffers?.map((offer) => (
        <Card
          key={offer.id}
          offer={offer}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter(offer.id)}
          classPrefix="near-places"
        />
      )),
    [nearbyOffers, handleMouseLeave, handleMouseEnter]
  );

  useEffect(() => {
    store
      .dispatch(fetchCommentsAction({ offerID: id }))
      .unwrap()
      .then((data) => {
        setReviews(data);
      });
  }, [id]);

  useEffect(() => {
    store
      .dispatch(fetchSelectedOffersAction({ offerID: id }))
      .unwrap()
      .then((data) => setSelectOffer(data));
    store
      .dispatch(fetchNearbyOfferAction({ offerID: id }))
      .unwrap()
      .then((data) => setNearbyOffers(data));
  }, [id]);

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {selectOffer?.images.map((image) => (
                <div key={image} className="offer__image-wrapper">
                  <img
                    className="offer__image"
                    src={image}
                    alt="Photo studio"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              <div className="offer__mark">
                <span>{selectOffer?.isPremium}</span>
              </div>
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{selectOffer?.title}</h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span
                    style={{
                      width: `${
                        selectOffer?.rating ? selectOffer?.rating * 20 : 20 * 3
                      }%`,
                    }}
                  >
                  </span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">
                  {selectOffer?.rating}
                </span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  Apartment
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  3 Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max 4 adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">
                  &euro; {selectOffer?.price}
                </b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  <li className="offer__inside-item">Wi-Fi</li>
                  <li className="offer__inside-item">Washing machine</li>
                  <li className="offer__inside-item">Towels</li>
                  <li className="offer__inside-item">Heating</li>
                  <li className="offer__inside-item">Coffee machine</li>
                  <li className="offer__inside-item">Baby seat</li>
                  <li className="offer__inside-item">Kitchen</li>
                  <li className="offer__inside-item">Dishwasher</li>
                  <li className="offer__inside-item">Cabel TV</li>
                  <li className="offer__inside-item">Fridge</li>
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="offer__avatar user__avatar"
                      src="img/avatar-angelina.jpg"
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">Angelina</span>
                  <span className="offer__user-status">Pro</span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    A quiet cozy and picturesque that hides behind a a river by
                    the unique lightness of Amsterdam. The building is green and
                    from 18th century.
                  </p>
                  <p className="offer__text">
                    An independent House, strategically located between Rembrand
                    Square and National Opera, but where the bustle of the city
                    comes to rest in this alley flowery and colorful.
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">
                  Reviews &middot;{' '}
                  <span className="reviews__amount">{reviews.length}</span>
                </h2>
                <ReviewsList reviews={reviews} />
                <CommentForm />
              </section>
            </div>
          </div>
          <Map
            nearestOffers={nearbyOffers}
            cityLocation={offers[0].location}
            hoveredID={hoveredOfferID}
            height="579px"
            width="1144px"
            marginBottom="50px"
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">{nearbyList}</div>
          </section>
        </div>
      </main>
    </div>
  );
}

export { Offer };
