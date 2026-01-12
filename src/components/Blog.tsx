import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { articles } from '../utils/articlesData';
import ArticleCard from './animate/ArticleCard';

const Blog = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section id="blog" className="py-10 relative" ref={ref} data-parallax-speed="0.3">
      <motion.div
        className="container mx-auto px-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl lg:text-4xl font-bold text-accent mb-6"

          >
            Полезные статьи
          </motion.h2>
        </div>

        <motion.div
          className="grid lg:grid-cols-3 gap-8"

        >
          {articles.map((article, index) => (
            <motion.div
              key={article.id}

            >
              <ArticleCard article={article} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
});

Blog.displayName = 'Blog';

export default Blog;
