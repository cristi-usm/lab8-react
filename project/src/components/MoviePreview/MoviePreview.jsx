import React, { useRef } from "react";
import { useMovieState, useMovieDispatch } from "../Context/useMovie";
import styles from "./MoviePreview.module.css";
import { useFavorites } from "../../hooks/useFavorites";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w300";
const FALLBACK_IMAGE = "https://dummyimage.com/300x450/cccccc/000000&text=No+Image";

const MoviePreview = () => {
  const { selectedMovie, results, favorites } = useMovieState();
  const dispatch = useMovieDispatch();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const cardRef = useRef();

  if (!selectedMovie) return null;

  const data =
    results?.find((mv) => mv.id === selectedMovie) ||
    favorites?.find((mv) => mv.id === selectedMovie);

  if (!data) return <p>Movie not found.</p>;

  const toggleFavorite = () => {
    if (!data?.id) return;
    if (isFavorite(data.id)) removeFavorite(data.id);
    else addFavorite(data);
  };

  const goBack = () => {
    dispatch({ type: "SET_SELECTED_MOVIE", payload: { id: null } });
  };

  const handleOverlayClick = (e) => {
    if (cardRef.current && !cardRef.current.contains(e.target)) {
      goBack();
    }
  };


  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.preview} ref={cardRef}>
        <button className={styles.backBtn} onClick={goBack}>
          ← Go Back
        </button>
        <div className={styles.card}>
          <div className={styles.imageWrapper}>
            <img
              src={data.poster_path ? `${IMAGE_BASE_URL}${data.poster_path}` : FALLBACK_IMAGE}
              alt={data.title}
              className={styles.image}
            />
            <button className={styles.heart} onClick={toggleFavorite}>
              {isFavorite(data.id) ? "❤️" : "🤍"}
            </button>
          </div>
          <div className={styles.info}>
            <h2 className={styles.title}>{data.title}</h2>
            <p className={styles.overview}>{data.overview || "No description available."}</p>
            <p className={styles.meta}>
              <strong>Release Date:</strong> {data.release_date || "Unknown"}
            </p>
            <p className={styles.meta}>
              <strong>Rating:</strong> {data.vote_average || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePreview;