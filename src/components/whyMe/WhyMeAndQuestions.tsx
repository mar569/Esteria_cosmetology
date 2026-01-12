import React from "react";
import { motion } from "framer-motion";
import { FaWhatsapp, FaTelegramPlane, FaVk } from "react-icons/fa";
import stars from '../../assets/whyMe/stars.png';
import security from '../../assets/whyMe/security.png';
import tea from '../../assets/whyMe/tea.png';
import level from '../../assets/whyMe/levell.png';
import individual from '../../assets/whyMe/individ.png';
import clean from '../../assets/whyMe/clean.png';
import myImage from '../../assets/me_3.png';
import FaqAccordion from "./FaqAccordion";
import { socialLinks } from "../../utils/socialLinks";


const whyMePoints = [
    {
        img: stars,
        title: "Комфорт",
        description: "Уютная обстановка и забота о Вас.",
    },
    {
        img: clean,
        title: "Стерильно",
        description: "Соблюдаю нормы дезинфекции /стерилизации рабочего пространства.",
    },
    {
        img: individual,
        title: "Индивидуальный подход",
        description: "Каждый клиент уникален — процедуры подбираются персонально.",
    },
    {
        img: security,
        title: "Безопасность и качество",
        description: "Только проверенные препараты и современное оборудование.",
    },
    {
        img: tea,
        title: "Любимые напитки бесплатные",
        description: "Ароматный кофе или насыщенный чай со сладостями.",
    },
    {
        img: level,
        title: "Результаты, которые радуют",
        description: "Помогаю подчеркнуть вашу естественную красоту и уверенность.",
    },
];

const WhyMeAndQuestions: React.FC = () => {
    return (
        <section className="relative py-20">
            <div className="container mx-auto px-4 relative z-10">

                <motion.div
                    className="mb-16"
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-10%" }}
                >
                    <h2 className="text-2xl lg:text-4xl font-bold text-gray-200 mb-8 text-center">
                        Почему <span className="text-accent italic">я</span>?
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">

                        {whyMePoints.map((point, index) => (
                            <motion.div
                                key={index}
                                className="p-6 rounded-xl shadow-sm  shadow-accent/30"
                                initial={{ scale: 0.9, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-gray-400 bg-amber-100/30 flex items-center justify-center mr-4">
                                        <img src={point.img} alt={point.title} className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg md:text-xl font-semibold text-white mb-2">{point.title}</h3>
                                        <p className="text-gray-300">{point.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        className="flex justify-center"
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <div className="relative mr-[150px] md:mr-[600px]">
                            <div className="absolute top-4 right-0 w-40 h-48 bg-gradient-to-tr from-amber-500/80 to-pink-200 rounded-full blur-xl transform rotate-12"></div>
                            <div
                                className="relative w-[220px] h-[220px] md:w-[300px] md:h-[300px] rounded-full border-4 border-gray-400 overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500"
                                style={{
                                    background: 'linear-gradient(145deg, #e5e5e5, #b8b8b8)',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.4), inset 0 10px 20px rgba(232, 177, 48, 0.4); inset 0 -10px 20px rgba(0,0,0,0.3)',
                                    perspective: '1000px'
                                }}
                            >

                                <img
                                    src={myImage}
                                    alt="Моё фото"
                                    className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] object-cover transform hover:scale-110 transition-transform duration-500"
                                    style={{ clipPath: 'circle(50% at 50% 51%)' }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent rounded-3xl"></div>
                            </div>

                            <div
                                className="absolute bottom-24 right-[-7.4rem] font-bold text-3xl drop-shadow-2xl z-20 leading-none"
                                style={{
                                    background: 'linear-gradient(145deg, #ADADAD, #1A1A1A, #ADADAD, #522D2F)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    color: 'transparent',
                                    fontFamily: 'Satisfy, cursive',
                                }}
                            >
                                Марианна <br /> Ефимина

                            </div>
                            <div className="absolute right-[-8rem] bottom-16 ">
                                <p className="text-white">косметолог-эстетист</p>
                            </div>

                            <div className="absolute right-[-8rem] bottom-0 flex space-x-3">
                                <motion.a
                                    href={socialLinks.vk}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-11 h-11 bg-black/40 rounded-full flex items-center justify-center shadow-lg hover:bg-black transition-all duration-300 hover:scale-110"
                                    whileHover={{ rotate: 20 }}
                                >
                                    <FaVk size={28} className="text-white/70 text-lg" />
                                </motion.a>
                                <motion.a
                                    href={socialLinks.whatsapp}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-11 h-11 bg-black/40 rounded-full flex items-center justify-center shadow-lg hover:bg-black transition-all duration-700 hover:scale-110"
                                    whileHover={{ rotate: 20 }}
                                >
                                    <FaWhatsapp size={28} className="text-white/70 text-lg" />
                                </motion.a>
                                <motion.a
                                    href={socialLinks.telegram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-11 h-11 bg-black/40 rounded-full flex items-center justify-center shadow-lg hover:bg-black transition-all duration-300 hover:scale-110"
                                    whileHover={{ rotate: 20 }}
                                >
                                    <FaTelegramPlane size={28} className="text-white/70 text-lg" />
                                </motion.a>

                            </div>
                        </div>
                    </motion.div>
                </motion.div>
                <FaqAccordion />


            </div>
        </section>
    );
};

WhyMeAndQuestions.displayName = 'WhyMeAndQuestions';

export default WhyMeAndQuestions;