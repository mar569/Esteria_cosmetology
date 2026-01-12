import { forwardRef, useState } from 'react';
import { MapPin, Phone, Mail, Clock, } from 'lucide-react';
import { motion } from 'framer-motion';
import { FaVk, FaWhatsapp } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa6";
import { socialLinks } from '../utils/socialLinks';

const contactVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const Contact = forwardRef<HTMLElement>((_, ref) => {
  const [isMapLoading, setMapLoading] = useState(true);
  return (
    <section
      id="contact"
      className="py-16 relative"
      ref={ref}
      style={{ touchAction: 'pan-y pinch-zoom' }}
      data-parallax-speed="0.3"
    >
      <motion.div
        variants={contactVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4"
      >
        <div className="text-center mb-12 px-4 sm:px-0">
          <motion.h2
            className="text-xl lg:text-3xl font-bold text-accent mb-3 "
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Контакты
          </motion.h2>
          <motion.p
            className="text-lg sm:text-xl text-[#85ad9c] max-w-3xl mx-auto mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Я нахожусь в Шлиссельбурге. Приходите ко мне!
          </motion.p>
          <div className="section-divider " />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="lg:col-span-1"
          >
            <div
              className="contact-child bg-gradient-to-r from-[#0b281e] via-[#1f342bbc] to-[#0b281e] shadow-lg rounded-3xl p-6 sm:p-8 flex flex-col justify-between h-full "
              style={{ boxShadow: '1px 4px 16px rgba(0, 0, 0, 0.4)' }}
            >
              <div>
                <motion.h3
                  className="text-2xl font-display text-white mb-6"
                  variants={contactVariants}
                  initial="hidden"
                  animate="visible"
                >
                  Свяжитесь со мной
                </motion.h3>

                <div className="space-y-5">
                  <motion.div
                    className="contact-child flex items-start space-x-4"
                    variants={contactVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <MapPin className="text-[#85ad9c] mt-1" size={24} />
                    <div>
                      <h4 className="font-medium text-[#85ad9c]">Адрес</h4>
                      <p className=" leading-relaxed">
                        Чекалова, д. 10<br />
                        Шлиссельбург, 187320
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="contact-child flex items-start space-x-4"
                    variants={contactVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Phone className="text-[#85ad9c] mt-1" size={24} />
                    <div>
                      <h4 className="font-medium text-[#85ad9c]">Телефон</h4>
                      <a href="tel:+79657887750" className="hover:text-mint-400transition-colors">
                        +7 (965) 788-77-50
                      </a>
                    </div>
                  </motion.div>

                  <motion.div
                    className="contact-child flex items-start space-x-4"
                    variants={contactVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Mail className="text-[#85ad9c] mt-1" size={24} />
                    <div>
                      <h4 className="font-medium text-[#85ad9c]">Email</h4>
                      <a href="mailto:marianna.esteria@mail.ru" className="hover:text-mint-400 transition-colors">
                        marianna.esteria@mail.ru
                      </a>
                    </div>
                  </motion.div>

                  <motion.div
                    className="contact-child flex items-start space-x-4"
                    variants={contactVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Clock className="text-[#85ad9c] mt-1" size={24} />
                    <div>
                      <h4 className="font-medium text-[#85ad9c]">Режим работы</h4>
                      <p className="leading-relaxed">
                        Пн-Вс: 9:00 - 20:00<br />
                        Без выходных
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-400 contact-child">
                <motion.h4
                  className="font-semibold mb-4"
                  variants={contactVariants}
                  initial="hidden"
                  animate="visible"
                >
                  Я в соцсетях
                </motion.h4>
                <div className="flex space-x-6">
                  <motion.a
                    href={socialLinks.vk}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-black/70 border border-black/10 hover:border-emerald-400 rounded-full flex items-center justify-center shadow-lg hover:text-emerald-300 transition-colors duration-800 group hover:scale-110"
                    aria-label="VK"
                    variants={contactVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <FaVk size={24} />
                  </motion.a>
                  <motion.a
                    href={socialLinks.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-black/70 border border-black/10 hover:border-emerald-400 rounded-full flex items-center justify-center shadow-lg hover:text-emerald-300 transition-colors duration-800 group hover:scale-110"
                    aria-label="Сообщения"
                    variants={contactVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <FaWhatsapp size={24} />
                  </motion.a>
                  <motion.a
                    href={socialLinks.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-black/70 border border-black/10 hover:border-emerald-400 rounded-full flex items-center justify-center shadow-lg hover:text-emerald-300 transition-colors duration-800 group hover:scale-110"
                    aria-label="Telegram"
                    variants={contactVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <FaTelegram size={24} />
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="lg:col-span-2"
          >
            <div
              className="contact-child bg-gradient-to-r from-[#0b281e] via-[#1f342bbc] to-[#0b281e] shadow-lgrounded-3xl overflow-hidden h-full min-h-[400px] relative"
              style={{ boxShadow: '1px 4px 16px rgba(0, 0, 0, 0.4)' }}
            >
              {isMapLoading && (
                <div className="botanical-card aspect-video flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <MapPin className="w-12 h-12 mx-auto mb-4 text-primary/50" />
                    <p>Карта загружается...</p>
                    <p className="text-sm mt-2">Шлиссельбург, ул. Чекалова, д. 10</p>
                  </div>
                </div>
              )}
              <iframe
                src="https://yandex.ru/map-widget/v1/?ll=31.034619%2C59.946545&mode=search&oid=212797798932&ol=biz&utm_source=share&z=16.79"
                width="100%"
                height="400"
                frameBorder="0"
                allowFullScreen
                loading="lazy"
                className="block"
                onLoad={() => setMapLoading(false)}
              ></iframe>

              <div
                className="relative bg-gradient-to-r mt-10 mb-4 backdrop-blur-xl rounded-tl-sm rounded-br-2xl p-4 ml-2 shadow-lg max-w-xs sm:max-w-sm contact-child"
                style={{ boxShadow: '1px 4px 16px rgba(0, 0, 0, 0.4)' }}
              >
                <motion.h4
                  className="font-bold  mb-1"
                  variants={contactVariants}
                  initial="hidden"
                  animate="visible"
                >
                  Эстерия
                </motion.h4>
                <p className="text-[#85ad9c] text-sm">Чекалова, д. 10</p>
                <p className="text-[#85ad9c] text-sm font-semibold">Открыто до 20:00</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
});

Contact.displayName = 'Contact';

export default Contact;
