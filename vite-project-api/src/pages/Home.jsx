import { useState } from "react";
import useFetch from "../hooks/useFetch";
import useFavorites from "../hooks/useFavorites";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import Card from "../components/Card";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

export default function Home() {
  const [query, setQuery] = useState("galaxy");
  const [year, setYear] = useState("");
  const [page, setPage] = useState(1);

  const url = `https://images-api.nasa.gov/search?q=${query}&page=${page}${year ? `&year_start=${year}` : ""}`;
  const { data, loading, error } = useFetch(url);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const toggleFavorite = (item) => {
    const id = item.data[0].nasa_id;
    if (isFavorite(id)) removeFavorite(id);
    else addFavorite({ id, ...item.data[0], image: item.links?.[0]?.href });
  };

  return (
    <div>
      <SearchBar query={query} setQuery={setQuery}/>
      <Filters year={year} setYear={setYear}/>
      {loading && <Loader/>}
      {error && <ErrorMessage message={error}/>}
      <div className="grid grid-cols-3 gap-4">
        {data?.collection?.items?.map(item => (
          <Card key={item.data[0].nasa_id} item={item} isFavorite={isFavorite} toggleFavorite={toggleFavorite}/>
        ))}
      </div>
      <Pagination page={page} setPage={setPage}/>
    </div>
  );
}