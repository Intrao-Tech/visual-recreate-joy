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
    headFigure: string;
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
  catalog: {
    pill: string;
    titlePre: string;
    titleItalic: string;
    categories: {
      title: string;
      note?: string;
      items: { title: string; copy: string; price: string }[];
    }[];
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
  nav: { home: "Home", about: "About", cases: "Services", pricing: "Resources", contact: "Contact", cta: "Free Consultation" },
  hero: {
    slides: [
      { eyebrow: "Bookkeeping you can trust", title: "Focus on your business —\nwe'll handle the books." },
      { eyebrow: "From registration to reporting", title: "Expert accounting\nfor every business." },
    ],
    cta: "Get A Free Consultation →",
  },
  marquee: ["Business Registration", "RRO/PRRO Setup", "Bookkeeping", "Management Accounting", "Tax Audit Support", "Grant Applications", "Free 30 Minute Call"],
  steps: {
    titleA: "Your peace of mind starts",
    titleB: "with a few simple steps",
    intro: "From the first call to clean monthly reports — we make accounting feel effortless for you.",
    items: [
      { title: "Book a Call", copy: "Pick a time that works — we'll come prepared with the right questions about your business." },
      { title: "Get Your Plan", copy: "We assess your setup and propose a tailored accounting solution that fits your needs." },
      { title: "Stay Compliant & Grow", copy: "We handle reporting and compliance while you focus on running your business." },
    ],
  },
  about: {
    headPre: "Your business needs expert",
    headFigure: "opinion",
    headMid: "to set it on the right track",
    headItalic: "so that you get a consistent revenue",
    headPost: "for the longer time period.",
    stats: [
      { n: "300+", l: "Clients served", copy: "Real businesses, real results across multiple industries." },
      { n: "5+", l: "Years of experience", copy: "Years of hands-on practice with FOP, LLC and complex cases." },
      { n: "100%", l: "Compliance focus", copy: "Every report on time, every detail checked, every law respected." },
    ],
  },
  services: {
    pill: "How we can help",
    titlePre: "Comprehensive services",
    titleItalic: "for every stage of business",
    items: [
      { title: "Business Registration", copy: "Open FOP, LLC and set up your accounting from day one." },
      { title: "Bookkeeping Services", copy: "Full bookkeeping for FOP and LLC under any tax system." },
      { title: "Management Accounting", copy: "Clear reports that help you make better business decisions." },
      { title: "RRO/PRRO Setup", copy: "Register and configure cash register systems quickly." },
      { title: "Tax Audit Support", copy: "We stand by your side during inspections and tax reviews." },
      { title: "Licensing & Grants", copy: "Alcohol and tobacco licenses, grant applications, financial monitoring." },
    ],
  },
  cta: { pill: "Why choose us", titlePre: "Experienced specialists, modern tools —", titleItalic: "an individual approach", button: "Get In Touch →" },
  team: {
    pill: "Our team",
    titlePre: "Specialists you can",
    titleItalic: "trust your business to",
    copy: "An experienced team that combines deep expertise with modern tools to keep your books in perfect order.",
    button: "Learn About Us →",
    members: [
      { name: "Jane Cooper", role: "Lead accountant" },
      { name: "Esther Howard", role: "Tax specialist" },
      { name: "Robert Fox", role: "Bookkeeping expert" },
      { name: "Leslie Alexander", role: "Senior consultant" },
    ],
  },
  testimonials: {
    pill: "Client reviews",
    titlePre: "Trusted by",
    titleItalic: "300+ businesses",
    titlePost: "across Ukraine",
    score: "Score on TrustPilot",
    quote: "I was skeptical at first, but ANGL exceeded my expectations. They handle everything — from registration to monthly reports — and I finally feel calm about the financial side of my business.",
    reviews: [
      { name: "Ralph Edwards", role: "Café owner" },
      { name: "Esther Howard", role: "Online retailer" },
      { name: "Dianne Russell", role: "Beauty salon owner" },
    ],
  },
  resources: {
    pill: "Resources",
    titlePre: "Knowledge to help your business",
    titleItalic: "stay compliant and grow",
    download: "Read",
    items: [
      { tag: "Article", title: "Choosing the right tax system for FOP" },
      { tag: "Guide", title: "Bookkeeping checklist for new LLCs" },
      { tag: "Video", title: "How to prepare for a tax audit" },
      { tag: "Article", title: "Grant applications: a step-by-step guide" },
    ],
  },
  footer: {
    titlePre: "Schedule a free",
    titleItalic: "consultation.",
    button: "Book A Free Meeting →",
    desc: "ANGL Consulting helps businesses register, run their books, and stay compliant — with an individual approach for every client.",
    cols: [
      { h: "Company", l: ["About us", "Team", "Contact"] },
      { h: "Services", l: ["Bookkeeping", "Registration", "Audit Support"] },
      { h: "Contact", l: ["+380 12 345 67 89", "info@anglconsulting.com"] },
      { h: "Follow us", l: ["Facebook", "Instagram"] },
    ],
    rights: "© 2026 ANGL Consulting. All Rights Reserved",
    crafted: "Crafted with care.",
  },
};

const uk: Dict = {
  nav: { home: "Головна", about: "Про нас", cases: "Послуги", pricing: "Ресурси", contact: "Контакти", cta: "Безкоштовна консультація" },
  hero: {
    slides: [
      { eyebrow: "Бухгалтерія, якій можна довіряти", title: "Зосередьтесь на бізнесі —\nоблік беремо на себе." },
      { eyebrow: "Від реєстрації до звітності", title: "Експертний облік\nдля кожного бізнесу." },
    ],
    cta: "Безкоштовна консультація →",
  },
  marquee: ["Реєстрація бізнесу", "Налаштування РРО/ПРРО", "Бухгалтерський облік", "Управлінський облік", "Супровід перевірок", "Оформлення грантів", "Безкоштовний дзвінок 30 хв"],
  steps: {
    titleA: "Ваш спокій починається",
    titleB: "з кількох простих кроків",
    intro: "Від першого дзвінка до чистих місячних звітів — робимо бухгалтерію зрозумілою і легкою для вас.",
    items: [
      { title: "Запишіться на дзвінок", copy: "Оберіть зручний час — ми прийдемо з правильними питаннями про ваш бізнес." },
      { title: "Отримайте план", copy: "Аналізуємо ваш стан і пропонуємо рішення, що пасує саме вашому бізнесу." },
      { title: "Зростайте спокійно", copy: "Ми ведемо звітність і дотримуємось норм, а ви розвиваєте свою справу." },
    ],
  },
  about: {
    headPre: "Вашому бізнесу потрібна експертна",
    headFigure: "думка",
    headMid: ", щоб рухатись у правильному напрямку",
    headItalic: "для стабільного прибутку",
    headPost: "впродовж довгого часу.",
    stats: [
      { n: "300+", l: "Клієнтів", copy: "Реальні бізнеси та реальні результати в різних сферах." },
      { n: "5+", l: "Років досвіду", copy: "Роки практики з ФОП, ТОВ та складними кейсами." },
      { n: "100%", l: "Дотримання норм", copy: "Звіти вчасно, кожна деталь перевірена, закон дотримано." },
    ],
  },
  services: {
    pill: "Чим ми можемо допомогти",
    titlePre: "Комплексні послуги",
    titleItalic: "на кожному етапі бізнесу",
    items: [
      { title: "Реєстрація бізнесу", copy: "Відкриваємо ФОП, ТОВ і налаштовуємо облік з першого дня." },
      { title: "Бухгалтерське обслуговування", copy: "Повне ведення ФОП і ТОВ на будь-якій системі оподаткування." },
      { title: "Управлінський облік", copy: "Зрозумілі звіти, що допомагають ухвалювати кращі рішення." },
      { title: "Реєстрація РРО/ПРРО", copy: "Швидко реєструємо та налаштовуємо касові апарати." },
      { title: "Супровід перевірок", copy: "Поруч на кожному етапі податкових перевірок і запитів." },
      { title: "Ліцензії та гранти", copy: "Ліцензії на алкоголь і тютюн, оформлення грантів, фінмоніторинг." },
    ],
  },
  cta: { pill: "Чому обирають нас", titlePre: "Досвідчені спеціалісти, сучасні технології —", titleItalic: "індивідуальний підхід", button: "Зв'язатися →" },
  team: {
    pill: "Наша команда",
    titlePre: "Спеціалісти, яким можна",
    titleItalic: "довірити свій бізнес",
    copy: "Досвідчена команда, що поєднує глибокий професіоналізм із сучасними інструментами, щоб ваша бухгалтерія була в ідеальному порядку.",
    button: "Дізнатися про нас →",
    members: [
      { name: "Jane Cooper", role: "Провідний бухгалтер" },
      { name: "Esther Howard", role: "Податковий спеціаліст" },
      { name: "Robert Fox", role: "Експерт з обліку" },
      { name: "Leslie Alexander", role: "Старший консультант" },
    ],
  },
  testimonials: {
    pill: "Відгуки клієнтів",
    titlePre: "Нам довіряють понад",
    titleItalic: "300 бізнесів",
    titlePost: "по всій Україні",
    score: "Оцінка на TrustPilot",
    quote: "Спочатку я сумнівався, але ANGL перевершили мої очікування. Вони беруть на себе все — від реєстрації до місячних звітів — і я нарешті спокійний за фінансовий бік свого бізнесу.",
    reviews: [
      { name: "Ralph Edwards", role: "Власник кафе" },
      { name: "Esther Howard", role: "Онлайн-продавець" },
      { name: "Dianne Russell", role: "Власниця салону краси" },
    ],
  },
  resources: {
    pill: "Ресурси",
    titlePre: "Знання, що допомагають бізнесу",
    titleItalic: "зростати без зайвих ризиків",
    download: "Читати",
    items: [
      { tag: "Стаття", title: "Як обрати систему оподаткування для ФОП" },
      { tag: "Гайд", title: "Чекліст бухобліку для нових ТОВ" },
      { tag: "Відео", title: "Як підготуватись до податкової перевірки" },
      { tag: "Стаття", title: "Оформлення грантів: покроковий гайд" },
    ],
  },
  footer: {
    titlePre: "Запишіться на безкоштовну",
    titleItalic: "консультацію.",
    button: "Записатися на зустріч →",
    desc: "ANGL Consulting допомагає бізнесам реєструватись, вести облік і дотримуватись норм — з індивідуальним підходом до кожного клієнта.",
    cols: [
      { h: "Компанія", l: ["Про нас", "Команда", "Контакти"] },
      { h: "Послуги", l: ["Бухоблік", "Реєстрація", "Супровід перевірок"] },
      { h: "Контакти", l: ["+380 12 345 67 89", "info@anglconsulting.com"] },
      { h: "Слідкуйте", l: ["Facebook", "Instagram"] },
    ],
    rights: "© 2026 ANGL Consulting. Усі права захищені",
    crafted: "Зроблено з турботою.",
  },
};

const ru: Dict = {
  nav: { home: "Главная", about: "О нас", cases: "Услуги", pricing: "Ресурсы", contact: "Контакты", cta: "Бесплатная консультация" },
  hero: {
    slides: [
      { eyebrow: "Бухгалтерия, которой можно доверять", title: "Сосредоточьтесь на бизнесе —\nучёт берём на себя." },
      { eyebrow: "От регистрации до отчётности", title: "Экспертный учёт\nдля каждого бизнеса." },
    ],
    cta: "Бесплатная консультация →",
  },
  marquee: ["Регистрация бизнеса", "Настройка РРО/ПРРО", "Бухгалтерский учёт", "Управленческий учёт", "Сопровождение проверок", "Оформление грантов", "Бесплатный звонок 30 мин"],
  steps: {
    titleA: "Ваше спокойствие начинается",
    titleB: "с нескольких простых шагов",
    intro: "От первого звонка до чистых месячных отчётов — делаем бухгалтерию понятной и лёгкой для вас.",
    items: [
      { title: "Запишитесь на звонок", copy: "Выберите удобное время — придём с нужными вопросами о вашем бизнесе." },
      { title: "Получите план", copy: "Анализируем ваше положение и предлагаем решение под ваш бизнес." },
      { title: "Растите спокойно", copy: "Мы ведём отчётность и соблюдаем нормы, а вы развиваете дело." },
    ],
  },
  about: {
    headPre: "Вашему бизнесу нужно экспертное",
    headFigure: "мнение",
    headMid: ", чтобы двигаться в правильном направлении",
    headItalic: "для стабильной прибыли",
    headPost: "на длительный период.",
    stats: [
      { n: "300+", l: "Клиентов", copy: "Реальные бизнесы и реальные результаты в разных сферах." },
      { n: "5+", l: "Лет опыта", copy: "Годы практики с ФОП, ООО и сложными кейсами." },
      { n: "100%", l: "Соблюдение норм", copy: "Отчёты вовремя, каждая деталь проверена, закон соблюдён." },
    ],
  },
  services: {
    pill: "Как мы можем помочь",
    titlePre: "Комплексные услуги",
    titleItalic: "на каждом этапе бизнеса",
    items: [
      { title: "Регистрация бизнеса", copy: "Открываем ФОП, ООО и настраиваем учёт с первого дня." },
      { title: "Бухгалтерское обслуживание", copy: "Полное ведение ФОП и ООО на любой системе налогообложения." },
      { title: "Управленческий учёт", copy: "Понятные отчёты, которые помогают принимать лучшие решения." },
      { title: "Регистрация РРО/ПРРО", copy: "Быстро регистрируем и настраиваем кассовые аппараты." },
      { title: "Сопровождение проверок", copy: "Рядом на каждом этапе налоговых проверок и запросов." },
      { title: "Лицензии и гранты", copy: "Лицензии на алкоголь и табак, оформление грантов, финмониторинг." },
    ],
  },
  cta: { pill: "Почему выбирают нас", titlePre: "Опытные специалисты, современные технологии —", titleItalic: "индивидуальный подход", button: "Связаться →" },
  team: {
    pill: "Наша команда",
    titlePre: "Специалисты, которым можно",
    titleItalic: "доверить свой бизнес",
    copy: "Опытная команда, сочетающая глубокий профессионализм с современными инструментами, чтобы ваша бухгалтерия была в идеальном порядке.",
    button: "Узнать о нас →",
    members: [
      { name: "Jane Cooper", role: "Ведущий бухгалтер" },
      { name: "Esther Howard", role: "Налоговый специалист" },
      { name: "Robert Fox", role: "Эксперт по учёту" },
      { name: "Leslie Alexander", role: "Старший консультант" },
    ],
  },
  testimonials: {
    pill: "Отзывы клиентов",
    titlePre: "Нам доверяют более",
    titleItalic: "300 бизнесов",
    titlePost: "по всей Украине",
    score: "Оценка на TrustPilot",
    quote: "Сначала я сомневался, но ANGL превзошли мои ожидания. Они берут на себя всё — от регистрации до месячных отчётов — и я наконец спокоен за финансовую сторону своего бизнеса.",
    reviews: [
      { name: "Ralph Edwards", role: "Владелец кафе" },
      { name: "Esther Howard", role: "Онлайн-продавец" },
      { name: "Dianne Russell", role: "Владелица салона красоты" },
    ],
  },
  resources: {
    pill: "Ресурсы",
    titlePre: "Знания, которые помогают бизнесу",
    titleItalic: "расти без лишних рисков",
    download: "Читать",
    items: [
      { tag: "Статья", title: "Как выбрать систему налогообложения для ФОП" },
      { tag: "Гайд", title: "Чек-лист бухучёта для новых ООО" },
      { tag: "Видео", title: "Как подготовиться к налоговой проверке" },
      { tag: "Статья", title: "Оформление грантов: пошаговый гайд" },
    ],
  },
  footer: {
    titlePre: "Запишитесь на бесплатную",
    titleItalic: "консультацию.",
    button: "Записаться на встречу →",
    desc: "ANGL Consulting помогает бизнесам регистрироваться, вести учёт и соблюдать нормы — с индивидуальным подходом к каждому клиенту.",
    cols: [
      { h: "Компания", l: ["О нас", "Команда", "Контакты"] },
      { h: "Услуги", l: ["Бухучёт", "Регистрация", "Сопровождение проверок"] },
      { h: "Контакты", l: ["+380 12 345 67 89", "info@anglconsulting.com"] },
      { h: "Соцсети", l: ["Facebook", "Instagram"] },
    ],
    rights: "© 2026 ANGL Consulting. Все права защищены",
    crafted: "Сделано с заботой.",
  },
};

export const translations: Record<Lang, Dict> = { uk, en, ru };
