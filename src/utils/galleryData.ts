import interior_1 from '../assets/interior/interior-1.jpg';
import interior_2 from '../assets/interior/interior-2.jpg';
import interior_3 from '../assets/interior/interior-3.jpg';
import interior_4 from '../assets/interior/interior-4.jpg';
import interior_5 from '../assets/interior/interior-5.jpg';
import interior_7 from '../assets/interior/interior-7.jpg';
import interior_8 from '../assets/interior/interior-8.jpg';
import interior_9 from '../assets/interior/interior-9.jpg';
import interior_10 from '../assets/interior/interior-10.jpg';
import interior_11 from '../assets/interior/interior-11.jpg';

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category:
    | 'interior'
    | 'equipment'
    | 'procedures'
    | 'reception'
    | 'consultation'
    | 'comfort';
  title?: string;
  description: string;
}
export const images: GalleryImage[] = [
  {
    id: 1,
    src: interior_11,
    alt: 'Общий вид косметологического кабинета',
    category: 'interior',
    title: 'Пространство для процедур красоты',
    description: 'Уютная атмосфера с современным дизайном.',
  },
  {
    id: 2,
    src: interior_5,
    alt: 'Современный кабинет косметологии с креслом',
    category: 'interior',
    description: 'Сочетание комфорта и функциональности в интерьере.',
  },

  {
    id: 3,
    src: interior_7,
    alt: 'Консультационная зона',
    category: 'consultation',
    title: 'Зона для консультаций',
    description: 'Комфортное пространство для предварительных бесед.',
  },
  {
    id: 4,
    src: interior_8,
    alt: 'Консультационная зона',
    category: 'consultation',
    title: 'И приятного ожидания',
    description: 'Уютное место для обсуждения процедур или общения.',
  },
  {
    id: 5,
    src: interior_1,
    alt: 'Косметологический кабинет с креслом и лампой',
    category: 'interior',
    title: 'Уют в кабинете',
    description:
      'Свечи и зелень создают уютную атмосферу в косметологическом кабинете.',
  },

  // Рабочие места и комфорт
  {
    id: 6,
    src: interior_2,
    alt: 'Современный кабинет косметологии с креслом',
    category: 'comfort',
    title: 'Максимальный комфорт',
    description: 'Эргономичная кушетка для вашего удобства.',
  },
  {
    id: 7,
    src: interior_9,
    alt: 'Современный кабинет косметологии с креслом',
    category: 'comfort',
    description: 'Рабочее место, сочетающее комфорт и практичность.',
  },

  {
    id: 8,
    src: interior_10,
    alt: 'Косметологический кабинет с креслом и растениями',
    category: 'comfort',
    title: 'Кабинет с растениями',
    description: 'Приятная атмосфера благодаря зелени и уютному интерьеру.',
  },
  {
    id: 9,
    src: interior_5,
    alt: 'Рабочее пространство',
    category: 'comfort',
    title: 'Кабинет с растениями',
    description: 'Профессиональное оказание услуг.',
  },

  // Оборудование и инструменты
  {
    id: 10,
    src: interior_2,
    alt: 'Косметологические приборы на столе',
    category: 'equipment',
    title: 'Современное оборудование',
    description: '',
  },

  // Оценка результата
  {
    id: 11,
    src: interior_3,
    alt: 'Косметологический кабинет с зеркалом и растениями',
    category: 'equipment',
    title: 'Пространство для оценки результата',
    description:
      'Зеркало и зелень создают комфорт для финальной проверки процедуры.',
  },
  {
    id: 12,
    src: interior_4,
    alt: 'Уголок с дипломами и сертификатами',
    category: 'equipment',
    title: 'Дипломы и сертификаты',
    description: 'Гарантия качества и подтверждение профессионализма.',
  },
];

export const categories = [
  {
    id: 'interior',
    name: 'Интерьер',
    count: images.filter((img) => img.category === 'interior').length,
  },
  {
    id: 'consultation',
    name: 'Консультации',
    count: images.filter((img) => img.category === 'consultation').length,
  },
  {
    id: 'comfort',
    name: 'Рабочие места и комфорт',
    count: images.filter((img) => img.category === 'comfort').length,
  },
  {
    id: 'equipment',
    name: 'Пространство',
    count: images.filter((img) => img.category === 'equipment').length,
  },
];
