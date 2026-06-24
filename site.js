const body = document.body;
const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileLinks = mobileMenu?.querySelectorAll("a[href^='#']") ?? [];

const setMenu = (open) => {
  body.classList.toggle("menu-open", open);
  mobileMenu?.classList.toggle("is-open", open);
  mobileMenu?.setAttribute("aria-hidden", String(!open));
  menuToggle?.setAttribute("aria-expanded", String(open));
  menuToggle?.setAttribute("aria-label", open ? "Chiudi il menu" : "Apri il menu");
};

menuToggle?.addEventListener("click", () => setMenu(!body.classList.contains("menu-open")));
mobileMenu?.querySelector("[data-menu-close]")?.addEventListener("click", () => setMenu(false));
mobileLinks.forEach((link) => link.addEventListener("click", () => setMenu(false)));

const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 32);
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const setupCarousel = ({ trackSelector, cardSelector, currentSelector, prevSelector, nextSelector }) => {
  const track = document.querySelector(trackSelector);
  const cards = [...document.querySelectorAll(cardSelector)];
  const current = document.querySelector(currentSelector);
  const previous = document.querySelector(prevSelector);
  const next = document.querySelector(nextSelector);

  if (!track || !cards.length) return;

  const step = () => {
    const styles = getComputedStyle(track);
    return cards[0].getBoundingClientRect().width + parseFloat(styles.columnGap || styles.gap || 0);
  };

  const updateCounter = () => {
    if (!current) return;
    const cardStep = step();
    const index = cardStep ? Math.round(track.scrollLeft / cardStep) + 1 : 1;
    current.textContent = String(Math.min(cards.length, Math.max(1, index))).padStart(2, "0");
  };

  previous?.addEventListener("click", () => track.scrollBy({ left: -step(), behavior: "smooth" }));
  next?.addEventListener("click", () => track.scrollBy({ left: step(), behavior: "smooth" }));
  track.addEventListener("scroll", updateCounter, { passive: true });
};

setupCarousel({
  trackSelector: "[data-food-track]",
  cardSelector: ".food-card",
  currentSelector: "[data-food-current]",
  prevSelector: "[data-food-prev]",
  nextSelector: "[data-food-next]",
});

setupCarousel({
  trackSelector: "[data-location-track]",
  cardSelector: ".location-card",
  currentSelector: "[data-location-current]",
  prevSelector: "[data-location-prev]",
  nextSelector: "[data-location-next]",
});

const translations = {
  it: {
    skip: "Vai al contenuto",
    "nav.restaurant": "Ristorante",
    "nav.location": "Location",
    "nav.reviews": "Recensioni",
    "nav.contacts": "Contatti",
    "cta.book": "Prenota",
    "cta.bookTable": "Prenota un tavolo",
    "cta.menu": "Scopri il nostro menù",
    "cta.wine": "Carta dei Vini",
    "cta.call": "Chiama ora",
    "card.food": "Menù",
    "card.wine": "Carta dei Vini",
    "card.note": "In caso di allergie o intolleranze, prima di ordinare informa il personale di sala. Pane fatto in casa e coperto € 3,00 a persona.",
    "card.wineNote": "Etichette e annate possono variare secondo disponibilità. Chiedi al personale il suggerimento del giorno.",
    "hero.overline": "Ristorante a Rapallo",
    "hero.hours": "<span>Lunch &amp; dinner</span> Tutti i giorni · 12–14 / 19–22",
    "hero.edge": "Cucina ligure & mediterranea",
    "hero.discover": "Scopri Rapalà",
    "restaurant.kicker": "01 · La nostra cucina",
    "restaurant.copy1": "Tradizione ligure e mediterranea, materie prime riconoscibili e uno sguardo contemporaneo.",
    "restaurant.copy2": "Ogni piatto nasce per essere assaporato con gli occhi, con la bocca e con il cuore.",
    "food.gesture": "Il gesto",
    "food.catch": "Il pescato",
    "food.ingredient": "La materia",
    "food.land": "La terra",
    "food.encounter": "L’incontro",
    "food.sea": "Il mare",
    "food.convivia": "La convivialità",
    "food.memory": "Il ricordo",
    "location.kicker": "02 · Nel cuore di Rapallo",
    "location.copy1": "Sale intime, dettagli d’autore e un dehors nascosto tra il verde del centro storico.",
    "location.copy2": "Un’atmosfera familiare, pensata per rendere speciale ogni tavolo.",
    "location.garden": "Il giardino nascosto",
    "location.terrace": "La terrazza",
    "location.rooms": "Le sale",
    "location.details": "I dettagli",
    "reviews.kicker": "03 · Dicono di noi",
    "reviews.title": "Esperienze<br><em>che restano.</em>",
    "reviews.rating": "825 recensioni verificate<br>su TheFork",
    "reviews.awards": "Travellers’ Choice",
    "reviews.quote1": "“Locale accogliente e curato nei dettagli, dove la gentilezza e il sorriso fanno subito la differenza.”",
    "reviews.author1": "Michele M. · Ospite verificato",
    "reviews.quote2": "“Una cucina che valorizza la materia prima: tonno, baccalà e dolci fatti in casa davvero memorabili.”",
    "reviews.author2": "Recensione verificata · TheFork",
    "reviews.quote3": "“Atmosfera vivace, servizio caloroso e piatti molto curati. Una bellissima scoperta nel cuore di Rapallo.”",
    "reviews.author3": "Ospite internazionale · TheFork",
    "reviews.read": "Leggi tutte le recensioni",
    "reviews.leave": "Lascia una recensione",
    "contacts.kicker": "04 · Contatti",
    "contacts.title": "Ci vediamo<br>a <em>Rapallo.</em>",
    "contacts.where": "Dove siamo",
    "contacts.hoursLabel": "Orari",
    "contacts.hours": "Tutti i giorni<br>12–14 / 19–22",
    "contacts.phone": "Telefono",
    "contacts.mapLabel": "Nel centro storico · A due passi dal lungomare",
    "footer.tagline": "La Liguria nel piatto,<br>il cuore a tavola.",
    "footer.top": "Torna su",
    "form.kicker": "Scrivici su WhatsApp",
    "form.title": "Raccontaci<br><em>cosa desideri.</em>",
    "form.intro": "Compila i campi: prepareremo il messaggio e apriremo direttamente la chat con Rapalà.",
    "form.name": "Nome e cognome *",
    "form.date": "Data",
    "form.guests": "Persone",
    "form.choose": "Scegli",
    "form.message": "Messaggio",
    "form.placeholder": "Orario, richieste o informazioni utili",
    "form.submit": "Continua su WhatsApp",
    "form.note": "Nessun dato viene salvato sul sito.",
  },
  en: {
    skip: "Skip to content",
    "nav.restaurant": "Restaurant",
    "nav.location": "Location",
    "nav.reviews": "Reviews",
    "nav.contacts": "Contacts",
    "cta.book": "Book now",
    "cta.bookTable": "Book a table",
    "cta.menu": "Discover our menu",
    "cta.wine": "Wine list",
    "cta.call": "Call now",
    "card.food": "Menu",
    "card.wine": "Wine list",
    "card.note": "In case of allergies or intolerances, please inform our staff before ordering. Homemade bread and cover charge € 3.00 per person.",
    "card.wineNote": "Labels and vintages may vary according to availability. Ask our staff for today's recommendation.",
    "hero.overline": "Restaurant in Rapallo",
    "hero.hours": "<span>Lunch &amp; dinner</span> Every day · 12–2 pm / 7–10 pm",
    "hero.edge": "Ligurian & Mediterranean cuisine",
    "hero.discover": "Discover Rapalà",
    "restaurant.kicker": "01 · Our cuisine",
    "restaurant.copy1": "Ligurian and Mediterranean tradition, recognisable ingredients and a contemporary perspective.",
    "restaurant.copy2": "Every dish is created to be savoured with the eyes, the palate and the heart.",
    "food.gesture": "The gesture",
    "food.catch": "The catch",
    "food.ingredient": "The ingredient",
    "food.land": "The land",
    "food.encounter": "The encounter",
    "food.sea": "The sea",
    "food.convivia": "Conviviality",
    "food.memory": "The memory",
    "location.kicker": "02 · In the heart of Rapallo",
    "location.copy1": "Intimate rooms, curated details and a hidden garden in the green heart of the old town.",
    "location.copy2": "A warm atmosphere designed to make every table feel special.",
    "location.garden": "The hidden garden",
    "location.terrace": "The terrace",
    "location.rooms": "The rooms",
    "location.details": "The details",
    "reviews.kicker": "03 · What guests say",
    "reviews.title": "Experiences<br><em>that linger.</em>",
    "reviews.rating": "825 verified reviews<br>on TheFork",
    "reviews.awards": "Travellers’ Choice",
    "reviews.quote1": "“A welcoming, beautifully detailed restaurant where the staff’s kindness and smile make an immediate difference.”",
    "reviews.author1": "Michele M. · Verified guest",
    "reviews.quote2": "“A cuisine that celebrates its ingredients: tuna, salt cod and homemade desserts were truly memorable.”",
    "reviews.author2": "Verified review · TheFork",
    "reviews.quote3": "“Lively atmosphere, warm service and beautifully presented dishes. A wonderful discovery in the heart of Rapallo.”",
    "reviews.author3": "International guest · TheFork",
    "reviews.read": "Read all reviews",
    "reviews.leave": "Leave a review",
    "contacts.kicker": "04 · Contacts",
    "contacts.title": "See you<br>in <em>Rapallo.</em>",
    "contacts.where": "Find us",
    "contacts.hoursLabel": "Opening hours",
    "contacts.hours": "Every day<br>12–2 pm / 7–10 pm",
    "contacts.phone": "Phone",
    "contacts.mapLabel": "In the old town · A short walk from the waterfront",
    "footer.tagline": "Liguria on the plate,<br>heart at the table.",
    "footer.top": "Back to top",
    "form.kicker": "Message us on WhatsApp",
    "form.title": "Tell us<br><em>what you need.</em>",
    "form.intro": "Complete the fields: we will prepare your message and open a direct chat with Rapalà.",
    "form.name": "Full name *",
    "form.date": "Date",
    "form.guests": "Guests",
    "form.choose": "Select",
    "form.message": "Message",
    "form.placeholder": "Time, requests or useful information",
    "form.submit": "Continue on WhatsApp",
    "form.note": "No data is stored on this website.",
  },
};

let currentLanguage = "it";

const applyLanguage = (language) => {
  currentLanguage = translations[language] ? language : "it";
  const dictionary = translations[currentLanguage];
  document.documentElement.lang = currentLanguage;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const value = dictionary[element.dataset.i18n];
    if (value !== undefined) element.textContent = value;
  });

  document.querySelectorAll("[data-i18n-html]").forEach((element) => {
    const value = dictionary[element.dataset.i18nHtml];
    if (value !== undefined) element.innerHTML = value;
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const value = dictionary[element.dataset.i18nPlaceholder];
    if (value !== undefined) element.placeholder = value;
  });

  document.querySelectorAll("[data-lang]").forEach((button) => {
    const active = button.dataset.lang === currentLanguage;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  if (typeof cardContent !== "undefined" && cardContent) renderCatalog();
};

document.querySelectorAll("[data-lang]").forEach((button) => {
  button.addEventListener("click", () => applyLanguage(button.dataset.lang));
});

const menuCatalogs = {
  food: {
    intro: {
      it: { kicker: "Rapalà · Food experience", title: "Il nostro<br><em>menù.</em>", description: "Sapori liguri e mediterranei, proposte di mare e di terra. La carta segue il mercato e la stagione." },
      en: { kicker: "Rapalà · Food experience", title: "Our<br><em>menu.</em>", description: "Ligurian and Mediterranean flavours, from the sea and the land. Our menu follows the market and the season." },
    },
    sections: [
      {
        it: "Percorsi degustazione", en: "Tasting menus",
        items: [
          { it: "Mare - Calamari alla citronette, calamarata con rana pescatrice, tonno scottato", en: "Sea - Citronette squid, calamarata with monkfish, seared tuna", price: "€ 55" },
          { it: "Terra - Caprese con burratina, tagliatelle al pesto, roast beef di vitella", en: "Land - Burrata caprese, pesto tagliatelle, Piedmontese veal roast beef", price: "€ 45" },
        ],
      },
      {
        it: "Antipasti", en: "Starters",
        items: [
          { it: "La Caprese con burratina di Montrone, tre pomodori e riduzione di basilico", en: "Montrone burrata with three tomatoes and basil reduction", price: "€ 15" },
          { it: "Tentacolo di polpo su schiacciatina di patate agli agrumi e porro croccante", en: "Steamed octopus on citrus potato mash with crunchy leek", price: "€ 17" },
          { it: "Calamari alla citronette con olive taggiasche e frisèe di verdure croccanti", en: "Citronette squid with Taggiasca olives and crispy vegetables", price: "€ 17" },
          { it: "Baccalà mantecato Brandacujun, cipolla rossa marinata e limone candito", en: "Creamed cod Brandacujun, marinated red onion and candied lemon", price: "€ 16" },
          { it: "Misto di marinati su focaccia ligure, datterini, basilico e cipolla Tropea", en: "Fish marinades on Ligurian focaccia with tomatoes, basil and Tropea onion", price: "€ 19" },
          { it: "Cozze alla marinara o al pepe nero", en: "Mussels marinara or with black pepper", price: "€ 14" },
          { it: "Tonno crudo, acqua di pomodorino giallo, stracciatella e cruditè", en: "Raw tuna, yellow tomato water, stracciatella and seasonal crudités", price: "€ 18" },
        ],
      },
      {
        it: "Primi piatti", en: "First courses",
        items: [
          { it: "Tagliatelle al pesto ligure fatto in casa con patate e fagiolini", en: "Homemade Ligurian pesto tagliatelle with potatoes and green beans", price: "€ 15" },
          { it: "Taglierini Sciuè-Sciuè con cozze, arselle, cicala, scampo, gamberi e calamari", en: "Taglierini with mixed seafood", price: "€ 19" },
          { it: "Ravioloni ripieni di ricciola con sautè di gamberi rosa", en: "Amberjack ravioli with sautéed pink prawns", price: "€ 18" },
          { it: "Taglierini alla mollica con acciughine, peperoncino e pane croccante", en: "Breadcrumb taglierini with anchovies, chilli and crunchy bread", price: "€ 15" },
          { it: "Calamarata con rana pescatrice, datterino rosso e giallo e bottarga", en: "Calamarata with monkfish, red and yellow tomatoes and mullet bottarga", price: "€ 19" },
          { it: "La Caprese in Ravioli, ripieno di bufala, basilico e pomodoro", en: "Buffalo mozzarella ravioli with basil and tomato", price: "€ 15" },
        ],
      },
      {
        it: "Secondi piatti", en: "Main courses",
        items: [
          { it: "Ombrina sottovuoto, vellutata di verdure e pannocchia grigliata", en: "Sous-vide sea bass, seasonal vegetable cream and grilled corn", price: "€ 22" },
          { it: "Tonno scottato con rucola, olio di tartufo e Parmigiano Reggiano", en: "Seared tuna with rocket, truffle oil and Parmigiano Reggiano", price: "€ 22" },
          { it: "Guazzetto di lampuga alla ligure con patate, pinoli, capperi e olive", en: "Ligurian dolphinfish stew with potatoes, pine nuts, capers and olives", price: "€ 19" },
          { it: "Calamaretti alla plancia con cruditè di verdure stagionali", en: "Grilled baby squid with seasonal vegetable crudités", price: "€ 16" },
          { it: "Roast beef di vitella piemontese, belga marinata, timo e pepe rosa", en: "Piedmontese veal roast beef with marinated endive, thyme and pink pepper", price: "€ 18" },
          { it: "Tagliata di manzo piemontese, verdure croccanti e patate al forno", en: "Sliced Piedmontese beef with crispy vegetables and baked potatoes", price: "€ 20" },
        ],
      },
    ],
  },
  wine: {
    intro: {
      it: { kicker: "Rapalà · La cantina", title: "Carta<br><em>dei Vini.</em>", description: "Una selezione italiana tra grandi denominazioni, etichette liguri e bollicine scelte per accompagnare la cucina." },
      en: { kicker: "Rapalà · The cellar", title: "Wine<br><em>list.</em>", description: "An Italian selection of celebrated appellations, Ligurian labels and sparkling wines chosen to complement our cuisine." },
    },
    sections: [
      {
        it: "Champagne", en: "Champagne",
        items: [
          { it: "Brut 1er Cru Monmarthe", sub: "Champagne", price: "€ 70" },
          { it: "Brut Laurent Perrier", sub: "Champagne", price: "€ 85" },
          { it: "Brut Deutz", sub: "Champagne", price: "€ 80" },
          { it: "Brut Reserve Telmont", sub: "Champagne", price: "€ 90" },
        ],
      },
      {
        it: "Franciacorta", en: "Franciacorta",
        items: [
          { it: "Satèn DOCG", sub: "Conte di Provaglio", price: "€ 40" },
          { it: "Franciacorta DOCG", sub: "Cuvée Prestige - Ca' del Bosco", price: "€ 60" },
          { it: "Gran Cuvée Alma Brut DOCG", sub: "Bellavista", price: "€ 60" },
          { it: "Cuvée DOCG", sub: "Lo Sparviere", price: "€ 40" },
          { it: "Brut Rosé DOCG", sub: "Elisabetta Abrami", price: "€ 40" },
        ],
      },
      {
        it: "Bollicine", en: "Sparkling wines",
        items: [
          { it: "Alta Langa Pas Dosé", sub: "Cantine Contratto", price: "€ 60" },
          { it: "Alta Langa Metodo Classico Brut", sub: "Borgo Maragliano", price: "€ 33" },
          { it: "Alta Langa Rosato M.C. Brut", sub: "Galliano", price: "€ 33" },
          { it: "Prosecco Superiore Extra Dry DOCG", sub: "Marsuret", price: "€ 30" },
          { it: "Prosecco Superiore Dosaggio Zero DOCG", sub: "Zanotto", price: "€ 32" },
          { it: "Prosecco Millesimato Brut Rosé", sub: "Bellussi", price: "€ 29" },
          { it: "Prosecco Extra Dry DOC", sub: "Col Sandago", price: "€ 29" },
          { it: "Bombino Brut IGP", sub: "Liburni", price: "€ 26" },
        ],
      },
      {
        it: "Vini rossi", en: "Red wines",
        items: [
          { it: "Brunello di Montalcino Riserva DOCG", sub: "Col d'Orcia - Toscana", price: "€ 190" },
          { it: "Barolo Costa di Rose DOC", sub: "Marchesi di Barolo - Piemonte", price: "€ 110" },
          { it: "Barbaresco Serragrilli DOC", sub: "Marchesi di Barolo - Piemonte", price: "€ 80" },
          { it: "Barbera d'Asti Bricco dell'Uccellone DOCG", sub: "Braida - Piemonte", price: "€ 85" },
          { it: "Brunello di Montalcino DOCG", sub: "Col d'Orcia - Toscana", price: "€ 75" },
          { it: "Bolgheri Il Seggio DOC", sub: "Poggio al Tesoro - Toscana", price: "€ 39" },
          { it: "Chianti Classico Brolio DOC", sub: "Ricasoli - Toscana", price: "€ 35" },
          { it: "Valpolicella Ripasso DOC", sub: "Bertani - Veneto", price: "€ 30" },
          { it: "Vermentino Nero", sub: "Cantine Bosoni - Liguria", price: "€ 33" },
          { it: "Granaccia DOC", sub: "Innocenzo Turco - Liguria", price: "€ 30" },
          { it: "Rossese Dolceacqua Eprie DOC", sub: "Anfosso - Liguria", price: "€ 30" },
          { it: "Nebbiolo d'Alba Michet DOC", sub: "Marchesi di Barolo - Piemonte", price: "€ 32" },
        ],
      },
      {
        it: "Vini bianchi", en: "White wines",
        items: [
          { it: "Vermentino Etichetta Nera", sub: "Cantine Bosoni - Liguria", price: "€ 33" },
          { it: "Gewürztraminer", sub: "Alois Lageder - Alto Adige", price: "€ 32" },
          { it: "Pigato Riviera Ligure di Ponente DOC", sub: "Turco - Liguria", price: "€ 30" },
          { it: "Vermentino Colli di Luni Oro d'Isee DOC", sub: "Federici - Liguria", price: "€ 30" },
          { it: "Ribolla Gialla Collio", sub: "Marco Felluga - Friuli", price: "€ 30" },
          { it: "Albarola", sub: "I Cerri - Liguria", price: "€ 29" },
          { it: "Bianchetta Genovese U Pastine DOC", sub: "Bisson - Liguria", price: "€ 28" },
          { it: "Verdicchio Jesi Superiore", sub: "Massaccio San Sisto - Marche", price: "€ 28" },
          { it: "Langhe Sauvignon DOC", sub: "Poderi la Collina - Piemonte", price: "€ 26" },
          { it: "Langhe Arneis DOC", sub: "Poderi la Collina - Piemonte", price: "€ 26" },
          { it: "Vermentino Muri Grandi", sub: "Federici - Liguria", price: "€ 25" },
          { it: "Traminer Aromatico DOC", sub: "Forchir - Friuli", price: "€ 24" },
        ],
      },
      {
        it: "Vini rosati", en: "Rosé wines",
        items: [
          { it: "In Rosa delle Colline Savonesi IGT", sub: "Innocenzo Turco - Liguria", price: "€ 30" },
          { it: "Rosato Baccarosa", sub: "I Cerri - Liguria", price: "€ 29" },
          { it: "Rosato Langhe", sub: "Poderi la Collina - Piemonte", price: "€ 26" },
          { it: "Rosato Chiaro di Luna", sub: "Colli Liburni - Puglia", price: "€ 24" },
        ],
      },
      {
        it: "Mezze bottiglie", en: "Half bottles",
        items: [
          { it: "Champagne Henriot Brut Souverain", sub: "Champagne", price: "€ 40" },
          { it: "Franciacorta DOCG", sub: "Berlucchi - Lombardia", price: "€ 23" },
          { it: "Franciacorta DOCG", sub: "Bellavista - Lombardia", price: "€ 30" },
          { it: "Prosecco Superiore DOCG", sub: "Ruggeri - Veneto", price: "€ 16" },
          { it: "Brunello di Montalcino DOCG 2019", sub: "Toscana", price: "€ 37" },
          { it: "Rossese Riviera di Ponente", sub: "Terrae - Liguria", price: "€ 16" },
          { it: "Langhe Nebbiolo DOC", sub: "Marchesi di Barolo - Piemonte", price: "€ 19" },
          { it: "Vermentino Riviera di Ponente DOP", sub: "Terrae - Liguria", price: "€ 16" },
          { it: "Pigato Riviera di Ponente DOP", sub: "Terrae - Liguria", price: "€ 16" },
          { it: "Roero Arneis DOC", sub: "Marchesi di Barolo - Piemonte", price: "€ 18" },
        ],
      },
    ],
  },
};

const cardModal = document.querySelector("[data-card-modal]");
const cardBody = cardModal?.querySelector(".card-body");
const cardContent = cardModal?.querySelector("[data-card-content]");
const cardKicker = cardModal?.querySelector("[data-card-kicker]");
const cardTitle = cardModal?.querySelector("[data-card-title]");
const cardDescription = cardModal?.querySelector("[data-card-description]");
const catalogNote = cardModal?.querySelector(".catalog-note");
let activeCardType = "food";
let cardCloseTimer;

const renderCatalog = () => {
  if (!cardContent) return;
  const catalog = menuCatalogs[activeCardType];
  const intro = catalog.intro[currentLanguage];
  cardKicker.textContent = intro.kicker;
  cardTitle.innerHTML = intro.title;
  cardDescription.textContent = intro.description;
  if (catalogNote) catalogNote.textContent = translations[currentLanguage][activeCardType === "food" ? "card.note" : "card.wineNote"];
  cardContent.innerHTML = catalog.sections.map((section) => `
    <section class="catalog-section">
      <h3>${section[currentLanguage]}<small>${section[currentLanguage === "it" ? "en" : "it"]}</small></h3>
      <div class="catalog-items">
        ${section.items.map((item) => `
          <article class="catalog-item">
            <div>
              <h4>${item[currentLanguage] || item.it}</h4>
              ${(item.sub || item[currentLanguage === "it" ? "en" : "it"]) ? `<p>${item.sub || item[currentLanguage === "it" ? "en" : "it"]}</p>` : ""}
            </div>
            <span>${item.price}</span>
          </article>
        `).join("")}
      </div>
    </section>
  `).join("");
};

const setCardType = (type) => {
  activeCardType = menuCatalogs[type] ? type : "food";
  cardModal?.querySelectorAll("[data-card-tab]").forEach((button) => {
    const active = button.dataset.cardTab === activeCardType;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-selected", String(active));
  });
  renderCatalog();
  if (cardBody) cardBody.scrollTop = 0;
};

const openCardModal = (type) => {
  if (!cardModal) return;
  window.clearTimeout(cardCloseTimer);
  setMenu(false);
  setCardType(type);
  cardModal.hidden = false;
  cardModal.setAttribute("aria-hidden", "false");
  body.classList.add("modal-open");
  requestAnimationFrame(() => cardModal.classList.add("is-open"));
};

const closeCardModal = () => {
  if (!cardModal || cardModal.hidden) return;
  cardModal.classList.remove("is-open");
  cardModal.setAttribute("aria-hidden", "true");
  body.classList.remove("modal-open");
  cardCloseTimer = window.setTimeout(() => { cardModal.hidden = true; }, 450);
};

document.querySelectorAll("[data-card-trigger]").forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    openCardModal(trigger.dataset.cardTrigger);
  });
});

cardModal?.querySelector("[data-card-close]")?.addEventListener("click", closeCardModal);
cardModal?.querySelectorAll("[data-card-tab]").forEach((button) => {
  button.addEventListener("click", () => setCardType(button.dataset.cardTab));
});

applyLanguage("it");
renderCatalog();

const bookingModal = document.querySelector("[data-booking-modal]");
const bookingDialog = bookingModal?.querySelector(".booking-dialog");
const bookingForm = bookingModal?.querySelector("[data-whatsapp-form]");
const contextInput = bookingForm?.querySelector("input[name='context']");
const dateInput = bookingForm?.querySelector("input[name='date']");
let lastFocusedElement = null;
let closeModalTimer;

if (dateInput) dateInput.min = new Date().toISOString().split("T")[0];

const openBookingModal = (trigger) => {
  if (!bookingModal || !bookingDialog) return;
  window.clearTimeout(closeModalTimer);
  lastFocusedElement = trigger;
  if (contextInput) contextInput.value = trigger.dataset.context || "Prenotazione tavolo";
  setMenu(false);
  bookingModal.hidden = false;
  bookingModal.setAttribute("aria-hidden", "false");
  body.classList.add("modal-open");
  requestAnimationFrame(() => bookingModal.classList.add("is-open"));
  window.setTimeout(() => bookingForm?.querySelector("input[name='name']")?.focus(), 420);
};

const closeBookingModal = () => {
  if (!bookingModal || bookingModal.hidden) return;
  bookingModal.classList.remove("is-open");
  bookingModal.setAttribute("aria-hidden", "true");
  body.classList.remove("modal-open");
  closeModalTimer = window.setTimeout(() => {
    bookingModal.hidden = true;
    lastFocusedElement?.focus();
  }, 500);
};

document.querySelectorAll("[data-booking-trigger]").forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    openBookingModal(trigger);
  });
});

bookingModal?.querySelectorAll("[data-booking-close]").forEach((button) => {
  button.addEventListener("click", closeBookingModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (cardModal?.classList.contains("is-open")) closeCardModal();
  else if (bookingModal?.classList.contains("is-open")) closeBookingModal();
  else setMenu(false);
});

bookingForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(bookingForm);
  const isEnglish = currentLanguage === "en";
  const rawContext = String(data.get("context") || "Prenotazione tavolo");
  const context = isEnglish
    ? rawContext === "Richiesta menù" ? "Menu information" : "Table reservation"
    : rawContext;
  const lines = isEnglish
    ? [
        "Hello Rapalà,",
        `My name is ${data.get("name")}.`,
        `Request: ${context}`,
        data.get("date") ? `Date: ${data.get("date")}` : "",
        data.get("guests") ? `Guests: ${data.get("guests")}` : "",
        data.get("message") ? `Message: ${data.get("message")}` : "",
      ]
    : [
        "Ciao Rapalà,",
        `sono ${data.get("name")}.`,
        `Richiesta: ${context}`,
        data.get("date") ? `Data: ${data.get("date")}` : "",
        data.get("guests") ? `Persone: ${data.get("guests")}` : "",
        data.get("message") ? `Messaggio: ${data.get("message")}` : "",
      ];

  const message = lines.filter(Boolean).join("\n");
  window.open(`https://wa.me/393886385005?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
});

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const hero = document.querySelector(".hero");
const heroImage = document.querySelector(".hero-image");
const heroTitle = document.querySelector(".hero-title-wrap");
const heroInstagram = document.querySelector(".hero-instagram");
const scrollCue = document.querySelector(".scroll-cue");
let heroMotionFrame = null;

const updateHeroMotion = () => {
  heroMotionFrame = null;
  if (!hero || !heroImage || !heroTitle || reduceMotion) return;
  const progress = Math.min(1, Math.max(0, window.scrollY / hero.offsetHeight));

  if (progress < 0.002) {
    heroImage.style.removeProperty("transform");
    heroTitle.style.removeProperty("transform");
    heroTitle.style.removeProperty("opacity");
    heroInstagram?.style.removeProperty("opacity");
    scrollCue?.style.removeProperty("opacity");
    return;
  }

  heroImage.style.transform = `translate3d(0, ${progress * 7}%, 0) scale(${1 + progress * 0.12})`;
  heroTitle.style.transform = `translate3d(0, ${progress * -11}vh, 0) scale(${1 - progress * 0.045})`;
  heroTitle.style.opacity = String(Math.max(0, 1 - progress * 1.22));
  if (heroInstagram) heroInstagram.style.opacity = String(Math.max(0, 1 - progress * 1.7));
  if (scrollCue) scrollCue.style.opacity = String(Math.max(0, 1 - progress * 2.1));
};

if (!reduceMotion) {
  window.addEventListener("scroll", () => {
    if (heroMotionFrame !== null) return;
    heroMotionFrame = requestAnimationFrame(updateHeroMotion);
  }, { passive: true });
}

const reveals = document.querySelectorAll(".reveal");

if (reduceMotion || !("IntersectionObserver" in window)) {
  reveals.forEach((element) => element.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.1 }
  );

  reveals.forEach((element) => revealObserver.observe(element));
}

document.querySelector("[data-year]").textContent = new Date().getFullYear();
