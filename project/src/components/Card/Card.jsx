import React from "react";
import styles from "./Card.module.css";
import { useMovieDispatch, useMovieState } from "../Context/useMovie";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w200";
const FALLBACK_IMAGE =
  "https://dummyimage.com/200x300/cccccc/000000&text=No+Image";

const Card = ({ movie }) => {
  const dispatch = useMovieDispatch();
  const { favorites } = useMovieState();

  const isFavorite = favorites.some((fav) => fav.id === movie.id);

  const toggleFavorite = () => {
    dispatch({
      type: isFavorite ? "REMOVE_FAVORITE" : "ADD_FAVORITE",
      payload: { movie },
    });
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
          {isFavorite ? "❤️" : "🤍"}
        </button>
      </div>
      <h3 className={styles.title}>{movie.title}</h3>
    </div>
  );
};

export default Card;
