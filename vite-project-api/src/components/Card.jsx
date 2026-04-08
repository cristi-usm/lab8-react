import { Link } from "react-router-dom";

export default function Card({ item, isFavorite, toggleFavorite }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img 
        src={item.links?.[0]?.href} 
        alt={item.data[0].title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{item.data[0].title}</h3>
        <p className="text-sm text-gray-600 mb-3">
          {item.data[0].description?.slice(0,100)}...
        </p>
        <div className="flex justify-between items-center">
          <button onClick={() => toggleFavorite(item)}>
            {isFavorite(item.data[0].nasa_id) ? "★ Remove" : "☆ Add"}
          </button>
          <Link 
            to={`/details/${item.data[0].nasa_id}`} 
            className="text-blue-500 hover:underline"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}