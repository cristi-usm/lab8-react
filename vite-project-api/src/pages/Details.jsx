import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const url = `https://images-api.nasa.gov/search?nasa_id=${id}`;
  const { data, loading, error } = useFetch(url);

  const item = data?.collection?.items?.[0];

  return (
    <div className="p-4">
      <button 
        onClick={() => navigate(-1)} 
        className="mb-4 px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
      >
        ← Back
      </button>
      {loading && <Loader/>}
      {error && <ErrorMessage message={error}/>}
      {item && (
        <div>
          <h2 className="text-2xl font-bold mb-4">{item.data[0].title}</h2>
          <img 
            src={item.links?.[0]?.href} 
            alt={item.data[0].title} 
            className="w-full max-w-2xl mb-4 rounded shadow"
          />
          <p className="text-gray-700">{item.data[0].description}</p>
        </div>
      )}
    </div>
  );
}