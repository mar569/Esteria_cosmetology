
import { Link } from 'react-router-dom';
import { ArrowRight } from "lucide-react";

const ReviewsButton = () => (
    <div className="text-right mt-12">
        <Link
            to="/reviews"


            className="inline-flex items-center justify-center px-4 py-3 text-accent font-semibold  hover:text-accent/80 transition-colors duration-300 transform hover:scale-105 hover:shadow-lg group"
        >
            Смотреть все отзывы
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
        </Link>
    </div>
);

export default ReviewsButton;