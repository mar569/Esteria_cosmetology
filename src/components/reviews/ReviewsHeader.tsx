
import { Star } from "lucide-react";

const ReviewsHeader = () => (
    <div className="text-center mb-16 mt-10">

        <div className="inline-flex items-center space-x-4 bg-white/70 rounded-2xl p-3 shadow-lg mx-auto max-w-xs">
            <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
            </div>
            <div className="text-left">
                <div className="text-2xl font-bold text-gray-800">5/5</div>
                <div className="text-gray-600 text-sm">Средняя оценка</div>
            </div>
            <div className="h-12 w-px bg-gray-100"></div>
        </div>
    </div>
);

export default ReviewsHeader;
