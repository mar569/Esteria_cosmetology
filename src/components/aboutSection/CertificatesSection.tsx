import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, FileCheck, Award } from 'lucide-react';
import CertificateCard from './CertificateCard';
import { commonVariants } from '../../utils/animations';


const certificates = [
    {
        id: 'cert1',
        number: '01',
        icon: <GraduationCap className="text-mint-100" size={20} />,
        title: 'Диплом о профессиональной переподготовке',
        description:
            'Учебный центр "Cosmo Planet" ООО "ЗАХАРОВА" Лицензия No ЛО35-01271-78/00561492 от 24.06.2022 г. Выдан Ефиминой М.В. о прохождение профессиональной переподготовке в Учебном центре Cosmo Planet по "Сестринское дело в косметологии" на ведение профессионаоьной деятельности в сфере "Косметология" от 31.08.2024 г.',
        additionalImage: undefined,
    },
    {
        id: 'cert2',
        number: '02',
        icon: <FileCheck className="text-mint-100" size={20} />,
        title: 'Сертификат "FACE SCULPTOR"',
        description:
            'Профессиональная подготовка по анатомии лица и шеи и массажам: КоБидо, Plastic Lift, лимфодренажный и скульптурный.',
        additionalImage: undefined,
    },
    {
        id: 'cert3',
        number: '03',
        icon: <FileCheck className="text-mint-100" size={20} />,
        title: 'Сертификат "АКНЕ И ПИЛИНГИ"',
        description: 'Участник мастер-класса по применению профессиональной аппаратной косметики MESOMATRIX.',
        additionalImage: undefined,
    },
    {
        id: 'cert4',
        number: '04',
        icon: <FileCheck className="text-mint-100" size={20} />,
        title: 'Сертификат "АКНЕ И ПИЛИНГИ"',
        description: 'Окончание учебного курса "АКНЕ И ПИЛИНГИ".',
        additionalImage: undefined,
    },
    {
        id: 'cert5',
        number: '05',
        icon: <Award className="text-mint-100" size={20} />,
        title: 'Удостоверение о повышении квалификации',
        description:
            'Удостоверение выдано Ефиминой М.В. от учебного центра Cosmo Planet по "Аугментация губ в косметологии".',
        additionalImage: undefined,
    },
    {
        id: 'cert6',
        number: '06',
        icon: <Award className="text-mint-100" size={20} />,
        title: 'Удостоверение о повышении квалификации',
        description:
            'Удостоверение выдано Ефиминой М.В. от учебного центра Cosmo Planet по "Мезотерапия и биоревитализация в косметологии".',
        additionalImage: undefined,
    },
    {
        id: 'cert7',
        number: '07',
        icon: <Award className="text-mint-100" size={20} />,
        title: 'Удостоверение о повышении квалификации',
        description: 'Удостоверение выдано Ефиминой М.В. от учебного центра Cosmo Planet по "Ботулинотерапия в косметологии".',
        additionalImage: undefined,
    },
];

const itemVariants = {
    ...commonVariants.fadeIn,
    exit: {
        opacity: 0,
        y: -20,
        transition: {
            duration: 0.4,
        },
    },
};

const CertificatesSection: React.FC = () => {
    const [showAll, setShowAll] = useState(false);
    const visibleCount = 2;

    const sectionRef = useRef<HTMLDivElement>(null);
    const scrollPositionRef = useRef<number>(0);

    const visibleCertificates = showAll ? certificates : certificates.slice(0, visibleCount);
    const leftColumn = visibleCertificates.filter((_, i) => i % 2 === 0);
    const rightColumn = visibleCertificates.filter((_, i) => i % 2 === 1);

    const toggleShowAll = () => {
        if (!showAll) {
            scrollPositionRef.current = window.scrollY;
            setShowAll(true);
        } else {
            setShowAll(false);
            if (sectionRef.current) {
                window.scrollTo({
                    top: sectionRef.current.offsetTop,
                    behavior: 'smooth',
                });
            }
        }
    };

    const getDelay = (originalIndex: number) => {
        return originalIndex * 0.1;
    };

    return (
        <div ref={sectionRef} className="w-full ">
            <motion.div
                variants={commonVariants.staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
            >
                <div>
                    <AnimatePresence>
                        {leftColumn.map((cert) => {
                            const originalIndex = visibleCertificates.findIndex(c => c.id === cert.id);
                            return (
                                <motion.div
                                    key={cert.id}
                                    variants={itemVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    transition={{
                                        delay: getDelay(originalIndex),
                                    }}
                                    className="mb-4"
                                >
                                    <CertificateCard
                                        icon={cert.icon}
                                        title={cert.title}
                                        description={cert.description}
                                        number={cert.number}
                                        additionalImage={cert.additionalImage}
                                    />
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
                <div>
                    <AnimatePresence>
                        {rightColumn.map((cert) => {
                            const originalIndex = visibleCertificates.findIndex(c => c.id === cert.id);
                            return (
                                <motion.div
                                    key={cert.id}
                                    variants={itemVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    transition={{
                                        delay: getDelay(originalIndex),
                                    }}
                                    className="mb-4"
                                >
                                    <CertificateCard
                                        icon={cert.icon}
                                        title={cert.title}
                                        description={cert.description}
                                        number={cert.number}
                                        additionalImage={cert.additionalImage}
                                    />
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </motion.div>

            <div className="mt-6 text-center">
                <button
                    onClick={toggleShowAll}
                    className="animate-child inline-flex items-center justify-center px-6 py-3 border border-[#997728] text-white font-semibold rounded-full hover:bg-mint-500 hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg group"
                    style={{ background: 'transparent' }}
                    aria-expanded={showAll}
                    aria-controls="certificates-list"
                >
                    {showAll ? 'Скрыть' : 'Показать все'}
                </button>
            </div>

        </div>
    );
};

export default CertificatesSection;
