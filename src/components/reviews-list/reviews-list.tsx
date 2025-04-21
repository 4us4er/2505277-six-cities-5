import { ReviewsItem } from '../reviews-item/reviews-item';
import { Comments } from '../../types/comments';

type ReviewsListProps = {
  reviews: Comments[];
};

function ReviewsList({ reviews }: ReviewsListProps): JSX.Element {
  return (
    <ul className="reviews__list">
      {reviews.map((review) => (
        <ReviewsItem key={review.id} review={review} />
      ))}
    </ul>
  );
}
export { ReviewsList };
