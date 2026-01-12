

import { Review } from "../../utils/reviewsData";
import ReviewCard from "../animate/ReviewCard";


interface Props {
    reviews: Review[];
    className?: string
}

const ReviewsList = ({ reviews }: Props) => (
    <div className="grid md:grid-cols-2 gap-8">

        {reviews.map((review, index) => (
            <ReviewCard key={review.name} review={review} index={index} cardWidth={0} />
        ))}
    </div>
);

export default ReviewsList;
