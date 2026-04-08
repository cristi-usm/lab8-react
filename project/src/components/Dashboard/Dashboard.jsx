import React from "react";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🎬 Welcome to TMDB</h1>
      <p className={styles.subtitle}>
        Discover popular movies, search your favorites and build your own collection.
      </p>

      <div className={styles.cards}>
        <div className={styles.card}>
          <h3>🔍 Search</h3>
          <p>Find any movie you want instantly.</p>
        </div>

        <div className={styles.card}>
          <h3>⭐ Favorites</h3>
          <p>Save and manage your favorite movies.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;