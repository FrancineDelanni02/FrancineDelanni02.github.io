function getCorBorderTop(nivel) {
  switch(nivel) {
    case "A": return "green";
    case "AA": return "orange";
    case "AAA": return "red";
    default: return "#ccc";
  }
}

// Função que renderiza os cards
function renderCards(cards) {
  const container = document.getElementById('card-container');
  if (!container) {
    console.error("Container #card-container não encontrado!");
    return;
  }

  // Limpa o container antes de adicionar (para evitar duplicação)
  container.innerHTML = "";

  // Template do card
  const template = document.createElement('template');
  template.innerHTML = `
    <div class="card">
      <h2></h2>
      <span class="nivel"></span>
      <p></p>
    </div>
  `;

  // Gera cada card
  cards.forEach(card => {
    const clone = template.content.cloneNode(true);
    clone.querySelector('h2').textContent = card.titulo;
    clone.querySelector('.nivel').textContent = card.nivel;
    clone.querySelector('p').textContent = card.descricao;
    clone.querySelector('.card').style.borderTop = `6px solid ${getCorBorderTop(card.nivel)}`;
    container.appendChild(clone);
  });
}

// Renderiza ao carregar
renderCards(cardsData);