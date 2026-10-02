const products = [
  { name: 'Sofá 3 Lugares Retrátil e Reclinável Linho Cinza', badge: '10% OFF', stars: 4, reviews: 42, oldPrice: 6599, price: 5900, thumb: 'images/produto-1.svg' },
  { name: 'Sofá Retrátil Aramis - 2,90m Tecido Bouclé Café', badge: '6% OFF', stars: 5, reviews: 58, oldPrice: 5899, price: 5400, thumb: 'images/produto-2.svg' },
  { name: 'Sofá Retrátil e Reclinável 4 Lugares Mola Ensacada', badge: '12% OFF', stars: 4, reviews: 29, oldPrice: 6199, price: 5499, thumb: 'images/produto-3.svg' },
  { name: 'Cama de Casal Madeira Maciça Freijó Padrão Queen', badge: 'MADEIRA NOBRE', dark: true, stars: 5, reviews: 34, oldPrice: 4699, price: 4483, thumb: 'images/produto-4.svg' },
  { name: 'Cama Box Casal 138 Molas Ensacadas + Pillow Top', badge: '25% OFF', stars: 4, reviews: 67, oldPrice: 2000, price: 1500, thumb: 'images/produto-5.svg' }
];

const extraProducts = [
  { name: 'Mesa de Jantar 6 Lugares Madeira Maciça Imbuia', badge: '8% OFF', stars: 5, reviews: 21, oldPrice: 3290, price: 2999, thumb: 'images/produto-6.svg' },
  { name: 'Poltrona Decorativa Bouclé Pés Palito', badge: '15% OFF', stars: 4, reviews: 48, oldPrice: 1190, price: 999, thumb: 'images/produto-7.svg' },
  { name: 'Rack para TV até 65 Polegadas Freijó', badge: 'LANÇAMENTO', dark: true, stars: 5, reviews: 12, oldPrice: 2390, price: 2190, thumb: 'images/produto-8.svg' },
  { name: 'Escrivaninha Home Office 140cm Nogueira', badge: '10% OFF', stars: 4, reviews: 36, oldPrice: 1590, price: 1429, thumb: 'images/produto-9.svg' },
  { name: 'Guarda-Roupa Casal 6 Portas Madeira Clara', badge: '18% OFF', stars: 4, reviews: 53, oldPrice: 3990, price: 3269, thumb: 'images/produto-10.svg' }
];

const container = document.getElementById('products');
const loadMoreBtn = document.getElementById('loadMore');
const sortSelect = document.getElementById('sortSelect');

let currentList = [...products];
let extraLoaded = false;

function formatBRL(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function renderStars(count) {
  return '★'.repeat(count) + '☆'.repeat(5 - count);
}

function renderProducts(list) {
  container.innerHTML = list.map((p, i) => `
    <article class="card">
      <span class="badge ${p.dark ? 'dark' : ''}">${p.badge}</span>
      <button class="heart" data-heart="${i}" aria-label="Favoritar"></button>
      <img class="thumb" src="${p.thumb}" alt="${p.name}">
      <div class="stars">${renderStars(p.stars)}<small>(${p.reviews})</small></div>
      <h4>${p.name}</h4>
      <span class="old">De: ${formatBRL(p.oldPrice)}</span>
      <div class="price">${formatBRL(p.price)} <small>à vista</small></div>
      <p class="install">ou 10x de ${formatBRL(p.price / 10)} sem juros</p>
      <button class="btn-details" data-details="${p.name}">Ver detalhes</button>
    </article>
  `).join('');
}

function sortProducts(list, mode) {
  const sorted = [...list];
  if (mode === 'menor') sorted.sort((a, b) => a.price - b.price);
  if (mode === 'maior') sorted.sort((a, b) => b.price - a.price);
  return sorted;
}

function refresh() {
  renderProducts(sortProducts(currentList, sortSelect.value));
}

function registerAction(label) {
  console.log('Ação registrada: ' + label);
  alert('Ação registrada: ' + label);
}

document.querySelectorAll('[data-action]').forEach(function (btn) {
  btn.addEventListener('click', function () {
    registerAction(btn.dataset.action);
  });
});

container.addEventListener('click', function (event) {
  const heart = event.target.closest('[data-heart]');
  const details = event.target.closest('[data-details]');

  if (heart) {
    heart.classList.toggle('active');
    console.log('Favorito atualizado');
    return;
  }

  if (details) {
    registerAction('Ver detalhes - ' + details.dataset.details);
  }
});

sortSelect.addEventListener('change', refresh);

loadMoreBtn.addEventListener('click', function () {
  if (!extraLoaded) {
    currentList = currentList.concat(extraProducts);
    extraLoaded = true;
    refresh();
    loadMoreBtn.textContent = 'Todos os produtos carregados';
    loadMoreBtn.disabled = true;
  }
  console.log('Ação registrada: Carregar Mais Produtos');
});

document.getElementById('newsletterForm').addEventListener('submit', function (event) {
  event.preventDefault();
  const email = document.getElementById('newsletterEmail');
  registerAction('Cadastro na newsletter - ' + email.value);
  email.value = '';
});

refresh();
