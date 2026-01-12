import { forwardRef } from 'react';
import { easeOut, motion } from 'framer-motion';
import { Sparkles, ArrowRight, } from 'lucide-react';

import heroImage from '../assets/hero-botanical.jpg'
import { smoothScrollTo } from '../utils/smoothScroll';


const Hero = forwardRef<HTMLElement>((_props, ref) => {
  return (
    <motion.section
      id="hero"
      className="min-h-screen relative flex items-center justify-center overflow-hidden md:pt-0 pt-10 pb-20 hero-bg"
      ref={ref}
      aria-labelledby="hero-title"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: easeOut }}
    >
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Натуральная косметология"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>


      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-3xl mx-auto text-center">

          <div className="hero-content" >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/60 backdrop-blur-sm border border-border/50 mb-8 animate-fade-up">
              <Sparkles className="text-mint-600" size={24} />
              <span className="text-[#85ad9c] font-medium uppercase tracking-wider text-sm">
                Косметология
              </span>
            </div>


            <h1
              id="hero-title"
              className="text-4xl lg:text-6xl font-bold text-[#85ad9c] mb-6 leading-tight"
            >
              Красота и уход
              <span className="block text-gradient-gold">для вашей кожи</span>
            </h1>

            <p className="text-lg text-[#85ad9c] mb-8 leading-relaxed">
              Профессиональные косметологические процедуры в Шлиссельбурге.
              Массажи (PlasticLift), чистки лица, биоревитализация, аугментация губ и многое другое — всё в уютной и комфортной обстановке.
            </p>


            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a
                href="#appointment"
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollTo('#appointment');
                }}

                whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}
                whileTap={{ scale: 0.95 }}

                className="inline-flex items-center justify-center border-2 border-[#997728] text-accent px-8 py-4  font-semibold rounded-full transition-all duration-300 group"
                aria-label="Записаться на прием"
              >
                Записаться на прием
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </motion.a>

              <motion.a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollTo('#services');
                }}

                whileHover={{ scale: 1.05, }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#997728] text-white font-semibold rounded-full hover:bg-mint-600 hover:text-white transition-all duration-300 group max-w-[80%]"
                aria-label="Посмотреть услуги"
              >
                Мои услуги
              </motion.a>
            </div>
          </div>

          <div className="flex justify-center gap-8 mt-16 pt-16 border-t border-border/80 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <div className="text-center">
              <div className="font-display text-4xl font-bold text-accent mb-2">20+</div>
              <div className="text-sm text-muted-foreground">Видов процедур</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-[48%] -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-foreground/30 flex items-start justify-center p-2">
          <div
            className="w-1 h-3 rounded-full"
            style={{
              backgroundImage: 'linear-gradient(135deg, #e6b14f, #b06b3e)',
            }}
          />
        </div>
      </div>
    </motion.section>
  );
});

Hero.displayName = 'Hero';

export default Hero;