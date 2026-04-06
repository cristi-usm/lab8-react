import './NavBar.css';

function NavBar({ pagina, setPagina, nrFavorite }) {
  return (
    <nav className="navBar">
      <div className="denumireaAplicatiei">Retete</div>
      <div className="butoane">
        <button
          className={pagina === 'acasa' ? "buton activ" : "buton"}
          onClick={() => setPagina('acasa')}
        >
          Acasa
        </button>

        <button
          className={pagina === 'favorite' ? "buton activ" : "buton"}
          onClick={() => setPagina('favorite')}
        >
          Favorite {nrFavorite > 0 && <span className="numarulDeFavorite">{nrFavorite}</span>}
        </button>
      </div>
    </nav>
  );
}
export default NavBar;
