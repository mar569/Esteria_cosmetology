import { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import PageLayout from './components/PageLayout';
import SEOHead from './components/SEOHead';
import NotFoundPage from './components/NotFoundPage';
import { ServiceProvider } from './components/context/ServiceContext';
import ErrorBoundary from './ErrorBoundary';
import { articles } from './utils/articlesData';

const HomePage = lazy(() => import('./pages/HomePage'));
const AllReviewsPage = lazy(() => import('./pages/AllReviewsPage'));
const Blog = lazy(() => import('./components/Blog'));
const ArticlePage = lazy(() => import('./pages/ArticlePage'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));

function App() {
  const location = useLocation();
  const hideHeader = location.pathname !== '/';

  const baseUrl = 'https://esteriacosmo.ru';

  const seoData = {
    '/': {
      title: 'Косметология в Шлиссельбурге | Косметология Эстерия в Шлиссельбурге',
      description:
        'Косметология Эстерия - биоревитализация, аугментация губ, чистка лица, массаж лица, липолитики по телу и лицу, ботулинотерапия, коллаген и другие процедуры в Шлиссельбурге.',
      url: `${baseUrl}`,
    },
    '/reviews': {
      title: 'Все отзывы - Эстерия',
      description: 'Полный список отзывов клиентов Эстерия.',
      url: `${baseUrl}/reviews`,
    },
    '/blog': {
      title: 'Блог о косметологии - Эстерия',
      description:
        'Статьи и советы по косметологии, уходу за кожей и процедурам в Эстерия.',
      url: `${baseUrl}/blog`,
    },
    '/privacy-policy': {
      title: 'Политика конфиденциальности - Эстерия',
      description: 'Политика конфиденциальности сайта Эстерия. Информация об обработке персональных данных.',
      url: `${baseUrl}/privacy-policy`,
    },
  } as const;

  const getSEOForPath = (path: string) => {

    if (path.startsWith('/blog/')) {
      const id = path.replace('/blog/', '').split('/')[0];
      const article = articles.find((a) => a.id === id);

      if (article) {
        return {
          title: `${article.title} | Блог о косметологии - Эстерия`,
          description: article.excerpt || seoData['/blog'].description,
          url: `${baseUrl}/blog/${article.id}`,
        };
      }


      return {
        title: 'Статья не найдена | Эстерия',
        description:
          'Запрошенная статья не найдена. Вернитесь в блог или на главную страницу косметологии Эстерия в Шлиссельбурге.',
        url: `${baseUrl}${path}`,
      };
    }


    if (path in seoData) {
      return seoData[path as keyof typeof seoData];
    }

    return {
      title: 'Страница не найдена | Эстерия',
      description:
        'Страница не найдена (ошибка 404). Вернитесь на главную страницу косметологии Эстерия в Шлиссельбурге.',
      url: `${baseUrl}${path}`,
    };
  };

  const currentSEO = getSEOForPath(location.pathname);

  return (
    <div className="bg-background min-h-screen">
      <ErrorBoundary>
        <ServiceProvider>
          <PageLayout hideHeader={hideHeader}>
            <SEOHead
              title={currentSEO.title}
              description={currentSEO.description}
              url={currentSEO.url}
            />

            <Suspense fallback={<div className="spinner_suspense" />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/reviews" element={<AllReviewsPage />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<ArticlePage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>

            </Suspense>
          </PageLayout>
        </ServiceProvider>
      </ErrorBoundary>
    </div>
  );
}

export default App;