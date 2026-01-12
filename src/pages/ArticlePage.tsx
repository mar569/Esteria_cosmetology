import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { articles } from '../utils/articlesData';
import { motion } from 'framer-motion';
import SEOHead from '../components/SEOHead';

const ArticlePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const article = articles.find(a => a.id === id);

    if (!article) {
        return <Navigate to="/" replace />;
    }

    const seoTitle = `${article.title} - Esteria`;
    const seoDescription = article.excerpt;
    const seoUrl = `https://esteriacosmo.ru/blog/${id}`;

    return (
        <>
            <SEOHead
                title={seoTitle}
                description={seoDescription}
                url={seoUrl}
            />
            <section className="py-6 min-h-screen">
                <motion.div
                    className="container mx-auto px-4 max-w-4xl"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 40 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    <Link to="/" className="text-mint-100 text-lg hover:underline mb-6 inline-block">
                        ← Назад к статьям
                    </Link>

                    <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                        <motion.img
                            src={article.image}
                            alt={article.title}
                            className="w-64 h-64 object-cover rounded-lg flex-shrink-0 shadow-lg"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                        />

                        <div className="flex flex-col flex-grow">
                            <motion.h1
                                className="text-2xl font-bold mb-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
                            >
                                {article.title}
                            </motion.h1>

                            <motion.div
                                className="flex items-center text-gray-300 text-sm mb-6 space-x-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
                            >
                                <span>{article.date}</span>
                                <span className="bg-mint-200 text-mint-700 px-2 py-1 rounded">{article.category}</span>
                            </motion.div>

                            <motion.article
                                className="prose max-w-none text-gray-300 whitespace-pre-line overflow-auto"
                                style={{ maxHeight: '16rem' }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
                            >
                                {article.excerpt}
                            </motion.article>
                        </div>
                    </div>

                    <motion.article
                        className="prose max-w-none text-gray-200 whitespace-pre-line mt-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}
                    >
                        {article.content}
                    </motion.article>
                </motion.div>
            </section>
        </>
    );
};

export default ArticlePage;