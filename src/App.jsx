import { useState, useEffect } from 'react';
import CautaInput from './assets/Components/CautaInput/CautaInput';
import ListaRetete from './assets/Components/ListaRetete/ListaRetete';
import NavBar from './assets/Components/NavBar/NavBar';
import DetaliiReteta from './assets/Components/DetaliiReteta/DetaliiReteta';
import FavoriteReteta from './assets/Components/FavoriteReteta/FavoriteReteta';
import useFetch from './assets/Hooks/useFetch';
import useFavorite from './assets/Hooks/useFavorite';


function App() { 
  const [pagina, setPagina] = useState('acasa');
  const [cautare, setCautare] = useState('');
  const [categorie, setCategorie] = useState('');
  const [url, setUrl] = useState('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const [idSelectat, setIdSelectat] = useState(null);
  const [paginaLista, setPaginaLista] = useState(1);

  const { date, loading, eroare } = useFetch(url);
  const { favorite, eFavorit, apasaFavorit } = useFavorite();

  useEffect(() => {
    if (categorie) {
      setUrl(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categorie}`);
    } else {
      setUrl(`https://www.themealdb.com/api/json/v1/1/search.php?s=${cautare}`);
    }
    setPaginaLista(1);
  }, [cautare, categorie]);

  const reteteRaw = date && date.meals ? date.meals : [];
  
  const retete = reteteRaw.filter((reteta) => {
    if (!cautare) return true;
    return reteta.strMeal.toLowerCase().includes(cautare.toLowerCase());
  });
  
  function cautaText(text, cat) {
    setCautare(text);
    setCategorie(cat);
  }

  function veziDetalii(id) {
    setIdSelectat(id);
  }

  function inapoiBtn() {
    setIdSelectat(null);
  }

  return (
    <div className="aplicatie">
      <NavBar
        pagina={pagina}
        setPagina={setPagina}
        nrFavorite={favorite.length}
      />

      <main className="continut">
        {idSelectat && (
          <DetaliiReteta
            id={idSelectat}
            inapoiBtn={inapoiBtn}
            eFavorit={eFavorit}
            puneLaFavorite={apasaFavorit}
          />
        )}

        {!idSelectat && pagina === 'acasa' && (
          <div>
            <CautaInput cautaCuvint={cautaText} />
            <ListaRetete
              retete={retete}
              loading={loading}
              eroare={eroare}
              eFavorit={eFavorit}
              puneLaFavorite={apasaFavorit}
              veziDetaliileRetetei={veziDetalii}
              pagina={paginaLista}
              setPagina={setPaginaLista}
            />
          </div>
        )}

        {!idSelectat && pagina === 'favorite' && (
          <FavoriteReteta
            favorite={favorite}
            eFavorit={eFavorit}
            puneLaFavorite={apasaFavorit}
            veziDetaliileRetetei={veziDetalii}
          />
        )}
      </main>
    </div>
  );
}
export default App;