export function useFavoriteState(favorite, setFavorite) {
  function toggle(joc) {
    const exista = favorite.find(j => j.id === joc.id);

    let nou;
    if (exista) {
      nou = favorite.filter(j => j.id !== joc.id);
    } else {
      nou = [...favorite, joc];
    }

    setFavorite(nou);
    localStorage.setItem("favorite", JSON.stringify(nou));
  }

  function esteFavorit(id) {
    return favorite.some(j => j.id === id);
  }

  return { toggle, esteFavorit };
}