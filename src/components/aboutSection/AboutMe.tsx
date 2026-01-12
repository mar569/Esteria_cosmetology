import React, { forwardRef } from "react";
import CertificatesSection from "./CertificatesSection";
import ProfileCard from "./ProfileCard";
import StatsSection from "./StatsSection";
import { motion } from "framer-motion";
import leafImage from '../../assets/leaf-decoration.png';
type AboutProps = {
    stats: { index: string; value: string; label: string }[];
    onConsultationClick: () => void;
};

const AboutMe: React.FC<AboutProps> = forwardRef<HTMLElement, AboutProps>((_, ref) => {
    return (
        <motion.section
            id="about"
            className="relative py-20"
            ref={ref}
            style={{ position: 'relative' }}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-10%" }}
        >
            <div className="container mx-auto px-4 ">

                <div className="grid lg:grid-cols-2 gap-4 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-20 items-center">
                    <div className="absolute md:-left-10 top-[20%] -translate-y-1/2 w-96 h-96 opacity-20 rotate-12">
                        <img
                            src={leafImage}
                            alt=""
                            className="w-full h-full object-cover"
                            loading="lazy"
                            aria-hidden="true"
                        />
                    </div>
                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        viewport={{ once: true, margin: '-10%' }}
                    >

                        <h3 className="animate-child text-3xl lg:text-4xl font-bold text-accent md:text-left text-center mb-6 text-ce">
                            Обо мне
                        </h3>
                        <div className="section-divider mb-6" />
                        <p className="animate-child text-lg  text-foreground mb-4 leading-relaxed">
                            <span className="font-bold italic text-gradient-gold"> Я </span> — сертифицированный косметолог с медицинским образованием и более чем 10-летним опытом работы в сфере здравоохранения.{" "}
                            <span className="font-bold italic text-gradient-gold"> Моя страсть </span> — красота и забота о каждом клиенте, а моя цель — помочь вам подчеркнуть естественную привлекательность и чувствовать себя уверенно каждый день.
                        </p>
                        <p className="animate-child text-lg text-foreground mb-8 leading-relaxed">
                            Использую только проверенные препараты и современное оборудование, чтобы обеспечить безопасность и лучшие результаты.
                        </p>

                        <blockquote className="animate-child border-l-4 border-mint-400 pl-4 italic text-white/60 mb-8">
                            "Красота — это уверенность, и я здесь, чтобы помочь вам её обрести."
                        </blockquote>
                        <StatsSection />
                    </motion.div>


                    <motion.div

                        initial={{ x: 100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        viewport={{ once: true, margin: '-10%' }}
                    >
                        <ProfileCard />
                    </motion.div>
                </div>
            </div>


            <motion.div
                className="container mx-auto px-4 mt-24"
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
                viewport={{ once: true, margin: '-10%' }}
            >
                <h2 className="animate-child text-3xl lg:text-4xl font-bold text-accent mb-8">
                    Сертификаты и удостоверения
                </h2>
                <CertificatesSection />
            </motion.div>

        </motion.section>
    );
});

AboutMe.displayName = 'AboutMe';
export default AboutMe;