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
  catalog: {
    pill: "Full catalog",
    titlePre: "Detailed services",
    titleItalic: "and transparent pricing",
    categories: [
      {
        title: "Expert consultations (one-time services)",
        items: [
          { title: "Individual consultation (1 hour)", copy: "A spoken review of your case: taxes, FOP, limits, risk check, optimization of activity.", price: "from 1 500 UAH / hour" },
          { title: "Written expert opinion", copy: "Detailed analysis of the question with references to the Tax Code of Ukraine and a step-by-step action plan.", price: "from 2 500 UAH" },
          { title: "Strategic session with the business owner", copy: "Deep audit of the current company model, search for financial leaks, optimization plan (2 hours).", price: "from 5 000 UAH" },
        ],
      },
      {
        title: "Financial management and managerial accounting",
        items: [
          { title: "Building a managerial accounting system", copy: "Implementation of the core business reports: Cash Flow, P&L, Balance sheet. Adapted to your company's specifics.", price: "from 15 000 UAH" },
          { title: "Cost calculation development", copy: "A tool (template/database) for precise calculation of cost of goods/services and real margin definition.", price: "from 6 000 UAH" },
          { title: "Audit of the company's financial state", copy: "Full analysis of the business 'health', detection of cash gaps, audit of receivables and payables.", price: "from 12 000 UAH" },
        ],
      },
      {
        title: "Tax consulting and business protection",
        items: [
          { title: "Tax structuring of the business", copy: "Selection of the most beneficial and safe tax model (FOP/LLC combinations), legal tax reduction.", price: "from 8 000 UAH" },
          { title: "Tax audit support", copy: "Preparation for STS inspections, accompaniment during the process, drafting objections to acts.", price: "from 10 000 UAH" },
          { title: "Unblocking VAT invoices", copy: "Analysis of blocking reasons, preparation of document package, VAT-payer data tables and complaints.", price: "from 5 000 UAH" },
        ],
      },
      {
        title: "Financial monitoring and banks",
        items: [
          { title: "Financial monitoring support (for banks)", copy: "Building a legal document package and well-grounded explanations for the bank regarding the origin of funds.", price: "from 3 500 UAH" },
          { title: "Account unblocking consulting", copy: "Action plan in case of FOP or individual account blocking, communication with the bank's compliance department.", price: "from 4 000 UAH" },
        ],
      },
      {
        title: "Ready-made packages for small business",
        note: "Prices are indicative. Final cost depends on the volume of operations, number of SKUs and company headcount. We work officially under contract (FOP group 3, without VAT).",
        items: [
          { title: "'Safe Start' package (for new entrepreneurs)", copy: "Consultation on KVED codes and tax system (FOP groups); step-by-step guidance: payments, accounts, limits, working with PRRO/RRO.", price: "from 3 000 UAH" },
          { title: "'Outsourced CFO' package", copy: "Full monthly control of company finances; budgeting, plan-fact analysis, profitability control; weekly reporting meetings with the owner.", price: "from 20 000 UAH / month" },
        ],
      },
      {
        title: "Online training and staff upskilling",
        note: "After the training — video recordings of every meeting and ready-to-use spreadsheet templates. Session timing is arranged individually.",
        items: [
          { title: "Online intensive for in-house accountant (1-on-1)", copy: "Practical Zoom sessions: requalification from classical to managerial accounting, report automation in Google Sheets, nuances of financial monitoring.", price: "from 6 000 UAH" },
          { title: "Practical online workshop on Excel / Google Sheets", copy: "Training for the finance team: complex formulas, pivot tables and dashboards tailored to the business.", price: "from 5 000 UAH" },
          { title: "Corporate online course for the team (managers / sales)", copy: "Financial literacy via Zoom: cost calculation, avoiding receivables, margin control.", price: "from 10 000 UAH" },
          { title: "Development of digital instructions and regulations", copy: "Interactive maps and checklists for staff (receiving primary documents, processing payments, etc.).", price: "from 4 500 UAH" },
        ],
      },
      {
        title: "International collaboration and entering the German market (online)",
        items: [
          { title: "'Entering the German market' consulting", copy: "Analysis of business model readiness, basic requirements, choice of legal form (UG, GmbH, etc.).", price: "from 4 000 UAH (or equivalent in €)" },
          { title: "Financial preparation for integration (DATEV / SAP / Excel)", copy: "Adaptation of reporting and primary documents to the requirements of German tax offices and automation systems.", price: "from 8 000 UAH" },
          { title: "Calculation base development for European partners", copy: "Professional cost calculation and financial justification (Kalkulationsgrundlage) for German banks or investors.", price: "from 6 000 UAH" },
          { title: "Compliance and communication support", copy: "Preparation of responses to German banks' inquiries regarding the origin of funds and legality of financial flows.", price: "from 4 500 UAH" },
        ],
      },
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
  catalog: {
    pill: "Повний каталог",
    titlePre: "Детальні послуги",
    titleItalic: "та прозорі ціни",
    categories: [
      {
        title: "Експертні консультації (разові послуги)",
        items: [
          { title: "Індивідуальна консультація (1 година)", copy: "Усний розбір вашого кейсу: податки, ФОП, ліміти, перевірка ризиків, оптимізація діяльності.", price: "від 1 500 грн / год" },
          { title: "Письмовий експертний висновок", copy: "Детальний аналіз питання з посиланнями на Податковий кодекс України та алгоритмом дій.", price: "від 2 500 грн" },
          { title: "Стратегічна сесія з власником бізнесу", copy: "Глибокий аудит поточної моделі компанії, пошук фінансових втрат, план оптимізації (2 години).", price: "від 5 000 грн" },
        ],
      },
      {
        title: "Фінансовий менеджмент та управлінський облік",
        items: [
          { title: "Побудова системи управлінського обліку", copy: "Впровадження головних звітів бізнесу: Cash Flow, P&L, Баланс. Адаптація під специфіку компанії.", price: "від 15 000 грн" },
          { title: "Розробка калькуляції собівартості", copy: "Інструмент (шаблон/база) для точного розрахунку собівартості товарів/послуг та визначення реальної маржі.", price: "від 6 000 грн" },
          { title: "Аудит фінансового стану компанії", copy: "Повний аналіз «здоров'я» бізнесу, виявлення касових розривів, аудит дебіторської та кредиторської заборгованості.", price: "від 12 000 грн" },
        ],
      },
      {
        title: "Податковий консалтинг та захист бізнесу",
        items: [
          { title: "Податкове структурування бізнесу", copy: "Підбір найвигіднішої та безпечної податкової моделі (комбінації ФОП/ТОВ), легальне зниження податків.", price: "від 8 000 грн" },
          { title: "Супровід податкових перевірок", copy: "Підготовка до перевірки ДПС, супровід під час процесу, написання заперечень на акти.", price: "від 10 000 грн" },
          { title: "Розблокування податкових накладних", copy: "Аналіз причин блокування, підготовка пакету документів, таблиць даних платника ПДВ та скарг.", price: "від 5 000 грн" },
        ],
      },
      {
        title: "Фінансовий моніторинг та банки",
        items: [
          { title: "Супровід фінмоніторингу (для банків)", copy: "Формування легального пакету документів та обґрунтованих пояснень для банку щодо походження коштів.", price: "від 3 500 грн" },
          { title: "Консалтинг із розблокування рахунків", copy: "Алгоритм дій у разі блокування рахунку ФОП чи фізособи, комунікація з комплаєнс-відділом банку.", price: "від 4 000 грн" },
        ],
      },
      {
        title: "Готові пакети для малого бізнесу",
        note: "Ціни вказані орієнтовно. Остаточна вартість залежить від обсягу операцій, кількості номенклатури та штату компанії. Працюємо офіційно за договором (ФОП 3 група, без ПДВ).",
        items: [
          { title: "Пакет «Безпечний Старт» (для нових підприємців)", copy: "Консультація щодо вибору КВЕДів та системи оподаткування (групи ФОП); покроковий інструктаж: оплати, рахунки, ліміти, робота з ПРРО/РРО.", price: "від 3 000 грн" },
          { title: "Пакет «Фінансовий директор на аутсорсі»", copy: "Повний щомісячний контроль фінансів компанії; складання бюджетів, план-факт аналіз, контроль рентабельності; щотижневі звітні зустрічі з власником.", price: "від 20 000 грн / місяць" },
        ],
      },
      {
        title: "Онлайн-навчання та підвищення кваліфікації персоналу",
        note: "Після навчання — відеозаписи всіх зустрічей та готові шаблони таблиць. Час сесій підбирається індивідуально.",
        items: [
          { title: "Онлайн-інтенсив для штатного бухгалтера (індивідуально)", copy: "Практичні Zoom-сесії: перекваліфікація з класичного обліку на управлінський, автоматизація звітів у Google Таблицях, тонкощі фінмоніторингу.", price: "від 6 000 грн" },
          { title: "Практичний онлайн-воркшоп з Excel / Google Sheets", copy: "Навчання фінслужби: складні формули, зведені таблиці та дашборди під специфіку бізнесу.", price: "від 5 000 грн" },
          { title: "Корпоративний онлайн-курс для команди (менеджери / відділ продажів)", copy: "Фінансова грамотність у Zoom: розрахунок собівартості, уникнення дебіторки, контроль маржі.", price: "від 10 000 грн" },
          { title: "Розробка цифрових інструкцій та регламентів", copy: "Інтерактивні карти і чек-листи для персоналу (приймання первинки, проведення платежів тощо).", price: "від 4 500 грн" },
        ],
      },
      {
        title: "Міжнародна колаборація та вихід на ринок Німеччини (онлайн)",
        items: [
          { title: "Консалтинг «Вихід на ринок Німеччини»", copy: "Аналіз готовності бізнес-моделі, базові вимоги, вибір форми діяльності (UG, GmbH тощо).", price: "від 4 000 грн (або еквівалент у €)" },
          { title: "Фінансова підготовка до інтеграції (DATEV / SAP / Excel)", copy: "Адаптація звітності та первинних документів під вимоги німецьких податкових офісів і систем автоматизації.", price: "від 8 000 грн" },
          { title: "Розробка розрахункової бази для європейських партнерів", copy: "Професійна калькуляція собівартості та фінансове обґрунтування (Kalkulationsgrundlage) для німецьких банків чи інвесторів.", price: "від 6 000 грн" },
          { title: "Супровід комплаєнсу та комунікації", copy: "Підготовка відповідей на запити німецьких банків щодо походження коштів та легальності фінансових потоків.", price: "від 4 500 грн" },
        ],
      },
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
  catalog: {
    pill: "Полный каталог",
    titlePre: "Детальные услуги",
    titleItalic: "и прозрачные цены",
    categories: [
      {
        title: "Экспертные консультации (разовые услуги)",
        items: [
          { title: "Индивидуальная консультация (1 час)", copy: "Устный разбор вашего кейса: налоги, ФОП, лимиты, проверка рисков, оптимизация деятельности.", price: "от 1 500 грн / час" },
          { title: "Письменное экспертное заключение", copy: "Детальный анализ вопроса со ссылками на Налоговый кодекс Украины и алгоритмом действий.", price: "от 2 500 грн" },
          { title: "Стратегическая сессия с владельцем бизнеса", copy: "Глубокий аудит текущей модели компании, поиск финансовых потерь, план оптимизации (2 часа).", price: "от 5 000 грн" },
        ],
      },
      {
        title: "Финансовый менеджмент и управленческий учёт",
        items: [
          { title: "Построение системы управленческого учёта", copy: "Внедрение главных отчётов бизнеса: Cash Flow, P&L, Баланс. Адаптация под специфику компании.", price: "от 15 000 грн" },
          { title: "Разработка калькуляции себестоимости", copy: "Инструмент (шаблон/база) для точного расчёта себестоимости товаров/услуг и определения реальной маржи.", price: "от 6 000 грн" },
          { title: "Аудит финансового состояния компании", copy: "Полный анализ «здоровья» бизнеса, выявление кассовых разрывов, аудит дебиторской и кредиторской задолженности.", price: "от 12 000 грн" },
        ],
      },
      {
        title: "Налоговый консалтинг и защита бизнеса",
        items: [
          { title: "Налоговое структурирование бизнеса", copy: "Подбор самой выгодной и безопасной налоговой модели (комбинации ФОП/ООО), легальное снижение налогов.", price: "от 8 000 грн" },
          { title: "Сопровождение налоговых проверок", copy: "Подготовка к проверке ГНС, сопровождение в процессе, написание возражений на акты.", price: "от 10 000 грн" },
          { title: "Разблокировка налоговых накладных", copy: "Анализ причин блокировки, подготовка пакета документов, таблиц данных плательщика НДС и жалоб.", price: "от 5 000 грн" },
        ],
      },
      {
        title: "Финансовый мониторинг и банки",
        items: [
          { title: "Сопровождение финмониторинга (для банков)", copy: "Формирование легального пакета документов и обоснованных пояснений для банка о происхождении средств.", price: "от 3 500 грн" },
          { title: "Консалтинг по разблокировке счетов", copy: "Алгоритм действий при блокировке счёта ФОП или физлица, коммуникация с комплаенс-отделом банка.", price: "от 4 000 грн" },
        ],
      },
      {
        title: "Готовые пакеты для малого бизнеса",
        note: "Цены указаны ориентировочно. Окончательная стоимость зависит от объёма операций, количества номенклатуры и штата компании. Работаем официально по договору (ФОП 3 группа, без НДС).",
        items: [
          { title: "Пакет «Безопасный Старт» (для новых предпринимателей)", copy: "Консультация по выбору КВЭДов и системы налогообложения (группы ФОП); пошаговый инструктаж: оплаты, счета, лимиты, работа с ПРРО/РРО.", price: "от 3 000 грн" },
          { title: "Пакет «Финансовый директор на аутсорсе»", copy: "Полный ежемесячный контроль финансов компании; составление бюджетов, план-факт анализ, контроль рентабельности; еженедельные отчётные встречи с владельцем.", price: "от 20 000 грн / месяц" },
        ],
      },
      {
        title: "Онлайн-обучение и повышение квалификации персонала",
        note: "После обучения — видеозаписи всех встреч и готовые шаблоны таблиц. Время сессий подбирается индивидуально.",
        items: [
          { title: "Онлайн-интенсив для штатного бухгалтера (индивидуально)", copy: "Практические Zoom-сессии: переквалификация с классического учёта на управленческий, автоматизация отчётов в Google Таблицах, тонкости финмониторинга.", price: "от 6 000 грн" },
          { title: "Практический онлайн-воркшоп по Excel / Google Sheets", copy: "Обучение финслужбы: сложные формулы, сводные таблицы и дашборды под специфику бизнеса.", price: "от 5 000 грн" },
          { title: "Корпоративный онлайн-курс для команды (менеджеры / отдел продаж)", copy: "Финансовая грамотность в Zoom: расчёт себестоимости, избежание дебиторки, контроль маржи.", price: "от 10 000 грн" },
          { title: "Разработка цифровых инструкций и регламентов", copy: "Интерактивные карты и чек-листы для персонала (приём первички, проведение платежей и т.д.).", price: "от 4 500 грн" },
        ],
      },
      {
        title: "Международная коллаборация и выход на рынок Германии (онлайн)",
        items: [
          { title: "Консалтинг «Выход на рынок Германии»", copy: "Анализ готовности бизнес-модели, базовые требования, выбор формы деятельности (UG, GmbH и т.д.).", price: "от 4 000 грн (или эквивалент в €)" },
          { title: "Финансовая подготовка к интеграции (DATEV / SAP / Excel)", copy: "Адаптация отчётности и первичных документов под требования немецких налоговых офисов и систем автоматизации.", price: "от 8 000 грн" },
          { title: "Разработка расчётной базы для европейских партнёров", copy: "Профессиональная калькуляция себестоимости и финансовое обоснование (Kalkulationsgrundlage) для немецких банков или инвесторов.", price: "от 6 000 грн" },
          { title: "Сопровождение комплаенса и коммуникации", copy: "Подготовка ответов на запросы немецких банков о происхождении средств и легальности финансовых потоков.", price: "от 4 500 грн" },
        ],
      },
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
