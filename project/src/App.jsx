import { useFetch } from "./hooks/useFetch";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const App = () => {
  const { data, loading, error } = useFetch(
    "https://api.themoviedb.org/3/movie/popular",
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  console.log(data);

  return (
    <div>
      {data?.results?.map((movie) => (
        <>
          <p key={movie.id}>{movie.title}</p>
          <img
            src={`${IMAGE_BASE_URL}${movie.poster_path}`}
            style={{ width: "200px" }}
          />
        </>
      ))}
    </div>
  );
};

export default App;
