const forms = document.querySelectorAll(".contact-form");
const header = document.querySelector(".site-header");
const languageButtons = document.querySelectorAll("[data-lang]");
const languageCurrent = document.querySelector(".language-current");
const textNodes = [];

function getStoredLanguage() {
  try {
    return window.localStorage ? localStorage.getItem("plieno-kodas-lang") : null;
  } catch (error) {
    return null;
  }
}

function setStoredLanguage(lang) {
  try {
    if (window.localStorage) {
      localStorage.setItem("plieno-kodas-lang", lang);
    }
  } catch (error) {}
}

function loadLazyVideos() {
  const lazyVideos = document.querySelectorAll("video[data-src]");
  if (!lazyVideos.length) return;

  const loadVideo = (video) => {
    if (video.dataset.loaded === "true") return;

    const source = document.createElement("source");
    source.src = video.dataset.src;
    source.type = "video/mp4";
    video.appendChild(source);
    video.dataset.loaded = "true";
    video.load();

    const playPromise = video.play();
    if (playPromise) {
      playPromise.catch(() => {});
    }
  };

  if (!("IntersectionObserver" in window)) {
    lazyVideos.forEach(loadVideo);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        loadVideo(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "300px 0px" }
  );

  lazyVideos.forEach((video) => observer.observe(video));
}

function startProcessTimeline() {
  const processSection = document.querySelector(".process");
  if (!processSection) return;

  const activate = () => processSection.classList.add("is-active");

  if (!("IntersectionObserver" in window)) {
    activate();
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        activate();
        observer.unobserve(processSection);
      });
    },
    { threshold: 0.35 }
  );

  observer.observe(processSection);
}

const heroSlides = {
  lt: [
    { kicker: "Tikslūs metalo sprendimai", title: "Lazerinis pjovimas ir plieno konstrukcijos", cta: "Pateikti užklausą", href: "/pateikti-uzsakyma/" },
    { kicker: "Atlikti darbai", title: "Peržiūrėkite įgyvendintus projektus", cta: "Įgyvendinti projektai", href: "/igyvendinti-projektai/" },
  ],
  en: [
    { kicker: "Precise metal solutions", title: "Laser cutting and steel structures", cta: "Submit request", href: "/pateikti-uzsakyma/" },
    { kicker: "Completed work", title: "View completed projects", cta: "Completed projects", href: "/igyvendinti-projektai/" },
  ],
  ru: [
    { kicker: "Точные решения из металла", title: "Лазерная резка и стальные конструкции", cta: "Отправить запрос", href: "/pateikti-uzsakyma/" },
    { kicker: "Выполненные работы", title: "Посмотрите реализованные проекты", cta: "Выполненные проекты", href: "/igyvendinti-projektai/" },
  ],
};

const translations = {
  en: {
    "METALO SPRENDIMAI": "METAL SOLUTIONS",
    "Pagrindinis": "Home",
    "Apie mus": "About us",
    "Paslaugos": "Services",
    "Pateikti užsakymą": "Place an order",
    "Įgyvendinti projektai": "Completed projects",
    "Kontaktai": "Contacts",
    "Susisiekite": "Contact us",
    "Pateikti užklausą": "Submit request",
    "Mūsų": "Our",
    "paslaugos": "services",
    "Ką mes siūlome": "What we offer",
    "Angarų karkasai": "Hangar frames",
    "Metalo konstrukcijos": "Steel structures",
    "Karkasų gamyba": "Frame production",
    "Matmenys ir objektai": "Dimensions and objects",
    "Dirbame": "We work",
    "pagal jūsų projektą": "according to your project",
    "Angarai": "Hangars",
    "Stoginės": "Canopies",
    "Nestandartiniai gaminiai": "Custom products",
    "Procesas": "Process",
    "Aiški": "Clear",
    "darbo eiga": "workflow",
    "Užklausa": "Request",
    "Pasiūlymas": "Offer",
    "Gamyba": "Production",
    "Montavimas": "Installation",
    "Pristatymas klientui": "Delivery to the client",
    "Pradėkime": "Let us start",
    "nuo brėžinio arba idėjos": "from a drawing or an idea",
    "Vardas": "Name",
    "Kontaktas": "Contact",
    "Paruošti užklausą": "Send request",
    "Išsiųsti užklausą": "Send request",
    "Apie mus": "About us",
    "MB Plieno kodas": "MB Plieno kodas",
    "Vertybės": "Values",
    "Misija": "Mission",
    "Vizija": "Vision",
    "Teikiamos paslaugos": "Provided services",
    "Užsakymas": "Order",
    "Vardas arba įmonė": "Name or company",
    "Telefonas / el. paštas": "Phone / email",
    "Paslauga": "Service",
    "Objekto vieta": "Project location",
    "Matmenys ir aprašymas": "Dimensions and description",
    "Rekvizitai ir kontaktai": "Company details and contacts",
    "Parašykite mums": "Write to us",
    "Žinutė": "Message",
    "Siųsti užklausą": "Send request",
    "Telefonas: +370 626 51688": "Phone: +370 626 51688",
    "El. paštas: info@plienokodas.lt": "Email: info@plienokodas.lt",
    "Adresas: Alyvų g. 13, LT-40112 Kupiškis": "Address: Alyvų st. 13, LT-40112 Kupiškis",
    "Metalo konstrukcijos | Angarai | Montavimas": "Steel structures | Hangars | Installation",
    "Patikėkite metalo konstrukcijų darbus profesionalams.": "Entrust steel structure work to professionals.",
    "Kas mes": "Who we are",
    "Privatumo politika": "Privacy policy",
    "MB Plieno kodas": "MB Plieno kodas",
    "Adresas:": "Address:",
    "Tel.:": "Tel.:",
    "El. paštas:": "Email:",
    "Angarų karkasai": "Hangar frames",
    "Lazerinis pjovimas": "Laser cutting",
    "Suvirinimo darbai": "Welding works",
    "Lazerinis apdirbimas": "Laser processing",
    "Metalo pjovimas": "Metal cutting",
    "Plieno suvirinimas": "Steel welding",
    "TIG suvirinimas": "TIG welding",
    "MIG/MAG suvirinimas": "MIG/MAG welding",
    "Atliekame įvairius metalo suvirinimo darbus pagal brėžinius, eskizus arba individualų poreikį.": "We perform various metal welding works according to drawings, sketches or individual needs.",
    "Tikslus metalo apdirbimas lazeriu, kai svarbūs švarūs pjūviai ir matmenų tikslumas.": "Precise laser metal processing when clean cuts and dimensional accuracy matter.",
    "Metalo pjovimo darbai konstrukcijoms, ruošiniams ir nestandartiniams gaminiams.": "Metal cutting works for structures, blanks and custom products.",
    "Patikimas plieno detalių ir konstrukcinių mazgų suvirinimas.": "Reliable welding of steel parts and structural nodes.",
    "Tiksliems, estetiškiems ir kruopštumo reikalaujantiems suvirinimo darbams.": "For precise, aesthetic welding work that requires care.",
    "Efektyvus konstrukcijų ir storesnio metalo suvirinimas gamybai bei montavimui.": "Efficient welding of structures and thicker metal for production and installation.",
    "Plieniniai karkasai sandėliams, ūkiui, gamybai ir technikos laikymui. Sprendimai pagal paskirtį, matmenis ir apkrovas.": "Steel frames for warehouses, farming, production and equipment storage. Solutions are selected by purpose, dimensions and loads.",
    "Kolonos, sijos, rėmai, stoginės, laiptai, platformos ir tvirtinimo mazgai pagal projektą arba suderintą eskizą.": "Columns, beams, frames, canopies, stairs, platforms and fastening nodes according to a project or agreed sketch.",
    "Tikslus ruošinių paruošimas, suvirinimas, paviršiaus paruošimas ir kokybės patikra prieš pristatymą į objektą.": "Precise preparation, welding, surface preparation and quality checks before delivery to site.",
    "sandėliai, dirbtuvės, ūkiniai pastatai": "warehouses, workshops, farm buildings",
    "automobiliams, technikai, įrangai": "for cars, machinery and equipment",
    "rėmai, atramos, vartai, aptvarai": "frames, supports, gates and fences",
    "Aptariame poreikį, objektą, matmenis, brėžinius ir norimą terminą.": "We discuss the need, site, dimensions, drawings and desired deadline.",
    "Parenkame konstrukcinį sprendimą, medžiagas ir pateikiame sąmatą.": "We select the structural solution, materials and provide an estimate.",
    "Gaminame konstrukcijas, tikriname mazgus ir ruošiame pristatymui.": "We manufacture structures, inspect nodes and prepare for delivery.",
    "Atvykstame į objektą, sumontuojame konstrukciją ir perduodame rezultatą.": "We arrive on site, install the structure and hand over the result.",
    "Paruoštus gaminius pristatome klientui, suderiname perdavimą ir atsakome į paskutinius klausimus.": "We deliver the finished products to the client, coordinate handover and answer final questions.",
    "Parašykite, kokios konstrukcijos reikia, kokie matmenys ir kur bus objektas.": "Write what structure you need, its dimensions and where the project is located.",
    "Esame metalo konstrukcijų, angarų karkasų ir nestandartinių plieno gaminių komanda. Dirbame su aiškiu tikslu: pasiūlyti praktišką, tvirtą ir tvarkingai įgyvendintą sprendimą kiekvienam objektui.": "We are a team working with steel structures, hangar frames and custom steel products. Our goal is to deliver a practical, strong and properly executed solution for every project.",
    "Tikslumas, atsakomybė ir atviras bendravimas. Mums svarbu, kad užsakovas suprastų sprendimą, terminus ir darbų eigą dar prieš pradedant gamybą.": "Precision, responsibility and clear communication. We make sure the client understands the solution, timing and workflow before production begins.",
    "Kurti metalo konstrukcijas, kurios patikimai tarnauja kasdienėje veikloje ir padeda greičiau įgyvendinti statybos, gamybos ar ūkio projektus.": "To create steel structures that serve reliably in everyday work and help construction, production and farming projects move faster.",
    "Tapti patikimu partneriu įmonėms ir privatiems klientams, kuriems reikia kokybiškų, aiškių ir ilgaamžių plieno sprendimų.": "To become a reliable partner for businesses and private clients who need clear, durable and high-quality steel solutions.",
    "Gaminame ir montuojame konstrukcijas pagal projektą, eskizą arba objekto poreikį. Žemiau pateiktas pagrindinis darbų sąrašas.": "We manufacture and install structures according to a project, sketch or site requirement. Below is the main list of works.",
    "Sandėlių ir dirbtuvių karkasai": "Warehouse and workshop frames",
    "Ūkinių pastatų konstrukcijos": "Farm building structures",
    "Technikos laikymo angarai": "Equipment storage hangars",
    "Kolonos, sijos ir rėmai": "Columns, beams and frames",
    "Laiptai, aikštelės ir platformos": "Stairs, landings and platforms",
    "Stoginės ir atraminiai mazgai": "Canopies and support nodes",
    "Vartų ir aptvarų rėmai": "Gate and fence frames",
    "Atramos, laikikliai, kronšteinai": "Supports, holders and brackets",
    "Gamyba pagal individualius matmenis": "Production by custom dimensions",
    "Suvirinimas": "Welding",
    "Plieno ruošinių suvirinimas": "Steel part welding",
    "Konstrukcinių mazgų paruošimas": "Structural node preparation",
    "Kokybės patikra prieš montavimą": "Quality check before installation",
    "Konstrukcijų pristatymas į objektą": "Delivery of structures to site",
    "Montavimo darbai vietoje": "On-site installation work",
    "Galutinis suderinimas su užsakovu": "Final coordination with the client",
    "Konsultacija": "Consultation",
    "Sprendimo parinkimas": "Solution selection",
    "Medžiagų ir mazgų aptarimas": "Discussion of materials and nodes",
    "Preliminarios sąmatos paruošimas": "Preliminary estimate preparation",
    "Užpildykite formą: kuo daugiau matmenų, objekto informacijos ir pageidavimų pateiksite, tuo tiksliau galėsime paruošti pasiūlymą.": "Fill in the form: the more dimensions, site details and requirements you provide, the more accurately we can prepare an offer.",
    "Angaro karkasas": "Hangar frame",
    "Metalo konstrukcija": "Steel structure",
    "Nestandartinis gaminys": "Custom product",
    "Kita": "Other",
    "Projektai": "Projects",
    "Čia galima talpinti atliktų darbų galeriją, objektų aprašymus ir trumpus techninius duomenis. Kol nėra nuotraukų, pateikiami pavyzdiniai projektų tipai.": "This page can contain a gallery of completed work, project descriptions and short technical details. Until photos are added, sample project types are shown.",
    "Sandėlio karkasas": "Warehouse frame",
    "Plieninis karkasas sandėliavimo patalpai su paruoštais tvirtinimo mazgais ir montavimu objekte.": "Steel frame for a warehouse with prepared fastening nodes and on-site installation.",
    "Ūkinė stoginė": "Farm canopy",
    "Stoginės konstrukcija technikai ir įrangai laikyti, pritaikyta kasdieniam naudojimui.": "Canopy structure for storing machinery and equipment, adapted for daily use.",
    "Gamybinė platforma": "Production platform",
    "Metalo platforma su laiptų konstrukcija ir saugiais atraminiais elementais.": "Metal platform with stair structure and safe support elements.",
    "Susisiekite dėl metalo konstrukcijų, angarų, montavimo darbų ar nestandartinių gaminių.": "Contact us about steel structures, hangars, installation work or custom products.",
    "Trumpai aprašykite poreikį, o mes atsakysime dėl galimo sprendimo, terminų ir kainos gairių.": "Briefly describe your need and we will respond about a possible solution, timing and price range.",
    "10+ metų patirtis": "10+ years experience",
    "Profesionalumas": "Professionalism",
    "Aiškūs terminai": "Clear deadlines",
    "Tvirti sprendimai": "Strong solutions",
    "Metalo konstrukcijų gamyba ir montavimas įvairiems objektams.": "Manufacturing and installation of steel structures for various projects.",
    "Operatyvumas": "Responsiveness",
    "Aiški darbų eiga, suderinti terminai ir greitas reagavimas.": "Clear workflow, agreed deadlines and quick response.",
    "Lankstumas": "Flexibility",
    "Sprendimai pagal brėžinius, eskizus arba individualų poreikį.": "Solutions based on drawings, sketches or individual needs.",
    "Kokybės kontrolė": "Quality control",
    "Tvarkingas paruošimas, tikslūs mazgai ir patikras praėję gaminiai.": "Clean preparation, precise nodes and inspected products.",
  },
  ru: {
    "METALO SPRENDIMAI": "РЕШЕНИЯ ИЗ МЕТАЛЛА",
    "Pagrindinis": "Главная",
    "Apie mus": "О нас",
    "Paslaugos": "Услуги",
    "Pateikti užsakymą": "Оформить заказ",
    "Įgyvendinti projektai": "Выполненные проекты",
    "Kontaktai": "Контакты",
    "Susisiekite": "Связаться",
    "Pateikti užklausą": "Отправить запрос",
    "Mūsų": "Наши",
    "paslaugos": "услуги",
    "Ką mes siūlome": "Что мы предлагаем",
    "Angarų karkasai": "Каркасы ангаров",
    "Metalo konstrukcijos": "Металлоконструкции",
    "Karkasų gamyba": "Изготовление каркасов",
    "Matmenys ir objektai": "Размеры и объекты",
    "Dirbame": "Работаем",
    "pagal jūsų projektą": "по вашему проекту",
    "Angarai": "Ангары",
    "Stoginės": "Навесы",
    "Nestandartiniai gaminiai": "Нестандартные изделия",
    "Procesas": "Процесс",
    "Aiški": "Понятный",
    "darbo eiga": "ход работ",
    "Užklausa": "Запрос",
    "Pasiūlymas": "Предложение",
    "Gamyba": "Производство",
    "Montavimas": "Монтаж",
    "Pristatymas klientui": "Доставка клиенту",
    "Pradėkime": "Начнем",
    "nuo brėžinio arba idėjos": "с чертежа или идеи",
    "Vardas": "Имя",
    "Kontaktas": "Контакт",
    "Paruošti užklausą": "Отправить запрос",
    "Išsiųsti užklausą": "Отправить запрос",
    "MB Plieno kodas": "MB Plieno kodas",
    "Vertybės": "Ценности",
    "Misija": "Миссия",
    "Vizija": "Видение",
    "Teikiamos paslaugos": "Предоставляемые услуги",
    "Užsakymas": "Заказ",
    "Vardas arba įmonė": "Имя или компания",
    "Telefonas / el. paštas": "Телефон / email",
    "Paslauga": "Услуга",
    "Objekto vieta": "Место объекта",
    "Matmenys ir aprašymas": "Размеры и описание",
    "Rekvizitai ir kontaktai": "Реквизиты и контакты",
    "Parašykite mums": "Напишите нам",
    "Žinutė": "Сообщение",
    "Siųsti užklausą": "Отправить запрос",
    "Telefonas: +370 626 51688": "Телефон: +370 626 51688",
    "El. paštas: info@plienokodas.lt": "Email: info@plienokodas.lt",
    "Adresas: Alyvų g. 13, LT-40112 Kupiškis": "Адрес: Alyvų g. 13, LT-40112 Kupiškis",
    "Metalo konstrukcijos | Angarai | Montavimas": "Металлоконструкции | Ангары | Монтаж",
    "Patikėkite metalo konstrukcijų darbus profesionalams.": "Доверьте работы с металлоконструкциями профессионалам.",
    "Kas mes": "Кто мы",
    "Privatumo politika": "Политика конфиденциальности",
    "MB Plieno kodas": "MB Plieno kodas",
    "Adresas:": "Адрес:",
    "Tel.:": "Тел.:",
    "El. paštas:": "Эл. почта:",
    "Angarų karkasai": "Каркасы ангаров",
    "Lazerinis pjovimas": "Лазерная резка",
    "Suvirinimo darbai": "Сварочные работы",
    "Lazerinis apdirbimas": "Лазерная обработка",
    "Metalo pjovimas": "Резка металла",
    "Plieno suvirinimas": "Сварка стали",
    "TIG suvirinimas": "TIG сварка",
    "MIG/MAG suvirinimas": "MIG/MAG сварка",
    "Atliekame įvairius metalo suvirinimo darbus pagal brėžinius, eskizus arba individualų poreikį.": "Выполняем различные сварочные работы по чертежам, эскизам или индивидуальной потребности.",
    "Tikslus metalo apdirbimas lazeriu, kai svarbūs švarūs pjūviai ir matmenų tikslumas.": "Точная лазерная обработка металла, когда важны чистый рез и точные размеры.",
    "Metalo pjovimo darbai konstrukcijoms, ruošiniams ir nestandartiniams gaminiams.": "Резка металла для конструкций, заготовок и нестандартных изделий.",
    "Patikimas plieno detalių ir konstrukcinių mazgų suvirinimas.": "Надежная сварка стальных деталей и конструктивных узлов.",
    "Tiksliems, estetiškiems ir kruopštumo reikalaujantiems suvirinimo darbams.": "Для точных, аккуратных и эстетичных сварочных работ.",
    "Efektyvus konstrukcijų ir storesnio metalo suvirinimas gamybai bei montavimui.": "Эффективная сварка конструкций и более толстого металла для производства и монтажа.",
    "Plieniniai karkasai sandėliams, ūkiui, gamybai ir technikos laikymui. Sprendimai pagal paskirtį, matmenis ir apkrovas.": "Стальные каркасы для складов, хозяйства, производства и хранения техники. Решения подбираются по назначению, размерам и нагрузкам.",
    "Kolonos, sijos, rėmai, stoginės, laiptai, platformos ir tvirtinimo mazgai pagal projektą arba suderintą eskizą.": "Колонны, балки, рамы, навесы, лестницы, платформы и узлы крепления по проекту или согласованному эскизу.",
    "Tikslus ruošinių paruošimas, suvirinimas, paviršiaus paruošimas ir kokybės patikra prieš pristatymą į objektą.": "Точная подготовка заготовок, сварка, подготовка поверхности и проверка качества перед доставкой на объект.",
    "sandėliai, dirbtuvės, ūkiniai pastatai": "склады, мастерские, хозяйственные здания",
    "automobiliams, technikai, įrangai": "для автомобилей, техники и оборудования",
    "rėmai, atramos, vartai, aptvarai": "рамы, опоры, ворота и ограждения",
    "Aptariame poreikį, objektą, matmenis, brėžinius ir norimą terminą.": "Обсуждаем потребность, объект, размеры, чертежи и желаемый срок.",
    "Parenkame konstrukcinį sprendimą, medžiagas ir pateikiame sąmatą.": "Подбираем конструктивное решение, материалы и предоставляем смету.",
    "Gaminame konstrukcijas, tikriname mazgus ir ruošiame pristatymui.": "Изготавливаем конструкции, проверяем узлы и готовим к доставке.",
    "Atvykstame į objektą, sumontuojame konstrukciją ir perduodame rezultatą.": "Приезжаем на объект, монтируем конструкцию и передаем результат.",
    "Paruoštus gaminius pristatome klientui, suderiname perdavimą ir atsakome į paskutinius klausimus.": "Доставляем готовые изделия клиенту, согласовываем передачу и отвечаем на финальные вопросы.",
    "Parašykite, kokios konstrukcijos reikia, kokie matmenys ir kur bus objektas.": "Напишите, какая конструкция нужна, ее размеры и где находится объект.",
    "Esame metalo konstrukcijų, angarų karkasų ir nestandartinių plieno gaminių komanda. Dirbame su aiškiu tikslu: pasiūlyti praktišką, tvirtą ir tvarkingai įgyvendintą sprendimą kiekvienam objektui.": "Мы команда по металлоконструкциям, каркасам ангаров и нестандартным изделиям из стали. Наша цель — практичное, прочное и аккуратно реализованное решение для каждого объекта.",
    "Tikslumas, atsakomybė ir atviras bendravimas. Mums svarbu, kad užsakovas suprastų sprendimą, terminus ir darbų eigą dar prieš pradedant gamybą.": "Точность, ответственность и открытое общение. Нам важно, чтобы заказчик понимал решение, сроки и ход работ до начала производства.",
    "Kurti metalo konstrukcijas, kurios patikimai tarnauja kasdienėje veikloje ir padeda greičiau įgyvendinti statybos, gamybos ar ūkio projektus.": "Создавать металлоконструкции, которые надежно служат в повседневной работе и помогают быстрее реализовывать строительные, производственные и хозяйственные проекты.",
    "Tapti patikimu partneriu įmonėms ir privatiems klientams, kuriems reikia kokybiškų, aiškių ir ilgaamžių plieno sprendimų.": "Стать надежным партнером для компаний и частных клиентов, которым нужны качественные, понятные и долговечные решения из стали.",
    "Gaminame ir montuojame konstrukcijas pagal projektą, eskizą arba objekto poreikį. Žemiau pateiktas pagrindinis darbų sąrašas.": "Изготавливаем и монтируем конструкции по проекту, эскизу или потребности объекта. Ниже приведен основной список работ.",
    "Sandėlių ir dirbtuvių karkasai": "Каркасы складов и мастерских",
    "Ūkinių pastatų konstrukcijos": "Конструкции хозяйственных зданий",
    "Technikos laikymo angarai": "Ангары для хранения техники",
    "Kolonos, sijos ir rėmai": "Колонны, балки и рамы",
    "Laiptai, aikštelės ir platformos": "Лестницы, площадки и платформы",
    "Stoginės ir atraminiai mazgai": "Навесы и опорные узлы",
    "Vartų ir aptvarų rėmai": "Рамы ворот и ограждений",
    "Atramos, laikikliai, kronšteinai": "Опоры, держатели и кронштейны",
    "Gamyba pagal individualius matmenis": "Изготовление по индивидуальным размерам",
    "Suvirinimas": "Сварка",
    "Plieno ruošinių suvirinimas": "Сварка стальных заготовок",
    "Konstrukcinių mazgų paruošimas": "Подготовка конструктивных узлов",
    "Kokybės patikra prieš montavimą": "Проверка качества перед монтажом",
    "Konstrukcijų pristatymas į objektą": "Доставка конструкций на объект",
    "Montavimo darbai vietoje": "Монтажные работы на месте",
    "Galutinis suderinimas su užsakovu": "Финальное согласование с заказчиком",
    "Konsultacija": "Консультация",
    "Sprendimo parinkimas": "Подбор решения",
    "Medžiagų ir mazgų aptarimas": "Обсуждение материалов и узлов",
    "Preliminarios sąmatos paruošimas": "Подготовка предварительной сметы",
    "Užpildykite formą: kuo daugiau matmenų, objekto informacijos ir pageidavimų pateiksite, tuo tiksliau galėsime paruošti pasiūlymą.": "Заполните форму: чем больше размеров, данных объекта и пожеланий вы укажете, тем точнее мы подготовим предложение.",
    "Angaro karkasas": "Каркас ангара",
    "Metalo konstrukcija": "Металлоконструкция",
    "Nestandartinis gaminys": "Нестандартное изделие",
    "Kita": "Другое",
    "Projektai": "Проекты",
    "Čia galima talpinti atliktų darbų galeriją, objektų aprašymus ir trumpus techninius duomenis. Kol nėra nuotraukų, pateikiami pavyzdiniai projektų tipai.": "Здесь можно разместить галерею выполненных работ, описания объектов и краткие технические данные. Пока фотографий нет, показаны примерные типы проектов.",
    "Sandėlio karkasas": "Каркас склада",
    "Plieninis karkasas sandėliavimo patalpai su paruoštais tvirtinimo mazgais ir montavimu objekte.": "Стальной каркас для складского помещения с подготовленными узлами крепления и монтажом на объекте.",
    "Ūkinė stoginė": "Хозяйственный навес",
    "Stoginės konstrukcija technikai ir įrangai laikyti, pritaikyta kasdieniam naudojimui.": "Конструкция навеса для хранения техники и оборудования, адаптированная для ежедневного использования.",
    "Gamybinė platforma": "Производственная платформа",
    "Metalo platforma su laiptų konstrukcija ir saugiais atraminiais elementais.": "Металлическая платформа с лестничной конструкцией и безопасными опорными элементами.",
    "Susisiekite dėl metalo konstrukcijų, angarų, montavimo darbų ar nestandartinių gaminių.": "Свяжитесь с нами по вопросам металлоконструкций, ангаров, монтажа или нестандартных изделий.",
    "Trumpai aprašykite poreikį, o mes atsakysime dėl galimo sprendimo, terminų ir kainos gairių.": "Кратко опишите потребность, и мы ответим по возможному решению, срокам и ориентиру цены.",
    "10+ metų patirtis": "10+ лет опыта",
    "Profesionalumas": "Профессионализм",
    "Aiškūs terminai": "Понятные сроки",
    "Tvirti sprendimai": "Прочные решения",
    "Metalo konstrukcijų gamyba ir montavimas įvairiems objektams.": "Изготовление и монтаж металлоконструкций для разных объектов.",
    "Operatyvumas": "Оперативность",
    "Aiški darbų eiga, suderinti terminai ir greitas reagavimas.": "Понятный ход работ, согласованные сроки и быстрая реакция.",
    "Lankstumas": "Гибкость",
    "Sprendimai pagal brėžinius, eskizus arba individualų poreikį.": "Решения по чертежам, эскизам или индивидуальной потребности.",
    "Kokybės kontrolė": "Контроль качества",
    "Tvarkingas paruošimas, tikslūs mazgai ir patikras praėję gaminiai.": "Аккуратная подготовка, точные узлы и проверенные изделия.",
  },
};

const placeholderTranslations = {
  en: {
    "Jūsų vardas": "Your name",
    "Telefonas arba el. paštas": "Phone or email",
    "Trumpai aprašykite idėją": "Briefly describe the idea",
    "Jūsų vardas arba įmonė": "Your name or company",
    "+370 ... arba el. paštas": "+370 ... or email",
    "Miestas arba adresas": "City or address",
    "Plotis, ilgis, aukštis, paskirtis, brėžiniai ar papildomi pageidavimai": "Width, length, height, purpose, drawings or extra requirements",
    "Kuo galime padėti?": "How can we help?",
  },
  ru: {
    "Jūsų vardas": "Ваше имя",
    "Telefonas arba el. paštas": "Телефон или email",
    "Trumpai aprašykite idėją": "Кратко опишите идею",
    "Jūsų vardas arba įmonė": "Ваше имя или компания",
    "+370 ... arba el. paštas": "+370 ... или email",
    "Miestas arba adresas": "Город или адрес",
    "Plotis, ilgis, aukštis, paskirtis, brėžiniai ar papildomi pageidavimai": "Ширина, длина, высота, назначение, чертежи или пожелания",
    "Kuo galime padėti?": "Чем можем помочь?",
  },
};

let currentSlide = 0;

function collectTextNodes(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.textContent.trim()) return NodeFilter.FILTER_REJECT;
      if (node.parentElement.closest("script, style, .hero-rotator-kicker, .hero-rotator-text")) {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  while (walker.nextNode()) {
    const node = walker.currentNode;
    textNodes.push({ node, original: node.textContent });
  }
}

function translateText(original, lang) {
  if (lang === "lt") return original;
  const trimmed = original.trim();
  const translated = translations[lang] ? translations[lang][trimmed] : null;
  if (!translated) return original;
  return original.replace(trimmed, translated);
}

function applyLanguage(lang) {
  document.documentElement.lang = lang;
  setStoredLanguage(lang);

  textNodes.forEach(({ node, original }) => {
    node.textContent = translateText(original, lang);
  });

  document.querySelectorAll("[placeholder]").forEach((element) => {
    if (!element.dataset.originalPlaceholder) {
      element.dataset.originalPlaceholder = element.getAttribute("placeholder");
    }
    const original = element.dataset.originalPlaceholder;
    const translatedPlaceholder = placeholderTranslations[lang] ? placeholderTranslations[lang][original] : null;
    element.setAttribute("placeholder", lang === "lt" ? original : translatedPlaceholder || original);
  });

  languageButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.lang === lang);
  });

  if (languageCurrent) {
    languageCurrent.innerHTML = lang.toUpperCase();
    languageCurrent.classList.toggle("is-active", lang === "lt");
  }

  updateHeroSlide(lang);
}

function updateHeroSlide(lang) {
  lang = lang || getStoredLanguage() || "lt";
  const kicker = document.querySelector(".hero-rotator-kicker");
  const title = document.querySelector(".hero-rotator-text");
  const cta = document.querySelector(".hero-cta .primary-action");
  if (!kicker || !title || !cta) return;

  const slides = heroSlides[lang] || heroSlides.lt;
  const slide = slides[currentSlide % slides.length];
  kicker.textContent = slide.kicker;
  title.textContent = slide.title;
  cta.textContent = slide.cta;
  cta.href = slide.href;
}

collectTextNodes(document.body);

languageButtons.forEach((button) => {
  button.addEventListener("click", () => applyLanguage(button.dataset.lang));
});

applyLanguage(getStoredLanguage() || "lt");
loadLazyVideos();
startProcessTimeline();

if (document.querySelector(".hero-rotator-text")) {
  setInterval(() => {
    currentSlide += 1;
    updateHeroSlide();
  }, 7000);
}

forms.forEach((form) => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const name = data.get("name") ? data.get("name").toString().trim() : "Nenurodyta";
    const contact = data.get("contact") ? data.get("contact").toString().trim() : "Nenurodyta";
    const service = data.get("service") ? data.get("service").toString().trim() : "";
    const place = data.get("place") ? data.get("place").toString().trim() : "";
    const message = data.get("message") ? data.get("message").toString().trim() : "Nenurodyta";
    const extraRows = [
      service ? `Paslauga: ${service}` : "",
      place ? `Objekto vieta: ${place}` : "",
    ].filter(Boolean).join("\n");

    const button = form.querySelector("button[type='submit']");
    const originalButtonText = button ? button.textContent : "";
    let status = form.querySelector(".form-result");

    if (!status) {
      status = document.createElement("p");
      status.className = "form-result";
      form.appendChild(status);
    }

    if (button) {
      button.disabled = true;
      button.textContent = "Siunciama...";
    }

    status.textContent = "";
    status.classList.remove("is-error", "is-success");

    try {
      if (!window.fetch) {
        throw new Error("Fetch not supported");
      }

      const response = await fetch("/api/send-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, contact, service, place, message, extraRows }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      form.reset();
      status.textContent = "Uzklausa issiusta. Susisieksime per 24 valandas.";
      status.classList.add("is-success");
    } catch (error) {
      status.textContent = "Nepavyko issiusti uzklausos. Bandykite dar karta arba rasykite tiesiogiai: kukyslukas@gmail.com";
      status.classList.add("is-error");
    } finally {
      if (button) {
        button.disabled = false;
        button.textContent = originalButtonText;
      }
    }
  });
});

window.addEventListener(
  "scroll",
  () => {
    if (header) {
      header.classList.toggle("is-compact", window.scrollY > 10);
    }
  },
  { passive: true }
);
