import defaultPicture from "../../assets/image.png";
import { genres } from "../../Data/genres.json";
import {useNavigationDispatch} from "../../context/NavigationContext";

export function MovieDetails({ movie }) {
  const imgUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : defaultPicture;
  const title = movie.title || "No Title";
  const gen = genres.filter((genre) => movie.genre_ids.includes(genre.id)) || ["No Genres"];
  const release = movie.release_date || "No Release Date";
  const overview = movie.overview || "No overview";

  const dispatch = useNavigationDispatch();

  function onBackClick() {
    dispatch({ type: "ON_BACK_CLICK" });
  }
  
  return (
    <div className="flex flex-col md:flex-row gap-8 p-6 bg-[#0a0a0a] text-white rounded-2xl shadow-2xl max-w-5xl mx-auto mt-10 border border-gray-800">
      <button
        onClick={onBackClick}
        className="text-gray-400 hover:text-white text-sm font-bold uppercase tracking-widest transition-colors duration-200 flex items-center gap-2"
      >
        <span>&larr;</span>BACK
      </button>

      <div className="w-full md:w-1/3 shrink-0">
        <img
          src={imgUrl}
          alt={title}
          className="w-full rounded-xl shadow-lg object-cover border border-gray-700"
        />
      </div>

      <div className="flex flex-col gap-4">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white">
          {title}
        </h1>

        <h3 className="bg-gray-800 px-3 py-1 rounded-md text-sm border border-gray-700">
          {release}
        </h3>

        <ul className="flex flex-wrap gap-2">
          {gen.map((g) => (
            <li
              key={g.id}
              className="bg-[#1e1e1e] hover:bg-[#2e2e2e] text-gray-300 text-xs font-semibold px-3 py-1.5 rounded-full border border-gray-700 transition-colors"
            >
              {g.name}
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2 text-gray-200">Overview</h2>
          <p className="text-gray-400 leading-relaxed text-lg italic">
            "{overview}"
          </p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
