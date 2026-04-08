import React from "react";
import { useMovieState } from "../Context/useMovie";
import Card from "../Card/Card";
import styles from "./Favorites.module.css";

const Favorites = () => {
  const { favorites } = useMovieState();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>My Favorites</h2>
      {favorites.length === 0 ? (
        <p className={styles.empty}>You have no favorite movies yet.</p>
      ) : (
        <div className={styles.cardsGrid}>
          {favorites.map((movie) => (
            <Card movie={movie} key={movie.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
