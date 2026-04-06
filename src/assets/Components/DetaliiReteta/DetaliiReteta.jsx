import useFetch from '../../Hooks/useFetch';
import './DetaliiReteta.css';

function DetaliiReteta({ id, inapoiBtn, eFavorit, puneLaFavorite }) {
  
  const { date, loading, eroare } = useFetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  
  if (loading){
    return <p className="loading">Se incarca...</p>;
  } 

  if (eroare){
    return <p className="eroare">Eroare: {eroare}</p>;
  }
   
  if (!date || !date.meals){
     return <p className="eroare">Nu exista reteta</p>;
  }

  const reteta = date.meals[0];

  const ingrediente = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = reteta['strIngredient' + i];
    const masura = reteta['strMeasure' + i];
    if (ingredient && ingredient.trim() !== '') {
      const text = (masura ? masura.trim() + ' ' : '') + ingredient.trim();
      ingrediente.push(text);
    }
  }

  return (
    <div>
      <button onClick={inapoiBtn}>Inapoi</button>
      
      <h1>{reteta.strMeal}</h1>
      
      <img 
        src={reteta.strMealThumb} 
        alt={reteta.strMeal}
        style={{ width: '300px' }}
      />
      
      <p>Categorie: {reteta.strCategory}</p>
      <p>Regiune: {reteta.strArea}</p>
      
      <button onClick={() => puneLaFavorite(reteta)}>
        {eFavorit(reteta.idMeal) ? 'Sterge din favorite' : 'Adauga la favorite'}
      </button>
      
      <h2>Ingrediente:</h2>
      <ul>
        {ingrediente.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      
      <h2>Instructiuni:</h2>
      <p>{reteta.strInstructions}</p>
      
      {reteta.strYoutube && (
        <a href={reteta.strYoutube} target="_blank">Vezi video pe YouTube</a>
      )}
    </div>
  );
}

export default DetaliiReteta;