import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { reviews } from '../utils/reviewsData';
import ReviewsHeader from '../components/reviews/ReviewsHeader';
import SEOHead from '../components/SEOHead';
import { commonVariants } from '../utils/animations';
import ReviewsCarousel from '../components/reviews/ReviewsCarousel';

const AllReviewsPage = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <>
            <SEOHead
                title="Все отзывы - Esteria"
                description="Полный список отзывов клиентов Esteria."
                url="https://esteria-cosmo.ru/reviews"
            />
            <section className="py-12 min-h-screen ">
                <motion.div
                    className="container mx-auto px-6 max-w-7xl"
                    variants={commonVariants.fadeIn}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="mb-8">
                        <Link
                            to="/"
                            className="inline-flex items-center text-mint-400 hover:text-mint-300 transition-colors duration-200 text-md font-medium"
                        >
                            ← Назад на главную
                        </Link>
                    </div>

                    <motion.h1
                        className="text-4xl md:text-5xl font-bold text-center text-white mb-12 tracking-tight"
                        variants={commonVariants.fadeIn}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.2 }}
                    >
                        Отзывы клиентов
                    </motion.h1>

                    <motion.div
                        className="mb-16"
                        variants={commonVariants.fadeIn}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.3 }}
                    >
                        <ReviewsCarousel reviews={reviews} />
                    </motion.div>

                    <ReviewsHeader />
                </motion.div>
            </section>
        </>
    );
};

export default AllReviewsPage;