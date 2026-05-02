export type Lang = "uk" | "en" | "ru";

export type Dict = {
  nav: { home: string; about: string; cases: string; pricing: string; contact: string; cta: string };
  hero: {
    slides: { eyebrow: string; title: string }[];
    cta: string;
  };
  marquee: string[];
  steps: {
    titleA: string;
    titleB: string;
    intro: string;
    items: { title: string; copy: string }[];
  };
  about: {
    headPre: string;
    headMid: string;
    headItalic: string;
    headPost: string;
    stats: { n: string; l: string; copy: string }[];
  };
  services: {
    pill: string;
    titlePre: string;
    titleItalic: string;
    items: { title: string; copy: string }[];
  };
  cta: { pill: string; titlePre: string; titleItalic: string; button: string };
  team: {
    pill: string;
    titlePre: string;
    titleItalic: string;
    copy: string;
    button: string;
    members: { name: string; role: string }[];
  };
  testimonials: {
    pill: string;
    titlePre: string;
    titleItalic: string;
    titlePost: string;
    score: string;
    quote: string;
    reviews: { name: string; role: string }[];
  };
  resources: {
    pill: string;
    titlePre: string;
    titleItalic: string;
    download: string;
    items: { tag: string; title: string }[];
  };
  footer: {
    titlePre: string;
    titleItalic: string;
    button: string;
    desc: string;
    cols: { h: string; l: string[] }[];
    rights: string;
    crafted: string;
  };
};

const en: Dict = {
  nav: { home: "Home", about: "About", cases: "Case Studies", pricing: "Pricing", contact: "Contact", cta: "Get This Template" },
  hero: {
    slides: [
      { eyebrow: "Growing business needs help", title: "Anyone, anywhere,\ncan start a business." },
      { eyebrow: "Your dream shouldn't stop", title: "Crafting futures of\nyour dream business." },
    ],
    cta: "Get A Free Consultation →",
  },
  marquee: ["Strategic Roadmapping", "Collaborative Ideation", "Proactive Problem Solving", "Premium Customer Support", "Lifetime Membership", "Free 30 Minute Call"],
  steps: {
    titleA: "Your success depends",
    titleB: "on easy actionable steps",
    intro: "There are many variations of passages of available, but the majority have suffered.",
    items: [
      { title: "Book Time", copy: "It is a long established fact that a reader will be distracted by the readable." },
      { title: "Meet Experts", copy: "It is a long established fact that a reader will be distracted by the readable." },
      { title: "Get Results", copy: "It is a long established fact that a reader will be distracted by the readable." },
    ],
  },
  about: {
    headPre: "Your business needs expert",
    headMid: "opinion to set it on the right track",
    headItalic: "so that you get a consistent revenue",
    headPost: "for the longer time period.",
    stats: [
      { n: "6.2k+", l: "Project completed", copy: "It is a long established fact that a reader will be distracted." },
      { n: "3k+", l: "Happy clients", copy: "It is a long established fact that a reader will be distracted." },
      { n: "98%", l: "Client satisfaction", copy: "It is a long established fact that a reader will be distracted." },
    ],
  },
  services: {
    pill: "How we can help",
    titlePre: "Our services",
    titleItalic: "cover all area",
    items: [
      { title: "Business Strategy", copy: "It is a long established fact that a reader will be distracted" },
      { title: "Finance Management", copy: "It is a long established fact that a reader will be distracted" },
      { title: "Small Business", copy: "It is a long established fact that a reader will be distracted" },
      { title: "Growth Planner", copy: "It is a long established fact that a reader will be distracted" },
      { title: "Prosper Planners", copy: "It is a long established fact that a reader will be distracted" },
      { title: "Market Research", copy: "It is a long established fact that a reader will be distracted" },
    ],
  },
  cta: { pill: "Our Story", titlePre: "High performance team coaching", titleItalic: "you should join us", button: "Get Started Now →" },
  team: {
    pill: "Our team members",
    titlePre: "Guiding your journey to",
    titleItalic: "business brilliance",
    copy: "Established fact that a reader will be distracted by the way readable content of a page when looking at its layout.",
    button: "Learn About Us →",
    members: [
      { name: "Jane Cooper", role: "Certified life coach" },
      { name: "Esther Howard", role: "Business coach" },
      { name: "Robert Fox", role: "Certified life coach" },
      { name: "Leslie Alexander", role: "Business CEO coach" },
    ],
  },
  testimonials: {
    pill: "Our customer review",
    titlePre: "Trusted by over",
    titleItalic: "300,000 accounts",
    titlePost: "and agencies",
    score: "Score on TrustPilot",
    quote: "I was skeptical at first, but exceeded my all expectations. The robust analytics and reporting tools provided valuable insights into our business performance, allowing us to make data-driven decisions.",
    reviews: [
      { name: "Ralph Edwards", role: "Marketing Coordinator" },
      { name: "Esther Howard", role: "Dog Trainer" },
      { name: "Dianne Russell", role: "Medical Assistant" },
    ],
  },
  resources: {
    pill: "Resources",
    titlePre: "We've created the resources that",
    titleItalic: "help you thrive.",
    download: "Download",
    items: [
      { tag: "Book", title: "Writing your success script" },
      { tag: "Book", title: "Navigating your path to prosperity" },
      { tag: "Video", title: "Unleashing potential together" },
      { tag: "Podcast", title: "Blueprinting success stories" },
    ],
  },
  footer: {
    titlePre: "Schedule a free",
    titleItalic: "online meeting.",
    button: "Book A Free Meeting →",
    desc: "It is a long established fact that a reader will be distracted by the readable content of a page at its layout.",
    cols: [
      { h: "Company", l: ["About", "Career", "Contact"] },
      { h: "Solutions", l: ["Freelancer", "Data Analytics", "Small Business"] },
      { h: "Resource", l: ["Customers", "Strategic Finance", "Ebooks & Guides"] },
      { h: "Follow us", l: ["Twitter", "LinkedIn", "Instagram"] },
    ],
    rights: "© 2026 All Rights Reserved",
    crafted: "Crafted with care.",
  },
};

const uk: Dict = {
  nav: { home: "Головна", about: "Про нас", cases: "Кейси", pricing: "Ціни", contact: "Контакти", cta: "Отримати шаблон" },
  hero: {
    slides: [
      { eyebrow: "Бізнесу потрібна допомога", title: "Будь-хто й будь-де\nможе почати бізнес." },
      { eyebrow: "Ваша мрія не повинна спинятися", title: "Створюємо майбутнє\nвашого омріяного бізнесу." },
    ],
    cta: "Безкоштовна консультація →",
  },
  marquee: ["Стратегічне планування", "Спільні ідеї", "Проактивні рішення", "Преміум підтримка", "Довічне членство", "Безкоштовний дзвінок 30 хв"],
  steps: {
    titleA: "Ваш успіх залежить",
    titleB: "від простих дієвих кроків",
    intro: "Існує багато варіантів, але переважна більшість вимагає уваги до деталей.",
    items: [
      { title: "Заброньте час", copy: "Оберіть зручний час, і ми все підготуємо для нашої першої зустрічі." },
      { title: "Зустріч з експертами", copy: "Поговоріть з нашою командою про ваші цілі та виклики бізнесу." },
      { title: "Отримайте результат", copy: "Ми реалізовуємо план і ви бачите вимірюваний ріст вашого бізнесу." },
    ],
  },
  about: {
    headPre: "Вашому бізнесу потрібна експертна",
    headMid: "думка, щоб рухатись у правильному напрямку",
    headItalic: "для стабільного прибутку",
    headPost: "впродовж довгого часу.",
    stats: [
      { n: "6.2k+", l: "Завершених проєктів", copy: "Сотні компаній уже отримали реальні результати з нами." },
      { n: "3k+", l: "Задоволених клієнтів", copy: "Ми будуємо довгострокові партнерства з нашими клієнтами." },
      { n: "98%", l: "Задоволеність клієнтів", copy: "Майже всі клієнти повертаються до нас знову." },
    ],
  },
  services: {
    pill: "Чим ми можемо допомогти",
    titlePre: "Наші послуги",
    titleItalic: "охоплюють усі сфери",
    items: [
      { title: "Бізнес-стратегія", copy: "Розробляємо стратегію росту, що працює саме для вас." },
      { title: "Фінансовий менеджмент", copy: "Допомагаємо керувати фінансами та оптимізувати витрати." },
      { title: "Малий бізнес", copy: "Підтримка малого бізнесу на кожному етапі його розвитку." },
      { title: "Планування росту", copy: "Структуруємо ваш ріст з чіткою дорожньою картою." },
      { title: "Планувальники успіху", copy: "Інструменти й люди для сталого процвітання вашої справи." },
      { title: "Маркетингові дослідження", copy: "Глибокий аналіз ринку для ухвалення кращих рішень." },
    ],
  },
  cta: { pill: "Наша історія", titlePre: "Високоефективний коучинг команди —", titleItalic: "приєднуйтесь до нас", button: "Почати зараз →" },
  team: {
    pill: "Наша команда",
    titlePre: "Ведемо вас до",
    titleItalic: "бізнес-успіху",
    copy: "Команда експертів, які поєднують досвід і свіжі ідеї, щоб допомогти вам досягти більшого.",
    button: "Дізнатися про нас →",
    members: [
      { name: "Jane Cooper", role: "Сертифікований лайф-коуч" },
      { name: "Esther Howard", role: "Бізнес-коуч" },
      { name: "Robert Fox", role: "Сертифікований лайф-коуч" },
      { name: "Leslie Alexander", role: "Коуч для CEO" },
    ],
  },
  testimonials: {
    pill: "Відгуки клієнтів",
    titlePre: "Нам довіряють понад",
    titleItalic: "300 000 акаунтів",
    titlePost: "та агенцій",
    score: "Оцінка на TrustPilot",
    quote: "Спочатку я сумнівався, але результат перевершив усі очікування. Аналітика та звіти дали цінні інсайти, що дозволили нам ухвалювати рішення на основі даних.",
    reviews: [
      { name: "Ralph Edwards", role: "Координатор з маркетингу" },
      { name: "Esther Howard", role: "Тренер собак" },
      { name: "Dianne Russell", role: "Медичний асистент" },
    ],
  },
  resources: {
    pill: "Ресурси",
    titlePre: "Ми створили ресурси, які",
    titleItalic: "допоможуть вам процвітати.",
    download: "Завантажити",
    items: [
      { tag: "Книга", title: "Як написати свій сценарій успіху" },
      { tag: "Книга", title: "Шлях до процвітання" },
      { tag: "Відео", title: "Розкриваємо потенціал разом" },
      { tag: "Подкаст", title: "Креслення історій успіху" },
    ],
  },
  footer: {
    titlePre: "Заплануйте безкоштовну",
    titleItalic: "онлайн-зустріч.",
    button: "Записатися на зустріч →",
    desc: "Ми допомагаємо бізнесам зростати завдяки чітким стратегіям, перевіреним інструментам і експертній підтримці.",
    cols: [
      { h: "Компанія", l: ["Про нас", "Кар'єра", "Контакти"] },
      { h: "Рішення", l: ["Фрилансерам", "Аналітика даних", "Малий бізнес"] },
      { h: "Ресурси", l: ["Клієнти", "Стратегічні фінанси", "Книги та гайди"] },
      { h: "Слідкуйте", l: ["Twitter", "LinkedIn", "Instagram"] },
    ],
    rights: "© 2026 Усі права захищені",
    crafted: "Зроблено з турботою.",
  },
};

const ru: Dict = {
  nav: { home: "Главная", about: "О нас", cases: "Кейсы", pricing: "Цены", contact: "Контакты", cta: "Получить шаблон" },
  hero: {
    slides: [
      { eyebrow: "Растущему бизнесу нужна помощь", title: "Любой и где угодно\nможет начать бизнес." },
      { eyebrow: "Ваша мечта не должна останавливаться", title: "Создаём будущее\nвашего бизнеса мечты." },
    ],
    cta: "Бесплатная консультация →",
  },
  marquee: ["Стратегическое планирование", "Совместные идеи", "Проактивные решения", "Премиум поддержка", "Пожизненное членство", "Бесплатный звонок 30 мин"],
  steps: {
    titleA: "Ваш успех зависит",
    titleB: "от простых действенных шагов",
    intro: "Существует много вариантов, но большинство требует внимания к деталям.",
    items: [
      { title: "Забронируйте время", copy: "Выберите удобное время, и мы подготовимся к первой встрече." },
      { title: "Встреча с экспертами", copy: "Обсудите с нашей командой ваши цели и вызовы бизнеса." },
      { title: "Получите результат", copy: "Мы реализуем план, и вы видите измеримый рост вашего бизнеса." },
    ],
  },
  about: {
    headPre: "Вашему бизнесу нужно экспертное",
    headMid: "мнение, чтобы двигаться в правильном направлении",
    headItalic: "для стабильной прибыли",
    headPost: "на длительный период.",
    stats: [
      { n: "6.2k+", l: "Завершённых проектов", copy: "Сотни компаний уже получили реальные результаты с нами." },
      { n: "3k+", l: "Довольных клиентов", copy: "Мы строим долгосрочные партнёрства с клиентами." },
      { n: "98%", l: "Удовлетворённость клиентов", copy: "Почти все клиенты возвращаются к нам снова." },
    ],
  },
  services: {
    pill: "Как мы можем помочь",
    titlePre: "Наши услуги",
    titleItalic: "охватывают все сферы",
    items: [
      { title: "Бизнес-стратегия", copy: "Разрабатываем стратегию роста, которая работает для вас." },
      { title: "Финансовый менеджмент", copy: "Помогаем управлять финансами и оптимизировать расходы." },
      { title: "Малый бизнес", copy: "Поддержка малого бизнеса на каждом этапе развития." },
      { title: "Планирование роста", copy: "Структурируем ваш рост с чёткой дорожной картой." },
      { title: "Планировщики успеха", copy: "Инструменты и люди для устойчивого процветания." },
      { title: "Маркетинговые исследования", copy: "Глубокий анализ рынка для лучших решений." },
    ],
  },
  cta: { pill: "Наша история", titlePre: "Высокоэффективный коучинг команды —", titleItalic: "присоединяйтесь к нам", button: "Начать сейчас →" },
  team: {
    pill: "Наша команда",
    titlePre: "Ведём вас к",
    titleItalic: "бизнес-успеху",
    copy: "Команда экспертов, сочетающих опыт и свежие идеи, чтобы помочь вам достичь большего.",
    button: "Узнать о нас →",
    members: [
      { name: "Jane Cooper", role: "Сертифицированный лайф-коуч" },
      { name: "Esther Howard", role: "Бизнес-коуч" },
      { name: "Robert Fox", role: "Сертифицированный лайф-коуч" },
      { name: "Leslie Alexander", role: "Коуч для CEO" },
    ],
  },
  testimonials: {
    pill: "Отзывы клиентов",
    titlePre: "Нам доверяют более",
    titleItalic: "300 000 аккаунтов",
    titlePost: "и агентств",
    score: "Оценка на TrustPilot",
    quote: "Сначала я сомневался, но результат превзошёл все ожидания. Аналитика и отчёты дали ценные инсайты для решений на основе данных.",
    reviews: [
      { name: "Ralph Edwards", role: "Координатор по маркетингу" },
      { name: "Esther Howard", role: "Тренер собак" },
      { name: "Dianne Russell", role: "Медицинский ассистент" },
    ],
  },
  resources: {
    pill: "Ресурсы",
    titlePre: "Мы создали ресурсы, которые",
    titleItalic: "помогут вам процветать.",
    download: "Скачать",
    items: [
      { tag: "Книга", title: "Как написать свой сценарий успеха" },
      { tag: "Книга", title: "Путь к процветанию" },
      { tag: "Видео", title: "Раскрываем потенциал вместе" },
      { tag: "Подкаст", title: "Чертежи историй успеха" },
    ],
  },
  footer: {
    titlePre: "Запланируйте бесплатную",
    titleItalic: "онлайн-встречу.",
    button: "Записаться на встречу →",
    desc: "Мы помогаем бизнесам расти благодаря чётким стратегиям, проверенным инструментам и экспертной поддержке.",
    cols: [
      { h: "Компания", l: ["О нас", "Карьера", "Контакты"] },
      { h: "Решения", l: ["Фрилансерам", "Аналитика данных", "Малый бизнес"] },
      { h: "Ресурсы", l: ["Клиенты", "Стратегические финансы", "Книги и гайды"] },
      { h: "Соцсети", l: ["Twitter", "LinkedIn", "Instagram"] },
    ],
    rights: "© 2026 Все права защищены",
    crafted: "Сделано с заботой.",
  },
};

export const translations: Record<Lang, Dict> = { uk, en, ru };
