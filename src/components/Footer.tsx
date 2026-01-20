import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Heart, Phone, Mail, MapPin } from 'lucide-react';
import { FaTelegram, FaVk, FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { smoothScrollTo } from '../utils/smoothScroll';
import { socialLinks } from '../utils/socialLinks';

const servicesLinks = [
  { href: '#services', label: 'Биоревитализация' },
  { href: '#services', label: 'Аугментация губ' },
  { href: '#services', label: 'Чистка лица' },
  { href: '#services', label: 'Массаж лица' },
  { href: '#services', label: 'RF-лифтинг' },
  { href: '#services', label: 'Пилинги' },
];

const navigationLinks = [
  { href: '#about', label: 'Обо мне' },
  { href: '#services', label: 'Услуги' },
  { href: '#reviews', label: 'Отзывы' },
  { href: '#blog', label: 'Блог' },
  { href: '#contact', label: 'Контакты' },
];

const Footer = forwardRef<HTMLElement>((_, ref) => {
  const handleLinkClick = (href: string) => {
    smoothScrollTo(href);
  };

  return (
    <footer
      className="text-white relative pb-10 border-t border-gray-800 "
      ref={ref}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="flex space-x-2 items-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-black/60 border border-white/10">
                <img src={logo} alt="Логотип Esteria" className="w-11 h-11 rounded-full" />
              </div>
              <h3 className="font-bold text-xl h2">Эстерия</h3>
            </div>

            <p className="text-gray-100 leading-relaxed">
              Косметологический кабинет в Шлиссельбурге.
              Забочусь о вашей красоте с 2024 года.
            </p>

            <div className="flex space-x-6">
              <motion.a
                href={socialLinks.vk}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-12 sm:h-12 bg-black/70 border border-white/10 hover:border-emerald-400 rounded-full flex items-center justify-center shadow-lg hover:text-emerald-300 transition-all duration-200 hover:scale-110"
                whileHover={{ scale: 1.1 }}
                aria-label="VK"
              >
                <FaVk size={22} />
              </motion.a>
              <motion.a
                href={socialLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-12 sm:h-12 bg-black/70 border border-white/10 hover:border-emerald-400 rounded-full flex items-center justify-center shadow-lg hover:text-emerald-300 transition-all duration-200 hover:scale-110"
                whileHover={{ scale: 1.1 }}
                aria-label="WhatsApp"
              >
                <FaWhatsapp size={22} />
              </motion.a>
              <motion.a
                href={socialLinks.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-12 sm:h-12 bg-black/70 border border-white/10 hover:border-emerald-400 rounded-full flex items-center justify-center shadow-lg hover:text-emerald-300 transition-all duration-200 hover:scale-110"
                whileHover={{ scale: 1.1 }}
                aria-label="Telegram"
              >
                <FaTelegram size={22} />
              </motion.a>
            </div>
          </motion.div>

          {/* Навигация */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-white">Навигация</h3>
            <ul className="space-y-3">
              {navigationLinks.map(({ href, label }, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(href);
                    }}
                    className="flex items-center text-gray-200 hover:text-emerald-300 transition-colors duration-200 group cursor-pointer bg-transparent border-none p-0"
                  >
                    <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Услуги */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-white">Услуги</h3>
            <ul className="space-y-3">
              {servicesLinks.map(({ href, label }, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(href);
                    }}
                    className="flex items-center text-gray-200 hover:text-emerald-300 transition-colors duration-200 group cursor-pointer bg-transparent border-none p-0"
                  >
                    <span className="w-2 h-2 bg-teal-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Контакты */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-white">Контакты</h3>
            <div className="space-y-4 text-gray-200">
              <motion.div
                className="flex items-start space-x-3 group cursor-pointer"
                whileHover={{ x: 5 }}
              >
                <MapPin className="h-5 w-5 text-emerald-500 mt-1 group-hover:text-emerald-300 transition-colors" />
                <span className="group-hover:text-white transition-colors">
                  Чекалова, д. 10, Шлиссельбург
                </span>
              </motion.div>
              <motion.div
                className="flex items-center space-x-3 group cursor-pointer"
                whileHover={{ x: 5 }}
              >
                <Phone className="h-5 w-5 text-emerald-500 group-hover:text-emerald-300 transition-colors" />
                <a
                  href="tel:+796578877750"
                  className="group-hover:text-white transition-colors"
                >
                  +7 (965) 788-77-50
                </a>
              </motion.div>
              <motion.div
                className="flex items-center space-x-3 group cursor-pointer"
                whileHover={{ x: 5 }}
              >
                <Mail className="h-5 w-5 text-emerald-500 group-hover:text-emerald-300 transition-colors" />
                <a
                  href="mailto:marianna.esteria@mail.ru"
                  className="group-hover:text-white transition-colors"
                >
                  marianna.esteria@mail.ru
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>



        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">

            <div className="text-gray-400 text-sm text-center lg:text-left">
              © 2025-{new Date().getFullYear()} Эстерия. Все права защищены.
            </div>


            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-gray-400 text-sm">
              <Link
                to="/privacy-policy"
                className="underline hover:text-emerald-300 transition-colors text-center sm:text-left"
              >
                Политика конфиденциальности
              </Link>
              <div className="flex items-center space-x-2 justify-center sm:justify-start">
                <span>Сделано с</span>
                <Heart className="text-red-500" size={16} />
                <span>в Шлиссельбурге</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;