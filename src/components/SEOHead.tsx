import React, { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  url: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({ title, description, url }) => {
  useEffect(() => {
    // Заголовок страницы
    document.title = title;

    const setMetaTag = (name: string, content: string, property?: string) => {
      const selector = property
        ? `meta[property="${property}"]`
        : `meta[name="${name}"]`;

      let element = document.querySelector(selector) as HTMLMetaElement | null;

      if (!element) {
        element = document.createElement('meta');
        if (property) {
          element.setAttribute('property', property);
        } else {
          element.setAttribute('name', name);
        }
        document.head.appendChild(element);
      }

      element.setAttribute('content', content);
    };

    const setLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(
        `link[rel="${rel}"]`
      ) as HTMLLinkElement | null;

      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }

      element.setAttribute('href', href);
    };


    setMetaTag('description', description);
    setMetaTag(
      'keywords',
      'косметология, косметология в Шлиссельбурге, косметолог, биоревитализация, аугментация губ, чистка лица, массаж лица, липолитики, ботулинотерапия, коллаген, Шлиссельбург, косметолог в Шлиссельбурге, косметолог в Кировске'
    );

    // Open Graph
    setMetaTag('og:title', title, 'og:title');
    setMetaTag('og:description', description, 'og:description');
    setMetaTag('og:type', 'website', 'og:type');
    setMetaTag('og:site_name', 'Эстерия', 'og:site_name');
    setMetaTag('og:locale', 'ru_RU', 'og:locale');
    setMetaTag('og:image', 'https://esteriacosmo.ru/logo.png', 'og:image');
    setMetaTag('og:image:width', '1200', 'og:image:width');
    setMetaTag('og:image:height', '630', 'og:image:height');
    setMetaTag('og:url', url, 'og:url');

    // canonical для текущего адреса
    setLinkTag('canonical', url);
  }, [title, description, url]);

  return null;
};

export default SEOHead;