import CardReteta from '../CardReteta/CardReteta';
import './FavoriteReteta.css';

function FavoriteReteta({ favorite, eFavorit, puneLaFavorite, veziDetaliileRetetei }) {
  if (favorite.length === 0) {
    return (
      <div className="dacaEgolFavorite">
        <p className="mesajAfisatFavorite">Nu ai nici o reteta salvata.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="titluFavorite">Retete favorite ({favorite.length})</h2>
      <div className="paginaFavorite">
        {favorite.map(reteta => (
          <CardReteta
            key={reteta.idMeal}
            reteta={reteta}
            eFavorit={eFavorit(reteta.idMeal)}
            puneLaFavorite={puneLaFavorite}
            veziDetaliileRetetei={veziDetaliileRetetei}
          />
        ))}
      </div>
    </div>
  );
}

export default FavoriteReteta;
