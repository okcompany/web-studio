// Система интернационализации для веб-студии
export const languages = {
  de: "Deutsch",
  ru: "Русский",
  en: "English",
};

export const translations = {
  de: {
    nav: {
      home: "Startseite",
      portfolio: "Portfolio",
      news: "Nachrichten",
      about: "Über mich",
      contact: "Kontakt",
    },
    home: {
      studioLabel: "Web Studio",
      slogan: "Kreative Lösungen für Ihr digitales Business",
      description:
        "Verwandeln Sie Ihre Ideen in einzigartige digitale Erlebnisse. Von Webdesign bis Branding – ich bringe Kreativität und Technik zusammen.",
      telegramButton: "Telegram Kontakt",
      scrollHint: "scrollen",
      whyMe: {
        title: "Warum mit mir arbeiten?",
        subtitle: "Drei Dinge, die ich anders mache",
        items: [
          {
            title: "Schnell & transparent",
            description: "Antwort in 24 Std. Sie wissen immer, woran ich gerade arbeite und was als Nächstes kommt.",
          },
          {
            title: "Persönlicher Ansatz",
            description: "Kein Ticket-System, keine Junior-Teams. Sie sprechen direkt mit dem Designer und Entwickler.",
          },
          {
            title: "Ehrliche Preise",
            description: "Festpreis pro Projekt oder klarer Stundensatz. Keine versteckten Kosten am Ende.",
          },
        ],
      },
      techStack: {
        title: "Mein Werkzeugkasten",
        subtitle: "Von Skizze bis Livegang — Design, Code und KI in einem Workflow",
        note: "Neben Design und Code integriere ich KI direkt in die Projekte meiner Kunden: Chatbots, Support-Assistenten und automatisierte Abläufe, die Ihnen täglich Zeit sparen.",
        groups: [
          {
            title: "Design",
            tools: [
              { name: "Figma", color: "#F04E23" },
              { name: "Adobe XD", color: "#FF61F6" },
              { name: "Photoshop", color: "#31A8FF" },
              { name: "Illustrator", color: "#FF9A00" },
              { name: "Canva", color: "#00C4CC" },
              { name: "Framer", color: "#0055FF" },
            ],
          },
          {
            title: "Entwicklung",
            tools: [
              { name: "React", color: "#61DAFB" },
              { name: "Next.js", color: "#2A2A2A" },
              { name: "Astro", color: "#FF5D01" },
              { name: "Tailwind", color: "#38BDF8" },
              { name: "TypeScript", color: "#3178C6" },
              { name: "Vite", color: "#646CFF" },
              { name: "Node.js", color: "#8BC34A" },
            ],
          },
          {
            title: "Backend & Hosting",
            tools: [
              { name: "Supabase", color: "#3ECF8E" },
              { name: "Vercel", color: "#2A2A2A" },
              { name: "Netlify", color: "#00C7B7" },
              { name: "Cloudflare", color: "#F38020" },
              { name: "Stripe", color: "#635BFF" },
              { name: "Resend", color: "#FF6B6B" },
            ],
          },
          {
            title: "KI im Projekt",
            tools: [
              { name: "ChatGPT", color: "#10A37F" },
              { name: "Claude", color: "#CC785C" },
              { name: "Cursor", color: "#2A2A2A" },
              { name: "v0", color: "#2A2A2A" },
              { name: "Midjourney", color: "#9A3B96" },
              { name: "Runway", color: "#B0A5FF" },
              { name: "Chatbots / Assistenten", color: "#F0C5A9" },
            ],
          },
        ],
      },
      testimonials: {
        title: "Was Kunden sagen",
        subtitle: "Ein paar Worte aus letzten Projekten",
        items: [
          {
            quote: "Oleh hat unsere alte Website in zwei Wochen komplett neu aufgebaut. Klar, schnell, ohne Drama.",
            author: "Anna M.",
            role: "Gründerin, Hamburg",
          },
          {
            quote: "Endlich jemand, der zuhört und nicht nur Buzzwords verkauft. Das Ergebnis spricht für sich.",
            author: "Dmitri K.",
            role: "E-Commerce, Berlin",
          },
          {
            quote: "Wir kamen mit einer Skizze auf Papier und bekamen eine Website, die unser Business wirklich abbildet.",
            author: "Lisa S.",
            role: "Studio, München",
          },
        ],
      },
      faq: {
        title: "Häufige Fragen",
        subtitle: "Kurz und ehrlich",
        items: [
          {
            q: "Wie lange dauert ein Projekt?",
            a: "Eine Landing-Page 1–2 Wochen, ein kleiner Online-Shop 3–4 Wochen. Für Größeres legen wir einen Fahrplan zusammen fest.",
          },
          {
            q: "Was kostet eine Website?",
            a: "Der Preis hängt vom Umfang und den Zielen ab. Ich bespreche jedes Projekt persönlich und stimme dann ein individuelles Angebot ab — kostenlos und unverbindlich.",
          },
          {
            q: "Arbeiten Sie mit Kunden außerhalb Deutschlands?",
            a: "Ja, gerne. Die Kommunikation läuft in Deutsch, Englisch oder Russisch, die Rechnungen in EUR.",
          },
          {
            q: "Wer pflegt die Website nach dem Launch?",
            a: "Sie können alles selbst über das Admin-Panel ändern, oder ich übernehme die Pflege für einen kleinen monatlichen Betrag.",
          },
        ],
      },
    },
    services: {
      title: "Leistungen",
      subtitle: "Was ich für Sie umsetzen kann",
      items: [
        {
          title: "Webdesign",
          description: "Moderne, responsive Websites, die Ihre Marke widerspiegeln.",
        },
        {
          title: "Webentwicklung",
          description: "React / Next.js, Headless CMS, Performance und SEO ab Tag 1.",
        },
        {
          title: "Branding & UI",
          description: "Logo, Farbwelt und UI-Komponenten – stimmig vom Pixel bis zum Print.",
        },
        {
          title: "Betreuung & Support",
          description: "Updates, Hosting, kleine Änderungen – schnell und unkompliziert.",
        },
      ],
    },
    process: {
      title: "So arbeiten wir",
      subtitle: "Vier transparente Schritte bis zum fertigen Projekt",
      steps: [
        { title: "Briefing", description: "Kurzes Gespräch, Ziele, Zielgruppe, Budget." },
        { title: "Konzept", description: "Wireframes, Moodboard, technischer Stack." },
        { title: "Umsetzung", description: "Design + Entwicklung in engen Iterationen." },
        { title: "Launch & Pflege", description: "Go-Live, Analytics, laufende Betreuung." },
      ],
    },
    cta: {
      title: "Haben Sie ein Projekt im Kopf?",
      description: "Schreiben Sie mir – ich melde mich in der Regel innerhalb von 24 Stunden.",
      button: "Nachricht schreiben",
    },
    footer: {
      tagline: "Web Studio Oleh Kalchenko",
      rights: "Alle Rechte vorbehalten.",
      quickLinks: "Navigation",
      contact: "Kontakt",
      madeIn: "Made in Deutschland — mit Liebe gemacht",
      craftedBy: "Design & Code von OK",
      tooltip: "Sag Hallo!",
    },
    badges: {
      available: "Verfügbar für Projekte",
      newBadge: "Neu",
      topBadge: "Beliebt",
      handmade: "Handgemacht",
    },
    legal: {
      impressumTitle: "Impressum",
      datenschutzTitle: "Datenschutz",
      impressumLink: "Impressum",
      datenschutzLink: "Datenschutz",
      portfolioNote: "Diese Website ist ein persönliches Portfolio. Angebote erfolgen ausschließlich auf individuelle Anfrage — kein verbindliches kommerzielles Angebot.",
      lastUpdated: "Zuletzt aktualisiert",
    },
    news: {
      title: "Neuigkeiten & Updates",
      description: "Aktuelle Nachrichten, Events und neue Projekte aus meiner Arbeit in Webentwicklung, Design und dem Einsatz von Künstlicher Intelligenz.",
      empty: "Bald erscheint hier Neues. Schauen Sie später wieder vorbei!",
    },
    about: {
      title: "Über mich",
      description: "Ein Designer mit Entwickler-Händen und einem Faible für KI — hier ein paar Worte dazu, wie ich arbeite und warum.",
      content: "Hi, ich bin Oleh — Webentwickler und Designer aus Deutschland. Seit mehr als 8 Jahren baue ich Websites, von der ersten Bleistiftskizze bis zum Go-Live. Kein Agentur-Ticket, keine Junior-Schleife: Sie sprechen direkt mit dem Menschen, der Ihr Projekt entwirft, codet und live schaltet. Neben Design und Code integriere ich KI dort, wo sie echten Mehrwert bringt — Chatbots, Support-Assistenten, automatisierte Abläufe. So entstehen Websites, die nicht nur schön aussehen, sondern Ihnen täglich Arbeit abnehmen.",
      list: [
        "8+ Jahre Praxis — vom ersten Wireframe bis zum fertigen Shop",
        "Ein Ansprechpartner für Design, Entwicklung und KI-Integration",
        "Sauberer Code auf React, Next.js, Tailwind, Node.js — ohne Overkill",
        "Ich mag die kniffligen Projekte am liebsten — Rebranding, neue Produkte, ungewohnte Ideen",
        "Remote für Kunden weltweit — deutsch, englisch, russisch, und in jeder weiteren Sprache mit KI-Unterstützung",
        "Basis in Deutschland, Rechnung in EUR, sauber und transparent",
      ],
      story: {
        title: "Meine Geschichte",
        paragraphs: [
          "Alles begann mit einem alten ThinkPad und der Neugier, wie Websites eigentlich funktionieren. Aus der Neugier wurde ein Beruf — und aus dem Beruf eine echte Leidenschaft für alles zwischen Design und Code.",
          "Heute lebe ich in Deutschland und arbeite mit Kunden aus Europa und darüber hinaus. Mein Fokus: Projekte, die nicht nur gut aussehen, sondern auch wirklich gut funktionieren — schnell, klar, menschlich.",
          "Ich glaube an kleine Iterationen, offene Kommunikation und viel Kaffee. Kein Buzzword-Bingo, keine unnötige Komplexität — nur ein klarer Plan und saubere Umsetzung.",
        ],
      },
      values: {
        title: "Meine Werte",
        subtitle: "Wofür ich stehe",
        items: [
          { title: "Ehrlichkeit", description: "Klare Preise, keine versteckten Überraschungen." },
          { title: "Geschwindigkeit", description: "Antwort in 24 Std., erste Ergebnisse in wenigen Tagen." },
          { title: "Qualität", description: "Sauberer Code, moderne Standards, gute Performance." },
          { title: "Menschlichkeit", description: "Ihr Projekt bekommt meine volle Aufmerksamkeit." },
        ],
      },
      funFacts: {
        title: "Kleine Fakten",
        items: [
          "☕ Mehr als 3 Kaffees pro Tag",
          "🇩🇪 Wohnt in Deutschland",
          "💼 8+ Jahre Erfahrung",
          "🌍 Kunden in 12+ Ländern",
          "🎨 Liebt Aquarell & Skizzen",
          "🚴 Radelt zur Inspiration",
        ],
      },
      stack: {
        title: "Mein Tech-Stack",
        subtitle: "Werkzeuge, mit denen ich täglich arbeite",
      },
    },

    portfolio: {
      title: "Portfolio",
      subtitle:
        "Eine Auswahl meiner kreativen Arbeiten – von Webdesign bis Branding. Jedes Projekt erzählt eine einzigartige Geschichte.",
      loading: "Projekte werden geladen...",
      error: "Fehler beim Laden der Projekte",
      empty: "Noch keine Projekte vorhanden",
      viewMore: "Mehr anzeigen",
      projectDescription: "Projektbeschreibung",
      readMore: "Mehr lesen",
    },

    contact: {
      title: "Kontakt",
      subtitle:
        "Haben Sie ein Projekt im Kopf? Lassen Sie uns darüber sprechen! Ihre Nachricht wird direkt an mich weitergeleitet.",
      letsTalk: "Lass uns sprechen!",
      responseTime:
        "Antwort in der Regel innerhalb von 24 Stunden. Für dringende Anfragen nutzen Sie gerne Telegram.",
      form: {
        name: "Name",
        email: "E-Mail",
        subject: "Betreff",
        message: "Nachricht",
        namePlaceholder: "Ihr vollständiger Name",
        emailPlaceholder: "ihre.email@beispiel.de",
        subjectPlaceholder: "Worum geht es?",
        messagePlaceholder: "Erzählen Sie mir von Ihrem Projekt...",
        sendButton: "Nachricht senden",
        sending: "Wird gesendet...",
        newMessage: "Neue Nachricht",
        errorGeneric: "Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut.",
      },
      success: {
        title: "Nachricht gesendet!",
        description:
          "Vielen Dank für Ihre Nachricht. Ich melde mich so schnell wie möglich bei Ihnen.",
      },
      info: {
        title: "So erreichen Sie mich",
        responseLabel: "Antwort",
        responseValue: "in der Regel innerhalb von 24 Stunden",
        timezoneLabel: "Zeitzone",
        timezoneValue: "Berlin (MEZ / UTC+1)",
        languagesLabel: "Sprachen",
        languagesValue: "Deutsch · Englisch · Russisch · mit KI-Unterstützung in jeder Sprache",
        locationLabel: "Standort",
        locationValue: "Deutschland — arbeite weltweit remote",
      },
      faq: {
        title: "Oft gefragt",
        items: [
          { q: "Wie schnell bekomme ich Antwort?", a: "In der Regel innerhalb von 24 Stunden, werktags meist am selben Tag." },
          { q: "Muss ich vorher eine Aufgabenstellung schreiben?", a: "Nein, das erarbeiten wir im ersten Gespräch gemeinsam." },
          { q: "Wie läuft die Abrechnung?", a: "Festpreis pro Projekt oder transparenter Stundensatz. 30 % bei Start, 70 % bei Abnahme." },
          { q: "Kann ich Texte und Fotos später ändern?", a: "Ja — jede Seite kommt mit einem einfachen Admin-Panel, über das Sie alles selbst pflegen können." },
        ],
      },
    },
  },

  ru: {
    nav: {
      home: "Главная",
      portfolio: "Портфолио",
      news: "Новости",
      about: "Обо мне",
      contact: "Контакты",
    },
    home: {
      studioLabel: "Веб-Студия",
      slogan: "Креативные решения для вашего цифрового бизнеса",
      description:
        "Превращаю ваши идеи в уникальные цифровые решения. От веб-дизайна до брендинга – объединяю креативность и технологии.",
      telegramButton: "Связаться в Telegram",
      scrollHint: "прокрутить",
      whyMe: {
        title: "Почему со мной?",
        subtitle: "Три вещи, которые я делаю иначе",
        items: [
          {
            title: "Быстро и прозрачно",
            description: "Отвечаю в течение 24 часов. Вы всегда видите, над чем я работаю и что дальше.",
          },
          {
            title: "Личный подход",
            description: "Без тикет-систем и junior-команд. Вы общаетесь напрямую с дизайнером и разработчиком.",
          },
          {
            title: "Честные цены",
            description: "Фикс за проект или чёткая почасовая ставка. Никаких «внезапных» счетов в конце.",
          },
        ],
      },
      techStack: {
        title: "Мой инструментарий",
        subtitle: "От наброска до запуска — дизайн, код и ИИ в одном процессе",
        note: "Помимо дизайна и разработки я встраиваю ИИ прямо в проекты клиентов: чат-боты, ассистенты поддержки и автоматизация задач, которые экономят время каждый день.",
        groups: [
          {
            title: "Дизайн",
            tools: [
              { name: "Figma", color: "#F04E23" },
              { name: "Adobe XD", color: "#FF61F6" },
              { name: "Photoshop", color: "#31A8FF" },
              { name: "Illustrator", color: "#FF9A00" },
              { name: "Canva", color: "#00C4CC" },
              { name: "Framer", color: "#0055FF" },
            ],
          },
          {
            title: "Разработка",
            tools: [
              { name: "React", color: "#61DAFB" },
              { name: "Next.js", color: "#2A2A2A" },
              { name: "Astro", color: "#FF5D01" },
              { name: "Tailwind", color: "#38BDF8" },
              { name: "TypeScript", color: "#3178C6" },
              { name: "Vite", color: "#646CFF" },
              { name: "Node.js", color: "#8BC34A" },
            ],
          },
          {
            title: "Бэкенд и доставка",
            tools: [
              { name: "Supabase", color: "#3ECF8E" },
              { name: "Vercel", color: "#2A2A2A" },
              { name: "Netlify", color: "#00C7B7" },
              { name: "Cloudflare", color: "#F38020" },
              { name: "Stripe", color: "#635BFF" },
              { name: "Resend", color: "#FF6B6B" },
            ],
          },
          {
            title: "ИИ в проектах",
            tools: [
              { name: "ChatGPT", color: "#10A37F" },
              { name: "Claude", color: "#CC785C" },
              { name: "Cursor", color: "#2A2A2A" },
              { name: "v0", color: "#2A2A2A" },
              { name: "Midjourney", color: "#9A3B96" },
              { name: "Runway", color: "#B0A5FF" },
              { name: "Чат-боты / Ассистенты", color: "#F0C5A9" },
            ],
          },
        ],
      },
      testimonials: {
        title: "Что говорят клиенты",
        subtitle: "Несколько слов из недавних проектов",
        items: [
          {
            quote: "Олег переделал нам сайт за две недели. Чётко, быстро, без драмы.",
            author: "Анна М.",
            role: "Основатель, Гамбург",
          },
          {
            quote: "Наконец человек, который слушает, а не продаёт баззворды. Результат говорит сам за себя.",
            author: "Дмитрий К.",
            role: "E-Commerce, Берлин",
          },
          {
            quote: "Мы пришли с наброском на бумаге и получили сайт, который реально отражает наш бизнес.",
            author: "Лиза С.",
            role: "Студия, Мюнхен",
          },
        ],
      },
      faq: {
        title: "Частые вопросы",
        subtitle: "Коротко и честно",
        items: [
          {
            q: "Сколько длится проект?",
            a: "Лендинг — 1–2 недели, небольшой онлайн-магазин — 3–4 недели. Для более крупного сразу составляем план по этапам.",
          },
          {
            q: "Сколько стоит сайт?",
            a: "Цена зависит от задач и объёма. Я обсуждаю каждый проект лично и потом делаю индивидуальное предложение — бесплатно и без обязательств.",
          },
          {
            q: "Работаете с клиентами не из Германии?",
            a: "Да, с удовольствием. Общаюсь на немецком, английском и русском, оплата в EUR.",
          },
          {
            q: "Кто будет поддерживать сайт после запуска?",
            a: "Вы можете всё менять сами через админ-панель, либо я беру поддержку на небольшой ежемесячный абонемент.",
          },
        ],
      },
    },
    services: {
      title: "Услуги",
      subtitle: "Что я могу сделать для вас",
      items: [
        {
          title: "Веб-дизайн",
          description: "Современные адаптивные сайты, которые отражают вашу марку.",
        },
        {
          title: "Веб-разработка",
          description: "React / Next.js, headless CMS, производительность и SEO с первого дня.",
        },
        {
          title: "Брендинг и UI",
          description: "Логотип, цветовая палитра и UI-компоненты — последовательно от пикселя до печати.",
        },
        {
          title: "Поддержка",
          description: "Обновления, хостинг, небольшие правки — быстро и без бюрократии.",
        },
      ],
    },
    process: {
      title: "Как мы работаем",
      subtitle: "Четыре прозрачных шага до готового проекта",
      steps: [
        { title: "Бриф", description: "Короткий созвон, цели, аудитория, бюджет." },
        { title: "Концепция", description: "Вайрфреймы, мудборд, технический стек." },
        { title: "Реализация", description: "Дизайн + разработка в коротких итерациях." },
        { title: "Запуск и поддержка", description: "Деплой, аналитика, сопровождение." },
      ],
    },
    cta: {
      title: "Есть проект в голове?",
      description: "Напишите мне — обычно отвечаю в течение 24 часов.",
      button: "Написать сообщение",
    },
    footer: {
      tagline: "Веб-Студия Олега Кальченко",
      rights: "Все права защищены.",
      quickLinks: "Навигация",
      contact: "Контакты",
      madeIn: "Сделано в Deutschland — с любовью",
      craftedBy: "Дизайн и код от OK",
      tooltip: "Напишите мне!",
    },
    badges: {
      available: "Открыт для проектов",
      newBadge: "Новое",
      topBadge: "Популярное",
      handmade: "Ручная работа",
    },
    legal: {
      impressumTitle: "Impressum",
      datenschutzTitle: "Политика конфиденциальности",
      impressumLink: "Impressum",
      datenschutzLink: "Конфиденциальность",
      portfolioNote: "Этот сайт — личное портфолио. Любые предложения формируются индивидуально по запросу — публичной офертой это не является.",
      lastUpdated: "Последнее обновление",
    },
    about: {
      title: "Обо мне",
      description: "Дизайнер с руками разработчика и любовью к ИИ — несколько слов о том, как я работаю и почему.",
      content: "Привет, я Олег — веб-разработчик и дизайнер из Германии. Больше 8 лет собираю сайты от первого карандашного скетча до запуска в продакшен. Никаких агентств-воронок и junior-подрядчиков — вы общаетесь с человеком, который придумывает, кодит и запускает проект лично. Помимо дизайна и кода встраиваю ИИ там, где он даёт реальный толк: чат-боты, ассистенты поддержки, автоматизация рутины. Получаются сайты, которые не просто красиво выглядят, а каждый день снимают с вас часть работы.",
      list: [
        "8+ лет практики — от первого wireframe до готового магазина",
        "Один человек отвечает за дизайн, код и внедрение ИИ — без посредников",
        "Чистый код на React, Next.js, Tailwind, Node.js — без лишнего",
        "Люблю непричёсанные задачи: ребрендинги, новые продукты, непривычные идеи",
        "Удалённо по всему миру — на немецком, английском, русском, остальные языки — через ИИ-переводчик",
        "База в Германии, счета в EUR, всё прозрачно и по-немецки аккуратно",
      ],
      story: {
        title: "Моя история",
        paragraphs: [
          "Всё началось со старенького ThinkPad и любопытства «а как вообще работают сайты?». Любопытство переросло в профессию, а профессия — в настоящую страсть ко всему, что между дизайном и кодом.",
          "Сейчас я живу в Германии и работаю с клиентами из Европы и не только. Фокус — на проектах, которые не просто красиво выглядят, а действительно хорошо работают: быстро, понятно, по-человечески.",
          "Я верю в короткие итерации, открытую коммуникацию и много кофе. Никаких баззвордов и лишней сложности — только чёткий план и аккуратная реализация.",
        ],
      },
      values: {
        title: "Мои принципы",
        subtitle: "За что я отвечаю",
        items: [
          { title: "Честность", description: "Понятные цены и никаких спрятанных сюрпризов." },
          { title: "Скорость", description: "Ответ в течение 24 ч, первые результаты — за несколько дней." },
          { title: "Качество", description: "Чистый код, современные стандарты, быстрая загрузка." },
          { title: "Человечность", description: "Ваш проект получает всё моё внимание." },
        ],
      },
      funFacts: {
        title: "Немного обо мне",
        items: [
          "☕ 3+ кофе в день",
          "🇩🇪 Живу в Германии",
          "💼 8+ лет опыта",
          "🌍 Клиенты в 12+ странах",
          "🎨 Обожаю акварель и скетчи",
          "🚴 Катаюсь на велике для вдохновения",
        ],
      },
      stack: {
        title: "Мой стек",
        subtitle: "Инструменты, с которыми работаю каждый день",
      },
    },
    news: {
      title: "Новости и обновления",
      description: "Здесь публикуются свежие новости, события и новые проекты из мира веб-разработки, дизайна и искусственного интеллекта.",
      empty: "Скоро здесь появятся новости. Загляните позже!",
    },

    portfolio: {
      title: "Портфолио",
      subtitle:
        "Подборка моих творческих работ — от веб-дизайна до брендинга. Каждый проект рассказывает уникальную историю.",
      loading: "Загружаем проекты...",
      error: "Ошибка загрузки проектов",
      empty: "Пока нет проектов",
      viewMore: "Подробнее",
      projectDescription: "Описание проекта",
      readMore: "Читать полностью",
    },

    contact: {
      title: "Контакты",
      subtitle:
        "Есть проект в голове? Давайте обсудим! Ваше сообщение будет отправлено прямо мне.",
      letsTalk: "Давайте поговорим!",
      responseTime:
        "Ответ обычно в течение 24 часов. Для срочных вопросов используйте Telegram.",
      form: {
        name: "Имя",
        email: "E-Mail",
        subject: "Тема",
        message: "Сообщение",
        namePlaceholder: "Ваше полное имя",
        emailPlaceholder: "ваш.email@example.com",
        subjectPlaceholder: "О чём речь?",
        messagePlaceholder: "Расскажите мне о вашем проекте...",
        sendButton: "Отправить сообщение",
        sending: "Отправляем...",
        newMessage: "Новое сообщение",
        errorGeneric: "Не удалось отправить сообщение. Попробуйте ещё раз.",
      },
      success: {
        title: "Сообщение отправлено!",
        description:
          "Спасибо за ваше сообщение. Я свяжусь с вами как можно скорее.",
      },
      info: {
        title: "Как со мной связаться",
        responseLabel: "Отвечаю",
        responseValue: "обычно в течение 24 часов",
        timezoneLabel: "Часовой пояс",
        timezoneValue: "Берлин (CET / UTC+1)",
        languagesLabel: "Языки",
        languagesValue: "Немецкий · Английский · Русский · читаю с помощью ИИ на любом языке",
        locationLabel: "Где я",
        locationValue: "Германия — работаю удалённо по всему миру",
      },
      faq: {
        title: "Часто спрашивают",
        items: [
          { q: "Как быстро вы отвечаете?", a: "Обычно в течение 24 часов, по будням — чаще всего в тот же день." },
          { q: "Нужно ли заранее писать ТЗ?", a: "Нет, вместе составим его на первой встрече." },
          { q: "Как устроена оплата?", a: "Фикс за проект или прозрачная почасовая ставка. 30 % на старте, 70 % после приёмки." },
          { q: "Смогу потом менять тексты и фото сам?", a: "Да — каждый сайт идёт с простой админкой, в которой вы всё правите сами." },
        ],
      },
    },
  },

  en: {
    nav: {
      home: "Home",
      portfolio: "Portfolio",
      news: "News",
      about: "About",
      contact: "Contact",
    },
    home: {
      studioLabel: "Web Studio",
      slogan: "Creative Solutions for Your Digital Business",
      description:
        "Transform your ideas into unique digital experiences. From web design to branding – I bring creativity and technology together.",
      telegramButton: "Contact on Telegram",
      scrollHint: "scroll",
      whyMe: {
        title: "Why work with me?",
        subtitle: "Three things I do differently",
        items: [
          {
            title: "Fast & transparent",
            description: "Reply within 24 hours. You always know what I'm working on and what comes next.",
          },
          {
            title: "Personal approach",
            description: "No ticket systems, no junior teams. You talk directly to the designer and developer.",
          },
          {
            title: "Honest pricing",
            description: "Fixed price per project or a clear hourly rate. No surprise invoices at the end.",
          },
        ],
      },
      techStack: {
        title: "My toolkit",
        subtitle: "From sketch to launch — design, code and AI in one workflow",
        note: "Beyond design and code I embed AI directly into client projects: chatbots, support assistants and automated workflows that save time every day.",
        groups: [
          {
            title: "Design",
            tools: [
              { name: "Figma", color: "#F04E23" },
              { name: "Adobe XD", color: "#FF61F6" },
              { name: "Photoshop", color: "#31A8FF" },
              { name: "Illustrator", color: "#FF9A00" },
              { name: "Canva", color: "#00C4CC" },
              { name: "Framer", color: "#0055FF" },
            ],
          },
          {
            title: "Development",
            tools: [
              { name: "React", color: "#61DAFB" },
              { name: "Next.js", color: "#2A2A2A" },
              { name: "Astro", color: "#FF5D01" },
              { name: "Tailwind", color: "#38BDF8" },
              { name: "TypeScript", color: "#3178C6" },
              { name: "Vite", color: "#646CFF" },
              { name: "Node.js", color: "#8BC34A" },
            ],
          },
          {
            title: "Backend & Delivery",
            tools: [
              { name: "Supabase", color: "#3ECF8E" },
              { name: "Vercel", color: "#2A2A2A" },
              { name: "Netlify", color: "#00C7B7" },
              { name: "Cloudflare", color: "#F38020" },
              { name: "Stripe", color: "#635BFF" },
              { name: "Resend", color: "#FF6B6B" },
            ],
          },
          {
            title: "AI in projects",
            tools: [
              { name: "ChatGPT", color: "#10A37F" },
              { name: "Claude", color: "#CC785C" },
              { name: "Cursor", color: "#2A2A2A" },
              { name: "v0", color: "#2A2A2A" },
              { name: "Midjourney", color: "#9A3B96" },
              { name: "Runway", color: "#B0A5FF" },
              { name: "Chatbots / Assistants", color: "#F0C5A9" },
            ],
          },
        ],
      },
      testimonials: {
        title: "What clients say",
        subtitle: "A few words from recent projects",
        items: [
          {
            quote: "Oleh rebuilt our old website in two weeks. Clear, fast, no drama.",
            author: "Anna M.",
            role: "Founder, Hamburg",
          },
          {
            quote: "Finally someone who listens instead of selling buzzwords. The result speaks for itself.",
            author: "Dmitri K.",
            role: "E-commerce, Berlin",
          },
          {
            quote: "We came in with a paper sketch and walked out with a site that actually represents our business.",
            author: "Lisa S.",
            role: "Studio, Munich",
          },
        ],
      },
      faq: {
        title: "Frequent questions",
        subtitle: "Short and honest",
        items: [
          {
            q: "How long does a project take?",
            a: "Landing pages take 1–2 weeks, a small online shop 3–4 weeks. For bigger projects we agree on a roadmap upfront.",
          },
          {
            q: "What does a website cost?",
            a: "Pricing depends on scope and goals. I discuss each project personally and then put together an individual quote — free of charge and without obligation.",
          },
          {
            q: "Do you work with clients outside Germany?",
            a: "Yes, gladly. We communicate in German, English or Russian, invoices are in EUR.",
          },
          {
            q: "Who maintains the website after launch?",
            a: "You can change everything yourself via the admin panel, or I take care of it for a small monthly retainer.",
          },
        ],
      },
    },
    services: {
      title: "Services",
      subtitle: "What I can do for you",
      items: [
        {
          title: "Web Design",
          description: "Modern, responsive websites that reflect your brand.",
        },
        {
          title: "Web Development",
          description: "React / Next.js, headless CMS, performance and SEO from day one.",
        },
        {
          title: "Branding & UI",
          description: "Logo, colours and UI components — consistent from pixel to print.",
        },
        {
          title: "Care & Support",
          description: "Updates, hosting, small changes — fast and without hassle.",
        },
      ],
    },
    process: {
      title: "How we work",
      subtitle: "Four transparent steps to the finished project",
      steps: [
        { title: "Brief", description: "Short call, goals, audience, budget." },
        { title: "Concept", description: "Wireframes, moodboard, technical stack." },
        { title: "Build", description: "Design + development in tight iterations." },
        { title: "Launch & Care", description: "Go-live, analytics, ongoing support." },
      ],
    },
    cta: {
      title: "Got a project in mind?",
      description: "Send me a message — I usually reply within 24 hours.",
      button: "Write a message",
    },
    footer: {
      tagline: "Oleh Kalchenko Web Studio",
      rights: "All rights reserved.",
      quickLinks: "Navigation",
      contact: "Contact",
      madeIn: "Made in Deutschland — crafted with love",
      craftedBy: "Design & code by OK",
      tooltip: "Say hi!",
    },
    badges: {
      available: "Available for projects",
      newBadge: "New",
      topBadge: "Popular",
      handmade: "Handmade",
    },
    legal: {
      impressumTitle: "Legal Notice (Impressum)",
      datenschutzTitle: "Privacy Policy",
      impressumLink: "Legal Notice",
      datenschutzLink: "Privacy",
      portfolioNote: "This website is a personal portfolio. Any offers are made individually on request — this is not a binding commercial offer.",
      lastUpdated: "Last updated",
    },
    about: {
      title: "About",
      description: "A designer with developer hands and a soft spot for AI — a few words on how I work and why.",
      content: "Hi, I'm Oleh — a web developer and designer based in Germany. For more than 8 years I've been building websites end-to-end, from the first pencil sketch to the production launch. No agency funnel, no junior hand-off: you talk to the person who designs, codes and ships your project. Next to design and code I embed AI where it actually helps — chatbots, support assistants, automated workflows — so you end up with a site that not only looks great but quietly takes a chunk of work off your plate every single day.",
      list: [
        "8+ years of hands-on practice — from the first wireframe to a finished shop",
        "One person owns design, development and AI integration — no middlemen",
        "Clean React / Next.js / Tailwind / Node.js code — no overkill",
        "I actually enjoy the tricky projects — rebrands, new products, unusual ideas",
        "Remote for clients worldwide — German, English, Russian, any other language via AI translation",
        "Based in Germany, invoicing in EUR, clean and transparent",
      ],
      story: {
        title: "My story",
        paragraphs: [
          "It all started with an old ThinkPad and the curiosity of how websites actually work. Curiosity became a profession — and the profession became a real passion for everything between design and code.",
          "Today I live in Germany and work with clients across Europe and beyond. My focus is on projects that not only look good but really work well — fast, clear, human.",
          "I believe in small iterations, open communication and lots of coffee. No buzzword bingo, no unnecessary complexity — just a clear plan and solid execution.",
        ],
      },
      values: {
        title: "My values",
        subtitle: "What I stand for",
        items: [
          { title: "Honesty", description: "Clear prices, no hidden surprises." },
          { title: "Speed", description: "Reply in 24 hours, first results in a few days." },
          { title: "Quality", description: "Clean code, modern standards, great performance." },
          { title: "Humanity", description: "Your project gets my full attention." },
        ],
      },
      funFacts: {
        title: "Little facts",
        items: [
          "☕ More than 3 coffees a day",
          "🇩🇪 Based in Germany",
          "💼 8+ years of experience",
          "🌍 Clients in 12+ countries",
          "🎨 Loves watercolour & sketching",
          "🚴 Cycles for inspiration",
        ],
      },
      stack: {
        title: "My tech stack",
        subtitle: "Tools I use every day",
      },
    },
    news: {
      title: "News & Updates",
      description: "The latest news, events and new projects from my web development, design and AI work.",
      empty: "New stories will appear here soon. Check back later!",
    },

    portfolio: {
      title: "Portfolio",
      subtitle:
        "A selection of my creative works – from web design to branding. Each project tells a unique story.",
      loading: "Loading projects...",
      error: "Error loading projects",
      empty: "No projects yet",
      viewMore: "View more",
      projectDescription: "Project Description",
      readMore: "Read more",
    },

    contact: {
      title: "Contact",
      subtitle:
        "Have a project in mind? Let's talk about it! Your message will be sent directly to me.",
      letsTalk: "Let's talk!",
      responseTime:
        "Response usually within 24 hours. For urgent inquiries, please use Telegram.",
      form: {
        name: "Name",
        email: "E-Mail",
        subject: "Subject",
        message: "Message",
        namePlaceholder: "Your full name",
        emailPlaceholder: "your.email@example.com",
        subjectPlaceholder: "What is it about?",
        messagePlaceholder: "Tell me about your project...",
        sendButton: "Send Message",
        sending: "Sending...",
        newMessage: "New Message",
        errorGeneric: "Failed to send the message. Please try again.",
      },
      success: {
        title: "Message sent!",
        description:
          "Thank you for your message. I will get back to you as soon as possible.",
      },
      info: {
        title: "How to reach me",
        responseLabel: "Response",
        responseValue: "usually within 24 hours",
        timezoneLabel: "Timezone",
        timezoneValue: "Berlin (CET / UTC+1)",
        languagesLabel: "Languages",
        languagesValue: "German · English · Russian · any other language with AI assistance",
        locationLabel: "Location",
        locationValue: "Germany — working remotely worldwide",
      },
      faq: {
        title: "Frequently asked",
        items: [
          { q: "How quickly do you reply?", a: "Usually within 24 hours, on weekdays often the same day." },
          { q: "Do I need to write a brief upfront?", a: "No — we'll put it together in our first conversation." },
          { q: "How does billing work?", a: "Fixed price per project or a clear hourly rate. 30 % upfront, 70 % on approval." },
          { q: "Can I edit texts and photos later?", a: "Yes — every site comes with a simple admin panel so you can manage everything yourself." },
        ],
      },
    },
  },
};

// Хук для получения переводов
export const useTranslation = (language = "de") => {
  const t = (key) => {
    if (!key) return "";
    const keys = key.split(".");
    let value = translations[language] || translations["de"];

    for (const k of keys) {
      if (value === undefined || value === null) return key;
      value = value[k];
    }

    return value !== undefined ? value : key;
  };

  return { t };
};
