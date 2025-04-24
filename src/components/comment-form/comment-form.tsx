import { useState, Fragment } from 'react';
import { store } from '../../store/store';

import { FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import { addComments } from '../../store/api-actions';

// type CommentFormProps = {
//   onAddReview: (review: {
//     rating: number;
//     comment: string;
//     date: string;
//     user?: {
//       name: 'Anonymous';
//       avatarUrl: '';
//       isPro: false;
//     };
//   }) => void;
// };
function CommentForm(): JSX.Element {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const { id } = useParams();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!comment.trim() || rating < 1) {
      return;
    }

    store.dispatch(addComments({ offerID: id, comm: { comment, rating } }));
    setComment('');
    setRating(0);
  };

  const isSubmitDisabled = comment.length < 50 || rating === 0;
  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {[5, 4, 3, 2, 1].map((star) => (
          <Fragment key={star}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={star}
              id={`${star}-stars`}
              type="radio"
              checked={rating === star}
              onChange={() => setRating(star)}
            />
            <label
              htmlFor={`${star}-stars`}
              className="reviews__rating-label form__rating-label"
              title={
                ['terrible', 'badly', 'not bad', 'good', 'perfect'][star - 1]
              }
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        placeholder="Tell how was your stay, what you like and what can be improved"
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isSubmitDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
export { CommentForm };
