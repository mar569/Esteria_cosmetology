import { forwardRef } from "react";
import { reviews } from "../../utils/reviewsData";
import ReviewsList from "./ReviewsList";
import ReviewsButton from "./ReviewsButton";
import ReviewsHeader from "./ReviewsHeader";
import { motion } from "framer-motion";

const Reviews = forwardRef<HTMLElement>((_, ref) => {
  const displayedReviews = reviews.slice(0, 2);

  return (
    <section
      id="reviews"
      className="py-16 relative"
      ref={ref}
      data-parallax-speed="0.25"
    >
      <motion.div
        className="container mx-auto px-4 "
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="text-center mb-16">
          <motion.h2
            className="text-xl lg:text-2xl font-bold text-accent mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Отзывы клиентов
          </motion.h2>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            Что говорят <span className="text-gradient-gold">обо мне</span>
          </h2>
          <div className="section-divider mb-6" />
        </div>

        <ReviewsList reviews={displayedReviews} />
        <ReviewsButton />
        <ReviewsHeader />
      </motion.div>
    </section>
  );
});

Reviews.displayName = "Reviews";

export default Reviews;