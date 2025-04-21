import { Comments } from '../../types/comments';
import { getFormatDate } from '../../const/date';

type ReviewsItemProps = {
  review: Comments;
};

function ReviewsItem({ review }: ReviewsItemProps): JSX.Element {
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={
              review.user
                ? review.user.avatarUrl
                : `img/avatar-${review.name.length > 4 ? 'max' : 'angelina'}.jpg`
            }
            width="54"
            height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">
          {review.user ? review.user.name : review.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${(review.rating / 5) * 100}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{review.comment}</p>
        <time className="reviews__time" dateTime={review.date}>
          {getFormatDate(review.date)}
        </time>
      </div>
    </li>
  );
}

export { ReviewsItem };
