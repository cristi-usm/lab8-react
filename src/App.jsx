import { useMemo, useState } from 'react';
import { useFetch } from './hooks/useFetch';
import { useFavorites } from './hooks/useFavorites';

const API = 'https://www.thecocktaildb.com/api/json/v1/1';
const PAGE_SIZE = 8;

function Loading({ label = 'Se încarcă...' }) { return <div className="status"><span className="spinner" />{label}</div>; }
function ErrorMessage({ error }) { return <div className="status error">Nu am putut încărca datele. {error?.message || 'Încearcă din nou.'}</div>; }

function CocktailCard({ drink, favorite, onFavorite, onOpen }) {
  return <article className="card">
    <button className="image-button" onClick={() => onOpen(drink)} aria-label={`Vezi detalii ${drink.strDrink}`}>
      <img src={drink.strDrinkThumb} alt={drink.strDrink} loading="lazy" />
    </button>
    <div className="card-body">
      <div className="card-title-row"><h3>{drink.strDrink}</h3><button className={`heart ${favorite ? 'active' : ''}`} onClick={() => onFavorite(drink)} aria-label={favorite ? 'Elimină din favorite' : 'Adaugă la favorite'}>{favorite ? '♥' : '♡'}</button></div>
      <p>{drink.strCategory || 'Cocktail'} · {drink.strAlcoholic || 'Rețetă'}</p>
      <button className="text-button" onClick={() => onOpen(drink)}>Vezi rețeta <span>→</span></button>
    </div>
  </article>;
}

function Detail({ drink, onBack, favorite, onFavorite }) {
  const { data, loading, error } = useFetch(`${API}/lookup.php?i=${drink.idDrink}`);
  const detail = data?.drinks?.[0] || drink;
  const ingredients = Array.from({ length: 15 }, (_, index) => {
    const name = detail[`strIngredient${index + 1}`]; const measure = detail[`strMeasure${index + 1}`];
    return name ? `${measure || ''} ${name}`.trim() : null;
  }).filter(Boolean);
  return <main className="detail-page">
    <button className="back-button" onClick={onBack}>← Înapoi la rezultate</button>
    {loading && <Loading label="Se încarcă rețeta completă..." />}
    {error && <ErrorMessage error={error} />}
    <section className="detail-card">
      <img src={detail.strDrinkThumb} alt={detail.strDrink} />
      <div className="detail-content"><div className="eyebrow">{detail.strCategory || 'Cocktail'} · {detail.strAlcoholic || 'Rețetă'}</div><h1>{detail.strDrink}</h1><p className="instructions">{detail.strInstructions || 'Instrucțiunile nu sunt disponibile.'}</p><button className={`favorite-button ${favorite ? 'active' : ''}`} onClick={() => onFavorite(detail)}>{favorite ? '♥ Elimină din favorite' : '♡ Adaugă la favorite'}</button><h2>Ingrediente</h2><ul className="ingredients">{ingredients.map((item) => <li key={item}>{item}</li>)}</ul></div>
    </section>
  </main>;
}

export default function App() {
  const [query, setQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [view, setView] = useState('explore');
  const [selected, setSelected] = useState(null);
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const categories = useFetch(`${API}/list.php?c=list`);
  const url = submittedQuery ? `${API}/search.php?s=${encodeURIComponent(submittedQuery)}` : category ? `${API}/filter.php?c=${encodeURIComponent(category)}` : null;
  const { data, loading, error } = useFetch(url);
  const drinks = useMemo(() => {
    let items = data?.drinks || [];
    if (submittedQuery && category) items = items.filter((item) => item.strCategory === category);
    return items;
  }, [data, submittedQuery, category]);
  const visible = view === 'favorites' ? favorites : drinks;
  const pages = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
  const shown = visible.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const submit = (event) => { event.preventDefault(); setSubmittedQuery(query.trim()); setPage(1); setView('explore'); setSelected(null); };
  const changeCategory = (value) => { setCategory(value); setPage(1); setView('explore'); setSelected(null); };
  const open = (drink) => setSelected(drink);
  if (selected) return <><Header view={view} setView={setView} favoriteCount={favorites.length} /><Detail drink={selected} onBack={() => setSelected(null)} favorite={isFavorite(selected.idDrink)} onFavorite={toggleFavorite} /></>;

  return <><Header view={view} setView={(next) => { setView(next); setPage(1); }} favoriteCount={favorites.length} /><main className="container"><section className="hero"><div><div className="eyebrow">DESCOPERĂ CEVA NOU</div><h1>Găsește cocktailul<br /><em>perfect.</em></h1><p>Explorează rețete, ingrediente și inspirație pentru următoarea ta seară specială.</p></div><div className="hero-orb">🍸</div></section><form className="search-bar" onSubmit={submit}><span>⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Caută un cocktail..." /><button>Caută</button></form><section className="filters"><label htmlFor="category">Filtrează după categorie</label><select id="category" value={category} onChange={(e) => changeCategory(e.target.value)}><option value="">Toate categoriile</option>{(categories.data?.drinks || []).map((item) => <option key={item.strCategory} value={item.strCategory}>{item.strCategory}</option>)}</select></section>{view === 'favorites' ? <div className="section-heading"><div><div className="eyebrow">COLECȚIA TA</div><h2>Favoritele mele</h2></div><span>{favorites.length} salvate</span></div> : <div className="section-heading"><div><div className="eyebrow">REZULTATE</div><h2>{submittedQuery || category ? 'Cocktailuri pentru tine' : 'Începe explorarea'}</h2></div>{visible.length > 0 && <span>{visible.length} rezultate · pagina {page}/{pages}</span>}</div>}{loading && <Loading label="Căutăm cocktailuri..." />}{error && <ErrorMessage error={error} />}{!loading && !error && shown.length > 0 && <div className="grid">{shown.map((drink) => <CocktailCard key={drink.idDrink} drink={drink} favorite={isFavorite(drink.idDrink)} onFavorite={toggleFavorite} onOpen={open} />)}</div>}{!loading && !error && shown.length === 0 && <div className="empty"><div>🥂</div><h3>{view === 'favorites' ? 'Nu ai favorite încă' : submittedQuery || category ? 'Nu am găsit rezultate' : 'Caută o rețetă și începe aventura'}</h3><p>{view === 'favorites' ? 'Apasă inimioara pe orice cocktail ca să-l salvezi aici.' : 'Încearcă „Margarita”, „Mojito” sau selectează o categorie.'}</p></div>}{shown.length > 0 && <nav className="pagination" aria-label="Paginare"><button disabled={page === 1} onClick={() => setPage((current) => current - 1)}>← Anterior</button><span>Pagina {page} din {pages}</span><button disabled={page === pages} onClick={() => setPage((current) => current + 1)}>Următor →</button></nav>}</main></>;
}

function Header({ view, setView, favoriteCount }) { return <header><a className="brand" href="#top" onClick={() => setView('explore')}><span className="brand-mark">✦</span> shaker<span className="dot">.</span></a><nav><button className={view === 'explore' ? 'selected' : ''} onClick={() => setView('explore')}>Explorează</button><button className={view === 'favorites' ? 'selected' : ''} onClick={() => setView('favorites')}>Favorite <span className="badge">{favoriteCount}</span></button></nav></header>; }
