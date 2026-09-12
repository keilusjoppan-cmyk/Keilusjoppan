const products = [
  {
    name: "Storm Tropical Surge – Kiwi",
    category: "Kúlur",
    price: "Hafðu samband",
    inStock: true,
    image: "storm-tropical-surge-kiwi.png"
  },
  {
    name: "Roto Grip Hustle VP",
    category: "Kúlur",
    price: "Hafðu samband",
    inStock: true,
    image: "roto-grip-hustle-vp.png"
  },
  {
    name: "Dexter SST 6 Hybrid BOA",
    category: "Skór",
    price: "Hafðu samband",
    inStock: true,
    image: "dexter-sst6-hybrid-boa.png"
  },
  {
    name: "Dexter Pro BOA Off White",
    category: "Skór",
    price: "Hafðu samband",
    inStock: true,
    image: "dexter-pro-boa-off-white.png"
  },
  {
    name: "Storm 1-Ball Solo Tote Black/Red",
    category: "Töskur",
    price: "Hafðu samband",
    inStock: true,
    image: "storm-1-ball-solo-tote-black-red.png"
  },
  {
    name: "900 Global 2-Ball Deluxe Roller",
    category: "Töskur",
    price: "Hafðu samband",
    inStock: true,
    image: "900-global-2-ball-deluxe-roller-blue-gold.png"
  },
  {
    name: "ProBowl Shammy",
    category: "Fylgihlutir",
    price: "Hafðu samband",
    inStock: true,
    image: "probowl-shammy.png"
  },
  {
    name: "Storm Max Pro Thumb Tape",
    category: "Fylgihlutir",
    price: "Hafðu samband",
    inStock: true,
    image: "storm-max-pro-thumb-tape.png"
  }
];

const grid = document.querySelector("#productGrid");

if (grid) {
  grid.innerHTML = products
    .map(p => `
      <article class="product-card">

        <div class="product-image">
          <img src="${p.image}" alt="${p.name}">
        </div>

        <div class="product-body">

          <div class="product-meta">
            <span>${p.category}</span>

            <b class="stock ${p.inStock ? "in" : "out"}">
              ${p.inStock ? "● TIL Á LAGER" : "○ EKKI TIL Á LAGER"}
            </b>
          </div>

          <h3>${p.name}</h3>

          <div class="price">${p.price}</div>

        </div>

      </article>
    `)
    .join("");
}

const year = document.querySelector("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}
