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
const filters = document.querySelector("#filters");
const stockOnly = document.querySelector("#stockOnly");

let active = "Allt";

function rf() {
  let cs = ["Allt", ...new Set(products.map(p => p.category))];

  filters.innerHTML = cs
    .map(c => `
      <button
        class="filter-btn ${active === c ? "active" : ""}"
        data-c="${c}">
        ${c}
      </button>
    `)
    .join("");

  document.querySelectorAll(".filter-btn").forEach(b => {
    b.onclick = () => {
      active = b.dataset.c;
      rf();
      rp();
    };
  });
}

function rp() {
  let ps = products.filter(
    p =>
      (active === "Allt" || p.category === active) &&
      (!stockOnly.checked || p.inStock)
  );

  grid.innerHTML = ps
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

stockOnly.onchange = rp;

document.querySelector("#year").textContent =
  new Date().getFullYear();

rf();
rp();
