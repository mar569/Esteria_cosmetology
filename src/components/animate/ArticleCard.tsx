import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Article } from '../../utils/articlesData';

type ArticleCardProps = {
    article: Article;
    index: number;
};

const ArticleCard: React.FC<ArticleCardProps> = ({ article, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <motion.article
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="group bg-gradient-to-r from-[#0b281e] via-[#1f342bbc] to-[#0b281e] rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden
                 flex flex-col h-full"
            style={{ minHeight: 480 }}
        >

            <div className="relative h-48 overflow-hidden flex-shrink-0">
                <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent"></div>
                <div className="absolute top-4 left-4">
                    <span className="bg-mint-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {article.category}
                    </span>
                </div>
            </div>


            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold  mb-3 group-hover:text-mint-600 transition-colors">
                    {article.title}
                </h3>
                <p className="text-gray-200 mb-4 leading-relaxed flex-grow overflow-hidden">
                    {article.excerpt}
                </p>

                <div className="flex flex-col mt-auto text-sm text-[#85ad9c]">
                    <div className="flex items-center space-x-2 mb-2">
                        <Calendar size={16} />
                        <span>{article.date}</span>
                    </div>

                    <Link
                        to={`/blog/${article.id}`}
                        className="flex items-center space-x-2 text-accent text-lg font-semibold group-hover:text-mint-700 transition-colors"
                    >
                        <span>Читать далее</span>
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
                    </Link>
                </div>
            </div >
        </motion.article >
    );
};

export default ArticleCard;
