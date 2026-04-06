import CardReteta from '../CardReteta/CardReteta';
import './ListaRetete.css';
import NrDePagini from '../NrDePagini/NrDePagini';

const retetePePagina = 9;

function ListaRetete({ retete, loading, eroare, eFavorit, puneLaFavorite, veziDetaliileRetetei, pagina, setPagina }) {
  if (loading) {
    return <p className="loading">Se incarca...</p>;
  }

  if (eroare) {
    return <p className="eroare">Eroare: {eroare}</p>;
  }

  if (retete.length === 0) {
    return (
      <div className="dacaEgolLista">
        <p className="mesajAfisatLista">Nu am gasit retete.</p>
      </div>
    );
  }

  const total = retete.length;
  const totalPagini = Math.ceil(total / retetePePagina);
  const start = (pagina - 1) * retetePePagina;
  const paginaActuala = retete.slice(start, start + retetePePagina);

  return (
    <div>
      <p className="numarRetete">
        {total} retete gasite — pagina {pagina} din {totalPagini}
      </p>

      <div className="afiseazaRetete">
        {paginaActuala.map(reteta => (
          <CardReteta
            key={reteta.idMeal}
            reteta={reteta}
            eFavorit={eFavorit(reteta.idMeal)}
            puneLaFavorite={puneLaFavorite}
            veziDetaliileRetetei={veziDetaliileRetetei}
          />
        ))}
      </div>

      {totalPagini > 1 && (
        <NrDePagini
          paginaCurenta={pagina}
          totalPagini={totalPagini}
          inapoi={() => setPagina(p => p - 1)}
          inainte={() => setPagina(p => p + 1)}
        />
      )}
    </div>
  );
}
export default ListaRetete;
