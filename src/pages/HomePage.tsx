import React, { useRef, useEffect } from 'react';

import Hero from '../components/Hero';
import AboutMe from '../components/aboutSection/AboutMe';
import Services from '../components/serviceCard/Services';
import Gallery from '../components/gallery/Gallery';
import Reviews from '../components/reviews/Reviews';
import Blog from '../components/Blog';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

import { useService } from '../components/context/ServiceContext';
import WhyMeAndQuestions from '../components/whyMe/WhyMeAndQuestions';
import { useScrollToSection } from '../hooks/useScrollToSection';

import ScrollToTopButton from '../components/ScrollToTopButton';
import AIAssistant from '../components/Chat/AIAsisstant';
import ChatBot from '../components/Chat/ChatBot';

const HomePage: React.FC = () => {

    const {
        registerRef,
    } = useScrollToSection();

    const heroRef = useRef<HTMLElement>(null);
    const aboutRef = useRef<HTMLElement>(null);
    const galleryRef = useRef<HTMLDivElement>(null);
    const reviewsRef = useRef<HTMLElement>(null);
    const servicesRef = useRef<HTMLElement>(null);
    const whymeRef = useRef<HTMLElement>(null);
    const blogRef = useRef<HTMLElement>(null);
    const contactRef = useRef<HTMLElement>(null);
    const { setSelectedService } = useService();

    const stats = [
        { index: '01', value: '10+', label: 'Лет опыта' },
        { index: '02', value: '500+', label: 'Довольных клиентов' },
        { index: '03', value: 'Не менее 1 года', label: 'Гарантии на процедуры' },
        { index: '04', value: 'Доступные цены', label: 'На все услуги' },
    ];

    useEffect(() => {
        registerRef('#hero', heroRef);
        registerRef('#about', aboutRef);
        registerRef('#gallery', galleryRef);
        registerRef('#reviews', reviewsRef);
        registerRef('#services', servicesRef);
        registerRef('#whyme', whymeRef);

        registerRef('#blog', blogRef);
        registerRef('#contact', contactRef);
    }, [registerRef]);

    const openAppointmentWithService = (service: string) => {
        setSelectedService(service);

    };

    const handleConsultationClick = () => {
        openAppointmentWithService('Консультация косметолога');
    };

    return (
        <div style={{ scrollBehavior: 'smooth' }} >

            <section ref={heroRef} id="hero" className="hero-bg" style={{ position: 'relative', minHeight: '100vh' }}>
                <Hero />
            </section>
            <section style={{ position: 'relative' }}>
                <AIAssistant />
            </section>

            <section ref={aboutRef} id="about" style={{ position: 'relative' }}>
                <AboutMe stats={stats} onConsultationClick={handleConsultationClick} />
            </section>

            <section ref={galleryRef} id="gallery" style={{ position: 'relative' }}>
                <Gallery />
            </section>

            <Services ref={servicesRef} onSelectService={openAppointmentWithService} />

            <section ref={whymeRef} id="whyme" style={{ position: 'relative' }}>
                <WhyMeAndQuestions />
            </section>

            <section ref={reviewsRef} id="reviews" style={{ position: 'relative' }}>
                <Reviews />
            </section>

            <section ref={blogRef} id="blog" style={{ position: 'relative' }}>
                <Blog />
            </section>

            <section ref={contactRef} id="contact" style={{ position: 'relative' }}>
                <Contact />
            </section>

            <Footer />
            <section style={{ position: 'relative' }}>
                <ChatBot />
            </section>
            <section style={{ position: 'relative' }}>
                <ScrollToTopButton />
            </section>
        </div >
    );
};

export default HomePage;