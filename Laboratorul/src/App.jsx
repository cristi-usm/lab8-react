import { useState } from "react";
import { useFetch } from "./hooks/useFetch";
import { useFavoriteState } from "./hooks/useFavorite";
import CardJoc from "./componente/CardJoc";
import DetaliiJoc from "./componente/DetaliiJoc";

function App() {
  const API_KEY = import.meta.env.VITE_API_KEY;

  const [search, setSearch] = useState("");
  const [pagina, setPagina] = useState(1);
  const [jocSelectat, setJocSelectat] = useState(null);
  const [paginaCurenta, setPaginaCurenta] = useState("home");

  const [gen, setGen] = useState("");

  const [favorite, setFavorite] = useState(() => {
    const salvate = localStorage.getItem("favorite");
    return salvate ? JSON.parse(salvate) : [];
  });

  const { toggle, esteFavorit } = useFavoriteState(favorite, setFavorite);

  let url = `https://api.rawg.io/api/games?key=${API_KEY}&search=${search}&page=${pagina}`;

  if (gen) {
    url += `&genres=${gen}`;
  }

  const { date, loading, eroare } = useFetch(url);

  if (jocSelectat) {
    return (
      <DetaliiJoc
        id={jocSelectat}
        inapoi={() => setJocSelectat(null)}
      />
    );
  }

  if (paginaCurenta === "favorite") {
    return (
      <div style={{ padding: 20 }}>
        <h1>Favorite</h1>

        <button onClick={() => setPaginaCurenta("home")}>
          ⬅ Inapoi la Home
        </button>

        {favorite.length === 0 && <p>Nu ai jocuri favorite</p>}

        <div className="card-container">
          {favorite.map(joc => (
            <CardJoc
              key={joc.id}
              joc={joc}
              onSelect={setJocSelectat}
              toggle={toggle}
              esteFavorit={esteFavorit}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Game Explorer</h1>

      <button onClick={() => setPaginaCurenta("favorite")}>
        Vezi Favorite
      </button>

      <br /><br />

      <input
        placeholder="Cauta joc..."
        value={search}
        onChange={e => {
          setSearch(e.target.value);
          setPagina(1);
        }}
      />

      <select
        value={gen}
        onChange={e => {
          setGen(e.target.value);
          setPagina(1);
        }}
        style={{ marginLeft: 10 }}
      >
        <option value="">Toate genurile</option>
        <option value="action">Action</option>
        <option value="rpg">RPG</option>
        <option value="shooter">Shooter</option>
        <option value="adventure">Adventure</option>
        <option value="strategy">Strategy</option>
      </select>

      {loading && <p>Loading...</p>}
      {eroare && <p>Eroare la incarcare!</p>}

      <div className="card-container">
        {date?.results?.map(joc => (
          <CardJoc
            key={joc.id}
            joc={joc}
            onSelect={setJocSelectat}
            toggle={toggle}
            esteFavorit={esteFavorit}
          />
        ))}
      </div>

      <div className="paginare">
        <button
          onClick={() => setPagina(p => Math.max(p - 1, 1))}
          disabled={pagina === 1}
        >
          Prev
        </button>

        <span>Pagina: {pagina}</span>

        <button onClick={() => setPagina(p => p + 1)}>
          Next
        </button>
      </div>

      {date && <p>Total rezultate: {date.count}</p>}
    </div>
  );
}

export default App;