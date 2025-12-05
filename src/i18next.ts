import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Пока заводим только небольшое количество ключей.
// Потом будем постепенно расширять этот объект.
const resources = {
    en: {
        translation: {
            // Navbar
            "nav.home": "Home",
            "nav.map": "Map",
            "nav.about": "About",

            // Home
            "home.hero.title": "Explore the world through data",
            "home.hero.subtitle":
                "This dashboard lets you explore key indicators for countries around the world.",
            "home.hero.subtitle2":
                "Each indicator shows a 20-year mini trend and a full historical chart. You can also compare two countries on the same chart.",
            "home.hero.button": "Go to map",

            "home.demo.badge": "Country demo",
            "home.demo.example": "Example view",
            "home.demo.gdp.label": "GDP per capita",
            "home.demo.gdp.trend": "(20 years)",
            "home.demo.pop.label": "Population",
            "home.demo.pop.trend": "(20 years)",
            "home.demo.footer":
                "This is a static demo card to illustrate how indicators and mini trends look on the country page.",

            "home.features.title": "What you can do",
            "home.features.map": "Interactive Map",
            "home.features.trends": "Indicator Trends",
            "home.features.compare": "Compare Countries",

            "home.features.map.desc":
                "Click on any country to open its dashboard, explore all available indicators and see real data trends.",
            "home.features.trends.desc":
                "Each indicator shows a 20-year mini trend and a full historical chart with normalized values.",
            "home.features.compare.desc":
                "Add a second country to the chart and compare long-term dynamics on any indicator.",

            "home.how.title": "How it works",

            "home.how.intro":
                "The dashboard is built around a simple flow: pick a country, explore its indicators by category, and then compare it with another country on the same chart.",
            "home.how.step1.title": "Open the map and choose a country",
            "home.how.step2.title": "Explore indicators by category",
            "home.how.step3.title": "Compare countries on the chart",

            "home.how.step1.beforeMap":
                "Go to the ",
            "home.how.step1.mapLabel":
                "Map",
            "home.how.step1.afterMap":
                " page and click on any country. This will open a dedicated dashboard for that country. There is also a complete list of countries and aggregators below the map.",
            "home.how.step2.text":
                "On the country page, indicators are grouped into categories like Economy, Demography or Environment. Each card shows the latest value and a 20-year mini trend.",
            "home.how.step3.text":
                "Use the comparison dropdown under the main chart to add a second country and see how their trajectories differ over time.",

            // About
            "about.header.label": "About this project",
            "about.header.title": "World Map Dashboard",
            "about.header.subtitle":
                "This learning project explores how to combine public data (World Bank Open Data), modern frontend tools and clean UI design into a single, interactive dashboard.",

            "about.overview.title": "Project overview",
            "about.overview.p1":
                "The main idea of this dashboard is to make global statistics more tangible. Instead of reading static tables, you can explore countries on an interactive map, open a dedicated page for each one and see how key indicators evolved over time.",
            "about.overview.p2":
                "The project intentionally focuses on a small, curated set of indicators split into categories like Economy, Demography, Quality of life and Environment. This keeps the interface readable and the charts easy to compare.",

            "about.data.title": "Data sources",
            "about.data.p1.beforeLink": "All numeric indicators are loaded from the ",
            "about.data.p1.afterLinkBeforeCode":
                ". Each indicator is identified by a stable code (for example, ",
            "about.data.p1.afterCode": " for GDP per capita).",

            "about.data.api": "World Bank Open Data API",

            "about.data.list1": "GDP per capita (current US$)",
            "about.data.list2": "Unemployment rate (% of total labor force)",
            "about.data.list3": "Total population and urban population share",
            "about.data.list4": "Life expectancy and basic education coverage",
            "about.data.list5": "Access to safe water, CO₂ emissions and energy use",

            "about.data.p2":
                "Not all indicators are available for every country and every year. When data is missing, some charts may have gaps or shorter lines – this reflects the real state of the dataset.",


            "about.loading.title": "Data loading & caching",
            "about.loading.p1":
                "Network requests are handled by React Query. Each indicator for each country is fetched only once and then cached in memory.",
            "about.loading.p2":
                "This means the first visit to a country page or a new indicator may take a couple of seconds while data is being loaded from the World Bank API. Subsequent visits reuse cached data and feel almost instant.",
            "about.loading.p3":
                "The dashboard also normalizes and sorts time series before they reach the charts. This is done in a separate utility layer so that the visual components stay as simple as possible.",

            "about.tech.title": "Tech stack",

            "about.tech.frontend": "Frontend",
            "about.tech.state": "State",
            "about.tech.data": "Data fetching",
            "about.tech.charts": "Charts",
            "about.tech.styling": "Styling",
            "about.tech.animations": "Animations",

            "about.tech.frontend.desc": "React, TypeScript, Vite",
            "about.tech.state.desc": "Redux Toolkit (selected country and shared UI state)",
            "about.tech.data.desc": "React Query (API calls & caching)",
            "about.tech.charts.desc": "Recharts with normalized time series",
            "about.tech.styling.desc": "Tailwind CSS + subtle glassmorphism",
            "about.tech.animations.desc": "Framer Motion for small UI transitions",

            "about.limit.title": "Limitations & future ideas",
            "about.limit.list1": "Data quality and freshness fully depend on the World Bank API.",
            "about.limit.list2": "Some indicators are missing for certain countries or years, which leads to gaps in the charts.",
            "about.limit.list3": "Only a small set of indicators is included to keep the UI readable.",
            "about.limit.p1":
                "As a next step, the dashboard could be extended with UN SDG indicators, more advanced comparison tools or different visual layouts (for example, regional views or thematic dashboards).",
        },
    },
    ru: {
        translation: {
            // Navbar
            "nav.home": "Главная",
            "nav.map": "Карта",
            "nav.about": "О проекте",

            // Home
            "home.hero.title": "Исследуйте мир через данные",
            "home.hero.subtitle":
                "Этот дашборд позволяет изучать ключевые показатели стран всего мира.",
            "home.hero.subtitle2":
                "Каждый индикатор показывает мини-тренд за 20 лет и полный исторический график. Можно сравнивать две страны на одном графике.",
            "home.hero.button": "Перейти к карте",

            "home.demo.badge": "Демонстрационная страна",
            "home.demo.example": "Пример вида",
            "home.demo.gdp.label": "ВВП на душу населения",
            "home.demo.gdp.trend": "(20 лет)",
            "home.demo.pop.label": "Население",
            "home.demo.pop.trend": "(20 лет)",
            "home.demo.footer":
                "Это статичная демо-карточка, показывающая, как выглядят индикаторы и мини-тренды на странице страны.",

            "home.features.title": "Возможности",
            "home.features.map": "Интерактивная карта",
            "home.features.trends": "Тренды индикаторов",
            "home.features.compare": "Сравнение стран",

            "home.features.map.desc":
                "Нажмите на любую страну, чтобы открыть её дашборд, посмотреть доступные индикаторы и реальные тренды.",
            "home.features.trends.desc":
                "Каждый индикатор показывает мини-тренд за 20 лет и полный исторический график с нормализованными данными.",
            "home.features.compare.desc":
                "Добавьте вторую страну на график и сравните долгосрочную динамику по любому индикатору.",

            "home.how.title": "Как это работает",

            "home.how.intro":
                "Дашборд построен вокруг простого сценария: выберите страну, изучите её показатели по категориям, а затем сравните с другой страной на одном графике.",
            "home.how.step1.title": "Откройте карту и выберите страну",
            "home.how.step2.title": "Изучайте индикаторы по категориям",
            "home.how.step3.title": "Сравнивайте страны на графике",

            "home.how.step1.beforeMap":
                "Перейдите на страницу «",
            "home.how.step1.mapLabel":
                "Карта",
            "home.how.step1.afterMap":
                "» и нажмите на любую страну. Откроется отдельный дашборд для этой страны. Ниже карты есть полный список стран и агрегированных регионов.",
            "home.how.step2.text":
                "На странице страны индикаторы сгруппированы по категориям, таким как Экономика, Демография и Окружающая среда. Каждая карточка показывает последнее значение и мини-тренд за 20 лет.",
            "home.how.step3.text":
                "Используйте выпадающий список сравнения под основным графиком, чтобы добавить вторую страну и увидеть, как расходятся их траектории во времени.",

            // About
            "about.header.label": "О проекте",
            "about.header.title": "World Map Dashboard",
            "about.header.subtitle":
                "Этот учебный проект показывает, как объединить публичные данные (World Bank Open Data), современные frontend-технологии и продуманный UI в единый интерактивный дашборд.",

            "about.overview.title": "Обзор проекта",
            "about.overview.p1":
                "Основная идея этого дашборда — сделать мировую статистику более наглядной. Вместо статичных таблиц вы можете исследовать страны через интерактивную карту, открывать страницу каждой страны и смотреть, как ключевые показатели менялись со временем.",
            "about.overview.p2":
                "Проект намеренно сфокусирован на небольшом, тщательно подобранном наборе индикаторов, разделённых по категориям: Экономика, Демография, Качество жизни и Окружающая среда. Это делает интерфейс понятным, а графики — легко сравнимыми.",

            "about.data.title": "Источники данных",
            "about.data.p1.beforeLink": "Все числовые индикаторы загружаются через ",
            "about.data.p1.afterLinkBeforeCode":
                ". Каждый показатель имеет стабильный код (например, ",
            "about.data.p1.afterCode": " для ВВП на душу населения).",

            "about.data.api": "World Bank Open Data API",

            "about.data.list1": "ВВП на душу населения (текущие US$)",
            "about.data.list2": "Уровень безработицы (% рабочей силы)",
            "about.data.list3": "Общая численность населения и доля городского населения",
            "about.data.list4": "Ожидаемая продолжительность жизни и охват базовым образованием",
            "about.data.list5": "Доступ к безопасной воде, выбросы CO₂ и потребление энергии",

            "about.data.p2":
                "Не все индикаторы доступны для каждой страны и каждого года. Если данных нет, на графиках могут появляться разрывы — это отражает реальное состояние базы данных.",
            "about.loading.title": "Загрузка данных и кеширование",
            "about.loading.p1":
                "Сетевые запросы обрабатываются с помощью React Query. Каждый индикатор для каждой страны запрашивается только один раз и затем кешируется в памяти.",
            "about.loading.p2":
                "Это означает, что первый переход на страницу страны или новый индикатор может занять несколько секунд, пока данные загружаются из API World Bank. Повторные обращения используют кеш и происходят почти мгновенно.",
            "about.loading.p3":
                "Дашборд также нормализует и сортирует временные ряды перед отображением на графиках. Это выполняется в отдельном утилитарном слое, чтобы визуальные компоненты оставались максимально простыми.",

            "about.tech.title": "Технологический стек",

            "about.tech.frontend": "Фронтенд",
            "about.tech.state": "Состояние",
            "about.tech.data": "Загрузка данных",
            "about.tech.charts": "Графики",
            "about.tech.styling": "Стилизация",
            "about.tech.animations": "Анимации",

            "about.tech.frontend.desc": "React, TypeScript, Vite",
            "about.tech.state.desc": "Redux Toolkit (выбор страны и общий UI-стейт)",
            "about.tech.data.desc": "React Query (запросы к API и кеширование)",
            "about.tech.charts.desc": "Recharts с нормализованными временными рядами",
            "about.tech.styling.desc": "Tailwind CSS + мягкий стекломорфизм",
            "about.tech.animations.desc": "Framer Motion для небольших UI-переходов",

            "about.limit.title": "Ограничения и будущие идеи",
            "about.limit.list1": "Качество и актуальность данных полностью зависят от API World Bank.",
            "about.limit.list2": "Некоторые индикаторы отсутствуют для отдельных стран или лет, что приводит к разрывам на графиках.",
            "about.limit.list3": "В проект включён ограниченный набор индикаторов, чтобы интерфейс оставался понятным.",
            "about.limit.p1":
                "В будущем дашборд можно расширить индикаторами ООН (SDG), более продвинутыми инструментами сравнения или альтернативными визуальными представлениями — например, региональными или тематическими панелями.",
        },
    },
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "en",           // стартовый язык
        fallbackLng: "en",   // если чего-то нет в ru — берём en
        interpolation: {
            escapeValue: false, // для React это не нужно
        },
    });

export default i18n;
