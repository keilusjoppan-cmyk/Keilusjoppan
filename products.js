// ÞÚ BREYTIR VÖRUNUM HÉR.
// inStock: true  = Til á lager
// inStock: false = Ekki til á lager
//
// image: þú getur sett slóð á mynd eða skilið eftir tómt.
// sourceUrl: má t.d. vísa á síðu birgja.

const products = [
  {
    name: "Dæmi – keilukúla",
    category: "Kúlur",
    price: "34.990 kr.",
    inStock: true,
    image: "",
    emoji: "🎳",
    sourceUrl: "https://shop.bowltech.se/"
  },
  {
    name: "Dæmi – keiluskór",
    category: "Skór",
    price: "19.990 kr.",
    inStock: true,
    image: "",
    emoji: "👟",
    sourceUrl: "https://shop.bowltech.se/"
  },
  {
    name: "Dæmi – keilutaska",
    category: "Töskur",
    price: "14.990 kr.",
    inStock: false,
    image: "",
    emoji: "👜",
    sourceUrl: "https://shop.bowltech.se/"
  },
  {
    name: "Dæmi – fylgihlutur",
    category: "Fylgihlutir",
    price: "4.990 kr.",
    inStock: true,
    image: "",
    emoji: "⭐",
    sourceUrl: "https://shop.bowltech.se/"
  }
];

const grid = document.querySelector("#productGrid");
const filters = document.querySelector("#filters");
const stockOnly = document.querySelector("#stockOnly");
let activeCategory = "Allt";

function categories() {
  return ["Allt", ...new Set(products.map(p => p.category))];
}

function renderFilters() {
  filters.innerHTML = categories().map(category => `
    <button class="filter-btn ${activeCategory === category ? "active" : ""}"
      data-category="${category}">
      ${category}
    </button>
  `).join("");

  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      activeCategory = btn.dataset.category;
      renderFilters();
      renderProducts();
    });
  });
}

function renderProducts() {
  const filtered = products.filter(product => {
    const categoryMatches = activeCategory === "Allt" || product.category === activeCategory;
    const stockMatches = !stockOnly.checked || product.inStock;
    return categoryMatches && stockMatches;
  });

  grid.innerHTML = filtered.map(product => `
    <article class="product-card">
      <div class="product-image">
        ${product.image
          ? `<img src="${product.image}" alt="${product.name}" loading="lazy">`
          : `<span aria-hidden="true">${product.emoji || "🎳"}</span>`}
      </div>
      <div class="product-body">
        <div class="product-meta">
          <span class="category">${product.category}</span>
          <span class="stock ${product.inStock ? "in" : "out"}">
            ${product.inStock ? "Til á lager" : "Ekki til á lager"}
          </span>
        </div>
        <h3>${product.name}</h3>
        <div class="price">${product.price}</div>
        ${product.sourceUrl ? `<a class="source-link" href="${product.sourceUrl}" target="_blank" rel="noopener">Nánari upplýsingar</a>` : ""}
      </div>
    </article>
  `).join("");

  if (!filtered.length) {
    grid.innerHTML = "<p>Engar vörur fundust í þessari síu.</p>";
  }
}

stockOnly.addEventListener("change", renderProducts);
document.querySelector("#year").textContent = new Date().getFullYear();

renderFilters();
renderProducts();
