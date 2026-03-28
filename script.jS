// ====== CONTACT ======
const CONTACT = {
  phone: "+917010022388",
  whatsapp: "https://wa.me/917010022388"
};

// ====== DATA ======
const COCKTAILS = {
  Mojito: { video: "https://www.w3schools.com/html/mov_bbb.mp4", ingredients: ["Rum","Lime Juice","Mint Leaves","Sugar Syrup","Soda Water","Ice Cubes"] },
  Margarita: { video: "https://www.w3schools.com/html/mov_bbb.mp4", ingredients: ["Tequila","Triple Sec","Lime Juice","Salt","Ice Cubes"] },
  Cosmopolitan: { video: "https://www.w3schools.com/html/mov_bbb.mp4", ingredients: ["Vodka","Triple Sec","Cranberry Juice","Lime Juice","Ice Cubes"] },
  BlueLagoon: { video: "https://www.w3schools.com/html/mov_bbb.mp4", ingredients: ["Vodka","Blue Curacao","Lemonade","Ice Cubes"] },
  PinaColada: { video: "https://www.w3schools.com/html/mov_bbb.mp4", ingredients: ["Rum","Coconut Cream","Pineapple Juice","Ice Cubes"] }
};

const PACKAGES = {
  basic: { title: "Basic Package", images: ["cocktail","bartender","drinks","party"] },
  standard: { title: "Standard Package", images: ["bar","cocktail,party","bartender","event"] },
  premium: { title: "Premium Experience", images: ["luxury,bar","vip,cocktail","nightlife","premium,party"] }
};

// ====== CONTACT LINKS ======
function setContactLinks() {
  document.querySelectorAll(".call-btn").forEach(a => a.href = `tel:${CONTACT.phone}`);
  document.querySelectorAll(".wa-btn").forEach(a => a.href = CONTACT.whatsapp);
  document.querySelector(".whatsapp-float").href = CONTACT.whatsapp;
}

// ====== HOME PAGE ======
function loadHomePage() {
  setContactLinks();

  const cocktailContainer = document.getElementById("cocktail-cards");
  const packageContainer = document.getElementById("package-cards");

  if(cocktailContainer) {
    cocktailContainer.innerHTML = "";
    for (let name in COCKTAILS) {
      const a = document.createElement("a");
      a.href = `cocktail.html?name=${name}`;
      a.className = "card hidden";
      a.innerText = name;
      cocktailContainer.appendChild(a);
    }
    setupSearch();
  }

  if(packageContainer) {
    packageContainer.innerHTML = "";
    for (let key in PACKAGES) {
      const a = document.createElement("a");
      a.href = `package.html?type=${key}`;
      a.className = "card hidden";
      if(key==="premium") a.classList.add("highlight");
      a.innerText = PACKAGES[key].title;
      packageContainer.appendChild(a);
    }
  }

  setupAnimations();
}

// ====== SEARCH FUNCTION ======
function setupSearch() {
  const searchInput = document.getElementById("cocktail-search");
  searchInput?.addEventListener("input", function() {
    const query = this.value.toLowerCase();
    const container = document.getElementById("cocktail-cards");
    container.innerHTML = "";
    for(let name in COCKTAILS) {
      if(name.toLowerCase().includes(query)) {
        const a = document.createElement("a");
        a.href = `cocktail.html?name=${name}`;
        a.className = "card hidden";
        a.innerText = name;
        container.appendChild(a);
      }
    }
    setupAnimations();
  });
}

// ====== COCKTAIL PAGE ======
function loadCocktailPage() {
  setContactLinks();
  const params = new URLSearchParams(window.location.search);
  const name = params.get("name");
  if(name && COCKTAILS[name]) {
    document.getElementById("title").innerText = name;
    document.getElementById("video").src = COCKTAILS[name].video;

    const list = document.getElementById("ingredients");
    list.innerHTML = "";
    COCKTAILS[name].ingredients.forEach(i => {
      const li = document.createElement("li");
      li.innerText = i;
      list.appendChild(li);
    });
  }
  setupAnimations();
}

// ====== PACKAGE PAGE ======
function loadPackagePage() {
  setContactLinks();
  const params = new URLSearchParams(window.location.search);
  const type = params.get("type");
  if(type && PACKAGES[type]) {
    document.querySelector("h1").innerText = PACKAGES[type].title;

    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";
    PACKAGES[type].images.forEach(tag => {
      const img = document.createElement("img");
      img.src = `https://source.unsplash.com/600x400/?${tag}`;
      img.classList.add("hidden");
      gallery.appendChild(img);
    });
    setupAnimations();
  }
}

// ====== ANIMATIONS ======
function setupAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting) entry.target.classList.add("show");
    });
  }, { threshold: 0.1 });
  document.querySelectorAll(".card, .gallery img").forEach(el => observer.observe(el));
}

// ====== THEME TOGGLE ======
const toggle = document.getElementById("theme-toggle");
toggle?.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggle.innerText = document.body.classList.contains("dark") ? "☀️" : "🌙";
});
