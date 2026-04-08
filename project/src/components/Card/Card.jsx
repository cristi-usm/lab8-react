import React from "react";
import styles from "./Card.module.css";
import { useFavorites } from "../../hooks/useFavorites";
import Button from "../Button/Button";
import { useMovieDispatch } from "../Context/useMovie";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w200";
const FALLBACK_IMAGE =
  "https://dummyimage.com/200x300/cccccc/000000&text=No+Image";

const Card = ({ movie }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const dispatch = useMovieDispatch();

  const toggleFavorite = () => {
    if (isFavorite(movie.id)) removeFavorite(movie.id);
    else addFavorite(movie);
  };

  const previewMovie = () => {
    dispatch({ type: "SET_SELECTED_MOVIE", payload: { id: movie.id } });
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={
            movie.poster_path
              ? `${IMAGE_BASE_URL}${movie.poster_path}`
              : FALLBACK_IMAGE
          }
          alt={movie.title}
        />

        <button className={styles.heart} onClick={toggleFavorite}>
          {isFavorite(movie.id) ? "❤️" : "🤍"}
        </button>
      </div>
      <h3 className={styles.title}>{movie.title}</h3>
      <div className="buttonWrapper">
        <Button text="Preview Movie" onClick={previewMovie} />
      </div>
    </div>
  );
};

export default Card;
