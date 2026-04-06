import './CardReteta.css';

function CardReteta({ reteta, eFavorit, puneLaFavorite, veziDetaliileRetetei }) {
  const iconita = eFavorit
    ? <i className="fas fa-heart"></i> : <i className="far fa-heart"></i>;

  function apasamInima(e) {
    e.stopPropagation(); 
    puneLaFavorite(reteta);
  }

  return (
    <div className="aplicatieCuRetete" onClick={() => veziDetaliileRetetei(reteta.idMeal)}>
      <img src={reteta.strMealThumb} alt={reteta.strMeal} className="imagine" />
      
      <div className="continutulPaginii">
        <h3 className="titlu">{reteta.strMeal}</h3>
        <p className="categoria">{reteta.strCategory}</p>
        
        <div className="actiuni">
          <span className="parteaImaginilor">{reteta.strArea}</span>
          
          <button 
            className={eFavorit ? "favoritActiv" : "favorit"} 
            onClick={apasamInima}
          >
            {iconita}
          </button>
        </div>
      </div>
    </div>
  );
}
export default CardReteta;
