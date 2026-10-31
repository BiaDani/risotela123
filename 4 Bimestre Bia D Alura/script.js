const films = [
  {
    id: 'minha-mae',
    title: 'Minha Mãe é uma Peça',
    year: 2013,
    category: 'familia',
    genre: 'Comédia · Cotidiano',
    rating: 6.9,
    poster: 'assets/posters/minha-mae-e-uma-peca.webp',
    posterAlt: 'Cartaz do filme Minha Mãe é uma Peça',
    synopsis: 'Dona Hermínia é uma mãe de meia-idade, com filhos já crescidos, que encontra nas conversas com pessoas próximas uma maneira de lidar com sua rotina e suas inquietações.',
    synopsisSource: 'Globo Filmes',
    synopsisUrl: 'https://gshow.globo.com/cultura-pop/filmes/globo-filmes/generos/comedia/minhamaeeumapeca.ghtml',
    ratingUrl: 'https://www.imdb.com/title/tt2464018/',
    posterCredit: 'Cartaz: IMDb'
  },
  {
    id: 'auto',
    title: 'O Auto da Compadecida',
    year: 2000,
    category: 'sertao',
    genre: 'Comédia · Sertão',
    rating: 8.6,
    poster: 'assets/posters/o-auto-da-compadecida.webp',
    posterAlt: 'Cartaz do filme O Auto da Compadecida',
    synopsis: 'No vilarejo de Taperoá, João Grilo e Chicó criam planos para sobreviver. As confusões da dupla os levam a um julgamento no Juízo Final.',
    synopsisSource: 'Globo Filmes',
    synopsisUrl: 'https://gshow.globo.com/cultura-pop/filmes/globo-filmes/generos/comedia/oautodacompadecida.ghtml',
    ratingUrl: 'https://www.imdb.com/title/tt0271383/ratings/',
    posterCredit: 'Cartaz: IMDb'
  },
  {
    id: 'lisbela',
    title: 'Lisbela e o Prisioneiro',
    year: 2003,
    category: 'romance',
    genre: 'Comédia romântica',
    rating: 7.6,
    poster: 'assets/posters/lisbela-e-o-prisioneiro.webp',
    posterAlt: 'Cartaz do filme Lisbela e o Prisioneiro',
    synopsis: 'O aventureiro Leléu chega à cidade de Lisbela, uma jovem apaixonada por cinema e já com casamento marcado. Entre encontros e pressões, os dois vivem uma história de amor cercada de humor.',
    synopsisSource: 'Globo Filmes',
    synopsisUrl: 'https://gshow.globo.com/cultura-pop/filmes/globo-filmes/generos/romance/lisbelaeoprisioneiro.ghtml',
    ratingUrl: 'https://www.imdb.com/title/tt0367975/',
    posterCredit: 'Cartaz: IMDb'
  },
  {
    id: 'saneamento',
    title: 'Saneamento Básico, o Filme',
    year: 2007,
    category: 'satira',
    genre: 'Comédia · Sátira social',
    rating: 7.5,
    poster: 'assets/posters/saneamento-basico.webp',
    posterAlt: 'Cartaz do filme Saneamento Básico, o Filme',
    synopsis: 'Moradores de uma pequena vila querem financiar uma estação de tratamento de esgoto. Para acessar o dinheiro disponível, eles precisam realizar um filme de ficção.',
    synopsisSource: 'Globoplay',
    synopsisUrl: 'https://globoplay.globo.com/saneamento-basico-o-filme/t/fcDXBmQBH1/',
    ratingUrl: 'https://www.imdb.com/title/tt0907134/',
    contextUrl: 'https://www.cinematecapauloamorim.com.br/portaldocinemagaucho/492/saneamento-basico-o-filme',
    posterCredit: 'Cartaz: IMDb'
  }
];

const state = { query: '', category: 'all', sort: 'featured' };
const filmGrid = document.querySelector('#film-grid');
const resultCount = document.querySelector('#result-count');
const emptyState = document.querySelector('#empty-state');
const searchInput = document.querySelector('#search');
const filterSelect = document.querySelector('#filter');
const sortSelect = document.querySelector('#sort');
const clearSearch = document.querySelector('#clear-search');
const resetFilters = document.querySelector('#reset-filters');
const dialog = document.querySelector('#film-dialog');
const closeDialogButton = document.querySelector('#dialog-close');
let lastTrigger = null;

function formatRating(rating) {
  return rating.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

function getFilteredFilms() {
  const normalizedQuery = state.query.trim().toLocaleLowerCase('pt-BR');
  const visible = films.filter((film) => {
    const matchesQuery = !normalizedQuery || film.title.toLocaleLowerCase('pt-BR').includes(normalizedQuery);
    const matchesCategory = state.category === 'all' || film.category === state.category;
    return matchesQuery && matchesCategory;
  });

  return visible.sort((first, second) => {
    if (state.sort === 'rating') return second.rating - first.rating;
    if (state.sort === 'year-desc') return second.year - first.year;
    if (state.sort === 'year-asc') return first.year - second.year;
    if (state.sort === 'title') return first.title.localeCompare(second.title, 'pt-BR');
    return films.indexOf(first) - films.indexOf(second);
  });
}

function cardTemplate(film) {
  return `
    <article class="film-card" role="listitem">
      <div class="film-card__image-wrap">
        <img class="film-card__image" src="${film.poster}" alt="${film.posterAlt}" width="640" height="905" loading="lazy">
        <span class="film-card__year">${film.year}</span>
      </div>
      <div class="film-card__details">
        <p class="film-card__genre">${film.genre}</p>
        <h3>${film.title}</h3>
        <div class="film-card__rating" aria-label="Avaliação de usuários no IMDb: ${formatRating(film.rating)} de 10">
          <span aria-hidden="true">★</span><strong>${formatRating(film.rating)}</strong><span>/ 10 no IMDb</span>
        </div>
        <hr class="film-card__divider">
        <div class="film-card__actions">
          <button class="card-button" type="button" data-film-id="${film.id}" aria-haspopup="dialog">Ver ficha</button>
          <a class="poster-credit" href="${film.ratingUrl}" target="_blank" rel="noreferrer">${film.posterCredit}</a>
        </div>
      </div>
    </article>`;
}

function updateResetControl() {
  const hasFilters = Boolean(state.query || state.category !== 'all' || state.sort !== 'featured');
  resetFilters.hidden = !hasFilters;
  clearSearch.hidden = !state.query;
}

function renderFilms() {
  const visibleFilms = getFilteredFilms();
  filmGrid.innerHTML = visibleFilms.map(cardTemplate).join('');
  emptyState.hidden = visibleFilms.length > 0;
  resultCount.textContent = visibleFilms.length === 1 ? '1 filme encontrado' : `${visibleFilms.length} filmes encontrados`;
  updateResetControl();
}

function openFilm(id, trigger) {
  const film = films.find((item) => item.id === id);
  if (!film) return;

  lastTrigger = trigger || document.activeElement;
  document.querySelector('#dialog-poster').src = film.poster;
  document.querySelector('#dialog-poster').alt = film.posterAlt;
  document.querySelector('#dialog-meta').textContent = `${film.year} · ${film.genre}`;
  document.querySelector('#dialog-title').textContent = film.title;
  document.querySelector('#dialog-rating').innerHTML = `<span aria-hidden="true">★</span><strong>${formatRating(film.rating)}</strong><span>/ 10 · média de usuários no IMDb</span>`;
  document.querySelector('#dialog-synopsis').textContent = film.synopsis;
  const synopsisSource = document.querySelector('#dialog-synopsis-source');
  synopsisSource.href = film.synopsisUrl;
  synopsisSource.firstChild.textContent = `Sinopse: ${film.synopsisSource} `;
  document.querySelector('#dialog-rating-source').href = film.ratingUrl;
  const contextSource = document.querySelector('#dialog-context-source');
  contextSource.hidden = !film.contextUrl;
  if (film.contextUrl) contextSource.href = film.contextUrl;
  document.querySelector('#dialog-credit').textContent = `${film.posterCredit}. Nota consultada em 31 out. 2026; avaliações de usuários podem variar.`;

  if (typeof dialog.showModal === 'function') {
    dialog.showModal();
    closeDialogButton.focus();
  } else {
    window.open(film.synopsisUrl, '_blank', 'noopener');
  }
}

function closeFilmDialog() {
  if (dialog.open) dialog.close();
}

function resetAll() {
  state.query = '';
  state.category = 'all';
  state.sort = 'featured';
  searchInput.value = '';
  filterSelect.value = 'all';
  sortSelect.value = 'featured';
  renderFilms();
  searchInput.focus();
}

searchInput.addEventListener('input', (event) => {
  state.query = event.target.value;
  renderFilms();
});

filterSelect.addEventListener('change', (event) => {
  state.category = event.target.value;
  renderFilms();
});

sortSelect.addEventListener('change', (event) => {
  state.sort = event.target.value;
  renderFilms();
});

filmGrid.addEventListener('click', (event) => {
  const button = event.target.closest('[data-film-id]');
  if (button) openFilm(button.dataset.filmId, button);
});

clearSearch.addEventListener('click', () => {
  state.query = '';
  searchInput.value = '';
  renderFilms();
  searchInput.focus();
});

resetFilters.addEventListener('click', resetAll);
document.querySelector('#empty-reset').addEventListener('click', resetAll);

document.querySelector('#random-film').addEventListener('click', () => {
  const film = films[Math.floor(Math.random() * films.length)];
  openFilm(film.id, document.querySelector('#random-film'));
});

closeDialogButton.addEventListener('click', closeFilmDialog);
dialog.addEventListener('click', (event) => {
  const bounds = dialog.getBoundingClientRect();
  const clickedBackdrop = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
  if (clickedBackdrop) closeFilmDialog();
});
dialog.addEventListener('close', () => {
  if (lastTrigger && typeof lastTrigger.focus === 'function') lastTrigger.focus();
});

renderFilms();
