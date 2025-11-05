function getCorBorderTop(nivel) {
  switch (nivel) {
    case "A":
      return "green";
    case "AA":
      return "orange";
    case "AAA":
      return "red";
    default:
      return "#ccc";
  }
}

// Função que renderiza os cards
function renderCards(cards) {
  const container = document.getElementById("card-container");
  if (!container) {
    console.error("Container #card-container não encontrado!");
    return;
  }

  container.innerHTML = "";

  const template = document.createElement("template");
  template.innerHTML = `
    <div class="card">
      <h2></h2>
      <span class="nivel"></span>
      <p></p>
    </div>
  `;

  cards.forEach((card) => {
    const clone = template.content.cloneNode(true);
    clone.querySelector("h2").textContent = card.titulo;
    clone.querySelector(".nivel").textContent = card.nivel;
    clone.querySelector("p").textContent = card.descricao;
    clone.querySelector(".card").style.borderTop = `6px solid ${getCorBorderTop(
      card.nivel
    )}`;
    container.appendChild(clone);
  });
}

// --- NOVO CÓDIGO ABAIXO ---

const filterButtons = document.querySelectorAll(".filter-btn");

function filtrarPorNivel(nivel) {
  let filtrados;

  if (nivel === "todos") {
    filtrados = cardsData; // mostra todos os cards
  } else {
    filtrados = cardsData.filter((card) => card.nivel === nivel);
  }

  renderCards(filtrados);
}

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const nivel = btn.dataset.level;
    filtrarPorNivel(nivel);
  });
});

// Renderiza todos os cards por padrão ao carregar
window.addEventListener("DOMContentLoaded", () => {
  filtrarPorNivel("todos");
});

document.addEventListener("DOMContentLoaded", () => {
  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeIcon = themeToggleBtn.querySelector(".icon");

  const temaSalvo = localStorage.getItem("tema");
  if (temaSalvo === "dark") {
    document.body.classList.add("dark-mode");
    themeIcon.textContent = "☀️";
  }

  themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    themeIcon.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("tema", isDark ? "dark" : "light");
  });
});

