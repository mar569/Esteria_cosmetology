import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
};

const MessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z
    .string()
    .min(1, 'Сообщение не может быть пустым')
    .max(4000, 'Сообщение слишком длинное')
    .transform((s: string) => s.trim()),
});

const RequestSchema = z.object({
  messages: z
    .array(MessageSchema)
    .min(1, 'Требуется хотя бы одно сообщение')
    .max(50, 'Слишком много сообщений в истории'),
});

const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60000;
const RATE_LIMIT_MAX_REQUESTS = 20;

function getRateLimitKey(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const userAgent = req.headers.get('user-agent') || 'unknown';
  const apiKey = req.headers.get('apikey') || 'none';
  return `${userAgent.slice(0, 50)}_${apiKey.slice(-8)}`;
}

function checkRateLimit(key: string): {
  allowed: boolean;
  remaining: number;
  resetIn: number;
} {
  const now = Date.now();
  const entry = rateLimitStore.get(key);
  if (!entry || now > entry.resetTime) {
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW_MS,
    });
    return {
      allowed: true,
      remaining: RATE_LIMIT_MAX_REQUESTS - 1,
      resetIn: RATE_LIMIT_WINDOW_MS,
    };
  }
  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, remaining: 0, resetIn: entry.resetTime - now };
  }
  entry.count++;
  return {
    allowed: true,
    remaining: RATE_LIMIT_MAX_REQUESTS - entry.count,
    resetIn: entry.resetTime - now,
  };
}

const BLOCKED_PATTERNS = [
  /<\/script>/i,
  /javascript:/i,
  /on\w+=/i,
  /data:text\/html/i,
  /eval\s*\$/i,
  /document\.(cookie|write|location)/i,
];

function isContentSafe(content: string): boolean {
  return !BLOCKED_PATTERNS.some((pattern) => pattern.test(content));
}

function sanitizeContent(content: string): string {
  return content.replace(/<[^>]*>/g, '').trim();
}

const clinicInfo = {
  name: 'Эстерия',
  specialization: 'Косметологический кабинет',
  address: 'г. Шлиссельбург, ул. Чекалова, д. 10',
  phone: '+7 (965) 788-77-50',
  whatsapp: '+79657887750',
  telegram: '@esteria_shlisselburg',
  workingHours: {
    weekdays: 'Пн-Пт: 10:00 - 20:00',
    weekend: 'Сб-Вс: 10:00 - 19:00',
  },
};
const servicesData = [
  {
    id: 'facial-cleansing',
    title: 'Чистка лица',
    description:
      'Профессиональное очищение пор, удаление комедонов и улучшение текстуры кожи. Подбираю вид чистки индивидуально: механическая, ультразвуковая или комбинированная.',
    price: 'от 3 000 ₽',
    duration: '60-90 минут',
    benefits: [
      'Глубокое очищение пор',
      'Удаление чёрных точек',
      'Улучшение цвета лица',
      'Выравнивание текстуры кожи',
      'Подготовка к другим процедурам',
    ],
    contraindications: [
      'Острые воспаления (акне в стадии обострения)',
      'Герпес',
      'Экзема, псориаз',
      'Купероз (для механической чистки)',
      'Повышенная чувствительность кожи',
    ],
    preparation:
      'Не загорать за 3 дня до процедуры. Не использовать скрабы и пилинги за 2 дня.',
    aftercare:
      'Не пользоваться декоративной косметикой 24 часа. Использовать успокаивающие средства. Избегать солнца 2-3 дня.',
    category: 'Уходовые процедуры',
  },
  {
    id: 'biorevitalization',
    title: 'Биоревитализация',
    description:
      'Глубокое увлажнение кожи гиалуроновой кислотой для восстановления молодости и сияния. Процедура насыщает кожу влагой изнутри, стимулирует выработку собственного коллагена и эластина.',
    price: 'от 5 000 ₽',
    duration: '45-60 минут',
    benefits: [
      'Глубокое увлажнение всех слоёв кожи',
      'Улучшение тонуса и эластичности',
      'Разглаживание мелких морщин',
      'Здоровое сияние кожи',
      'Профилактика старения',
    ],
    contraindications: [
      'Беременность и лактация',
      'Острые воспалительные заболевания кожи',
      'Аутоиммунные заболевания',
      'Склонность к келоидным рубцам',
      'Приём антикоагулянтов',
    ],
    preparation:
      'За 3 дня до процедуры исключить алкоголь и препараты, разжижающие кровь. Не рекомендуется проводить процедуру во время менструации.',
    aftercare:
      'В течение 24 часов не трогать лицо, избегать макияжа, саун и бань 3-5 дней. Использовать SPF-защиту.',
    category: 'Инъекционная косметология',
  },
  {
    id: 'lip-augmentation',
    title: 'Аугментация губ',
    description:
      'Коррекция формы и объёма губ с помощью качественных филлеров на основе гиалуроновой кислоты. Создаю естественный, гармоничный результат с учётом особенностей вашего лица.',
    price: 'от 7 500 ₽',
    duration: '45 мин',
    benefits: [
      'Увеличение объёма губ',
      'Коррекция асимметрии',
      'Чёткий контур губ',
      'Увлажнение и омоложение',
      'Естественный результат',
    ],
    contraindications: [
      'Герпес в активной стадии',
      'Беременность и лактация',
      'Воспаления в области губ',
      'Аллергия на гиалуроновую кислоту',
      'Аутоиммунные заболевания',
    ],
    preparation:
      'За неделю до процедуры не принимать обезболивающие и витамин Е. При склонности к герпесу — профилактический приём противовирусных препаратов.',
    aftercare:
      'Не целоваться и не есть горячее 4-6 часов. Избегать физических нагрузок 24 часа. Отёк спадёт через 2-3 дня.',
    category: 'Моделирование губ',
  },
  {
    id: 'facial-massage',
    title: 'Лимфодренажный массаж лица',
    description:
      'Расслабляющий массаж для улучшения кровообращения, тонуса и общего состояния кожи лица.',
    price: ' 2 500 ₽',
    duration: '50-80 мин',
    benefits: [
      'Лифтинг-эффект',
      'Снятие отёчности',
      'Улучшение кровообращения',
      'Расслабление мышц',
      'Здоровый цвет лица',
    ],
    contraindications: [
      'Острые кожные заболевания',
      'Онкология',
      'Повышенное давление',
      'Воспаление лицевого нерва',
      'Открытые раны',
    ],
    preparation: 'Снять макияж. Предупредить о проблемах со здоровьем.',
    aftercare: 'Эффект накапливается. Рекомендуется курс 10-15 процедур.',
    category: 'Уходовые процедуры',
  },
  {
    id: 'collagen_nithya',

    title: 'Коллаген Nithya',
    description:
      'Инъекции коллагена для повышения упругости и эластичности кожи.',
    price: 'от 10 000 ₽',
    duration: '45 мин',
    benefits: [
      'Улучшение упругости кожи',
      'Меньше морщин',
      'Глубокое питание кожи',
    ],
    contraindications: [
      'Аллергия на компоненты препарата или косметические ингредиенты.',
      'Инфекционные и воспалительные процессы на коже.',
      'Обострение хронических заболеваний кожи.',
      'Беременность и лактация (в некоторых случаях рекомендуется консультация врача).',
      'Активные кожные заболевания (розацеа, экзема, псориаз).',
    ],
    preparation:
      'Избегать солнца и интенсивных нагрузок 3 дня до процедуры. Не применять скрабы, пилинги или другие агрессивные процедуры за 3 дня до инъекции.',
    aftercare:
      'Использовать солнцезащитный крем, избегать солнечных лучей 3 дня.',
    category: 'Инъекционная косметология',
  },
  {
    id: 'mesotherapy',

    title: 'Мезотерапия (лицо, шея, зона декольте, кожа головы)',
    description:
      'Инъекции витаминов и препаратов для улучшения состояния кожи и волос.',
    price: 'от 2 000 ₽',
    duration: '60 мин',
    benefits: [
      'Улучшение цвет лица',
      'Питание и увлажнение кожи',
      'Усиление роста волос (при необходимости)',
    ],
    contraindications: [
      'Беременность и лактация.',
      'Воспаления и инфекции на коже.',
      'Аллергия на компоненты коктейля.',
    ],
    preparation:
      'Не употреблять алкоголь за 24 часа до процедуры, избегать солнечных лучей.',
    aftercare:
      'Использовать солнезащитный крем, избегать интенсивных физических нагрузок в первые 24 часа.',
    category: 'Инъекционная косметология',
  },
  {
    id: 'fractional_mesotherapy',
    title: 'Фракционная мезотерапия',
    description:
      'Микроинъекции для стимуляции коллагена и улучшения текстуры кожи.',
    price: 'от 2 000 ₽',
    duration: '45 мин',
    benefits: [
      'Улучшение текстуры кожи',
      'Стимуляция коллагена',
      'Меньше морщин и неровностей',
    ],
    contraindications: [
      'Воспаления и инфекции на коже.',
      'Аллергия на компоненты препарата.',
      'Беременность и лактация.',
      'Качество и состояние кожи, требующие консультации специалиста.',
    ],
    preparation:
      'Избегать солнца и интенсивных процедур за 3 дня до процедуры.',
    aftercare:
      'Использовать солнцезащитный крем, избегать солнца в течение 3 дней.',
    category: 'Инъекционная косметология',
  },
  {
    id: 'botox',
    title: 'Ботулинотерапия (1 ед.)',
    description:
      'Инъекции ботулотоксина для разглаживания морщин и профилактики их появления.',
    price: ' 230 ₽',
    duration: '30 мин',
    benefits: [
      'Разглаживание мимических морщин',
      'Профилактика новых морщин',
      'Лифтинг бровей',
      'Устранение гипергидроза',
      'Быстрый результат',
    ],
    contraindications: [
      'Беременность и лактация',
      'Миастения и другие нервно-мышечные заболевания',
      'Приём антибиотиков-аминогликозидов',
      'Воспаления в зоне инъекций',
      'Возраст до 18 лет',
    ],
    preparation:
      'За 3 дня исключить алкоголь и интенсивные физические нагрузки. Не принимать антибиотики.',
    aftercare:
      '4 часа не наклоняться, не лежать. 24 часа не трогать лицо. Неделю избегать саун, бань, солярия. Результат виден через 5-14 дней.',
    category: 'Инъекционная косметология',
  },
  {
    id: 'lipolytics_body',
    title: 'Липолитики по телу 5ml. (непрямые) _Estetic Form Lipo Stop_',
    description:
      'Инъекции для локального уменьшения жировых отложений на теле.',
    price: '2 600 ₽',
    duration: '30-45 минут',
    benefits: ['Моделирование контуров тела', 'Без реабилитации'],
    contraindications: [
      'Беременность и лактация',
      'Заболевания печени и почек',
      'Сахарный диабет',
      'Онкология',
      'Нарушения свёртываемости крови',
    ],
    preparation:
      'Не употреблять алкоголь за 2 дня. Сообщить о принимаемых лекарствах.',
    aftercare:
      'Пить больше воды. Возможен отёк 3-5 дней. Курс 3-5 процедур с интервалом 10-14 дней.',
    category: 'Коррекция фигуры',
  },
  {
    id: 'lipolytics_face',

    title: 'Липолитики по лицу 5ml. (непрямые) _Estetic Form Phyto Slim_',
    description:
      'Инъекции для коррекции контуров лица и уменьшения жировых отложений.',
    price: '2 200 ₽',
    duration: '30-45 минут',
    benefits: [
      'Уменьшение второго подбородка',
      'Коррекция овала лица',
      'Уменьшение носогубных складок',
      'Моделирование контуров тела',
      'Без реабилитации',
    ],
    contraindications: [
      'Беременность и лактация',
      'Заболевания печени и почек',
      'Сахарный диабет',
      'Онкология',
      'Нарушения свёртываемости крови',
    ],
    preparation:
      'Не употреблять алкоголь за 2 дня. Сообщить о принимаемых лекарствах.',
    aftercare:
      'Пить больше воды. Возможен отёк 3-5 дней. Курс 3-5 процедур с интервалом 10-14 дней.',
    category: 'Коррекция фигуры',
  },

  {
    id: 'alginate_mask',
    title: 'Альгинатная маска',
    description: 'Маска из альгината для глубокого увлажнения и питания кожи.',
    price: '1 000 ₽',
    duration: '30 мин',
    benefits: [
      'Глубокое увлажнение',
      'Питание и восстановление кожи',
      'Улучшение эластичности',
    ],
    contraindications: ['Открытые раны и воспаления.'],
    preparation:
      'Перед процедурой очистить кожу, избегать использования агрессивных средств за 24 часа.',
    aftercare:
      'Использовать увлажняющие средства, избегать солнца, не трогать лицо.',
    category: 'Маски и уход',
  },
  {
    id: 'carboxytherapy',
    title: 'Карбокситерапия (Mesomatrix)',
    description:
      'Введение углекислого газа для улучшения обменных процессов и тонуса кожи.',
    price: '2 000 ₽',
    duration: '45 мин',
    benefits: [
      'Улучшение микроциркуляции',
      'Уменьшение проявлений целлюлита',
      'Тонус и эластичность кожи',
    ],
    contraindications: [
      'Беременность и лактация.',
      'Открытые раны и воспаления.',
      'Хронические заболевания в стадии обострения.',
    ],
    preparation: 'Избегать стимуляторов и кофеина за 12 часов до процедуры.',
    aftercare:
      'Использовать тепловые обёртывания или массаж для усиления эффекта.',
    category: 'Инъекционная косметология',
  },
  {
    id: 'cosmetic_peeling',
    title:
      'Косметический пилинг (например, гликолевый, миндальный , BioRe Peel)',
    description:
      'Процедура для обновления кожи, устранения неровностей и пигментации.',
    price: 'от 2 500 ₽',
    duration: '60 мин',
    benefits: [
      'Осветление пигментации',
      'Улучшение текстуры кожи',
      'Уменьшение морщин и неровностей',
    ],
    contraindications: [
      'Воспаления, дерматозы и открытые раны.',
      'Беременность и лактация.',
      'Автоиммунные заболевания кожи.',
    ],
    preparation:
      'Использовать избегать солнца и избегать агрессивных средств за 7–14 дней до пилинга.',
    aftercare: 'Использовать солнцезащитный крем, избегать солнца 1–2 недели.',
    category: 'Химические пилинги',
  },

  {
    id: 'combined_cleaning',
    title: 'Комбинированная чистка лица',
    description:
      'Эффективная процедура, сочетающая механическую, ультразвуковую и аппаратную чистку, направленная на глубокое очищение пор, устранение загрязнений и улучшение состояния кожи.',
    price: 'от 3 000 ₽',
    duration: '60 мин',
    benefits: [
      'Глубокое очищение пор',
      'Улучшение цвета лица',
      'Снижение воспалений и угрей',
    ],
    contraindications: [
      'Воспаления, дерматозы, открытые раны.',
      'Акне, недавно проведённые процедуры на коже.',
    ],
    preparation:
      'Перед процедурой очистить кожу, не использовать к brand кожи за 12 часов.',
    aftercare:
      'Использовать мягкие средства, избегать солнца и механических повреждений кожи.',
    category: 'Чистки и уход',
  },
  {
    id: 'cosmetologist_consultation',
    title: 'Консультация косметолога',
    description:
      'Профессиональная консультация специалиста по уходу за кожей лица и тела, включающая оценку состояния кожи, выявление проблем и подбор индивидуальных рекомендаций по уходу и процедурам. Консультация помогает определить наиболее эффективные методы для улучшения состояния кожи и достижения желаемых результатов.',
    price: 'бесплатно',
    duration: '30 мин',
    benefits: [
      'Общая оценка состояния кожи',
      'Получение индивидуальных рекомендаций',
      'Подбор подходящих процедур и средств ухода',
    ],
    contraindications: ['Отсутствуют противопоказания'],
    preparation:
      'Перед консультацией рекомендуется подготовить информацию о текущем уходе и возможных проблемах кожи.',
    aftercare:
      'Следовать рекомендациям специалиста для достижения наилучших результатов.',
    category: 'Консультация',
  },
];
const systemPrompt = `Ты — Эстерия, дружелюбный и профессиональный виртуальный помощник косметологического кабинета "${
  clinicInfo.name
}".

ТВОЯ ЛИЧНОСТЬ:
- Женственная, заботливая, профессиональная
- Обращаешься на "Вы"
- Используешь эмодзи уместно, но не чрезмерно
- Отвечаешь тепло и с заботой о клиенте

ИНФОРМАЦИЯ О КАБИНЕТЕ:
- Название: ${clinicInfo.name}
- Адрес: ${clinicInfo.address}
- Телефон: ${clinicInfo.phone}
- WhatsApp: ${clinicInfo.whatsapp}
- Telegram: ${clinicInfo.telegram}
- Часы работы: ${clinicInfo.workingHours.weekdays}, ${
  clinicInfo.workingHours.weekend
}

УСЛУГИ КАБИНЕТА:
${servicesData
  .map(
    (s) => `
• ${s.title} (${s.price}, ${s.duration})
  Описание: ${s.description}
  Преимущества: ${s.benefits.join(', ')}
  Противопоказания: ${s.contraindications.join(', ')}
  Подготовка: ${s.preparation}
  После процедуры: ${s.aftercare}
`
  )
  .join('\n')}

ПРАВИЛА ОБРАБОТКИ ДАННЫХ (ОБЯЗАТЕЛЬНО СОБЛЮДАТЬ):
- Не проси персональные данные (имя, телефон, email). Если пользователь предоставит их, предложи перейти в мессенджер для записи.
- Не сохраняй или не повторяй ПДн в ответах.
- Всегда направляй на мессенджеры для записи: "Для записи перейдите в WhatsApp: ${
  clinicInfo.whatsapp
} или Telegram: ${clinicInfo.telegram}".
- Если вопрос о записи, дай контакты и скажи: "Свяжитесь напрямую — там данные будут обработаны безопасно."
- Сообщения обрабатываются анонимно AI-сервисом, без сохранения.

ТВОИ ОБЯЗАННОСТИ:
1. Приветствовать клиентов и представляться
2. Отвечать на вопросы об услугах, ценах, процедурах (без медицинских диагнозов)
3. Объяснять противопоказания и рекомендации
4. Помогать с записью — направлять на мессенджеры
5. Рассказывать о местоположении и часах работы
6. При неясных вопросах — уточнять или предложить связаться

ДОПОЛНИТЕЛЬНЫЕ ПРАВИЛА:
- Если не знаешь точный ответ — предложи связаться с администратором
- Не давай медицинских диагнозов
- Всегда предлагай записаться или задать ещё вопросы
- Если спрашивают о чём-то вне косметологии — вежливо объясни, что ты специализируешься на услугах косметологического кабинета
- Отвечай кратко, но информативно (2-4 предложения обычно достаточно)
- Напоминай о согласии: "Продолжая чат, вы соглашаетесь с обработкой сообщений для ответа."

НАВИГАЦИЯ ПО САЙТУ:
- Услуги: раздел "Услуги" на главной странице
- Контакты и запись: раздел "Контакты" внизу страницы
- Отзывы: раздел "Отзывы"
- О кабинете: раздел "Обо мне"`;

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const rateLimitKey = getRateLimitKey(req);
    const rateLimit = checkRateLimit(rateLimitKey);

    if (!rateLimit.allowed) {
      console.log(
        `Лимит запросов превышен для: ${rateLimitKey.slice(0, 20)}...`
      );
      return new Response(
        JSON.stringify({
          error: 'Слишком много запросов. Пожалуйста, подождите немного.',
        }),
        {
          status: 429,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
            'Retry-After': String(Math.ceil(rateLimit.resetIn / 1000)),
          },
        }
      );
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: 'Неверный формат запроса' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const validationResult = RequestSchema.safeParse(body);
    if (!validationResult.success) {
      console.log('Валидация не удалась:', validationResult.error.issues);
      return new Response(
        JSON.stringify({ error: 'Неверный формат сообщений' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const { messages } = validationResult.data;

    for (const msg of messages) {
      if (!isContentSafe(msg.content)) {
        console.log('Обнаружено потенциально вредоносное содержимое');
        return new Response(
          JSON.stringify({ error: 'Недопустимое содержимое сообщения' }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
    }

    const sanitizedMessages = messages.map(
      (msg: { role: string; content: string }) => ({
        role: msg.role,
        content: sanitizeContent(msg.content),
      })
    );

    const API_KEY = Deno.env.get('API_KEY');
    if (!API_KEY) {
      console.error('Ключ API не настроен');
      return new Response(
        JSON.stringify({ error: 'Сервис временно недоступен' }),
        {
          status: 503,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    console.log(
      `Обработка запроса с ${sanitizedMessages.length} сообщениями (осталось лимита: ${rateLimit.remaining})`
    );

    const response = await fetch(
      'https://ai.gateway.lovable.dev/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'google/gemini-2.5-flash',
          messages: [
            { role: 'system', content: systemPrompt },
            ...sanitizedMessages,
          ],
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      console.error('Ошибка AI сервиса:', response.status);

      if (response.status === 429) {
        return new Response(
          JSON.stringify({
            error: 'Слишком много запросов. Пожалуйста, подождите немного.',
          }),
          {
            status: 429,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Сервис временно недоступен.' }),
          {
            status: 402,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      return new Response(JSON.stringify({ error: 'Ошибка AI сервиса' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Потоковый ответ от AI');

    return new Response(response.body, {
      headers: { ...corsHeaders, 'Content-Type': 'text/event-stream' },
    });
  } catch (error) {
    console.error(
      'Ошибка чат-ассистента:',
      error instanceof Error ? error.message : 'Неизвестная ошибка'
    );
    return new Response(
      JSON.stringify({ error: 'Произошла ошибка. Попробуйте позже.' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
