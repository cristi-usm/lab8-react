import useFavorites from "../hooks/useFavorites";

export default function Favorites() {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Favorites</h2>
      {favorites.length === 0 && <p>No favorites saved yet.</p>}
      <div className="grid grid-cols-3 gap-4">
        {favorites.map(fav => (
          <div key={fav.id} className="bg-white shadow-md rounded-lg p-4">
            <img src={fav.image} alt={fav.title} className="w-full h-48 object-cover rounded"/>
            <h3 className="text-lg font-semibold mt-2">{fav.title}</h3>
            <button 
              onClick={() => removeFavorite(fav.id)} 
              className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}