import { Link } from 'react-router-dom';
import { OfferData } from '../../types/offers';
import { store } from '../../store/store';
import { changeStatus } from '../../store/api-actions';
import React from 'react';
export type CardProps = {
  offer: OfferData;
  onMouseLeave?: () => void;
  onMouseEnter?: () => void;
  classPrefix?: string;
};

function Card({ offer, onMouseEnter, onMouseLeave, classPrefix }: CardProps) {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <article
      className={`${classPrefix}__card place-card`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={handleClick}
    >
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div
        className={`${classPrefix}__image-wrapper place-card__image-wrapper`}
      >
        <Link to="offer/:id">
          <img
            className="place-card__image"
            src={`${offer.previewImage}`}
            width="260"
            height="200"
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            onClick={() => {
              store.dispatch(
                changeStatus({
                  offerID: offer.id,
                  status: offer.isFavorite ? 0 : 1,
                })
              );
            }}
            className={`place-card__bookmark-button${
              offer.isFavorite ? ' place-card__bookmark-button--active' : ''
            } button`}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${offer.rating * 20}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

const MemoizedCard = React.memo(Card);

export { MemoizedCard as Card };
