import { useState } from 'react';

const cheie = 'reteteFavorite';

function incarcaFavorite() {
  try {
    const salvat = localStorage.getItem(cheie);
    return salvat ? JSON.parse(salvat) : [];
  } catch {
    return [];
  }
}

function salveazaFavorite(lista) {
  localStorage.setItem(cheie, JSON.stringify(lista));
}

function useFavorite() {
  const [favorite, setFavorite] = useState(incarcaFavorite);

  function adauga(reteta) {
    setFavorite(retFav => {
      const noua = [...retFav, reteta];
      salveazaFavorite(noua);
      return noua;
    });
  }

  function sterge(id) {
    setFavorite(retFav => {
      const noua = retFav.filter(r => r.idMeal !== id);
      salveazaFavorite(noua);
      return noua;
    });
  }

  function eFavorit(id) {
    return favorite.filter(reteta => reteta.idMeal === id).length > 0;
  }

  function apasaFavorit(reteta) {
    if (eFavorit(reteta.idMeal)) {
      sterge(reteta.idMeal);
    } else {
      adauga(reteta);
    }
  }

  return { favorite, adauga, sterge, eFavorit, apasaFavorit };
}
export default useFavorite;
