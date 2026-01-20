import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import cat from '../assets/cat.jpg';

const NotFoundPage: React.FC = () => {
  useEffect(() => {
    let element = document.querySelector(
      'meta[name="robots"]'
    ) as HTMLMetaElement | null;

    if (!element) {
      element = document.createElement('meta');
      element.setAttribute('name', 'robots');
      document.head.appendChild(element);
    }

    const prevContent = element.getAttribute('content') || 'index, follow';

    element.setAttribute('content', 'noindex, nofollow');

    return () => {
      element && element.setAttribute('content', prevContent);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#050b09] to-[#0b1a15] text-white flex items-center justify-center px-4">
      <div className="max-w-3xl w-full bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-3xl px-6 py-10 md:px-10 md:py-12 shadow-2xl backdrop-blur-md">
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Левая часть — крупный код ошибки и текст */}
          <div className="flex-1 text-center md:text-left space-y-5">
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-400/80">
              Ошибка 404
            </p>

            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
              Страница
              <span className="block text-emerald-400 mt-1">
                не найдена
              </span>
            </h1>

            <p className="text-gray-300 text-base md:text-lg max-w-md md:max-w-none mx-auto md:mx-0">
              Возможно, страница была удалена, перемещена или вы ввели
              некорректный адрес. Вы можете вернуться на главную или
              продолжить просмотр сайта.
            </p>

            <div className="flex flex-col sm:flex-row items-center md:items-start gap-4 pt-2">
              <Link
                to="/"
                className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-emerald-500 text-black font-semibold shadow-lg shadow-emerald-500/40 hover:bg-emerald-400 transition-all duration-200"
              >
                На главную
              </Link>

              <button
                type="button"
                onClick={() => window.history.back()}
                className="text-sm text-gray-400 hover:text-gray-200 underline underline-offset-4 transition-colors"
              >
                Вернуться назад
              </button>
            </div>
          </div>

          {/* Правая часть — строгая карточка с изображением */}
          <div className="flex-1 flex items-center justify-center">
            <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(16,185,129,0.25)] bg-black/60">
              <img
                src={cat}
                alt="Страница не найдена"
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
              <div className="absolute bottom-4 left-10 text-left">
                <p className="text-xs uppercase tracking-[0.25em] text-emerald-300/80 mb-1">
                  404 — ошибка
                </p>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;