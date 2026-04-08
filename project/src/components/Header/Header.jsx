import React from "react";
import styles from "./Header.module.css";
import Button from "../Button/Button";
import { useMovieDispatch, useMovieState } from "../Context/useMovie";

const Header = () => {
  const { favorites } = useMovieState();
  const dispatch = useMovieDispatch();

  const handleSearch = () => {
    dispatch({ type: "SET_VIEW", payload: { view: "Search" } });
  };

  const handleFavorites = () => {
    dispatch({ type: "SET_VIEW", payload: { view: "Favorites" } });
  };

  const handleClick = () => {
    dispatch({ type: "SET_VIEW", payload: { view: "Dashboard" } });
  };

  return (
    <header className={styles.container}>
      <h3 className={styles.logo} onClick={handleClick}>
        TMDB
      </h3>
      <div className={styles.buttons}>
        <Button text="Search" onClick={handleSearch} />
        <Button
          text={`Favorites (${favorites.length})`}
          onClick={handleFavorites}
        />
      </div>
    </header>
  );
};

export default Header;
