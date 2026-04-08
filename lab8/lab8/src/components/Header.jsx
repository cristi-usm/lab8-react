import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <div className="container header-inner">
        <NavLink to="/" className="brand">
          Art Explorer
        </NavLink>

        <nav className="nav">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            Home
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            Favorites
          </NavLink>
        </nav>
      </div>
    </header>
  );
}